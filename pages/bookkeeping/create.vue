<template>
  <div>
    생성하기
    <b-form @reset="reset" inline>
      <b-form-input
        id="name"
        v-model="bookkeeping.name"
        :placeholder="$t('bookkeeping.name')"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-form-input
        id="baseDate"
        v-model="bookkeeping.baseDate"
        :placeholder="$t('bookkeeping.baseDate')"
        type="number"
        min="1"
        max="28"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-button @click="create" variant="outline-primary">{{ $t("bookkeeping.button.create") }}</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";

export default {
  computed: {},
  mixins: [bookkeepingMixin],
  data() {
    return {
      bookkeeping: { name: "", baseDate: "" }
    };
  },
  methods: {
    create: function() {
      console.log("bookkeeping create");
      this.createUserBookkeeping(this.bookkeeping)
        .then(data => {
          this.$router.push("/bookkeeping").catch(err => {});
        })
        .catch(this.commonErrorHandler);
    },
    reset: function() {
      this.bookkeeping.name = "";
      this.bookkeeping.baseDate = 1;
    }
  }
};
</script>

<style>
</style>