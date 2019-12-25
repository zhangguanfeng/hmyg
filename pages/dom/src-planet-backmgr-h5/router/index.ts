import Vue from 'vue';
import VueRouter from 'vue-router';
import Config from './config';
import Util from '@/common/util';
Vue.use(VueRouter);

const routes = [
  ...Config,
  {
    path: '/*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (!Util.token() && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    if (!/cache$/.test(window.location.href)) {
      window.location.href = '/login.html';
    }
    // if (router.currentRoute.name !== 'login') {
    //   next({
    //     name: 'login',
    //   });
    // }
  } else {
    next();
  }
});
export default router;
