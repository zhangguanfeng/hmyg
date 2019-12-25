<!--
 * @Autor: Diskfan
 * @Date: 2019-09-17 16:42:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-26 10:06:24
 * @Description:
 -->
<template>
  <div class="newTrade"
       @mousemove.stop="dragHandle($event, 2)"
       @mouseup.stop="dragHandle($event, 1)"
       :style="{userSelect: draging ? 'none' : 'unset'}">
    <div class="contain" v-show="!isHistory || !session" :class="{'no-login': !session}">
      <div
        class="left"
        :style="{width: lWidth + 'px'}">
        <!-- <CptSymbol v-show="isCollapse" /> -->
        <transition name="slide-left">
          <CptSymbol ref="cptSymbol"
            :views.sync="views"
            @getMySymbol="getMySymbol"
            @sortSymbols="sortSymbols"
            v-loading="cptLoading"
            :mySymbols.sync="mySymbols"
            :allSymbols.sync="allSymbols"
            v-show="isCollapse"
            @combineSelected="combineSelected"/>
        </transition>
        <div class="pointer" @click="isCollapseChange()" :style="{left: `${lWidth}px`}">
          <i :style="{transform: `rotateZ(${isCollapse ? 180 : 0}deg)`}" class="el-icon-caret-right"></i>
        </div>
      </div>
      <div class="right" :style="{width: `calc(100% - ${lWidth + 50}px)`}">
        <kLine ref="kLine" :views.sync="views" :activeIndex.sync="activeIndex" :draging="draging" :resizing="resizing" :style="{height:  `calc(100% - ${orderHeight}px)`}"
               @fullWindow="fullWindowHandle" :fullWindow="fullWindow" :ticker="ticker"></kLine>
        <div ref="kLineReplace" class="kLline-replace"></div>
        <div class="order-line" v-if="session" ref="orderLine" :style="{height: orderHeight - 20 + 'px'}">
          <div
            class="drag-icon"
            @drag="false"
            @dblclick="dblclickHandle"
            :style="{marginLeft: `calc(50vw - ${isCollapse ? (lWidth + 90) / 2 : 0}px)`}"
            @mousedown.stop="dragHandle($event, 0)">
            <i class="el-icon-d-caret"></i>
          </div>
          <cpt-order class="order" :ticker="ticker" :orderHeight="orderHeight - 20"></cpt-order>
        </div>
      </div>
      <cpt-news></cpt-news>
    </div>
    <cpt-history v-if="isHistory && session" :allSymbols.sync="allSymbols" class="history"></cpt-history>
    <cpt-footer v-if="session" class="footer" @change="changeHistory" :isHistory="isHistory"></cpt-footer>
  </div>
</template>
<script>
import CptSymbol from './cptSymbol';
import CptFooter from './footer';
import CptNews from './news';
import cptOrder from './cptOrder';
import kLine from './kLine';
import CptHistory from './cptHistory';
import { token, lastViewSymbol } from '@/common/util';
import OrderSocket from '@/plugins/orderSocket.js';
import { constants } from 'crypto';

export default {
  components: {
    CptSymbol, CptFooter, CptNews, cptOrder, kLine, CptHistory,
  },
  data() {
    return {
      views: [], // 展开的K线
      activeIndex: null, // K线激活所索引
      allSymbols: [],
      isCollapse: true,
      isHistory: false,
      cptLoading: false,
      // fullWindow: false, // 是否全屏
      resizing: false, // 是否全窗口
      orderHeight: 300,
      domReact: {},
      timmer: null,
      hideOrder: false,
      orderSocket: null,
      subpositionTimmer: null,
      mySymbolsData: [], // 自选货币对原始数据
      // mySymbols: [], // 自选货币对
      draging: false, // 控制K线图的iframe layer层,防止iframe导致无法调节窗口大小
    };
  },
  methods: {
    isCollapseChange() {
      this.isCollapse = !this.isCollapse;
      localStorage.setItem('isCollapse', Number(this.isCollapse) + '');
    },
    dblclickHandle() {
      this.hideOrder = !this.hideOrder;
    },
    /**
       * 满窗口
       */
    fullWindowHandle(e) {
      if (this.resizing) return;
      this.resizing = true;
      const duration = 300;
      const kLine = this.$refs.kLine.$el;
      const kReact = kLine.getClientRects()[0];
      const kStyle = kLine.style;
      const replace = this.$refs.kLineReplace;
      const rReact = replace.getClientRects()[0] || kReact;
      const rStyle = replace.style;
      const { fullWindow } = this;
      const bWidth = document.body.clientWidth;
      const bHeight = document.body.clientHeight;
      rStyle.width = '100%'; //  `${fullWindow ? rReact.width : kReact.width}px`;
      rStyle.height = `${fullWindow ? rReact.height : kReact.height}px`;
      rStyle.display = 'block';
      kStyle.position = 'fixed';
      kStyle.left = `${fullWindow ? 0 : rReact.left}px`;
      kStyle.top = `${fullWindow ? 0 : rReact.top}px`;
      kStyle.width = `${fullWindow ? bWidth : rReact.width}px`;
      kStyle.height = `${fullWindow ? bHeight : rReact.height}px`;
      kStyle.zIndex = 20;
      kStyle.overflow = !fullWindow ? 'hidden' : 'unset';
      kStyle.transition = `${duration}ms all cubic-bezier(0.1, 0.57, 0.58, 1)`;
      setTimeout(() => {
        if (fullWindow) {
          clearTimeout(this.timmer);
          kStyle.left = `${rReact.left}px`;
          kStyle.top = `${rReact.top}px`;
          kStyle.width = `${rReact.width}px`;
          kStyle.height = `${rReact.height}px`;
          this.timmer = setTimeout(() => {
            kStyle.position = 'relative';
            rStyle.display = 'none';
            kStyle.transition = 'unset';
            kStyle.left = 'unset';
            kStyle.top = 'unset';
            kStyle.width = '100%';
            kStyle.height = `${rReact.height}px`;
            this.fullWindow = !this.fullWindow;
            this.resizing = false;
            kStyle.zIndex = 0;
          }, duration);
        } else {
          kStyle.left = '0px';
          kStyle.top = '0px';
          kStyle.width = '100%';
          kStyle.height = '100%';
          clearTimeout(this.timmer);
          this.timmer = setTimeout(() => {
            this.resizing = false;
            this.fullWindow = !this.fullWindow;
          }, duration);
        }
      }, 0);
    },
    changeHistory(val) {
      this.isHistory = val;
    },
    sortSymbols(type = 0) {
      const symbols = [this.allSymbols, this.mySymbols][type];
      for (let i = 0; i < symbols.length; i++) {
        for (let j = 0; j <= i; j++) {
          if (symbols[i].ASK === null && symbols[j].ASK === null) {
            continue;
          }
          if (symbols[i].ASK !== null && symbols[j].ASK === null) {
            const tmp = symbols[i];
            symbols[i] = symbols[j];
            symbols[j] = tmp;
          }
        }
      }
      return symbols;
    },
    dragHandle(e, type) {
      if (type === 0) {
        this.domReact = this.$refs.orderLine.getClientRects()[0];
        this.draging = true;
      }
      if (!this.draging) return;
      if (type === 1) {
        this.draging = false;
      } else if (type === 2) { // 鼠标移动
        // this.$nextTick(() => {
        //   const bh = document.body.clientHeight - 20;
        //   this.orderHeight = bh - e.y;
        // })
        clearTimeout(this.timmer);
        this.timmer = setTimeout(() => {
          const bh = document.body.clientHeight;
          this.orderHeight = bh - e.y - 20;
          localStorage.setItem('order_height', this.orderHeight);
        }, 1);
      }
    },
    // 获取自选货币对
    getMySymbol() {
      if (!this.session) {
        return;
      }
      this.cptLoading = true;
      this.$http.post('MyPanel/getMySymbols', {}).then( async ({ data }) => {
        data = data.data || [];
        this.mySymbolsData = data
        this.$nextTick(() => {
          this.combineSelected();
          this.openDefaultView(0);
          this.$nextTick(() => {
            this.$refs.cptSymbol.takeData(true);
          });
        })
      }).catch(e => {
        this.mySymbols = [];
      })
      .finally(e => this.cptLoading = false);
    },
    openDefaultView(type = 1) {
      type = type ? type : this.mySymbols.length ? type : 1;
      const lastSymbol = lastViewSymbol();
      const views = [this.mySymbols, this.allSymbols][type];
      let defaultView = views[0];
      if (!defaultView) {
        return;
      }
      if (lastSymbol) {
        for (let v of views) {
          if (v.symbol === lastSymbol) {
            defaultView = v;
            break;
          }
        }
      }
      this.$root.$emit('addView', defaultView);
    },
    // 当某一个
    combineSymbolInfo() {},
    getSymbolInfo(item = []) {
      return new Promise((resole, reject = (() => {})) => {
        const url = this.session ? 'MyPanel/getSymbolAllInfo' : 'Panel/getSymbolAllInfo';
        const symbol = item.map(el => el.symbol)
        this.$http.post(url, { symbol }).then(res => {
          symbol.forEach((el, idx) => {
            for (let v of res.data) {
              if (v.symbol === el) {
                for (let j in  v) {
                  item[idx][j] = v[j];
                }
                break;
              }
            }
          });
          resole(item)
        });
      });
    },
    combineSelected() {
      if (!this.mySymbols.length || !this.allSymbols) {
        return;
      }
      this.allSymbols.forEach(el => el.inSelfSelect = false);
      for (let i in this.mySymbols) {
        const m = this.mySymbols[i];
        for (let j in this.allSymbols) {
          const a = this.allSymbols[j];
          if (a.symbol === m.symbol) {
            a.inSelfSelect = true;
            break;
          }
        }
      }
    },
    getAllSymbols() {
      if (this.$store.state.allSymbolsInfo.length) {
        this.allSymbols = this.$store.state.allSymbolsInfo;
      }
      this.$http.post('Panel/getToAddSymbols').then(({ data }) => {
        const toAddSymbols = JSON.parse(JSON.stringify(data)); // 深度复制，自选预留自选货币对使用
        let symbols = [];
        data.forEach(el => symbols = [...symbols, ...el.data]);
        symbols.forEach(el => {
          el.ASK = el.ask_price;
          el.BID = el.bid_price;
          el.LASTPRICE = null;
          el.key = Math.random().toString(32).replace(/.*\./, '').toUpperCase();
          el.inSelfSelect = null;
          el.isSellRise = null;
          el.isBuyRise = null;
        })
        this.allSymbols = symbols;
        this.combineSelected();
        this.getMySymbol();
        this.$store.commit('updateAllSymbolsInfo', this.allSymbols);
        if (!this.session) {
          this.openDefaultView(1);
          this.$nextTick(() => {
            this.$refs.cptSymbol.takeData(true);
          });
        }
      });
    },
    // 订阅挂单变化时候刷新数据信息
    listenerSubposition(flag = true) {
      clearTimeout(this.subpositionTimmer);
      if (!this.$store.state.account) {
        this.subpositionTimmer = setTimeout(() => {
          this.listenerSubposition();
        }, 1000);
        return;
      }
      this.orderSocket.subpositionSendmessage({
        'ORDERBY': this.$store.state.account, //下单账号
        'OPERATOR': '1',
      }).then(data => {
        this.$store.state.sockets.subposition.onmessage = ({ data }) => {
          data = JSON.parse(data);
          if (data.ERRORCODE == 0) {
            this.$root.$emit('getPendingOrder');
          } else {
            // 下单通知失败
          }
        };
      }).catch(e => {

      }).finally(() => {
        clearTimeout(this.subpositionTimmer);
        setTimeout(() => {
          this.listenerSubposition();
        }, 15000)
      })
    }
  },
  computed: {
    lWidth() {
      return this.isCollapse ? 350 : 0;
    },
    mySymbols:{
     get() {
        const mys = this.mySymbolsData.map(el => el.symbol);
        return this.allSymbols.filter(el => ~mys.indexOf(el.symbol));
     },
     set(val) {
      this.mySymbolsData = val;
     }
    },
    fullWindow: {
      get() {
        return this.$store.state.fullWindow;
      },
      set(val) {
        this.$store.commit('updateFullWindow', val);
      }
    },
    ticker() {
      return this.views[this.activeIndex] && this.views[this.activeIndex].item || {};
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    session() {
      return this.userInfo && this.userInfo.token || null;
    }
  },
  watch: {
    userInfo: {
      deep: true,
      handler() {
        if (this.userInfo) {
          this.getMySymbol();
        }
      }
    }
  },
  activated() {
    document.querySelector('#app').style.minWidth = '1250px';
    this.$store.dispatch('createKLineDataFeed');
    window.lineIndex = this;
    const orderHeight = localStorage.getItem('order_height') || 300;
    const isCollapse = localStorage.getItem('isCollapse')
    this.orderSocket = new OrderSocket();
    this.listenerSubposition()
    this.getAllSymbols();
    this.orderHeight = !this.session ? 0 : orderHeight;
    this.isCollapse = isCollapse == 1 || !isCollapse ? true : false;
    window.onresize = (e) => {
      // 统一处理全屏操作
      const kLIne = this.$refs.kLine;
      const dom = document.querySelector('#kLine');
      if (!dom) {
        return;
      }
      kLIne.fullscreen = window.screen.height === document.body.clientHeight;
      dom.className = kLIne.fullscreen ? `${dom.className} is-fullscreen` : dom.className.replace(/\s*is\-fullscreen/, '');
      kLIne.onResize();
    };
    // this.$nextTick(() => {
    //   this.$refs.cptSymbol.takeData(true);
    //   this.$refs.kLine.takeData(true)
    // })
    // this.getXLeft();
  },
  deactivated() {
    document.querySelector('#app').style.minWidth = 'unset';
    // const historyData = {};
    // let splitKey = null;
    // for (let v of this.views) {
    //   // 去重再保存
    //   for (let i in v.allData) {
    //     const m = v.allData[i];
    //     const times = m.map(el => el.time);
    //     const unique = Array.from(new Set(times));
    //     const newArr = [];
    //     for (let n of m) {
    //       if (~unique.indexOf(n.time)) {
    //         // if (!splitKey) {
    //         //   splitKey = Object.keys(n);
    //         // }
    //         delete n.isBarClosed;
    //         delete n.isLastBar;
    //         newArr.push(n);
    //         // newArr.push(Object.values(n));
    //       }
    //     }
    //     v.allData[i] = newArr;
    //   }
    //   historyData[v.symbol] = v.allData;
    // }
    // this.$store.commit('updateKLineHistoryData', historyData);
    this.$store.commit('setKLineDataFeed', null);
    this.$store.commit('updateWidget', null);
    this.$store.commit('updateAllSymbolsInfo', this.allSymbols);
    // 去掉键名后对不上数据
    // this.$store.commit('updateSplitKey', splitKey);
    this.views = [];
    this.$refs.cptSymbol.takeData(false);
    this.$refs.kLine.takeData(false);
    this.$nextTick(() => {
      this.views = [];
    })
  },
};
</script>
<style lang="scss">
  $cub: cubic-bezier(0.1, 0.57, 0.58, 1);
  @mixin transition($duration: 300ms) {
    transition: $duration all $cub;
  }

  .slide-left-enter-active {
    @include transition();
  }

  .slide-left-leave-active {
    @include transition();
  }

  .newTrade {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;

    :root .theme-dark & {
      background: $color-dark-bg;
    }

    .contain {
      height: calc(100vh - 106px);
      width: 100%;
      display: flex;
      flex-direction: row;

      .left {
        height: 100%;
        border-right: 10px solid #e6e6e6;

        :root .theme-dark & {
          background: $color-dark-bg;
          border-right-color: #282D46;
        }

        // @include transition();
        .pointer {
          position: absolute;
          right: 0;
          top: calc(50vh - 14px);
          height: 38px;
          background: #fff;
          width: 8px;
          border: 1px solid #e6e6e6;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          :root .theme-dark & {
            background: #141725;
            border-color: #141725;
          }

          i {
            :root .theme-dark & {
              color: #B4C5F7;
            }
          }

          // @include transition();
          // i {
          //   @include transition();
          // }
        }

        > * {
          height: 100%;
          width: 100%;
        }
      }

      .right {
        height: 100%;
        width: 100%;
        // @include transition();
        display: flex;
        flex-direction: column;

        .kLline-replace {
          display: none;
        }

        :root .theme-dark & {
          background: $color-dark-bg;
        }

        .order-line {
          width: 100%;
          border-top: 20px solid #e6e6e6;
          overflow: hidden;

          :root .theme-dark & {
            background: $color-dark-bg;
            border-color: #282D46;
          }

          .drag-icon {
            width: 40px;
            height: 8px;
            padding: 1px;
            border: 1px solid #e1e1e1;
            position: absolute;
            margin-top: -9px;
            @include transition();
            font-size: 14px;
            background: #fff;
            display: flex;
            margin-top: -11px;
            color: #888;
            cursor: n-resize;
            justify-content: center;
            align-items: center;

            :root .theme-dark & {
              background: $color-dark-bg;
              border-color: #141725;
            }

            i {
              :root .theme-dark & {
                color: #B4C5F7;
              }
            }

            &:active {
              color: #000;
            }
          }
        }
      }

      .news {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .no-login {
      position: absolute;
      background: #f7f7f7;
      z-index: 99;
      height: calc(100% - 70px)
    }

    .history {
      height: calc(100vh - 126px);
      padding: 20px 20px 0 20px;
      background: #fff;
    }

    .footer {
      height: 46px;
      color: #fff;
      background: #2b3138;
      z-index: 1;
    }
  }
</style>
