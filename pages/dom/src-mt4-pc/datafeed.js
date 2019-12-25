/*
 * @Autor: Diskfan
 * @Date: 2019-09-07 18:36:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-26 11:58:02
 * @Description:
 */
/**
 * 我打算尝试用websocket实现数据源
 * */
import Store from '@/store';
import { dateFormat, type } from '@/common/util.js';
export const Datafeeds = {};

let resoled = false;
// Datafeeds.UDFCompatibleDatafeed = function ( symbol, precision, updateFrequecy ) {
Datafeeds.UDFCompatibleDatafeed = function () {
  this.loading = false;
  this.msgId = '';
  resoled = false;
  this.pingTimmer = null;

  Store.widgetOptions = Store.widgetOptions || {};
  Store.backData = {}; // 对历史报价数据的备份, 保留基本数据，不保留字段
  Store.dataKey = []; // 数据字段

  // 用于临时存储回调函数
  this.dataCallBacks = {
    barHistoryBack: () => { },
    barRealtimeCallBack: () => { },
    onErrorCallback: () => { },
    onResetCacheNeededCallback: () => { },
  };
  let _ws = Store.state.hisklineprice;
  let _subws = Store.state.subklineprice;
  if ( !_ws ) {
    _ws = new WebSocket( `${SOCKET_ADDRESS}hisklineprice` );
    Store.commit( 'updateSocketConnection', {
      key: 'hisklineprice',
      socket: _ws
    })
  }
  if ( !_subws ) {
    _subws = new WebSocket( `${SOCKET_ADDRESS}subklineprice` );
    Store.commit( 'updateSocketConnection', {
      key: 'subklineprice',
      socket: _subws
    })
  }
  this._ws = _ws; //  历史记录
  this._subws = _subws; //  实时数据
  // this._ws.binaryType = "arraybuffer";
  this._ws.onopen = function onWsOpen() {
    // console.log("onopen:")
  };
  this._subws.onopen = function onWsOpen() {
    // console.log("onopen:")
  };
  this._ws.onclose = onWsClose;
  this._subws.onclose = onWsClose;
  this._ws.onerror = onWsError;
  this._subws.onerror = onWsError;
  this._ws.onmessage = event => {
    const options = Store.widgetOptions;
    if ( this.msgId !== options.id ) {
      return;
    }
    const _time_start = +new Date();
    this.loading = false;
    if ( type( event.data ) === 'array' ) {
      const data = event.data.filter( el => !isNaN( el.time ) );
      data.sort( ( a, b ) => a.time - b.time );
      options.setOptions( options.id, `allData.${options.resolution}`, data );
      options.setOptions( options.id, 'noData', data.length === 0 );
      this.dataCallBacks.barHistoryBack( data, {
        noData: false
      } );
      setTimeout( () => {
        const _desc = +new Date() - _time_start;
        console.info('cache _desc -> ', _desc)
      }, 0 );
      return
    }
    if ( !event.data ) {
      return;
    }
    const data = JSON.parse( event.data ).KLINEDATA || [];
    options.lastSendTime = null;
    if ( data.length > 0 ) {
      let arr = [];
      let backData = [];
      for ( let i = 0; i < data.length; i++ ) {
        const index = arr.push( {
          open: +(data[i].OPEN), // 开盘价
          high: +(data[i].HIGH), // 最高价
          low: +(data[i].LOW), // 最低价
          close: +(data[i].CLOSE), // 收盘价
          time: +(data[i].TIMESTAMP) * 1000, // 时间
        } );
        backData.push( Object.values( arr[index - 1] ) );
      }
      if ( !Store.dataKey.length ) {
        Store.dataKey = Object.keys(arr[0]);
      }
      arr.sort( ( a, b ) => a.time - b.time );
      options.setOptions( options.id, `allData.${options.resolution}`,  [...(options.allData[options.resolution]), ...arr]);
      options.setOptions( options.id, 'noData', arr.length === 0 );
      this.dataCallBacks.barHistoryBack( arr, {
        noData: false,
      } );
      Store.backData[options.symbol] = Store.backData[options.symbol] || {};
      Store.backData[options.symbol][options.resolution] = Store.backData[options.symbol][options.resolution] || [];
      Store.backData[options.symbol][options.resolution] = [...Store.backData[options.symbol][options.resolution], ...backData];
      setTimeout( () => {
        const _desc = +new Date() - _time_start;
        console.info('_desc -> ', _desc)
      }, 0 );
    } else {
      this.dataCallBacks.barHistoryBack( [], {
        noData: true
      } );
    }
  };
  
  this._subws.onmessage = ( event ) => {
    const parse = JSON.parse( event.data ) || {};
    const data = {
      open: +parse.OPEN,
      high: +parse.HIGH,
      low: +parse.LOW,
      time: +(parse.TIMESTAMP) * 1000,
      close: +parse.CLOSE,
    }
    this.dataCallBacks.barRealtimeCallBack( data );
    const options = Store.widgetOptions
    options.setOptions( options.id, `allData.${options.resolution}`, [...( options.allData[options.resolution] ), Object.assign( {}, data)]);
  };
};
Datafeeds.UDFCompatibleDatafeed.crossHairMoved = function () {
  console.log('crossHairMoved', arguments)
}
Datafeeds.UDFCompatibleDatafeed.prototype.loadData = function () {
  console.log('loadData')
  const { widgetOptions } = Store;
  const { widget } = widgetOptions;
  const { resolution } = widgetOptions;
  if ( widget ) {
    const chart = widget.chart();
    chart.resetData();
    chart.setResolution( resolution );
  }
  const data = Store.backData[widgetOptions.symbol][widgetOptions.resolution];
  if ( data.length ) {
    const { dataKey } = Store;
    const fetchData = [];
    for ( let i in data ) {
      const tmp = {};
      dataKey.forEach( ( el, idx ) => tmp[el] = data[i][idx] );
      fetchData.push(tmp)
    }
    this.dataCallBacks.barHistoryBack( fetchData, {
      noData: false
    } );
  } else {
    this.sendHistoryMessage();
  }
  this.sendTakeMessage();
};
Datafeeds.UDFCompatibleDatafeed.onSymbolChanged = function () {
  console.log('onSymbolChanged')
}
/**
 * 修改当前活动的窗口,Store.widgetOptions 只允许读取数值，不得修改任何属性
 @params Store.widgetOptions 当前窗口的配置
 */
Datafeeds.UDFCompatibleDatafeed.prototype.changeWidget = function ( _options ) {
  this.loading = false;
  this.msgId = _options.id;
  resoled = false;
  Store.widgetOptions = _options;
  Store.widgetOptions.datafeed._symbolInfo = _options.symbol;
  Store.widgetOptions.datafeed._resolution = _options.resolution;
  this._currentSymbol = _options.symbol;
}
function onWsClose() {
  // console.log("wxdatafeed______close");
}

function onWsError() {
  // console.log("close");
}
/**
 * 获取历史数据
 */
Datafeeds.UDFCompatibleDatafeed.prototype.sendHistoryMessage = function ( fromDate, toDate, callback ) {
  // 直接发送对象数据
  const options = Store.widgetOptions;
  const resolution = parseInt( options.resolution, 10 );
  const { backData } = Store;
  const data = backData[options.symbol]
    && backData[options.symbol][resolution]
    && backData[options.symbol][resolution].length
    && backData[options.symbol][resolution]
    || [];
  // if ( data.length && options.setHistory !== null ) {
  //   console.log(options.symbol, 'options.setHistory', options.setHistory, data.length)
  //   const { dataKey } = Store;
  //   const fetchData = [];
  //   const times = [];
  //   for ( let i in data ) {
  //     const tmp = {};
  //     dataKey.forEach( ( el, idx ) => tmp[el] = data[i][idx] );
  //     times.push( tmp.time );
  //     fetchData.push( tmp );
  //   }
  //   const startTime = Math.max( ...times );
  //   const endTime = Math.min( ...times );
  //   const loaded = Math.floor( ( startTime - endTime ) / ( resolution * 60 * 1000 ) );
  //   options.setOptions( options.id, 'start', loaded + 1 );
  //   const reduce = Math.ceil( ( +new Date() - startTime ) / ( resolution * 1000 * 60 ) );
  //   // 切回来之后缺少的起始根数
  //   if( reduce > 1 ) {
  //     this.loading = true;
  //     const message = {
  //       SYMBOL: options.symbol, // 品种类型
  //       PERIOD: resolution.toString(), // k线类型(详见注解)
  //       START: '1', // 起始根数
  //       END: reduce.toString(), // 结束根数
  //     };
  //     this.send( message );
  //   }
    
  //   options.setOptions( options.id, 'setHistory', null );
  //   fetchData.sort( ( a, b ) => a.time - b.time );
  //   // this.dataCallBacks.barHistoryBack( fetchData, {
  //   //   noData: false
  //   // } );
  //   return;
  // }
  console.info(options.symbol, 'options.setHistory')

  let start = options.start + 1; // 开始柱
  let end = options.start + Store.state.takeSize; // 结束柱
  if ( options.reset !== null ) {
    start = 1;
    let end = options.start + Store.state.takeSize; // 结束柱
    const reduceTime = fromDate - Store.state.takeSize * resolution;
    options.setOptions( options.id, 'endLoadDate', reduceTime );
    options.setOptions( options.id, 'isFirstLoad', false );
    options.setOptions( options.id, 'start', end );
  } else {
    const reduceTime = options.startLoadDate - Store.state.takeSize * resolution;
    options.setOptions( options.id, 'endLoadDate', reduceTime );
    options.setOptions( options.id, 'isFirstLoad', false );
    options.setOptions( options.id, 'start', end );
  }
  options.setOptions( options.id, 'reset', null );
  this.loading = true;
  const message = {
    SYMBOL: options.symbol, // 品种类型
    PERIOD: resolution.toString(), // k线类型(详见注解)
    START: start.toString(), // 起始根数
    END: end.toString(), // 结束根数
  };
  this.send( message );
};
/**
 * 发送订阅相关数据
 */
Datafeeds.UDFCompatibleDatafeed.prototype.sendTakeMessage = function ( target = true ) {
  clearTimeout( this.pingTimmer );
  const message  = {
    SYMBOL: Store.widgetOptions.symbol, // 品种类型
    PERIOD: Store.widgetOptions.resolution, // k线类型
    SUBSCRIBE: '1', // 订阅类型(1：订阅，0：取消订阅)
  };
  if ( target === false ) {
    message.SUBSCRIBE = '0';
  }
  this.waitForConnection( '_subws', () => {
    this._subws.send( JSON.stringify( message ) );
    // 设置心跳
    this.pingTimmer = setTimeout( () => {
      this.sendTakeMessage();
    }, 30000 );
  }, 100)
};
Datafeeds.UDFCompatibleDatafeed.prototype.send = function ( message ) {
  this.waitForConnection( '_ws', () => {
    Store.widgetOptions.datafeed._ws.send( JSON.stringify( message ) );
    if (typeof callback !== 'undefined') {
      callback();
    }
  }, 100 );
};
Datafeeds.UDFCompatibleDatafeed.prototype.waitForConnection = function ( wsName, callback, interval = 100 ) {
  const ws = this[wsName];
  // console.log('waitForConnection', 4, 'dataFeeds._ws.readyState', ws.readyState);
  if ( ws.readyState === 1 ) callback();
  else setTimeout( () => { this.waitForConnection(wsName, callback, interval) }, interval );
};

/**
 * 构造默认配置
 *     {"supports_search":true,"supports_group_request":false,"supports_marks":true,
 *     "supports_timescale_marks":true,"supports_time":true,
 *     "exchanges":[{"value":"","name":"All Exchanges","desc":""},
 *     {"value":"NasdaqNM","name":"NasdaqNM","desc":"NasdaqNM"},
 *     {"value":"NYSE","name":"NYSE","desc":"NYSE"},
 *     {"value":"NCM","name":"NCM","desc":"NCM"},
 *     {"value":"NGM","name":"NGM","desc":"NGM"}],
 *     "symbols_types":[{"name":"All types","value":""},
 *     {"name":"Stock","value":"stock"},
 *     {"name":"Index","value":"index"}],
 *     "supported_resolutions":["D","2D","3D","W","3W","M","6M"]}
 */
function defaultConfig() {
  return {
    supports_search: false,
    supports_group_request: false,
    supports_marks: false,
    supports_timescale_marks: false,
    supports_time: true,
    pricescale: 10000000,
    exchanges: [{
      value: '',
      name: 'All Exchanges',
      desc: '',
    }, {
      value: 'NasdaqNM',
      name: 'NasdaqNM',
      desc: 'NasdaqNM',
    }, {
      value: 'NYSE',
      name: 'NYSE',
      desc: 'NYSE',
    }, {
      value: 'NCM',
      name: 'NCM',
      desc: 'NCM',
    }, {
      value: 'NGM',
      name: 'NGM',
      desc: 'NGM',
    }],
    symbols_types: [{
      name: 'All types',
      value: '',
    }, {
      name: 'Stock',
      value: '',
    }, {
      name: 'Index',
      value: '',
    }],
    supportedResolutions: Store.state.supportedResolutions
  };
}

/**
 * onready 方法
 * @param callback
 */
Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function (callback) {
  return setTimeout( () => {
    callback(defaultConfig())
  }, 0)
};
/**
 * 搜索交易对
 * @param searchString
 * @param exchange
 * @param type
 * @param onResultReadyCallback
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.searchSymbols = function (searchString, exchange, type, onResultReadyCallback) {
  // console.log("searchSymbols");
};

/**
 * {"name":"AAPL","exchange-traded":"NasdaqNM","exchange-listed":"NasdaqNM",
 * "timezone":"America/New_York","minmov":1,"minmov2":0,"pointvalue":1,
 * "session":"0930-1630","has_intraday":false,"has_no_volume":false,
 * "description":"Apple Inc.","type":"stock",
 * "supported_resolutions":["D","2D","3D","W","3W","M","6M"],
 * "pricescale":100,"ticker":"AAPL","base_name":["AAPL"],"legs":["AAPL"],
 * "exchange":"NasdaqNM","full_name":"NasdaqNM:AAPL",
 * "pro_name":"NasdaqNM:AAPL","data_status":"streaming"}
 */
function defaultSymbolInfo(datafeed) {
  return {
    // name: datafeed._currentName,
    name: Store.widgetOptions.symbol || 'currentName', // 暂无发现相关设置的地方
    timezone: 'Asia/Shanghai',
    minmov: 1,
    minmov2: 0,
    pointvalue: 6,
    session: '24x7',
    has_intraday: true,
    has_no_volume: false,
    type: 'bitcoin',
    supported_resolutions: Store.state.supportedResolutions,
    // eslint-disable-next-line no-restricted-properties
    pricescale: Math.pow(10, Store.widgetOptions.precision),
    // ticker: datafeed._currentName,
    ticker: Store.widgetOptions.symbol,
    exchange: 'CPT',
    data_status: 'streaming',
  };
}

/**
 *
 * 当需要根据交易对的名字获得交易对的详细信息的时候调用
 * @param symbolName
 * @param onSymbolResolvedCallback
 *
 * @param onResolveErrorCallback
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function ( symbolName, onSymbolResolvedCallback, onResolveErrorCallback ) {
  // if ( resoled ) {
  //   return;
  // }
  // resoled = true;
  // this.sendHistoryMessage();
  return setTimeout( () => {
    this.sendTakeMessage();
    onSymbolResolvedCallback( defaultSymbolInfo( this ) );
  })
  
  // console.log(defaultSymbolInfo(that))
  // const that = this;
  // setTimeout(() => {
  //   onSymbolResolvedCallback(defaultSymbolInfo(that));
  // }, 0);
};

/**
 *
 * @param symbolInfo
 * @param resolution
 * @param from
 * @param to
 * @param onHistoryCallback
 * @param onErrorCallback
 * @param firstDataRequest 是否是第一次加载数据,第一次加载数据的时候，可以忽略to
 *
 * {time, close, open, high, low, volume}
 *
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function ( symbolInfo, resolution, fromDate, toDate, onHistoryCallback, onErrorCallback, firstDataRequest ) {
  Store.widgetOptions.setOptions( Store.widgetOptions.id, 'isFirstLoad', firstDataRequest );
  this.dataCallBacks.barHistoryBack = onHistoryCallback;
  this.dataCallBacks.onErrorCallback = onErrorCallback;
  this.sendHistoryMessage( fromDate, toDate );
};
/**
 * Charting Library calls this function when it wants to receive real-time updates for a symbol.
 * The Library assumes that you will call onRealtimeCallback
 * every time you want to update the most recent bar or to add a new one.
 * @param symbolInfo
 * @param resolution
 * @param onRealtimeCallback
 * @param listenerGUID
 * @param onResetCacheNeededCallback
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function ( symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback ) {
  this.dataCallBacks.onResetCacheNeededCallback = onResetCacheNeededCallback;
  Store.widgetOptions.listenerGUID = listenerGUID;
  this.sendTakeMessage();
  // console.log( 'subscribeBars', arguments );
  // this.dataCallBacks.barRealtimeCallBack = onRealtimeCallback;
};

/**
 * Charting Library calls this function when it doesn't want to
 * receive updates for this subscriber any more. subscriberUID
 * will be the same object that Library passed to subscribeBars before.
 * @param listenerGUID
 */
Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGUID) {
  // const stamp = 'min';
  // const _resolution = this._current_resolution;

  // this.sendTakeMessage(this, JSON.stringify({
  //   SYMBOL: Store.widgetOptions.symbol, // 品种
  //   SUBSCRIBE: '0', // 订阅类型(1：订阅，0：取消订阅)
  // }));
};
/**
 * Charting Library calls this function when it is going to request
 * some historical data to give you an ability to override the amount of bars requested.
 * @param period
 * @param resolutionBack
 * @param intervalBack
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function (period, resolutionBack, intervalBack) {
  // eslint-disable-next-line max-len
  // console.log("calculateHistoryDepth:period" + period + "resolutionBack:" + resolutionBack + "intervalBack:" + intervalBack);
};
/**
 * 当需要支持点击弹出提示的时候用到
 * @param symbolInfo
 * @param rangeStart
 * @param rangeEnd
 * @param onDataCallback
 * @param resolution
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.getMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
  // console.log("getMarks");
  console.log('getMarks')
};
/**
 * 点击事件提示的时候用到
 * @param symbolInfo
 * @param rangeStart
 * @param rangeEnd
 * @param onDataCallback
 * @param resolution
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.getTimescaleMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
  // eslint-disable-next-line max-len
  // console.log("getTimescaleMarks:symbolInfo" + symbolInfo + "rangeStart:" + rangeStart + "rangeEnd:" + rangeEnd);
};
/**
 * 获取服务器时间
 * @param callback
 */
Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function (callback) {
  const timestamp = new Date().getTime();
  callback(timestamp);
  // console.log("getServerTime:" + timestamp);
};
/**
 * 报价信息
 * @param symbols
 * @param onDataCallback
 * @param onErrorCallback
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.getQuotes = function (symbols, onDataCallback, onErrorCallback) {
  console.log("getQuotes");
};
/**
 * 订阅报价信息
 * @param symbols
 * @param fastSymbols
 * @param onRealtimeCallback
 * @param listenerGUID
 */
// eslint-disable-next-line max-len
Datafeeds.UDFCompatibleDatafeed.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGUID) {
  console.log("subscribeQuotes");
};
/**
 * 解除报价订阅
 * @param listenerGUID
 */
Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeQuotes = function (listenerGUID) {
  console.log("listenerGUID");
};

function fmtDate(timestamp) {
  const time = new Date(timestamp);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  // eslint-disable-next-line no-use-before-define
  return `${year}-${add0(month)}-${add0(date)} ${add0(hours)}:${add0(minutes)}:${add0(seconds)}`;
}

function add0(m) {
  return m < 10 ? `0${m}` : m;
}

