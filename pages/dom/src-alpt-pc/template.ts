import Vue from 'vue';
import AlHeader from '@/components/al-header.vue';
import Util from '@/common/util';
import VueLazyload from 'vue-lazyload';
import AlFooter from '@/components/al-footer.vue';
Vue.use( VueLazyload );
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use( VueAwesomeSwiper );
// require styles
import 'swiper/dist/css/swiper.css';

define( '$util', Util );

component( 'AlHeader', AlHeader )
  ( 'AlFooter', AlFooter );
function component(name: string, tpl: any) {
  Vue.component( name, tpl );
  return component;
}

function define( name: string, val: any ) {
  Object.defineProperty( Vue.prototype, name, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: val,
  } );
  return define;
}
