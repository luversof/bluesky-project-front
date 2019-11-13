import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      userBookkeeping: state => state.bookkeeping.bookkeeping["userBookkeeping"]
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserBookkeeping: "bookkeeping/bookkeeping/setUserBookkeeping"
    }),
    getUserBookkeeping: function() {
      if (this.userBookkeeping != null) {
        return new Promise((resolve, reject) => {
          resolve(this.userBookkeeping);
        });
      }
      return fetch("/api/bookkeeping.json")
        .then(this.commonResponseData)
        .then(data => {
          this.setUserBookkeeping(data);
          return data;
        });
    },
    createUserBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookkeeping)
      }).then(this.commonResponseData);
    },
    updateUserBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookkeeping)
      }).then(this.commonResponseData);
    },
    deleteUserBookkeeping: function() {
      return fetch("/api/bookkeeping.json", {
        method: "DELETE"
      }).then(response => {
        this.setUserBookkeeping(null);
        return response;
      });
    }
  }
};
