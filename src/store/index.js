import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import loginInfo from "./modules/loginInfo";
import blog from "./modules/blog";
//import plugins from "./plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations,
  //plugins
  modules: {
    loginInfo,
    blog
  }
});
