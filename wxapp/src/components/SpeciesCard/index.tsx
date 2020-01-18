import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './index.scss'
import {inject, observer} from "@tarojs/mobx";
import {AtListItem} from "taro-ui";

@inject('bagStore')
@observer
export default class SpeciesCard extends Component {
  static defaultProps = {
    name_cn: '',
    kingdom_cn: '',
    clazz_cn: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    }
  }

  onClick() {
  }

  toggle() {
    const {bagStore: {updateBySpecies}} = this.props
    updateBySpecies(this.props.data)
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const {data} = this.props
    const note = data.kingdom_cn + (data.kingdom_cn && data.clazz_cn ? " | " : "") + data.clazz_cn
    return (
      <View className='container'>
        <View className='default'>
          <View className='content'>
            <View className='name'>
              {data.name_cn}
            </View>
            <View className='short-description'>
              {note}
            </View>
          </View>
          <View className='action'>
            <View className='add-button'></View>
          </View>
        </View>
        <View className='addition'>
          <View className='full-description'>
            <AtListItem title='名称' note={data.name_cn} />
            <AtListItem title='英文名' note={data.name_en} />
            <AtListItem title='日文名' note={data.name_jp} />
            <AtListItem title='域' note={data.domain_cn + " " + data.domain} />
            <AtListItem title='界' note={data.kingdom_cn + " " + data.kingdom} />
            <AtListItem title='门' note={data.phylum_cn + " " + data.phylum} />
            <AtListItem title='纲' note={data.clazz_cn + " " + data.clazz} />
            <AtListItem title='亚纲' note={data.subclass_cn + " " + data.subclass} />
            <AtListItem title='目' note={data.order_cn + " " + data.order} />
            <AtListItem title='科' note={data.family_cn + " " + data.family} />
            <AtListItem title='亚科' note={data.subfamily_cn + " " + data.subfamily} />
            <AtListItem title='属' note={data.genus_cn + " " + data.genus} />
            <AtListItem title='种' note={data.species_cn + " " + data.species} />
          </View>
        </View>
      </View>
    )
  }
}
