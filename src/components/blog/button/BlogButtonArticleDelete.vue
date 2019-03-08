<template>
  <span>
    <b-button v-if="isOwner()" :click="deleteArticle()">{{ $t("blog.article.delete") }}</b-button>
  </span>
</template>

<script>
import blogMixin from "@/components/blog/blog.js";

export default {
  name: "BlogButtonArticleWrite",
  mixins: [blogMixin],
  props: ["blogId"],
  methods: {
    deleteArticle: function() {
      console.log("delete ");
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
