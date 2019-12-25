import Qs from 'qs';
import Router from './../router/index';
// -------是否在移动设备，兼容PC调试-----------
const u = navigator.userAgent;
const app = navigator.appVersion;
const isIos: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
const isAndroid: boolean = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
const type = ( tag: any ) => Object.prototype.toString.call( tag ).replace( /.*\s+|]/g, '' ).toLocaleLowerCase();
window.isIOS = isIos;
window.isAndroid = isAndroid;
// 打开H5页面回到客户端界面
window.openWebView = ( msg: any ) => {
  msg.query = msg.query || {};
  if (!msg.query['hideTitleBar']) {
    msg.query.hideTitleBar = '1';   // 0:用原声头部  1:用我们头部
  }
  const obj = {
    title: msg.title || '',
    url: msg.url ? msg.url : window.location.origin + `#/${msg.path}?${Qs.stringify( msg.query )}`,
  }
  if (isIos && window.webkit) {
    window.webkit.messageHandlers.openWebView.postMessage(JSON.stringify(obj));
  } else if (isAndroid && window.app.openWebView) {
    window.app.openWebView(JSON.stringify(obj));
  } else if (msg.url) {
    window.open(msg.url)
  } else {
    Router.push({
      name: msg.name,
      query: msg.query,
    });
  }
};

// 关闭H5页面回到客户端界面
window.closeWebView = () => {
  if (isIos && window.webkit) {
    window.webkit.messageHandlers.closeWebView.postMessage(''); // FIXME : 必须传个参数，否则ios报错，无法返回
  } else if (isAndroid && window.app.closeWebView) {
    window.app.closeWebView();
  } else {
    Router.go(-1)
  }
};
// 刷新token数据
window.refreshData = (obj: any): void => {
  if (isIos && window.webkit) {
    window.webkit.messageHandlers.refreshData.postMessage(JSON.stringify(obj));
  }
  if (isAndroid && window.app.refreshData) {
    window.app.refreshData(JSON.stringify(obj));
  }
};
// 跳转到指定tab页面
// {
//     "tabBarIndex":"0"
// }

// json字符串

// -1是表示当前tab页，跳到首页用0

window.selectTabBar = (obj: any): void => {
  if (isIos && window.webkit) {
    window.webkit.messageHandlers.selectTabBar.postMessage(JSON.stringify(obj));
  }
  if (isAndroid && window.app.selectTabBar) {
    window.app.selectTabBar(JSON.stringify(obj));
  }
};

// 跳转应用内页面

window.interfaceJump = (objAndroid: any, objIos: any) => {
  if (isIos && window.webkit) {
    window.webkit.messageHandlers.interfaceJump.postMessage(JSON.stringify(objIos));
  } else if (isAndroid && window.app.interfaceJump) {
    window.app.interfaceJump(JSON.stringify(objAndroid));
  }
};

// 获取token
window.getO = () => {
  let token = '';
  if (isIos && window.getO) {
    token = window.prompt('getO') || '';
  } else if (isAndroid && window.app.getO) {
    token = window.app.getO();
  }
  return token;
};

// 获取设备信息 (设备类型,版本号,设备号)
let dataAppInfo = '';
window.getAppInfo = (type: string): string => {
  if (isIos && window.prompt) {
    if (!dataAppInfo) {
      dataAppInfo = window.prompt('getAppInfo') || '';
    }
    const appType = dataAppInfo.split('-')[0];
    const appVersion: string = dataAppInfo.split('-')[1];
    const appDeviceCode: string = dataAppInfo.split('-')[2];
    switch (type) {
      case 'type':
        return appType === 'adr' ? 'android' : 'ios';
      case 'version':
        return appVersion;
      case 'device':
        return appDeviceCode;
    }
  } else if (isAndroid && window.app.getAppInfo) {
    if (!dataAppInfo) {
      dataAppInfo = window.app.getAppInfo();
    }
    const appType = dataAppInfo.split('-')[0];
    const appVersion: string = dataAppInfo.split('-')[1];
    const appDeviceCode: string = dataAppInfo.split('-')[2];
    switch (type) {
      case 'type':
        return appType === 'adr' ? 'android' : 'ios';
      case 'version':
        return appVersion;
      case 'device':
        return appDeviceCode;
    }
  } else {
    return '';
  }
  return '';
};
// 右滑关闭 webview 时候ios主动调用window方法，更新父级数据
window.receivePopMessage = (arg: string = '') => {
  let params: any = localStorage.getItem( 'pop_message_params' ) || '{}';
  const eventHandle: string | null = localStorage.getItem( 'pop_message_event_handle' );
  try {
    params = JSON.parse( params );
  } catch ( e ) {
    params = {};
  }
  if ( type( window.onCloseWebViewMessage ) === 'function' ) {
    setTimeout( () => {
      window.onCloseWebViewMessage( eventHandle || arg, params );
    }, 100 );
  }
  // localStorage.removeItem( 'pop_message_params' );
  // localStorage.removeItem( 'pop_message_event_handle' );
};
// 接搜通过 ios noticeAllWebViewController 发送过来的通知
window.receiveMessage = ( arg: any = '', key: string = 'message_key', msgKey: string = 'message_type' ) => {
  let param: any = localStorage.getItem( key );
  if (param) {
    const msgType = localStorage.getItem(msgKey);
    if (type) {
      switch (msgType) {
        case 'object':
          try {
            param = JSON.parse(param);
          } catch ( e ) { };
          break;
        case 'number':
          param = +param;
          break;
        case 'string':
          param = param + '';
          break;
        default:
          break;
      }
    }
  }
  arg = arg ? 'sys' : '';
  const eventHandle = localStorage.getItem( 'eventHandle' ) || arg;
  if ( type( window.onWebViewMessage ) === 'function' ) {
    setTimeout( () => {
      window.onWebViewMessage( eventHandle, param );
    }, 100 );
  }
  localStorage.removeItem(key);
  localStorage.removeItem( msgKey );
  localStorage.removeItem( 'eventHandle' );
};

window.noticeAllWebViewController = ( eventType: string = '', arg?: any, key: string = 'message_key', msgKey = 'message_type' ) => {
  if (type(arg) === 'object' || type(arg) === 'array') {
    localStorage.setItem(key, JSON.stringify(arg));
    localStorage.setItem( msgKey, 'object' );
  } else if (type(arg) === 'string' || type(arg) === 'number') {
    localStorage.setItem(key, arg);
    localStorage.setItem(msgKey, type(arg));
  } else {
    try {
      localStorage.setItem(key, arg);
    } catch ( e ) {

    };
  }
  localStorage.setItem( 'eventHandle', eventType );
  try {
    localStorage.setItem('receiveMessage',  'noticeAllWebViewController' );
    if ( isIos ) {
      window.webkit.messageHandlers.noticeAllWebViewController.postMessage( '' );
    } else if ( isAndroid ) {
      window.app.postMessage('');
    }
  } catch ( e ) {
    localStorage.setItem( 'receiveMessage', 'error' );
  }
};
