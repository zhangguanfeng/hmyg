import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  interface Window {
    SERVER_PATH: string;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $util: {
      dateFormat: ( date: Date | string | null | void, fmt: string) => string;
      autoImgSize: ( imgwidth: number, imgheight: number, rewidth: number, reheight: number ) => { width: number, height: number };
      type: ( tag: any ) => string;
      token: (session: string | null | void, key?: string) => string | null,
      ramdonString: () => string;
      md5: ( tag: string | number ) => string;
      readImgFileAsbase64: ( file: File ) => string;
      isBase64Img: ( tag: string ) => boolean;
      floatNumber: (target: number | string) => string;
      bindEvent: (target: any, type: string, handle: (e?: MouseEvent) => void) => void;
      removeEvent: (target: any, type: string, handle: (e?: MouseEvent) => void) => void;
      userInfo: (target?: any) => any;
    };
    $http: {
      get: ( url: string, params?: any, config?: any ) => Promise<void>;
      post: ( url: string, params?: any, config?: any ) => Promise<void>;
    }
    $get: ( url: string, params?: any, config?: any ) => Promise<void>;
    $post: ( url: string, params?: any, config?: any ) => Promise<void>;
    $log: ( arg?: any ) => void;
    page: number,
    rows: number;
    total: number;
  }
}
