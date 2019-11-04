<template>
  <div>
    <BlueskyNavBar />
    <b-container fluid>
      <b-row>
        <b-col sm="2" v-if="myBookkeeping">
          <BookkeepingNavBar />
        </b-col>
        <b-col sm="10">
          <nuxt />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";
import BlueskyNavBar from "@/components/BlueskyNavBar.vue";
import BookkeepingNavBar from "@/components/bookkeeping/BookkeepingNavBar.vue";
export default {
  name: "bookkeeping",
  components: { BlueskyNavBar, BookkeepingNavBar },
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.bookkeeping["myBookkeeping"]
    })
  },
  created() {
    if (this.myBookkeeping === null) {
      this.getMyBookkeeping()
        .then(data => {
          if (data === null) {
            this.$router.push("/bookkeeping").catch(err => {});
          }
          return data;
        })
        .catch(this.commonErrorHandler);
    }
  }
};
</script>

<style>
</style>
