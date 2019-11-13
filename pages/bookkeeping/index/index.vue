<template>
  <div v-if="isLogin">
    <div v-text="userBookkeeping"></div>
    <b-button
      v-if="userBookkeeping == null"
      to="/bookkeeping/create"
      variant="outline-secondary"
    >{{ $t("bookkeeping.link.create") }}</b-button>
    <b-button
      v-if="userBookkeeping != null"
      @click="deleteBookkeeping"
      variant="outline-secondary"
    >{{ $t("bookkeeping.button.delete") }}</b-button>
    <b-button
      v-if="userBookkeeping != null"
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
      userBookkeeping: state => state.bookkeeping.bookkeeping["userBookkeeping"]
    })
  },
  methods: {
    deleteBookkeeping: function(event) {
      this.deleteUserBookkeeping();
    }
  }
};
</script>

<style>
</style>