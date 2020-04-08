<template>
  <div>글쓰기</div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

export default {
  mixins: [blogMixin, blogArticleMixin],
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  mounted() {
    console.log("테스트", this.$route);
    this.getBlogArticleList(this.$route.params.id);
  }
};
</script>

<style></style>
