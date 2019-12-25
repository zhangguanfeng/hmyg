<!--
 * @Autor: Diskfan
 * @Date: 2019-09-12 10:44:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-26 10:36:25
 * @Description:
 -->
<template>
  <div class='kLine' id="kLine">
    <template v-if="views.length">
      <div class="opened tabs">
<!--        <Draggable class="tabs" ref="tabs" v-model="views" @update="datadragEnd" :options="{animation:500}">-->
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="close" @tab-click="tabPaneChange">
            <el-tab-pane
              v-for="(item, index) in inTabs"
              :key="item.name"
              :label="`${item.symbol + '.' + item.shortResolution}`"
              :name="`${index}`"
            >
            </el-tab-pane>
          </el-tabs>
          <!--          <transition-group name="list" tag="p" v-on:leave="leave">-->
          <!--            <div-->
          <!--              class="tab view-tab-item"-->
          <!--              v-for="(item, key) in inTabs"-->
          <!--              :key="item.id"-->
          <!--              @click="tabChange(item, key)"-->
          <!--              :class="{active: activeIndex === keys.indexOf(item.id)}">-->
          <!--                <span class="name">-->
          <!--                  {{item.symbol + '.' + item.shortResolution}}-->
          <!--                </span>-->
          <!--                <i class="el-icon-close close" @click.stop="close(key, item)"></i>-->
          <!--            </div>-->
          <!--          </transition-group>-->
<!--        </Draggable>-->
        <!--        <div class="more-view" v-show="inSlide.length"  @mouseenter="showMoreTabs=true" @mouseleave="showMoreTabs=false">-->
        <!--          <i class="el-icon-d-arrow-right icon"></i>-->
        <!--            <transition name="slide-down-fade">-->
        <!--            <div class="more-view-wrap" v-show="showMoreTabs" :style="{maxHeight: moreStyleMaxHeight + 'px'}">-->
        <!--              <div-->
        <!--                class="tab view-tab-item"-->
        <!--                v-for="(item, key) in inSlide"-->
        <!--                :key="item.id"-->
        <!--                @click="tabChange(item, key)">-->
        <!--                  <span class="name">-->
        <!--                    {{item.symbol + '.' + item.shortResolution}}-->
        <!--                  </span>-->
        <!--                  <i class="el-icon-close close" @click.stop="close(key, item)"></i>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            </transition>-->
        <!--          </div>-->
      </div>
    </template>
    <template v-else></template>
    <TradingView
      v-if="views.length"
      ref="tradingView"
      :draging="draging"
      :options="options"
      :fullscreen="fullscreen"
      :fullWindow="fullWindow"
      :loading="resizing || options.loading"
      :theme="theme"
      :resizing="resizing"
      @setOptions="setOptions"
      @fullWindow="fullWindowHandle"
      @createNewWidget="createNewWidget"/>
    <div v-else v-loading="true" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
  import Draggable from 'vuedraggable'
  import TradingView from './tradingView.vue'
  import { defaultDurationActive, lastViewSymbol, modifyDocumentTitle, bindEvent, unBindEvent } from '@/common/util.js'

  export default {
    components: { Draggable, TradingView },
    name: 'kLine',
    props: {
      draging: {
        default: false,
        type: Boolean
      },
      personalInformation: {
        type: Object,
        default: () => ({})
      },
      ticker: {
        type: Object,
        default: () => ({})
      },
      fullWindow: {
        default: false,
        type: Boolean
      },
      resizing: {
        default: false,
        type: Boolean
      },
      views: {
        default: [],
        type: Array
      },
      activeIndex: {
        default: null,
        type: Number
      }
    },
    data() {
      return {
        // views: [],
        showMoreTabs: false,
        fullscreen: false,
        symbol: 'USDJPY', // USDJPY  EURUSD
        theme: 'light',
        exchange: [], // 交易对
        tradeSymbol: {}, // 当前操作的货币对，引用ctpSymbol.vue的对象
        moreStyleMaxHeight: document.body.clientHeight - 300,
      }
    },
    watch: {
      options() {
        modifyDocumentTitle(this.options)
      },
      'options.item.LASTPRICE'() {
        modifyDocumentTitle(this.options.item)
      }
    },
    computed: {
      inTabs() {
        return this.views.filter(el => el.inTabs)
      },
      inSlide() {
        return this.views.filter(el => !el.inTabs)
      },
      keys() {
        const arr = []
        for (let i in this.views) {
          arr.push(this.views[i].id)
        }
        return arr
      },
      options() {
        return this.views[this.activeIndex] || {}
      },
      widget() {
        return this.$store.state.widget
      },
      editableTabsValue: {
        get () {
          return this.activeIndex + '';
        },
        set(val) {
          this.$emit('update:activeIndex', +val)
        }
      }
    },
    methods: {
      takeData(flag = true) {
        if (!this.views.length) return
        if (flag) this.views[this.activeIndex].datafeed.sendTakeMessage()
        else this.views[this.activeIndex].datafeed.sendTakeMessage(false)
      },
      fullWindowHandle(e) {
        this.$emit('fullWindow')
      },
      close() {
        const key = +this.editableTabsValue;
        if (this.views.length === 1) {
          this.$message.info('请保持一个行情图')
          return
        }
        const views = this.views
        views.splice(key, 1)
        const active = Math.min(views.length - 1, this.activeIndex)
        lastViewSymbol(views[active].symbol)
        this.$emit('update:views', views)
        this.$emit('update:activeIndex', active)
        this.$nextTick(()=>{
          this.tabChange()
        })
      },
      tabPaneChange(vm, e) {
        const symbol = vm.label.replace(/\..*/g, '');
        for (const i in this.views) {
          if (this.views[i].symbol === symbol) {
            this.editableTabsValue = i;
            this.$nextTick(() => {
              this.tabChange();
            });
            return;
          }
        }
      },
      tabChange() {
        const key = +this.editableTabsValue;
        const item = this.inTabs[key];
        if (!this.widget) {
          return;
        }
        item.reset = item.symbol
        this.$store.state.kLineDataFeed.changeWidget(item);
        const chart = this.widget.chart()
        for (let v of this.views) {
          v.setHistory = v.symbol
        }
        chart.setSymbol(item.symbol, () => {

        })
      },
      // 刷新切换的k线数据，没有推送的情况下是没有历史数据的
      fetchReduceData() {
        const view = this.views[this.activeIndex]
        const { resolution } = view
        const times = view.allData[resolution].map(el => el.time).filter(el => !isNaN(el))
        if (!times.length) {
          return
        }
        const reduce = parseInt((+new Date() - Math.max(...times)) / 1000, 10)
        const end = Math.ceil(reduce / (parseInt(resolution, 10) * 60))
        if (end == 1) {
          return
        }
        view.datafeed.send({
          SYMBOL: view.symbol, // 品种类型
          PERIOD: resolution.toString(), // k线类型(详见注解)
          START: '1', // 起始根数
          END: end.toString() // 结束根数
        })
      },
      createNewWidget(item) {
        // if (this.views.length >= 7) {
        //   this.$message.info('最大只能同时打开7个')
        //   return
        // }
        const { kLineDataFeed } = this.$store.state
        this.tradeSymbol = item
        // 初始化保存所有数据的对象
        const allData = (() => {
          const temp = {}
          this.$store.state.supportedResolutions.forEach(el => temp[el] = [])
          return temp
        })()
        for (let i in this.views) {
          if (this.views[i].symbol === item.symbol) {
            this.editableTabsValue =` ${i}`;
            this.tabChange(this.views[i], +i)
            return
          }
        }
        try {
          const id = Math.random().toString(34).toUpperCase().replace(/.*\./, '')
          const resolution = this.$store.state.supportedResolutions[defaultDurationActive(item.symbol) - 1]
          const shortResolution = this.$store.state.activeButtonList.filter(el => el.resolution == resolution)[0].short
          const options = {
            name: item.symbol_name,
            // $ws: this.$store.state.kLineDataFeed._ws, // 链接句柄
            symbol: item.symbol, // 货币对
            // interval: '5', // 时间
            theme: this.theme, // 主题
            id,
            item,
            datafeed: this.$store.state.kLineDataFeed,
            // widget: null,
            loading: false,
            component: null,
            libraryPath: '/charting_library/',
            chartsStorageUrl: 'https://saveload.tradingview.com',
            clientId: 'tradingview.com',
            userId: 'public_user_id',
            autosize: false,
            kLineActive: [],
            resolution,
            shortResolution,
            setOptions: this.setOptions,
            allData, // 所有数据缓存
            lastSendTime: null, // 最后一次获取历史数据的时间
            // from: parseInt((+new Date() - 1 * 60 * 60 * 24 * 1000) / 1),
            // to: Date.parse(new Date()) / 1,
            chartsStorageApiVersion: '1.1',
            startLoadDate: parseInt(+new Date() / 1000, 10), // 开始加载的时间点
            isFirstLoad: true, // 第一次加载
            endLoadDate: 0, // 结束加载的时间点
            start: 0, // 开始柱数
            chartType: '1',
            noData: false,
            reset: null,
            setHistory: null,
            inTabs: true // 是否在tab中显示还是在收起的地方显示
            // active: false, // 当前是否处于激活状态
          }
          const views = [...this.views, options]
          this.$emit('update:views', views)
          this.$emit('update:activeIndex', views.length - 1)
          lastViewSymbol(item.symbol)
          modifyDocumentTitle(options.item)
          this.$nextTick(() => {
            // try {
            if (this.views.length === 1) {
              options.component = this.$refs.tradingView
              options.component.init()
              kLineDataFeed.changeWidget(options)
            } else {
              kLineDataFeed.changeWidget(options)
              this.tabChange(options, views.length - 1)
            }
          })
        } catch (e) {
          console.error(e)
        }
      },
      datadragEnd() {
      },
      leave(el) {
        const wrapReact = this.$el.getClientRects()[0]
        this.$nextTick(() => {
          const dom = el.getClientRects()[0]
          el.style.transform = `translate(${dom.left - wrapReact.left}px, 39px)`
        })
      },
      // 设置 options 值，多级或者下一级用 . 分开
      setOptions(id, key, val) {
        const keys = key.split(/\./)
        let current = []
        for (let v of this.views) {
          if (v.id === id) {
            current = v
            break
          }
        }
        let last = keys.pop()
        let shift = keys.shift()
        while (shift) {
          current = current[shift]
          shift = keys.shift()
        }
        if (!current) {
          return
        }
        current[last] = val
      },
      onResize() {
        this.moreStyleMaxHeight = document.body.clientHeight - 300
      }
    },
    created() {
      window.kline = this
      this.$root.$on('addView', item => this.createNewWidget(item))
      window.onbeforeunload = () => {
        for (const v of this.views) {
          try {
            v.$ws.close()
          } catch (e) {
            console.error(e)
          }
        }
        // return 'we';
      }
    }
  }
</script>
<style lang="scss">
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(0px);
  }

  .list-leave-active {
    position: absolute;
  }

  $cub: cubic-bezier(0.1, 0.57, 0.58, 1);
  $tab-height: 39px;
  @mixin flex($direction: row, $content: center, $align: center) {
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
    align-items: $align;
  }

  .kLine {
    @include flex(column, flex-start);
    width: 100%;
    height: 100%;
    background: #fafafa;

    :root .theme-dark & {
      background: $color-dark-bg;
    }

    .opened {
      height: $tab-height;
      width: 100%;
      display: flex;

      /*.more-view {*/
      /*  width: 40px;*/
      /*  background: #e3e3e3;*/
      /*  height: 100%;*/
      /*  line-height: 40px;*/
      /*  user-select: none;*/
      /*  cursor: pointer;*/
      /*  transition: .2s all ease-out;*/

      /*  .icon {*/
      /*    transition: .2s all ease-out;*/
      /*  }*/

      /*  .more-view-wrap {*/
      /*    border-radius: 2px 2px 3px 3px;*/
      /*    position: absolute;*/
      /*    z-index: 1;*/
      /*    min-width: 100px;*/
      /*    height: auto;*/
      /*    background: #fff;*/
      /*    right: 40px;*/
      /*    padding: 5px 0;*/
      /*    box-shadow: 2px 2px 5px #C2C2C2;*/
      /*    overflow: auto;*/
      /*    display: block;*/

      /*    > div {*/
      /*      border-bottom: 1px solid #e3e3e3;*/
      /*      padding: 2px 8px;*/
      /*      cursor: pointer;*/
      /*      user-select: none;*/
      /*      transition: .2s all ease-out;*/

      /*      &:hover {*/
      /*        color: #5B0EB2;*/
      /*        background: #e3e3e3;*/
      /*        opacity: .9;*/
      /*      }*/
      /*    }*/

      /*    > div:last-child {*/
      /*      border-bottom: none;*/
      /*    }*/
      /*  }*/

      /*  &:hover {*/
      /*    background: #f3f3f3;*/

      /*    .icon {*/
      /*      color: goldenrod;*/
      /*      transform: rotateZ(90deg);*/
      /*    }*/
      /*  }*/
      /*}*/
    }
    .tabs {
      width: calc(100%);
      border-bottom: 1px solid #e3e3e3;
      .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        background: #fff;
      }
      .el-tabs__header {
        margin: 0;
        width: 100%;
      }

      :root .theme-dark & {
        background: #5171d2;
        border-bottom-color: #434F6A
      }

      > * {
        width: 100%;
        padding: 0;
        margin: 0;
        height: $tab-height;
        background: #f7f7f7;
        @include flex(row, flex-start);

        :root .theme-dark & {
          background: $color-dark-bg;
        }

        .tab {
          padding: 0 20px 0 20px;
          border-right: 1px solid #e5e5e5;
          @include flex();
          font-size: 13px;
          height: $tab-height;
          cursor: pointer;
          color: $color;
          transition: .4s transform, color, opacity $cub;
          user-select: none;

          :root .theme-dark & {
            background: $color-dark-bg;
            color: #576590;
            border-right-color: #B4C5F7;
          }

          .name {
            font-weight: 600;
          }

          .close {
            width: 0;
            height: 0;
            transform: translate(5px, -15px);
          }

          &:hover {
            opacity: .7;
          }
        }

        .tab:last-child {
          border-right: none;
        }

        .active {
          height: 40px;
          z-index: 1;
          background: #ffffff;

          :root .theme-dark & {
            background: $color-dark-bg;
            color: #B4C5F7;
          }

          // background: #fff0e7;
        }
      }
    }
  }

  .is-fullscreen {
    position: absolute;
    height: 100% !important;
    z-index: 1000;
  }

  .slide-down-fade-enter-active {
    transition: all .3s ease-out;
  }

  .slide-down-fade-leave-active {
    transition: all .3s ease-out;
  }

  .slide-down-fade-enter, .slide-down-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
