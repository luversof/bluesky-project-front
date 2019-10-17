<template>
  <div id="app">
    <BlueskyNavBar />
    <nuxt />
  </div>
</template>

<script>
import BlueskyNavBar from "@/components/BlueskyNavBar.vue";
export default {
  name: "DefaultLayout",
  components: { BlueskyNavBar }
};
</script>

<style>
</style>
