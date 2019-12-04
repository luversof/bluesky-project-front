<template>
  <div>
    <BlueskyNavBar />

    <nuxt />

    <BookkeepingNavBar />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";
import BlueskyNavBar from "@/components/BlueskyNavBar.vue";
import BookkeepingNavBar from "@/components/Bookkeeping/BookkeepingNavBar.vue";
export default {
  name: "bookkeeping",
  components: { BlueskyNavBar, BookkeepingNavBar },
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      userBookkeeping: state => state.bookkeeping.bookkeeping.userBookkeeping
    })
  },
  mounted: function() {
    this.getUserBookkeeping()
      .then(data => {
        if (data === null) {
          this.$router.push("/bookkeeping").catch(err => {});
        }
        return data;
      })
      .catch(this.commonErrorHandler);
  }
};
</script>

<style></style>
