import axios from 'axios'
import Vue from 'vue'
import router from '@/router'

//创建一个axios实例对象
const instance = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

//设置响应拦截
instance.interceptors.response.use(
  response => {
    //对响应的内容进行过滤只显示data数据
    return response.data
  },
  error => {
    if (error.response.data.meta.status === 401) {
      Vue.prototype.$message.error('token过期或无效,请重新登录')
      //跳转到登录页面
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

//设置请求拦截
instance.interceptors.request.use(
  config => {
    //当前不是登录的时候添加token
    if (config.url !== '/login') {
      config.headers.Authorization = window.localStorage.getItem('token')
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

//暴露请求
export default instance
