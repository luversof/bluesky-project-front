export const state = () => ({
  loginInfo: { name: null, login: false },
  isLoginInfoLoaded: false
});

export const mutations = {
  setLoginInfo(state, loginInfo) {
    if (loginInfo == null) {
      return;
    }
    state.loginInfo = loginInfo;
    state.isLoginInfoLoaded = true;
  }
};
