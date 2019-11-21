import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      userAssetList: state => state.bookkeeping.asset.userAssetList
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserAssetList: "bookkeeping/asset/setUserAssetList"
    }),
    createUserAsset: function(asset) {
      return fetch("/api/bookkeeping/asset.json", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(asset)
      }).then(this.commonResponseData);
    },
    getUserAssetList: function(isReload) {
      if (!isReload && this.userAssetList.length > 0) {
        return new Promise((resolve, reject) => {
          resolve(this.userAssetList);
        });
      }

      return fetch("/api/bookkeeping/asset.json", {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(this.commonResponseData)
        .then(data => {
          this.setUserAssetList(data);
          return data;
        });
    },
    updateUserAsset: function(asset) {
      return fetch("/api/bookkeeping/asset.json", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(asset)
      }).then(this.commonResponseData);
    },
    deleteUserAsset: function(asset) {
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
