// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

import axios from 'axios'

import VueI18n from 'vue-i18n'

import VueMoment from 'vue-moment'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import DefaultLayout from './layout/DefaultLayout'

Vue.prototype.$http = axios

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ko',
  messages: require('./message/message.json')
})
export default i18n

const moment = require('moment')
require('moment/locale/ko')
Vue.use(VueMoment, { moment })

Vue.use(BootstrapVue)

library.add(fas, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n: i18n,
  components: { DefaultLayout },
  template: '<DefaultLayout/>',
  mounted: function () {
    console.log('test ', this)
    // this.$moment.locale('ko')
  }
})
