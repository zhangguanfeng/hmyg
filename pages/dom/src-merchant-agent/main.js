import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Http from './common/http';
import VueClipboard from 'vue-clipboard2'

import './plugins/element.js';
import './plugins/components.js';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import '../public/css/theme-green/index.css';       // 浅绿色主题
import '../public/css/icon.css';
import Config from './common/config'

Vue.use({
  install () {
    return Object.defineProperty(Vue.prototype, '$config', {
      value: Config,
      writable: false
    })
  }
})
Vue.use(Http);
Vue.use(Viewer);
Vue.use(VueClipboard)

Vue.prototype.$window = window
//import './mock/index.js'
Vue.config.productionTip = false

window.$vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
