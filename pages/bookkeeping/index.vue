<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="2">
          <BookkeepingNavBar />
        </b-col>
        <b-col sm="10">
          <nuxt-child />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";
import BookkeepingNavBar from "@/components/bookkeeping/BookkeepingNavBar.vue";

export default {
  name: "BookkeepingIndex",
  mixins: [bookkeepingMixin],
  components: { BookkeepingNavBar },
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"]
    })
  }
};
</script>

<style>
</style>