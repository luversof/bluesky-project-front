import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginInfo: {},
    test: '',
    blogArticleStateInfo: { // 효과적인 객체 관리 형태 고민 필요
      title: {
        state: false,
        invalidFeedback: ''
      },
      content: {
        state: false,
        invalidFeedback: ''
      }
    }
  },
  mutations: {
    setLoginInfo: function (state, loginInfo) {
      state.loginInfo = loginInfo
    },
    setTest: function (state, message) {
      state.test = message
    },
    setBlogArticleStateInfo (state, blogArticleStateInfo) {
      state.blogArticleStateInfo = blogArticleStateInfo
    }
  }
})
