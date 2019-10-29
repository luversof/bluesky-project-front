import _ from "lodash";

export const state = () => ({
  myAssetList: null
});

export const mutations = {
  setMyAssetList(state, myAssetList) {
    state.myAssetList = myAssetList;
  }
};
