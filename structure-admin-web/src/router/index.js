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
          key: '7-2'
        },
        component: () => import("@/views/weeklyList/index")
      }, {
        path: '/profile',
        name: 'profile',
        meta: {
          key: '7-4'
        },
        component: () => import("@/views/infoManage/profile")
      }, {
        path: '/courseApplication',
        name: 'courseApplication',
        meta: {
          key: '1-1'
        },
        component: () => import('@/views/trainManage/courseApplication')
      }, {
        path:'/courseArrange',
        name: 'courseArrange',
        meta: {
          key: '1-2'
        },
        component: () => import('@/views/trainManage/courseArrange')
      }, {
        path: '/personPlan',
        name: 'personPlan',
        meta: {
          key: '1-3'
        },
        component: () => import('@/views/trainManage/personPlan')
      }, {
        path: '/lecturerPlan',
        name: 'lecturerPlan',
        meta: {
          key: '1-4'
        },
        component: () => import('@/views/trainManage/lecturerPlan')
      }, {
        path: '/checkCourse',
        name: 'checkCourse',
        meta: {
          key: '1-5'
        },
        component: () => import('@/views/trainManage/checkCourse')
      }, {
        path: '/myCourseArrange',
        name: 'myCourseArrange',
        meta: {
          key: '1-6'
        },
        component: () => import('@/views/trainManage/myCourseArrange')
      }, {
        path: '/addEvaluate',
        name: 'addEvaluate',
        meta: {
          key: '2-1'
        },
        component: () => import('@/views/evaluateManage/addEvaluate')
      }, {
        path: '/checkEvaluate',
        name: 'checkEvaluate',
        meta: {
          key: '2-2'
        },
        component: () => import('@/views/evaluateManage/checkEvaluate')
      }, {
        path: '/examine',
        name: 'examine',
        meta: {
          key: '2-3'
        },
        component: () => import('@/views/evaluateManage/examine')
      }, {
        path: '/checkResult',
        name: 'checkResult',
        meta: {
          key: '2-4'
        },
        component: () => import('@/views/evaluateManage/checkResult')
      }, {
        path: '/lecturerEvaluate',
        name: 'lecturerEvaluate',
        meta: {
          key: '2-5'
        },
        component: () => import('@/views/evaluateManage/lecturerEvaluate')
      }, {
        path: '/checkAllResult',
        name: 'checkAllResult',
        meta: {
          key: '2-6'
        },
        component: () => import('@/views/evaluateManage/checkAllResult')
      }, {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          key: '3-1'
        },
        component: () => import('@/views/infoManage/userInfo')
      },{
        path: '/privilegeManage',
        name: 'privilegeManage',
        meta: {
          key: '3-2'
        },
        component: () => import('@/views/infoManage/privilegeManage')
      }, {
        path: '/roleManage',
        name: 'roleManage',
        meta: {
          key: '3-3'
        },
        component: () => import('@/views/infoManage/roleManage')
      }, {
        path: '/menuManage',
        name: 'menuManage',
        meta: {
          key: '3-4'
        },
        component: () => import('@/views/infoManage/menuManage')
      }, {
        path: '/fileManage',
        name: 'fileManage',
        meta: {
          key: '4_1'
        },
        component: () => import('@/views/files/fileManage')
      }]
    }
  ]
})
