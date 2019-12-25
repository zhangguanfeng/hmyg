import Vue from 'vue';
import axios from 'axios'
import {Notification} from 'element-ui'
import router from '../router/index.js'
import Config from './config.js'
import qs from 'qs'

import { tokenHandler } from './util'

Vue.prototype.axios = axios;
axios.defaults.baseURL = window.SERVER_PATH

const httpInstance = axios.create({
    responseType: 'json',
    timeout: 50000,
    params: {},
    data: {},
})

function responseErrorHandler(error) {
    let text = '未知错误'
    const response = JSON.parse(JSON.stringify(error))
    if (response.status) {
        const {msg, code} = response.data
        if (+code == 401) {
            text = '登录失效，重新登录'
            token('token', null)
            router.push({name: 'Login'})
        } else {
            text = msg
        }
    } else {
        text = '网络异常 '
    }
    if(error.config.url.indexOf('/wallet/api/queryAdvStatus')>-1||error.config.url.indexOf('/wallet/api/apiRushOrder')>-1){return}
    Notification({
        type: 'error',
        title: '请求失败',
        message: text,
        duration: 5000,
    })
}
/**
 * Axios 请求拦截
 */
httpInstance.interceptors.request.use((config) => {
    const configs = config
    const token = tokenHandler('token')
    // if (token) {
    //     config.headers.token = token
    // }
    config.headers.token = token
    config.headers['lang'] = 'cn'
    config.headers['wl_no'] = 'Alphapay'

    const obj = {
        _t:new Date().getTime()
    };
    Object.entries(config.data)
    .forEach(([key, value]) => {
      if (value || value === '0' || value === 0 || value == 'empty') {
        obj[key] = value == 'empty' ? '' : value;
      }
    });
    config.data = obj;
    if (config.method === 'post') {
        configs.data = qs.stringify(config.data);
    } else {
    configs.params = {
            _t:new Date().getTime(),
            ...configs.params
        }
    }

    return configs
}, error => Promise.reject(error))
/**
 * Axios 响应拦截
 */
httpInstance.interceptors.response.use((response) => {
    if(response.data.code !== 200) {
        if(response.data.code === 40008) {
            localStorage.clear()
            router.replace('/login')
        }
        responseErrorHandler(response)
        return Promise.reject(response.data)
    }
    return response.data
}, (error) => {
    responseErrorHandler(error)
    return Promise.reject(error)
})

export const $http = {
    get: (url, params = null, config = {}) => {
        const normalizedParams = params
        return httpInstance.get(url, {
            params: normalizedParams,
            ...config,
        })
    },
    post: (url, data = null, config = {}) => {
        const p = httpInstance.post(url, data, config)
        return p
	},
	postFormData: (url, data = null, config = {}) => {
		data = qs.stringify(data)
        const p = httpInstance.post(url, data, config)
        return p
	}
}

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', {
            value: $http,
            writable: false,
        })
    },
}
