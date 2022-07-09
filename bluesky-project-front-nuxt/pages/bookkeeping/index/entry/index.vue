<template>
  <div>
    <b-table
      :items="entryListForTable"
      :fields="entryListForTableFields"
      :busy="entryList == null"
      empty-text="userEntryList is empty"
      show-empty
    >
      <template v-slot:table-busy>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:thead-top="row">
        <b-tr>
          <b-th colspan="2" class="text-center">
            <div class="row m-0">
              <b-link class="col" @click="addMonth(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
              </b-link>
              <div>
                {{ entryRequestParam.startLocalDate }} ~
                {{ entryRequestParam.endLocalDate }}
              </div>
              <b-link class="col" @click="addMonth(1)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </b-link>
            </div>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th colspan="2">
            <div class="row text-center m-0">
              <div class="col">
                <div>수입</div>
                <div class="text-primary">
                  {{ numberWithCommas(getTotalIncomeAmount()) }}원
                </div>
              </div>
              <div class="col">
                <div>지출</div>
                <div class="text-danger">
                  {{ numberWithCommas(getTotalExpenseAmount()) }}원
                </div>
              </div>
              <div class="col">
                <div>합계</div>
                <div class="text-secondary">
                  {{ numberWithCommas(getTotalAmount()) }}원
                </div>
              </div>
            </div>
          </b-th>
        </b-tr>
      </template>

      <template v-slot:head(menu)="row">
        <div class="text-right">
          <b-button variant="outline-secondary" v-b-modal.addEntryForm>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </b-button>
        </div>
      </template>

      <template v-slot:cell(entryDate)="row">
        <div class="row">
          <div class="col-1">
            <h2>{{ $dayjs(row.item.entryDate).format("DD") }}</h2>
          </div>
          <div class="text-left">
            {{ $dayjs(row.item.entryDate).format("MM-DD") }}
          </div>
        </div>
      </template>

      <template v-slot:row-details="row">
        <div
          class="row border-top p-2 m-2"
          v-for="entry in row.item.entryList"
          v-bind:key="entry.id"
          @click="onRowClicked(entry)"
        >
          <div
            class="col-3"
            v-if="userEntryGroupList && entry.entryGroupType != 'TRANSFER'"
          >
            {{ entry.entryGroup.name }}
          </div>
          <div
            class="col-3"
            v-if="userEntryGroupList && entry.entryGroupType == 'TRANSFER'"
          >
            이체
          </div>
          <div class="col-5" v-if="entry.entryGroupType == 'INCOME'">
            <div>{{ entry.memo }}</div>
            <div>{{ entry.incomeAsset.name }}</div>
          </div>
          <div class="col-5" v-if="entry.entryGroupType == 'EXPENSE'">
            <div>{{ entry.memo }}</div>
            <div>{{ entry.expenseAsset.name }}</div>
          </div>
          <div
            class="col-5 text-break"
            v-if="entry.entryGroupType == 'TRANSFER'"
          >
            {{ entry.expenseAsset.name }} -> {{ entry.incomeAsset.name }}
          </div>
          <div
            class="col-4 text-right"
            :class="
              entry.entryGroupType == 'INCOME'
                ? 'text-primary'
                : entry.entryGroupType == 'EXPENSE'
                ? 'text-danger'
                : ''
            "
          >
            {{ numberWithCommas(entry.amount) }}원
          </div>
        </div>
      </template>
    </b-table>

    <EntryModal
      modalId="addEntryForm"
      :okTitle="$t('bookkeeping.entry.button.create')"
      @handleOk="create"
    />
    <EntryModal
      modalId="updateEntryForm"
      :okTitle="$t('bookkeeping.entry.button.update')"
      :targetEntry="updateEntry"
      @handleOk="update"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import EntryModal from "@/components/Bookkeeping/EntryModal";
import assetMixin from "@/assets/bookkeeping/asset.js";
import entryMixin from "@/assets/bookkeeping/entry.js";
import entryGroupMixin from "@/assets/bookkeeping/entryGroup.js";
import _ from "lodash";

export default {
  mixins: [assetMixin, entryMixin, entryGroupMixin],
  components: {
    EntryModal
  },
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
        startLocalDate: null,
        endLocalDate: null
      },
      updateEntry: {
        entryDate: this.$dayjs().format("YYYY-MM-DD"),
        entryGroupType: "INCOME",
        memo: null,
        amount: 0,
        entryGroup: {},
        incomeAsset: {},
        expenseAsset: {}
      },
      entryList: null,
      entryListForTable: null,
      entryListForTableFields: [
        { key: "entryDate", label: this.$t("bookkeeping.entry.entryDate") },
        { key: "menu", label: this.$t("bookkeeping.entry.menu") }
      ],
      entryGroupList: []
    };
  },
  computed: {
    ...mapState({
      userBookkeeping: state => state.bookkeeping.bookkeeping.userBookkeeping,
      userAssetList: state => state.bookkeeping.asset.userAssetList,
      userEntryGroupList: state =>
        state.bookkeeping.entryGroup.userEntryGroupList,
      userEntryGroupTypeList: state =>
        state.bookkeeping.entryGroupType.userEntryGroupTypeList
    })
  },
  methods: {
    async create(payload) {
      const { bvModalEvt, targetEntry } = payload;
      bvModalEvt.preventDefault();
      var entry = await this.createUserEntry(targetEntry).catch(
        this.commonErrorHandler
      );

      if (entry !== undefined) {
        this.searchEntry();
        this.$root.$emit("bv::hide::modal", "addEntryForm");
      }
    },
    async searchEntry() {
      this.entryList = await this.searchUserEntry(this.entryRequestParam).catch(
        this.commonErrorHandler
      );
      this.entryListForTable = [];
      // 테이블에서 사용할 데이터 세팅 작업..
      // 날짜별로 groupping

      this.entryList.forEach(function(entry) {
        var hasEntryForTable = false;
        this.entryListForTable.forEach(function(entryForTable) {
          if (entry.entryDate == entryForTable.entryDate) {
            hasEntryForTable = true;
            entryForTable.entryList.push(entry);
          }
        });

        if (hasEntryForTable == false) {
          this.entryListForTable.push({
            entryDate: entry.entryDate,
            entryList: [entry],
            _showDetails: true
          });
        }
      }, this);

      this.entryListForTable.sort(function(a, b) {
        return new Date(b.entryDate) - new Date(a.entryDate);
      });
    },

    async update(payload) {
      const { bvModalEvt, targetEntry } = payload;
      bvModalEvt.preventDefault();
      var entry = await this.updateUserEntry(targetEntry)
        .then(data => {
          this.searchEntry();
          return data;
        })
        .catch(this.commonErrorHandler);

      if (entry !== undefined) {
        this.$root.$emit("bv::hide::modal", "updateEntryForm");
      }
    },
    deleteEntry(entry) {},
    initEntryRequestParam() {
      if (this.userBookkeeping.id == null) {
        return;
      }

      // this.userBookkeeping.baseDate

      // this.$dayjs().format("YYYY-MM-DD"),

      // 기준일이 현재의 day보다 이전인 경우 -> 현재 날짜 기준으로 기준일 ~ 다음달 기준일 - 1
      // 기준일이 3일인데 현재가 5일인 경우
      // x월 3일 ~ x + 1 월 3일

      // 기준일이 현재의 day보다 이후인 경우 -> 현재 날짜 기준으로 기준일 ~ 다음달 기준일 - 1
      // x월 기준일이 5일인데 현재가 3일인 경우
      // x-1 월 5일 ~ x월 5일

      if (this.$dayjs().date() < this.userBookkeeping.baseDate) {
        this.entryRequestParam = {
          startLocalDate: this.$dayjs()
            .add(-1, "month")
            .date(this.userBookkeeping.baseDate)
            .format("YYYY-MM-DD"),
          endLocalDate: this.$dayjs()
            .date(this.userBookkeeping.baseDate)
            .add(-1, "day")
            .format("YYYY-MM-DD")
        };
      } else {
        this.entryRequestParam = {
          startLocalDate: this.$dayjs()
            .date(this.userBookkeeping.baseDate)
            .format("YYYY-MM-DD"),
          endLocalDate: this.$dayjs()
            .add(1, "month")
            .date(this.userBookkeeping.baseDate)
            .add(-1, "day")
            .format("YYYY-MM-DD")
        };
      }
    },

    getEntryGroupList(entryGroupType) {
      var target = [];
      for (var key in this.entryGroupList) {
        if (this.entryGroupList[key].entryGroupType == entryGroupType) {
          target.push(this.entryGroupList[key]);
        }
      }
      return target;
    },
    getTotalIncomeAmount() {
      var amount = 0;
      if (this.entryList == null) {
        return amount;
      }
      this.entryList.forEach(entry => {
        if (entry.entryGroupType == "INCOME") {
          amount += entry.amount;
        }
      });
      return amount;
    },
    getTotalExpenseAmount() {
      var amount = 0;
      if (this.entryList == null) {
        return amount;
      }
      this.entryList.forEach(entry => {
        if (entry.entryGroupType == "EXPENSE") {
          amount += entry.amount;
        }
      });
      return amount;
    },
    getTotalAmount() {
      var amount = 0;
      if (this.entryList == null) {
        return amount;
      }
      this.entryList.forEach(entry => {
        if (entry.entryGroupType == "INCOME") {
          amount += entry.amount;
        }
        if (entry.entryGroupType == "EXPENSE") {
          amount -= entry.amount;
        }
      });
      return amount;
    },

    addMonth(addNum) {
      this.entryRequestParam = {
        startLocalDate: this$dayjs(this.entryRequestParam.startLocalDate)
          .add(addNum, "month")
          .format("YYYY-MM-DD"),
        endLocalDate: this.$dayjs(this.entryRequestParam.endLocalDate)
          .add(addNum, "month")
          .format("YYYY-MM-DD")
      };
    },
    onRowClicked(entry) {
      this.updateEntry = _.cloneDeep(entry);
      this.$root.$emit("bv::show::modal", "updateEntryForm");
    }
  },
  created() {},
  mounted() {
    this.getUserEntryGroupList()
      .then(data => {
        this.entryGroupList = data;
      })
      .catch(this.commonErrorHandler);
    this.getUserAssetList().catch(this.commonErrorHandler);
    if (this.userBookkeeping.id == null) {
      return;
    }
    this.initEntryRequestParam();
  },
  watch: {
    // 해당 페이지에서 refresh 로 접근한 경우 userBookkeeping이 처리 된 이후 searchEntry를 검색해야 함
    userBookkeeping() {
      // userBookkeeping 기준으로 최초 검색 처리
      this.initEntryRequestParam();
    },
    entryRequestParam() {
      this.entryList = null;
      this.entryListForTable = null;
      this.searchEntry();
    }
  }
};
</script>

<style></style>
