import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import( '../views/Manage.vue'),
    redirect:"/home",
    children:[
      {path:'home', name:'首页',component: () => import( '../views/Home.vue')},
      {path:'mallPayLog', name:'支付记录',component: () => import( '../views/MallPayLog.vue')},
      {path:'mallOrderGoods', name:'订单商品',component: () => import( '../views/MallOrderGoods')},
      {path:'mallRefundTrace', name:'退款跟踪',component: () => import( '../views/MallRefundTrace.vue')},
      {path:'mallSearchHistory', name:'搜索历史',component: () => import( '../views/MallSearchHistory.vue')},
      {path:'mallTopic', name:'专题列表',component: () => import( '../views/MallTopic.vue')},
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) =>{
  localStorage.setItem("currentPathName",to.name) //设置当前的路由名称，为了在header组件中使用
  store.commit("setPath")  //触发store的数据更新
  next()  //放行路由
})

export default router
