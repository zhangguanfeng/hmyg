/**
*  Created by   阿紫
*  On  2019/10/23
*  Content 历史成交 历史委托 历史盈亏 历史资金明细
*/
<template>
    <div class='historyInfo'>
        <h-navbar :title='title' @backPage="onClickLeft"/>
        <div class="content">
            <div class="calendar">
                <span class="start" @click="selsctDate('start')">{{startDate}}</span>
                <span class="line"></span>
                <span class="end" @click="selsctDate('end')">{{endDate}}</span>
                <span class="selsct" @click="isSelsct=!isSelsct">{{selscted}}
                    <van-icon name="arrow-down" v-if="!isSelsct"/>
                    <van-icon name="arrow-up" v-else/>
                    <div class="selsctList" v-if="isSelsct">
                    <ul>
                        <li @click="changeSelect(1)">当日</li>
                        <li @click="changeSelect(2)">最近一周</li>
                        <li @click="changeSelect(3)">最近一月</li>
                    </ul>
                </div>
                </span>
            </div>
            <div class="trading" v-if="list.volume">
                <span>交易总手数</span>
                <span class="volume">{{list.volume}}手</span>
            </div>
            <van-list
                v-model="list.loading"
                :finished="list.finished"
                :error.sync="list.error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="onLoad"
                class="list"
                :immediate-check="false"
                v-if="list.list.length>0"
            >
                <ul class="tradeList">
                    <li v-for="(item,index) in list.list" :key="index" class="item">
                        <p class="item-top">
                            <span class="item-top-big">{{item.symbol}}</span>
                            <span
                                :class="[(item.cmd==1 || item.cmd==3 || item.cmd==5)?'close':'open','item-top-small']">{{item.cmdName}}</span>
                        </p>
                        <div class="item-middle">
                            <div class="tradePrice" v-if="status === 2">
                                <span>成交价</span>
                                <span>市值 {{item.open_price}}</span>
                            </div>
                            <div class="tradeQuantiy" v-if="status === 2">
                                <span>数量</span>
                                <span>{{parseInt(item.volume)}}手</span>
                            </div>
                            <div class="item-middle-left" v-if="status === 1">
                                <div>
                                    <span>平仓价</span>
                                    <span>{{item.close_price}}</span>
                                </div>
                                <div>
                                    <span>开仓价</span>
                                    <span>{{item.open_price}}</span>
                                </div>
                            </div>
                            <div class="item-middle-right" v-if="status === 1">
                                <div>
                                    <span>数量</span>
                                    <span>{{item.volume}}手</span>
                                </div>
                                <div>
                                    <span>盈亏</span>
                                    <span>${{item.profit}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="item-bottom-left">
                                成交号：<span>{{item.ticket}}</span>
                            </div>
                            <div class="item-bottom-right">
                                时间：{{item.open_time}}
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
            <h-noData v-else class="onData"></h-noData>
        </div>
        <van-popup
            v-model="isSelsctDate"
            position="bottom"
            :style="{ height: '50%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="confirm"
                @cancel="cancel"
            />
        </van-popup>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';
  import {dateFormat} from '@/common/util';

  interface List {
    loading: any;
    finished: any;
    error: any;
    isError: any;
    list: any;
    volume: any;
    page: any;
    pageSize: any;
  }

  @Component({})
  export default class HistoryInfo extends Vue {
    protected status: any = 2; // 状态码 1 历史成交, 2 历史委托, 3历史盈亏 ,4历史资金明细
    protected title: any = '历史成交';
    protected baseUrl: any = '';
    protected selscted: any = '当日';
    protected isSelsct: boolean = false;
    protected isSelsctDate: boolean = false;
    protected isStart: boolean = false;
    protected startDate: any = dateFormat(new Date(), 'YYYY-MM-DD');
    protected endDate: any = dateFormat(new Date(), 'YYYY-MM-DD');
    protected currentDate: any = new Date();
    protected list: List = {
      loading: false,
      finished: false,
      error: false,
      isError: false,
      list: [],
      volume: 0,
      page: 1,
      pageSize: 20,
    };

    protected onClickLeft() {
      window.closeWebView();
    }

    protected changeSelect(type: any) {
      this.endDate = dateFormat(new Date(), 'YYYY-MM-DD');
      const num = +new Date();
      switch (type) {
        case 1:
          this.startDate = this.endDate;
          this.selscted = '当日';
            this.getData();
          break;
        case 2:
          this.startDate = dateFormat(num - 1000 * 60 * 60 * 24 * 7, 'YYYY-MM-DD');
          this.selscted = '最近一周';
            this.getData();
          break;
        case 3:
          this.startDate = dateFormat(num - 1000 * 60 * 60 * 24 * 30, 'YYYY-MM-DD');
          this.selscted = '最近一月';
            this.getData();
          break;
      }
    }

    protected selsctDate(type: any) {
      this.isSelsctDate = true;
      this.isSelsct = false;
      if (type === 'start') { // 起始日期
        this.isStart = true;
        this.currentDate = new Date(this.startDate);
      } else { // 结束日期
        this.isStart = false;
        this.currentDate = new Date(this.endDate);
      }
    }

    protected cancel() {
      this.isSelsctDate = false;
    }

    protected confirm() {
      this.isSelsctDate = false;
      const currentDate = dateFormat(this.currentDate, 'YYYY-MM-DD');
      if (this.isStart) {
        if (currentDate > this.endDate) {
          this.$toast('开始时间不能大于结束时间');
        } else {
          this.startDate = currentDate;
          this.getTitle(this.endDate, this.startDate);
          this.getData();
        }
      } else {
        if (currentDate < this.startDate) {
          this.$toast('开始时间不能小于结束时间');
        } else {
          this.endDate = currentDate;
          this.getTitle(this.endDate, this.startDate);
          this.getData();
        }
      }
    }

    protected getTitle(endDate: Date, startDate: Date) {
      const num = (+new Date(endDate) - +new Date(startDate)) / (1000 * 60 * 60 * 24)
      switch (num) {
        case 0:
          this.selscted = '当日';
          break;
        case 7:
          this.selscted = '最近一周';
          break;
        case 30:
          this.selscted = '最近一月';
          break;
        default:
          this.selscted = '自定义';
      }
    }

    protected onLoad() {
      if (!this.list.isError) {
        this.list.page++;
      }
      this.getData();
    }

    protected getData() {
      const {startDate, endDate} = this;
      const {page, pageSize, list} = this.list;
      this.$http.post(this.baseUrl, {
        page,
        pageSize,
        startDate: dateFormat(startDate, 'YYYY-MM-DD'),
        endDate: dateFormat(endDate, 'YYYY-MM-DD'),
      }).then((res: any) => {
        const data = res.data.data || [];
        data.forEach((item: any) => {
          switch (item.cmd) {
            case '0':
              item.cmdName = '买入';
              break
            case '1':
              item.cmdName = '卖出';
              break
            case '2':
              item.cmdName = '限价买入';
              break
            case '3':
              item.cmdName = '限价卖出';
              break
            case '4':
              item.cmdName = '停损买入';
              break
            case '5':
              item.cmdName = '停损卖出';
              break
          }
          // item.cmdName =
        })
        this.list.volume = res.data.sum_volume;
        // 数据全部加载完成
        if (data.length < pageSize && data.length > 0) {
          this.list.finished = true;
        }
        if(+page == 1) {
          this.list.list = data;
        } else {
          this.list.list = [...list, ...data];
        }
        // 加载状态结束
        this.list.loading = false;
        this.list.isError = false;
      }).catch((res: any) => {
        // 加载状态结束
        this.list.loading = false;
        // 加载失败
        this.list.error = true;
        this.list.isError = true;
      })
    }

    protected activated() {
      this.startDate = this.endDate = dateFormat(new Date(), 'YYYY-MM-DD');
      this.currentDate = new Date();

      if (this.$route.query.type) {
        this.status = +(this.$route.query.type);
      }
      switch (+this.status) {
        case 1:
          this.title = '历史成交'
          this.baseUrl = '/report/closedOrder'
          break;
        case 2:
          this.title = '历史委托'
          this.baseUrl = '/report/limitStopCancelOrder'
          break;
      }
      this.getData();
    }
  };
</script>
<style lang='scss' scoped>
    .historyInfo {
        background: $bg-color;
        height: 100%;

        .content {
            padding-top: 46px;

            .calendar {
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #fff;

                span {
                    display: inline-block;
                }

                .start, .end {
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    background: rgba(233, 242, 255, 1);
                    border-radius: 4px;
                    color: $color;
                    text-align: center;
                }

                .line {
                    width: 13px;
                    height: 2px;
                    background: #7EB0FB;
                }

                .selsct {
                    width: 80px;
                    height: 30px;
                    border-radius: 4px;
                    background: $color;
                    font-size: 13px;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    .van-icon {
                        margin-left: 3px;
                    }
                }

                .selsctList {
                    position: absolute;
                    top: 35px;
                    right: 0;
                    width: 70px;
                    text-align: center;
                    color: #fff;
                    background: $color;
                    padding: 0 5px;
                    border-radius: 4px;

                    &:after {
                        content: '';
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-bottom: 5px solid $color;
                        left: 50%;
                        -webkit-transform: translateX(-50%);
                        transform: translateX(-50%);
                        top: -5px;
                        position: absolute;
                        width: 0;
                        height: 0;
                    }

                    li {
                        line-height: 30px;
                    }

                    li:not(:last-child) {
                        border-bottom: 1px solid #fff;
                    }
                }

            }

            .trading {
                height: 40px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background: #fff;
                color: #939393;
                font-size: 13px;

                .volume {
                    font-size: 15px;
                    color: #333333;
                }
            }

            .onData {
                height: calc(100vh - 136px);
            }
        }

        .tradeList {
            padding: 5px 5px 0 5px;
            background: $bg-color;

            .item {
                // height:120px;
                padding: 10px 13px 14px;
                margin-bottom: 5px;
                border-radius: 4px;
                background: #FFF;
                display: flex;
                flex-direction: column;

                &-top {
                    margin-bottom: 8px;

                    &.last {
                        display: flex;
                        justify-content: space-between;
                    }

                    &-big {
                        margin-right: 5px;
                        font-size: 16px;
                        font-weight: bold;
                        color: #333333;
                    }

                    &-small {
                        font-size: 13px;

                        &.open {
                            color: #10AD7E;
                        }

                        &.close {
                            color: #E1614E;
                        }
                    }

                    &-left {
                        color: #333333;
                        font-size: 16px;
                        font-weight: 600;
                    }

                    &-right {
                        color: #999999;
                        font-size: 11px;
                    }
                }

                &-middle {
                    margin-bottom: 14px;
                    padding-bottom: 15px;
                    border-bottom: 1px dashed #E9F2FF;
                    display: flex;
                    justify-content: space-between;

                    &.no-bottom {
                        padding-bottom: 0;
                        border-bottom: none;
                        margin-bottom: 0;
                    }

                    .tradePrice, .tradeQuantiy {
                        flex: 1;
                        height: 30px;
                        padding: 0 7px;
                        background-color: #F1F1F1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        span {
                            &:first-of-type {
                                color: #999999;
                                font-size: 12px;
                            }

                            &:last-of-type {
                                color: #333333;
                                font-size: 13px;
                            }
                        }
                    }

                    .tradePrice {
                        margin-right: 26px;
                    }

                    &-left, &-right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        div {
                            height: 30px;
                            padding: 0 7px;
                            background-color: #F1F1F1;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            &:first-of-type {
                                margin-bottom: 5px;
                            }

                            span {
                                &:first-of-type {
                                    color: #999999;
                                    font-size: 12px;
                                }

                                &:last-of-type {
                                    color: #333333;
                                    font-size: 13px;
                                }
                            }
                        }
                    }

                    &-left {
                        margin-right: 26px;
                    }
                }

                &-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    &-left, &-right {
                        color: #999999;
                        font-size: 12px;

                        span {
                            color: #333333;
                        }
                    }
                }
            }
        }
    }
</style>
