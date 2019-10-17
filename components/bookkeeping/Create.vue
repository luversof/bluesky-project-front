<template>
  <div>
    생성하기
    <b-form @submit="create" @reset="reset" inline>
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
      <b-button type="submit" variant="outline-primary">{{ $t("bookkeeping.button.create") }}</b-button>
    </b-form>
  </div>
</template>

<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  mixins: [bookkeepingMixin],
  data() {
    return {
      bookkeeping: { name: "", baseDate: "" }
    };
  },
  methods: {
    create: function() {
      console.log("test bookkeeping : ", this.bookkeeping);
      this.createBookkeeping(this.bookkeeping)
        .then(data => {
          console.log("result : ", data);
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