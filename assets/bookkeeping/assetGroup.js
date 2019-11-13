import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      userBookkeeping: state =>
        state.bookkeeping.bookkeeping["userBookkeeping"],
      userAssetGroupList: state =>
        state.bookkeeping.assetGroup["userAssetGroupList"]
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserBookkeeping: "bookkeeping/bookkeeping/setUserBookkeeping",
      setUserAssetGroupList: "bookkeeping/assetGroup/setUserAssetGroupList"
    }),
    getUserAssetGroupList() {
      if (this.userAssetGroupList != null) {
        return new Promise((resolve, reject) => {
          resolve(this.userAssetGroupList);
        });
      }

      return fetch("/api/bookkeeping/assetGroup.json", {
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(this.commonResponseData)
        .then(data => {
          this.setUserAssetGroupList(data);
          return data;
        });
    }
  }
};
