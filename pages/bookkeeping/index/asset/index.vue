<template>
  <div>
    서브의 서브~~
    목록 보여주고 추가/삭제/변경 구현하기
    <b-table
      striped
      hover
      :items="myAssetList"
      :fields="fields"
      :busy="isMyAssetListLoading"
      empty-text="myAssetList is empty"
      show-empty
    >
      <template v-slot:table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:head(test)="row">
        <b-button variant="outline-primary" @click="toggleCreateForm">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </b-button>
      </template>

      <template v-slot:cell(name)="row">
        <b-form-input v-model="row.item.name" class="mb-2 mr-sm-2 mb-sm-0" />
      </template>
      <template v-slot:cell(test)="row">
        <b-button>{{ $t("bookkeeping.asset.button.update")}}</b-button>
      </template>

      <template v-slot:thead-bottom="data">
        <b-tr>
          <b-th colspan="2">
            <span class="sr-only">Name and ID</span>
          </b-th>
          <b-th variant="secondary">Type 1</b-th>
          <b-th variant="primary" colspan="3">Type 2</b-th>
          <b-th variant="danger">Type 3</b-th>
        </b-tr>
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
      fields: ["id", "name", "amount", "assetType", "test"],
      myAssetList2: null
    };
  },
  computed: {
    ...mapState({
      myAssetList: state => state.bookkeeping.asset["myAssetList"],
      isMyAssetListLoading: state =>
        state.bookkeeping.asset["myAssetList"] == null
    })
  },
  methods: {
    toggleCreateForm: function() {
      console.log("toggle");
    }
  },
  mounted: function() {
    this.getMyAssetList();
  }
};
</script>

<style>
</style>