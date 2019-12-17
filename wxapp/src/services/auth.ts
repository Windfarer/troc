import Taro, {login} from '@tarojs/taro'
import api from './api';

export default {
  checkAuth() {
    return Taro.checkSession({
      success: function () {
        console.log("session valid")
      },
      fail: function () {
        console.log("session exipred")
        login()
      }
    })
  },
  login() {
    return Taro.login().then((res) => {
      if (res.code) {
        return api.auth(res.code)
      }
    })
  }
}
