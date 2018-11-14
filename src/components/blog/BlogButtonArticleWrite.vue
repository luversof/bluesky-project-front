<template>
  <span>
    <b-button v-if='isOwner()' :to="getWriteLink()">{{ $t("blog.article.write") }}</b-button>
  </span>
</template>

<script>
export default {
  name: 'BlogButtonArticleWrite',
  props: [ 'blogId' ],
  data () {
    return {
      myBlog: this.$store.state.myBlog
    }
  },
  methods: {
    getWriteLink: function () {
      return '/blog/' + this.blogId + '/write'
    },
    isOwner: function () {
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
