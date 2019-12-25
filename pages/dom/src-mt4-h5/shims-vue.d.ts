import Vue from 'vue';
import Router from 'vue-router';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.tsx' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    '$util': {
      token: ( session: string | null | void, key?: string ) => string | null;
      userInfo: ( info?: any, key?: string) => string | null;
      type: ( tag: any ) => void;
      log: ( msg: any ) => void;
      locale: ( language?: string ) => void;
      webViewName: ( session: string | null | void, key?: string ) => string | null;
      autoImgSize: ( imgwidth: number, imgheight: number, rewidth: number, reheight: number ) => { width: number, height: number };
    };
    '$http': {
      get: ( url: string, params?: any, config?: any ) => Promise<void>;
      post: ( url: string, params?: any, config?: any ) => Promise<any>;
    }
    $log: ( arg?: any ) => void;
    $router: Router
  }
}
declare function VueAwesomeSwiper(): void;
// declare module 'VueAwesomeSwiper';
declare module 'md5';
declare module 'router/index';
