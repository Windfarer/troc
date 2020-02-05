import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'

import api from '../../services/api'
import {BagStatus} from '../../components/BagStatus'
import {SpeciesCard} from '../../components/SpeciesCard'
import {SearchInput} from '../../components/SearchInput'

import './speciesList.scss'

export default class SpeciesList extends Component {
  config: Config = {
    // navigationBarTitleText: '物种列表'
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      speciesList: [],
      page: 1,
      next: true,
      query: "",
    }
  }

  loadSpeciesList() {
    console.info("load")
    this.setState({
      loading: true
    })
    const {speciesList, next, page, query} = this.state
    if (!next) {
      return
    }
    api.getSpeciesList(page, query).then((res) => {
      let next = false
      if (res.data.next) {
        next = true
      }
      this.setState({
        loading: false,
        speciesList: speciesList.concat(res.data.results),
        next: next
      })
    })
  }

  toDetail(id) {
    console.log(id)
    return Taro.navigateTo({
      url: '/pages/speciesDetail/speciesDetail?id=' + id
    })
  }

  onScrollToLower() {
    console.info("scroll")
    const {page} = this.state
    this.setState({
      page: page + 1,
    }, this.loadSpeciesList)
  }

  onSearchChange(value) {
    this.setState({
      query: value
    })
  }

  scrollDebug(evt) {
    console.log(evt)
  }

  onSearchClick() {
    this.setState({
      speciesList: [],
      next: true,
      page: 1,
    }, this.loadSpeciesList)
  }

  componentDidMount() {
    this.loadSpeciesList()
  }

  render() {
    const {speciesList} = this.state
    const list = speciesList.map((item) => (
      <SpeciesCard
        key={item.id}
        data={item}
      />
    ))
    return (
      <View className='main'>
        <View className='row head'><BagStatus></BagStatus></View>
        <View className='row search'><SearchInput></SearchInput></View>
        <ScrollView
          enableFlex
          enableBackToTop
          scrollY
          scrollWithAnimation
          onScroll={this.scrollDebug}
          onScrollToLower={this.onScrollToLower}
          className='row list'>
          {list}
        </ScrollView>
      </View>
    )
  }
}
