// import Home from '@/views/home.vue';
// import Login from 'views/user/login';

export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home/index'),
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('views/home/service'),
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('views/news/information'),
  },
  {
    path: '/newsDetails',
    name: 'newsDetails',
    component: () => import('views/news/newsDetails'),
  },
  {
    path: '/messageDetails',
    name: 'messageDetails',
    component: () => import('views/news/messageDetails'),
  },
  {
    path: '/historyInfo',
    name: 'historyInfo',
    component: () => import('views/historyInfo/historyInfo'),
  },
  {
    path: '/trading', //未登录的交易页面
    name: 'trading',
    component: () => import('views/user/trading'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/user/login'),
  },
  {
    path: '/registed',
    name: 'registed',
    component: () => import('views/user/registed'),
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('views/user/forgetPassword'),
  },
  {
    path: '/concatUs',
    name: 'concatUs',
    component: () => import('views/user/concatUs'),
  }, {
    path: '/languageSetting',
    name: 'languageSetting',
    component: () => import('views/user/language'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('views/user/user.vue')
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import('views/user/authentication.vue')
  },
  {
    path: '/safe',
    name: 'safe',
    component: () => import('views/user/safe'),
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('views/user/message'),
  },
  {
    path: '/modifyPhone',
    name: 'modifyPhone',
    component: () => import('@/views/user/modifyPhone'),
  },
  {
    path: '/cash',
    name: 'cash',
    component: () => import('views/user/cash'),
  },
  {
    path: '/cashDetails',
    name: 'cashDetails',
    component: () => import('views/user/cashDetails'),
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('views/user/card'),
  },
  {
    path: '/addCard',
    name: 'addCard',
    component: () => import('views/user/addCard'),
  },
  {
    path: '/invite',
    name: 'invite',
    component: () => import('views/invite/invite'),
  },
  {
    path: '/inviteDetails',
    name: 'inviteDetails',
    component: () => import('views/invite/inviteDetails'),
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: () => import('views/aboutUs/aboutUs')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('views/help/help')
  },
  {
    path: '/helpSon',
    name: 'helpSon',
    component: () => import('views/help/helpSon')
  },
  {
    path: '/risk',
    name: 'risk',
    component: () => import('views/statement/risk'),
  },
  {
    path: '/CPTMarkets',
    name: 'CPTMarkets',
    component: () => import('views/statement/CPTMarkets'),
  },
  {
    path: '/privacyPolicy',
    name: 'privacyPolicy',
    component: () => import('views/statement/privacyPolicy'),
  },
  {
    path: '/school',
    name: 'school',
    component: () => import('views/school/school'),
  },
  {
    path: '/cattle_1',
    name: 'cattle_1',
    component: () => import('views/school/cattle_1'),
  },
  {
    path: '/cattle_2',
    name: 'cattle_2',
    component: () => import('views/school/cattle_2'),
  },
  {
    path: '/cattle_3',
    name: 'cattle_3',
    component: () => import('views/school/cattle_3'),
  },
  {
    path: '/introductory',
    name: 'introductory',
    component: () => import('views/school/introductory'),
  },
  {
    path: '/management',
    name: 'management',
    component: () => import('views/school/management'),
  },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('views/school/technology'),
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('views/school/guide'),
  },
  {
    path: '/financial',
    name: 'financial',
    component: () => import('views/school/financial'),
  },
];
