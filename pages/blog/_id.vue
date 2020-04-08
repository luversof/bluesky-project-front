<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: "blog",
  mounted() {
    console.log("_id 인덱스 호출");
  }
};
</script>

<style></style>
