import Vue from 'vue'
import axios from 'axios'
// eslint-disable-next-line
import { Notification } from 'element-ui'
import qs from 'qs'
import router from '@/router'
import store from '../store'
import { token } from '@/common/util'

// eslint-disable-next-line
import { getProperty } from '@/common/util'
// eslint-disable-next-line
let isLoginNum = 0

axios.defaults.baseURL = SERVER_PATH
const httpInstance = axios.create({
  responseType: 'json',
  timeout: 8000,
  params: {},
  data: {},
  headers: {
    lang: 'CN',
    wl_no: window.wlno
  },
  validateStatus(status) {
    return status >= 200 && status < 300
  }
})

function responseErrorHandler(error) {
  const response = JSON.parse(JSON.stringify(error))
  const code = getProperty(response, ['data', 'code'])
  let text = '未知错误'
  if (response.status) {
    const { message, msg } = response.data
    text = message || msg
  } else {
    text = '网络异常 '
  }
  store.commit('updateLoadingStatus', { isLoading: false })
  Notification({
    type: 'error',
    title: '请求错误',
    message: text,
    duration: 5000
  })
}

httpInstance.interceptors.request.use((config) => {
  const session = token()
  if (session && !config.noToken) {
    config.headers.token = session
  }
  store.commit('updateLoadingStatus', { isLoading: true })
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  // 100 真实  111 虚拟
  config.headers.is_demo_account = store.state.cptAccountType;
  // config.headers.is_demo_account = (sessionStorage.getItem('cptAccount') || '').split('-')[0] == '真实账户' ? 100 : 111
  return config
}, error => Promise.reject(error))
httpInstance.interceptors.response.use((response) => {
  const { status, data, config } = response
  const { result, msg } = data
  store.commit('updateLoadingStatus', { isLoading: false })
  if (+status === 200) {
    if (+result === 200) {
      isLoginNum = 0
      return data
    }
    if (+result == 402) { // 未登录或登录超时
      isLoginNum++
      if (isLoginNum === 1) {
        responseErrorHandler(response)
        token( null )
        store.commit( 'updateUserInfo', {} );
        store.commit( 'updateAccount', '' );
        sessionStorage.removeItem('cptInformation')
        sessionStorage.removeItem('cptAccount')
        router.push('/')
      }
      return data
    }
    responseErrorHandler(response)
  }
  return Promise.reject(response)
}, (error) => {
  responseErrorHandler(error)
  store.commit('updateLoadingStatus', { isLoading: false })
  return Promise.reject(error)
})
export const $http = {
  get: (url, params = null, config = {}) => {
    const normalizedParams = params
    return httpInstance.get(url, {
      params: normalizedParams,
      ...config
    })
  },
  post: (url, data = null, config = {}) => httpInstance.post(url, data, config)
}
const Plugin = {}
Plugin.install = function(Vue, options) {
  Object.defineProperty(Vue.prototype, '$http', {
    value: $http,
    writable: false
  })
}
Vue.use(Plugin)
export default Plugin
