import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/mainPage').default
    },
    {
      path: '/about',
      name: 'about-page',
      component: require('@/components/aboutPage').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/settings').default
    },
    {
      path: '/editor',
      name: 'editor',
      component: require('@/components/editor').default
    },
    {
      path: '/search',
      name: 'search',
      component: require('@/components/search').default
    },
    {
      path: '/tags',
      name: 'search',
      component: require('@/components/tags').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
