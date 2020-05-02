const getConfig = function () {
  try {
    const _savedConfig = wx.getStorageSync('configCache')
    return _savedConfig
  } catch (e) {
    console.warn(e)
    return {}
  }
}

const setConfig = function (obj) {
  try {
    wx.setStorageSync('configCache', obj)
    return obj
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const getSession = function () {
  try {
    const _savedConfig = wx.getStorageSync('session')
    return _savedConfig
  } catch (e) {
    console.warn(e)
    return {
      token: null
    }
  }
}

const setSession = function (obj) {
  try {
    wx.setStorageSync('session', {
      ...obj,
      loggedAt: Date.now()
    })
    return obj
  } catch (e) {
    return {
      token: null
    }
  }
}

export {
  getConfig, setConfig,
  getSession, setSession
}
