import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class XIcon extends Component {
  static externalClasses = ['xclass']

  static defaultProps = {
    icon: '',
  }

  render() {
    return <View className={`xclass x-icon x-icon-${this.props.icon}`} />
  }
}
