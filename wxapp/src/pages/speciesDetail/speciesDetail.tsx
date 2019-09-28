import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import api from '../../services/api'

export default class SpeciesList extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            loading: false,
        }
    }
    render() {
        <AtList>
            <AtListItem title='标题文字' note='描述信息' />
            <AtListItem title='标题文字' note='描述信息' arrow='right' />
            <AtListItem
                arrow='right'
                note='描述信息'
                title='标题文字标题文字标题文字标题文字标题文字'
                extraText='详细信息详细信息详细信息详细信息'
            />
        </AtList>
    }

}