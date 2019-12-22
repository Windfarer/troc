import Taro from '@tarojs/taro'
import {AtListItem} from "taro-ui"

import './index.scss'

export default class SpeciesItem extends AtListItem {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }
}
