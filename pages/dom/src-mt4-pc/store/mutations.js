/**
 *  Created by   阿紫
 *  On  2019-02-19
 *  Content
 */
export const updateLoadingStatus = (state, payload) => {
  state.isLoading = payload.isLoading;
};

export const updateListAsset = (state, payload) => {
  state.totalAsset = payload;
};
/**
 * 登录成功后更新账户信息
 */
export const updateUserInfo = (state, payload) => {
  state.userInfo = payload;
};

export const setKLineDataFeed = (state, payload) => {
  state.kLineDataFeed = payload;
};

export const updateSocketConnection = ( state, val ) => {
  state.sockets[val.key] = val.socket;
};
// 设置md5Key值
export const setMd5Key = ( state, val ) => {
  state.md5Key = val;
};

export const updateFullWindow = ( state, val ) => {
  state.fullWindow = val;
};

// 保存k线历史数据
export const updateKLineHistoryData = ( state, val ) => {
  state.kLineHistoryData = val;
};

// 保存分割数据排序
export const updateSplitKey = ( state, val ) => {
  state.splitKey = val;
};

// 所有货币对信息, 只有页面不在行情才更新该数据
export const updateAllSymbolsInfo = ( state, val ) => {
  state.allSymbolsInfo = val;
};

// 更新账户类型
export const updateCptAccountType = ( state, val ) => {
  state.cptAccountType = val;
};
// 更新账户
export const updateAccount = ( state, val ) => {
  state.account = val;
};
// 更新 kline 图
export const updateWidget = ( state, val ) => {
  state.widget = val;
};
// 更新持仓 挂单数据
export const updateOrderData = ( state, val ) => {
  state.orderData = val;
};

// 显示隐藏登录弹窗
export const toogleLoginDialog = ( state, val ) => {
  state.showLoginDialog = val;
};

// 更新区域列表
export const updateAreaCodeList = ( state, val ) => {
  state.areaCodeList = val;
};