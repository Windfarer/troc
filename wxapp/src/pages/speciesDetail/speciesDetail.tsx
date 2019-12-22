import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem, AtFab } from "taro-ui"

import api from '../../services/api'

import './speciesDetail.scss'

export default class SpeciesList extends Component {
    constructor(props) {
      super(props)
        this.state = {
            loading: false,
            speciesObj: {
                "id": 0,
                "domain": "",
                "domain_cn": "",
                "kingdom": "",
                "kingdom_cn": "",
                "phylum": "",
                "phylum_cn": "",
                "subphylum": "",
                "subphylum_cn": "",
                "clazz": "",
                "clazz_cn": "",
                "subclass": "",
                "subclass_cn": "",
                "order": "",
                "order_cn": "",
                "family": "",
                "family_cn": "",
                "subfamily": "",
                "subfamily_cn": "",
                "genus": "",
                "genus_cn": "",
                "species": "",
                "species_cn": "",
                "name_cn": "",
                "name_en": "",
                "name_jp": "",
                "origin": "",
                "habitats": "",
                "part": "",
                "type": "",
                "created_at": "",
                "updated_at": "",
            },
        }
    }
    getSpeciesDetail(id) {
        api.getSpeciesDetail(id).then((res) => {
            this.setState({
                speciesObj: res.data,
            })
            console.log(res.data)
        })
    }
    onFabClick() {
        console.log("eat this today")
        const id = this.$router.params.id
        api.createRecord(id)
    }
    componentWillMount() {
        const id = this.$router.params.id
        this.getSpeciesDetail(id)
    }
    render() {
        const { speciesObj } = this.state
        return (
            <ScrollView>
                <View className='fab'>
                    <AtFab onClick={this.onFabClick.bind(this)}>
                        <Text className='at-fab__icon at-icon at-icon-menu'></Text>
                    </AtFab>
                </View>
                < AtList hasBorder={false}>
                    <AtListItem title='名称' note={speciesObj.name_cn} />
                    <AtListItem title='英文名' note={speciesObj.name_en} />
                    <AtListItem title='日文名' note={speciesObj.name_jp} />
                    <AtListItem title='域' note={speciesObj.domain_cn + " " + speciesObj.domain} />
                    <AtListItem title='界' note={speciesObj.kingdom_cn + " " + speciesObj.kingdom} />
                    <AtListItem title='门' note={speciesObj.phylum_cn + " " + speciesObj.phylum} />
                    <AtListItem title='纲' note={speciesObj.clazz_cn + " " + speciesObj.clazz} />
                    <AtListItem title='亚纲' note={speciesObj.subclass_cn + " " + speciesObj.subclass} />
                    <AtListItem title='目' note={speciesObj.order_cn + " " + speciesObj.order} />
                    <AtListItem title='科' note={speciesObj.family_cn + " " + speciesObj.family} />
                    <AtListItem title='亚科' note={speciesObj.subfamily_cn + " " + speciesObj.subfamily} />
                    <AtListItem title='属' note={speciesObj.genus_cn + " " + speciesObj.genus} />
                    <AtListItem title='种' note={speciesObj.species_cn + " " + speciesObj.species} />
                </AtList >
            </ScrollView>
        )
    }
}
