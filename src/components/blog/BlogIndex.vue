<template>
  <div></div>
</template>
<script>
export default {
  name: 'BlogIndex',
  data () {
    return {
      blogs: {}
    }
  },
  mounted: function () {
    var _this = this
    this.$http.get('/api/blogs/search/myBlog').then(function (response) {
      if (response.data !== '') {
        _this.$router.push('blog/' + response.data.id + '/list')
      }
    })
  }
}
</script>
