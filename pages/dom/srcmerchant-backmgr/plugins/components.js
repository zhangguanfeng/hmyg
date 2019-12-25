
import DiAside from '@/components/di-aside';

import Vue from "vue";

const projectComponents = [
  DiAside
];
const plugin = {
  install(Vue) {
    projectComponents.forEach((comp) => {
      Vue.component(comp.name, comp);
    });
  },
};



Vue.use(plugin)

export default plugin;


