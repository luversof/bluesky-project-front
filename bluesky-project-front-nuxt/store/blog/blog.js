export const state = () => ({
  userBlog: { id: null }, // 유저 블로그 정보
  blogArticleStateInfo: {
    // 효과적인 객체 관리 형태 고민 필요
    title: {
      state: false,
      invalidFeedback: ""
    },
    content: {
      state: false,
      invalidFeedback: ""
    }
  }
});

export const mutations = {
  setUserBlog(state, userBlog) {
    state.userBlog = userBlog;
  },
  setBlogArticleStateInfo(state, blogArticleStateInfo) {
    state.blogArticleStateInfo = blogArticleStateInfo;
  },
  initBlogArticleStateInfo(state) {
    state.blogArticleStateInfo = {
      // 초기화 복붙 어떻게 해결하는거지?, store 를 분리 관리 해야할까?
      title: {
        state: false,
        invalidFeedback: ""
      },
      content: {
        state: false,
        invalidFeedback: ""
      }
    };
  }
};
