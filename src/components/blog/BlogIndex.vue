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
    this.$http.get('/api/blogs/search/myBlog').then(function (response) {
      // this.$router.push('Home')
    })

  }
}
</script>
