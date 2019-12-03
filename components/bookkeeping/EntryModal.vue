<template>
  <b-modal
    id="addEntryForm"
    :cancel-title="$t('bookkeeping.entry.button.cancel')"
    :ok-title="$t('bookkeeping.entry.button.create')"
    @ok="create"
  >
    <b-form-group>
      <b-button-group class="col-12">
        <b-button
          variant="outline-secondary"
          :pressed="addEntry.entryGroupType == 'INCOME'"
          @click="addEntry.entryGroupType = 'INCOME'"
          >{{ $t("bookkeeping.entryGroupType.INCOME") }}</b-button
        >
        <b-button
          variant="outline-secondary"
          :pressed="addEntry.entryGroupType == 'EXPENSE'"
          @click="addEntry.entryGroupType = 'EXPENSE'"
          >{{ $t("bookkeeping.entryGroupType.EXPENSE") }}</b-button
        >
        <b-button
          variant="outline-secondary"
          :pressed="addEntry.entryGroupType == 'TRANSFER'"
          @click="addEntry.entryGroupType = 'TRANSFER'"
          >{{ $t("bookkeeping.entryGroupType.TRANSFER") }}</b-button
        >
      </b-button-group>
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.entry.entryDate')">
      <b-form-input type="date" v-model="addEntry.entryDate" />
    </b-form-group>

    <b-form-group :label="$t('bookkeeping.entry.entryGroupType')">
      <b-form-select
        v-model="addEntry.entryGroupType"
        :options="userEntryGroupTypeList"
      />
    </b-form-group>
    <b-form-group
      v-if="addEntry.entryGroupType != 'TRANSFER'"
      :label="$t('bookkeeping.entry.entryGroup')"
    >
      <b-form-select
        v-model="addEntry.entryGroup.id"
        :options="getAddEntryGroupList()"
        text-field="name"
        value-field="id"
      />
    </b-form-group>
    <b-form-group
      v-if="addEntry.entryGroupType != 'EXPENSE'"
      :label="$t('bookkeeping.entry.incomeAsset')"
    >
      <b-form-select
        v-model="addEntry.incomeAsset.id"
        :options="userAssetList"
        text-field="name"
        value-field="id"
      />
    </b-form-group>
    <b-form-group
      v-if="addEntry.entryGroupType != 'INCOME'"
      :label="$t('bookkeeping.entry.expenseAsset')"
    >
      <b-form-select
        v-model="addEntry.expenseAsset.id"
        :options="userAssetList"
        text-field="name"
        value-field="id"
      />
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.entry.amount')">
      <b-form-input type="number" v-model="addEntry.amount" />
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.entry.memo')">
      <b-form-input v-model="addEntry.memo" />
    </b-form-group> </b-modal
></template>

<script>
export default {};
</script>

<style></style>
