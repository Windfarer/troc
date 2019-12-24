import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'

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
    const {selected} = this.state
    this.setState({
      selected: !selected
    }, function () {
      const {selected} = this.state
      console.log("updated", selected)
    })
    this.props.onSelect(this, this.props.key)
  }
  render() {
    return (
      <View className='species-item at-row at-row__justify--between'>
        <View className='at-col' onClick={this.onClick}>{this.props.title}</View>
        <View className='at-col at-col-1' onClick={this.selectSpecies}>v</View>
      </View>
    );
  }
}
