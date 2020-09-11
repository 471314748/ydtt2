// 导入 axios
import axios from 'axios'
import store from '../store/index'
import JSONbig from 'json-bigint'
import { setLocal } from './mylocal'

// 创建一个 axios 实例
var instance = axios.create({
  // 设置基地址
  // 开发测试接口，生产正式接口
  baseURL: process.env.VUE_APP_URL,
  // 响应前修改数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 处理数字超过16位的精度丢失
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }],
})
// 刷新token请求
var instance1 = axios.create({
  // 设置基地址
  baseURL: 'http://ttapi.research.itcast.cn/',
})
// 给 axios 设置拦截器
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 如果有token加token到请求头
    let token = store.state.userInfo.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  async function (error) {
    // token失效换refresh_token上
    // 错误状态码
    let state = error.response.status
    if (state === 401) {
      let refreshToken = store.state.userInfo.refresh_token
      let res = await instance1({
        url: '/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + refreshToken
        }
      })
      let newToken = res.data.data.token
      let newObj = {
        token: newToken,
        refresh_token: refreshToken
      }
      console.log(newObj)
      store.commit('setUserInfo', newObj)
      setLocal('userInfo', newObj)
      return instance(error.config)
    }
    // return Promise.reject(error)
  }
)

// 导入 axios 对象
export default instance
