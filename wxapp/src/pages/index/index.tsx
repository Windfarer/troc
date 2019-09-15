import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import auth from '../../services/auth'

import './index.scss'
export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '三界八纲'
  }
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  onClick() {
    console.log('hey!')
    auth.login()
  }

  render() {
    return (
      <View className='index'>
        <AtButton formType='submit' onClick={this.onClick}>提交</AtButton>
      </View>
    )
  }
}