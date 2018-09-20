<template>
  <div>
    <b-table striped hover :items="blogListResponse.blogArticles"></b-table>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  data () {
    return {
      blogListResponse: {}
    }
  },
  mounted: function () {
    this.$http.get('http://localhost:8082/api/blogArticles/search/findByBlogId?id=dff7b5ed-71d6-4036-8c1f-7f52dc47bac2', {
      crossdomain: true
    })
      .then(function (response) {
        console.log(response)
      })
  }
}
</script>

<style scoped>
</style>
