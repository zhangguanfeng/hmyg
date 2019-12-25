import Vue from 'vue';
import '@/common/native';
import router from './router/index';
import store from './store';
import Vant from 'vant';
import Util from '@/common/util';
import Http from '@/common/axios';
import App from './App';
import i18n from './language/i18n';
import 'vant/lib/index.css';
import '@/styles/base.scss';
import './registerServiceWorker';
import './common/components';
import clipboard from 'clipboard';
// import Vconsole from 'vconsole';
Vue.prototype.clipboard = clipboard;

(window as any).Util = Util;

// ( window as any ).DEV = process.env.NODE_ENV === 'development';

Vue.config.productionTip = false;
// if ( !/localhost|127\.0\.0\.1/.test( window.location.href ) ) {
//   const console = new Vconsole();
// }
Vue.use( Vant );
Object.defineProperty( Vue.prototype, '$util', {
  value: Util,
  writable: false,
  configurable: false,
} );

Object.defineProperty( Vue.prototype, '$http', {
  value: Http,
  writable: false,
  configurable: false,
} );

(window as any).$root = new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');
