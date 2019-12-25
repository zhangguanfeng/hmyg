import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window {
    refreshData: (obj?: any) => void;
    closeWebView: ( obj?: any ) => void;
    openWebView: ( obj?: any ) => void;
    selectTabBar: ( obj?: any ) => void;
    getO: ( obj?: any ) => void;
    interfaceJump: ( obj?: any, msg?: any ) => void;
    log: ( arg?: any ) => void;
    SERVER_PATH: string;
    REQUEST_URL: string;
    wl_no: string;
    webkit: {
      messageHandlers: any
    };
    app: any,
    getAppInfo: ( arg: string ) => string | void;
    noticeAllWebViewController: (eventType?: string, arg?: any, key?: string, msgKey?: string) => void;
    receiveMessage: ( arg?: any, key?: string, msgKey?: string ) => void;
    onWebViewMessage: (eventType?: string, param?: any) => void;
    VueAwesomeSwiper: any;
    Image: any;
    SOCKET_ADDRESS: string;
    SOCKET_LIST: any;
    isIOS: boolean;
    isAndroid: boolean;
    receivePopMessage: ( type?: string ) => void;
    onCloseWebViewMessage: ( type?: string, arg?: any ) => void;
  }
}
