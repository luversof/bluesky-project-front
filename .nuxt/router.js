import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d5bf005e = () => interopDefault(import('..\\pages\\bookkeeping\\index.vue' /* webpackChunkName: "pages_bookkeeping_index" */))
const _24845a05 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages_test" */))
const _36a3c50d = () => interopDefault(import('..\\pages\\bookkeeping\\create.vue' /* webpackChunkName: "pages_bookkeeping_create" */))
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
    name: "bookkeeping___ko"
  }, {
    path: "/test",
    component: _24845a05,
    name: "test___ko"
  }, {
    path: "/bookkeeping/create",
    component: _36a3c50d,
    name: "bookkeeping-create___ko"
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
