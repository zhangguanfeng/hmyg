import Vue from 'vue';
import Router from 'vue-router';
import globalRoutes from './router';
import { token } from './../common/util'
Vue.use(Router);
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const router = new Router({
  	mode: 'history',
  // base: '',
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	},
	routes: [
		...globalRoutes,
	],
});


// router.beforeEach((to, from, next) => {
// 	const session = token()
// 	if (!session && to.name !== 'Login') { // 判断是否已经登录且前往的页面不是登录页
// 		next({
// 			name: 'Login',
// 		})
// 	} else if (session && to.name === 'Login') { // 判断是否已经登录且前往的是登录页
// 		next({
// 			name: 'Home',
// 		})
// 	} else {
// 		next();
// 	}
// });

export default router;


