import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

import proto from '@/proto/api.proto'

const _a = proto.messages.api.Request.Action
const actions = {}
const dataNames = {}
const typeNames = {}

Object.keys(_a).forEach(i => {
  actions[i] = _a[i]
  actions[_a[i]] = i

  const camelCased = camelCase(i)
  dataNames[_a[i]] = camelCased
  dataNames[camelCased] = _a[i]

  const upperCamelCased = upperFirst(camelCased)
  typeNames[_a[i]] = upperCamelCased
  typeNames[upperCamelCased] = _a[i]
})

Object.freeze(actions)
Object.freeze(dataNames)
Object.freeze(typeNames)

export const messages = proto.messages
export const Request = proto.messages.api.Request
export const Response = proto.messages.api.Response

export { actions, dataNames, typeNames }
export default proto.messages
