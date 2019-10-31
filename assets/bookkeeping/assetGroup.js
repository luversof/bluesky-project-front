import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"],
      myAssetGroupList: state => state.bookkeeping.assetGroup["myAssetGroupList"]
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setMyBookkeeping: "bookkeeping/bookkeeping/setMyBookkeeping",
      setMyAssetGroupList: "bookkeeping/assetGroup/setMyAssetGroupList"
    }),
    getMyAssetGroupList() {
      if (this.myAssetGroupList != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myAssetGroupList);
        });
      }

      return fetch("/api/bookkeeping/assetGroup")
        .then(this.commonResponseData)
        .then(data => {
          this.setMyAssetGroupList(data);
          return data;
        });
    }

  }
};
