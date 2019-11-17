<template>
  <div>
    <b-table
      striped
      hover
      :items="entryList"
      :fields="fields"
      empty-text="userEntryList is empty"
      show-empty
    >
      <template v-if="showAddEntryForm" v-slot:thead-top="row">
        <b-tr>
          <b-th colspan="3">
            <b-button-group>
              <b-button
                variant="outline-secondary"
                :pressed="addEntry.entryGroupType == 'INCOME'"
                @click="setAddEntryGroupType('INCOME')"
              >{{ $t("bookkeeping.entry.button.income")}}</b-button>
              <b-button
                variant="outline-secondary"
                :pressed="addEntry.entryGroupType == 'EXPENSE'"
                @click="setAddEntryGroupType('EXPENSE')"
              >{{ $t("bookkeeping.entry.button.expense")}}</b-button>
              <b-button
                variant="outline-secondary"
                :pressed="addEntry.entryGroupType == 'TRANSFER'"
                @click="setAddEntryGroupType('TRANSFER')"
              >{{ $t("bookkeeping.entry.button.transfer")}}</b-button>
            </b-button-group>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th>
            <b-form-input type="date" v-model="addEntry.entryDate" />
          </b-th>
          <b-th></b-th>
          <b-th>
            <b-form-select
              v-if="addEntry.entryGroupType != 'TRANSFER'"
              v-model="addEntry.entryGroup.id"
              :options="getAddEntryGroupList()"
              text-field="name"
              value-field="id"
            ></b-form-select>
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
            <b-button variant="outline-secondary" @click="create">
              {{
              $t("bookkeeping.entry.button.create")
              }}
            </b-button>
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
        <b-button variant="outline-secondary" @click="toggleAddEntryForm">
          <font-awesome-icon v-if="!showAddEntryForm" :icon="['fas', 'plus']" />
          <font-awesome-icon v-if="showAddEntryForm" :icon="['fas', 'minus']" />
        </b-button>
      </template>
    </b-table>
    <p @click="search">테스트</p>
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
        "entryDate",
        "entryGroupType",
        { key: "entryGroup" },
        "incomeAsset",
        "expenseAsset",
        "amount",
        "memo",
        "menu"
      ],
      entryRequestParam: {
        startLocalDate: "2019-08-08",
        endLocalDate: "2020-08-08"
      },
      entryList: [],
      entryGroupList: [],
      addEntry: {
        entryDate: null,
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
      isUserEntryGroupListLoading: state =>
        state.bookkeeping.asset["userAssetList"] == null
    })
  },
  methods: {
    search: async function() {
      var a = await this.searchUserEntry(this.entryRequestParam).catch(
        this.commonErrorHandler
      );
    },
    toggleAddEntryForm: function(event) {
      this.showAddEntryForm = !this.showAddEntryForm;
    },
    setAddEntryGroupType: function(entryGroupType) {
      this.addEntry.entryGroupType = entryGroupType;
    },
    create: function() {
      console.log("create ", this.addEntry);
      this.createUserEntry(this.addEntry).catch(this.commonErrorHandler);
    },
    getAddEntryGroupList: function() {
      var target = [];
      for (var key in this.entryGroupList) {
        if (
          this.entryGroupList[key].entryType == this.addEntry.entryGroupType
        ) {
          target.push(this.entryGroupList[key]);
        }
      }
      return target;
    }
  },
  mounted: function() {
    this.searchUserEntry(this.entryRequestParam)
      .then(data => (this.entryList = data))
      .catch(this.commonErrorHandler);
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
