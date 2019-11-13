import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({})
  },
  mixins: [commonMixin],
  methods: {
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