<template>
  <div></div>
</template>
<script>
import blogMixin from '@/components/blog/blog.js'
export default {
  name: 'BlogIndex',
  mixins: [blogMixin],
  data () {
    return {
    }
  },
  mounted: function () {
    var _this = this
    this.getMyBlog().then(function () {
      _this.$router.push('/blog/' + _this.$store.state.myBlog.id + '/list')
    })
  }
}
</script>
