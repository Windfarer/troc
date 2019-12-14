import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar } from "taro-ui"

import api from '../../services/api'

import './species.scss'
import { getNextId } from 'mobx/lib/utils/utils';
export default class SpeciesList extends Component {
    config: Config = {
        // navigationBarTitleText: '物种列表'
    }
    constructor() {
        super(...arguments)
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
        const { speciesList, next, page, query } = this.state
        if (!next) {
            return
        }
        api.getSpeciesList(page, query).then((res) => {
            let next = false
            if (res.data.next) {
                next = true
            }
            console.log(next)
            this.setState({
                loading: false,
                speciesList: speciesList.concat(res.data.results),
                page: page + 1,
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
        this.loadSpeciesList()
    }
    onSearchChange(value) {
        console.info("search")
        this.setState({
            query: value
        })
    }
    onSearchClick() {
        this.setState({
            speciesList: [],
            next: true,
            page: 1,
        })
        console.log(this.state)
        this.loadSpeciesList()
    }

    componentDidMount() {
        this.loadSpeciesList()
    }
    render() {
        const { speciesList, query } = this.state
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
                <AtSearchBar
                    value={query}
                    onChange={this.onSearchChange.bind(this)}
                    onActionClick={this.onSearchClick.bind(this)}
                />
                <AtList>
                    {list}
                </AtList>
            </ScrollView>

        )
    }
}
