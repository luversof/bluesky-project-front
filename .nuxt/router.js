import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d5bf005e = () => interopDefault(import('..\\pages\\bookkeeping\\index.vue' /* webpackChunkName: "pages_bookkeeping_index" */))
const _256ad0de = () => interopDefault(import('..\\pages\\bookkeeping\\index\\index.vue' /* webpackChunkName: "pages_bookkeeping_index_index" */))
const _3086b21a = () => interopDefault(import('..\\pages\\bookkeeping\\index\\asset\\index.vue' /* webpackChunkName: "pages_bookkeeping_index_asset_index" */))
const _78a016da = () => interopDefault(import('..\\pages\\bookkeeping\\index\\config.vue' /* webpackChunkName: "pages_bookkeeping_index_config" */))
const _5e56b6e2 = () => interopDefault(import('..\\pages\\bookkeeping\\index\\config\\index.vue' /* webpackChunkName: "pages_bookkeeping_index_config_index" */))
const _5c8f379e = () => interopDefault(import('..\\pages\\bookkeeping\\index\\entry\\index.vue' /* webpackChunkName: "pages_bookkeeping_index_entry_index" */))
const _425e7518 = () => interopDefault(import('..\\pages\\bookkeeping\\index\\statistics.vue' /* webpackChunkName: "pages_bookkeeping_index_statistics" */))
const _3312448e = () => interopDefault(import('..\\pages\\bookkeeping\\index\\statistics\\index.vue' /* webpackChunkName: "pages_bookkeeping_index_statistics_index" */))
const _24845a05 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages_test" */))
const _36a3c50d = () => interopDefault(import('..\\pages\\bookkeeping\\create.vue' /* webpackChunkName: "pages_bookkeeping_create" */))
const _5938a34c = () => interopDefault(import('..\\pages\\bookkeeping\\update.vue' /* webpackChunkName: "pages_bookkeeping_update" */))
const _f646bc22 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bookkeeping",
    component: _d5bf005e,
    children: [{
      path: "",
      component: _256ad0de,
      name: "bookkeeping-index___ko"
    }, {
      path: "asset",
      component: _3086b21a,
      name: "bookkeeping-index-asset___ko"
    }, {
      path: "config",
      component: _78a016da,
      children: [{
        path: "",
        component: _5e56b6e2,
        name: "bookkeeping-index-config___ko"
      }]
    }, {
      path: "entry",
      component: _5c8f379e,
      name: "bookkeeping-index-entry___ko"
    }, {
      path: "statistics",
      component: _425e7518,
      children: [{
        path: "",
        component: _3312448e,
        name: "bookkeeping-index-statistics___ko"
      }]
    }]
  }, {
    path: "/test",
    component: _24845a05,
    name: "test___ko"
  }, {
    path: "/bookkeeping/create",
    component: _36a3c50d,
    name: "bookkeeping-create___ko"
  }, {
    path: "/bookkeeping/update",
    component: _5938a34c,
    name: "bookkeeping-update___ko"
  }, {
    path: "/",
    component: _f646bc22,
    name: "index___ko"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
