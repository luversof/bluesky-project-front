export const state = () => ({
  userEntryGroupTypeList: [
    // 여기서 i18n 사용할 수 있는 방법은 없을까?
    { value: "INCOME", text: "수입" },
    { value: "EXPENSE", text: "지출" },
    { value: "TRANSFER", text: "이체" }
  ]
});
