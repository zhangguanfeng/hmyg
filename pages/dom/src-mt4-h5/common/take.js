/**
 * @ Author 
 * @ Create Time -10-26 14  
 * @ Modified by  name
 * @ Modified time -10-28 14  
 * @ Description: 首页实时报价封装
 */
import Store from '@/store';
import { throws } from 'assert';
export default class Take {
  socket = null;
  addrIndex = 0;
  lockReconnect = false;
  socketAddrs = [];
  timmer = null;
  heartBeatTimmer = null;
  currentSymble = null;
  constructor( options = {} ) {
    this.socketAddrs = Store.state.socketAddrList;
    if ( !this.socketAddrs.length ) {
      setTimeout( () => {
        this.constructor(options)
      }, 10 );
      return;
    }
    this.onmessage = options.onmessage || ( () => void 0 );
    this.onopen = options.onopen || ( () => void 0 );
    this.onclose = options.onclose || ( () => void 0 );
    this.setHeartBeat();
    this.createWebSocket();
  };
  setHeartBeat () {
    clearTimeout( this.heartBeatTimmer );
    this.heartBeatTimmer = setTimeout( () => {
      this.sendMessage(this.currentSymble);
      if ( this.socket && this.socket.readyState === 1 ) {
        this.setHeartBeat();
      }
    }, 30000 );
  }
  sendMessage ( message, callback = () => void 0 ) {
    this.waitForConnection( () => {
      if ( this.socket ) {
        if ( message !== 'ping' ) {
          this.currentSymble = message;
        }
        this.socket.send( message );
      }
      callback();
    }, 1000);
  };
   onmessage() {
    return;
  };
   onopen() {
    return;
  };
   onclose() {
    return;
  };
   close() {
    if ( this.socket ) {
      this.socket.close();
    }
    Store.commit( 'updateSocket', {
      key: 'price',
      socket: this.socket ,
    } );
  };
  createWebSocket() {
    const connect = Store.state.sockets.price;
    if (connect) {
      this.socket = connect;
      this.initSocket();
      return connect;
    }
    try {
      const addr = this.socketAddrs[this.addrIndex];
      if ( !addr ) {
        return false;
      }
      this.socket = new WebSocket( `${addr}price` );
      this.socket.onerror = () => {
        this.createWebSocket();
      }
      Store.commit( 'updateSocket', {
        key: 'price',
        socket: this.socket,
      } );
      this.initSocket();
      localStorage.setItem( 'last_socket_addr', addr );
      this.addrIndex++;
    } catch (error) {
      this.reconnect();
    }
    return this.socket;
  };
  reconnect() {
    if (this.lockReconnect) {
      return this.socket;
    }
    this.lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多 简易debounce
    clearTimeout( this.timmer );
    this.timmer = setTimeout(() => {
      this.createWebSocket();
      this.lockReconnect = false;
    }, 1000 * 5);
  };
  initSocket() {
    if ( !this.socket ) {
      return;
    }
    this.socket.onopen = this.onopen;
    this.socket.onmessage = ( { data }  ) => {
      this.onmessage( JSON.parse( data) );
    };
    this.socket.onclose = this.onclose;
    this.socket.onerror =  (err) => {
      this.reconnect();
    };
  };
  waitForConnection ( callback = () => {}, interval  = 100) {
    if (this.socket && this.socket.readyState === 1) {
      callback();
    } else {
      setTimeout(() => {
        this.waitForConnection(callback, interval);
      }, interval);
    }
  }
}
