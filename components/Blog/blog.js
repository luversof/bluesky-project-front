import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      myBlog: state => state.blog.myBlog
    })
  },
  methods: {
    ...mapMutations(["setMyBlog", "initBlogArticleStateInfo"]),
    getMyBlog: function() {
      var _this = this;
      return this.$http
        .get("/api/blogs/search/myBlog")
        .then(function(response) {
          _this.setMyBlog(response.data);
        });
    },
    moveMyBlogList: function() {
      this.$router.push("/blog/" + this.myBlog.id + "/list");
    }
  },
  created: function() {
    if (this.myBlog === null) {
      this.getMyBlog();
    }
  }
};
