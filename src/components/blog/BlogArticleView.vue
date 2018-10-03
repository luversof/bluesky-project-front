<template>
  <div>
    <article>
      <h2 v-text="article.title"></h2>
      <p><time pubdate="pubdate" v-text="dateFormat(article.createdDate, 'LL')"></time></p>
      <p><span>[[#{blog.article.text.viewCount}]] : </span><span v-text="article.viewCount"></span></p>
      <div v-html="article.content"></div>
    </article>

			<!-- <div class="text-center">
				<slot><blog-article-modify-button /></slot>
				<slot><blog-article-delete-button /></slot>
				<slot><blog-article-list-button /></slot>
			</div> -->
  </div>
</template>

<script>
export default {
  name: 'BlogArticleView',
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
        console.log(response.data)
      })
  }
}
</script>

<style>
</style>
