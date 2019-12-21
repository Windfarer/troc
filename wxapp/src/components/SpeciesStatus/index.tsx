import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'

import './index.scss'

export default class Index extends Component {
  static defaultProps = {
    selectedSpecies: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      kingdomCount: 0,
      clazzCount: 0,
    }
  }

  

  componentDidMount(): void {
    console.log('来了老弟')
    console.log('xxxxxx')
  }

  render() {
    return (
      <View className=''>
        <Text className=''>总数：{this.props.selectedSpecies.length}</Text>
        <Text className=''>界：{this.state.kingdomCount}</Text>
        <Text className=''>纲：{this.state.clazzCount}</Text>
      </View>
    )
  }

}

