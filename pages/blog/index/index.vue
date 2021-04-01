<template>
  <nuxt-child />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import blogMixin from "@/assets/blog/blog.js";

export default {
  layout: "blog",
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo.loginInfo,
      userBlog: (state) => state.blog.blog.userBlog,
    }),
  },
  mixins: [blogMixin],
  watch: {
    // userBlog: function (val) {
    //   if (val.id != null) {
    //     this.moveUserBlogArticleListView();
    //   }
    // },
  },
  mounted() {
    if (this.loginInfo.id === null) {
      return this.$nuxt.error({
        statusCode: 401,
        message: this.$t("NEED_LOGIN"),
      });
    }

    this.getUserBlog().then((data) => {
      this.moveUserBlogArticleListView();
    });
  },
};
</script>

<style></style>
