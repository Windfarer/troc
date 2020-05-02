import React, { useContext } from 'react'
import { styled } from 'linaria/react'
import { View, Text } from '@tarojs/components'
import { RequestContext } from '@/utils/request'
import './index.styl'

const Hello = styled(Text)`
  color: red
`;

function IndexPage  () {
  const request = useContext(RequestContext)
  console.log(request)
  debugger
  return <View>
    <Hello>123</Hello>
  </View>
}

export default IndexPage
