import Axios from 'axios';
import Qs from 'qs';
import Router from '@/router';

import Util from '@/common/util';
const instance = Axios.create( {
  baseURL: window.SERVER_PATH,
  headers: {},
} )
interface IHttp {
  post: ( url: string, data?: {[key: string]: any} , config?: {[key: string]: any} ) => Promise<any>;
  get: ( url: string, data?: { [key: string]: any }, config?: { [key: string]: any } ) => Promise<any>;
}
const http: IHttp = () => {
  return instance;
}
http.post = ( url: string, data: any = {}, config: any = {} ) => {
  if ( Util.type( data ) !== 'formdata' ) {
    data = Qs.stringify( data )
  }
  return instance.post( url, data, config );
}
http.get = ( url: string = '', params: any = {}, config: any = {} ) => {
  return instance.get( url, { params, ...config } );
}
instance.interceptors.request.use( ( configs: any ) => {
  const token = Util.token();
  if (!token) {
    if (Router.currentRoute.name !== 'login') {
      Router.replace('/login');
    }
  } else {
    configs.headers.token = token;
  }
  return configs;
} )
instance.interceptors.response.use( ( response: any ) => {
  return response.data;
} )
export default http;
