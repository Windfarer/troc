import { observable, action } from 'mobx';
import auth from '../services/auth'

class authStore {
  @observable token = ''
  @action updateToken(token) {
    this.token = token
  }
  @action getToken() {
    return this.token
  }
  @action login() {
    let res = auth.login()
    console.log("authstore", res)
  }
}
export default authStore
