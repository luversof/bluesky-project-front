<template>
  <b-list-group v-if="userBookkeeping">
    <b-list-group-item active-class="active" to="/bookkeeping/entry/">입력</b-list-group-item>
    <b-list-group-item active-class="active" to="/bookkeeping/statistics/">통계</b-list-group-item>
    <b-list-group-item active-class="active" to="/bookkeeping/asset/">자산</b-list-group-item>
    <b-list-group-item active-class="active" to="/bookkeeping/config/">설정</b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BookkeepingNavBar",
  computed: {
    ...mapState({
      userBookkeeping: state => state.bookkeeping.bookkeeping["userBookkeeping"]
    })
  }
};
</script>

<style>
</style>
