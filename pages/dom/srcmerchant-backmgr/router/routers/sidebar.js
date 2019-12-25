const sidebar = [
	{
		path: '/withdrawRecord',
		name: 'withdrawRecord',
		meta: { title: '兑出记录' },
		component: resolve => require(['@/views/withdraw/withdrawRecord.vue'], resolve)
	},
	{
		path: '/userinfo',
		name: 'userinfo',
		meta: { title: '账户与安全' },
		component: resolve => require(['@/views/userinfo/index.vue'], resolve)
	},
	{
		path: '/userStatus',
		name: 'userStatus',
		meta: { title: '账户状态' },
		component: resolve => require(['@/views/userStatus/index.vue'], resolve)
	},
	//Alphapay新增
	{
		path: '/rollInRecord',
		name: 'rollInRecord',
		meta: { title: '兑入记录' },
		component: resolve => require(['@/views/rollIn/rollInRecord.vue'], resolve),
	},
	{
		path: '/my-assets',
		name: 'my-assets',
		meta: { title: '我的资产' },
		component: resolve => require(['@/views/my-assets/index.vue'], resolve),
	},
	{
		path: '/recharge-record',
		name: 'recharge-record',
		meta: { title: '充提流水' },
		component: resolve => require(['@/views/recharge-record/index.vue'], resolve),
	},
	{
		path: '/transfer-record',
		name: 'transfer-record',
		meta: { title: '转账流水' },
		component: resolve => require(['@/views/transfer-record/index.vue'], resolve),
	},
	{
		path: '/fund-record',
		name: 'fund-record',
		meta: { title: '资金流水' },
		component: resolve => require(['@/views/fund-record/index.vue'], resolve),
	},
	{
		path: '/api-setting',
		name: 'api-setting',
		meta: { title: 'API接入设置' },
		component: resolve => require(['@/views/api-setting/index.vue'], resolve),
	}
]

export default sidebar
