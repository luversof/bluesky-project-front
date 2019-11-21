export const state = () => ({
  userAssetGroupList: []
});

export const mutations = {
  setUserAssetGroupList(state, userAssetGroupList) {
    state.userAssetGroupList = userAssetGroupList;
  }
};
