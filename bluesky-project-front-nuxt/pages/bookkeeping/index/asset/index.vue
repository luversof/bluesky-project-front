<template>
  <div>
    <b-table
      :items="assetListForTable"
      :fields="assetListForTableFields"
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

      <template v-slot:head(menu)="row">
        <div class="text-right">
          <b-button variant="outline-secondary" v-b-modal.addAssetForm>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </b-button>
        </div>
      </template>

      <template v-slot:cell(assetGroupName)="row">
        <div class="row">
          <div class="col">
            <h5>{{ row.item.assetGroupName }}</h5>
          </div>
          <div class="text-left"></div>
        </div>
      </template>

      <template v-slot:row-details="row">
        <div
          class="row border-top p-2 m-2"
          v-for="asset in row.item.assetList"
          v-bind:key="asset.id"
          @click="onRowClicked(asset)"
        >
          <div class="col-3">{{ asset.name }}</div>
          <div class="col text-right">{{ asset.amount }}</div>
        </div>
      </template>
    </b-table>

    <AssetModal
      modalId="addAssetForm"
      :okTitle="$t('bookkeeping.asset.button.create')"
      @handleOk="create"
    />

    <AssetModal
      modalId="updateAssetForm"
      :okTitle="$t('bookkeeping.asset.button.update')"
      :targetAsset="updateAsset"
      @handleOk="update"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AssetModal from "@/components/Bookkeeping/AssetModal";
import assetMixin from "@/assets/bookkeeping/asset.js";
import assetGroupMixin from "@/assets/bookkeeping/assetGroup.js";
import _ from "lodash";

export default {
  mixins: [assetMixin, assetGroupMixin],
  components: {
    AssetModal
  },
  data() {
    return {
      fields: [
        { key: "id", label: this.$t("bookkeeping.asset.id") },
        { key: "name", label: this.$t("bookkeeping.asset.name") },
        { key: "amount", label: this.$t("bookkeeping.asset.amount") },
        { key: "assetGroup", label: this.$t("bookkeeping.asset.assetGroup") },
        { key: "menu", label: this.$t("bookkeeping.entry.entryDate") }
      ],
      assetListForTable: null,
      assetListForTableFields: [
        {
          key: "assetGroupName",
          label: this.$t("bookkeeping.asset.assetGroup")
        },
        {
          key: "amount",
          label: this.$t("bookkeeping.asset.amount"),
          class: "text-right"
        },
        {
          key: "menu",
          label: this.$t("bookkeeping.asset.menu")
        }
      ],
      updateAsset: { name: null, amount: 0, bookkeeping: {}, assetGroup: {} }
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
    async create(payload) {
      const { bvModalEvt, targetAsset } = payload;
      bvModalEvt.preventDefault();
      var asset = await this.createUserAsset(targetAsset).catch(
        this.commonErrorHandler
      );

      if (asset !== undefined) {
        this.getAssetList();
        this.$root.$emit("bv::hide::modal", "addAssetForm");
      }
    },
    async getAssetList() {
      var assetList = await this.getUserAssetList().catch(
        this.commonErrorHandler
      );
      this.assetListForTable = [];

      assetList.forEach(function(asset) {
        var hasAssetForTable = false;
        this.assetListForTable.forEach(function(assetForTable) {
          if (asset.assetGroup.name == assetForTable.assetGroupName) {
            hasAssetForTable = true;
            assetForTable.assetList.push(asset);
          }
        });
        if (hasAssetForTable == false) {
          this.assetListForTable.push({
            assetGroupName: asset.assetGroup.name,
            amount: 0,
            assetList: [asset],
            _showDetails: true
          });
        }

        this.assetListForTable.forEach(function(assetForTable) {
          assetForTable.assetList.forEach(function(asset) {
            assetForTable.amount += asset.amount;
          });
        });
      }, this);
    },
    async update(payload) {
      const { bvModalEvt, targetAsset } = payload;
      bvModalEvt.preventDefault();
      var asset = await this.updateUserAsset(targetAsset).catch(
        this.commonErrorHandler
      );
      if (asset !== undefined) {
        this.getUserAssetList(true);
        this.$root.$emit("bv::hide::modal", "updateAssetForm");
      }
    },
    deleteAsset(asset) {
      this.deleteUserAsset(asset)
        .then(data => {
          this.getUserAssetList(true);
        })
        .catch(this.commonErrorHandler);
    },
    onRowClicked(asset) {
      this.updateAsset = _.cloneDeep(asset);
      this.$root.$emit("bv::show::modal", "updateAssetForm");
    }
  },
  mounted() {
    this.getAssetList();
    this.getUserAssetGroupList().catch(this.commonErrorHandler);
  }
};
</script>

<style></style>
