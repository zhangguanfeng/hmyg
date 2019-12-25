/**
 *  Created by   阿紫
 *  On  2019/10/22
 *  Content 注册全局组件
 */
import Vue from 'vue';
import HNavBar from '../components/h-navbar.vue';
import HImg from '../components/h-img.vue';
import HNoData from '../components/h-noData.vue';
import HNoDataImg from '../components/h-noDataImg.vue';

const projectComponents = [
    HImg,
    HNavBar,
    HNoData,
    HNoDataImg,
];

const plugin = {
    install(Vue) {
        projectComponents.forEach((comp) => {
            Vue.component(comp.name, comp);
        });
    },
};
Vue.use(plugin);
export default plugin;
