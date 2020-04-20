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
    /**
     * 글 목록 호출
     * backend의 page는 0부터 시작하므로 보이는 page 정보에서 -1 처리를 해야함
     * @param {*} blogId
     * @param {*} page
     */
    getBlogArticleList: function(blogId, page = 0) {
      if (this.$route.query.page != null) {
        page = this.$route.query.page - 1;
      }

      return fetch(
        "/api/blogArticle/search/findByBlogId/{0}?page={1}".format(
          blogId,
          page
        ),
        {
          headers: this.commonHeaders(),
        }
      ).then(this.commonResponseData);
    },
    // 글 보기 호출
    // TODO blogId 체크가 없이 호출하고 있음
    getBlogArticle: function(blogArticleId) {
      return fetch("/api/blogArticle/{0}".format(blogArticleId), {
        headers: this.commonHeaders(),
      }).then(this.commonResponseData);
    },

    // 글 생성
    createBlogArticle: function(blogArticle) {
      return fetch("/api/blogArticle", {
        method: "POST",
        headers: this.commonHeaders(),
        body: JSON.stringify(blogArticle),
      }).then(this.commonResponseData);
    },
    // 글 수정
    modifyBlogArticle: function(blogArticle) {
      return fetch("/api/blogArticle/{0}".format(blogArticle.id), {
        method: "PUT",
        headers: this.commonHeaders(),
        body: JSON.stringify(blogArticle),
      }).then(this.commonResponseData);
    },
    // 글 삭제
    deleteBlogArticle: function(blogArticleId) {
      return fetch("/api/blogArticle/{0}".format(blogArticleId), {
        method: "DELETE",
        headers: this.commonHeaders(),
      });
    },
  },
};
