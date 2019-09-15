import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import api from '../../services/api'

import './species.scss'
import { getNextId } from 'mobx/lib/utils/utils';
export default class SpeciesList extends Component {
    config: Config = {
        navigationBarTitleText: '物种列表'
    }
    constructor() {
        super(...arguments)
        this.state = {
            loading: true,
            speciesList: [],
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
        const { speciesList, next, page } = this.state
        if (!next) {
            return
        }
        api.getSpeciesList(page).then((res) => {
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
    onScrollToLower() {
        console.info("scroll")
        this.loadSpeciesList()
    }

    componentDidMount() {
        this.loadSpeciesList()
    }
    render() {
        const { speciesList } = this.state
        const list = speciesList.map((item) => (
            <AtListItem
                key={item.id}
                title={item.name_cn}
                onSwitchChange={this.handleChange}
            />
        ))
        return (
            <ScrollView
                enableBackToTop
                className='speciesList'
                scrollY
                scrollWithAnimation
                onScrollToLower={this.onScrollToLower}>
                <AtList>
                    {list}
                </AtList>
            </ScrollView>

        )
    }
}