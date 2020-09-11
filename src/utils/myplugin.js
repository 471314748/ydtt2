import store from '../store'
import Vue from 'vue'
import router from '../router'
// 和其他UI框架区别
import { Toast } from 'vant'
Vue.use(Toast)

// vue插件
var pluginObj = {}
pluginObj.install = function (VueObj) {
  VueObj.prototype.$login = function () {
    var token = store.state.userInfo.token
    if (!token) {
      Toast.fail('用户未登录')
      router.push('/checklogin')
      return false
    }
    return true
  }
}
export default pluginObj
