import Vue from 'vue'
import Router from 'vue-router'
import adminIndex from '@/components/app-view'
import Login from '@/views/login'
import panelIndex from '@/views/admin/dashboard'
import Images from '@/views/admin/images'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: adminIndex,
      children: [
        { path: '', component: panelIndex, meta: { icon: 'fa fa-dashboard', label: 'Dashboard' } },
        { path: '/images', component: Images, meta: { icon: 'fa fa-dashboard', label: 'Dashboard' } },
      ]
    },
    
  ]
})
