/**
 *  Created by   阿紫
 *  On  2018-12-12
 *  Content
 */

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';


if (location.origin.search('walletapp.alpex') > -1) {
  axios.defaults.baseURL = 'https://wallet.alpex.io/';
  window.justTokenBaseURL = 'https://wallet.alpex.io/';
  window.LocationURL=  "https://walletapp.alpex.io/";
} else {
  axios.defaults.baseURL = 'http://testapi.wallet.alpex.io/';
  window.justTokenBaseURL = 'http://testapi.wallet.alpex.io/';
  window.LocationURL=  "http://walletapp.test.alpex.io/";
}

const httpInstance = axios.create({
  responseType: 'json',
  timeout: 5000000,
  params: {},
  data: {},
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

function responseErrorHandler(error) {
  let text = '未知错误';
  const response = JSON.parse(JSON.stringify(error));
  if (response.status) {
    const { code, msg, result } = response.data;
    text = msg || result;
  } else {
    text = '网络异常 ';
  }

  Vue.$vux.toast.show({
    type: 'warn',
    text: text,
    time: 1000,
  });
}

httpInstance.interceptors.request.use((config) => {
  const configs = config;

  //是否需要传token
  if(config.needToken){
    let token = '';
    if(sessionStorage['walletH5token']){
      token = sessionStorage['walletH5token'];
        configs.data = {
          ...configs.data,
          token:token
        };
        if (config.method === 'post') {
          configs.data.version = '1.0.0';
          configs.data.plat = 'web';
          configs.data = qs.stringify(config.data);
        } else {
          configs.params.version = '1.0.0';
          configs.params.plat = 'web';
          configs.params.token = token;
        }
        return configs;
    }else{
      window.getTokenCallback((nativeToken)=>{
        token = nativeToken;
        configs.data = {
          ...configs.data,
          token:token
        };
        if (config.method === 'post') {
          configs.data.version = '1.0.0';
          configs.data.plat = 'web';
          configs.data = qs.stringify(config.data);
        } else {
          configs.params.version = '1.0.0';
          configs.params.plat = 'web';
          configs.params.token = token;
        }
        return configs;
      })
    }

  }else{
    if (config.method === 'post') {
      configs.data.version = '1.0.0';
      configs.data.plat = 'web';
      configs.data = qs.stringify(config.data);
    } else {
      configs.params.version = '1.0.0';
      configs.params.plat = 'web';
    }
    return configs;
  }
  return configs;
}, error => Promise.reject(error));

httpInstance.interceptors.response.use((response) => {
  const { status, data } = response;
  const { code } = data;
  if (+status === 200) {
    if (+code === 200) {
      return data;
    }
    responseErrorHandler(response);
  }
  return Promise.reject(response);
}, (error) => {
  responseErrorHandler(error);
  return Promise.reject(error);
});

export const $http = {
  get: (url, params = null, config = {}) => {
    const normalizedParams = params;
    return httpInstance.get(url, {
      params: normalizedParams,
      ...config,
    });
  },
  post: (url, data = null, config = {}) => httpInstance.post(url, data, config),
};

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: $http,
      writable: false,
    });
  },
};
