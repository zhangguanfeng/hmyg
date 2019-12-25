import Axios from 'axios';
import Qs from 'qs';
import Util from '@/common/util';
import Router from '@/router/index';
import {Toast} from 'vant';
import Store from '@/store';

const win = window as any;
win.Axios = Axios;
let isLoginNum = 0;
const HttpInstance = Axios.create({
  baseURL: window.SERVER_PATH,
  responseType: 'json',
  timeout: 60000,
  params: {},
  data: {},
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

interface IHttp {
  get: (url: string, data?: any | {}, config?: any | {}) => Promise<void>;
  post: (url: string, data?: any | {}, config?: any | {}) => Promise<void>;
  instance: any;
}

const http: IHttp = () => void 0;

http.get = (url: string, params: any = {}, config: any = {}): Promise<void> => {
  // params.selfConfig = config;
  return HttpInstance.get(url, {params, ...config});
};
http.post = ( url: string, data: any = {}, config: any = {} ): Promise<void> => {
  return HttpInstance.post(url, data, config);
};

HttpInstance.interceptors.request.use((configs: any): any => {
  // if ( configs.url === 'Home/getApiList' ) {
  //   configs.url = window.SERVER_PATH + configs.url;
  // } else {
  //   configs.url = window.REQUEST_URL + configs.url;
  // }
  const token: string | null = Util.token();
  // configs.headers.token = localStorage.token;
  configs.headers.lang = 'CN';
  configs.headers.wl_no = win.wl_no;
  configs.headers.device_code = win.getAppInfo && win.getAppInfo('device') || 1;
  configs.headers.app_type = win.getAppInfo && win.getAppInfo('type') || 'ios';
  configs.headers.app_version = win.getAppInfo && win.getAppInfo('version') || '1.0.0';
  configs.headers.is_demo_account = localStorage.getItem('cptAppAccount') || '100'; // 100 真实  111 虚拟
  if (token) {
    configs.headers.token = token;
  }
  if (configs.method === 'post') {
    configs.data = Qs.stringify(configs.data);
  }
  // configs.params = Qs.stringify(configs.params);
  // configs.data = typeof configs.data === 'object' && Qs.stringify(configs.data) || configs.data;
  // if (configs.data.selfConfig) {
  //   delete configs.data.selfConfig;
  // }
  // if (configs.params.selfConfig) {
  //   delete configs.params.selfConfig;
  // }
  return configs;
}, (error: any) => {
  Promise.reject(error);
});
HttpInstance.interceptors.response.use((response: any) => {
  const {status, data} = response;
  const {result} = data;
  if (+status === 200) {
    if (+result === 200) {
      isLoginNum = 0;
      return data;
    }
    responseErrorHandler(response);
  }
  return Promise.reject(response);
}, (error) => {
  responseErrorHandler();
  return Promise.reject(error);
});
http.instance = HttpInstance;

function responseErrorHandler(error?: any) {
  if (!error) {
    Toast.fail('请求异常');
    return;
  }
  let text = '未知错误';
  const response = JSON.parse(JSON.stringify(error));
  const {msg, result} = response.data;
  if (response.status) {
    text = msg;
  } else {
    text = '网络异常 ';
  }

  // 登陆状态已过期||session失效!
  if ( result === 402 ) {
    isLoginNum++;
    if (isLoginNum === 1) {
      const obj = {
        title: '',
        name: 'login',
        path: 'login',
      };
      win.openWebView(obj);
    }
    // localStorage.removeItem('mtData');
    // localStorage.removeItem('mtRem');
    // localStorage.removeItem('mtLoginFir');
    win.refreshData( {
      t: '', // token
      d: '', // 模拟账号
      l: '', // 真实账号
      m: '', // 0模拟账号，1真实账号
    } );
  }
  Toast(text);
}

export default http;

export const checkAddr = () => {
  const list: any = Store.state.xhrAddrList;
  if (list.length === 0) {
    setTimeout(() => {
      checkAddr();
    }, 10);
  } else {
    const check = (idx = 0) => {
      const addr = list[idx];
      if (!addr) {
        window.REQUEST_URL = window.SERVER_PATH;
        return;
      } else {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', addr, false);
        xhr.send();
        if (xhr.readyState === 4) {
          window.REQUEST_URL = addr;
          localStorage.setItem('last_xhr_addr', addr);
        } else {
          // 不可用
          check(++idx);
        }
      }
    };
    check();
  }
};
