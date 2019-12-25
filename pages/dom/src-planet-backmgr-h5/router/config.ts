const importModule = ( resolve: any, file: string ) => require( [`@/views/${file}.vue`], resolve );

export default [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '星球算力CRM管理系统'
    },
    component: ( resole: any ) => importModule( resole, 'Home' ),
  },
  {
    path: '/load',
    name: 'reportLoad',
    menu: '购买记录',
    meta: {
      title: '购买记录',
    },
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'report/load' ),
  }, {
    path: '/clear',
    name: 'reportClear',
    meta: {
      title: '提取记录',
    },
    menu: '提取记录',
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'report/clear' ),
  }, {
    path: '/mining',
    name: 'reportMining',
    menu: '收益记录',
    meta: {
      title: '收益记录',
    },
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'report/mining' ),
  }, {
    path: '/extract',
    name: 'reportExtract',
    menu: '提矿记录',
    meta: {
      title: '提矿记录',
    },
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'report/extract' ),
  }, {
    path: '/my',
    name: 'propertyMy',
    menu: '我的资产',
    meta: {
      title: '我的资产',
    },
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'property/my' ),
  }, {
    path: '/wal',
    name: 'propertyWal',
    meta: {
      title: '提取',
    },
    menu: '提取',
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'property/wal' ),
  },
  {
    path: '/deposit',
    name: 'propertyDeposit',
    menu: '转入',
    meta: {
      title: '转入',
    },
    icon: '', // 一般不设置
    component: ( resole: any ) => importModule( resole, 'property/deposit' ),
  },
  {
    path: '/invite',
    name: 'invite',
    meta: {
      title: '邀请好友',
    },
    icon: 'el-icon-user',
    component: ( resole: any ) => importModule( resole, 'invite' ),
  },
  {
    path: '/proxy',
    name: 'proxy',
    meta: {
      title: '代理',
    },
    icon: 'el-icon-user',
    menu: '代理',
    component: ( resole: any ) => importModule( resole, 'proxy' ),
  },
  {
    path: '/login',
    name: 'login',
    component: ( resole: any ) => importModule( resole, 'user/login' ),
  },
];
