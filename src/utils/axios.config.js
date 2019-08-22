import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(function (config) {
  let userInfo = window.localStorage.getItem('user-info')
  let token = userInfo ? JSON.parse(userInfo).token : null
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  let Code = error.response ? error.response.status : ''
  let message = ''
  switch (Code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证'
      break

    case 507:
      message = '服务器数据库异常'
      break

    case 404:
      message = '手机号码不正确'
      break

    case 401:
      message = 'token过期或未传'
      window.localStorage.clear() // 只清除本项目的缓存
      window.location.hash = '#/login' // 跳转到登录页
      break

    default:
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise(function () {})
})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  return Promise.reject(error)
})
export default axios
