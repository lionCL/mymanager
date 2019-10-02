import axios from 'axios'

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
    return Promise.reject(error)
  }
)

//暴露请求
export default instance
