<template>
  <div>
    <article>
      <h2 v-text="article.title"></h2>
      <p><time pubdate="pubdate" v-if="article.createdDate">{{ article.createdDate | moment("LLL") }}</time></p>
      <p><span>{{ $t("blog.article.viewCount") }} : </span><span v-text="article.viewCount"></span></p>
      <div v-html="article.content"></div>
    </article>

    <div class="text-center">
      <blog-button-article-list :blog-id='blogId' />
      <blog-button-article-modify :blog-id='blogId' :article-id='articleId' />
      <!--
      <slot><blog-article-modify-button /></slot>
      <slot><blog-article-delete-button /></slot>
      <slot><blog-article-list-button /></slot>
      -->
    </div>

  </div>
</template>

<script>
import BlogButtonArticleList from '@/components/blog/BlogButtonArticleList'
import BlogButtonArticleModify from '@/components/blog/BlogButtonArticleModify'
import blogMixin from '@/components/blog/blog.js'

export default {
  name: 'BlogArticleView',
  components: { BlogButtonArticleList, BlogButtonArticleModify },
  mixins: [blogMixin],
  props: ['blogId', 'articleId'],
  data () {
    return {
      article: {}
    }
  },
  mounted: function () {
    var _this = this
    this.$http.get('/api/blogArticles/' + this.articleId, {
      params: {
      }
    })
      .then(function (response) {
        _this.article = response.data
      })
  }
}
</script>

<style scoped>
</style>
