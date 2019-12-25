import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        key: '0'
      },
      component: () => import("@/views/login/index")
    },
    {
      path: '/',
      name: 'home',
      meta: {
        key: '1'
      },
      component: () => import("@/views/home"),
      children: [{
        path: '/writeWeekly',
        name: 'writeWeekly',
        meta: {
          key: '1-1'
        },
        component: () => import("@/views/writeWeekly/index")
      }, {
        path: '/weeklyList',
        name: 'weeklyList',
        meta: {
          key: '1-2'
        },
        component: () => import("@/views/weeklyList/index")
      }, {
        path: '/personalInfo',
        name: 'personalInfo',
        meta: {
          key: '1-3'
        },
        component: () => import("@/views/infoManage/personalInfo")
      }]
    }
  ]
})
