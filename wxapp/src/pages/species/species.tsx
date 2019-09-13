import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import api from '../../services/api'

import './species.scss'
export default class SpeciesList extends Component {
    config: Config = {
        navigationBarTitleText: '物种列表'
    }
    constructor() {
        super(...arguments)
        this.state = {
            loading: true,
            speciesList: []
        }
    }
    handleChange() {

    }
    getSpeciesList() {
        this.setState({
            loading: true
        })
        api.get("/species/").then((res) => {
            this.setState({
                loading: false,
                speciesList: res.data.results
            })
        })
    }

    componentDidMount() {
        this.getSpeciesList()
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
            <View className='index'>
                <AtList>
                    {list}
                </AtList>
            </View>
        )
    }
}