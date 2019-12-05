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
            <h5>{{row.item.assetGroupName}}</h5>
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
          <div class="col-3">{{asset.name}}</div>
          <div class="col text-right">{{asset.amount}}</div>
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
      :okTitle="$t('bookkeeping.asset.button.create')"
      @handleOk="update"
    />

    <b-table
      striped
      hover
      :items="userAssetList"
      :fields="fields"
      :busy="!isUserAssetListLoaded"
      empty-text="userAssetList is empty"
      show-empty
      responsive
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
          <b-form-input v-model="addAsset.name" v-focus />
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
          <b-button variant="outline-secondary" @click="create">
            {{
            $t("bookkeeping.asset.button.create")
            }}
          </b-button>
        </b-td>
      </template>

      <template v-slot:head(menu)="row">
        <b-button variant="outline-secondary" @click="toggleAddAssetForm">
          <font-awesome-icon v-if="!showAddAssetForm" :icon="['fas', 'plus']" />
          <font-awesome-icon v-if="showAddAssetForm" :icon="['fas', 'minus']" />
        </b-button>
      </template>

      <template v-slot:cell(name)="row">
        <b-form-input v-model="row.item.name" />
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
        <b-button variant="outline-secondary" @click="update(row.item)">
          {{
          $t("bookkeeping.asset.button.update")
          }}
        </b-button>
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
      addAsset: { name: null, assetGroup: {} },
      showAddAssetForm: false,
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
      ]
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
    initAddAsset() {
      this.addAsset = { name: null, assetGroup: {} };
    },
    toggleAddAssetForm(event) {
      this.showAddAssetForm = !this.showAddAssetForm;
    },
    create(payload) {
      const { bvModalEvt, targetAsset } = payload;
      this.createUserAsset(this.addAsset)
        .then(data => {
          this.initAddAsset();
          this.showAddAssetForm = !this.showAddAssetForm;
          this.getUserAssetList(true);
        })
        .catch(this.commonErrorHandler);
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
    update(asset) {
      this.updateUserAsset(asset)
        .then(data => {
          this.getUserAssetList(true);
        })
        .catch(this.commonErrorHandler);
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
