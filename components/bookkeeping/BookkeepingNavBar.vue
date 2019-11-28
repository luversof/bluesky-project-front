<template>
  <!-- <div>
    <b-list-group>
      <b-list-group-item active-class="active" to="/bookkeeping/entry/">입력</b-list-group-item>
      <b-list-group-item active-class="active" to="/bookkeeping/statistics/">통계</b-list-group-item>
      <b-list-group-item active-class="active" to="/bookkeeping/asset/">자산</b-list-group-item>
      <b-list-group-item active-class="active" to="/bookkeeping/config/">설정</b-list-group-item>
    </b-list-group>
  </div> -->
  <b-navbar fixed="bottom" type="light" variant="light">
    <div class="row w-100 text-center">
      <div class="col">
        <b-link to="/bookkeeping/entry/">입력</b-link>
      </div>
      <div class="col">
        <b-link to="/bookkeeping/statistics/">통계</b-link>
      </div>
      <div class="col">
        <b-link to="/bookkeeping/asset/">자산</b-link>
      </div>
      <div class="col">
        <b-link to="/bookkeeping/config/">설정</b-link>
      </div>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "BookkeepingNavBar",
  computed: {}
};
</script>

<style></style>
