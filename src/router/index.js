import Vue from 'vue'
import Router from 'vue-router'
import AppView from '@/components/app-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: AppView
    }
  ]
})
