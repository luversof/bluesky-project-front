import commonMixin from "@/assets/common.js";

export default {
  mixins: [commonMixin],
  methods: {
    /**
     * 글 목록 호출
     * backend의 page는 0부터 시작하므로 보이는 page 정보에서 -1 처리를 해야함
     * @param {*} blogId
     * @param {*} page
     */
    getBlogCommentList: function(blogArticleId, pageRequest) {
      if (pageRequest === undefined) {
        pageRequest = {
          page: 0,
        };
      }
      return fetch(
        "/api/blogComment/search/findByBlogArticleId/{0}?page={1}".format(
          blogArticleId,
          pageRequest.page
        ),
        {
          headers: this.commonHeaders(),
        }
      ).then(this.commonResponseData);
    },

    // 글 생성
    createBlogComment: function(blogComment) {
      return fetch("/api/blogComment", {
        method: "POST",
        headers: this.commonHeaders(),
        body: JSON.stringify(blogComment),
      }).then(this.commonResponseData);
    },
    // 글 수정
    updateBlogComment: function(blogComment) {
      return fetch("/api/blogComment/{0}".format(blogComment.id), {
        method: "PUT",
        headers: this.commonHeaders(),
        body: JSON.stringify(blogComment),
      }).then(this.commonResponseData);
    },
    // 글 삭제
    deleteBlogComment: function(blogCommentId) {
      return fetch("/api/blogComment/{0}".format(blogCommentId), {
        method: "DELETE",
        headers: this.commonHeaders(),
      });
    },
  },
};
