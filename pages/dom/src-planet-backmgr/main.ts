import Vue, { CreateElement } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './component';
// 6D445232-0432-4F90-9FBC-DDCF355AC862
Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  render: (h: CreateElement) => h( App )
} ).$mount( '#app' );
