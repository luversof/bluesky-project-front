<template>
  <div>
    bookkeeping index
    <div v-text="myBookkeepingInfo"></div>
    <b-button
      v-if="myBookkeepingInfo == null"
      to="/bookkeeping/create"
      variant="outline-primary"
    >{{ $t("bookkeeping.link.create") }}</b-button>
    <b-button
      v-if="myBookkeepingInfo != null"
      @click="deleteBookkeeping"
      variant="outline-primary"
    >{{ $t("bookkeeping.button.delete") }}</b-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingIndex",
  mixins: [bookkeepingMixin],
  computed: {
    ...mapState({
      myBookkeepingInfo: state => state.bookkeeping.myBookkeepingInfo
    })
  },
  methods: {
    deleteBookkeeping: function(event) {
      this.deleteMyBookkeeping();
    }
  },
  mounted() {
    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type !== "bookkeeping/setMyBookkeepingInfo") {
    //     return;
    //   }
    //   if (mutation.payload == null) {
    //     if (
    //       confirm("현재 소유한 가계부가 없습니다. 가계부를 생성하시겠습니까?")
    //     ) {
    //       // 가계부 생성
    //       this.$router.push("/bookkeeping/create");
    //     } else {
    //       // 홈으로 가기?
    //     }
    //   } else {
    //     // 해당 가계부 노출?
    //     // this.myBookkeeping = data;
    //     this.$router.push("/");
    //   }
    // });
  }
};
</script>

<style>
</style>