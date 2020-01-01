import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";
import {AtIcon} from 'taro-ui'

@inject('bagStore')
@observer
export default class SpeciesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  onClick() {
    this.props.onClick(this, this.props.key)
  }

  selectSpecies() {
    const {bagStore: {updateBySpecies}} = this.props
    updateBySpecies(this.props.data)
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const {bagStore: {hasSelected}} = this.props
    const {data} = this.props
    const note = data.kingdom_cn + (data.kingdom_cn && data.clazz_cn ? " | " : "") + data.clazz_cn
    return (
      <View className='species-item at-row at-row__justify--between'>
        <View className='at-col' onClick={this.onClick}>
          <View className='at-row'>
            <View className='at-col'>
              {data.name_cn}
            </View>
          </View>
          <View className='at-row species-item-note'>
            <View className='at-col'>
              {note ? note : "--"}
            </View>
          </View>
        </View>
        <View className='at-col at-col-2 select-btn' onClick={this.selectSpecies}>
          <AtIcon value='add' size='24' color='#AAA'></AtIcon>
        </View>
      </View>
    )
  }
}
