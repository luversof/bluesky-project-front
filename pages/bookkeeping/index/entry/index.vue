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
          <b-th>-</b-th>
          <b-th>
            <b-form-input
              v-model="addEntry.memo"
              v-focus
              class="mb-2 mr-sm-2 mb-sm-0"
            />
          </b-th>
          <b-th>0</b-th>
          <b-th>
            <b-form-select
              v-model="addEntry.creditAsset.id"
              :options="userAssetList"
              text-field="name"
              value-field="id"
            ></b-form-select>
          </b-th>

          <b-th>
            <b-button variant="outline-secondary" @click="create">{{
              $t("bookkeeping.asset.button.create")
            }}</b-button>
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
      fields: ["id", "name", "amount", { key: "assetGroup" }, "menu"],
      entryRequestParam: {
        startZonedDateTime: "2019-08-08T10:01:03.000Z",
        endZonedDateTime: "2020-08-08T10:01:03.000Z"
      },
      entryList: [],
      entryGroupList: [],
      addEntry: { memo: null, creditAsset: {}, debitAsset: {} },
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
      console.log("TEST", a);
    },
    toggleAddEntryForm: function(event) {
      this.showAddEntryForm = !this.showAddEntryForm;
    },
    create: function() {}
  },
  mounted: function() {
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
