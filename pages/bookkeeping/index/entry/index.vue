<template>
  <div>
    <b-table striped hover :items="entryList" empty-text="userEntryList is empty"></b-table>
    <p @click="search">테스트</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import entryMixin from "~/assets/bookkeeping/entry.js";

export default {
  mixins: [entryMixin],
  data() {
    return {
      entryRequestParam: {
        startZonedDateTime: "2019-08-08T10:01:03.000Z",
        endZonedDateTime: "2020-08-08T10:01:03.000Z"
      },
      entryList: []
    };
  },
  methods: {
    search: async function() {
      var a = await this.searchUserEntry(this.entryRequestParam).catch(
        this.commonErrorHandler
      );
      console.log("TEST", a);
    }
  }
};
</script>

<style>
</style>