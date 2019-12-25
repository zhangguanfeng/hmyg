import Vue from 'vue';
import ElementUi from 'element-ui';
import Viewer from 'v-viewer';
import 'element-ui/lib/theme-chalk/index.css';
import Util from '@/common/util';
import Http from '@/common/http';
import BInput from '@/components/b-input.vue';
import BUpload from '@/components/b-upload.vue';
import BFilter from '@/components/b-filter.vue';
import BPage from '@/components/b-page.vue';
import BDialog from '@/components/b-dialog.vue';
import '../theme/index.css';
install('$util', Util)
  ('$http', Http)
  ('$post', Http.post)
  ('$get', Http.get);
component('BInput', BInput)
  ('BUpload', BUpload)
  ('BFilter', BFilter)
  ('BPage', BPage)
  ('BDialog', BDialog);
Vue.use(ElementUi);
Vue.use(Viewer);


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