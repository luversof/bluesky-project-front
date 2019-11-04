import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"],
      myAssetList: state => state.bookkeeping.asset["myAssetList"]
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setMyBookkeeping: "bookkeeping/bookkeeping/setMyBookkeeping",
      setMyAssetList: "bookkeeping/asset/setMyAssetList"
    }),
    getMyAssetList(isReload) {
      if (!isReload && this.myAssetList != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myAssetList);
        });
      }

      return fetch("/api/bookkeeping/asset.json", {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(this.commonResponseData)
        .then(data => {
          this.setMyAssetList(data);
          return data;
        });
    },
    createMyAsset(asset) {
      return fetch("/api/bookkeeping/asset.json", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(asset)
      }).then(this.commponResponseData);
    },
    deleteMyAsset(asset) {
      return fetch("/api/bookkeeping/asset.json", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(asset)
      });
    }
  }
};
