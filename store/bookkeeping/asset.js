import _ from "lodash";

export const state = () => ({
  userAssetList: null
});

export const mutations = {
  setUserAssetList(state, userAssetList) {
    state.userAssetList = userAssetList;
  }
};
