// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import DefaultLayout from './layout/DefaultLayout'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.prototype.$http = axios

const moment = require('moment')
require('moment/locale/ko')
Vue.use(require('vue-moment'), {
  moment
})

console.log(Vue.moment().locale())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { DefaultLayout },
  template: '<DefaultLayout/>',
  mounted: function () {
    // this.$moment.locale('ko')
  }
})
