import React, { useEffect, useState, useContext, createContext } from 'react'

import { SessionContext } from '@/utils/session'

import types from './types'
import { actions, Request, Response, messages } from './proto'
import { RequestContent } from './request'

const RequestContext = createContext(null)

function WithRequest ({ children }) {
  const [value, setValue] = useState(null)
  const session = useContext(SessionContext)

  function createContentBuilders () {
    const contentBuilders = value || {}
    Object.keys(types).forEach(i => {
      contentBuilders[actions[i]] = (options, b) => {
        const block = typeof (b) === 'undefined' ? false : !!b
        return new RequestContent({
          type: types[i],
          data: options,
          block,
          action: parseInt(i),
          session,
          contentBuilders
        })
      }
    })
    return contentBuilders
  }

  useEffect(() => {
    if (value) {
      Object.keys(value).forEach(i => {
        value[i].session = session
      })
      setValue(value)
    } else {
      setValue(createContentBuilders())
    }
  }, [session])

  return <RequestContext.Provider value={value}>
    {children}
  </RequestContext.Provider>
}

export { messages, types, actions, Request, Response }
export { RequestContext, WithRequest }
