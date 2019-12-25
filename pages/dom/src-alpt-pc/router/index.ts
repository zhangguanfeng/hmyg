import Vue from 'vue';
import VueRouter from 'vue-router';
const importModule = (resolve: any, file: string) => require([`@/views/${file}.vue`], resolve);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: (resole: any) => importModule(resole, 'home/index'),

  },

  {
    path: '/news',
    name: 'news',
    component: (resole: any) => importModule(resole, 'news/index'),
  },
  {
    path: '/news',
    name: 'news',
    component: (resole: any) => importModule(resole, 'news/index'),
  },
  {
    path: '/newsSon',
    name: 'newsSon',
    component: (resole: any) => importModule(resole, 'news/newsSon'),
  },
  {
    path: '/pay',
    name: 'pay',
    component: (resole: any) => importModule(resole, 'pay/index'),
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: (resole: any) => importModule(resole, 'wallet/index'),
  },
  {
    path: '/alpt',
    name: 'alpt',
    component: (resole: any) => importModule(resole, 'alpt/index'),
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
