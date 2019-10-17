<template>
  <span>
    <b-button v-if="isOwner()" :to="getWriteLink()">{{ $t("blog.article.write") }}</b-button>
  </span>
</template>

<script>
import blogMixin from "@/components/blog/blog.js";

export default {
  name: "BlogButtonArticleWriteView",
  mixins: [blogMixin],
  props: ["blogId"],
  methods: {
    getWriteLink: function() {
      return "/blog/" + this.blogId + "/write";
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
