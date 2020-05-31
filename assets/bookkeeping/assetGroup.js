import { mapState, mapMutations } from "vuex";
import commonMixin from "@/assets/common.js";

export default {
  computed: {
    ...mapState({
      userAssetGroupList: (state) =>
        state.bookkeeping.assetGroup.userAssetGroupList,
    }),
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserAssetGroupList: "bookkeeping/assetGroup/setUserAssetGroupList",
    }),
    getUserAssetGroupList() {
      if (this.userAssetGroupList.length > 0) {
        return new Promise((resolve, reject) => {
          resolve(this.userAssetGroupList);
        });
      }

      return fetch("/api/bookkeeping/assetGroup", {
        headers: this.commonHeaders(),
      })
        .then(this.commonResponseData)
        .then((data) => {
          this.setUserAssetGroupList(data);
          return data;
        });
    },
  },
};
