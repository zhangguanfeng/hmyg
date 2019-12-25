import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from './config';
import Util from '@/common/util';
const importModule = ( resolve: any, file: string ) => require( [`@/views/${file}.vue`], resolve );

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: (resolve: any) => importModule(resolve, 'account/login'),
  },
  {
    path: '/regist',
    name: 'regist',
    component: (resolve: any) => importModule(resolve, 'account/regist'),
  },
  ...Config,
]

const router: VueRouter = new VueRouter( {
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
} );
router.beforeEach((to, from, next) => {
  if (!Util.token() && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    if (router.currentRoute.name !== 'login') {
      next({
        name: 'login',
      });
    }
  }  else {
    next();
  }
});
export default router;
