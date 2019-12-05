<template>
  <b-modal
    :id="modalId"
    :cancel-title="$t('bookkeeping.asset.button.cancel')"
    :ok-title="okTitle"
    @ok="handleOk"
  >
    <b-form-group :label="$t('bookkeeping.asset.assetGroup')">
      <b-form-select
        v-model="asset.assetGroup.id"
        :options="userAssetGroupList"
        text-field="name"
        value-field="id"
      ></b-form-select>
    </b-form-group>
    <b-form-group :label="$t('bookkeeping.asset.name')">
      <b-form-input v-model="asset.name" />
    </b-form-group>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    modalId: { type: String, required: true },
    okTitle: {
      type: String,
      default() {
        return "확인";
      }
    },
    targetAsset: {
      type: Object
    }
  },
  data() {
    return {
      asset: this.targetAsset
    };
  },
  computed: {
    ...mapState({
      userAssetGroupList: state =>
        state.bookkeeping.assetGroup.userAssetGroupList
    })
  },
  methods: {
    handleOk(bvModalEvt) {
      this.$emit("handleOk", {
        bvModalEvt: bvModalEvt,
        targetAsset: this.asset
      });
    },
    initAsset() {
      this.asset = {
        name: null,
        amount: 0,
        bookkeeping: {},
        assetGroup: {}
      };
    }
  },
  created() {
    console.log("TASETASETASETSAET");
    if (this.asset == undefined) {
      console.log("TEST");
      this.initAsset();
    }
  },
  mounted() {}
};
</script>

<style>
</style>