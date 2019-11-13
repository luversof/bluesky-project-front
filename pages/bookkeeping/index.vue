<template>
  <nuxt-child />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";
import BookkeepingNavBar from "@/components/bookkeeping/BookkeepingNavBar.vue";

export default {
  name: "BookkeepingIndex",
  layout: "bookkeeping",
  mixins: [bookkeepingMixin],
  components: { BookkeepingNavBar },
  computed: {
    ...mapState({
      userBookkeeping: state => state.bookkeeping.bookkeeping["userBookkeeping"]
    })
  }
};
</script>

<style>
</style>