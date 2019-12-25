/**
 * @ Author: Diskfan
 * @ Create Time: 2019-10-26 14:29:02
 * @ Modified by: Your name
 * @ Modified time: 2019-10-28 16:06:07
 * @ Description: 首页实时报价封装
 */
import Store from '@/store';

export default class Take {
  protected socket: WebSocket | null = null;
  protected lockReconnect = false;
  private timmer: any = null;
  // private SOCKET = window.SOCKET_LIST[0].api_address||window.SOCKET_ADDRESS;
  private SOCKET: any = window.SOCKET_LIST[0].api_address;
  private num: any = 0; // 链接次数
  public constructor(options: any = {}) {
    this.onmessage = options.onmessage || (() => void 0);
    this.onopen = options.onopen || (() => void 0);
    this.onclose = options.onclose || (() => void 0);
    this.createWebSocket();
  }

  public sendMessage(message: string, callback: () => void = () => void 0): void {
    this.waitForConnection(() => {
      if (this.socket) {
        this.socket.send(message);
      }
      callback();
    }, 1000);
  }

  public onmessage() {
    return;
  }

  public onopen() {
    return;
  }

  public onclose() {
    return;
  }

  public close() {
    if (this.socket) {
      this.socket.close();
    }
    Store.commit('updateSocket', {
      key: 'price',
      socket: null,
    });
  }

  protected createWebSocket() {
    console.log(12222);
    const connect = Store.state.sockets.price;
    if (connect) {
      this.socket = connect;
      this.initSocket();
      return connect;
    }
    try {
      this.socket = new WebSocket(`${this.SOCKET}price`);
      console.log(333, 'this.SOCKET');
      Store.commit('updateSocket', {
        key: 'price',
        socket: this.socket,
      });
      this.initSocket();
    } catch (error) {
      this.reconnect();
    }
    return this.socket;
  }

  protected reconnect() {
    if (this.lockReconnect) {
      this.num = this.num + 1;
      if (this.num < window.SOCKET_LIST.length) {
        this.SOCKET = window.SOCKET_LIST[this.num].api_address;
      } else {
        this.SOCKET = window.SOCKET_ADDRESS;
      }
      console.log(this.num, this.SOCKET, 888);
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

  protected initSocket() {
    if (!this.socket) {
      return;
    }
    this.socket.onopen = this.onopen;
    this.socket.onmessage = ({data}: any) => {
      this.onmessage(JSON.parse(data));
    };
    this.socket.onclose = this.onclose;
    this.socket.onerror = (err) => {
      this.reconnect();
    };
  }

  protected waitForConnection(callback: () => void = () => void 0, interval: number = 100) {
    if (this.socket && this.socket.readyState === 1) {
      callback();
    } else {
      setTimeout(() => {
        this.waitForConnection(callback, interval);
      }, interval);
    }
  }
}
