import { observable, action } from 'mobx';
import auth from '../services/auth'
import { createContext } from '@tarojs/taro';

class authStore {
  @observable token = ''
  @action.bound
  updateToken(token) {
    this.token = token
    console.log("token updated", this.token)
  }
}
export default new authStore()
