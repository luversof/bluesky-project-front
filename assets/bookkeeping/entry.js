import { mapState, mapMutations } from "vuex";
import commonMixin from "@/assets/common.js";

export default {
  computed: {
    ...mapState({}),
  },
  mixins: [commonMixin],
  methods: {
    createUserEntry: function(entry) {
      return fetch("/api/bookkeeping/entry", {
        method: "POST",
        headers: this.commonHeaders(),
        body: JSON.stringify(entry),
      }).then(this.commonResponseData);
    },
    searchUserEntry: function(entryRequestParam) {
      return fetch(
        "/api/bookkeeping/entry?startLocalDate=" +
          entryRequestParam.startLocalDate +
          "&endLocalDate=" +
          entryRequestParam.endLocalDate,
        {
          headers: this.commonHeaders(),
        }
      ).then(this.commonResponseData);
    },
    updateUserEntry: function(entry) {
      return fetch("/api/bookkeeping/entry", {
        method: "PUT",
        headers: this.commonHeaders(),
        body: JSON.stringify(entry),
      }).then(this.commonResponseData);
    },
  },
};
