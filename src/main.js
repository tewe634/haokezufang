import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './assets/font/iconfont.css'
import * as API from '@/api'

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
