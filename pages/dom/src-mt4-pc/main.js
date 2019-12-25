/*
 * @Autor: Diskfan
 * @Date: 2019-09-07 18:36:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-16 10:08:26
 * @Description: 
 */
import Vue from 'vue';
import Viewer from 'v-viewer';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import './plugins/axios';
import './plugins/components';
import './common/util';
import i18n from './i18n';
// import 'babel-polyfill';

import 'viewerjs/dist/viewer.css';
import './plugins/socket';

const VueLazyload = require('@/plugins/vue-lazyload');

Vue.config.productionTip = false;
Vue.use(Viewer);
Vue.use(VueLazyload);


window.$root = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
