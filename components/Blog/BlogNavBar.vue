<template>
  <!-- <div>
    <b-list-group>
      <b-list-group-item active-class="active" to="/blog/entry/">입력</b-list-group-item>
      <b-list-group-item active-class="active" to="/blog/statistics/">통계</b-list-group-item>
      <b-list-group-item active-class="active" to="/blog/asset/">자산</b-list-group-item>
      <b-list-group-item active-class="active" to="/blog/config/">설정</b-list-group-item>
    </b-list-group>
  </div> -->
  <b-navbar fixed="bottom">
    <b-button-group class="col-12">
      <b-button
        size="lg"
        variant="light"
        active-class="active"
        :to="'/blog/' + userBlog.id + '/list'"
      >
        <font-awesome-icon :icon="['far', 'calendar']" /><br />
        <h6>보기</h6>
      </b-button>
      <b-button
        size="lg"
        variant="light"
        active-class="active"
        to="/blog/statistics/"
      >
        <font-awesome-icon :icon="['fas', 'chart-bar']" /> <br />
        <h6>통계</h6>
      </b-button>
      <b-button
        size="lg"
        variant="light"
        active-class="active"
        to="/blog/asset/"
      >
        <font-awesome-icon :icon="['fas', 'columns']" /><br />
        <h6>자산</h6>
      </b-button>
      <b-button
        size="lg"
        variant="light"
        active-class="active"
        to="/blog/config/"
      >
        <font-awesome-icon :icon="['fas', 'cog']" /><br />
        <h6>설정</h6>
      </b-button>
    </b-button-group>
  </b-navbar>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";

export default {
  name: "BlogNavBar",
  mixins: [blogMixin],
  computed: {},
  mounted: function() {
    console.log("ASDFSADF", this.userBlog);
  }
};
</script>

<style></style>
