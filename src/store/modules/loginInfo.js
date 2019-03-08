const state = {
  loginInfo: {}
};

const mutations = {
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
  }
};

export default {
  state,
  mutations
};
