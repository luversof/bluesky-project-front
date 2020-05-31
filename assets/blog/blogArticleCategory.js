import commonMixin from "@/assets/common.js";

export default {
  mixins: [commonMixin],

  methods: {
    /**
     * 로그인한 유저의 blogArticleCategoryList 호출
     */
    getUserBlogArticleCategoryList: function() {
      return fetch("/api/blogArticleCategory/search/findByUserBlogId", {
        headers: this.commonHeaders(),
      }).then(this.commonResponseData);
    },
  },
};
