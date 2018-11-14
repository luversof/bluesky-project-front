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
  watch: {
    '$store.state.myBlog': function (myBlog) {
      this.moveMyBlogList()
    }
  },
  mounted: function () {
    if (this.$store.state.myBlog === null) {
      this.getMyBlog()
    } else {
      this.moveMyBlogList()
    }
  }
}
</script>
