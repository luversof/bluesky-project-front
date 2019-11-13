import _ from "lodash";

export const state = () => ({
  userBookkeeping: null,
  oldUserBookkeeping: null // 수정 시 이전 data를 저장
});

export const mutations = {
  setUserBookkeeping(state, userBookkeeping) {
    state.userBookkeeping = userBookkeeping;
  },
  beforeChangeUserBookkeeping(state) {
    console.log("beforeChangeUserBookkeeping");
    if (state.oldUserBookkeeping == null) {
      state.oldUserBookkeeping = _.cloneDeep(state.userBookkeeping);
    }
  },
  resetUserBookkeeping(state) {
    if (state.oldUserBookkeeping != null) {
      state.userBookkeeping = _.cloneDeep(state.oldUserBookkeeping);
      state.oldUserBookkeeping = null;
    }
  }
};
