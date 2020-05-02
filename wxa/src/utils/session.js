import React, { useState, createContext, useEffect } from 'react'

import { getSession as getSessionCache, setSession as setSessionCache } from './persist'

const DAY = 86400000

const SessionContext = createContext(null)

function WithSession ({ children }) {
  const [sessionStore, setSessionStore] = useState(null)

  const refreshSessionFromCache = () => {
    setSession(getSessionCache())
  }

  function checkCacheExistence () {
    const now = Date.now()
    return (
      sessionStore?.token &&
      sessionStore?.loggedAt &&
      now >= sessionStore?.loggedAt &&
      (now - sessionStore?.loggedAt) < DAY
    )
  }

  const destroySession = () => {
    setSession({})
  }

  const getToken = () => {
    return getSession().token || null
  }

  const getSession = () => {
    return getSessionCache()
  }

  const setSession = (obj) => {
    setSessionStore(obj)
    setSessionCache(obj)
  }

  useEffect(() => {
    if (checkCacheExistence()) {
      refreshSessionFromCache()
    }
  }, [])

  return <SessionContext.Provider value={{
    checkCacheExistence,
    setSession,
    destroySession,
    getToken,
    get session() {
      return sessionStore
    }
  }}>
    {children}
  </SessionContext.Provider>
}

export {
  SessionContext,
  WithSession
}
