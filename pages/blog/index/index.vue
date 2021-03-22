<template> <nuxt-child /> </template>

<script>
import { mapState, mapMutations } from "vuex";
import blogMixin from "@/assets/blog/blog.js";

export default {
  layout: "blog",
  computed: {
    ...mapState({
      userBlog: (state) => state.blog.blog.userBlog,
    }),
  },
  mixins: [blogMixin],
  watch: {
    userBlog: function(val) {
      if (val.id != null) {
        this.moveUserBlogArticleListView();
      }
    },
  },
  mounted() {
    if (this.userBlog.id == null) {
      this.getUserBlog().then((data) => {
        this.moveUserBlogArticleListView(); 
      });
      // this.$nuxt.error({ statusCode: 401, message: '로그인이 필요합니다.' })
    } else {
      this.moveUserBlogArticleListView(); 
    }
  },
};
</script>

<style></style>
