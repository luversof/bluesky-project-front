export default {
  methods: {
    getMyBlog: function () {
      var _this = this
      return this.$http.get('/api/blogs/search/myBlog').then(function (response) {
        _this.$store.commit('setMyBlog', response.data)
      })
    },
    moveMyBlogList: function () {
      this.$router.push('/blog/' + this.$store.state.myBlog.id + '/list')
    }
  },
  created: function () {
    if (this.$store.state.myBlog === null) {
      this.getMyBlog()
    }
  }
}
