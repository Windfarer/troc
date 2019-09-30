import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import api from '../../services/api'

export default class SpeciesList extends Component {
    constructor() {
        super(...arguments)
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
    componentWillMount() {
        const id = this.$router.params.id
        this.getSpeciesDetail(id)
    }
    render() {
        const { speciesObj } = this.state
        return (
            <ScrollView>
                < AtList hasBorder={false}>
                    <AtListItem title='名称' note={speciesObj.name_cn} />
                    <AtListItem title='英文名' note={speciesObj.name_en} />
                    <AtListItem title='日文名' note={speciesObj.name_jp} />
                    <AtListItem title='域' note={speciesObj.domain} />
                    <AtListItem title='界' note={speciesObj.kingdom} />
                    <AtListItem title='门' note={speciesObj.phylum} />
                    <AtListItem title='纲' note={speciesObj.clazz} />
                    <AtListItem title='亚纲' note={speciesObj.subclass} />
                    <AtListItem title='目' note={speciesObj.order} />
                    <AtListItem title='科' note={speciesObj.family} />
                    <AtListItem title='亚科' note={speciesObj.subfamily} />
                    <AtListItem title='属' note={speciesObj.genus} />
                    <AtListItem title='种' note={speciesObj.species} />
                </AtList >
            </ScrollView>
        )
    }
}