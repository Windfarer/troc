import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtForm, AtInput, AtButton} from 'taro-ui'

import './me.scss'
import {inject, observer} from "@tarojs/mobx";
import auth from '../../services/auth'

@inject('authStore')
@observer
export default class Index extends Component {
  config: Config = {
    // navigationBarTitleText: '三界八纲'
  }

  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      value: ''
    }
  }

  onClick() {
    const { authStore } = this.props
    auth.login().then((res) => {
      const token = res.data.access
      authStore.updateToken(token)
      console.log(token)
    })
  }



  render() {
    return (
      <View className='index'>
        <AtButton formType='submit' onClick={this.onClick.bind(this)}>登录</AtButton>
      </View>
    )
  }
}
