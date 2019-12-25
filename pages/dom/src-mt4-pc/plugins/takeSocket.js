/*
 * @Autor: Diskfan
 * @Date: 2019-09-07 18:36:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-25 11:13:03
 * @Description: 实时报价socket封装
 */
// import Observable from './observable';
import Store from '@/store'
export default class TakeSocket {
	socket = null;
	lockReconnect = false;
	timmer = null;
	pingTimmer = null;
	message = '';
	constructor( options = {} ) {
		this.onmessage = options.onmessage || ( () => { } );
		this.onopen = options.onopen || ( () => { } );
		this.onclose = options.onclose || ( () => { } );
		this.createWebSocket();
	}
	clsoe() {
		this.socket && this.socket.clsoe();
		Store.commit( 'updateSocketConnection', {
			key: 'price',
			price: null
		})
	}
	createWebSocket () {
		const connect = Store.state.sockets.price;
		if (connect) {
			this.socket = connect;
			this.initSocket();
			return connect;
		}
		try {
			this.socket = new WebSocket( `${window.SOCKET_ADDRESS}price` );
			Store.commit( 'updateSocketConnection', {
				key: 'price',
				socket: this.socket
			})
			this.initSocket();
		} catch (error) {
			this.reconnect();
		}
		return this.socket;
	}
	sendPingData () {
		clearTimeout( this.pingTimmer );
		this.pingTimmer = setTimeout( () => {
			this.sendMessage( this.message );
		}, 15000 );
	}
	sendMessage(message, callback = (() => {})) {
		this.waitForConnection( () => {
			this.message = message;
			this.socket.send( message );
			this.sendPingData();
			callback();
		}, 1000);
	}
	reconnect() {
		if (this.lockReconnect) {
			return this.socket;
		}
		this.lockReconnect = true;
		// 没连接上会一直重连，设置延迟避免请求过多 简易debounce
		clearTimeout(this.timmer);
		this.timmer = setTimeout(() => {
			this.createWebSocket();
			this.lockReconnect = false;
		}, 1000 * 5);
	}
	initSocket() {
		this.socket.onopen = this.onopen;
		this.socket.onmessage = ({ data }) => {
			this.onmessage(JSON.parse(data))
		};
		this.socket.onclose = this.onclose;
		this.socket.onerror =  (err) => {
			this.reconnect();
		};
	}
	waitForConnection(callback, interval) {
		if (this.socket.readyState === 1) {
			callback();
		} else {
			setTimeout(() => {
				this.waitForConnection(callback, interval);
			}, interval);
		}
	}
}
