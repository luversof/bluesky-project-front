import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      userBookkeeping: state =>
        state.bookkeeping.bookkeeping["userBookkeeping"],
      userEntryGroupList: state =>
        state.bookkeeping.entryGroup["userEntryGroupList"]
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserEntryGroupList: "bookkeeping/entryGroup/setUserEntryGroupList"
    }),
    getUserEntryGroupList() {
      if (this.userEntryGroupList != null) {
        return new Promise((resolve, reject) => {
          resolve(this.userEntryGroupList);
        });
      }

      return fetch("/api/bookkeeping/entryGroup.json", {
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(this.commonResponseData)
        .then(data => {
          this.setUserEntryGroupList(data);
          return data;
        });
    }
  }
};