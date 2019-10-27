export const state = () => ({
  loginInfo: null,
  isLogin: false,
  isLoaded: false
});

export const mutations = {
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
    state.isLogin = loginInfo.login
  },
  setLoaded(state, isLoaded) {
    state.isLoaded = isLoaded;
  }
};
