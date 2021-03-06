import Taro, {Component, Config} from '@tarojs/taro'
import {inject, observer, Provider} from '@tarojs/mobx'
import Index from './pages/me/me'

import authStore from './store/auth'
import bagStore from './store/bag'

import './app.scss'
import auth from "./services/auth";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  authStore,
  bagStore,
}


class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/speciesList/speciesList',
      'pages/species/species',
      'pages/speciesDetail/speciesDetail',
      // 'pages/me/me',
      // 'pages/record/record'
    ],
    window: {
      backgroundTextStyle: 'light',
      // navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: "custom"
    },
    // tabBar: {
    //   list: [
    //     {
    //       pagePath: "pages/record/record",
    //       text: "打卡"
    //     },
    //     {
    //       pagePath: "pages/species/species",
    //       text: "物种"
    //     },
    //     {
    //       pagePath: "pages/me/me",
    //       text: "我的"
    //     },
    //   ]
    // }

  }

  componentDidMount() {
    Taro.$store = store
    auth.login().then((res) => {
      const token = res.data.access
      Taro.$store.authStore.updateToken(token)
      console.log('login success')
    })
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
