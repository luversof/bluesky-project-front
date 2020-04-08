<template>
  <div>
    <BlueskyNavBar />

    <nuxt />

    <BlogNavBar />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import blogMixin from "@/assets/blog/blog.js";
import BlueskyNavBar from "@/components/BlueskyNavBar.vue";
import BlogNavBar from "@/components/Blog/BlogNavBar.vue";
export default {
  name: "bookkeeping",
  components: { BlueskyNavBar, BlogNavBar },
  mixins: [blogMixin],
  computed: {
    ...mapState({
      userBlog: state => state.blog.blog.userBlog
    })
  },
  mounted: function() {
    this.getUserBlog()
      .then(data => {
        if (data === null) {
          this.$router.push("/blog").catch(err => {});
        }
        return data;
      })
      .catch(this.commonErrorHandler);
  }
};
</script>

<style></style>
