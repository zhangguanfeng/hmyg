/*
 * @Autor: Diskfan
 * @Date: 2019-09-07 18:36:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-07 19:06:20
 * @Description:
 */
import Observable from './observable';

const obs = new Observable(); // 暂时用vue作为观察者，待优化


// const o_socket = new WebSocket(window.SOCKET_ADDRESS)
let o_socket;
// 返回的数据
let requestPool = {};

// o_socket 是否已经连接上
let isConnect = false;

// 未连上之前的symbol存储在这里
const exchangeWaitingSymbol = new Set();
/**
 * 订阅交易对信息
 * @param symbol
 */
function subscriptionExchangeInfoData(symbol) {
  connectSocket(o_socket, symbol, () => {
    // console.log("send over")
  });
}

// 发送心跳包
let tt;
let lockReconnect = false;

export function createWebSocket() {
  try {
    o_socket = o_socket || new WebSocket(`${window.SOCKET_ADDRESS}/price`);
    init_socket();
  } catch (error) {
    reconnect();
  }
  return o_socket;
}

export function close () {
  if ( o_socket ) {
    try {
      o_socket.close();
    } catch (e) {}
  }
}
function reconnect() {
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  // 没连接上会一直重连，设置延迟避免请求过多 简易debounce
  tt && clearTimeout(tt);
  tt = setTimeout(() => {
    createWebSocket();
    lockReconnect = false;
  }, 1000 * 5);
}

function init_socket() {
  console.warn('---socket init---');
  o_socket.onopen = function () {
    isConnect = true;
    [...exchangeWaitingSymbol].forEach((symbol) => {
      subscriptionExchangeInfoData(symbol);
    });
    exchangeWaitingSymbol.clear();
    heartCheck.start();
  };
  o_socket.onmessage = function ({ data }) {
    heartCheck.reset();
    data = JSON.parse(data);
    const symbol = data.SYMBOL;
    if (requestPool[symbol] && requestPool[symbol].length > 0) {
      requestPool[symbol].forEach((fn) => {
        fn(data);
      });
    }
    obs.trigger(symbol, { data });
  };
  o_socket.onclose = function () {
    requestPool = {};
    isConnect = false;
    exchangeWaitingSymbol.clear();
    reconnect();
  };
  o_socket.onerror = function (err) {
    // console.log("error");
    // console.log(err);
    reconnect();
  };
}

let heartCheck = {
  timeout: 1000000000, // 10s
  timeoutObj: null,
  serverTimeoutObj: null,
  reset() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    this.start();
  },
  start() {
    const self = this;
    this.timeoutObj = setTimeout(() => {
      // o_socket.send(JSON.stringify({
      //   ping: 18212558000,
      // }));
      self.serverTimeoutObj = setTimeout(() => {
        o_socket.close(); // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout);
    }, this.timeout);
  },
};


/**
 * 发送链接
 * @param
 */

function connectSocket(socket, message, callback) {
  waitForConnection(socket, () => {
    socket.send(message);
    if (typeof callback !== 'undefined') {
      callback();
    }
  }, 1000);
}

function waitForConnection(socket, callback, interval) {
  if (socket.readyState === 1) {
    callback();
  } else {
    setTimeout(() => {
      waitForConnection(socket, callback, interval);
    }, interval);
  }
}

// 行情列表数据
export function subExchangeInfo(symbol, fn) {
  const symbolArr = symbol.split(',');
  symbolArr.forEach((item) => {
    (requestPool[item] || (requestPool[item] = [])).push(fn);
  });
  if (!isConnect) {
    exchangeWaitingSymbol.add(symbol);
  } else if (!exchangeWaitingSymbol.has(symbol)) {
    subscriptionExchangeInfoData(symbol);
  }
}

// 获取是否已经连接;
export function getIsConnect() {
  return isConnect;
}
