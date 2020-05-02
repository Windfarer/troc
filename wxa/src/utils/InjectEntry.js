import React from 'react'
import { View } from 'remax/wechat'

export default function InjectEntry ({ children }) {
  return <>
    {children}
    <View style={{ height: '36rpx' }} />
  </>
}
