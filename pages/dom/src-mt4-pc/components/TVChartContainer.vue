
<template>
<div class="TVChartContainer" :id="containerId">
</div>
</template>

<script>
import { widget } from '../charting_library.min';
import Datafeeds from '../datafeed.js';

// function getLanguageFromURL() {
//   const regex = new RegExp('[\\?&]lang=([^&#]*)');
//   const results = regex.exec(window.location.search);
//   return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
// }
// 禁用列表功能
const disabled_features = [
  'display_market_status',
  'pane_context_menu',
  // "context_menus",
  // "legend_context_menu",
  'timeframes_toolbar',
  'go_to_date',
  'header_widget',
  'header_indicators',
  'header_chart_type',
  'header_resolutions',
  'header_settings',
  'header_fullscreen_button',
  // 缩放"control_bar",
  'use_localstorage_for_settings',
  'header_symbol_search',
  'header_saveload',
  'header_interval_dialog_button',
  'header_undo_redo',
  'header_compare',
  'header_screenshot',
  'volume_force_overlay',
  // "create_volume_indicator_by_default",
  'compare_symbol',
  'save_chart_properties_to_local_storage',
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
  'mainSeriesProperties.candleStyle.upColor': '#41AD7A',
  'mainSeriesProperties.candleStyle.downColor': '#DF5858',
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
  'paneProperties.horzGridProperties.color': '#f4f4f4',
  'paneProperties.vertGridProperties.color': '#f4f4f4',
  // 坐标轴和刻度标签颜色
  'scalesProperties.lineColor': '#5D6B84',
  'scalesProperties.textColor': '#5A6881',
  'paneProperties.legendProperties.showLegend': false,
  // "paneProperties.topMargin": 5,
  // "volumePaneSize": "medium",
  // 成交量高度---中等--tiny
  // "MACDPaneSize": "tiny"
  // "paneProperties.bottomMargin": 5
};
const overrides_dark = {
  'paneProperties.background': '#1B1D2B',
  // 蜡烛样式
  'mainSeriesProperties.candleStyle.upColor': '#41AD7A',
  'mainSeriesProperties.candleStyle.downColor': '#DF5858',
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
  name: 'TVChartContainer',
  props: {
    theme: {
      default: 'light',
      type: String,
    },
    symbol: {
      default: 'TC/SPO',
      type: String,
    },
    precision: {
      default: 4,
      type: Number,
    },
    interval: {
      default: '15',
      type: String,
    },
    containerId: {
      default: 'tv_chart_container',
      type: String,
    },
    libraryPath: {
      default: '/charting_library/',
      type: String,
    },
    chartsStorageUrl: {
      default: 'https://saveload.tradingview.com',
      type: String,
    },
    chartsStorageApiVersion: {
      default: '1.1',
      type: String,
    },
    clientId: {
      default: 'tradingview.com',
      type: String,
    },
    userId: {
      default: 'public_user_id',
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      widgetOptions: {},
    };
  },
  watch: {
    theme(val) {
      if (this.tvWidget) {
        if (val === 'dark') {
          this.widgetOptions.overrides = overrides_dark;
          this.widgetOptions.studies_overrides = studies_overrides_dark;
          // this.widgetOptions.custom_css_url = '../theme_dark.css'
          this.tvWidget.changeTheme('Dark');
          this.tvWidget.applyOverrides(overrides_dark);
          this.tvWidget.applyStudiesOverrides(studies_overrides_dark);
          // this.tvWidget.addCustomCSSFile('../theme_dark.css')
        } else {
          this.widgetOptions.overrides = overrides;
          this.widgetOptions.studies_overrides = studies_overrides;
          // this.widgetOptions.custom_css_url = '../theme_light.css'
          this.tvWidget.changeTheme('Light');
          this.tvWidget.applyOverrides(overrides);
          this.tvWidget.applyStudiesOverrides(studies_overrides);
          // this.tvWidget.addCustomCSSFile('../theme_light.css')
        }
      }
    },
  },
  methods: {
    init() {
      this.widgetOptions.overrides = this.theme === 'dark' ? overrides_dark : overrides;
      this.widgetOptions.studies_overrides = this.theme === 'dark' ? studies_overrides_dark : studies_overrides;
      // eslint-disable-next-line new-cap
      const tvWidget = new widget(this.widgetOptions);
      this.tvWidget = tvWidget;
      tvWidget.onChartReady(() => {
        tvWidget.activeChart().createStudy('Moving Average', false, false, [5, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#BB503B',
        });
        tvWidget.activeChart().createStudy('Moving Average', false, false, [10, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#007C7F',
        });
        tvWidget.activeChart().createStudy('Moving Average', false, false, [15, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#a00a7F',
        });
        tvWidget.activeChart().createStudy('Moving Average', false, false, [30, 'close', 0], null, {
          'Plot.linewidth': 1,
          'Plot.color': '#607C7F',
        });
        this.$emit('setWidget', tvWidget);
      });
    },
    changeSymbol(info) {
      // if (info.partitionType === 'LUD') {
      //   this.widgetOptions.interval = 'D'; // 涨停区要求展示默认为1天   其他默认为15分钟
      // } else {
      //   this.widgetOptions.interval = '15'; // 涨停区要求展示默认为1天   其他默认为15分钟
      // }
      this.widgetOptions.theme = this.theme === 'dark' ? 'Dark' : 'Light';
      this.widgetOptions.symbol = this.symbol;
      this.widgetOptions.datafeed.sendMessage(this.widgetOptions.datafeed, JSON.stringify({
        SYMBOL: this.symbol, // 品种类型
        PERIOD: this.widgetOptions.interval, // k线类型
        TIMEFROM: Date.parse(new Date() - 5 * 24 * 60 * 60 * 1000) / 1000, // 起始时间点 --当前请求的时间 - 5天
        TIMETO: Date.parse(new Date()) / 1000, // 结束时间点-- 当前请求的时间
        TIMESIGN: '0', // 上一次获取数据的时间戳(默认用0)
        // eslint-disable-next-line no-tabs
        MODE: 2, // 区间选择(默认用2)(0:指定区间段内数据,1:所有数据,2:从	指定时间开始到最新的数据)
      }), JSON.stringify({
        SYMBOL: this.symbol, // 品种类型
        PERIOD: this.widgetOptions.interval, // k线类型
        SUBSCRIBE: '1', // 订阅类型(1：订阅，0：取消订阅)
      }));
      this.init();
    },
  },
  mounted() {
    this.widgetOptions = {
      theme: this.theme,
      custom_css_url: '../theme.css',
      debug: false, // uncomment this line to see Library errors and warnings in the console
      fullscreen: this.fullscreen,
      symbol: this.symbol,
      interval: this.interval,
      container_id: this.containerId,
      timezone: 'Asia/Shanghai',
      datafeed: new Datafeeds.UDFCompatibleDatafeed(this.symbol, this.precision),
      library_path: this.libraryPath,
      locale: 'zh',
      disabled_features,
      enabled_features,
      charts_storage_url: this.chartsStorageUrl,
      charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      autosize: this.autosize,
      overrides,
      studies_overrides,
    };
    // this.init()
  },
  destroyed() {
    if (this.tvWidget) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
};
</script>

<style lang="scss" scoped>
// .TVChartContainer {
//   width: 100%;
//   height: 100%;
// }
</style>
