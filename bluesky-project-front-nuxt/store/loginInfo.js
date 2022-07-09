export const state = () => ({
  loginInfo: { name: null, id: null },
  isLoginInfoLoaded: false
});

export const mutations = {
  setLoginInfo(state, loginInfo) {
    state.isLoginInfoLoaded = true;
    state.loginInfo = loginInfo == null ? { name: null, id: null } : loginInfo;
  }
};
