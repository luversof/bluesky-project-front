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
    getMyAssetList() {
      if (this.myAssetList != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myAssetList);
        });
      }

      return fetch("/api/bookkeeping/asset")
        .then(this.commonResponseData)
        .then(data => {
          this.setMyAssetList(data);
          return data;
        });
    },
    createMyAsset(asset) {
      return fetch("/api/bookkeeping/asset", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(asset)
      }).then(this.commponResponseData)
      .then(data => {
        return data;
      });
    }

  }
};
