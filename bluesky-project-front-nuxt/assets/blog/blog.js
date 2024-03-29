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
    ...mapMutations({
      setUserBlog: "blog/blog/setUserBlog",
    }),

    getUserBlog: function() {
      if (this.userBlog.id != null) {
        return new Promise((resolve, reject) => {
          resolve(this.userBlog);
        });
      }
      return fetch("/api/blog/userBlog", { headers: this.commonHeaders() })
        .then(this.commonResponseData)
        .then((data) => {
          if (data != null) {
            this.setUserBlog(data);
          }
          return data;
        })
        .catch(this.commonErrorHandler);
    },

    // user prefix가 붙은 경우 로그인한 유저 기준 처리
    moveBlogArticleListView: function(blogId, pageRequest) {
      // 이후 pageRequest에 대한 설정이 필요
      this.$router.push("/blog/{0}/list".format(blogId));
    },

    // 로그인한 유저의 블로그 글 목록 보기
    moveUserBlogArticleListView: function(pageRequest) {
      if (this.userBlog.id == null) {
        return;
      }
      this.moveBlogArticleListView(this.userBlog.id, pageRequest);
    },

    // 로그인한 유저의 블로그 글 쓰기
    moveUserBlogArticleWriteView: function() {
      if (this.userBlog.id == null) {
        return;
      }
      this.$router.push("/blog/{0}/write".format(this.userBlog.id));
    },
    // TODO 로그인한 유저의 blog에 대한 수정인지 체크하는 부분 필요
    moveBlogArticleModifyView: function(blogArticleId) {
      if (this.userBlog.id == null) {
        alert(this.$t("NEED_LOGIN"));
        return;
      }
      this.$router.push(
        "/blog/{0}/modify/{1}".format(this.userBlog.id, blogArticleId)
      );
    },
    moveBlogArticleView: function(blogId, blogArticleId) {
      this.$router.push("/blog/{0}/view/{1}".format(blogId, blogArticleId));
    },
  },
};
