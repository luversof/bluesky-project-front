<template>
  <div>
    서브의 서브~~
    목록 보여주고 추가/삭제/변경 구현하기
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      testSample: state => state.bookkeeping.test["testSample"]
    })
  },
  mounted() {
    console.log("this : ", this);
  }
};
</script>

<style>
</style>