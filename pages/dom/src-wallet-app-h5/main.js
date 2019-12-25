/*
 * @Author: your name
 * @Date: 2019-12-16 10:40:08
 * @LastEditTime : 2019-12-24 17:57:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wallet-app-h5\src\main.js
 */
import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import Http from './common/http';
import Http2 from './common/http2';
import TabCarousel from 'vue-tab-carousel'
// import vConsole from './common/vconsole';
Vue.use(TabCarousel)

Vue.config.productionTip = false;

Vue.use(Http);
Vue.use(Http2);
// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

window.$root = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
