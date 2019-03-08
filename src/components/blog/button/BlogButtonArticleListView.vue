<template>
  <span>
    <b-button :to="getListLink()">{{ $t("blog.article.list") }}</b-button>
  </span>
</template>

<script>
export default {
  name: "BlogButtonArticleListView",
  props: ["blogId"],
  methods: {
    getListLink: function() {
      return "/blog/" + this.blogId + "/list";
    }
  }
};
</script>

<style scoped>
</style>
