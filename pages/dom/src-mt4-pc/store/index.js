/*
 * @Autor: Diskfan
 * @Date: 2019-09-20 16:35:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-25 11:14:08
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import I18n from '@/i18n.js';
Vue.use(Vuex)

// Open strict mode. https://vuex.vuejs.org/zh-cn/strict.html
const strict = `"${process.env.NODE_ENV}"` === 'development'

const store = new Vuex.Store({
  state: {
    isLoading: false, // loading
    totalAsset: {
      SPO: '0'
    },
    showLoginDialog: false,
    documentTitle: 'CPT官网', // 网站名字
    kLineDataFeed: null, //
    kLineHistoryData: {}, // k线历史数据，在切换页面的情况下保存
    fullWindow: false,
    orderData: null,
    splitKey: [],
    areaCodeList: [], // 区域列表
    takeSize: 100, // k线分页大小
    // cptAccount: {}, // 账户列表
    cptAccountType: '', // 账户类型 100 真实， 111 虚拟 
    account: '', // 当前使用的账户
    allSymbolsInfo: [], // 所哟货币对信息，只有页面不在行情时，才会更新这个数据
    // allSymbolsOrder: [], // 所有持仓或者挂单表单
    supportedResolutions: ['1', '5', '15', '30', '60', '240', '1440', '10080', '43200'],
    widget: null,
    activeButtonList: [
      { chartType: 3, resolution: '1', short: '1M', value: I18n.t('tradeKLine.activeButtonList[0]') },
      { chartType: 1, resolution: '1', short: '1M', value: I18n.t('tradeKLine.activeButtonList[1]') },
      { chartType: 1, resolution: '5', short: '5M', value: I18n.t('tradeKLine.activeButtonList[2]') },
      { chartType: 1, resolution: '15', short: '15M', value: I18n.t('tradeKLine.activeButtonList[3]') },
      { chartType: 1, resolution: '30', short: '30M', value: I18n.t('tradeKLine.activeButtonList[4]') },
      { chartType: 1, resolution: '60', short: '1H', value: I18n.t('tradeKLine.activeButtonList[5]') },
      { chartType: 1, resolution: '240', short: '4H', value: '4小时' },
      { chartType: 1, resolution: '1440', short: '1D', short: '1M', value: I18n.t('tradeKLine.activeButtonList[6]') },
      { chartType: 1, resolution: '10080', short: '1W', value: I18n.t('tradeKLine.activeButtonList[7]') },
      { chartType: 1, resolution: '43200', short: 'MN', value: I18n.t('tradeKLine.activeButtonList[8]') },
      // { action: 'chartProperties', value: I18n.t('tradeKLine.activeButtonList[9]') },
      // { action: 'insertIndicator', value: I18n.t('tradeKLine.activeButtonList[10]') },
    ],
    kLineIndexList: [
      { value: 'MACD', studyKey: 'MACD', studyVal: [14, 30, 'close', 9] },
      { value: 'KDJ', studyKey: 'Stochastic', studyVal: [10] },
      { value: 'BOLL', studyKey: 'Bollinger Bands', studyVal: [10] },
      { value: 'EMA', studyKey: 'EMA Cross', studyVal: [10] },
      { value: 'StochRSI', studyKey: 'Stochastic RSI', studyVal: [10] },
      { value: 'RSI', studyKey: 'Relative Strength Index', studyVal: [10] },
      { value: 'CCI', studyKey: 'Commodity Channel Index', studyVal: [10] },
      { value: 'ATR', studyKey: 'Average True Range', studyVal: [10] },
      { value: 'SAR', studyKey: 'Parabolic SAR', studyVal: [10] },
      { value: 'DMI', studyKey: 'Directional Movement', studyVal: [10] },
      { value: 'ROC', studyKey: 'Rate Of Change', studyVal: [10] },
    ],
    sockets: {
      openorder: null, // 开仓
      closeorder: null, // 平仓
      modifyorder: null, // 修复订单
      openpendingorder: null, // 挂单socket连接
      price: null, // 实时报价socket连接
      klineprice: null, // K线 行情历史连接
      subklineprice: null, // k线 行情实时报价
      subposition: null, // 收取下单之后的更新通知
      md5Key: null, // md5加密 key值
    },
    userInfo: null,
    rc4Key: 'BAAKCAQEAok/zA3bLFtTKYbl1raidQNQguoKX', // '1ffds34hjf62kuykfsga8934dafnm'
  },
  actions,
  mutations,
  strict
})

export default store
