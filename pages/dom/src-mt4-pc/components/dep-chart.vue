<template>
  <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
// import echarts from 'echarts';
// 引入基本模板
const echarts = require('echarts/lib/echarts');
// 引入折现图组件
require('echarts/lib/chart/line');
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip');

export default {
  name: 'depChart',
  props: {
    theme: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      myChart: '',
    };
  },
  mounted() {
    this.drawLine();
    window.addEventListener('resize', () => {
      this.myChart && this.myChart.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.myChart && this.myChart.resize();
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'));
      this.myChart = myChart;
      this.$emit('setDepChart', myChart);
      // 绘制图表
      myChart.setOption({
        animation: false,
        tooltip: {
          alwaysShowContent: true,
          trigger: 'axis',
          confine: true,
          showContent: false,
          axisPointer: {
            // type: 'line',
            lineStyle: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
        },
        grid: {
          top: '10px',
          left: '0px',
          right: '50px',
          bottom: '20px',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // axisLabel: {
          //   align: 'left'
          // },
          // boundaryGap: ['10%', '20%']
          axisLine: {
            lineStyle: {
              color: '#7583A2',
            },
          },
          axisLabel: {
            showMinLabel: false,
            // formatter: function (val) {
            //   return val
            // }
          },
        },
        yAxis: [
          {
            type: 'value',
            position: 'right',
            min: 0,
            max: 100,
            splitNumber: 4,
            // axisTick: {
            //   inside: true,
            // },
            axisLine: {
              lineStyle: {
                color: '#7583A2',
              },
            },
            axisLabel: {
              showMinLabel: false,
              formatter(value, index) {
                if (value > 1000) {
                  return `${(value / 1000).toFixed(1)}k`;
                }
                return value.toFixed(4);
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            data: [],
            type: 'line',
            // symbol: 'circle',
            symbol: 'none',
            showSymbol: false,
            symbolSize: 10,
            // itemStyle: {
            //   color: 'green',
            //   borderColor: 'yellow',
            //   shadowColor: 'rgba(0, 0, 0, 0.5)',
            //   shadowBlur: 10
            // },
            label: {
              show: false,
              position: 'right',
              distance: 10,
              padding: 10,
              fontSize: 12,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, .6)',
              formatter(params) {
                return [`委托量 ：{a|￥${params.data[0]}}`, `累计 ：{a|${params.data[1].toFixed(4)}}`].join('\n');
              },
              rich: {
                a: {
                  color: '#fff',
                  fontSize: '12',
                  fontWeight: 'bold',
                  lineHeight: '20',
                },
              },
            },
            lineStyle: {
              // color: '#008c00',
              color: '#0ca589',
            },
            areaStyle: {
              color: '#cce8e3',
              // color: 'green',
              // opacity: .2,
            },
          },
          {
            data: [],
            type: 'line',
            // symbol: 'circle',
            symbol: 'none',
            showSymbol: false,
            symbolSize: 10,
            // itemStyle: {
            //   color: '#ee3523',
            //   borderColor: 'yellow',
            //   shadowColor: 'rgba(0, 0, 0, 0.5)',
            //   shadowBlur: 10
            // },
            label: {
              show: false,
              position: 'left',
              distance: 10,
              padding: 10,
              fontSize: 12,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, .6)',
              formatter(params) {
                return [`委托量 ：{a|￥${params.data[0]}}`, `累计 ：{a|${params.data[1].toFixed(4)}}`].join('\n');
              },
              rich: {
                a: {
                  color: '#fff',
                  fontSize: '12',
                  fontWeight: 'bold',
                  lineHeight: '20',
                },
              },
            },
            lineStyle: {
              // color: '#ee3523',
              color: '#ef5154',
            },
            areaStyle: {
              color: '#fbd5db',
              // color: 'red',
              // opacity: .2,
            },
          },
        ],
      });
    },
    refreshData(data1, data2, maxAmount) {
      if (!this.myChart) {
        return;
      }
      this.lock = true;
      // 更新数据
      const option = this.myChart.getOption();
      option.series[0].data = data1;
      option.series[1].data = data2;
      option.yAxis[0].max = maxAmount;
      this.myChart.setOption(option);
    },
    changeTheme(theme) {
      if (!this.myChart) {
        return;
      }
      const option = this.myChart.getOption();
      if (theme === 'dark') {
        option.series[0].lineStyle.color = '#05c19d';
        option.series[0].areaStyle.color = '#007c81';
        option.series[1].lineStyle.color = '#e14644';
        option.series[1].areaStyle.color = '#b44e35';
        option.xAxis[0].axisLine.lineStyle.color = '#7583A2';
        option.yAxis[0].axisLine.lineStyle.color = '#7583A2';
      } else {
        option.series[0].lineStyle.color = '#0ca589';
        option.series[0].areaStyle.color = '#cce8e3';
        option.series[1].lineStyle.color = '#ef5154';
        option.series[1].areaStyle.color = '#fbd5db';
        option.xAxis[0].axisLine.lineStyle.color = '##5A6881';
        option.yAxis[0].axisLine.lineStyle.color = '##5A6881';
      }
      this.myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
#myChart {
  background: #fff;
  @at-root .theme-dark & {
    background-color: $color-dark-bg;
  }
}
</style>
