import { useState, useEffect, useContext } from 'react'
import { RequestContext } from '@/utils/request'

const KEY = 'LocalUserInfo'

function useLocalUserInfo () {
  const [localUserInfo, setLocalUserInfo] = useState({})
  const request = useContext(RequestContext)

  const _setLocalUserInfo = (userInfo) => {
    wx.setStorageSync(KEY, userInfo)
  }

  const _getLocalUserInfo = () => {
    let userInfo

    try {
      userInfo = wx.getStorageSync(KEY)
    } catch (e) {
      console.warn(e)
    }

    return userInfo && typeof userInfo === 'object'
      ? userInfo : {}
  }

  const _updateLocalUserInfo = async () => {
    const res = await wx.$async.getUserInfo()
    const { userInfo } = res

    await request.UPDATE_WECHAT_USER_INFO({
      ...res,
      userInfo: JSON.stringify(userInfo)
    }).send()
    _setLocalUserInfo(userInfo)

    return userInfo
  }

  const updateLocalUserInfo = async (setLocal = true) => {
    const userInfo = await _updateLocalUserInfo()
    if (setLocal) {
      setLocalUserInfo(userInfo)
    }
  }

  useEffect(() => {
    setLocalUserInfo(_getLocalUserInfo())
  }, [])

  return [localUserInfo, updateLocalUserInfo]
}

export default useLocalUserInfo
