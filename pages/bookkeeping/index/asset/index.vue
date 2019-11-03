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
      <template v-if="showAddAssetForm" v-slot:thead-top="row">
        <b-tr>
          <b-th>-</b-th>
          <b-th>
            <b-form-input v-model="addAsset.name" v-focus class="mb-2 mr-sm-2 mb-sm-0" />
          </b-th>
          <b-th>0</b-th>
          <b-th>
            <b-form-select
              v-model="addAsset.assetGroup.id"
              :options="myAssetGroupList"
              text-field="name"
              value-field="id"
            ></b-form-select>
          </b-th>
          <b-th>
            <b-button variant="outline-secondary" @click="create">{{ $t("bookkeeping.asset.button.create")}}</b-button>
          </b-th>
        </b-tr>
      </template>

      <template v-slot:table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:head(test)="row">
        <b-button variant="outline-secondary" @click="toggleAddAssetForm">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </b-button>
      </template>

      <template v-slot:cell(name)="row">
        <b-form-input v-model="row.item.name" class="mb-2 mr-sm-2 mb-sm-0" />
      </template>
      <template v-slot:cell(assetGroup)="row">
        <b-form-select
          v-if="myAssetGroupList"
          v-model="row.item.assetGroup.id"
          :options="myAssetGroupList"
          text-field="name"
          value-field="id"
        ></b-form-select>
      </template>
      <template v-slot:cell(test)="row">
        <b-button variant="outline-secondary">{{ $t("bookkeeping.asset.button.update")}}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import assetMixin from "~/assets/bookkeeping/asset.js";
import assetGroupMixin from "~/assets/bookkeeping/assetGroup.js";

export default {
  mixins: [assetMixin, assetGroupMixin],
  data() {
    return {
      fields: ["id", "name", "amount", { key: "assetGroup" }, "test"],
      addAsset: { name : null, assetGroup : {}},
      showAddAssetForm: false
    };
  },
  computed: {
    ...mapState({
      myAssetList: state => state.bookkeeping.asset["myAssetList"],
      myAssetGroupList: state =>
        state.bookkeeping.assetGroup["myAssetGroupList"],
      isMyAssetListLoading: state =>
        state.bookkeeping.asset["myAssetList"] == null
    })
  },
  methods: {
    toggleAddAssetForm: function(event) {
      console.log("event  , ", event);
      this.showAddAssetForm = !this.showAddAssetForm;
    },
    create : function() {
      console.log("test : ", this.addAsset)
      this.createMyAsset(this.addAsset);
    }
  },
  mounted: function() {
    this.getMyAssetList();
    this.getMyAssetGroupList();
  },
  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style>
</style>