import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/views/home/homePage.vue'
import Login from '@/components/Login.vue'
// 测试组件
import Test from '@/components/Test.vue'

/* 会员管理 */
// import UserList from '@/components/views/user/UserList.vue'
const UserList = ()=>import('@/components/views/user/UserList.vue')                       //会员列表
const LoginLog = ()=>import('@/components/views/user/LoginLog.vue')                       //登录记录

const TabManage = ()=>import('@/components/views/user/TabManage.vue')                     // 标签管理
const BlackListManage = ()=>import('@/components/views/user/BlackListManage.vue')         // 黑名单管理
const LevelSetting = ()=>import('@/components/views/user/LevelSetting.vue')               // 等级设置
const WashSetting = ()=>import('@/components/views/user/WashSetting.vue')                 // 洗码设置
/* 会员管理 */

/* 财务管理 */
const IncomeReview = ()=>import('@/components/views/funds/IncomeReview.vue')              // 入款审核
const ManualAccess = ()=>import('@/components/views/funds/ManualAccess.vue')              // 人工存取
/* 财务管理 */
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/home',
      component: HomePage
    },

   /* ============================= 会员管理 ==================================*/

    // 会员列表
    {
      path: '/user/userlist',
      component: UserList
    },
    // 登录记录
    {
      path: '/user/loginlog',
      component: LoginLog
    },
    // 标签管理
    {
      path: '/user/tabmanage',
      component: TabManage
    },
    // 黑名单管理
    {
      path: '/user/blacklistmanage',
      component: BlackListManage
    },
    // 等级设置
    {
      path: '/user/levelsetting',
      component: LevelSetting
    },
    // 洗码设置
    {
      path: '/user/washsetting',
      component: WashSetting
    },
    /* ----------------------------------  会员管理 ----------------------*/




   /* ==================================== 财务管理 =========================*/
    // -- 入款审核
   {
    path: '/funds/incomereview',
    component: IncomeReview
    },
   {
    path: '/funds/manualaccess',
    component: ManualAccess
    },


   /* -----------------------------------  财务管理 ------------------------------------*/
  ]
})
