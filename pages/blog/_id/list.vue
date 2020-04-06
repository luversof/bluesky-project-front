<template>
  <div>blog list</div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";

export default {
  layout: "blogList",
  mixins: [blogMixin],
  watch: {
    userBlog: function() {
      console.log("??");
    }
  }
};
</script>

<style></style>
