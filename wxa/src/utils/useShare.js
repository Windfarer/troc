import { useContext, useState, useEffect } from 'react'
import { LangContext } from '@/utils/lang'
import { useShareAppMessage } from 'remax/wechat'
import { RequestContext } from '@/utils/request'

export default function useShare (mid) {
  const [inviteCode, setInviteCode] = useState(null)
  const [t] = useContext(LangContext)
  const request = useContext(RequestContext)

  useEffect(() => {
    !inviteCode && request.GET_INVITE_CODE().send()
      .then(({ code }) => {
        setInviteCode(code)
        wx.showShareMenu()
      })
      .catch(e => {
        console.warn('failed to get invite code', e)
        wx.showShareMenu()
      })
  }, [inviteCode])

  useShareAppMessage(e => {
    try {
      if (e.from === 'button') {
        return {
          title: t('share', 'title'),
          imageUrl: t('share', 'imageUrl', {
            r: Math.floor(Math.random() * 1000000)
          }),
          path: mid
            ? `${process.env.APP_ROUTES.main.lottery}?mid=${mid}&inviteCode=${inviteCode}`
            : `${process.env.APP_ROUTES.main.index}?inviteCode=${inviteCode}`
        }
      }
    } catch (e) {
      console.error(e)
    }

    return {
      title: t('share', 'title'),
      imageUrl: t('share', 'imageUrl', {
        r: Math.floor(Math.random() * 1000000)
      }),
      path: mid
        ? `${process.env.APP_ROUTES.main.lottery}?mid=${mid}`
        : process.env.APP_ROUTES.main.index
    }
  })
}
