export const state = () => ({
  userEntryGroupList: []
});

export const mutations = {
  setUserEntryGroupList(state, userEntryGroupList) {
    state.userEntryGroupList = userEntryGroupList;
  }
};
