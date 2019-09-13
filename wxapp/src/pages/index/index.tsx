import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

import './index.scss'
export default class Index extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }

  render() {
    return (
      <View className='index'>
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <AtInput
            name='value1'
            type='text'
            placeholder='吃啥'
            onChange={this.handleChange.bind(this)}
          />
          <AtButton formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    )
  }
}