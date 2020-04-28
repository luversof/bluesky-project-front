<template> </template>

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
        this.moveUserBlogArticleListPage();
      }
    },
  },
  mounted() {
    if (this.userBlog.id != null) {
      this.moveUserBlogArticleListPage();
    }
  },
};
</script>

<style></style>
