<template>
  <b-list-group v-if="myBookkeeping">
    <b-list-group-item to="/bookkeeping/entry/">입력</b-list-group-item>
    <b-list-group-item to="/bookkeeping/statistics/">통계</b-list-group-item>
    <b-list-group-item to="/bookkeeping/asset/">자산</b-list-group-item>
    <b-list-group-item to="/bookkeeping/config/">설정</b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BookkeepingNavBar",
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"]
    })
  }
};
</script>

<style>
</style>
