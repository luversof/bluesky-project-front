<template>
  <div>
    서브의 서브~~
    목록 보여주고 추가/삭제/변경 구현하기
    {{getMyAssetList()}}
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import assetMixin from "~/assets/bookkeeping/asset.js";

export default {
  mixins: [assetMixin],
  computed: {
    ...mapState({
      testSample: state => state.bookkeeping.test["testSample"]
    })
  }
  // created: function() {
  //   this.getMyAssetList();
  // }
};
</script>

<style>
</style>