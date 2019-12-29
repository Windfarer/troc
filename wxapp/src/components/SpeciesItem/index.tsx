import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";

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
    const { bagStore: { updateBySpecies } } = this.props
    updateBySpecies(this.props.data)
    this.setState({
      selected: !this.state.selected
    })
  }
  render() {
    const { bagStore: { hasSelected} } = this.props
    const {data} = this.props
    const {selected} = this.state
    const selectIconClass = selected ? 'at-icon-subtract-circle' : 'at-icon-add-circle'
    return (
      <View className='species-item at-row at-row__justify--between'>
        <View className='at-col' onClick={this.onClick}>{data.name_cn}</View>
        <View className={`at-col at-col-1 at-icon ${selectIconClass}`} onClick={this.selectSpecies}></View>
      </View>
    )
  }
}
