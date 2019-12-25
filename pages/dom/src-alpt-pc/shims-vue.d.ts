import Vue from 'vue';
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}


declare module 'vue/types/vue' {
  interface Vue {
    '$util': {
      bindEvent: ( target: any, type: string, handle: (e?: any) => void ) => void;
      unBindEvent: (target: any, type: string, handle: () => void) => void;
      removeEvent: ( target: any, type: string, handle: ( e?: any ) => void ) => void;
      inputNumber: ( val: string ) => string;
      type: ( tag: any ) => string;
    };
    '$http': {
      get: ( url: string, params?: any, config?: any ) => Promise<void>;
      post: ( url: string, params?: any, config?: any ) => Promise<void>;
    }
    $log: ( arg?: any ) => void;
  }
}


