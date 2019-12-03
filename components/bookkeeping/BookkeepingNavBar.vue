<template>
  <!-- <div>
    <b-list-group>
      <b-list-group-item active-class="active" to="/bookkeeping/entry/">입력</b-list-group-item>
      <b-list-group-item active-class="active" to="/bookkeeping/statistics/">통계</b-list-group-item>
      <b-list-group-item active-class="active" to="/bookkeeping/asset/">자산</b-list-group-item>
      <b-list-group-item active-class="active" to="/bookkeeping/config/">설정</b-list-group-item>
    </b-list-group>
  </div> -->
  <b-navbar fixed="bottom" type="light" variant="light">
    <div class="row w-100 text-center">
      <div class="col">
        <b-link to="/bookkeeping/entry/"
          ><b-button size="lg" variant="light">
            <font-awesome-icon :icon="['far', 'calendar']" /><br />
            <h6>설정</h6>
          </b-button></b-link
        >
      </div>
      <div class="col">
        <b-link to="/bookkeeping/statistics/">
          <b-button size="lg" variant="light">
            <font-awesome-icon :icon="['fas', 'chart-bar']" /> <br />
            <h6>통계</h6>
          </b-button>
        </b-link>
      </div>
      <div class="col">
        <b-link to="/bookkeeping/asset/"
          ><b-button size="lg" variant="light">
            <font-awesome-icon :icon="['fas', 'columns']" /><br />
            <h6>자산</h6>
          </b-button></b-link
        >
      </div>
      <div class="col">
        <b-link to="/bookkeeping/config/">
          <b-button size="lg" variant="light">
            <font-awesome-icon :icon="['fas', 'cog']" /><br />
            <h6>설정</h6>
          </b-button>
        </b-link>
      </div>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "BookkeepingNavBar",
  computed: {}
};
</script>

<style></style>
