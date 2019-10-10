import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import BlogIndex from "./components/blog/BlogIndex";
import BlogArticleList from "./components/blog/BlogArticleList";
import BlogArticleView from "./components/blog/BlogArticleView";
import BlogArticleWrite from "./components/blog/BlogArticleWrite";
import BlogArticleModify from "./components/blog/BlogArticleModify";
import BookkeepingIndex from "./components/bookkeeping/Index";
import BookkeepingCreate from "./components/bookkeeping/Create";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/blog",
      name: "BlogIndex",
      component: BlogIndex
    },
    {
      path: "/blog/:blogId/list",
      name: "BlogArticleList",
      component: BlogArticleList,
      props: true
    },
    {
      path: "/blog/:blogId/view/:articleId",
      name: "BlogArticleView",
      component: BlogArticleView,
      props: true
    },
    {
      path: "/blog/:blogId/write",
      name: "BlogArticleWrite",
      component: BlogArticleWrite,
      props: true
    },
    {
      path: "/blog/:blogId/modify/:articleId",
      name: "BlogArticleModify",
      component: BlogArticleModify,
      props: true
    },
    {
      path: "/bookkeeping/index",
      name: "BookkeepingIndex",
      component: BookkeepingIndex,
      props: true
    },
    {
      path: "/bookkeeping/create",
      name: "BookkeepingCreate",
      component: BookkeepingCreate,
      props: true
    }
  ]
});
