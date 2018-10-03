import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogIndex from '@/components/blog/BlogIndex'
import BlogArticleList from '@/components/blog/BlogArticleList'
import BlogArticleView from '@/components/blog/BlogArticleView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/blog',
      name: 'BlogIndex',
      component: BlogIndex
    },
    {
      path: '/blog/:blogId/list',
      name: 'BlogArticleList',
      component: BlogArticleList,
      props: true
    },
    {
      path: '/blog/:blogId/view/:articleId',
      name: 'BlogArticleView',
      component: BlogArticleView,
      props: true
    }
  ]
})
