import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.myBookkeeping,
      myAssetList: state => state.bookkeeping.AssetList
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setMyBookkeeping: "bookkeeping/setMyBookkeeping",
      setMyAssetList: "bookkeeping/setMyAssetList"
    }),
    getMyAssetList() {
      if (this.myAssetList != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myAssetList);
        });

        return fetch("/api/bookkeeping/asset.json", {
          method: "GET",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(this.commonResponseData)
          .then(data => {
            this.setMyAssetList(data);
            return data;
          });
      }
    }
  }
};
