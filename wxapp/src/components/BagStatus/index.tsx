import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";

@inject('bagStore')
@observer
export default class BagStatus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
  }

  render() {
    const {bagStore: {total, kingdomCount, clazzCount}} = this.props
    return (
      <View className='bag-status'>
        <View className='col'>
          <View className='label'>
            总数
          </View>
          <View className='value'>
            {total}
          </View>
        </View>
        <View className='separator'/>
        <View className='col'>
          <View className='label'>
            界
          </View>
          <View className='value'>
            {kingdomCount}
          </View>
        </View>
        <View className='separator'/>
        <View className='col'>
          <View className='label'>
            纲
          </View>
          <View className='value'>
            {clazzCount}
          </View>
        </View>
      </View>
    )
  }
}

