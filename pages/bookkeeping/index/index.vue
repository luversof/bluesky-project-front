<template>
  <div v-if="isLogin">
    <div v-text="myBookkeeping"></div>
    <b-button
      v-if="myBookkeeping == null"
      to="/bookkeeping/create"
      variant="outline-secondary"
    >{{ $t("bookkeeping.link.create") }}</b-button>
    <b-button
      v-if="myBookkeeping != null"
      @click="deleteBookkeeping"
      variant="outline-secondary"
    >{{ $t("bookkeeping.button.delete") }}</b-button>
    <b-button
      v-if="myBookkeeping != null"
      to="/bookkeeping/update"
      variant="outline-secondary"
    >{{ $t("bookkeeping.link.update") }}</b-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";

export default {
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      isLogin: state => state.loginInfo.isLogin,
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"]
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