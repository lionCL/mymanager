import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入组件
const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')

//创建规则
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/home', component: Home, name: 'home' }
]

//创建路由实例
const router = new VueRouter({
  routes
})

//暴露
export default router
