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
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  computed: {
    ...mapState({
      myBookkeepingInfo: state => state.bookkeeping.myBookkeepingInfo
    })
  },
  mixins: [bookkeepingMixin],
  data() {
    return {
      bookkeeping: { name: "", baseDate: "" }
    };
  },
  methods: {
    ...mapMutations({
      setMyBookkeepingInfo: "bookkeeping/setMyBookkeepingInfo"
    }),
    create: function() {
      this.createMyBookkeeping(this.bookkeeping)
        .then(data => {
          this.$router.push("/bookkeeping").catch(err => {});
        })
        .catch(this.commonErrorHandler);
    },
    reset: function() {
      this.bookkeeping.name = "";
      this.bookkeeping.baseDate = 1;
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type !== "bookkeeping/setMyBookkeepingInfo") {
        return;
      }
      if (mutation.payload != null) {
        alert(1);
        this.$router.push("/bookkeeping").catch(err => {});
      }
    });
  }
};
</script>

<style>
</style>