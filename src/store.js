import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginInfo: {}
  },
  mutations: {
    setLoginInfo: function (state, loginInfo) {
      state.loginInfo = loginInfo
    }
  }
})
