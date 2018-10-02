import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogIndex from '@/components/blog/BlogIndex'
import BlogList from '@/components/blog/BlogList'
import BlogView from '@/components/blog/BlogView'

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
      path: '/blog/:id/list',
      name: 'BlogList',
      component: BlogList
    },
    {
      path: '/blog/:id/view/:articleId',
      name: 'BlogView',
      component: BlogView
    }
  ]
})
