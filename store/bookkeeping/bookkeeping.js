import _ from "lodash";

export const state = () => ({
  myBookkeeping: null,
  myAssetList: null,
  oldMyBookkeeping: null // 수정 시 이전 data를 저장
});

export const mutations = {
  setMyBookkeeping(state, myBookkeeping) {
    state.myBookkeeping = myBookkeeping;
  },
  beforeChangeMyBookkeeping(state) {
    console.log("beforeChangeMyBookkeeping");
    if (state.oldMyBookkeeping == null) {
      state.oldMyBookkeeping = _.cloneDeep(state.myBookkeeping);
    }
  },
  resetMyBookkeeping(state) {
    if (state.oldMyBookkeeping != null) {
      state.myBookkeeping = _.cloneDeep(state.oldMyBookkeeping);
      state.oldMyBookkeeping = null;
    }
  },
  setMyAssetList(state, myAssetList) {
    state.myAssetList = myAssetList;
  }
};
