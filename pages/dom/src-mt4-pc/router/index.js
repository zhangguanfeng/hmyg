import Vue from 'vue';
import Router from 'vue-router';
import globalRoutes from './router';
import { modifyDocumentTitle } from '@/common/util.js';
Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    ...globalRoutes,
  ],
});
router.beforeEach((to, from, next) => {
  next();
} );
router.afterEach((to, from) => {
  if (to.meta.title) {
    modifyDocumentTitle();
  }
})
export default router;
