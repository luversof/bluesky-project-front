export const state = () => ({
  userEntryGroupList: null
});

export const mutations = {
  setUserEntryGroupList(state, userEntryGroupList) {
    state.userEntryGroupList = userEntryGroupList;
  }
};
