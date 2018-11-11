<template>
  <div>
    <b-button :to="getWriteLink()">{{ $t("blog.article.write") }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'BlogButtonArticleWrite',
  props: [ 'blogId' ],
  methods: {
    getListLink: function () {
      return '/blog/' + this.blogId + '/write'
    }
  }
}
</script>

<style scoped>
</style>
