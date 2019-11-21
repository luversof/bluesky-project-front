<template>
  <div>
    <b-table
      striped
      hover
      :items="userAssetList"
      :fields="fields"
      :busy="!isUserAssetListLoaded"
      empty-text="userAssetList is empty"
      show-empty
    >
      <template v-slot:table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:thead-top="row">
        <b-tr>
          <b-th colspan="5">총 금액 요약 보여주는 곳</b-th>
        </b-tr>
      </template>

      <template v-if="showAddAssetForm" v-slot:top-row="row" variant="success">
        <b-td>-</b-td>
        <b-td>
          <b-form-input v-model="addAsset.name" v-focus class="mb-2 mr-sm-2 mb-sm-0" />
        </b-td>
        <b-td>0</b-td>
        <b-td>
          <b-form-select
            v-model="addAsset.assetGroup.id"
            :options="userAssetGroupList"
            text-field="name"
            value-field="id"
          ></b-form-select>
        </b-td>
        <b-td>
          <b-button
            variant="outline-secondary"
            @click="create"
          >{{ $t("bookkeeping.asset.button.create") }}</b-button>
        </b-td>
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
        >{{ $t("bookkeeping.asset.button.update") }}</b-button>
        <b-button
          v-if="row.item.amount == 0"
          variant="outline-secondary"
          @click="deleteAsset(row.item)"
        >{{ $t("bookkeeping.asset.button.delete") }}</b-button>
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
      fields: [
        { key: "id", label: this.$t("bookkeeping.asset.id") },
        { key: "name", label: this.$t("bookkeeping.asset.name") },
        { key: "amount", label: this.$t("bookkeeping.asset.amount") },
        { key: "assetGroup", label: this.$t("bookkeeping.asset.assetGroup") },
        { key: "menu", label: this.$t("bookkeeping.entry.entryDate") }
      ],
      addAsset: { name: null, assetGroup: {} },
      showAddAssetForm: false
    };
  },
  computed: {
    ...mapState({
      userAssetList: state => state.bookkeeping.asset.userAssetList,
      isUserAssetListLoaded: state =>
        state.bookkeeping.asset.isUserAssetListLoaded,
      userAssetGroupList: state =>
        state.bookkeeping.assetGroup.userAssetGroupList
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
  }
};
</script>

<style></style>
