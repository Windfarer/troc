import { Request as RequestMessage, Response, actions } from './proto'
import types from './types'
import { SessionContext } from '@/utils/session'

const MINA_APP_REQUEST_AUTH_HEADER_NAME = process.env.MINA_APP_REQUEST_AUTH_HEADER_NAME
const MINA_APP_REQUEST_ENTRYPOINT = process.env.MINA_APP_REQUEST_ENTRYPOINT
const MINA_APP_REQUEST_PREFIX = process.env.MINA_APP_REQUEST_PREFIX

const REQUEST_HEADER_BASE = {
  'Content-Type': 'application/moblin'
}

const IS_FINISHED = Symbol('isFinished')
const ERROR = Symbol('error')
const RESULT = Symbol('result')
const PROMISE = Symbol('Promise')
const TASK = Symbol('task')
const RESPONSE_BUFFER = Symbol('responseBuffer')
const TIMES_TRIED = Symbol('timesTried')

const UNAUTHORIZED_ERROR_CODES = [10002]

let loginPromise = null

class RequestTask {
  constructor (content, header) {
    this.content = content
    this[PROMISE] = null
    this.header = header
    this.session = this.content.session
    this.contentBuilders = this.content.contentBuilders
    this.send()
  }

  get isFinished () { return this[IS_FINISHED] }

  get hasError () { return !!this[ERROR] }

  get timesTried () { return this[TIMES_TRIED] }

  get task () { return this[TASK] }

  get promise () { return this[PROMISE] }

  get error () { return this[ERROR] }

  get result () {
    if (this[ERROR]) { throw this[ERROR] }
    if (!this[IS_FINISHED]) { throw this[PROMISE] }
    return this[RESULT]
  }

  get message () {
    return this.content.requestMessage
  }

  get encodedMessage () {
    return Uint8Array.from(RequestMessage.encode(this.message).finish()).buffer
  }

  then (onFulfilled, onRejected) {
    if (!this.promise) { this.throwNoPromise() }
    return this.promise.then(onFulfilled, onRejected)
  }

  catch (onRejected) {
    if (!this.promise) { this.throwNoPromise() }
    return this.promise.catch(onRejected)
  }

  finally (onFinally) {
    if (!this.promise) { this.throwNoPromise() }
    return this.promise.finally(onFinally)
  }

  throwNoPromise () { throw new Error('Promise not created for this request.') }

  send () {
    if (!this.isFinished && this.task) {
      this.task.abort()
    }
    this[IS_FINISHED] = false
    this[TIMES_TRIED] = 0

    console.log('sending', this.message)
    this[PROMISE] = this.tryRequest()
    return this.promise
  }

  async tryRequest () {
    this.session = this.content.session

    if (this[TIMES_TRIED] >= 3) {
      throw this.error
    }

    this[RESULT] = null
    this[ERROR] = null
    this[TASK] = null
    this[RESPONSE_BUFFER] = null
    this[TIMES_TRIED] += 1

    console.log('try sending...', this)

    const header = await this.getHeader()

    try {
      const req = wx.$async.request({
        url: MINA_APP_REQUEST_PREFIX + MINA_APP_REQUEST_ENTRYPOINT,
        data: this.encodedMessage,
        header,
        method: 'POST',
        dataType: 'arraybuffer',
        responseType: 'arraybuffer'
      })
      this[TASK] = req.task

      const { data, statusCode, errMsg } = await req
      this[RESPONSE_BUFFER] = data
      this[IS_FINISHED] = true

      if (statusCode === 200) {
        this[RESULT] = this.decodeResponse()
        this[IS_FINISHED] = true
        return this.checkError()
      } else {
        this[ERROR] = { statusCode, errMsg, data }
        return this.tryRequest()
      }
    } catch (e) {
      this[ERROR] = e
      return this.tryRequest()
    }
  }

  async checkError () {
    let needRetry = false
    const error = (() => {
      const r = this.result
      if (r.error) {
        console.warn(r.error)
        needRetry = (UNAUTHORIZED_ERROR_CODES.indexOf(r.error.code) > -1) || needRetry
        return r.error
      }
    })()

    if (!error) {
      return this.result
    }

    this[ERROR] = error
    if (needRetry) {
      if (!wx._sessionStoreLocked) {
        this.session.destroySession()
      }
      await this.createSession()
      return this.tryRequest()
    } else {
      throw this.error
    }
  }

  decodeResponse () {
    if (!this[RESPONSE_BUFFER]) { return {} }
    const raw = Object.assign(
      {},
      Response.toObject(
        Response.decode(
          new Uint8Array(this[RESPONSE_BUFFER]))))
    const ret = raw[types[raw.action].dataName] || {}
    Object.defineProperties(ret, {
      error: {
        get () { return raw.error }
      },
      _action: {
        get () { return actions[raw.action] }
      }
    })
    return ret
  }

  async getHeader () {
    if (this.header) {
      return {
        'Content-Type': 'application/troc',
        ...this.header
      }
    }
    try {
      const token = await this.session.getToken()
      if (token) {
        return {
          ...REQUEST_HEADER_BASE,
          [MINA_APP_REQUEST_AUTH_HEADER_NAME]: token
        }
      }
      throw new TypeError()
    } catch (e) {
      try {
        const session = await this.createSession()
        return {
          ...REQUEST_HEADER_BASE,
          [MINA_APP_REQUEST_AUTH_HEADER_NAME]: session.token
        }
      } catch (_e) {
        return REQUEST_HEADER_BASE
      }
    }
  }

  createSession () {
    if (!loginPromise) {
      loginPromise = (async () => {
        console.log('creating new session.')
        const { code } = await wx.$async.login()
        const res = await this.contentBuilders.LOGIN({ code }).send(REQUEST_HEADER_BASE)
        wx.aldstat?.sendOpenid(res.user.openId) // eslint-disable-line
        await this.session.setSession({
          ...res,
          code
        })
        setTimeout(() => {
          loginPromise = null
        }, 2000)
        return res
      })()
    }
    return loginPromise
  }
}

class RequestContent {
  constructor (options) {
    this.options = options
    this.action = options.action
    this.requestType = options.type.request
    this.responseType = options.type.response
    this.dataName = options.type.dataName
    this.data = this.requestType.create(options.data || {})
    this.block = options.block
    this.session = options.session
    this.contentBuilders = options.contentBuilders
  }

  get requestMessage() {
    return new RequestMessage({
      action: this.action,
      block: this.block,
      [this.dataName]: this.data,
      session: this.session,
      contentBuilders: this.contentBuilders,
      requestContent: this
    })
  }

  send (header = false) {
    return new RequestTask(this, header)
  }
}

export { RequestTask, RequestContent }
