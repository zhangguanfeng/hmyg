import Vue from 'vue';
import Router from 'vue-router';
/* const mapRouter = (r,router) => require.ensure([], () => r(require(router))) */
const mapRouter = (file,chunkName) => resolve => require.ensure([], () => resolve(require(file)), chunkName)
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/cyberPlanetl',
      name: 'cyberPlanetl',
      meta: {
        title: '网络星球',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/index.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/index.vue'),
    },
    {
      path: '/poolAgreement',
      name: 'poolAgreement',
      meta: {
        title: 'AlphaWallet应用免责声明'
      },
      component:r => require.ensure([], () => r(require('@/views/cyberPlanetl/poolAgreement.vue')),'disclaimer')
      //component: () => import('../views/statement/applicationStatement.vue')
    },
    {
      path: '/miningPoolDetail',
      name: 'miningPoolDetail',
      meta: {
        title: '矿池详情',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/miningPoolDetail.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/miningPoolDetail.vue'),
    },
    {
      path: '/starIntroduce',
      name: 'starIntroduce',
      meta: {
        title: '星球介绍',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/starIntroduce.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/miningPoolDetail.vue'),
    },
    {
      path: '/investCalculate',
      name: 'investCalculate',
      meta: {
        title: '购买理财包',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/investCalculate.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/investCalculate.vue'),
    },
    {
      path: '/extractCalculate',
      name: 'extractCalculate',
      meta: {
        title: '提取',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/extractCalculate.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/extractCalculate.vue'),
    },
    {
      path: '/unlockRecord',
      name: 'unlockRecord',
      meta: {
        title: '提取记录',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/unlockRecord.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/unlockRecord.vue'),
    },
    {
      path: '/miningRecord',
      name: 'miningRecord',
      meta: {
        title: '挖矿记录',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/miningRecord.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/miningRecord.vue'),
    },
    {
      path: '/loadingRecord',
      name: 'loadingRecord',
      meta: {
        title: '载入记录',
      },
      component: r => require.ensure([], () => r(require('@/views/cyberPlanetl/loadingRecord.vue')),'disclaimer')
      //component: () => import('../views/cyberPlanetl/loadingRecord.vue'),
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      meta: {
        title: '免责及责任限制声明',
      },
      component:r => require.ensure([], () => r(require('@/views/disclaimer.vue')),'disclaimer')
      //component: () => import('../views/disclaimer.vue'),
    },
    {
      path: '/googleAuthenticator',
      name: 'googleAuthenticator',
      meta: {
        title: '绑定谷歌验证器教程',
      },
      component:r => require.ensure([], () => r(require('@/views/googleAuthenticator.vue')),'googleAuthenticator')
      //component: () => import('../views/googleAuthenticator.vue'),
    },
    {
      path: '/applicationDetails',
      name: 'applicationDetails',
      meta: {
        title: '应用详情',
      },
      component:r => require.ensure([], () => r(require('@/views/applicationDetails.vue')),'applicationDetails')
      //component: () => import('../views/applicationDetails.vue'),
    },
    {
      path: '/download',
      name: 'download',
      meta: {
        title: 'ios安装教程',
      },
      component:r => require.ensure([], () => r(require('@/views/download/justToken/download.vue')),'download')
      //component: () => import('../views/download/justToken/download.vue'),
    },
    {
      path: '/downloadWalletApp',
      name: 'downloadWalletApp',
      meta: {
        title: 'ios安装教程',
      },
      component:r => require.ensure([], () => r(require('@/views/download/justToken/downloadWalletApp.vue')),'downloadWalletApp')
      //component: () => import('../views/download/justToken/downloadWalletApp.vue'),
    },
    {
      path: '/pushMessageDetails',
      name: 'pushMessageDetails',
      meta: {
        title: '消息推送详情',
      },
      component:r => require.ensure([], () => r(require('@/views/pushMessageDetails.vue')),'pushMessageDetails')
      //component: () => import('../views/pushMessageDetails.vue'),
    },
    {
      path: '/getRedEnvlp',
      name: 'getRedEnvlp',
      meta: {
        title: '获取钱包',
      },
      component:r => require.ensure([], () => r(require('@/views/redEnvelope/getRedEnvlp.vue')),'getRedEnvlp')
      //component: () => import('../views/redEnvelope/getRedEnvlp.vue'),
    },
    {
      path: '/redEnvlpRegister',
      name: 'redEnvlpRegister',
      meta: {
        title: '领取钱包',
      },
      component:r => require.ensure([], () => r(require('@/views/redEnvelope/redEnvlpRegister.vue')),'redEnvlpRegister')
      //component: () => import('../views/redEnvelope/redEnvlpRegister.vue'),
    },
    {
      path: '/redEnvlp',
      name: 'redEnvlp',
      meta: {
        title: '钱包页面',
      },
      component:r => require.ensure([], () => r(require('@/views/redEnvelope/redEnvlp.vue')),'redEnvlp')
      //component: () => import('../views/redEnvelope/redEnvlp.vue'),
    },
    // {
    //   path: '/receive',
    //   name: 'receive',
    //   meta: {
    //     title: '新年领红包',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newYearParade/receive.vue')),'receive')
    //   //component: () => import('../views/newYearParade/receive.vue'),
    // },
    // {
    //   path: '/receiveRecord',
    //   name: 'receiveRecord',
    //   meta: {
    //     title: '领红记录',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newYearParade/receiveRecord.vue')),'receiveRecord')
    //   //component: () => import('../views/newYearParade/receiveRecord.vue'),
    // },
    // {
    //   path: '/receiveFriendsRecord',
    //   name: 'receiveFriendsRecord',
    //   meta: {
    //     title: '助力的好友',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newYearParade/friendsRecord.vue')),'friendsRecord')
    //   //component: () => import('../views/newYearParade/friendsRecord.vue'),
    // },
    // {
    //   path: '/receiveRegister',
    //   name: 'receiveRegister',
    //   meta: {
    //     title: '新年领红包注册页',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newYearParade/receiveRegister.vue')),'receiveRegister')
    //   //component: () => import('../views/newYearParade/receiveRegister.vue'),
    // },
    // {
    //   path: '/financialDetails',
    //   name:"financialDetails",
    //   meta: {
    //     title: '理财详情',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/financialDetails.vue')),'financialDetails')
    //   //component: () => import('../views/financing/financialDetails.vue')
    // },
    // {
    //   path: '/mySPO',
    //   name:"financing_mySPO",
    //   meta: {
    //     title: '我的理财',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/mySPO.vue')),'mySPO')
    //   //component: () => import('../views/financing/mySPO.vue')
    // },
    // {
    //   path: '/current_financial_rule',
    //   name:"currentFinancialRule",
    //   meta: {
    //     title: '规则详情',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/current_financial_rule.vue')),'current_financial_rule')
    //   //component: () => import('../views/financing/current_financial_rule.vue')
    // },
    {
      path: '/'
    },
    // {
    //   path: '/orderStatus',
    //   name:"orderStatus",
    //   meta: {
    //     title: '订单状态页',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/orderStatus.vue')),'orderStatus')
    //   //component: () => import('../views/financing/orderStatus.vue')
    // },
    // {
    //   path: '/fanancialHistory',
    //   name:"fanancialHistory",
    //   meta: {
    //     title: '存储记录',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/history.vue')),'history')
    //   //component: () => import('../views/financing/history.vue')
    // },
    // {
    //   path: '/financingBuy',
    //   name:"financingBuy",
    //   meta: {
    //     title: '买入页面',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/financingBuy.vue')),'financingBuy')
    //   //component: () => import('../views/financing/financingBuy.vue')
    // },
    // {
    //   path: '/GhomeDetail',
    //   name:"GhomeDetail",
    //   meta: {
    //     title: 'Ghome活期',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/GhomeDetail.vue')),'GhomeDetail')
    //   //component: () => import('../views/financing/GhomeDetail.vue')
    // },
    // {
    //   path: '/storageRegular',
    //   name:"storageRegular",
    //   meta: {
    //     title: '存定期',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/storageRegular.vue')),'storageRegular')
    //   //component: () => import('../views/financing/storageRegular.vue')
    // },
    // {
    //   path: '/uploadFile',
    //   name:"uploadFile",
    //   meta: {
    //     title: '上传文件',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/upload/uploadFile.vue')),'uploadFile')
    //   //component: () => import('../views/upload/uploadFile.vue')
    // },
    // {
    //   path: '/outOrIn',
    //   name:"outOrIn",
    //   meta: {
    //     title: '交易',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/outOrIn.vue')),'outOrIn')
    //   //component: () => import('../views/financing/outOrIn.vue')
    // },
    // {
    //   path: '/invite',
    //   name: 'invite',
    //   meta: {
    //     title: '邀请好友'
    //   },
    //   /* component: () => import('../views/invite/friend.vue') */
    //   component:r => require.ensure([], () => r(require('@/views/invite/friend.vue')),'friend')
    // },
    // {
    //   path: '/today_income',
    //   name: 'inviteIncome',
    //   meta: {
    //     title: '今日收益'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/invite/today_income.vue')),'today_income')
    //   //component: () => import('../views/invite/today_income.vue')
    // },
    // {
    //   path: '/cumulative_income',
    //   name: 'cumulativeIncome',
    //   meta: {
    //     title: '累计收益'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/invite/cumulative_income.vue')),'cumulative_income')
    //   //component: () => import('../views/invite/cumulative_income.vue')
    // },
    // {
    //   path: '/invite_count',
    //   name: 'inviteCount',
    //   meta: {
    //     title: '今日邀请人数'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/invite/invite_count.vue')),'invite_count')
    //   //component: () => import('../views/invite/invite_count.vue')
    // },
 // {
 //      path: '/invite_join',
 //      name: 'inviteJoin',
 //      meta: {
 //        title: '邀请好友(废弃)'
 //      },
 //      component:r => require.ensure([], () => r(require('@/views/invite/join.vue')),'join')
 //      //component: () => import('../views/invite/join.vue')
 //    },
    /* {
      path: '/invite_landing',
      name: 'inviteLanding',
      meta: {
        title: '邀请好友(废弃)'
      },
      component: () => import('../views/invite/landing.vue')
    }, */
    {
      path: '/downloadBitego',
      name: 'downloadBitego',
      meta: {
        title: 'ios安装教程',
      },
      component:r => require.ensure([], () => r(require('@/views/download/bitego/bitego.vue')),'bitego')
      //component: () => import('../views/download/bitego/bitego.vue'),
    },
    {
      path: '/appBitego',
      name: 'appBitego',
      meta: {
        title: 'ios安装教程',
      },
      component:r => require.ensure([], () => r(require('@/views/download/bitego/appBitego.vue')),'appBitego')
      //component: () => import('../views/download/bitego/appBitego.vue'),
    },
    // {
    //   path: '/LBDetail',
    //   name: 'LBDetail',
    //   meta: {
    //     title: 'SVC详情',//原来是LB详情,改名了
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/agentBrush/LBDetail.vue')),'LBDetail')
    //   //component: () => import('../views/agentBrush/LBDetail.vue'),
    // },
    // {
    //   path: '/brush',
    //   name: 'brush',
    //   meta: {
    //     title: '代理刷单',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/agentBrush/brush.vue')),'brush')
    //   //component: () => import('../views/agentBrush/brush.vue'),
    // },
    // {
    //   path: '/record',
    //   name: 'record',
    //   meta: {
    //     title: '返佣记录',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/agentBrush/record.vue')),'record')
    //   //component: () => import('../views/agentBrush/brush.vue'),
    // },
    // {
    //   path: '/EuscCheckingDetails',
    //   name: 'EuscCheckingDetails',
    //   meta: {
    //     title: 'EUSC合约活期详情',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/checkingDetails.vue')),'checkingDetails')
    //   /* component: () => import('../views/eusc/checkingDetails.vue'), */
    // },
    // {
    //   path: '/EuscRegularDetails',
    //   name: 'EuscRegularDetails',
    //   meta: {
    //     title: 'EUSC合约定期详情',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/regularDetails.vue')),'regularDetails')
    //   //component: () => import('../views/eusc/regularDetails.vue'),
    // },
    // {
    //   path: '/EuscRewardRules',
    //   name: 'EuscRewardRules',
    //   meta: {
    //     title: 'EUSC奖励规则',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/rewardRules.vue')),'rewardRules')
    //   //component: () => import('../views/eusc/rewardRules.vue'),
    // },
    // {
    //   path: '/EuscRanking',
    //   name: 'EuscRanking',
    //   meta: {
    //     title: '排行榜',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/ranking.vue')),'ranking')
    //   //component: () => import('../views/eusc/ranking.vue'),
    // },
    // {
    //   path: '/EuscInviteRelationship',
    //   name: 'EuscInviteRelationship',
    //   meta: {
    //     title: '邀请关系',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/InviteRelationship.vue')),'InviteRelationship')
    //   //component: () => import('../views/eusc/InviteRelationship.vue'),
    // },
    // {
    //   path: '/EuscBannerDetail',
    //   name: 'EuscBannerDetail',
    //   meta: {
    //     title: 'EUSC-生态国际',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/EuscBannerDetail.vue')),'EuscBannerDetail')
    //   //component: () => import('../views/eusc/EuscBannerDetail.vue'),
    // },

    // {
    //   path: '/EUSCInviteLanding',
    //   name: 'EUSCInviteLanding',
    //   meta: {
    //     title: '邀请好友'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/landing.vue')),'landing')
    //   //component: () => import('../views/eusc/landing.vue')
    // },
    {
      path: '/EUSCAgreement',
      name: 'EUSCAgreement',
      meta: {
        title: '邀请好友'
      },
      component:r => require.ensure([], () => r(require('@/views/eusc/agreement.vue')),'agreement')
      //component: () => import('../views/eusc/agreement.vue')
    },
    // {
    //   path: '/EuscLog',
    //   name: 'EuscLog',
    //   meta: {
    //     title: '奖励记录',
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/eusc/EuscLog.vue')),'EuscLog')
    //   //component: () => import('../views/eusc/EuscLog.vue'),
    // },
    {
      path: '/applicationStatement',
      name: 'applicationStatement',
      meta: {
        title: 'AlphaWallet应用免责声明'
      },
      component:r => require.ensure([], () => r(require('@/views/statement/applicationStatement.vue')),'applicationStatement')
      //component: () => import('../views/statement/applicationStatement.vue')
    },
    // {
    //   path: '/financialStatement',
    //   name: 'financialStatement',
    //   meta: {
    //     title: 'AlphaWallet理财免责声明'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/statement/financialStatement.vue')),'financialStatement')
    //   //component: () => import('../views/statement/financialStatement.vue')
    // },
    //  {
    //   path: '/invite',
    //   name: 'invite',
    //   meta: {
    //     title: '邀请好友'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newInvite/invite.vue')),'invite')
    //   //component: () => import('../views/newInvite/invite.vue')
    // },
    // {
    //   path: '/invitePic',
    //   name: 'invitePic',
    //   meta: {
    //     title: '邀请好友'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newInvite/invitePic.vue')),'invitePic')
    //   //component: () => import('../views/newInvite/invitePic.vue')
    // },
    // {
    //   path: '/inviteLand',
    //   name: 'inviteLand',
    //   meta: {
    //     title: '邀请好友'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/newInvite/inviteLand.vue')),'inviteLand')
    //   //component: () => import('../views/newInvite/inviteLand.vue')
    // },
    // {
    //   path: '/coinDetail',
    //   name: 'coinDetail',
    //   meta: {
    //     title: '币种详情'
    //   },
    //   component:r => require.ensure([], () => r(require('@/views/financing/coinDetail.vue')),'coinDetail')
    //   //component: () => import('../views/newInvite/inviteLand.vue')
    // },
    {
      path: '/goEx',
      name: 'goEx',
      meta: {
        title: '全球兑'
      },
      component:r => require.ensure([], () => r(require('@/views/GoEx/goEx.vue')),'coinDetail')
    },
    {
      path: '/transferExchange',
      name: 'transferExchange',
      meta: {
        title: '转入全球兑'
      },
      component:r => require.ensure([], () => r(require('@/views/GoEx/transferExchange.vue')),'coinDetail')
    },
    {
      path: '/downGoEx',
      name: 'downGoEx',
      meta: {
        title: '下载',
      },
      component:r => require.ensure([], () => r(require('@/views/GoEx/downGoEx.vue')),'downGoEx')
    },
    {
      path: '/iosGoExDown',
      name: 'iosGoExDown',
      meta: {
        title: 'ios安装教程',
      },
      component:r => require.ensure([], () => r(require('@/views/GoEx/iosGoExDown.vue')),'iosGoExDown')
    },
    {
      path: '/invite',
      name: 'invite',
      meta: {
        title: '邀请好友',
      },
      component:r => require.ensure([], () => r(require('@/views/invitation/invite.vue')),'invite')
    },
    {
      path: '/inviteLand',
      name: 'inviteLand',
      meta: {
        title: '邀请好友',
      },
      component:r => require.ensure([], () => r(require('@/views/invitation/inviteLand.vue')),'inviteLand')
    },
    {
      path: '/inviteRegister',
      name: 'inviteRegister',
      meta: {
        title: '注册',
      },
      component:r => require.ensure([], () => r(require('@/views/invitation/inviteRegister.vue')),'inviteRegister')
    },
  ],
});

export default router;
