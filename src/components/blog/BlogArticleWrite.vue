<template>
  <div>
    <b-form>
    <b-form-group
      horizontal
      label-class="text-sm-right"
      :label="$t('blog.article.title')"
      :invalid-feedback="$store.state.blogArticleStateInfo.title.invalidFeedback"
      :state="$store.state.blogArticleStateInfo.title.state">
      <b-form-input v-model.trim="title"></b-form-input>
    </b-form-group>
    <b-form-group
      horizontal
      label-class="text-sm-right"
      :label="$t('blog.article.content')"
      :invalid-feedback="$store.state.blogArticleStateInfo.content.invalidFeedback"
      :state="$store.state.blogArticleStateInfo.content.state">
      <b-form-textarea
        v-model="content"
        :rows="16"
        :max-rows="6">
      </b-form-textarea>
    </b-form-group>
    <div class="text-center">
        <b-button variant="primary" @click="postArticle">{{ $t("blog.article.write") }}</b-button>
        <blog-button-article-list :blog-id='blogId' />
    </div>
    </b-form>
  </div>
</template>

// TODO invalid 처리는 어떻게 해야하는지 확인 필요
// TODO NUXT 공부하자
<script>
import BlogButtonArticleList from '@/components/blog/BlogButtonArticleList'
import blogMixin from '@/components/blog/blog.js'

export default {
  name: 'BlogArticleWrite',
  mixins: [blogMixin],
  props: ['blogId'],
  components: { BlogButtonArticleList },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    postArticle: function () {
      this.$store.commit('initBlogArticleStateInfo')

      var _this = this
      this.$http.post('/api/blogArticles', {
        title: this.title,
        content: this.content,
        blog: this.$store.state.myBlog._links.blog.href

      })
        .then(function (response) {
          _this.moveMyBlogList()
        })
        .catch(function (error) {
          var blogArticleStateInfo = _this.$store.state.blogArticleStateInfo
          if (error.response.data.result !== undefined && Array.isArray(error.response.data.result)) {
            for (var idx in error.response.data.result) {
              var errorMessage = error.response.data.result[idx]
              var targetField = blogArticleStateInfo[errorMessage.field]
              if (targetField !== undefined) {
                targetField.state = false
                targetField.invalidFeedback = errorMessage.message
              }
            }
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
