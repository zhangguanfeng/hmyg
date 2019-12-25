<!--
 * @Autor: Diskfan
 * @Date: 2019-09-16 13:56:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-09-26 11:41:08
 * @Description: 行情
 -->
<template>
  <div class="chart-wrap">
    <div class="chart-action">
      <Transaction :ticker="options.item"/>
      <div class="action-right">
        <div class="theme" @mouseenter="themeVisible=true" @mouseleave="themeVisible=false">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2759" width="22"
               height="22">
            <path
              d="M614.826667 938.666667c-110.933333 0-163.413333-70.826667-148.906667-159.146667 18.346667-111.36-40.106667-194.986667-214.613333-92.16C91.306667 781.226667 0 670.293333 0 529.066667S119.466667 85.333333 523.093333 85.333333C776.533333 85.333333 1024 231.253333 1024 506.453333 1024 781.226667 747.52 938.666667 614.826667 938.666667zM522.24 128C151.893333 128 42.24 400.213333 42.24 527.36c0 127.146667 69.973333 193.28 195.84 119.466667 212.48-125.013333 289.706667 12.373333 268.8 121.173333-15.36 79.36 21.333333 128 107.946667 128 121.6 0 366.933333-141.653333 366.933333-389.12C981.76 259.413333 754.346667 128 522.24 128z"
              fill="#5171d2" p-id="2760"></path>
            <path
              d="M810.666667 512c-46.933333 0-85.333333-38.4-85.333334-85.333333s38.4-85.333333 85.333334-85.333334 85.333333 38.4 85.333333 85.333334-38.4 85.333333-85.333333 85.333333z m42.666666 170.666667c0 46.933333-38.4 85.333333-85.333333 85.333333s-85.333333-38.4-85.333333-85.333333 38.4-85.333333 85.333333-85.333334 85.333333 38.4 85.333333 85.333334z m-256-341.333334c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333334 85.333333-38.4 85.333333-85.333334 85.333333z m-256 42.666667c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333334 85.333333 38.4 85.333334 85.333334-38.4 85.333333-85.333334 85.333333z m-170.666666 170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334s38.4-85.333333 85.333334-85.333333 85.333333 38.4 85.333333 85.333333-38.4 85.333333-85.333333 85.333334z"
              fill="#5171d2" p-id="2761"></path>
            <path
              d="M810.666667 512c-46.933333 0-85.333333-38.4-85.333334-85.333333s38.4-85.333333 85.333334-85.333334 85.333333 38.4 85.333333 85.333334-38.4 85.333333-85.333333 85.333333z m0-128c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666 42.666667-19.2 42.666666-42.666666-19.2-42.666667-42.666666-42.666667z m42.666666 298.666667c0 46.933333-38.4 85.333333-85.333333 85.333333s-85.333333-38.4-85.333333-85.333333 38.4-85.333333 85.333333-85.333334 85.333333 38.4 85.333333 85.333334z m-128 0c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667-42.666667 19.2-42.666667 42.666667z m-128-341.333334c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333334 85.333333-38.4 85.333333-85.333334 85.333333z m0-128c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667 42.666667-19.2 42.666667-42.666667-19.2-42.666667-42.666667-42.666667z m-256 170.666667c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333334 85.333333 38.4 85.333334 85.333334-38.4 85.333333-85.333334 85.333333z m0-128c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666666 42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667z m-170.666666 298.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334s38.4-85.333333 85.333334-85.333333 85.333333 38.4 85.333333 85.333333-38.4 85.333333-85.333333 85.333334z m0-128c-23.466667 0-42.666667 19.2-42.666667 42.666666s19.2 42.666667 42.666667 42.666667 42.666667-19.2 42.666666-42.666667-19.2-42.666667-42.666666-42.666666z"
              fill="#5171d2" p-id="2762"></path>
          </svg>
          <transition name="slide-fade">
            <ul v-show="themeVisible" class="theme-list">
              <li @click="goSwitchTheme(true)" :class="{active: dark }">
                <img src="@/assets/trade/kLine2.png" alt="kLine">
                深色
              </li>
              <li @click="goSwitchTheme(false)" :class="{active: !dark }">
                <img src="@/assets/trade/kLine1.png" alt="kLine">
                浅色
              </li>
            </ul>
          </transition>
        </div>
        <div class="time-select">
          <div class="current"
               @mouseenter="timeListVisible=true"
               @mouseleave="timeListVisible=false">
            <span class="text">{{activeButtonList[activeIndex].value}}</span>
            <span class="pointer" :class="{active: timeListVisible}">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <transition name="slide-fade">
              <ul v-show="timeListVisible" class="time-list">
                <template v-for="(item, key) in activeButtonList">
                  <li
                    :class="{active: activeIndex==key}"
                    :key="key"
                    @click.stop="timeChangeHandle(item, key)">
                    {{item.value}}
                  </li>
                </template>
              </ul>
            </transition>
          </div>
        </div>
        <div class="count-select" @mouseenter="showVisible=true" @mouseleave="showVisible=false">
          <svg class="icon" viewBox="0 0 1378 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17406"
               width="30" height="30">
            <path d="M0 0" p-id="17407" fill="#8a8a8a"></path>
            <path
              d="M546.395 236.325l-269.131 259.293 272.3-183.923 277.302 77.538 213.938-176.586 63.531 55.36 1.334-183.089-184.59 16.341 61.363 53.693-165.581 145.905z"
              p-id="17408" fill="#5171d2"></path>
            <path d="M578.078 938.668h227.945l1.667-447.552-229.612-61.030v508.582z" p-id="17409" fill="#5171d2"></path>
            <path d="M304.611 938.668h227.945v-500.244l-227.945 155.076v345.169z" p-id="17410" fill="#5171d2"></path>
            <path d="M851.711 938.668h227.945v-634.643l-227.945 186.591v448.052z" p-id="17411" fill="#5171d2"></path>
          </svg>
          <transition name="slide-fade">
            <ul class="list" v-show="showVisible">
              <li
                v-for="(item, key) in kLineIndexList"
                :key="key"
                :class="{active: ~KLineActive.indexOf(item)}"
                @click.stop="kLineChangeHandle(item, key)">
                {{item.value}}
              </li>
            </ul>
          </transition>
        </div>
        <div class="full-window" v-show="!fullscreen" @click="fullWindowHandle" :title="fullWindow ? '退出满窗口':'满窗口模式'">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3031" width="20"
               height="20">
            <path
              d="M904.533333 119.466667h-268.8a38.4 38.4 0 1 1 0-76.8h307.2a38.4 38.4 0 0 1 38.4 38.4v307.2a38.4 38.4 0 1 1-76.8 0V119.466667z m-785.066666 0v268.8a38.4 38.4 0 1 1-76.8 0V81.066667a38.4 38.4 0 0 1 38.4-38.4h307.2a38.4 38.4 0 1 1 0 76.8H119.466667z m785.066666 785.066666v-268.8a38.4 38.4 0 1 1 76.8 0v307.2a38.4 38.4 0 0 1-38.4 38.4h-307.2a38.4 38.4 0 1 1 0-76.8h268.8z m-785.066666 0h268.8a38.4 38.4 0 0 1 0 76.8H81.066667a38.4 38.4 0 0 1-38.4-38.4v-307.2a38.4 38.4 0 1 1 76.8 0v268.8z"
              p-id="3032" fill="#5171d2"></path>
          </svg>
          <svg class="center" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8138"
               width="10" height="10">
            <path d="M64 64h896v896H64V64z" p-id="8139" fill="#5171d2"></path>
          </svg>
          <!-- <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2616" width="18" height="18"><path d="M61.370182 253.858909a38.074182 38.074182 0 0 0 38.074182-38.027636V100.352c0-12.706909 10.333091-23.04 22.993454-23.04h115.479273a38.074182 38.074182 0 1 0 0-76.148364H90.507636C53.504 1.163636 23.296 31.371636 23.296 68.421818v147.456c0 20.992 17.035636 38.027636 38.074182 38.027637zM237.870545 901.585455h-115.432727a23.086545 23.086545 0 0 1-23.04-22.993455v-115.479273a38.074182 38.074182 0 1 0-76.148363 0v147.409455c0 37.003636 30.208 67.211636 67.211636 67.211636H237.870545a38.074182 38.074182 0 1 0 0-76.148363z m723.828364-176.54691a38.074182 38.074182 0 0 0-38.074182 38.074182v115.432728a23.086545 23.086545 0 0 1-22.993454 23.04h-115.525818a38.074182 38.074182 0 1 0 0 76.148363h147.456c37.003636 0 67.211636-30.208 67.211636-67.211636v-147.409455a38.074182 38.074182 0 0 0-38.074182-38.074182zM932.608 1.210182h-147.456a38.074182 38.074182 0 1 0 0 76.101818h115.525818c12.660364 0 22.993455 10.333091 22.993455 23.04v115.432727a38.074182 38.074182 0 1 0 76.148363 0V68.421818c0-37.003636-30.208-67.211636-67.211636-67.211636z m-728.901818 247.621818v481.186909c0 37.003636 30.254545 67.211636 67.258182 67.211636h481.186909c37.003636 0 67.211636-30.208 67.211636-67.211636V248.832c0-37.003636-30.208-67.211636-67.211636-67.211636H270.964364c-37.003636 0-67.211636 30.208-67.211637 67.211636zM276.037818 701.905455V276.945455c0-12.660364 10.333091-23.04 23.04-23.04h425.053091c12.660364 0 23.04 10.379636 23.04 23.04v425.05309a23.086545 23.086545 0 0 1-23.04 23.04H299.031273a23.086545 23.086545 0 0 1-23.04-23.04z" fill="#8a8a8a" p-id="2617"></path></svg> -->
        </div>
        <div class="fullscreen" @click="fullScreenHandle" :title="fullscreen?'退出全屏':'全屏模式'">
          <svg v-if="!fullscreen" class="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2958" width="18" height="18">
            <path
              d="M1006.524928 0.017041h-240.271583a17.466551 17.466551 0 0 0-12.35439 29.820941l82.220595 82.254676-182.623444 182.623444a56.438261 56.438261 0 0 0 79.817879 79.817879L915.937429 191.842375l78.216069 78.216069a17.466551 17.466551 0 0 0 29.820941-12.35439v-240.271584A17.466551 17.466551 0 0 0 1006.524928 0.017041zM994.170539 753.890435l-84.26546 84.265459-176.574053-176.574053a56.438261 56.438261 0 1 0-79.817879 79.817879l176.557012 176.574054-76.205285 76.205285a17.466551 17.466551 0 0 0 12.35439 29.820941h240.271583a17.466551 17.466551 0 0 0 17.466552-17.466551v-240.271584a17.466551 17.466551 0 0 0-29.78686-12.37143zM189.891233 110.047793l80.226853-80.226852a17.466551 17.466551 0 0 0-12.35439-29.820941h-240.271584A17.466551 17.466551 0 0 0 0.025561 17.466551v240.271584a17.466551 17.466551 0 0 0 29.820941 12.35439L110.090395 189.848632l184.617187 184.685349a56.438261 56.438261 0 0 0 79.783798-79.817879zM294.707582 661.581841l-178.584837 178.584837-86.276243-86.276243a17.466551 17.466551 0 0 0-29.820941 12.35439v240.271583a17.466551 17.466551 0 0 0 17.466551 17.466551h240.271584a17.466551 17.466551 0 0 0 12.35439-29.820941l-74.177462-74.177461 178.550756-178.584837a56.438261 56.438261 0 1 0-79.817879-79.817879z"
              p-id="2959" fill="#5171d2"></path>
          </svg>
          <svg v-else class="reduce" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3741" width="18" height="18">
            <path
              d="M665.209896 391.219086h284.654401a31.874641 31.874641 0 0 0 22.450834-55.434158l-95.069581-93.960897 139.971249-139.971249a22.450834 22.450834 0 0 0 0-31.59747L954.021859 6.783201a22.450834 22.450834 0 0 0-31.59747 0l-140.24842 139.971249-95.069581-95.069581a31.874641 31.874641 0 0 0-55.434158 22.450834V360.453129A31.874641 31.874641 0 0 0 665.209896 391.219086zM146.623348 241.824031l-95.069581 95.069581a31.874641 31.874641 0 0 0 22.450834 55.434158H360.322027A31.874641 31.874641 0 0 0 391.087985 360.453129V74.135703a31.874641 31.874641 0 0 0-55.434158-22.450834L241.692929 146.75445 101.72168 6.50603a22.728005 22.728005 0 0 0-31.874641 0L6.652099 69.978141a22.450834 22.450834 0 0 0 0 31.59747zM360.322027 632.912015H74.004601a31.874641 31.874641 0 0 0-22.450834 55.434158l95.069581 95.069581-139.971249 138.585395a22.450834 22.450834 0 0 0 0 31.59747l63.19494 63.749282a22.450834 22.450834 0 0 0 31.874641 0l139.971249-139.971249 95.069581 95.069581a31.874641 31.874641 0 0 0 55.434158-22.450834V665.340998A31.874641 31.874641 0 0 0 360.322027 632.912015zM877.24555 782.307071l95.069581-95.069581a31.874641 31.874641 0 0 0-22.450834-55.434158H665.209896A31.874641 31.874641 0 0 0 632.780914 665.340998v284.654401a31.874641 31.874641 0 0 0 55.434158 22.450834l95.069581-95.069581 139.971248 139.971249a22.728005 22.728005 0 0 0 31.597471 0l63.47211-63.472111a22.450834 22.450834 0 0 0 0-31.59747z"
              p-id="3742" fill="#5171d2"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="draw-map" v-show="!resizing" :id="options.id"></div>
    <!--拖拽下面的高度时候显示，防止iframe导致无法拖拽-->
    <div class="layer" v-show="draging"></div>
  </div>
</template>
<script>
import Transaction from './transaction.vue';
import { widget } from '@/charting_library.min';
// import Datafeeds from '@/datafeed.js';
// import TVChartContainer from '@/components/TVChartContainer.vue';
import { fullscreen, defaultDurationActive } from '@/common/util';
// 基础配置
const disabled_features = [
  'display_market_status',
  'pane_context_menu',
  "context_menus",
  "legend_context_menu",
  'timeframes_toolbar',
  'go_to_date',
  'header_widget',
  'header_indicators',
  'header_chart_type',
  'header_resolutions',
  'header_settings',
  'header_fullscreen_button',
  // 缩放"control_bar",
  'header_symbol_search',
  'header_saveload',
  'header_interval_dialog_button',
  'header_undo_redo',
  'header_compare',
  'header_screenshot',
  'volume_force_overlay',
  "create_volume_indicator_by_default",
  'compare_symbol',
  'edit_buttons_in_legend',
  // "chart_zoom"
];
// 开启列表功能
const enabled_features = [
  // tradingview的logo位置
  'move_logo_to_main_pane',
  'side_toolbar_in_fullscreen_mode',
  'keep_left_toolbar_visible_on_small_screens',
  // "right_bar_stays_on_scroll",
  // "hide_left_toolbar_by_default",
  // "hide_last_na_study_output",
  // "timezone_menu"
];
// k线图的样式
const overrides = {
  'paneProperties.background': '#fff',
  // 蜡烛样式
  'mainSeriesProperties.candleStyle.upColor': '#26A69A', // '#41AD7A',
  'mainSeriesProperties.candleStyle.downColor': '#EF5350', // '#DF5858',
  // 烛心
  'mainSeriesProperties.candleStyle.drawWick': true,
  // 烛心颜色
  'mainSeriesProperties.candleStyle.wickUpColor': '#41AD7A',
  'mainSeriesProperties.candleStyle.wickDownColor': '#DF5858',
  // 边框
  'mainSeriesProperties.candleStyle.drawBorder': true,
  'mainSeriesProperties.candleStyle.borderUpColor': '#64ae74',
  'mainSeriesProperties.candleStyle.borderDownColor': '#df5f61',
  // 网格
  'paneProperties.vertGridProperties.style': 1,
  'paneProperties.horzGridProperties.color': '#f4f4f4',
  'paneProperties.vertGridProperties.color': '#f4f4f4',
  // 坐标轴和刻度标签颜色
  'scalesProperties.lineColor': '#5D6B84',
  'scalesProperties.textColor': '#5A6881',
  'paneProperties.legendProperties.showLegend': false,
  'use_localstorage_for_settings': true,
  'save_chart_properties_to_local_storage': true,
  // "paneProperties.topMargin": 5,
  // "volumePaneSize": "medium",
  // 成交量高度---中等--tiny
  // "MACDPaneSize": "tiny"
  // "paneProperties.bottomMargin": 5
};
const overrides_dark = {
  'paneProperties.background': '#1B1D2B',
  // 蜡烛样式
  'mainSeriesProperties.candleStyle.upColor': '#26A69A', // '#41AD7A',
  'mainSeriesProperties.candleStyle.downColor': '#EF5350', // '#DF5858',
  // 烛心
  'mainSeriesProperties.candleStyle.drawWick': true,
  // 烛心颜色
  'mainSeriesProperties.candleStyle.wickUpColor': '#41AD7A',
  'mainSeriesProperties.candleStyle.wickDownColor': '#DF5858',
  // 边框
  'mainSeriesProperties.candleStyle.drawBorder': true,
  'mainSeriesProperties.candleStyle.borderUpColor': '#64ae74',
  'mainSeriesProperties.candleStyle.borderDownColor': '#df5f61',
  // 网格
  'paneProperties.vertGridProperties.style': 0,
  'paneProperties.horzGridProperties.color': '#242A3F',
  'paneProperties.vertGridProperties.color': '#242A3F',
  // 坐标轴和刻度标签颜色
  'scalesProperties.lineColor': '#5D6B84',
  'scalesProperties.textColor': '#7583A2',
  'paneProperties.legendProperties.showLegend': false,
};
// k线图下半部分图标的样式
const studies_overrides = {
  'volume.volume.color.0': '#FB4C4C',
  'volume.volume.color.1': '#10DF61',
};
const studies_overrides_dark = {
  'volume.volume.color.0': '#FB4C4C',
  'volume.volume.color.1': '#10DF61',
};

export default {
  props: {
    options: {
      required: true,
      type: Object,
    },
    draging: {
      default: false,
      type: Boolean,
    },
    theme: {
      default: 'light',
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    // fullWindow: {
    //   default: false,
    //   type: Boolean,
    // },
    resizing: {
      default: false,
      type: Boolean,
    },
    loading: Boolean,
  },
  computed: {
    fullWindow() {
      return this.$store.state.fullWindow
    },
    activeButtonList() {
      return this.$store.state.activeButtonList;
    },
    kLineIndexList() {
      return this.$store.state.kLineIndexList;
    },
    widget: {
      get() {
        return this.$store.state.widget;
      },
      set(val) {
        this.$store.commit('updateWidget', val);
      }
    }
  },
  data() {
    return {
      precision: 4,
      activeIndex: 0,
      KLineActive: [],
      // widget: null,
      timeListVisible: false,
      showVisible: false,
      themeVisible: false,
      widgetOptions: {},
      timmer: null,
      dark: false,
      datafeed: null,
    };
  },
  watch: {
    dark(val) {
      if (val) {
        document.body.classList.add('theme-dark');
        this.$root.$emit('changeTheme', 'dark');
        localStorage.setItem('cpt_trade_theme/v2', 'dark');
        this.widgetOptions.overrides = overrides_dark;
        this.widgetOptions.studies_overrides = studies_overrides_dark;
        this.widget.changeTheme('Dark');
        this.widget.applyOverrides(overrides_dark);
        this.widget.applyStudiesOverrides(studies_overrides_dark);
      } else {
        document.body.classList.remove('theme-dark');
        this.$root.$emit('changeTheme', 'light');
        localStorage.setItem('cpt_trade_theme/v2', 'light');
        this.widgetOptions.overrides = overrides;
        this.widgetOptions.studies_overrides = studies_overrides;
        this.widget.changeTheme('Light');
        this.widget.applyOverrides(overrides);
        this.widget.applyStudiesOverrides(studies_overrides);
      }
      this.$emit('setOptions', this.options.id, 'theme', this.dark ? 'dark' : 'light');
    },
    'options.resolution' () {
      this.activeIndex = this.$store.state.supportedResolutions.indexOf(this.options.resolution + '') + 1
    }
  },
  methods: {
    kLineChangeHandle(item, key) {
      if (!this.widget) return;
      const index = this.KLineActive.indexOf(item);
      if (~index) this.KLineActive.splice(index, 1);
      else this.KLineActive.push(item);
      this.$emit('setOptions', this.options.id, 'kLineActive', this.KLineActive);

      // const sessionKey = `trade_study${val}_id`;
      // const entidyId = sessionStorage.getItem(sessionKey);
      if (~index) {
        this.widget.chart().removeEntity(item.entidyId);
        // sessionStorage.removeItem(sessionKey);
        // this.KLineActive = Object.assign({}, this.KLineActive, { [val]: false });
      } else {
        this.widget.chart().createStudy(item.studyKey, false, false, item.studyVal, (entidyId) => {
          item.entidyId = entidyId;
          // sessionStorage.setItem(sessionKey, entidyId);
        });
        // this.KLineActive = Object.assign({}, this.KLineActive, { [val]: true });
      }
    },
    timeChangeHandle(item, key) {
      if (!this.widget || this.options.resolution === item.resolution && this.options.chartType === item.chartType) return;
      this.timeListVisible = false;
      this.activeIndex = key;
      const resolution = item.resolution;
      const shortResolution = this.$store.state.activeButtonList.filter(el => el.resolution == resolution)[0].short;
      defaultDurationActive(this.options.symbol, key);
      this.$emit('setOptions', this.options.id, 'resolution', item.resolution);
      this.$emit('setOptions', this.options.id, 'start', 0);
      this.$emit('setOptions', this.options.id, 'startLoadDate', parseInt(+new Date() / 1000, 10));
      this.$emit('setOptions', this.options.id, 'isFirstLoad', true);
      this.$emit('setOptions', this.options.id, 'endLoadDate', 0);
      this.$emit('setOptions', this.options.id, 'noData', false);
      this.$emit('setOptions', this.options.id, 'shortResolution', shortResolution);
      this.$emit('setOptions', this.options.id, 'chartType', item.chartType);
      if (!item.action) {
        this.widget.chart().setChartType(item.chartType);
        this.widget.chart().setResolution(item.resolution, () => {
          // this.widget.chart().resetData();
          // this.options.datafeed.sendHistoryMessage();
        });
      } else {
        this.widget.chart().executeActionById(item.action);
      }
    },
    // changeTheme(theme) {
    //   this.theme = theme;
    // },
    maHandle() {
    },
    fullScreenHandle(e, type) {
      // 全屏操作在index.vue处理
      fullscreen(this.fullscreen, document.querySelector('#kLine'));
    },
    fullWindowHandle() {
      this.$emit('fullWindow');
    },
    sendMessage(all = false) {
      const { options } = this;
      const { datafeed } = this.options;
      datafeed.changeWidget(this.options);
      window.datafeed = this.options
      // 历史数据
      datafeed.sendHistoryMessage();
      if (!all) return;
      // 发送订阅消息
      datafeed.sendTakeMessage();
    },
    init() {
      this.widgetOptions.overrides = this.theme === 'dark' ? overrides_dark : overrides;
      this.widgetOptions.studies_overrides = this.theme === 'dark' ? studies_overrides_dark : studies_overrides;
      this.widget = new widget(this.widgetOptions);
      // if (this.widget) {
      //   this.widget.subscribe('drawing_event', function(){
      //     console.log('drawing_event', arguments);
      //   });
      // }
      const { datafeed } = this.options;
      this.$emit('setOptions', this.options.id, 'widget', this.widget);
      this.datafeed = datafeed;
      datafeed.changeWidget(this.options);
      this.widget.onChartReady(() => {
        this.widget.activeChart().createStudy('Moving Average', false, false, [5, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#BB503B',
        });
        this.widget.activeChart().createStudy('Moving Average', false, false, [10, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#007C7F',
        });
        this.widget.activeChart().createStudy('Moving Average', false, false, [15, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#a00a7F',
        });
        this.widget.activeChart().createStudy('Moving Average', false, false, [30, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#607C7F',
        });
        this.widget.changeTheme('Light')
        // setTimeout(() => {
        //   this.sendMessage(true);
        //   // this.datafeed.sendHistoryMessage();
        //   // this.datafeed.sendTakaMessage();
        // }, 100)
        // // setTimeout(() => {
        // //   this.sendMessage(true);
        // }, 1000)
        // this.$emit('setOptions', this.options.id, 'loading', false);
        // console.warn('ready -> end')
      });
      // this.sendMessage(true);
    },
    changeSymbol(info) {
      // if (info.partitionType === 'LUD') {
      //   this.widgetOptions.resolution = 'D'; // 涨停区要求展示默认为1天   其他默认为15分钟
      // } else {
      //   this.widgetOptions.resolution = '15'; // 涨停区要求展示默认为1天   其他默认为15分钟
      // }
      // this.widgetOptions.theme = this.theme === 'dark' ? 'Dark' : 'Light';
      // this.init();
    },
    goSwitchTheme(type) {
      this.themeVisible = false;
      this.dark = type;
    },
    
  },
  created() {
    window.view = this
    this.activeIndex = defaultDurationActive(this.options.symbol);
    // this.$emit('createNewWidget', {
    //   symbol_name: this.options.symbol_name,
    //   symbol: this.options.symbol
    // });
    // this.init();
  },
  beforeDestroy() {
    clearTimeout(this.timmer);
  },
  mounted() {
    const { options } = this;
    window.trade = this;
    this.widgetOptions = {
      theme: this.theme,
      custom_css_url: '../theme.css',
      // debug: true, // uncomment this line to see Library errors and warnings in the console
      fullscreen: this.fullscreen,
      fullWindow: this.fullWindow,
      symbol: options.symbol,
      interval: options.resolution,
      container_id: options.id,
      timezone: 'Asia/Shanghai',
      datafeed: options.datafeed, // new Datafeeds.UDFCompatibleDatafeed(this.symbol, this.precision),
      library_path: options.libraryPath,
      locale: 'zh',
      disabled_features,
      enabled_features,
      charts_storage_url: options.chartsStorageUrl,
      charts_storage_api_version: options.chartsStorageApiVersion,
      client_id: options.clientId,
      user_id: options.userId,
      autosize: options.autosize,
      overrides,
      studies_overrides,
      dragData: options.dragData, // 当前画图数据
      allData: options.allData, // 已经拿到的所有数据，获取数据之后，简单的去重处理
      lastSendTime: options.lastSendTime, // 最后一次获取历史数据的时间
    };
  },
  components: { Transaction },
};
</script>
<style lang="scss">
  $cub: cubic-bezier(0.1, 0.57, 0.58, 1);
  .slide-fade-enter-active {
    transition: all .3s $cub;
  }

  @mixin boxshadow() {
    box-shadow: 0px 0px 10px #12151f;
  }


  .slide-fade-leave-active {
    transition: all .3s $cub;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  .chart-wrap {
    width: 100%;
    height: calc(100% - 72px);

    :root .theme-dark & {
      background: $color-dark-bg;
      border-color: #434F6A;
    }

    .draw-map {
      width: 100%;
      height: 100%;

      > * {
        width: 100%;
        height: 100%;
      }
    }

    .chart-action {
      background: #fff;
      height: 30px;
      width: 100%;
      display: flex;
      font-size: 12px;
      align-items: center;
      flex-wrap: nowrap;
      padding: 5px 0;
      border-bottom: 1px solid #e3e3e3;
      :root .theme-dark & {
        background: $color-dark-bg;
        border-color: #434F6A;
      }

      .theme {
        width: 30px;
        margin-right: 10px;
        height: 100%;
        cursor: pointer;

        .theme-list {
          position: absolute;
          width: auto;
          height: auto;
          background: #fff;
          border: 1px solid #e3e3e3;
          margin-left: -70px;
          margin-top: 18px;
          @include boxshadow();

          :root .theme-dark & {
            background: #2F3243;
            border-color: #2F3243;
            color: #B4C5F7;
          }

          &:before {
            content: ' ';
            width: 0;
            height: 0;
            border-color: transparent transparent #fff transparent;
            border-width: 14px;
            border-style: solid;
            transform: translate(14px, -28px);
            position: absolute;
            z-index: 1;
            :root .theme-dark & {
              border-color: transparent transparent  #595D74 transparent;
            }
          }

          &:after {
            content: ' ';
            width: 0;
            height: 0;
            border-color: transparent transparent #e3e3e3 transparent;
            border-width: 14px;
            border-style: solid;
            transform: translate(14px, -297px);
            position: absolute;
            :root .theme-dark & {
              border-color: transparent transparent  #595D74 transparent;
            }
          }

          li {
            display: flex;
            flex-direction: column;
            padding: 20px 10px 10px 10px;
            line-height: 30px;
            cursor: pointer;

            img {
              width: 104px;
              height: 74px;
            }
          }

          .active {
            background: #EAEAFF;
            :root .theme-dark & {
              color: #B4C5F7;
              background: #595D74;
              border-color: #595D74;
            }
          }
        }
      }

      .action-right {
        display: flex;
        width: calc(100% - 450px);
        align-items: center;
        justify-content: flex-end;
        flex-wrap: nowrap;

        .full-window {
          margin: 0 15px 0 0;
          cursor: pointer;
          .center {
            position: absolute;
            transform: translate(-15px, 5px);
            transition: .3s all $cub;
          }

          &:hover {
            svg {
              path {
                fill: #1B1D2B;
              }
            }

            :root .theme-dark & {
              svg path {
                fill: #B4C5F7;
              }
            }

            .center {
              transform: translate(-15px, 5px) scale(1.4);
            }
          }
        }

        .fullscreen {
          margin: 0 5px;
          cursor: pointer;

          svg {
            transition: .3s all $cub;

            &:hover {
              transform: scale(1.1);
            }
          }

          .reduce {
            transform: scale(1.1);

            &:hover {
              transform: scale(1);
            }
          }
        }

        .count-select {
          width: 30px;
          margin-right: 12px;
          display: flex;
          justify-content: center;
          cursor: pointer;

          .list {
            width: 80px;
            height: 265px;
            padding: 5px 0;
            background: #fff;
            border: 1px solid #e7e7e7;
            position: absolute;
            margin-top: 30px;
            margin-left: 32px;
            @include boxshadow();
            color: #666;

            :root .theme-dark & {
              background: $color-dark-bg;
              border-color: #434F6A;
              color: #B4C5F7;
            }

            li {
              height: 22px;
              line-height: 22px;
              text-align: left;
              padding: 0 5px;
              width: calc(100% - 10px);
              cursor: pointer;
              margin: 2px 0;
              transition: .3s all $cub;

              &:hover {
                color: #333;
                background: #E9E9E9;

                :root .theme-dark & {
                  background: #B4C5F7;
                  border-color: #434F6A;
                  color: #000;
                }
              }
            }

            .active {
              background: #8B8BE1;
              color: #fff;
            }
          }
        }

        .time-select {
          width: 75px;
          margin-right: 10px;
          cursor: pointer;

          .current {
            border: 1px solid #e3e3e3;
            height: 25px;
            line-height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;

            :root .theme-dark & {
              border-color: #434F6A;
              color: #B4C5F7;
            }

            .text {
              border-right: 1px solid #eee;
              width: calc(100% - 17px);
              text-align: center;

              :root .theme-dark & {
                border-color: #5171d2;
                color: #5171d2;
              }
            }

            .pointer {
              width: 17px;

              i {
                font-size: 17px;
                transform: translateY(2px);
                transition: .3s all ease;
                color: #777;
                :root .theme-dark & {
                  color: #5171d2;
                }
              }
            }

            .active {
              i {
                transform: translateY(3px) rotateZ(180deg);
              }
            }
          }

          .time-list {
            min-width: 73px;
            min-height: 120px;
            background: #fff;
            border: 1px solid #e3e3e3;
            position: absolute;
            margin-top: 135px;
            padding: 5px 0px;
            margin-left: 0px;
            @include boxshadow();
            color: #666;

            :root .theme-dark & {
              background: $color-dark-bg;
              border-color: #434F6A;
              color: #B4C5F7;
            }

            li {
              text-align: left;
              width: calc(100% - 6px);
              height: 23px;
              line-height: 23px;
              padding: 0 3px;
              transition: .2s all $cub;

              &:hover {
                color: #333;
                background: #E9E9E9;

                :root .theme-dark & {
                  background: #B4C5F7;
                  border-color: #434F6A;
                  color: #000;
                }
              }
            }

            .active {
              color: #fff;
              background: #8B8BE1;
            }
          }
        }
      }
    }

    .TVChartContainer {
      width: 100%;
      height: calc(100% - 35px);
    }

    .layer {
      width: calc(100% - 500px);
      height: 100%;
      background: transparent;
      position: absolute;
      transform: translate(calc(-50vh + 550px), -100%);
    }

    .kline-index {
      padding: 5px 10px;
      display: flex;
      border-top: 2px solid #bec4d3;
      background-color: #fff;
      border-radius: 0 0 2px 2px;
      height: 30px;
      box-sizing: border-box;

      :root .theme-dark & {
        background-color: $color-dark-bg;
        border-top-color: #000;
      }

      .k-index-item {
        margin: 0;
        padding: 0 5px;
        font-size: 12px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        line-height: 18px;
        color: rgba(255, 255, 255, 1);
        background-color: #8B8BE1;
        cursor: pointer;

        & + & {
          margin-left: 4px;
        }

        &--active {
          background-color: $color;
          color: #fff;
        }

        :root .theme-dark & {
          background-color: #282c41;
          color: #b2bcd4;

          &--active {
            background-color: $color;
            color: #fff;
          }
        }
      }
    }

  }
</style>
