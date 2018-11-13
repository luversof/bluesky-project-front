<template>
  <div>
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
        :rows="3"
        :max-rows="6">
      </b-form-textarea>
    </b-form-group>
    <div class="text-center">
        <b-button variant="primary" @click="postArticle">{{ $t("blog.article.write") }}</b-button>
        <b-button>{{ $t("blog.article.cancel") }}</b-button>
    </div>
  </div>
</template>

// TODO invalid 처리는 어떻게 해야하는지 확인 필요
// TODO NUXT 공부하자
<script>
export default {
  name: 'BlogArticleWrite',
  props: ['blogId'],
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
        'blog_id': this.blogId

      })
        .then(function (response) {
          console.log('response : ' + response)
        })
        .catch(function (error) {
          // TODO error response 로 form invalid-feedback 설정하기

          var blogArticleStateInfo = _this.$store.state.blogArticleStateInfo
          console.log(blogArticleStateInfo)
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
