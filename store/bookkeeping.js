import _ from "lodash";

export const state = () => ({
  myBookkeepingInfo: null,
  oldMyBookkeepingInfo: null // 수정 시 이전 data를 저장
});

export const mutations = {
  setMyBookkeepingInfo(state, myBookkeepingInfo) {
    state.myBookkeepingInfo = myBookkeepingInfo;
  },
  beforeChangeMyBookkeepingInfo(state) {
    console.log("beforeChangeMyBookkeepingInfo");
    if (state.oldMyBookkeepingInfo == null) {
      console.log("ASET");
      state.oldMyBookkeepingInfo = _.cloneDeep(state.myBookkeepingInfo);
    }
  },
  resetMyBookkeepingInfo(state) {
    if (state.oldMyBookkeepingInfo != null) {
      state.myBookkeepingInfo = _.cloneDeep(state.oldMyBookkeepingInfo);
      state.oldMyBookkeepingInfo = null;
    }
  }
};
