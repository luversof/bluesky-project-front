<template>
  <div></div>
</template>
<script>
import blogMixin from "@/components/blog/blog.js";

export default {
  name: "BlogIndex",
  mixins: [blogMixin],
  data() {
    return {};
  },
  watch: {
    myBlog: function() {
      this.moveMyBlogList();
    }
  },
  mounted: function() {
    if (this.myBlog === null) {
      this.getMyBlog();
    } else {
      this.moveMyBlogList();
    }
  }
};
</script>
