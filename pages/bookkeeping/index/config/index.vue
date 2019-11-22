<template>
  <div>
    <b-form inline>
      <b-form-input
        id="name"
        v-model="userBookkeeping.name"
        :placeholder="$t('bookkeeping.name')"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-form-input
        id="baseDate"
        v-model="userBookkeeping.baseDate"
        :placeholder="$t('bookkeeping.baseDate')"
        type="number"
        min="1"
        max="28"
        class="mb-2 mr-sm-2 mb-sm-0"
      />
      <b-button @click="update" variant="outline-secondary">{{ $t("bookkeeping.button.update") }}</b-button>
      <b-button
        @click="resetUserBookkeeping"
        variant="outline-secondary"
      >{{ $t("bookkeeping.button.reset") }}</b-button>
    </b-form>assetGroup 설정하기
    <br />entryGroup 설정하기
  </div>
</template>

<script>
// 페이지 나갈 때 oldUserBookkeeping를 리셋 처리 필요함
import { mapState, mapMutations } from "vuex";
import bookkeepingMixin from "~/assets/bookkeeping/bookkeeping.js";
import _ from "lodash";

export default {
  mixins: [bookkeepingMixin],
  data() {
    return {
      tempUserBookkeeping: null
    };
  },
  computed: {
    ...mapState({
      userBookkeeping: state => state.bookkeeping.bookkeeping.userBookkeeping
    })
  },
  methods: {
    ...mapMutations({
      setUserBookkeeping: "bookkeeping/bookkeeping/setUserBookkeeping"
    }),

    update: function() {
      this.updateUserBookkeeping(this.userBookkeeping);
    },
    resetUserBookkeeping: function() {
      this.setUserBookkeeping(_.cloneDeep(this.tempUserBookkeeping));
    }
  },
  mounted: function() {
    if (this.userBookkeeping.id != null) {
      this.tempUserBookkeeping = _.cloneDeep(this.userBookkeeping);
    }
  },
  watch: {
    userBookkeeping(val, oldVal) {
      this.tempUserBookkeeping = _.cloneDeep(oldVal.id != null ? oldVal : val);
    }
  }
};
</script>

<style></style>
