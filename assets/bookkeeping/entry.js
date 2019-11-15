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
        "/api/bookkeeping/entry.json?startZonedDateTime=" +
          entryRequestParam.startZonedDateTime +
          "&endZonedDateTime=" +
          entryRequestParam.endZonedDateTime,
        {
          headers: {
            "Content-type": "application/json"
          }
        }
      ).then(this.commonResponseData);
    }
  }
};
