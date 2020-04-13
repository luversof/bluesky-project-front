import { mapState, mapMutations } from "vuex";
import commonMixin from "@/assets/common.js";

export default {
  computed: {
    ...mapState({
      userBlog: (state) => state.blog.blog.userBlog,
    }),
  },
  mixins: [commonMixin],
  methods: {
    getBlogArticleList: function (blogId) {
      if (this.userBlog.id != null) {
        return new Promise((resolve, reject) => {
          resolve(this.userBlog);
        });
      }
      return fetch("/api/blogArticle/search/findByBlogId/" + blogId, {
        headers: this.commonHeaders(),
      })
        .then(this.commonResponseData)
        .then((data) => {
          if (data != null) {
            console.log("data : ", data);
          }
          return data;
        });
    },
    create: function (blogArticle) {
      return fetch("/api/blogArticle", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(blogArticle)
      })
        .then(this.commonResponseData)
        .then((data) => {
          if (data != null) {
            console.log("data : ", data);
          }
          return data;
        });
    }
  },
};
