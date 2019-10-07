import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem, AtCalendar } from "taro-ui"

import api from '../../services/api'

import './record.scss'

export default class SpeciesList extends Component {
    config: Config = {
        // navigationBarTitleText: '物种列表'
    }
    constructor() {
        super(...arguments)
        this.state = {
            loading: true,
            list: [],
            page: 1,
            next: true,
        }
    }
    handleChange() {

    }
    loadSpeciesList() {
        console.info("load")
        this.setState({
            loading: true
        })
        const { list, next, page } = this.state
        if (!next) {
            return
        }
        api.getRecordList(page).then((res) => {
            let next = false
            if (res.data.next) {
                next = true
            }
            console.log(next)
            this.setState({
                loading: false,
                speciesList: list.concat(res.data.results),
                page: page + 1,
                next: next
            })
        })
    }
    onScrollToLower() {
        console.info("scroll")
        this.loadSpeciesList()
    }

    componentDidMount() {
        this.loadSpeciesList()
    }
    render() {
        const { list } = this.state
        const listItems = list.map((item) => (
            <AtListItem
                key={item.id}
                title={item.name_cn}
                onSwitchChange={this.handleChange}
            />
        ))
        return (
            <ScrollView
                enableBackToTop
                scrollY
                scrollWithAnimation
                onScrollToLower={this.onScrollToLower}>
                <AtCalendar />
                <AtList>
                    {listItems}
                </AtList>
            </ScrollView>

        )
    }
}