import Vue from 'vue'
import App from './App'
import { router } from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import qs from 'qs'

Vue.prototype.$axios = axios
// this.http.post()
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded' //设置axios 发出post跨域请求
// }
axios.defaults.baseURL = '/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

// Vue.prototype.$qs = qs

Vue.prototype.$axios = axios

Vue.use(ElementUI)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
