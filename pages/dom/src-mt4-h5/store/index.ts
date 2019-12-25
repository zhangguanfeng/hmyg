import Vue from 'vue';
import Vuex from 'vuex';
import Http from '@/common/axios';
import Util from '@/common/util';

Vue.use(Vuex);
interface IAPI {
  api_address: string;
  api_name: string;
}
export default new Vuex.Store( {
  state: {
    areaList: [],
    nationList: [],
    userInfo: null,
    sockets: {
      price: null,
    },
    token: null,
    socketAddrList: [],
    xhrAddrList: [],
  },
  mutations: {
    updateAreaList( state, val ) {
      state.areaList = val;
    },
    updateNationLIist( state, val ) {
      state.nationList = val;
    },
    updateUserInfo( state, value ) {
      state.token = value === null ? null : value.token;
      state.userInfo = value;
    },
    updateSocket( state: any, connect: any ) {
      state.sockets[connect.key] = connect.socket;
    },
    updateSocketAddrList( state, val ) {
      state.socketAddrList = val;
    },
    updateXhrAddrList( state, val ) {
      state.xhrAddrList = val;
    },
    updateToken( state, val ) {
      state.token = val;
    },
  },
  actions: {
    getAreaList( { rootState, commit } ) {
      if ( rootState.areaList.length ) {
        return;
      }
      Http.post( '/Home/getCellZd' ).then( ( res: any ) => {
        commit( 'updateAreaList', res.data || [] );
      } );
    },
    getNationList( { rootState, commit } ) {
      if ( !rootState.nationList.length ) {
        Http.post( 'CommonFun/getNation' ).then( ( res: any ) => {
          commit( 'updateNationLIist', res.data || [] );
        } );
      }
    },
    getUserInfo( { rootState, commit } ) {
      if ( rootState.userInfo !== null ) {
        return;
      }
      const token = Util.token();
      if (!token || !/\w+/.test(token + '') ) {
        return;
      }
      Http.post( 'CommonFun/getUserInfo' ).then( ( res: any ) => {
        Util.token( res.data.token );
        commit( 'updateUserInfo', res.data );
      } );
    },
    /**
     * 获取API列表
     * 上次使用的链接排到第一位
     * 默认的链接放到最后
     *
     * @param   {[type]}  {          [{ description]
     * @param   {[type]}  rootState  [rootState description]
     * @param   {[type]}  commit     [commit description]
     * @param   {[type]}  }          [ description]}
     *
     * @return  {[type]}             [return description]
     */
    getApiList( { rootState, commit } ) {
      const last: string|null = localStorage.getItem( 'last_socket_addr' );
      const detaultAddr: string = (window.SOCKET_ADDRESS + '/').replace(/\/+$/, '/');
      const lastXhr: string | null = localStorage.getItem( 'last_xhr_addr' );
      const detaultXhrAddr: string = ( window.SERVER_PATH + '/' ).replace( /\/+$/, '/' );
      let list: any = [];
      Http.post( 'Home/getApiList', {
        api_type: 1001,
      } ).then( ( res: any ) => {
        list = res.data.data || [];
      } ).catch().finally( () => {
        list.map( ( el: IAPI ) => {
          el.api_address += '/';
          el.api_address = el.api_address.replace( /\/+$/, '/' );
        } );
        const socket = list.filter( ( el: IAPI ) => /^ws(s?)\:\/\//.test( el.api_address ) )
            .map( ( el: IAPI ) => el.api_address );
        const xhr = list.filter( ( el: IAPI ) => /^http(s?)\:\/\//.test( el.api_address ) )
          .map( ( el: IAPI ) => el.api_address );
        if ( last && /^ws(s?)\:\/\//.test( last ) ) {
          const index = socket.indexOf( last );
          if ( index === -1 ) {
            socket.splice( index, 1 );
          }
          socket.unshift( last );
        }
        if (socket.indexOf(detaultAddr) === -1) {
          socket.push( detaultAddr );
        }
        if ( lastXhr && /^http(s?)\:\/\//.test( lastXhr ) ) {
          const index = xhr.indexOf( lastXhr );
          if ( index !== -1 ) {
            xhr.splice( index, 1 );
          }
          xhr.unshift( lastXhr );
        }
        if (xhr.indexOf(detaultXhrAddr) === -1) {
          xhr.push( detaultXhrAddr );
        }
        commit( 'updateSocketAddrList', socket );
        commit( 'updateXhrAddrList', xhr);
      });
    },
  },
  modules: {
  },
});
