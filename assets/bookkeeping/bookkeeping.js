import { mapState, mapMutations } from "vuex";
import commonMixin from "~/assets/common.js";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"]
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setMyBookkeeping: "bookkeeping/bookkeeping/setMyBookkeeping"
    }),
    getMyBookkeeping: function() {
      if (this.myBookkeeping != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myBookkeeping);
        });
      }
      return fetch("/api/bookkeeping")
        .then(this.commonResponseData)
        .then(data => {
          this.setMyBookkeeping(data);
          return data;
        });
    },
    moveMyBlogList: function() {
      this.$router.push("/blog/" + this.myBlog.id + "/list");
    },
    createMyBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(bookkeeping)
      }).then(this.commonResponseData);
    },
    updateMyBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(bookkeeping)
      }).then(this.commonResponseData);
    },
    deleteMyBookkeeping: function() {
      return fetch("/api/bookkeeping", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {
        console.log("Delete data :", response);
        this.setMyBookkeeping(null);
        return response;
      });
    }
  }
};
