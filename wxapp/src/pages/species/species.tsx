import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView} from '@tarojs/components'
import {AtList, AtSearchBar, AtListItem} from "taro-ui"

import api from '../../services/api'
import {SpeciesStatus} from '../../components/SpeciesStatus'
import {SpeciesItem} from '../../components/SpeciesItem'

import './species.scss'

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

  handleChange() {

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
    Taro.navigateTo({
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
    const {speciesList, query} = this.state
    const list = speciesList.map((item) => (
      <AtListItem
        key={item.id}
        title={item.name_cn}
        onSwitchChange={this.handleChange}
        onClick={this.toDetail.bind(this, item.id)}
      />
    ))
    return (
      <ScrollView
        enableBackToTop
        className='speciesList'
        scrollY
        scrollWithAnimation
        onScrollToLower={this.onScrollToLower}>
        <SpeciesStatus selectedSpecies={this.state.speciesList}/>
        <AtSearchBar
          value={query}
          onChange={this.onSearchChange.bind(this)}
          onActionClick={this.onSearchClick.bind(this)}
          // fixed
        />
        <AtList>
          {list}
        </AtList>
      </ScrollView>

    )
  }
}
