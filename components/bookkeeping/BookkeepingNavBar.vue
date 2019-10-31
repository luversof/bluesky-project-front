<template>
  <div>
    <b-list-group v-if="myBookkeeping">
      <b-list-group-item to="/bookkeeping/entry/">입력</b-list-group-item>
      <b-list-group-item to="/bookkeeping/statistics/">통계</b-list-group-item>
      <b-list-group-item to="/bookkeeping/asset/">자산</b-list-group-item>
      <b-list-group-item to="/bookkeeping/config/">설정</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";
export default {
  name: "BookkeepingNavBar",
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"]
    })
  },
  created() {
    if (this.myBookkeeping === null) {
      this.getMyBookkeeping().then(data => {
        if (data === null) {
          this.$router.push("/bookkeeping").catch(err => {});
        }
        return data;
      }).catch(this.commonErrorHandler);
    }
  }
};
</script>

<style>
</style>
