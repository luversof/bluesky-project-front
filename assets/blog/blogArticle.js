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
    getBlogArticleList: function(blogId) {
      return fetch("/api/blogArticle/search/findByBlogId/" + blogId, {
        headers: this.commonHeaders()
      }).then(this.commonResponseData);
    },
    create: function(blogArticle) {
      return fetch("/api/blogArticle", {
        method: "POST",
        headers: this.commonHeaders(),
        body: JSON.stringify(blogArticle)
      }).then(this.commonResponseData);
    }
  }
};
