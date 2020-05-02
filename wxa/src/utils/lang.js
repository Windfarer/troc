import React, { useEffect, useState, createContext } from 'react'
import merge from 'lodash.merge'
import * as wechatElements from 'remax/wechat'

import convert from 'xml-js'
import defaultLang from '@/vendor/lang.yaml'

const {
  MINA_APP_SERVER_SIDE_CONFIG_URL_PREFIX,
  MINA_APP_SERVER_SIDE_CONFIG_VERSION
} = process.env

const CACHE_KEY = `lang_${MINA_APP_SERVER_SIDE_CONFIG_VERSION}`

const XML_MARK = '<xml>'

const importables = {
  ...React,
  ...wechatElements
}

function format (str, ...args) {
  str = str.toString()
  if (args.length) {
    const t = typeof args[0]
    if (!(t === 'string' || t === 'number')) {
      args = args[0]
    }
    for (const key in args) {
      str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key])
    }
  }
  return str
}

function t (last, ...args) {
  const lastType = typeof last
  switch (lastType) {
    case 'string':
      return format(last, ...args)
    case 'object':
      if (args.length) {
        return t(last[args[0]], ...args.slice(1))
      }
      return last
    default:
      return last
  }
}

function parseAsElements (text) {
  if (typeof text !== 'string' || !text.trim().startsWith(XML_MARK)) {
    return text
  }
  const obj = convert.xml2js(text, { compact: false })
  return _parseAsElements(obj.elements[0], 'root', 0)
}

function _parseAsElements (element, parentKey = '', index = 0) {
  const key = `${parentKey}-${element.name}-${index}`
  try {
    if (element.type === 'text') {
      return <importables.Text key={key}>{(element.text || '').trim()}</importables.Text>
    }
    if (element.type === 'cdata') {
      return <importables.Text key={key}>{JSON.parse(
        `["${(element.cdata || '').trim()}"]`
      )}</importables.Text>
    }
    if (element.type === 'element') {
      const Type = importables[element.name === 'xml' ? 'Fragment' : element.name]
      return <Type key={key} {...element.attributes || {}}>
        {(element.elements || []).map((i, idx) => _parseAsElements(i, key, idx))}
      </Type>
    }
  } catch (e) {
    console.error(e)
  }

  return null
}

function getDefaultLang () {
  try {
    const cache = wx.getStorageSync(CACHE_KEY)
    return cache ? merge(defaultLang, cache) : defaultLang
  } catch (e) {
    return defaultLang
  }
}

function setCache (data) {
  wx.setStorageSync(CACHE_KEY, data)
}

const initialDefaultLang = getDefaultLang()

async function getRemoteLang () {
  const { data, statusCode } = await wx.$async.request({
    url: MINA_APP_SERVER_SIDE_CONFIG_URL_PREFIX + MINA_APP_SERVER_SIDE_CONFIG_VERSION + '.json',
    responseType: 'text',
    dataType: 'text',
    method: 'GET'
  })

  if (statusCode !== 200) {
    return null
  }

  return merge(defaultLang, JSON.parse(data))
}

const LangContext = createContext([
  (...args) => t(initialDefaultLang, ...args),
  initialDefaultLang
])

function WithLang ({ children }) {
  const [lang, setLang] = useState(getDefaultLang())

  const updateLang = async (force = false) => {
    if (wx.__langCache && !force) {
      return
    }
    try {
      await wx.$async.showLoading()
      const data = await getRemoteLang()
      if (data) {
        setCache(data)
        wx.__langCache = { ...data }
        setLang(wx.__langCache)
      }
    } catch (e) {
      console.log(e)
      setCache(lang)
    } finally {
      await wx.$async.hideLoading()
    }
  }

  useEffect(() => {
    updateLang()
  }, [])

  return <LangContext.Provider value={[
    (...args) => t(lang, ...args),
    lang,
    updateLang
  ]}>
    {children}
  </LangContext.Provider>
}

export {
  LangContext,
  WithLang,
  parseAsElements
}
