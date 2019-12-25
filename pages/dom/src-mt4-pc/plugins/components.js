/**
 *  Created by   阿紫
 *  On  2019-03-08
 *  Content
 */
import Vue from 'vue';
import JkPagination from '@/components/jk-pagination';
import JkWithoutData from '@/components/jk-without-data';
import JkMenu from '@/components/jk-menu';
import JkAsideMain from '@/components/jk-aside-main';
import JkInputCode from '@/components/jk-input-code';
import JkUploadAuthImage from '@/components/jk-upload-auth-image';
import GoBack from '@/components/go-back.vue';
import * as filters from '@/filters';
// const debugModel = /(127\.0\.0\.\1)|(::1)|(localhost)/.test( window.location.href );
// window.debugModel = debugModel;
// if ( !debugModel ) {
//   const consoleArr = ['log', 'info', 'error', 'dir'];
//   for ( const v of consoleArr ) {
//     console[v] = () => void 0;
//   }
// }
const projectComponents = [
  JkPagination,
  JkWithoutData,
  JkMenu,
  JkAsideMain,
  JkInputCode,
  JkUploadAuthImage,
  GoBack,
];
const plugin = {
  install(Vue) {
    projectComponents.forEach((comp) => {
      Vue.component(comp.name, comp);
    });
    // 全局注册filter
    Object.keys(filters)
      .forEach((key) => {
        Vue.filter(key, filters[key]);
      });
  },
};
Vue.use(plugin);
export default plugin;
