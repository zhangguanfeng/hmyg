import sidebar from './routers/sidebar'

export const appRouter = [
	{
		path: '/',
		name: 'Home',
		component: resolve => require(['../components/common/Home.vue'], resolve),
		redirect: '/home-page',
		meta: {
			title: '投诉',
			icon:'el-icon-tickets'
		},
		children: [
			...sidebar,
			{
				path: '/withdraw',
				name: 'withdraw',
				meta: { title: '发起提现' },
				component: resolve => require(['@/views/withdraw/addWithdraw.vue'], resolve)
			},
			{
				path: 'withdraw-check',
				name: 'withdrawCheck',
				component: resolve => require(['@/views/withdraw-check/index.vue'], resolve),
				meta: { title: '提币审核' }
			},
			{
				path: '/complaint',
				name: 'complaint',
				meta: { title: '投诉' },
				component: resolve => require(['../views/complaint.vue'], resolve),
			},
			{
				path: '/bill',
				name: 'bill',
				meta: { title: '订单' },
				component: resolve => require(['../views/bill.vue'], resolve),
			},

			//flashex 新增

			{
				path: '/home-page',
				name: 'homePage',
				meta: { title: '首页' },
				component: resolve => require(['../views/home-page/index.vue'], resolve),
			},
			{
				path: '/importExcel',
				name: 'importExcel',
				meta: { title: '导入兑出记录' },
				component: resolve => require(['../views/withdraw/importExcel.vue'], resolve),
			},
			{
				path: '/confirmExcel',
				name: 'confirmExcel',
				meta: { title: '兑出导入确认' },
				component: resolve => require(['@/views/withdraw/confirmExcel.vue'], resolve)
			},
			{
				path: '/auditAll',
				name: 'auditAll',
				meta: { title: '批量审核' },
				component: resolve => require(['../views/withdraw/auditAll.vue'], resolve),
			},
			{
				path: '/coin-recharge',
				name: 'coinRecharge',
				meta: { title: '充币' },
				component: resolve => require(['@/views/my-assets/components/coin-recharge.vue'], resolve)
			},
			{
				path: '/coin-extract',
				name: 'coinExtract',
				meta: { title: '提币' },
				component: resolve => require(['@/views/my-assets/components/coin-extract.vue'], resolve)
			},
			{
				path: '/coin-transfer',
				name: 'coinTransfer',
				meta: { title: '内部转账' },
				component: resolve => require(['@/views/my-assets/components/coin-transfer.vue'], resolve)
			},
		]
	}
]

export default [
	...appRouter,
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录',
		},
		component: resolve => require(['../views/login/index.vue'], resolve),
	},
	{
		path: '/forgotpwd',
		name: 'forgotPwd',
		meta: {
			title: '找回密码',
		},
		component: resolve => require(['../views/forgotpwd/index.vue'], resolve),
	},
	{
		path: '/resetPwd',
		name: 'resetPwd',
		meta: {
			title: '设置资金密码',
		},
		component: resolve => require(['../views/resetPwd/index.vue'], resolve),
	},
	{
		path: '/register',
		name: 'register',
		meta: {
			title: '注册',
		},
		component: resolve => require(['../views/register/index.vue'], resolve),
	},
	{
		path: '/finishRegister',
		name: 'finishRegister',
		meta: {
			title: '完善注册信息',
		},
		component: resolve => require(['../views/finishRegister/index.vue'], resolve),
	},
	{
		path: '/404',
		name: 'NotFound',
		alias: '*',
		meta: {
			title: '404 - 找不到页面',
		},
		component: {
			render(h) {
				return h('h1', {
				attrs: {
					style: 'text-align: center;',
				},
				}, '页面不存在');
			},
		},
	},
];
