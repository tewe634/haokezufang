import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    city: '北京'
  },
  getters: {},
  mutations: {
    SEND_TOKEN(state, payload) {
      state.token = payload
      setToken(payload)
    },
    HOTCITY(state, payload) {
      state.city = payload
    }
  },
  actions: {},
  modules: {}
})
