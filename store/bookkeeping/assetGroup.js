import _ from "lodash";

export const state = () => ({
  myAssetGroupList: null
});

export const mutations = {
  setMyAssetGroupList(state, myAssetGroupList) {
    state.myAssetGroupList = myAssetGroupList;
  }
};
