<template>
  <div>
    <b-form inline v-if="myBookkeeping">
      <b-form-input
        id="name"
        v-model="myBookkeeping.name"
        :placeholder="$t('bookkeeping.name')"
        @focus="beforeChangeMyBookkeeping"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-form-input
        id="baseDate"
        v-model="myBookkeeping.baseDate"
        :placeholder="$t('bookkeeping.baseDate')"
        @focus="beforeChangeMyBookkeeping"
        type="number"
        min="1"
        max="28"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-button @click="update" variant="outline-primary">{{ $t("bookkeeping.button.update") }}</b-button>
      <b-button
        @click="resetMyBookkeeping"
        variant="outline-primary"
      >{{ $t("bookkeeping.button.reset") }}</b-button>
    </b-form>
    <div>{{myBookkeeping}}</div>
  </div>
</template>

<script>
// 페이지 나갈 때 oldMyBookkeeping를 리셋 처리 필요함
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";

export default {
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.myBookkeeping
    })
  },
  methods: {
    ...mapMutations({
      beforeChangeMyBookkeeping: "bookkeeping/beforeChangeMyBookkeeping",
      resetMyBookkeeping: "bookkeeping/resetMyBookkeeping"
    }),

    update: function() {
      console.log("test", this);
      this.updateMyBookkeeping(this.myBookkeeping);
    }
  }
};
</script>

<style>
</style>