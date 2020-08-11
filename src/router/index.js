import Vue from 'vue'
import Router from 'vue-router'
import AppView from '@/components/app-view'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: AppView
    },
    {
      path: '/login',
      component: Login
    },
  ]
})
