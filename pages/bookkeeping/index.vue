<template>
  <div>
    <b-row>
      <b-col sm="2">
        <b-list-group v-if="myBookkeepingInfo">
          <b-list-group-item to="/bookkeeping/entry/">입력</b-list-group-item>
          <b-list-group-item to="/bookkeeping/statistics/">통계</b-list-group-item>
          <b-list-group-item to="/bookkeeping/asset/">자산</b-list-group-item>
          <b-list-group-item to="/bookkeeping/config/">설정</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col sm="10">
        <nuxt-child />
      </b-col>
    </b-row>
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