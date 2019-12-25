import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers.js';
Vue.use(VueRouter);


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '/',
      redirect: '/home',
    }, {
      path: '/*',
      redirect: '/home',
    },
  ],
});

export default router;
