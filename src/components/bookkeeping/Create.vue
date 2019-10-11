<template>
  <div>
    생성하기
    <b-form @submit="create" @reset="reset">
      <b-form-group label="name" label-cols-sm="4" label-cols-lg="3">
        <b-form-input id="name" v-model="bookkeeping.name" />
      </b-form-group>
      <b-form-group label="baseDate">
        <b-form-input id="name" v-model="bookkeeping.baseDate" />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookkeeping: { name: "", baseDate: "" }
    };
  },
  methods: {
    create: function() {
      console.log("test bookkeeping : ", this.bookkeeping);
    },
    reset: function() {
      this.bookkeeping.name = "";
      this.bookkeeping.baseDate = 1;
    }
  }
};
</script>

<style>
</style>