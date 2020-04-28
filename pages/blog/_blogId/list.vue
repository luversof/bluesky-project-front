<template>
  <div class="m-3">
    <BlogArticleList />
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import BlogArticleList from "@/components/Blog/BlogArticleList.vue";

export default {
  components: { BlogArticleList },
  mixins: [],
  data() {
    return {};
  },
  methods: {},
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  mounted() {},
};
</script>

<style></style>
