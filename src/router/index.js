import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//解决点击统同一路由时浏览器的错误提示信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//导入组件
const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const UserList = () => import('@/views/userlist/index.vue')
const Roles = () => import('@/views/roles/index.vue')

//创建规则
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/home',
    component: Home,
    name: 'home',
    children: [
      { path: 'users', component: UserList, name: 'userlist' },
      { path: 'roles', component: Roles, name: 'roles' }
    ]
  }
]

//创建路由实例
const router = new VueRouter({
  routes
})

//暴露
export default router
