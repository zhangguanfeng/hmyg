<!--
 * @Autor: Diskfan
 * @Date: 2019-09-16 18:50:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-25 10:01:19
 * @Description:
 -->

<template>
  <div class='cptSymbol'>
    <header>
      <div class="logo">
        <span
          @click="showSymbolsTypeChange(0)"
          class="all"
          :class="{ active: symbolType === 0 }"
          title="显示全部货币对，包括没有选择的">
          全部
        </span>
        <span
          @click="showSymbolsTypeChange(1)"
          :class="{ active: symbolType === 1, disabled: !token }"
          class="self"
          :title="token ? '显示自选货币对' : '登录后查看自选'">
          自选
        </span>
      </div>
      <div
        class="search-symbol"
        :class="{ active: showSymbolsSearch }"
        @mouseenter="showSymbolsSearch=true,setHideShowSymbolSearchTimmer()">
        <transition name="slide-fade-left">
          <input v-show="showSymbolsSearch" v-model="symboleInput" ref='searchInput' @keyup="getNewList" type="text"
                 @blur="getNewList" placeholder="货币对关键字">
        </transition>
        <i class="el-icon-search" @click.stop='showSymbolsSearch=!showSymbolsSearch'></i>
      </div>
      <div class="filter">
        <svg @click.stop="showSymbolsHandle" t="1568259295069" class="svg-icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2168" width="18" height="18">
          <path
            d="M436.848393 959.403796c-7.401574 0-14.811334-3.730974-18.506493-3.730974-11.104919-7.460925-18.509563-22.3838-18.509563-33.574676L399.832338 597.539188 74.099648 123.757628c-7.398504-11.1919-11.098779-26.113751-3.695159-41.036625 7.398504-11.1919 18.503423-18.652825 33.31271-18.652825l814.322513 0c14.809287 0 25.914206 7.460925 33.30964 18.652825 7.407714 11.1919 3.703345 26.113751-3.698229 37.305651L621.928668 597.539188l0 249.947655c0 14.921851-7.410783 26.113751-22.212908 33.574676l-148.058081 74.611302C447.953312 959.403796 444.246897 959.403796 436.848393 959.403796zM436.848393 899.68467 436.848393 899.68467c0.624217 0 0.557702 0-2.910283 0.686638-9.049097 1.820462-17.832134 6.506181-24.397666 13.132088l6.819313-6.861268 8.636704-4.357238 148.040684-74.611302c-4.631484 2.354628-10.564613 11.308557-10.564613 19.813255L562.472532 597.539188l0-18.503423 10.407024-15.250332L898.130268 86.986143c-3.5038 5.282307-4.978385 15.670911 3.700275 28.776394 2.686179 4.086062 9.42158 8.024767 16.208147 8.024767L103.718223 123.787304c6.783497 0 13.519921-3.939729 16.208147-8.024767L70.405513 82.722026l53.212946 26.621311c3.554966-7.132444 2.539846-14.803147-0.596588-19.518542l325.734736 473.78156 10.538007 15.310707 0 18.62315 0 324.558957c0-8.267291-2.094708-12.17632-7.902994-16.083304l-33.04972 49.65798 0-59.719126c7.153934 0 12.44238 0.925069 18.470677 2.5071 1.879813 0.50756 4.025687 1.133823 5.786797 1.671059-0.531096-0.149403-2.00875-0.448208-5.694699-0.448208L436.848393 899.68467z"
            p-id="2169"></path>
        </svg>
        <transition name="symbols-fade" v-on:after-leave="afterLeave">
          <div v-show="showSymbols" ref="symbols" class="symbols">
            <div class="tip">
              已经自选:&nbsp;(拖动排序)
            </div>
            <!-- <Draggable class="tabs" v-model="selected" element="div" @update="datadragEnd" :options="{animation:500}"> -->
            <!-- <Draggable class="tabs" ref="dragAble" v-model="selected" :options="{animation:500}"> -->
            <div class="tabs">
              <transition-group tag="p">
                <div
                  class="tab list-item"
                  v-for="(item, key) in selected"
                  :key="item.key"
                  :data-key="key"
                  @dblclick.stop="delSymbol(key, item)">
                  <i class="el-icon-close close" @click.stop="delSymbol(key, item)"></i>
                  <div class="code">{{item.symbol}}</div>
                  <div class="desc">{{item.symbol_name}}</div>
                </div>
              </transition-group>
            </div>
            <!-- </Draggable>  -->
            <div class="classified ">
              <div
                v-for="(item, key) in classified"
                v-bind:key="key"
                @click="symbolChange(item, key)">
                <div class="name" :class="{active:classifiedActive === key}">
                  {{item.security_name}}
                  <el-checkbox v-show="classifiedActive === key" @change='classifiedCheckboxChange(item, key)'
                               v-model="item.all"></el-checkbox>
                  <div class="space" v-show="classifiedActive !== key"></div>
                </div>
              </div>
            </div>
            <div class="choose-list">
              <div>
                <template v-if="classified[classifiedActive]">
                  <div
                    v-for="(item, key) in classified[classifiedActive].list"
                    :key="key"
                    class="item"
                    @click.stop="toggleSelect(item)">
                    <label role="checkbox" class="el-checkbox" :class="{'is-checked': isChecked(item) !== false}"
                           style=""
                           aria-checked="true">
                      <span aria-checked="mixed" class="el-checkbox__input"
                            :class="{'is-checked': isChecked(item) !== false}">
                        <span class="el-checkbox__inner" @click.stop></span>
                        <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">
                      </span>
                    </label>
                    <div class="text">
                      <span class="code">
                        {{item.symbol}}
                      </span>
                      <span class="name">
                        {{item.symbol_name}}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="button-list">
              <div class="cancel" @click.stop="cancel">取消</div>
              <div class="confirm" @click="confirm">确定</div>
            </div>
          </div>
        </transition>
      </div>
    </header>
    <div class="symbol-contain" :class="{ 'select-icon-show': symbolType === 0 }">
      <ul class="thead">
        <li class="select-icon"></li>
        <li class="symbol">
          品种
        </li>
        <li class="sale">
          买
        </li>
        <li class="entry" style="text-align: center">
          卖
        </li>
      </ul>
      <div class="tbody" :class="{ 'all-symbols': symbolType === 0 }">
        <ul
          @click.stop="addViews(item)"
          v-for="(item, key) in [allSymbolsSelect, mySymbolsSelect][symbolType]"
          :key="key"
          :class="{disabled: item.ASK === null}">
          <li class="select-icon" :class="{ selected: item.inSelfSelect}">
            <i
              class="el-icon-star-on"
              :class="{ disabled: !token }"
              :title="token ? item.inSelfSelect ? '从自选中移除' : '添加到自选' : '登录后添加到自选'"
              @click.stop='dealAllSelfSelect(item)'
              >
            </i>
          </li>
          <li class="symbol">
              <span class="code">
                {{item.symbol}}
              </span>
            <span class="name">
                {{item.symbol_name}}
              </span>
          </li>
          <li class="sale" @click="goTrading(false, item)">
              <span :class="{rise: item.isSellRise, fall: !item.isSellRise, unset: item.isSellRise === null, center: item.ASK === null}">
                <strong>
                  {{ item.ASK === null ? '--' : item.ASK }}
                </strong>
              </span>
          </li>
          <li class="entry" @click="goTrading(true, item)">
              <span :class="{rise: item.isBuyRise, fall: !item.isBuyRise,  unset: item.isBuyRise === null, center: item.BID === null}">
                <strong>
                  {{ item.BID === null ? '--' : item.BID }}
                </strong>
              </span>
          </li>
          <li class="desc">
            <div :class="{ open: symbolType === 0 }">
              <strong>
                {{ digitsDesc(item) }}
              </strong>
            </div>
          </li>
          <li class="close">
            <i class="el-icon-close" @click.stop="dealSelfSelect(item, key)"></i>
          </li>
        </ul>
      </div>
    </div>
    <!--    <trading :dialogVisible="dialogVisible" @change="dialogVisible=false" :ticker="ticker"></trading>-->
    <trading :dialogVisible="dialogVisible" ref="trading" @change="dialogVisible=false" :ticker.sync="ticker" :isBuy="isBuy"></trading>
  </div>
</template>
<script>
import Draggable from 'vuedraggable';
import Trading from './trading.vue';
import TakeSocket from '@/plugins/takeSocket.js';
import { token, saveDefaultPrice, digitsDesc } from '@/common/util';

export default {
  components: { Draggable, Trading },
  name: 'cptSymbol',
  props: {
    mySymbols: {
      type: [Array, null],
      required: true,
      default: null
    },
    allSymbols: {
      type: Array,
      default: [],
      required: true
    },
    views: {
      default: [],
      type: Array
    },
  },
  computed: {
    token() {
      return this.$store.state.userInfo && this.$store.state.userInfo.token || null;
    },
    personalInformation() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      dialogVisible: false,
      symbolSearchValue: '',
      // token: '',
      isBuy: true,
      ticker: {},
      showSymbols: false,
      showSymbolsSearch: false,
      showSymbolsSearchTimmer: null,
      symbolType: 1, // 0 全部, 1 自选
      // symbols: [], // arr.slice(), // 当前已经选择并在左边显示报价的
      selected: [], // arr.slice(),
      currentDragItem: null,
      classifiedActive: 0,
      loadingSymbols: false, // 正在查询tab下的symbol, 防止服务器响应慢导致数据对应错误
      symbolTab: [],
      socket: null,
      classified: [],
      wrapReact: null,
      sortable: null,
      orderSocket: null,
      mySymbolsSelect: [],
      allSymbolsSelect: [],
      symboleInput: '' // 输入内容
    };
  },
  watch: {
    showSymbols() {
      if (this.showSymbols && !this.wrapReact) {
        this.$nextTick(() => {
          this.wrapReact = this.$refs.symbols.getClientRects()[0];
        });
      }
    },
    mySymbols() {
      if (!this.mySymbols) return;
      this.selected = this.mySymbols.slice(0);
      this.mySymbolsSelect = this.mySymbols;
    },
    allSymbols() {
      if (!this.allSymbols) return;
      this.allSymbolsSelect = this.allSymbols;
    },
    showSymbolsSearch() {
      clearTimeout(this.showSymbolsSearchTimmer);
      if (this.showSymbolsSearch) {
        this.$refs.searchInput.focus
      }
    }
  },
  methods: {
    setHideShowSymbolSearchTimmer() {
    clearTimeout(this.showSymbolsSearchTimmer);
      this.showSymbolsSearchTimmer = setTimeout(() => {
        this.showSymbolsSearch = false;
      }, 10000)
    },
    getNewList() {
      const { symboleInput, symbolType } = this
      const reg = new RegExp(symboleInput.replace(/\s/g, ''),'gi');
      if (symbolType == 0) { // 全部
        this.allSymbolsSelect = this.allSymbols.filter(item => reg.test(item.symbol) || reg.test(item.symbol_name))
      } else { // 自选
        this.mySymbolsSelect = this.mySymbols.filter(item => reg.test(item.symbol) || reg.test(item.symbol_name))
      }
    },
    showSymbolsHandle() {
      if (!this.token) {
        this.$store.commit('toogleLoginDialog', true);
        // this.$router.push('/login');
        return;
      }
      this.showSymbols = !this.showSymbols;
    },
    async dealAllSelfSelect(item) {
      if (!this.token) {
        this.$store.commit('toogleLoginDialog', true);
        // this.$router.push('/login');
        return;
      }
      const res = await this.dealMySymbolInLoop([item.symbol], Number(!item.inSelfSelect));
      if (!res.length || res[0].result !== 200) {
        this.$message.error(['删除', '添加'][Number[item.inSelfSelect]] + '失败');
      } else {
        item.inSelfSelect = !item.inSelfSelect
        const selected = this.allSymbols.filter(el => el.inSelfSelect);
        this.$emit('update:mySymbols', selected);
      }
    },
    /**
     * 删除货自选币对
     */
    async dealSelfSelect(item, key) {
      if (this.mySymbols.length === 1) {
        this.$message.info('请至少保留一个');
        return
      }
      const res = await this.dealMySymbolInLoop([item.symbol], 0);
      if (!res.length || res[0].result !== 200) {
        this.$message.error('删除失败');
      } else {
        const slice = this.mySymbols.slice();
        slice.splice(key, 1);
        this.$emit('update:mySymbols', slice);
        this.$nextTick(() => {
          this.$emit('combineSelected');
        })
      }
    },
    /**
     * 自选货币对和全部货币对切换
     */
    showSymbolsTypeChange(type) {
      if (!this.token&& type==1) {
        this.$store.commit('toogleLoginDialog', true);
        // this.$router.push('/login');
        return;
      }
      this.symbolType = type;
      this.symbolTypeChange();
    },
    symbolTypeChange() {
      this.takeData(true);
    },
    /**
     * 差价点位
     */
    digitsDesc(item) {
      return digitsDesc(item);
    },
    takeData(flag = true) {
      // const take = [this.allSymbols, this.mySymbols][this.symbolType].map(el => el.symbol);
      const take = this.allSymbols.map(el => el.symbol); // 订阅全部
      const viewsSymbols = this.views.map(el => el.symbol);
      for (let v of viewsSymbols) {
        if (!~take.indexOf(v)) {
          take.push(v)
        }
      }
      if (!take.length) return;
      this.sendMessage(take.join(','));
    },
    afterLeave() {
      this.selected = this.mySymbols.slice(0);
    },
    cancel() {
      this.showSymbols = false;
    },
    symbolChange(item, key) {
      if (this.loadingSymbols) {
        return;
      }
      this.classifiedActive = key;
      if (this.classified[key].list.length) return;
      this.loadingSymbols = true;
      this.$http.post('Panel/getTabSymbols', {
        wl_no: window.wlno,
        sec_wl_id: item.sec_wl_id
      }).then(res => {
        const data = res.data.data || [];
        data.map(el => {
          el.checked = false;
          el.inSymbol = false;
          el.ASK = 0; // 卖价
          el.BID = 0; // 买价
          el.key = Math.random().toString(32).replace(/.*\./, '').toUpperCase();
        });
        this.classified[this.classifiedActive].list = data;
        this.checkAllInSelect();
      }).finally(() => {
        this.loadingSymbols = false;
      });
    },
    /**
     * 处理货币对tab是否选中
     */
    checkAllInSelect() {
      this.$nextTick(() => {
        let all = true;
        // isChecked 方法会返回false 0转boolean后也是false
        for (let i in this.classified) {
          this.classified[i].list.forEach(el => all = all === false ? false : this.isChecked(el) === false ? false : true);
          this.classified[i].all = all
        }
      })
    },
    /**
     * 货币对弹窗确认按钮
     */
    async confirm() {
      const all = this.selected.map(el => {
        el.inSymbol = true;
        return el.symbol;
      });
      const my = this.mySymbols.map(el => el.symbol);
      const add = all.filter(el => !~my.indexOf(el)); // 添加
      const del = my.filter(el => !~all.indexOf(el)); // 删除
      // 添加自选
      const addRes = await this.dealMySymbolInLoop(add.slice(), 1);
      const delRes = await this.dealMySymbolInLoop(del.slice(), 0);
      this.sendMessage(all.join(','));
      this.showSymbols = false;
      this.$emit('getMySymbol');
    },
    /**
     * 递归处理删除或者添加自选货币对
     * type 0 删除， 1 添加
     */
    dealMySymbolInLoop(take = [], type = 0, result = []) {
      return new Promise((resole, reject) => {
        const symbol = take.shift();
        if (!symbol) {
          resole(result)
        } else {
          this.$http.post(['MyPanel/delMySymbols', 'MyPanel/addMySymbols'][type], { symbol }).then(res => {
            result.push(res);
            resole(this.dealMySymbolInLoop(take, type, result))
          })
        }
      })
    },
    sendMessage(msg) {
      this.socket && this.socket.sendMessage( msg )
    },
    addViews(item) {
      this.$root.$emit('addView', item);
    },
    datadragEnd(item, e) {
      console.log(e);
    },
    toggleSelect(item) {
      const checked = this.isChecked(item);
      if (checked !== false) {
        if (this.selected.length === 1) {
          this.$message.info('至少保留一个');
          return;
        }
        this.selected.splice(checked, 1);
      } else {
        this.selected.push(item);
      }
      this.$nextTick(() => {
        this.checkAllInSelect();
      });
    },
    /**
     * 检车某个货币对是否已经选中
     * 选中返回在selected中的索引，否则返回false
     * @params[type] 0 select 1 mySymbol自选
     */
    isChecked(item, type = 0) {
      // return item.checked;
      const check = [this.selected, this.mySymbols][type];
      for (let i = 0; i < check.length; i++) {
        if (check[i].symbol === item.symbol) {
          return i;
        }
      }
      return false;
    },
    onSocketMessage(data) {
      const target = this.allSymbols;
      for (let i = 0; i < target.length; i++) {
        const v = target[i]
        if (v.symbol === data.SYMBOL) {
          v.isSellRise = v.ASK - data.ASK > 0; // ASK
          v.isBuyRise = v.ASK - data.ASK > 0; // BID
          v.ASK = data.ASK;
          v.BID = data.BID;
          v.LASTPRICE = data.LASTPRICE;
          this.$emit('sortSymbols', this.symbolType);
          break;
        }
      }
      this.$forceUpdate();
    },
    delSymbol(key, item) {
      if (this.selected.length === 1) {
        this.$message.info('必须保留一个');
        return;
      }
      this.selected.splice(key, 1);
      this.checkAllInSelect();
    },
    classifiedCheckboxChange(item, key) {
      const all = item.all;
      this.classified[this.classifiedActive].list.map(el => {
        const idx = this.isChecked(el);
        if (all && idx === false) {
          this.selected.push(el);
        } else if (!all && idx !== false) {
          this.selected.splice(idx, 1);
        }
      });
    },
    leave(el) {
      this.$nextTick(() => {
        const key = +el.getAttribute('data-key');
        console.warn('key -> ', key)
        const react = this.wrapReact;
        const dom = el.getClientRects()[0];
        // const transform = `translate(${(key % 6) * 118}px, ${dom.top - react.top + 50}px)`;
        const transform = `translate(${0}px, ${dom.height + 50}px)`;
        console.log(react, dom, transform)
        el.style.transform = transform;
      });
    },
    goTrading(type, item) {
      if (this.personalInformation) {
        if (!item.ASK) {
          return;
        }
        this.isBuy = type;
        this.ticker = item;
        const trading = this.$refs.trading;
        this.$nextTick(() => {
          this.dialogVisible = true;
        });
      } else {
        this.$store.commit('toogleLoginDialog', true);
        // const url = `${location.origin}/login`;
        // window.open(url);
      }
    },
    getAllTabType() {
      this.$http.post('Panel/getTabType ', {
        wl_no: this.wlno,
      }).then(({ data }) => {
        data = data.data || [];
        data.map((el, idx) => {
          data[idx].list = [];
          data[idx].all = false;
        })
        this.classified = data;
        if (this.classified.length) this.symbolChange(this.classified[0], 0)
      });
    },
    cptOnRootEmit(data = '') {
      // this.token = token();
      if (!this.token) {
        this.symbolType = 0;
      }
    },
  },
  activated() {
    // this.token = token();
    if (!this.token) {
      this.symbolType = 0;
    }
    this.getAllTabType();
    this.socket = new TakeSocket({
      onmessage: this.onSocketMessage
    });
    this.$root.$on('cptOnRootEmit', this.cptOnRootEmit)
    window.cpt = this;
  },
  deactivated() {
    this.$root.$off('cptOnRootEmit', this.cptOnRootEmit)
  }
};
</script>
<style lang="scss">
$cub: cubic-bezier(0.1, 0.57, 0.58, 1);
@mixin p-wrap($min: 240px, $max: 300px) {
  >* {
    // display: flex;
    // flex-wrap: wrap;
    padding: 0;
    margin: 0;
    min-height: $min;
    max-height: $max;
    overflow-x: hidden;
    overflow-y: auto;
    width: calc(100% + 12px);
    :root .theme-dark & {
      &::-webkit-scrollbar {
        background: #262A3E;
      }
      &::-webkit-scrollbar-thumb {
        background: #30375A;
      }
    }
  }
}
@mixin transition($time: 300ms, $target: all) {
  transition: $time $target cubic-bezier(0.18, 0.65, 0.54, 0.9);
}
  .symbols-fade-enter-active {
    animation: symbols-fade-in .3s $cub;
  }

  .symbols-fade-leave-active {
    animation: symbols-fade-in .3s cubic-bezier(0.61, 0.2, 0.93, 0.51) reverse;
  }

  @keyframes symbols-fade-in {
    0% {
      opacity: 0;
      transform: scale(0.8) translate(-110px, -55px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate(0, 0);
    }
  }

  .symbols-fade-leave-active {
    animation: symbols-fade-in .3s $cub reverse;
  }

  @keyframes symbols-fade-in {
    0% {
      opacity: 0;
      transform: scale(0.8) translate(-105px, -45px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate(0, 0);;
    }
  }

  .fade-list-enter,
  .fade-list-leave-to {
    opacity: 0;
    transform: translateY(140px);
  }

  .fade-list-leave-active {
    position: absolute;
  }

  .slide-fade-left-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-left-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-left-enter, .slide-fade-left-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  @mixin flex($direction: row, $content: center, $align: center) {
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
    align-items: $align;
  }

  .cptSymbol {
    @include flex(column);
    height: 100%;
    width: 100%;
    text-align: left;
    :root .theme-dark & {
      background: $color-dark-bg;
      border-left-color: #434F6A;
    }

    // .disabled {
    //   cursor: not-allowed !important;
    //   &:hover {

    //   }
    // }
    header {
      height: 30px;
      width: 90%;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        display: inline-block;
        width: auto;
        line-height: 20px;
        text-align: center;
        // background: $color;
        white-space: nowrap;
        color: rgb(10, 6, 6);
        font-weight: 600;
        display: block;
        background: transparent;
        border: 1px solid #e3e3e3;
        border-radius: 3px;
        span {
          display: inline-block;
          padding: 2px 10px;
          font-size: 13px;
          color: #999;
          cursor: pointer;
          user-select: none;
          transition: .3s all ease;
          &:hover {
            opacity: .8;
          }
        }
        .all {
          border-radius: 3px 0 0 3px;
        }
        .self {
          border-radius: 0 3px 3px 0;
        }
        .active {
          // background: $color;
          // color: #fff;
          font-weight: 900;
          color: $color;
        }
      }
      .search-symbol {
        display: block;
        width: calc(100% - 125px);
        padding-left: 10px;
        padding-right: 5px;
        margin-left: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        height: 25px;
        @include flex(row, flex-end);
        border: 1px solid transparent;
        border-radius: 3px;
        input {
          outline: none;
          border: none;
          width: calc(100% - 30px);
          min-width: 130px;
          margin-right: 10px;
          border-radius: 2px;
          background: transparent;
          height: 20px;
          color: $color;
        }
        i {
          color: #8a8a8a;
          font-size: 20x;
        }
      }
      .search-symbol.active {
        border: 1px solid #eee;
        i {
          color: $color;
        }
      }
      .filter {
        width: 20px;
        text-align: right;
        margin-top: 5px;
        svg {
          &:hover {
            cursor: pointer;
          }
        }
        .svg-icon {
          fill: #8a8a8a;
          :root .theme-dark & {
            fill: #B4C5F7;
          }
        }

        .symbols {
          width: 715px;
          min-height: 400px;
          overflow-x: visible;
          background: #fff;
          position: absolute;
          box-shadow: 0px 0px 20px #b8b8b8;
          padding: 15px 18px;
          text-align: left;
          z-index: 50;
          border-radius: 2px;
          margin-top: -45px;
          margin-left: 45px;
          :root .theme-dark & {
            background: #1e2233;
            border-color: #434F6A;
            color: #000;
            box-shadow: 0px 0px 20px #12151f;
          }
          .classified {
            width: 100%;
            height: 35px;
            color: #666;
            display: flex;
            border-bottom: 1px solid #eee;
            :root .theme-dark & {
              background: #1e2233;
              border-color: #434F6A;
              color: #434F6A;
              // color: #B4C5F7;
            }

            > div {
              min-width: 80px;
              margin: 0 5px;
              text-align: center;
              display: flex;

              .name {
                cursor: pointer;
                transition: .3s all $cub;
                &.active {
                  font-weight: bold;
                  color: $color;
                  :root .theme-dark & {
                    color: #B4C5F7;
                  }
                }

                &:hover {
                  color: $color;
                  font-weight: bold;
                  :root .theme-dark & {
                    color: #B4C5F7;
                  }
                }
                .el-checkbox__inner {
                  width: 14px;
                  height: 14px;
                  border-radius: 14px;
                  :root .theme-dark & {
                    background: $color-dark-bg;
                    border-color: #5171d2;
                  }
                  &:after {
                    height: 7px;
                    left: 4px;
                    width: 3px;
                    top: 1px;
                  }
                }
                .is-checked {
                  .el-checkbox__inner {
                    :root .theme-dark & {
                      background: #5171d2;
                      border-color: #5171d2;
                    }
                  }
                }
              }

              .space {
                display: inline-block;
                width: 14px;
                height: 13px;
              }
            }
          }

          .choose-list {
            overflow: hidden;
            @include p-wrap(80px, 200px);
            >* {
              display: flex;
              flex-wrap: wrap;
            }
            .item {
              @include flex();
              width: 120px;
              height: 50px;
              margin-left: 10px;

              label {
                width: 25px;

                .el-checkbox__inner {
                  width: 14px;
                  height: 14px;
                  border-radius: 14px;
                  :root .theme-dark & {
                    background: $color-dark-bg;
                    border-color: #5171d2;
                  }
                  &:after {
                    height: 7px;
                    left: 4px;
                    width: 3px;
                    top: 1px;
                  }
                }
              }
              .is-checked {
                .el-checkbox__inner {
                  :root .theme-dark & {
                    background: #5171d2;
                    border-color: #5171d2;
                  }
                }
              }

              .text {
                @include flex(column, flex-start, flex-start);

                .code {
                  font-size: 14px;
                  font-weight: 600;
                  color: #444;
                  :root .theme-dark & {
                    color: #8b99c3;
                  }
                }

                .name {
                  font-size: 12px;
                  color: #888;
                  :root .theme-dark & {
                    color: #6d7da2;
                  }
                }
              }
            }
          }

          .button-list {
            width: 100%;
            @include flex(row, flex-end);
            margin-top: 8px;

            .confirm {
              background: $color;
              color: #ffffff;
              border: 1px solid $color;
              :root .theme-dark & {
                background: #5171d2;
                border-color: #5171d2;
              }
            }
            > div {
              padding: 5px 25px;
              font-size: 14px;
              margin-left: 10px;
              border-radius: 2px;
              border: 1px solid #e3e3e3;
              cursor: pointer;
              user-select: none;
              transition: .2s all $cub;

              &:hover, &:active {
                color: #ffffff;
                border-color: $color;
                background-color: $color;
                opacity: .8;
              }
            }
            .cancel {
              :root .theme-dark & {
                background: $color-dark-bg;
                border-color: #434F6A;
                color: #434F6A;
              }
              &:hover {
                :root .theme-dark & {
                  color: #B4C5F7;
                }
              }
            }
          }

          .tabs {
            width: 100%;
            min-width: 709px;
            min-height: 240px;
            max-height: 300px;
            margin-bottom: 15px;
            flex-wrap: nowrap;
            margin-top: 4px;
            overflow: hidden;
            @include p-wrap();

            .tab {
              min-width: 100px;
              height: 48px;
              border-radius: 3px;
              padding: 3px 20px 3px 3px;
              background: #fff;
              border: 1px solid #e1e1e1;
              margin-left: 5px;
              margin-right: 5px;
              margin-bottom: 5px;
              transition: 400ms all $cub;
              position: relative;
              display: inline-block;
              float: left;
              :root .theme-dark & {
                background: $color-dark-bg;
                border-color: #434F6A;
                &:hover {
                  border-color: #8b99c3;
                }
              }

              &:hover {
                border-color: #8b99c3;
              }

              .code {
                color: #444;
                font-size: 16px;
                line-height: 20px;
                font-weight: 600;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                :root .theme-dark & {
                  color: #8b99c3;
                }
              }

              .desc {
                color: #888;
                line-height: 20px;
                font-size: 12px;
                :root .theme-dark & {
                  color: #6d7da2;
                }
              }

              .close {
                width: 14px;
                height: 14px;
                display: inherit;
                color: #b1b1b1;
                font-size: 14px;
                transition: .2s all;
                position: absolute;
                cursor: pointer;
                right: 3px;
                top: 3px;
                :root .theme-dark & {
                  color: #6d7da2;
                  &:hover {
                    color: #8b99c3;
                  }
                }

                &:hover {
                  color: #333;
                }
              }
            }
          }

          > p {
            min-height: 200px;
          }
          .tip {
            width: 100%;
            color: $color;;
            font-size: 14px;
            font-weight: 600;
            height: 30px;
            line-height: 30px;
            :root .theme-dark & {
              background: #1e2233;
              color: #8b99c3;
            }
            &::before {
              content: ' ';
              position: absolute;
              width: 0;
              height: 0;
              border-color: transparent #e1e1e1 transparent transparent;
              border-width: 12px;
              border-style: solid;
              margin-left: -42px;
              :root .theme-dark & {
                border-color: transparent $color-dark-bg transparent transparent;
              }
            }
          }

          &::before {
            content: ' ';
            position: absolute;
            width: 0;
            height: 0;
            border-color: transparent #fff transparent transparent;
            border-width: 12px;
            border-style: solid;
            margin-left: -41px;
            z-index: 1;
            :root .theme-dark & {
              border-color: transparent  #1e2233 transparent transparent;
            }
          }
        }
      }
    }

    .symbol-contain {
      height: calc(100% - 40px);
      width: 100%;
      @include flex(column);
      font-size: 12px;

      ul {
        @include flex();
        width: 100%;
        cursor: pointer;
        li {
          width: calc(100% - 30px);
          padding: 0 15px;
        }
        li.close {
          width: 0;
          height: 0;
          padding: 0;
          padding: 0;
          @include flex();
          color: #fff;
          font-size: 15px;
          border-radius: 2px;
          transform: translate(-10px, -19px);
          i {
            display: none;
            width: 15px;
            height: 15px;
            border-radius: 2px;
            background: $color;
          }
        }
        .select-icon {
          width: 0;
          padding: 0 0 0 0;
          cursor: pointer;
          user-select: none;
          color: #999;
          @include flex();
          overflow: hidden;
          @include transition();
          i {
            font-size: 22px;
            @include transition(100ms, transform);
            transform: scale(0);
            &:hover {
              opacity: .8;
            }
          }
        }
        .select-icon.selected {
          color: $color;
        }
        .desc {
          padding: 0;
          width: 0;
          height: 0;
          margin: 0;
          div {
            border-radius: 3px;
            background: #fff;
            width: 50px;
            height: 16px;
            // padding: 0 10px;
            line-height: 16px;
            text-align: center;
            transform: translateX(-133px);
            margin-top: -8px;
            @include transition();
          }
          .open {
            transform: translateX(-116px);
          }
        }

        .symbol {
          width: 36%;
          @include flex(column, center, flex-start);

          span {
            height: 20px;
            line-height: 20px;
            white-space: nowrap;
            :root .theme-dark & {
             color: #B4C5F7
            }
          }
        }
        .rise {
          background: $fall-color !important;
          color: #fff !important;
          line-height: 16px;
          // font-weight: 600;
        }

        .fall {
          background: $down-color !important;
          color: #fff !important;
          line-height: 16px;
          // font-weight: 600;
        }
        .unset {
          background: #e3e3e3 !important;
          color: #C4C5CC !important;
          line-height: 16px;
          // font-weight: 600;
        }
        .center {
          text-align: center;
        }
        .sale {
          cursor: pointer;
          width: calc(28% + 10px);
          margin-right: 5px;
          @include flex();
          padding: 0;

          span {
            width: 100%;
            padding: 2px 3px;
            border-radius: 2px;
            background: #C3BECC;
            display: block;
            color: #fff;
            height: 16px;
          }
        }

        .entry {
          text-align: right;
          cursor: pointer;
          padding: 0 15px 0 0;
          width: calc(28% + 5px);

          span {
            width: 100%;
            padding: 2px 3px;
            border-radius: 2px;
            background: #C3BECC;
            display: block;
            color: #fff;
            height: 16px;
          }
        }
        &:hover {
          background: white;
          li.close i {
            display: block;
          }
        }
      }
      .all-symbols {
        &:hover {
          li.close i {
            display: none;
          }
        }
      }
      .thead {
        height: 25px;
        height: 26px;
        background: #f8f8f8;
        font-size: 13px;
        color: #888;
        border-bottom: 1px solid #eee;
        :root .theme-dark & {
          color: #576590;
          background: #23263c;
          border-bottom: 1px solid #23263c;
        }
      }

      .tbody {
        width: 100%;
        height: calc(100% - 26px);
        overflow-x: hidden;
        overflow-y: auto;
        ul {
          border-bottom: 1px solid #eee;
          height: 60px;
          :root .theme-dark & {
            border-color: #23263c;
          }

          .symbol {
            height: 100%;
          }
        }
        ul.disabled {
          .sale, .entry, .desc {
            cursor: not-allowed !important;
          }
        }
      }
    }
    .select-icon-show {
      .select-icon {
        padding-left: 15px !important;
        width: 20px !important;
        i {
          transform: scale(1) !important;
        }
      }
    }
  }

</style>
