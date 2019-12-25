/*
 * @Autor: Diskfan
 * @Date: 2019-09-16 18:50:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-17 14:22:47
 * @Description:
 */
/**
 *  Created by   阿紫
 *  On  2019-02-19
 *  Content
 */
import { $http } from '@/plugins/axios';
import { token } from '@/common/util.js';
import Vue from 'vue'

const { Datafeeds } = require( '@/datafeed.js' );
// let resolve = null;
// let reject = null;
// const promsie = new Promise((_resolve, _reject) => {
//   resolve = _resolve;
//   reject = _reject;
// });

export const createKLineDataFeed = ({ state, commit }) => {
  if ( state.kLineDataFeed ) return;
  commit( 'setKLineDataFeed', new Datafeeds.UDFCompatibleDatafeed() );
}

// 获取md5Key值
export const getMd5Key = ({ state, commit }) => {
  if(state.md5Key) return;
  return $http.post('/Panel/getWlKey').then((res) => {
    const { key } = res.data;
    commit('setMd5Key', key);
  })
};

export const getUserInfo = ( { state, commit } ) => {
  const session = token();
  if ( !session ) {
    return;
  }
  Vue.prototype.$http.get( 'CommonFun/getUserInfo' ).then( res => {
    const { data } = res;
    commit( 'updateUserInfo', data );
  } );
}

// 获取区域列表
export const getAreaCodeList = ( { state, commit } ) => {
  if ( state.areaCodeList.length ) {
    return;
  }
  Vue.prototype.$http.get( 'Home/getCellZd' ).then( res => {
    const { data } = res;
    commit( 'updateAreaCodeList', data );
  } );
};
