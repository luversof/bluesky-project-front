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
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:thead-top="row">
        <b-tr>
          <b-th colspan="2" class="text-center" sticky-column>
            <div class="row">
              <div class="col" @click="addMonth(-1)">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
              </div>
              <div>
                {{ entryRequestParam.startLocalDate }} ~
                {{ entryRequestParam.endLocalDate }}
              </div>
              <div class="col" @click="addMonth(1)">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </div>
            </div>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th colspan="2" sticky-column>
            <div class="row text-center">
              <div class="col px-0">
                <div>수입</div>
                <div class="text-primary">
                  {{ numberWithCommas(getTotalIncomeAmount()) }}원
                </div>
              </div>
              <div class="col px-0">
                <div>지출</div>
                <div class="text-danger">
                  {{ numberWithCommas(getTotalExpenseAmount()) }}원
                </div>
              </div>
              <div class="col px-0">
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
        <h2>{{ getDay(row.item.entryDate) }}</h2>
      </template>

      <template v-slot:cell(menu)="row"></template>

      <template v-slot:row-details="row">
        <div
          class="row no-gutters"
          v-for="entry in row.item.entryList"
          v-bind:key="entry.id"
        >
          <div class="w-100 border-top"></div>
          <!-- <div class="col-2 px-0">
              {{ $t("bookkeeping.entryGroupType." + entry.entryGroupType) }}
            </div> -->
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
          <div class="col-5 px-0" v-if="entry.entryGroupType == 'INCOME'">
            <div>{{ entry.memo }}</div>
            <div>{{ entry.incomeAsset.name }}</div>
          </div>
          <div class="col-5 px-0" v-if="entry.entryGroupType == 'EXPENSE'">
            <div>{{ entry.memo }}</div>
            <div>{{ entry.expenseAsset.name }}</div>
          </div>
          <div
            class="col-5 px-0 text-break"
            v-if="entry.entryGroupType == 'TRANSFER'"
          >
            {{ entry.expenseAsset.name }} -> {{ entry.incomeAsset.name }}
          </div>
          <div
            class="col-4 px-0 text-right"
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
      </b-form-group>
    </b-modal>

    <br />
    <b-table
      hover
      :items="entryList"
      :fields="fields"
      :busy="entryList == null"
      empty-text="userEntryList is empty"
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
          <b-th colspan="8">
            <b-button variant="outline-secondary" @click="addMonth(-1)">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </b-button>
            {{ entryRequestParam.startLocalDate }} ~
            {{ entryRequestParam.endLocalDate }}
            <b-button variant="outline-secondary" @click="addMonth(1)">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </b-button>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th colspan="8">
            수입 :
            <span class="text-primary"
              >{{ numberWithCommas(getTotalIncomeAmount()) }}원</span
            >
            , 지출 :
            <span class="text-danger"
              >{{ numberWithCommas(getTotalExpenseAmount()) }}원</span
            >
            , 합계 :
            <span class="text-secondary"
              >{{ numberWithCommas(getTotalAmount()) }}원</span
            >
          </b-th>
        </b-tr>
      </template>

      <template v-if="showAddEntryForm" v-slot:top-row="row">
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
          <b-form-input v-model="addEntry.memo" />
        </b-th>
        <b-th>
          <b-button variant="outline-secondary" @click="create">
            {{ $t("bookkeeping.entry.button.create") }}
          </b-button>
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
          v-if="row.item.entryGroupType != 'EXPENSE'"
          :value="row.item.incomeAsset && row.item.incomeAsset.id"
          :options="userAssetList"
          text-field="name"
          value-field="id"
        />
      </template>

      <template v-slot:cell(expenseAsset)="row">
        <b-form-select
          v-if="row.item.entryGroupType != 'INCOME'"
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
        <b-button variant="outline-secondary" @click="update(row.item)">{{
          $t("bookkeeping.entry.button.update")
        }}</b-button>
        <b-button variant="outline-secondary" @click="deleteEntry(row.item)">
          {{ $t("bookkeeping.entry.button.delete") }}
        </b-button>
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
        startLocalDate: null,
        endLocalDate: null
      },
      entryList: null,
      entryListForTable: null,
      entryListForTableFields: [
        { key: "entryDate", label: this.$t("bookkeeping.entry.entryDate") },
        { key: "menu", label: this.$t("bookkeeping.entry.menu") }
      ],
      entryGroupList: [],
      addEntry: null,
      showAddEntryForm: false
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
    searchEntry: function() {
      this.searchUserEntry(this.entryRequestParam)
        .then(data => {
          this.entryList = data;
          this.entryListForTable = [];
          // 테이블에서 사용할 데이터 세팅 작업..
          // 날짜별로 묶어서 다시 처리해야하는데
          for (var i = 0; i < this.entryList.length; i++) {
            var targetEntry = this.entryList[i];
            var hasTargetEntryForTable = false;
            for (var j = 0; j < this.entryListForTable.length; j++) {
              var targetEntryForTable = this.entryListForTable[j];
              if (targetEntry.entryDate == targetEntryForTable.entryDate) {
                hasTargetEntryForTable = true;
                targetEntryForTable.entryList.push(targetEntry);
              }
            }
            if (hasTargetEntryForTable == false) {
              this.entryListForTable.push({
                entryDate: targetEntry.entryDate,
                _showDetails: true,
                entryList: [targetEntry]
              });
            }
          }
        })
        .catch(this.commonErrorHandler);
    },
    resetAddEntry: function() {
      this.addEntry = {
        entryDate: this.$moment().format("YYYY-MM-DD"),
        entryGroupType: "INCOME",
        memo: null,
        amount: 0,
        entryGroup: {},
        incomeAsset: {},
        expenseAsset: {}
      };
    },
    toggleAddEntryForm: function(event) {
      this.showAddEntryForm = !this.showAddEntryForm;
    },
    setAddEntryGroupType: function(entryGroupType) {
      this.addEntry.entryGroupType = entryGroupType;
    },
    create: async function(bvModalEvt) {
      bvModalEvt.preventDefault();
      var entry = await this.createUserEntry(this.addEntry)
        .then(data => {
          this.searchEntry();
          return data;
        })
        .catch(this.commonErrorHandler);

      if (entry == undefined) {
        bvModalEvt.preventDefault();
      } else {
        this.$root.$emit("bv::hide::modal", "addEntryForm");
      }
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
    getTotalIncomeAmount: function() {
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
    getTotalExpenseAmount: function() {
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
    getTotalAmount: function() {
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
    update: function(entry) {},
    deleteEntry: function(entry) {},
    initEntryRequestParam: function() {
      if (this.userBookkeeping.id == null) {
        return;
      }

      // this.userBookkeeping.baseDate

      // this.$moment().format("YYYY-MM-DD"),

      // 기준일이 현재의 day보다 이전인 경우 -> 현재 날짜 기준으로 기준일 ~ 다음달 기준일 - 1
      // 기준일이 3일인데 현재가 5일인 경우
      // x월 3일 ~ x + 1 월 3일

      // 기준일이 현재의 day보다 이후인 경우 -> 현재 날짜 기준으로 기준일 ~ 다음달 기준일 - 1
      // x월 기준일이 5일인데 현재가 3일인 경우
      // x-1 월 5일 ~ x월 5일

      if (this.$moment().date() < this.userBookkeeping.baseDate) {
        this.entryRequestParam = {
          startLocalDate: this.$moment()
            .add(-1, "month")
            .date(this.userBookkeeping.baseDate)
            .format("YYYY-MM-DD"),
          endLocalDate: this.$moment()
            .date(this.userBookkeeping.baseDate)
            .add(-1, "day")
            .format("YYYY-MM-DD")
        };
      } else {
        this.entryRequestParam = {
          startLocalDate: this.$moment()
            .date(this.userBookkeeping.baseDate)
            .format("YYYY-MM-DD"),
          endLocalDate: this.$moment()
            .add(1, "month")
            .date(this.userBookkeeping.baseDate)
            .add(-1, "day")
            .format("YYYY-MM-DD")
        };
      }
    },
    addMonth: function(addNum) {
      this.entryRequestParam = {
        startLocalDate: this.$moment(this.entryRequestParam.startLocalDate)
          .add(addNum, "month")
          .format("YYYY-MM-DD"),
        endLocalDate: this.$moment(this.entryRequestParam.endLocalDate)
          .add(addNum, "month")
          .format("YYYY-MM-DD")
      };
    },
    getDay: function(date) {
      return this.$moment(date).format("DD");
    }
  },
  created: function() {
    this.resetAddEntry();
  },
  mounted: function() {
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
