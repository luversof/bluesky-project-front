<template>
  <div>
    <b-table
      hover
      :items="entryList"
      :fields="fields"
      :busy="entryList == null"
      empty-text="userEntryList is empty"
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
          <b-th colspan="8">총 금액 요약 보여주는 곳</b-th>
        </b-tr>
      </template>

      <template v-if="showAddEntryForm" v-slot:top-row="row">
        <!-- <b-tr>
          <b-th colspan="3">
            <b-button-group>
              <b-button
                variant="outline-secondary"
                :pressed="addEntry.entryGroupType == 'INCOME'"
                @click="setAddEntryGroupType('INCOME')"
              >{{ $t("bookkeeping.entry.button.income") }}</b-button>
              <b-button
                variant="outline-secondary"
                :pressed="addEntry.entryGroupType == 'EXPENSE'"
                @click="setAddEntryGroupType('EXPENSE')"
              >{{ $t("bookkeeping.entry.button.expense") }}</b-button>
              <b-button
                variant="outline-secondary"
                :pressed="addEntry.entryGroupType == 'TRANSFER'"
                @click="setAddEntryGroupType('TRANSFER')"
              >{{ $t("bookkeeping.entry.button.transfer") }}</b-button>
            </b-button-group>
          </b-th>
        </b-tr>-->
        <b-th>
          <b-form-input type="date" v-model="addEntry.entryDate" />
        </b-th>
        <b-th>
          <b-form-select
            v-model="addEntry.entryGroupType"
            :options="userEntryGroupTypeList"
          />
        </b-th>
        <b-th>
          <b-form-select
            v-if="addEntry.entryGroupType != 'TRANSFER'"
            v-model="addEntry.entryGroup.id"
            :options="getAddEntryGroupList()"
            text-field="name"
            value-field="id"
          />
        </b-th>

        <b-th>
          <b-form-select
            v-if="addEntry.entryGroupType != 'EXPENSE'"
            v-model="addEntry.incomeAsset.id"
            :options="userAssetList"
            text-field="name"
            value-field="id"
          />
        </b-th>
        <b-th>
          <b-form-select
            v-if="addEntry.entryGroupType != 'INCOME'"
            v-model="addEntry.expenseAsset.id"
            :options="userAssetList"
            text-field="name"
            value-field="id"
          />
        </b-th>
        <b-th>
          <b-form-input type="number" v-model="addEntry.amount" />
        </b-th>
        <b-th>
          <b-form-input v-model="addEntry.memo" class="mb-2 mr-sm-2 mb-sm-0" />
        </b-th>
        <b-th>
          <b-button variant="outline-secondary" @click="create">{{
            $t("bookkeeping.entry.button.create")
          }}</b-button>
        </b-th>
      </template>

      <template v-slot:head(menu)="row">
        <b-button variant="outline-secondary" @click="toggleAddEntryForm">
          <font-awesome-icon v-if="!showAddEntryForm" :icon="['fas', 'plus']" />
          <font-awesome-icon v-if="showAddEntryForm" :icon="['fas', 'minus']" />
        </b-button>
      </template>

      <template v-slot:cell(entryDate)="row">
        <b-form-input type="date" v-model="row.item.entryDate" />
      </template>

      <template v-slot:cell(entryGroupType)="row">
        <b-form-select
          v-model="row.item.entryGroupType"
          :options="userEntryGroupTypeList"
        />
      </template>

      <template v-slot:cell(entryGroup)="row">
        <b-form-select
          v-if="userEntryGroupList && row.item.entryGroupType != 'TRANSFER'"
          :value="row.item.entryGroup && row.item.entryGroup.id"
          :options="getEntryGroupList(row.item.entryGroupType)"
          text-field="name"
          value-field="id"
        />
      </template>
      <template v-slot:cell(incomeAsset)="row">
        <b-form-select
          v-if="userAssetList && row.item.entryGroupType != 'EXPENSE'"
          :value="row.item.incomeAsset && row.item.incomeAsset.id"
          :options="userAssetList"
          text-field="name"
          value-field="id"
        />
      </template>

      <template v-slot:cell(expenseAsset)="row">
        <b-form-select
          v-if="userAssetList && row.item.entryGroupType != 'INCOME'"
          :value="row.item.expenseAsset && row.item.expenseAsset.id"
          :options="userAssetList"
          text-field="name"
          value-field="id"
        />
      </template>

      <template v-slot:cell(amount)="row">
        <b-form-input
          type="number"
          v-model="row.item.amount"
          :class="
            row.item.entryGroupType == 'INCOME'
              ? 'text-primary'
              : row.item.entryGroupType == 'EXPENSE'
              ? 'text-danger'
              : ''
          "
        />
      </template>

      <template v-slot:cell(memo)="row">
        <b-form-input v-model="row.item.memo" />
      </template>

      <template v-slot:cell(menu)="row">
        <b-button variant="outline-secondary" @click="update(row.item)">
          {{ $t("bookkeeping.entry.button.update") }}
        </b-button>
        <b-button variant="outline-secondary" @click="deleteEntry(row.item)">{{
          $t("bookkeeping.entry.button.delete")
        }}</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import assetMixin from "~/assets/bookkeeping/asset.js";
import entryMixin from "~/assets/bookkeeping/entry.js";
import entryGroupMixin from "~/assets/bookkeeping/entryGroup.js";

export default {
  mixins: [assetMixin, entryMixin, entryGroupMixin],
  data() {
    return {
      fields: [
        { key: "entryDate", label: this.$t("bookkeeping.entry.entryDate") },
        {
          key: "entryGroupType",
          label: this.$t("bookkeeping.entry.entryGroupType")
        },
        { key: "entryGroup", label: this.$t("bookkeeping.entry.entryGroup") },
        { key: "incomeAsset", label: this.$t("bookkeeping.entry.incomeAsset") },
        {
          key: "expenseAsset",
          label: this.$t("bookkeeping.entry.expenseAsset")
        },
        { key: "amount", label: this.$t("bookkeeping.entry.amount") },
        { key: "memo", label: this.$t("bookkeeping.entry.memo") },
        { key: "menu", label: this.$t("bookkeeping.entry.menu") }
      ],
      entryRequestParam: {
        startLocalDate: "2019-08-08",
        endLocalDate: "2020-08-08"
      },
      entryList: null,
      entryGroupList: [],
      addEntry: {
        entryDate: this.$moment().format("YYYY-MM-DD"),
        entryGroupType: "INCOME",
        memo: null,
        amount: 0,
        entryGroup: {},
        incomeAsset: {},
        expenseAsset: {}
      },
      showAddEntryForm: false
    };
  },
  computed: {
    ...mapState({
      userAssetList: state => state.bookkeeping.asset["userAssetList"],
      userEntryGroupList: state =>
        state.bookkeeping.entryGroup["userEntryGroupList"],
      userEntryGroupTypeList: state =>
        state.bookkeeping.entryGroupType["userEntryGroupTypeList"],
      isUserEntryGroupListLoading: state =>
        state.bookkeeping.asset["userAssetList"] == null
    })
  },
  methods: {
    searchEntry: function() {
      this.searchUserEntry(this.entryRequestParam)
        .then(data => (this.entryList = data))
        .catch(this.commonErrorHandler);
    },
    toggleAddEntryForm: function(event) {
      this.showAddEntryForm = !this.showAddEntryForm;
    },
    setAddEntryGroupType: function(entryGroupType) {
      this.addEntry.entryGroupType = entryGroupType;
    },
    create: function() {
      console.log("create ", this.addEntry);
      this.createUserEntry(this.addEntry)
        .then(data => {
          this.searchEntry();
        })
        .catch(this.commonErrorHandler);
    },
    getAddEntryGroupList: function() {
      var target = [];
      for (var key in this.entryGroupList) {
        if (
          this.entryGroupList[key].entryGroupType ==
          this.addEntry.entryGroupType
        ) {
          target.push(this.entryGroupList[key]);
        }
      }
      return target;
    },
    getEntryGroupList: function(entryGroupType) {
      var target = [];
      for (var key in this.entryGroupList) {
        if (this.entryGroupList[key].entryGroupType == entryGroupType) {
          target.push(this.entryGroupList[key]);
        }
      }
      return target;
    },
    update: function(entry) {},
    deleteEntry: function(entry) {}
  },
  mounted: function() {
    this.searchEntry();
    this.getUserEntryGroupList()
      .then(data => {
        this.entryGroupList = data;
      })
      .catch(this.commonErrorHandler);

    this.getUserAssetList().catch(this.commonErrorHandler);
  }
};
</script>

<style></style>
