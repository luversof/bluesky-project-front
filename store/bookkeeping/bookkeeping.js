import _ from "lodash";

export const state = () => ({
  userBookkeeping: {
    id: null,
    name: null,
    userId: null,
    baseDate: 0
  },
  isUserBookkeepingLoaded: false
});

export const mutations = {
  setUserBookkeeping(state, userBookkeeping) {
    state.userBookkeeping = userBookkeeping;
    state.isUserBookkeepingLoaded = true;
  }
};
