<template>
  <div>
    <article>
      <h2 v-text="article.title"></h2>
      <p>
        <time pubdate="pubdate" v-if="article.createdDate">{{ article.createdDate | moment("LLL") }}</time>
      </p>
      <p>
        <span>{{ $t("blog.article.viewCount") }} :</span>
        <span v-text="article.viewCount"></span>
      </p>
      <div v-html="article.content"></div>
    </article>

    <div class="text-center">
      <blog-button-article-list-view :blog-id="blogId"/>
      <blog-button-article-modify-view :blog-id="blogId" :article-id="articleId"/>
      <blog-button-article-delete :blog-id="blogId" :article-id="articleId"/>
      <!--
      <slot><blog-article-modify-button /></slot>
      <slot><blog-article-delete-button /></slot>
      <slot><blog-article-list-button /></slot>
      -->
    </div>
  </div>
</template>

<script>
import BlogButtonArticleListView from "@/components/blog/button/BlogButtonArticleListView";
import BlogButtonArticleModifyView from "@/components/blog/button/BlogButtonArticleModifyView";
import BlogButtonArticleDelete from "@/components/blog/button/BlogButtonArticleDelete";
import blogMixin from "@/components/blog/blog.js";

export default {
  name: "BlogArticleView",
  components: {
    BlogButtonArticleListView,
    BlogButtonArticleModifyView,
    BlogButtonArticleDelete
  },
  mixins: [blogMixin],
  props: ["blogId", "articleId"],
  data() {
    return {
      article: {}
    };
  },
  mounted: function() {
    var _this = this;
    this.$http
      .get("/api/blogArticles/" + this.articleId, {
        params: {}
      })
      .then(function(response) {
        _this.article = response.data;
      });
  }
};
</script>

<style scoped>
</style>
