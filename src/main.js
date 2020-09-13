import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload, Toast, AddressList, Area, Cell, CellGroup, Popup, Field, Picker, Dialog } from 'vant'

import 'vant/lib/index.css'
import './style/icon.css'

// 导入过滤器
import './utils/myfilter'
// 自动转rem
import 'amfe-flexible/index.js'

// 封装登录校验
// Vue.prototype.$login = function () {
//   let token = store.state.userInfo.token
//   if (!token) {
//     Toast.fail('用户未登录')
//     router.push('/')
//     return false
//   }
//   return true
// }

// 导入插件
import myplugin from './utils/myplugin'
Vue.use(myplugin)

Vue.config.productionTip = false

Vue.use(Vant)

Vue.use(Lazyload, Toast, AddressList, Area, Cell, CellGroup, Popup, Field, Picker, Dialog)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
