<template>
  <div>
    <b-form inline v-if="myBookkeepingInfo">
      <b-form-input
        id="name"
        v-model="myBookkeepingInfo.name"
        :placeholder="$t('bookkeeping.name')"
        @focus="beforeChangeMyBookkeepingInfo"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-form-input
        id="baseDate"
        v-model="myBookkeepingInfo.baseDate"
        :placeholder="$t('bookkeeping.baseDate')"
        @focus="beforeChangeMyBookkeepingInfo"
        type="number"
        min="1"
        max="28"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-button @click="update" variant="outline-primary">{{ $t("bookkeeping.button.update") }}</b-button>
      <b-button
        @click="resetMyBookkeepingInfo"
        variant="outline-primary"
      >{{ $t("bookkeeping.button.reset") }}</b-button>
    </b-form>
    <div>{{myBookkeepingInfo}}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";

export default {
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      myBookkeepingInfo: state => state.bookkeeping.myBookkeepingInfo
    })
  },
  data() {
    return { oldMyBookkepingInfo: null };
  },
  methods: {
    ...mapMutations({
      beforeChangeMyBookkeepingInfo:
        "bookkeeping/beforeChangeMyBookkeepingInfo",
      resetMyBookkeepingInfo: "bookkeeping/resetMyBookkeepingInfo"
    }),

    update: function() {
      console.log("test", this);
      this.updateMyBookkeeping(this.myBookkeepingInfo);
    }
  }
};
</script>

<style>
</style>