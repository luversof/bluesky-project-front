<template>
  <b-modal
    :id="modalId"
    :cancel-title="$t('bookkeeping.entry.button.cancel')"
    :ok-title="okTitle"
    @ok="handleOk"
  >
    <b-form-group>
      <b-button-group class="col-12">
        <b-button
          variant="outline-secondary"
          :pressed="entry.entryGroupType == 'INCOME'"
          @click="entry.entryGroupType = 'INCOME'"
          >{{ $t("bookkeeping.entryGroupType.INCOME") }}</b-button
        >
        <b-button
          variant="outline-secondary"
          :pressed="entry.entryGroupType == 'EXPENSE'"
          @click="entry.entryGroupType = 'EXPENSE'"
          >{{ $t("bookkeeping.entryGroupType.EXPENSE") }}</b-button
        >
        <b-button
          variant="outline-secondary"
          :pressed="entry.entryGroupType == 'TRANSFER'"
          @click="entry.entryGroupType = 'TRANSFER'"
          >{{ $t("bookkeeping.entryGroupType.TRANSFER") }}</b-button
        >
      </b-button-group>
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.entry.entryDate')">
      <b-form-input type="date" v-model="entry.entryDate" />
    </b-form-group>

    <b-form-group
      v-if="entry.entryGroupType != 'TRANSFER'"
      :label="$t('bookkeeping.entry.entryGroup')"
    >
      <b-form-select
        v-model="entry.entryGroup.id"
        :options="getAddEntryGroupList()"
        text-field="name"
        value-field="id"
      />
    </b-form-group>
    <b-form-group
      v-if="entry.entryGroupType != 'EXPENSE'"
      :label="$t('bookkeeping.entry.incomeAsset')"
    >
      <b-form-select
        v-model="entry.incomeAsset.id"
        :options="userAssetList"
        text-field="name"
        value-field="id"
      />
    </b-form-group>
    <b-form-group
      v-if="entry.entryGroupType != 'INCOME'"
      :label="$t('bookkeeping.entry.expenseAsset')"
    >
      <b-form-select
        v-model="entry.expenseAsset.id"
        :options="userAssetList"
        text-field="name"
        value-field="id"
      />
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.entry.amount')">
      <b-form-input type="number" v-model="entry.amount" />
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.entry.memo')">
      <b-form-input v-model="entry.memo" />
    </b-form-group>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import assetMixin from "@/assets/bookkeeping/asset.js";
import entryGroupMixin from "@/assets/bookkeeping/entryGroup.js";

export default {
  mixins: [assetMixin, entryGroupMixin],
  props: {
    modalId: { type: String, required: true },
    okTitle: {
      type: String,
      default() {
        return "확인";
      }
    },
    targetEntry: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      userAssetList: state => state.bookkeeping.asset.userAssetList,
      userEntryGroupList: state =>
        state.bookkeeping.entryGroup.userEntryGroupList,
      userEntryGroupTypeList: state =>
        state.bookkeeping.entryGroupType.userEntryGroupTypeList
    })
  },
  data() {
    return {
      entry: this.targetEntry
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      this.$emit("handleOk", {
        bvModalEvt: bvModalEvt,
        targetEntry: this.entry
      });
    },
    initEntry() {
      this.entry = {
        entryDate: this.$moment().format("YYYY-MM-DD"),
        entryGroupType: "INCOME",
        memo: null,
        amount: 0,
        entryGroup: {},
        incomeAsset: {},
        expenseAsset: {}
      };
    },
    getAddEntryGroupList() {
      var target = [];
      this.userEntryGroupList.forEach(function(userEntryGroup) {
        if (userEntryGroup.entryGroupType == this.entry.entryGroupType) {
          target.push(userEntryGroup);
        }
      }, this);

      return target;
    }
  },
  created() {
    if (this.entry == undefined) {
      this.initEntry();
    }
  },
  mounted() {},
  watch: {
    targetEntry(entry) {
      this.entry = entry;
      if (this.entry.expenseAsset == null) {
        this.entry.expenseAsset = {};
      }
      if (this.entry.incomeAsset == null) {
        this.entry.incomeAsset = {};
      }
    }
  }
};
</script>

<style></style>
