import Vue from 'vue'
import App from './App.vue'
//加载element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入路由
import router from '@/router/'
//引入moment
import moment from 'moment'

//创建一个全局的过滤器
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString)
})

//使用element
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂在路由
  router
}).$mount('#app')
