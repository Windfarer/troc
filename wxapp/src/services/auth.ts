import Taro, { login } from '@tarojs/taro'
import api from './api';

export default {
    checkAuth() {
        Taro.checkSession({
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
        Taro.login({
            success: function (res) {
                if (res.code) {
                    console.log('get code ' + res.code)
                    api.auth(res.code)
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            },
            fail: function (res) {
                console.log('登录失败！' + res.errMsg)
            }
        })
    }
}