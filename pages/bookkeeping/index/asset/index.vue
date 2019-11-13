<template>
  <div>
    <b-table
      striped
      hover
      :items="userAssetList"
      :fields="fields"
      :busy="isUserAssetListLoading"
      empty-text="userAssetList is empty"
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
              :options="userAssetGroupList"
              text-field="name"
              value-field="id"
            ></b-form-select>
          </b-th>
          <b-th>
            <b-button
              variant="outline-secondary"
              @click="create"
            >{{ $t("bookkeeping.asset.button.create")}}</b-button>
          </b-th>
        </b-tr>
      </template>

      <template v-slot:table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:head(menu)="row">
        <b-button variant="outline-secondary" @click="toggleAddAssetForm">
          <font-awesome-icon v-if="!showAddAssetForm" :icon="['fas', 'plus']" />
          <font-awesome-icon v-if="showAddAssetForm" :icon="['fas', 'minus']" />
        </b-button>
      </template>

      <template v-slot:cell(name)="row">
        <b-form-input v-model="row.item.name" class="mb-2 mr-sm-2 mb-sm-0" />
      </template>
      <template v-slot:cell(assetGroup)="row">
        <b-form-select
          v-if="userAssetGroupList"
          v-model="row.item.assetGroup.id"
          :options="userAssetGroupList"
          text-field="name"
          value-field="id"
        />
      </template>
      <template v-slot:cell(menu)="row">
        <b-button
          variant="outline-secondary"
          @click="update(row.item)"
        >{{ $t("bookkeeping.asset.button.update")}}</b-button>
        <b-button
          v-if="row.item.amount == 0"
          variant="outline-secondary"
          @click="deleteAsset(row.item)"
        >{{ $t("bookkeeping.asset.button.delete")}}</b-button>
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
      fields: ["id", "name", "amount", { key: "assetGroup" }, "menu"],
      addAsset: { name: null, assetGroup: {} },
      showAddAssetForm: false
    };
  },
  computed: {
    ...mapState({
      userAssetList: state => state.bookkeeping.asset["userAssetList"],
      userAssetGroupList: state =>
        state.bookkeeping.assetGroup["userAssetGroupList"],
      isUserAssetListLoading: state =>
        state.bookkeeping.asset["userAssetList"] == null
    })
  },
  methods: {
    initAddAsset: function() {
      this.addAsset = { name: null, assetGroup: {} };
    },
    toggleAddAssetForm: function(event) {
      this.showAddAssetForm = !this.showAddAssetForm;
    },
    create: function() {
      this.createUserAsset(this.addAsset)
        .then(data => {
          this.initAddAsset();
          this.showAddAssetForm = !this.showAddAssetForm;
          this.getUserAssetList(true);
        })
        .catch(this.commonErrorHandler);
    },
    update: function(asset) {
      this.updateUserAsset(asset)
        .then(data => {
          this.getUserAssetList(true);
        })
        .catch(this.commonErrorHandler);
    },
    deleteAsset: function(asset) {
      this.deleteUserAsset(asset)
        .then(data => {
          this.getUserAssetList(true);
        })
        .catch(this.commonErrorHandler);
    }
  },
  mounted: function() {
    this.getUserAssetList().catch(this.commonErrorHandler);
    this.getUserAssetGroupList().catch(this.commonErrorHandler);
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