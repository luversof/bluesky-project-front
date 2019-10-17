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
    ...mapMutations(["setMyBookkeepingInfo"]),
    getMyBookkeeping: function() {
      if (this.myBookkeepingInfo != null) {
        return new Promise((resolve, reject) => {
          resolve(this.myBookkeepingInfo);
        });
      }
      return fetch("/bookkeeping.json", {
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
      return fetch("/bookkeeping.json", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(bookkeeping)
      }).then(this.commonResponseData);
    }
  },
  created: function() {
    if (this.myBlog === null) {
      this.getMyBookkeeping();
    }
  }
};
