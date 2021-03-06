import { mapState, mapMutations } from "vuex";
import commonMixin from "@/assets/common.js";

export default {
  computed: {
    ...mapState({
      userBookkeeping: (state) => state.bookkeeping.bookkeeping.userBookkeeping,
      isUserBookkeepingLoaded: (state) =>
        state.bookkeeping.bookkeeping.isUserBookkeepingLoaded,
    }),
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserBookkeeping: "bookkeeping/bookkeeping/setUserBookkeeping",
    }),
    createUserBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping", {
        method: "POST",
        headers: this.commonHeaders(),
        body: JSON.stringify(bookkeeping),
      })
        .then(this.commonResponseData)
        .then((data) => {
          this.setUserBookkeeping(data);
          return data;
        });
    },
    getUserBookkeeping: function() {
      if (this.isUserBookkeepingLoaded) {
        return new Promise((resolve, reject) => {
          resolve(this.userBookkeeping);
        });
      }
      return fetch("/api/bookkeeping")
        .then(this.commonResponseData)
        .then((data) => {
          if (data != null) {
            this.setUserBookkeeping(data);
          }
          return data;
        });
    },

    updateUserBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping", {
        method: "PUT",
        headers: this.commonHeaders(),
        body: JSON.stringify(bookkeeping),
      })
        .then(this.commonResponseData)
        .then((data) => {
          this.setUserBookkeeping(data);
          return data;
        });
    },
    deleteUserBookkeeping: function() {
      return fetch("/api/bookkeeping", {
        method: "DELETE",
      }).then((response) => {
        this.setUserBookkeeping(null);
        return response;
      });
    },
  },
};
