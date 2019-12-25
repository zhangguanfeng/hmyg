/*
 * @Autor: Diskfan
 * @Date: 2019-09-12 10:44:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-18 16:57:04
 * @Description:
 */
/**
 *  Created by   阿紫
 *  On  2019-02-19
 *  Content
 */
// const Index = importModule('home/index');
import Index from '@/views/home/index';
import Home from '@/views/home/home';

const importModule = file => () => import(`@/views/${file}.vue`);

export const appRouter = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/',
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: Home,
      },
      {
        path: 'download',
        name: 'download',
        meta: {
          title: 'APP软件下载',
        },
        component: Home,
      },
      {
        path: 'buySPO',
        name: 'buySPO',
        meta: {
          title: '场外充值 ',
        },
        component: importModule('home/buySPO'),
      },
      {
        path: 'login',
        name: 'login',
        meta: {
          title: '即刻登录地址',
        },
        component: importModule('home/login'),
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          title: '即刻注册地址',
        },
        props: {
          register: true,
        },
        component: importModule('home/login'),
      },
    ],
  },
  {
    path: '/',
    component: Index,
    // 因为要传props 所以与上面分开
    props: { showFooter: false },
    children: [
      {
        path: 'service',
        name: 'service',
        meta: {
          title: '服务条款',
        },
        component: importModule('home/service'),
      },
      {
        path: 'agreement',
        name: 'agreement',
        meta: {
          title: '用户协议',
        },
        component: importModule('home/agreement'),
      },
      {
        path: 'CPTMarkets',
        name: 'CPTMarkets',
        meta: {
          title: 'CPT Markets流动性指南',
        },
        component: importModule('home/CPTMarkets'),
      },
      {
        path: 'privacy',
        name: 'privacy',
        meta: {
          title: '服务条款',
        },
        component: importModule('home/privacy'),
      },
    ],
  },
  {
    path: '/trade',
    component: Index,
    props: { showFooter: false },
    children: [
      // {
      //   path: 'list',
      //   name: 'projectList',
      //   meta: {
      //     title: '找项目_找投资_项目投资',
      //   },
      //   component: importModule('project/list'),
      // },
      {
        path: '/',
        name: 'trade',
        meta: {
          title: 'K线图',
        },
        component: importModule('newTrade/lineIndex'),
        //        component: importModule('newTrade/index')
        // component: importModule('trade/index'),
      },
      {
        path: 'tradeIndex',
        name: 'tradeIndex',
        meta: {
          title: 'K线图',
        },
        // component: importModule( 'newTrade/index' )
        component: importModule('newTrade/index'),
        // component: importModule('trade/index'),
      },
      {
        path: 'tradeOld',
        name: 'tradeOld',
        meta: {
          title: 'K线图Old',
        },
        component: importModule('trade/index'),
        // component: importModule('trade/index'),
      },
    ],
  },
  {
    path: '/newTrade',
    redirect: '',
    component: Index,
    children: [
      {
        path: '',
        name: 'newTrade',
        meta: {
          title: 'K线图',
        },
        component: importModule('newTrade/index'),
      },
    ],
  },
  {
    path: '/about',
    redirect: '/about/index',
    component: Index,
    children: [
      {
        path: 'index',
        name: 'aboutIndex',
        meta: {
          title: '关于我们',
        },
        component: importModule('about/about'),
      },
    ],
  },
  {
    path: '/newsinfo',
    component: Index,
    base: '/pc/',
    children: [
      {
        path: '',
        component: importModule('newsCenter/index'),
        children: [
          {
            path: '',
            name: 'info',
            meta: {
              title: '最新区块链_投融资新闻资讯',
            },
            component: importModule('newsCenter/info'),
          },
          {
            path: 'calenda',
            name: 'calenda',
            meta: {
              title: '财经日历',
            },
            component: importModule('newsCenter/calenda'),
          },
          {
            path: 'news',
            name: 'news',
            meta: {
              title: '新闻资讯',
            },
            component: importModule('newsCenter/news'),
          },
          {
            path: 'notice',
            name: 'notice',
            meta: {
              title: '新闻资讯',
            },
            component: importModule('newsCenter/notice'),
          },
          {
            path: 'newsFlash',
            name: 'newsFlash',
            meta: {
              title: '快讯',
            },
            component: importModule('newsCenter/newsFlash'),
          },
          {
            path: 'newsdetail',
            name: 'newsdetail',
            meta: {
              title: '新闻详情',
            },
            component: importModule('newsCenter/newsDetail'),
          },
        ],
      },
    ],
  },
  {
    path: '/user',
    name: '',
    meta: {
      title: '用户中心',
    },
    component: Index,
    children: [
      {
        path: '',
        name: 'userIndex',
        redirect: '/user/assets_report',
        meta: {
          title: '',
        },
        component: importModule('userCenter/userIndex'),
        children: [
          {
            path: 'assets_report',
            name: 'assets_report',
            meta: {
              title: '资产明细',
            },
            component: importModule('userCenter/assetsReport'),
          },
          {
            path: 'authentication',
            name: 'authentication',
            meta: {
              title: '实名认证',
            },
            component: importModule('userCenter/authentication'),
          },
          {
            path: 'account_binding',
            name: 'account_binding',
            meta: {
              title: '账号绑定',
            },
            component: importModule('userCenter/accountBinding'),
          },
          {
            path: 'binding_details',
            name: 'binding_details',
            meta: {
              title: '账号绑定详情',
            },
            component: importModule('userCenter/bindingDetails'),
          },
          {
            path: 'collectionAddress',
            name: 'collectionAddress',
            meta: {
              title: '收款地址',
            },
            component: importModule('userCenter/collectionAddress'),
          },
          {
            path: 'golden',
            name: 'golden',
            meta: {
              title: '入金',
            },
            component: importModule('userCenter/golden'),
          },
          {
            path: 'withdraw',
            name: 'withdraw',
            meta: {
              title: '出金',
            },
            component: importModule('userCenter/withdraw'),
          },
          {
            path: 'addBank',
            name: 'addBank',
            meta: {
              title: '添加银行卡',
            },
            component: importModule('userCenter/addBank'),
          },
        ],
      },
    ],
  },
];

export default [
  ...appRouter,
  {
    path: '/404',
    name: 'NotFound',
    alias: '*',
    meta: {
      title: '404 - 找不到页面',
    },
    component: importModule('notFound'),
  },
  {
    path: '/down',
    name: 'down',
    meta: {
      title: 'app下载',
    },
    component: importModule('home/down'),
  },
];
