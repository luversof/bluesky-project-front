import _ from "lodash";

export const state = () => ({
  userAssetList: [],
  isUserAssetListLoaded: false
});

export const mutations = {
  setUserAssetList(state, userAssetList) {
    state.userAssetList = userAssetList;
    state.isUserAssetListLoaded = true;
  }
};
