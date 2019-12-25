/**
 * @ Author: Your name
 * @ Create Time: 2019-10-16 16:01:04
 * @ Modified by: Your name
 * @ Modified time: 2019-11-21 13:48:58
 * @ Description: 下单 长连接
 */

import Store from '@/store';
import { type } from '@/common/util.js';
import { Notification } from 'element-ui';

export default class OrderSocket {
	lockReconnect = false;
  timmer = null;
  duration = 30000; // 30s 一次心跳
  sockets = {
    openorder: null, // 开仓
    closeorder: null, // 平仓
    modifyorder: null, // 修复订单
    openpendingorder: null, // 挂单socket连接
    deletependingorder: null, // 删除挂单socket连接
    modifypendingorder: null, // 修改挂单
    subposition: null, // 收取下单后的通知
  };
  constructor( options = {} ) {
    this.onmessage = options.onmessage || ( () => { } );
    // this.onmessage = () => {
    //   console.log( 'orp', options );
    //   ( options.onmessage || ( () => { } ) )();
    // }
		this.onopen = options.onopen || ( () => { } );
    this.onclose = options.onclose || ( () => { } );
    this.onerror = options.onerror || ( () => { } );
    this.createWebSocket();
  }
  getStatus ( connect ) {
    if ( typeof connect === 'string' ) {
      return !!(this.sockets[connect].readyState === 1);
    }
    return connect.readyState === 1;
  }
  // 统一发送数据
  sendMessage ( message, socketName ) {
    if ( type( message ) === 'object' ) {
      message = JSON.stringify( message );
    }
    return new Promise( ( resole = () => void 0, reject = () => void 0) => {
      const connect = Store.state.sockets[socketName];
      connect.onmessage = ( { data } ) => {
        try {
          data = JSON.parse( data );
        } catch ( e ) {
          console.error(e)
        }
        let text = '';
        const { ERRORCODE } = data;
        switch (+ERRORCODE) {
          case 0:
            resole(data)
            break;
          case 3:
            text = '交易参数出错';
            reject(data);
            break;
          default:
            text = '交易出错';
            reject(data);
        }
        if(text) {
          Notification({
            type: 'error',
            title: '请求错误',
            message: text,
            duration: 5000
          })
        }
      }
      this.waitForConnection(connect, () => {
        connect.send(message);
      }, 1000);
    } );
  }
  openorderSendmessage ( message) {
    return this.sendMessage( message, 'openorder' );
  }
  closeorderSendmessage ( message) {
    return this.sendMessage( message, 'closeorder' );
  }
  modifyorderSendmessage ( message ) {
    return this.sendMessage( message, 'modifyorder' );
  }
  openpendingorderSendmessage ( message) {
    return this.sendMessage( message, 'openpendingorder' );
  }
  deletependingorderSendmessage ( message) {
    return this.sendMessage( message, 'deletependingorder' );
  }
  modifypendingorderSendmessage ( message) {
    return this.sendMessage( message, 'modifypendingorder' );
  }
  subpositionSendmessage ( message) {
    return this.sendMessage( message, 'subposition' );
  }
  createWebSocket ( key = null ) {
    const sockets = Store.state.sockets;
    for ( const i in this.sockets ) {
      if ( key !== null && key !== i ) continue;
      let connect = sockets[i]
      if ( connect ) continue;
      connect = connect && connect.readyState === 1 && connect || new WebSocket( `${window.SOCKET_ADDRESS}${i}` );
      connect.handle = i;
      connect.onopen = e => {
        e.handle = i
        this.onopen(e)
      }
      connect.onclose = e => {
        e.handle = i
        this.onclose(e)
      }
      connect.onmessage = ( { data } ) => {
        try {
          data = JSON.parse( data );
          data.handle = i;
          // i 句柄
          this.onmessage( data );
        } catch ( e ) {
          console.error(e)
        }
      }
      connect.onerror = e => {
        e.handle = i
        this.onerror(e)
      }
      this.sockets[i] = connect;
      Store.commit( 'updateSocketConnection', {
        key: i,
        socket: connect
      } );
    }
	}

	waitForConnection(socket, callback, interval = 100) {
		if (socket.readyState === 1) {
			callback();
    } else {
      this.createWebSocket(socket.handle);
			setTimeout(() => {
				this.waitForConnection(socket, callback, interval);
			}, interval);
		}
	}
}


