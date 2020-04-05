import { mapState, mapMutations } from "vuex";
import commonMixin from "@/assets/common.js";

export default {
  computed: {
    ...mapState({
      userBlog: state => state.blog.blog.userBlog
    })
  },
  mixins: [commonMixin],
  methods: {
    ...mapMutations({
      setUserBlog: "blog/blog/setUserBlog"
    }),

    getUserBlog: function() {
      if (this.userBlog.id != null) {
        return new Promise((resolve, reject) => {
          resolve(this.userBlog);
        });
      }
      return fetch("/api/blog/userBlog", { headers: this.commonHeaders() })
        .then(this.commonResponseData)
        .then(data => {
          if (data != null) {
            this.setUserBlog(data);
          }
          return data;
        });
    }
  }
};
