<template>
  <div class="m-3">
    <b-table :items="blogArticleList.content" :fields="tableFields"></b-table>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

export default {
  mixins: [blogMixin, blogArticleMixin],
  data() {
    return {
      tableFields: [
        { key: "id", label: this.$t("blogArticle.id") },
        {
          key: "title",
          label: this.$t("blogArticle.title"),
          class: "w-75"
        },
        { key: "createdDate", label: this.$t("blogArticle.createdDate") },
        {
          key: "viewCount",
          label: this.$t("blogArticle.viewCount")
        }
      ],
      blogArticleList: {
        content: []
      }
    };
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  mounted() {
    this.getBlogArticleList(this.$route.params.id)
      .then(data => {
        if (data !== undefined) {
          this.blogArticleList = data;
          console.log("Test12 : ", data);
        }
      })
      .catch(this.commonErrorHandler);
  }
};
</script>

<style></style>
