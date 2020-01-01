import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";
import {AtList} from "taro-ui";

import SpeciesItem from "../SpeciesItem";

@inject('bagStore')
@observer
export default class SpeciesBag extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    this.props.onClick(this, this.props.key)
  }

  removeSpecies(id) {
    const {bagStore} = this.props
    bagStore.remove(id)
  }

  toDetail(id) {
    console.log(id)
    return Taro.navigateTo({
      url: '/pages/speciesDetail/speciesDetail?id=' + id
    })
  }

  render() {
    const {bagStore: {selectedSpecies}} = this.props
    const list = selectedSpecies.map((item) => (
      <SpeciesItem
        key={item.id}
        data={item}
        onClick={this.toDetail.bind(this, item.id)}
      />
    ))
    return (
      <ScrollView
        className='at-col speciesBagList'
        enableBackToTop
        scrollY
        scrollWithAnimation>
        <AtList>
          {list}
        </AtList>
      </ScrollView>
    )
  }
}
