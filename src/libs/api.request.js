import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// import store from '../store'
// import { getToken } from '@/libs/util'
//
// console.log(process.env.BASE_API)
//
// // 创建axios实例
// const service = axios.create({
//   baseURL: baseUrl, // api的base_url
//   timeout: 15000 // 请求超时时间
// })
//
// // request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     config.token = getToken()
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

const axios = new HttpRequest(baseUrl)
export default axios

// export default service
