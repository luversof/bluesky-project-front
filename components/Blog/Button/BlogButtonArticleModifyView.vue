<template>
  <span>
    <b-button v-if="isOwner()" :to="getModifyLink()">{{ $t("blog.article.modify") }}</b-button>
  </span>
</template>

<script>
import blogMixin from "@/components/Blog/blog.js";

export default {
  name: "BlogButtonArticleModifyView",
  mixins: [blogMixin],
  props: ["blogId", "articleId"],
  methods: {
    getModifyLink: function() {
      return "/blog/" + this.blogId + "/modify/" + this.articleId;
    },
    isOwner: function() {
      if (this.myBlog === null) {
        return false;
      }
      return this.blogId === this.myBlog.id;
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>
