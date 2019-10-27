<template>
  <div v-if="isLogin">
    <div v-text="myBookkeepingInfo"></div>
    <b-button
      v-if="myBookkeepingInfo == null"
      to="/bookkeeping/create"
      variant="outline-primary"
    >{{ $t("bookkeeping.link.create") }}</b-button>
    <b-button
      v-if="myBookkeepingInfo != null"
      @click="deleteBookkeeping"
      variant="outline-primary"
    >{{ $t("bookkeeping.button.delete") }}</b-button>
    <b-button
      v-if="myBookkeepingInfo != null"
      to="/bookkeeping/update"
      variant="outline-primary"
    >{{ $t("bookkeeping.link.update") }}</b-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      isLogin: state => state.loginInfo.isLogin,
      myBookkeepingInfo: state => state.bookkeeping.myBookkeepingInfo
    })
  },
  methods: {
    deleteBookkeeping: function(event) {
      this.deleteMyBookkeeping();
    }
  }
};
</script>

<style>
</style>