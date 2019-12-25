import Frame from '@/views/frame.vue';
const importModule = ( resolve: any, file: string ) => require( [`@/views/${file}.vue`], resolve );

export default [
  {
    path: '/',
    name: 'index',
    icon: 'el-icon-money',
    menu: '汇总',
    component: Frame,
  },
  {
    path: '/report',
    name: 'report',
    menu: '报表',
    icon: 'el-icon-s-data',
    redirect: '/report/load',
    meta: {
      auth: true, // 可以不设置 false 情况下才会不检测是否登录
    },
    component: Frame,
    children: [
      {
        path: 'load',
        name: 'reportLoad',
        menu: '购买记录',
        meta: {
          auth: false, // 只有设置false才不会验证登录
        },
        icon: '', // 一般不设置
        component: ( resole: any ) => importModule( resole, 'report/load' ),
      }, {
        path: 'clear',
        name: 'reportClear',
        menu: '出售记录',
        icon: '', // 一般不设置
        component: ( resole: any ) => importModule( resole, 'report/clear' ),
      }, {
        path: 'mining',
        name: 'reportMining',
        menu: '收益记录',
        icon: '', // 一般不设置
        component: ( resole: any ) => importModule( resole, 'report/mining' ),
      },
      // {
      //   path: 'extract',
      //   name: 'reportExtract',
      //   menu: '提矿记录',
      //   icon: '', // 一般不设置
      //   component: ( resole: any ) => importModule( resole, 'report/extract' ),
      // }
    ]
  },
  {
    path: '/property',
    name: 'property',
    menu: '资产管理',
    component: Frame,
    icon: 'el-icon-menu',
    redirect: '/property/my',
    meta: {
      auth: true, // 可以不设置 false 情况下才会不检测是否登录
    },
    children: [
      {
        path: 'my',
        name: 'propertyMy',
        menu: '我的资产',
        icon: '', // 一般不设置
        component: ( resole: any ) => importModule( resole, 'property/my' ),
      }, {
        path: 'wal',
        name: 'propertyWal',
        menu: '提取',
        icon: '', // 一般不设置
        component: ( resole: any ) => importModule( resole, 'property/wal' ),
      }
    ]
  },
  {
    path: '/proxy',
    name: 'proxy',
    icon: 'el-icon-user',
    menu: '代理',
    component: Frame,
  },
];
