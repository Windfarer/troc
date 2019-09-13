import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import './species.scss'
export default class SpeciesList extends Taro.Component {
    config: Config = {
        navigationBarTitleText: '首页'
    }

    render() {
        return (
            <View className='index'>
                <AtList>
                    <AtListItem
                        title='标题文字'
                        isSwitch
                        onSwitchChange={this.handleChange}
                    />
                </AtList>
            </View>
        )
    }
}