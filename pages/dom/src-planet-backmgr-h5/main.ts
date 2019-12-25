import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Util from '@/common/util';
import Http from '@/common/http';
import './registerServiceWorker';
import Vant, { Collapse } from 'vant';
import 'vant/lib/index.css';
import Calendar from 'vue-mobile-calendar'
// import Vuetable from 'vuetable-2';
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import '@/style/base.scss';
// import VConsole from 'vconsole';
// new VConsole();
Vue.use(VXETable)

Vue.use(Calendar)
Vue.use(Vant);
Vue.config.productionTip = false;

// component('Vuetable', Vuetable);
install('$util', Util)
  ('$http', Http)
  ('$post', Http.post)
  ('$get', Http.get);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

function install(name: string, value: any) {
  Object.defineProperty(Vue.prototype, name, {
    value: value,
    writable: false,
    configurable: false,
  });
  return install;
}
function component(name: string, tpl: any) {
  Vue.component(name, tpl);
  return component;
}