<template>
  <div>
    <b-form inline v-if="myBookkeepingInfo">
      <b-form-input
        id="name"
        v-model="myBookkeepingName"
        :placeholder="$t('bookkeeping.name')"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-form-input
        id="baseDate"
        v-model="myBookkeepingInfo.baseDate"
        :placeholder="$t('bookkeeping.baseDate')"
        type="number"
        min="1"
        max="28"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-button @click="update" variant="outline-primary">{{ $t("bookkeeping.button.update") }}</b-button>
      <b-button type="reset" variant="outline-primary">{{ $t("bookkeeping.button.create") }}</b-button>
    </b-form>
    <div>{{myBookkeepingInfo}}</div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      myBookkeepingInfo: state => state.bookkeeping.myBookkeepingInfo
    }),
    myBookkeepingName: {
      get() {
        return this.$store.state.bookkeeping.myBookkeepingInfo.name;
      },
      set(value) {
        console.log("SET : ", this.$store.state.bookkeeping.myBookkeepingInfo);
        console.log("this.$store", this.$store);
        this.$store.commit(
          "bookkeeping/setMyBookkeepingInfo",
          this.$store.state.bookkeeping.myBookkeepingInfo
        );
      }
    }
  },

  methods: {
    update: function() {}
  }
};
</script>

<style>
</style>