import Vue from 'vue';
import App from '@/App.ts';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import '@/template';
import '@/common/common.js';
import '@/style/keyframe.css';
import '@/style/media.scss';
import '@/style/en.scss';
import '@/style/font_icon/iconfont.css';
import '@/common/navigate.js';
import i18n from '@/i18n'
Vue.config.productionTip = false;

(window as any).$root = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
