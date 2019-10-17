export const state = () => ({
  myBookkeepingInfo: null
});

export const mutations = {
  setMyBookkeepingInfo(state, myBookkeepingInfo) {
    state.myBookkeepingInfo = myBookkeepingInfo;
  }
};
