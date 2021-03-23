<template>
  <div>
    <BlueskyNavBar />

    <nuxt />
    <!--
    <BlogNavBar />
    -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import blogMixin from "@/assets/blog/blog.js";
import BlueskyNavBar from "@/components/BlueskyNavBar.vue";
import BlogNavBar from "@/components/Blog/BlogNavBar.vue";
export default {
  components: { BlueskyNavBar, BlogNavBar },
  mixins: [blogMixin],
  computed: {
    ...mapState({
      userBlog: (state) => state.blog.blog.userBlog,
    }),
  }
};
</script>

<style></style>
