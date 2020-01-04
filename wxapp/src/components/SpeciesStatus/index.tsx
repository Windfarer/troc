import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";
import {AtIcon, AtSearchBar} from "taro-ui";

@inject('bagStore')
@observer
export default class SpeciesStatus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
  }

  clearSpecies() {
    const {bagStore: {clear}} = this.props
    clear()
  }

  handleSearchChange(query) {
    this.props.onSearchChange(query)
  }

  handleSearchClick() {
    this.props.onSearchClick()
  }

  render() {
    const {bagStore: {total, kingdomCount, clazzCount}} = this.props
    const {query} = this.state
    return (
      <View className='species-status-panel'>
        <View className='at-row status'>
          <View className='at-col'>
            总数：{total}
          </View>
          <View className='at-col'>
            界：{kingdomCount}
          </View>
          <View className='at-col'>
            纲：{clazzCount}
          </View>
          <View className='at-col at-col-2' onClick={this.clearSpecies}>
            <AtIcon value='blocked' size='20' color='#AAA'></AtIcon>
          </View>
        </View>
        <View className='at-row'>
          <View className='at-col'>
            <AtSearchBar
              value={query}
              onChange={this.handleSearchChange.bind(this)}
              onActionClick={this.handleSearchClick.bind(this)}
              onBlur={this.handleSearchClick.bind(this)}
              onConfirm={this.handleSearchClick.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }
}

