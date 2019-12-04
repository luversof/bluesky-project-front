<template>
  <b-navbar sticky toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">Bluesky</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item active-class="active" to="/blog">Blog</b-nav-item>
        <b-nav-item active-class="active" to="/bookkeeping/"
          >Bookkeeping</b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button
          variant="outline-secondary"
          v-if="!isLoginInfoLoaded"
          class="mr-1"
          disabled
        >
          <b-spinner small class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </b-button>

        <b-nav-form v-if="isLoginInfoLoaded && !loginInfo.login">
          <b-form-input
            class="mr-1"
            name="username"
            :placeholder="$t('username')"
          />
          <b-form-input
            class="mr-1"
            type="password"
            name="password"
            :placeholder="$t('password')"
          />
          <b-button variant="outline-secondary" class="mr-2" type="submit">{{
            $t("login")
          }}</b-button>
          <b-button
            variant="outline-secondary"
            class="mr-1"
            href="/oauth2/authorization/google"
          >
            <font-awesome-icon :icon="['fab', 'google']" />
          </b-button>
          <b-button
            variant="outline-secondary"
            class="mr-1"
            href="/oauth2/authorization/facebook"
          >
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </b-button>
          <b-button
            variant="outline-secondary"
            class="mr-1"
            href="/oauth2/authorization/github"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
          </b-button>
          <b-button
            variant="outline-secondary"
            class="mr-1"
            href="/oauth2/authorization/battlenet"
          >
            <font-awesome-icon icon="bold" />
          </b-button>
        </b-nav-form>

        <b-nav-form
          v-if="isLoginInfoLoaded && loginInfo.login"
          action="/logout"
          method="post"
        >
          <b-nav-text class="mr-sm-2">{{ loginInfo.name }}</b-nav-text>
          <b-button variant="outline-secondary" size="sm" type="submit">{{
            $t("logout")
          }}</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import loginInfoMixin from "@/assets/loginInfo.js";

export default {
  name: "BlueskyNavBar",
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo,
      isLoginInfoLoaded: state => state.loginInfo.isLoginInfoLoaded
    })
  },
  mixins: [loginInfoMixin],
  methods: {
    ...mapMutations({
      setLoginInfo: "loginInfo/setLoginInfo"
    })
  },
  mounted: function() {
    this.getLoginInfo();
  }
};
</script>
