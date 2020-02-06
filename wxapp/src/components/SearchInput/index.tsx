import Taro, {Component} from '@tarojs/taro'
import {Input, View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";
import {XIcon} from '../../icons'


@inject('bagStore')
@observer
export default class SearchInput extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
  }

  handleSearchChange(query) {
    this.props.onSearchChange(query)
  }

  handleSearchClick() {
    this.props.onSearchClick()
  }

  render() {
    const {query} = this.state
    return (
      <View className='container'>
        <Input type='text' placeholder='Search...'/>
        <View className='search-button'>
          <XIcon icon='search'></XIcon>
        </View>
      </View>
    )
  }
}

