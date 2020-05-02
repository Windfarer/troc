function doCreateSystemInfo () {
  const systemInfo = wx.getSystemInfoSync()
  const menuButton = wx.getMenuButtonBoundingClientRect()
  const statusBarHeight = systemInfo.statusbarHeight || systemInfo.statusBarHeight || 20
  const isIos = systemInfo.platform === 'ios' || systemInfo.system.toLowerCase().includes('ios')
  const isIphoneX = isIos && statusBarHeight > 20
  const indicatorHeight = isIphoneX ? '34px' : '0px'

  if (!menuButton || !systemInfo) {
    throw new Error('Invalid return value from WeChat API!')
  }

  const ret = {
    ...systemInfo,
    statusBarHeight,
    indicatorHeight,
    isIos,
    isIphoneX,
    menuButton: {
      ...menuButton,
      marginX: systemInfo.screenWidth - menuButton.right,
      marginY: menuButton.top - statusBarHeight
    }
  }

  wx._systemInfo = ret

  return ret
}

function createSystemInfo (depth) {
  if (depth === 3) {
    return doCreateSystemInfo()
  }
  try {
    return doCreateSystemInfo()
  } catch (e) {
    console.error(e)
    return (createSystemInfo(depth + 1))
  }
}

function useSystemInfo () {
  if (wx._systemInfo) {
    return wx._systemInfo
  }
  return createSystemInfo(0)
}

export default useSystemInfo
