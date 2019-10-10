<template>
  <div>bookkeeping index</div>
</template>

<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingIndex",
  mixins: [bookkeepingMixin],
  mounted: function() {
    this.getMyBookkeeping()
      .then(data => {
        if (data == null) {
          if (
            confirm("현재 소유한 가계부가 없습니다. 가계부를 생성하시겠습니까?")
          ) {
            // 가계부 생성
            this.$router.push("/bookkeeping/create");
          } else {
            // 홈으로 가기?
          }
        } else {
          // 해당 가계부 노출?
        }
      })
      .catch(this.commonErrorHandler);
  },
  methods: {
    // 전체 공통 에러 핸들러
    commonErrorHandler: function(response) {
      console.log("ERR ", response);
      response.json().then(data => {
        console.log("error body", data.result);
        var errorMessage = data.result;
        if (errorMessage.displayableMessage) {
          alert(errorMessage.message);
        } else {
          alert("에러가 발생하였습니다.");
        }
      });
    }
  }
};
</script>

<style>
</style>