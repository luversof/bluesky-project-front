export default {
  methods: {
    getMyBlog: function () {
      var _this = this
      return this.$http.get('/api/blogs/search/myBlog').then(function (response) {
        _this.$store.commit('setMyBlog', response.data)
      })
    }
  }
}
