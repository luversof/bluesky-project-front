import _ from "lodash";

export const state = () => ({
  userBookkeeping: {
    id: null,
    name: null,
    userId: null,
    baseDate: 0
  },
  isUserBookkeepingLoaded: false,
  oldUserBookkeeping: {} // 리셋 기능 구현을 위한 store
});

export const mutations = {
  setUserBookkeeping(state, userBookkeeping) {
    state.userBookkeeping = userBookkeeping;
    state.isUserBookkeepingLoaded = true;
    state.oldUserBookkeeping = {};
  },
  beforeChangeUserBookkeeping(state) {
    if (state.oldUserBookkeeping.id == null) {
      state.oldUserBookkeeping = _.cloneDeep(state.userBookkeeping);
    }
  },
  resetUserBookkeeping(state) {
    if (state.oldUserBookkeeping.id != null) {
      state.userBookkeeping = _.cloneDeep(state.oldUserBookkeeping);
      state.oldUserBookkeeping = {};
    }
  }
};
