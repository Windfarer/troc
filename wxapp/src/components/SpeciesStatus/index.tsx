import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'

import './index.scss'

export default class SpeciesStatus extends Component {
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
  }

  render() {
    return (
      <View className='at-row'>
        <View className='at-col'>
          总数：{this.props.selectedSpecies.length}
        </View>
        <View className='at-col'>
          界：{this.state.kingdomCount}
        </View>
        <View className='at-col'>
          纲：{this.state.clazzCount}
        </View>
      </View>
    )
  }

}

