import _ from "lodash";

export const state = () => ({
  userAssetGroupList: null
});

export const mutations = {
  setUserAssetGroupList(state, userAssetGroupList) {
    state.userAssetGroupList = userAssetGroupList;
  }
};
