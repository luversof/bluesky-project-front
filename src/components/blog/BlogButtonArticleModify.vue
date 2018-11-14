<template>
  <span>
    <b-button v-if='isOwner()' :to="getModifyLink()">{{ $t("blog.article.modify") }}</b-button>
  </span>
</template>

<script>
export default {
  name: 'BlogButtonArticleModify',
  props: [ 'blogId', 'articleId' ],
  data () {
    return {
      myBlog: this.$store.state.myBlog,
      das: 'test'
    }
  },
  methods: {
    getModifyLink: function () {
      return '/blog/' + this.blogId + '/modify/' + this.articleId
    },
    isOwner: function () {
      console.log('왜 안보이냐')
      if (this.$store.state.myBlog === null) {
        return false
      }
      return this.blogId === this.$store.state.myBlog.id
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
</style>
