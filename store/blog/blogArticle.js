export const state = () => ({
  userBlogArticleList: {}, // 유저 블로그 글 목록
  blogArticleStateInfo: {
    // 효과적인 객체 관리 형태 고민 필요
    title: {
      state: false,
      invalidFeedback: "",
    },
    content: {
      state: false,
      invalidFeedback: "",
    },
  },
});

export const mutations = {
  setUserBlogArticleList(state, userBlogArticleList) {
    state.userBlogArticleList = userBlogArticleList;
  },
};
