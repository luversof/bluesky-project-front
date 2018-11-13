import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginInfo: {},
    test: '',
    myBlog: {}, // 내 블로그 정보
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
    setMyBlog: function (state, myBlog) {
      state.myBlog = myBlog
    },
    setBlogArticleStateInfo (state, blogArticleStateInfo) {
      state.blogArticleStateInfo = blogArticleStateInfo
    },
    initBlogArticleStateInfo (state) {
      state.blogArticleStateInfo = { // 초기화 복붙 어떻게 해결하는거지?
        title: {
          state: false,
          invalidFeedback: ''
        },
        content: {
          state: false,
          invalidFeedback: ''
        }
      }
    }
  }
})
