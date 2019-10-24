import { mapState, mapMutations } from "vuex";
import commonMixin from "@/components/common.js";

export default {
  computed: {
    ...mapState({
      myBookkeepingInfo: state => state.bookkeeping.myBookkeepingInfo
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setMyBookkeepingInfo: "bookkeeping/setMyBookkeepingInfo"
    }),
    getMyBookkeeping: function() {
      if (this.myBookkeepingInfo != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myBookkeepingInfo);
        });
      }
      return fetch("/api/bookkeeping.json", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(this.commonResponseData)
        .then(data => {
          this.setMyBookkeepingInfo(data);
          return data;
        });
    },
    moveMyBlogList: function() {
      this.$router.push("/blog/" + this.myBlog.id + "/list");
    },
    createBookkeeping: function(bookkeeping) {
      return fetch("/api/bookkeeping.json", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(bookkeeping)
      }).then(this.commonResponseData);
    },
    deleteMyBookkeeping: function() {
      return fetch("/api/bookkeeping.json", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {
        console.log("Delete data :", response);
        this.setMyBookkeepingInfo(null);
        return response;
      });
    }
  },
  created: function() {
    if (this.myBookkeepingInfo === null) {
      this.getMyBookkeeping();
    }
  }
};
