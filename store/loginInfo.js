export const state = () => ({
  loginInfo: null
});

export const mutations = {
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
  }
};
