<template>
  <div id="app">asdfasdfd
    <BlueskyNavBar />

    <router-view />

  </div>
</template>

<script>
import BlueskyNavBar from '@/components/BlueskyNavBar.vue'
export default {
  name: 'DefaultLayout',
  components: { BlueskyNavBar }
}
</script>

<style>
</style>
