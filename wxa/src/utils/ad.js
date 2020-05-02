import React, { createContext, useMemo, useState, useEffect } from 'react'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

import { Ad, View } from 'remax/wechat'

const {
  MINA_APP_AD_VIDEO_NEW_INDEX,
  MINA_APP_AD_VIDEO_INDEX,
  MINA_APP_AD_VIDEO_BET_CONFIRM,
  MINA_APP_AD_VIDEO_ME_SECTION,
  MINA_APP_AD_VIDEO_LIST_SECTION,
  MINA_APP_AD_VIDEO_LIST_ITEM,
  MINA_APP_AD_VIDEO_PRIZE_CONFIRM,
  MINA_APP_AD_INTERSTITIAL_TAB,
  MINA_APP_AD_INTERSTITIAL_WITHDRAW,
  MINA_APP_AD_INTERSTITIAL_BET_CONFIRM,
  MINA_APP_AD_INTERSTITIAL_AD_PRIZE_CONFIRM,
  MINA_APP_AD_INTERSTITIAL_LOTTERY_ON_SHOW
} = process.env

const interstitialAdIds = {
  tab: MINA_APP_AD_INTERSTITIAL_TAB,
  withdraw: MINA_APP_AD_INTERSTITIAL_WITHDRAW,
  betConfirm: MINA_APP_AD_INTERSTITIAL_BET_CONFIRM,
  prizeConfirm: MINA_APP_AD_INTERSTITIAL_AD_PRIZE_CONFIRM,
  lotteryOnShow: MINA_APP_AD_INTERSTITIAL_LOTTERY_ON_SHOW
}

const getInterstitialAdClients = () => {
  const ret = {}
  Object.keys(interstitialAdIds).forEach(i => {
    ret[i] = () => {
      const [client, setClient] = useState(null)

      useEffect(() => {
        const timeout = setTimeout(() => {
          if (!wx.createInterstitialAd) {
            console.error('unable to use createInterstitialAd')
            if (wx._systemInfo) {
              console.error(wx._systemInfo)
            }
            return
          }
          setClient(wx.createInterstitialAd({ adUnitId: interstitialAdIds[i] }))
        }, 0)
        return () => {
          clearTimeout(timeout)
          if (client) {
            client.destroy()
          }
        }
      }, [])

      return client
    }
  })
  return ret
}

function AdWrapper ({
  name,
  setAdStatus,
  onLoad, onError, onClose, unitId,
  marginBottom = '36rpx', adOptions, wrapperOptions
}) {
  const [style, setStyle] = useState({
    ...(wrapperOptions?.style || {}),
    marginBottom
  })
  const [timeouts, setTimeouts] = useState([])

  const setLoadedStyle = () => setStyle({
    ...(wrapperOptions?.style || {}),
    marginBottom
  })

  const setErrorStyle = () => setStyle({
    display: 'none'
  })

  useEffect(() => {
    return () => timeouts.forEach(i => clearTimeout(i))
  }, [])

  return <View {...wrapperOptions} style={style} >
    {useMemo(() => {
      return <Ad
        {...adOptions}
        unitId={unitId}
        onLoad={() => {
          console.log('AdComponent:', name, 'loaded', unitId)
          const timeout = setTimeout(() => setLoadedStyle(), 0)
          setTimeouts([...timeouts, timeout])
          setAdStatus && setAdStatus(1)
          onLoad && onLoad()
        }}
        onError={() => {
          console.log('AdComponent:', name, 'failed', unitId)
          const timeout = setTimeout(() => setErrorStyle(), 0)
          setTimeouts([...timeouts, timeout])
          setAdStatus && setAdStatus(2)
          onError && onError()
        }}
        onClose={() => {
          console.log('AdComponent:', name, 'closed', unitId)
          onClose && onClose()
        }}
      />
    }, [adOptions])}
  </View>
}

// bannerAds
const bannerAdIds = {}
const bannerAdComponents = (() => {
  const ret = {}
  Object.keys(bannerAdIds).forEach(i => {
    const name = `${upperFirst(`${camelCase(i)}`)}BannerAd`
    ret[name] = function WrappedAd ({ unitId, ...options }) {
      return <AdWrapper
        name={name}
        unitId={bannerAdIds[i]}
        {...options}
      />
    }
  })
  return ret
})()

// videoAds
const videoAdIds = {
  newIndex: MINA_APP_AD_VIDEO_NEW_INDEX,
  index: MINA_APP_AD_VIDEO_INDEX,
  betConfirm: MINA_APP_AD_VIDEO_BET_CONFIRM,
  meSection: MINA_APP_AD_VIDEO_ME_SECTION,
  listSection: MINA_APP_AD_VIDEO_LIST_SECTION,
  prizeConfirm: MINA_APP_AD_VIDEO_PRIZE_CONFIRM,
  listItem: MINA_APP_AD_VIDEO_LIST_ITEM
}

const videoAdComponents = (() => {
  const ret = {}
  Object.keys(videoAdIds).forEach(i => {
    const name = `${upperFirst(`${camelCase(i)}`)}VideoAd`
    ret[name] = function WrappedAd ({ unitId, ...options }) {
      return <AdWrapper
        {...options}
        name={name}
        unitId={videoAdIds[i]}
        adOptions={{
          ...(options.adOptions || {}),
          adType: 'video'
        }}
      />
    }
  })
  return ret
})()

const contextValue = {
  interstitialAds: getInterstitialAdClients(),
  ...bannerAdComponents,
  ...videoAdComponents
}

const AdContext = createContext(contextValue)

function WithAd ({ children }) {
  return <AdContext.Provider value={contextValue}>
    {children}
  </AdContext.Provider>
}

export {
  WithAd,
  AdContext,
  bannerAdComponents,
  videoAdComponents
}
