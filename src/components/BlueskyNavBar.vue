<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :to="'/'">Bluesky</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="'/blog'">Blog</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="!loginInfo.login">
          <b-form-input class="mr-1" name="username" :placeholder="$t('username')"/>
          <b-form-input class="mr-1" type="password" name="password" :placeholder="$t('password')"/>
          <b-button class="mr-2" type="submit">{{ $t("login") }}</b-button>
          <b-button class="mr-1" href="/oauth2/authorization/google">
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }"/>
          </b-button>
          <b-button class="mr-1" href="/oauth2/authorization/facebook">
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/>
          </b-button>
          <b-button class="mr-1" href="/oauth2/authorization/github">
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }"/>
          </b-button>
          <b-button class="mr-1" href="/oauth2/authorization/battlenet">
            <font-awesome-icon icon="bold"/>
          </b-button>
        </b-nav-form>

        <b-nav-form v-if="loginInfo.login" action="/logout" method="post">
          <b-nav-text class="mr-sm-2">{{ this.$store.state.loginInfo.name }}</b-nav-text>
          <b-button size="sm" type="submit">{{ $t('logout') }}</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BlueskyNavBar",
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    ...mapMutations(["setLoginInfo"])
  },
  mounted: function() {
    var _this = this;
    this.$http.get("/api/user/loginInfo").then(function(response) {
      _this.setLoginInfo(response.data);
    });
  }
};
</script>
