import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({})
  },
  mixins: [commonMixin],
  methods: {
    createUserEntry: function(entry) {
      return fetch("/api/bookkeeping/entry.json", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(entry)
      }).then(this.commonResponseData);
    },
    searchUserEntry: function(entryRequestParam) {
      return fetch(
        "/api/bookkeeping/entry.json?startLocalDate=" +
          entryRequestParam.startLocalDate +
          "&endLocalDate=" +
          entryRequestParam.endLocalDate,
        {
          headers: {
            "Content-type": "application/json"
          }
        }
      ).then(this.commonResponseData);
    },
    updateUserEntry: function(entry) {
      return fetch("/api/bookkeeping/entry.json", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(entry)
      }).then(this.commonResponseData);
    }
  }
};
