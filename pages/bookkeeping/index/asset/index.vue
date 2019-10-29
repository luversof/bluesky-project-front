<template>
  <div>
    서브의 서브~~
    목록 보여주고 추가/삭제/변경 구현하기
    <b-table striped hover :items="myAssetList" :fields="fields">
      <template v-slot:cell(test)="row">
        <button v-text="item">123</button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import assetMixin from "~/assets/bookkeeping/asset.js";

export default {
  mixins: [assetMixin],
  data() {
      return {
        fields : ["id", "name", "amount", "assetType", "test"]
      }
  },
  computed: {
    ...mapState({
      myAssetList: state => state.bookkeeping.asset["myAssetList"]
    })
  },
  mounted: function() {
     this.getMyAssetList();
  }
};
</script>

<style>
</style>