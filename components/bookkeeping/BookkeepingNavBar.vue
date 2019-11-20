<template>
  <div>
    <b-list-group>
      <b-list-group-item active-class="active" to="/bookkeeping/entry/"
        >입력</b-list-group-item
      >
      <b-list-group-item active-class="active" to="/bookkeeping/statistics/"
        >통계</b-list-group-item
      >
      <b-list-group-item active-class="active" to="/bookkeeping/asset/"
        >자산</b-list-group-item
      >
      <b-list-group-item active-class="active" to="/bookkeeping/config/"
        >설정</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "BookkeepingNavBar",
  computed: {}
};
</script>

<style></style>
