<template>
  <div>
    <b-button :to="getListLink()">{{ $t("blog.article.list") }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'BlogButtonArticleList',
  props: [ 'blogId' ],
  methods: {
    getListLink: function () {
      return '/blog/' + this.blogId + '/list'
    }
  }
}
</script>

<style scoped>
</style>
