export const state = () => ({
  loginInfo: null,
  isLogin: false, // 호출하기 쉽게 alias 처리
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
