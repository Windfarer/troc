import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";

@inject('bagStore')
@observer
export default class SpeciesStatus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
  }

  render() {
    const { bagStore: { total, kingdomCount, clazzCount } } = this.props
    return (
      <View className='at-row'>
        <View className='at-col'>
          总数：{total}
        </View>
        <View className='at-col'>
          界：{kingdomCount}
        </View>
        <View className='at-col'>
          纲：{clazzCount}
        </View>
      </View>
    )
  }

}

