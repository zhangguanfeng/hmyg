/**
*  Created by   阿紫
*  On  2019/9/16 0016
*  Content 交易 实时 挂单
*/
<template>
  <el-dialog
    class='trading'
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    :before-close="handleClose"
    :close-on-click-modal="false"
    width="400px">
    <div slot="title" class="title">{{ticker.symbol}}</div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="市价" name="first"></el-tab-pane>
        <el-tab-pane label="挂单" name="second"></el-tab-pane>
      </el-tabs>
      <div class="trading-details">
        <div class="real-time">
          <div class="real-time__info" @click="changeTradeType(true)" :class="{active:isSell}">
            <span class="label">卖</span>
            <span class="value" :class="{rise: ticker.isSellRise, fall: !ticker.isSellRise}">
              {{ticker.ASK}}
            <i :class="{'el-icon-top': ticker.isSellRise, 'el-icon-bottom': !ticker.isSellRise}"></i>
            </span>
            <span class="check" v-show="isSell"></span>
          </div>
          <div class="real-time__info" @click="changeTradeType(false)" :class="{active: !isSell}">
            <span class="label">买</span>
            <span class="value" :class="{rise: ticker.isSellRise, fall: !ticker.isSellRise}">
              {{ticker.BID}}
            <i :class="{'el-icon-top': ticker.isSellRise, 'el-icon-bottom': !ticker.isSellRise}"></i>
            </span>
            <span class="check" v-show="!isSell"></span>
          </div>
        </div>
        <div class="btn-num" v-if="activeName==='second'">
          <span class="label">委托价:</span>
          <input-number v-model="entrustedPrice"  ref="entrustedPrice"></input-number>
        </div>
        <div class="btn-num">
          <span class="label">手&nbsp;&nbsp;&nbsp;&nbsp;数:</span>
          <input-number v-model="amount" :step="+ticker.trade_step" :precision="+ticker.digits" :min="+ticker.min_trade" :max="+ticker.max_trade"></input-number>
        </div>
        <div class="btn-num" v-if="isSell">
          <span class="label">止&nbsp;&nbsp;&nbsp;&nbsp;损:</span>
          <input-number v-model="down" :min="+downNum" :isMin="false" :precision="+ticker.digits" :step="+ticker.trade_step"></input-number>
          <span class="stopWin"> > {{downNum}}</span>
        </div>
        <div class="btn-num" v-else>
          <span class="label">止&nbsp;&nbsp;&nbsp;&nbsp;损:</span>
          <input-number v-model="down" :max="+downNum" :isMax="false" :precision="+ticker.digits" :step="+ticker.trade_step"></input-number>
          <span class="stopWin"> < {{downNum}}</span>
        </div>
        <div class="btn-num" v-if="isSell">
          <span class="label">止&nbsp;&nbsp;&nbsp;&nbsp;盈:</span>
          <input-number v-model="up" :max="+upNum" :isMax="false" :precision="+ticker.digits" :step="+ticker.trade_step"></input-number>
          <span class="stopWin"> < {{upNum}}</span>
        </div>
        <div class="btn-num" v-else>
          <span class="label">止&nbsp;&nbsp;&nbsp;&nbsp;盈:</span>
          <input-number v-model="up" :min="+upNum" :isMin="false" :precision="+ticker.digits" :step="+ticker.trade_step"></input-number>
          <span class="stopWin"> > {{upNum}}
          </span>
        </div>
        <div class="btn-num" v-show="activeName==='second'">
          <span class="label">有效期:</span>
          <el-select v-model="expiryDate" placeholder="请选择周期">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="change" size="small">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  import InputNumber from '@/components/input-number.vue';
  import OrderSocket from '@/plugins/orderSocket.js';
  import { mapState } from 'vuex'
  import { md5pwd } from '@/common/util'

  export default {
    name: 'trading',
    components: {
      InputNumber
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: true
      },
      isBuy: {
        type: Boolean,
        default: true
      },
      ticker: {
        type: Object,
        default: ()=>()=>{}
      },
    },
    data() {
      return {
        activeName: 'first',
        amount: 0.01,
        down: 0, //  止损
        up: 0, //  止赢
        downNum: 0.00,
        upNum: 0.00,
        entrustedPrice: 0.00, // 委托价
        expiryDate: '0', // 有效期
        isSell: true,
        cptEntrustedPrice: 2, // 挂单类型
        options: [{
          value: '0',
          label: '当周'
        }, {
          value: '1',
          label: '当日'
        }],
        OrderSocket: {}
      }
    },
    watch: {
      ticker: {
        handler: function (val, oldVal) {
          if(val.symbol != oldVal.symbol) {
            this.amount = val.min_trade
            this.down = 0
            this.up = 0
          }
          if (this.activeName === 'first') {
            this.getStopLoss()
          }
          if (this.isSell) { // 卖
            // 挂单时  判断订单类型 1: 挂单价<市价  2: 挂单价>市价
            this.cptEntrustedPrice = this.entrustedPrice > val.BID ? 4 : 2
          } else { // 买
            // 挂单时  判断订单类型 1: 挂单价<市价  2: 挂单价>市价
            this.cptEntrustedPrice = this.entrustedPrice > val.ASK ? 3 : 5
          }
        },
        deep: true
      },
      entrustedPrice(val) { // 委托价
        if (+val > 0) {
          if (this.isSell) { // 卖
            const legBID = (val.toString().split('.')[1] && val.toString().split('.')[1].length) || 0
            this.downNum = (+val).toFixed(legBID) //
            this.upNum = (+val).toFixed(legBID) //
            // 挂单时  判断订单类型 1: 挂单价<市价  2: 挂单价>市价
            this.cptEntrustedPrice = (+val) > this.ticker.BID ? 4 : 2
          } else { // 买
            const legASK = (val.toString().split('.')[1] && val.toString().split('.')[1].length) || 0
            this.downNum = (+val).toFixed(legASK) //
            this.upNum = (+val).toFixed(legASK) //
            this.cptEntrustedPrice = (+val) > this.ticker.ASK ? 3 : 5
          }
        }
      },
      isBuy(val) {
        this.isSell = !val
      }
    },
    computed: mapState([
      'md5Key',
      'fullWindow'
    ]),
    methods: {
      handleClick(tab, event) {
        if (this.activeName === 'second') {
          this.entrustedPrice = this.isSell ? this.ticker.ASK : this.ticker.BID
        } else {
          this.getStopLoss()
        }
        this.amount = this.ticker.min_trade
        this.down = 0
        this.up = 0
      },
      changeTradeType(type) {
        this.isSell = type
        this.down = 0
        this.up = 0
        if (this.activeName === 'second') {
          this.entrustedPrice = this.isSell ? this.ticker.ASK : this.ticker.BID
        } else {
          this.getStopLoss()
        }
      },
      // 获取止损 止盈范围
      getStopLoss() {
        if (!this.ticker.symbol_name) {
          return;
        }
        const { BID, ASK } = this.ticker
        const distance = this.ticker.stop_limit_distance || 0;
        if (this.isSell) { // 卖
          // 卖出
          if (BID === null) {
            this.downNum = '--';
            this.upNum = '--';
            return;
          }
          const legBID = (BID.toString().split('.')[1] && BID.toString().split('.')[1].length) || 0
          this.downNum = (+BID + distance).toFixed(legBID) // 卖-止损价>卖入价格 + distance;
          this.upNum = (+BID - distance).toFixed(legBID) // 卖-止赢价>卖出价格 - distance;
        } else { // 买
          // 买入
          if (ASK === null) {
            this.downNum = '--';
            this.upNum = '--';
            return;
          }
          const legASK = (ASK.toString().split('.')[1] && ASK.toString().split('.')[1].length) || 0
          this.downNum = (+ASK - distance).toFixed(legASK) // 买-止损价>卖入价格 -  distance;
          this.upNum = (+ASK + distance).toFixed(legASK) // 买-止赢价>卖出价格 +  distance;
        }
      },
      handleClose() {
        this.$emit('change')
      },
      change() {
        // 市价
        if (this.activeName === 'first') {
          this.getMarketPrice()
        } else { // 挂单
          this.getEntryOrders()
        }
      },
      // 市价
      getMarketPrice(type) {
        const {
          amount, down, up, isSell, downNum
        } = this
        if (!isSell) { // 买
          // 止损
          if (+down && (+down > +this.downNum)) {
            this.$alert('止损不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          if (+up && (+up < +this.upNum)) {
            this.$alert('止赢不在范围内', '提示', {
              confirmButtonText: '确定'
            })
          }
        } else { // 卖
          if (+down && (+down < +this.downNum)) {
            this.$alert('止损不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          if (+up && +up > (+this.upNum)) {
            this.$alert('止赢不在范围内', '提示', {
              confirmButtonText: '确定'
            })
          }
        }
        const ORDERBY = this.$store.state.account;;
        const OPENPRICE = isSell ? `${this.ticker.ASK}` : `${this.ticker.BID}`
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY, OPENPRICE)

        const obj = {
          CORELATIONID: `${+new Date()}`, // 流水号
          CMD: isSell ? '1' : '0', // 订单类型 0:买  1:卖
          ORDERBY, // 下单账号
          SYMBOL: this.ticker.symbol, // 品种
          VOLUME: `${amount.replace(/0?$/, '')}`, // 手数
          OPENPRICE, // 下单价格
          SL: `${down}`, // 止损价格
          TP: `${up}`, // 止盈价格
          SIGNATURE
        }
        const message = JSON.stringify(obj)
        this.OrderSocket.openorderSendmessage(message).then(res => {
          this.$notify({
            title: '成功',
            message: '下单成功',
            type: 'success'
          })
        }).finally(res=>{
          this.$emit('change')
        })
      },
      // 挂单
      getEntryOrders(type) {
        const {
          amount, down, up, isSell, entrustedPrice, cptEntrustedPrice
        } = this
        // CMD: 买入: 2: 挂单价<市价      4:  挂单价>市价  卖出:  3: 挂单价>市价  5:挂单价<市价
        // 买: 止盈价>委托价，止损<委托价  卖: 止盈价<委托价，止损>委托价
        if (!isSell) { // 买
          // 止损
          if (+down && (+down > +this.downNum)) {
            this.$alert('止损不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          if (+up && (+up < +this.upNum)) {
            this.$alert('止赢不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
        } else {
          if (+down && (+down < +this.downNum)) {
            this.$alert('止损不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          if (+up && (+up > +this.upNum)) {
            this.$alert('止赢不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
        }
        const ORDERBY = this.$store.state.account;
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY, entrustedPrice)
        const obj = {
          CORELATIONID: `${+new Date()}`, // 流水号
          CMD: `${cptEntrustedPrice}`, // 订单类型
          ORDERBY, // 下单账号
          SYMBOL: this.ticker.symbol, // 品种
          VOLUME: `${amount}`, // 手数
          OPENPRICE: `${entrustedPrice}`, // 下单价格
          SL: `${down}`, // 止损价格
          TP: `${up}`, // 止盈价格
          EXPIRYDATE: `${this.expiryDate}`, // 有效期（0：当周，1：当日）
          SIGNATURE
        }
        const message = JSON.stringify(obj);
        this.OrderSocket.openpendingorderSendmessage(message).then(res=>{
          this.$notify({
            title: '成功',
            message: '挂单成功',
            type: 'success'
          })
          this.$root.$emit('getLimitStopOrder')
        }).finally(res=>{
          this.$emit('change')
        })
      },
    },
    mounted() {
      window.trading = this;
      this.OrderSocket = new OrderSocket()
    }
  }
</script>
<style lang="scss">
  .trading {
    .el-dialog {
      :root .theme-dark & {
        background: $color-dark-bg;
        border-color: #434F6A;
      }
    }

    .title {
      padding: 0 15px;
      font-size: 14px;
      font-weight: bold;

      :root .theme-dark & {
        color: #576590;
      }
    }

    .content {
      width: 360px;
    }

    .trading-details {
      width: 280px;
      margin: 0 auto;

      .real-time {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        &__info {
          display: inline-block;
          border: 1px solid #edeef2;
          width: 118px;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          font-size: 12px;
          border-radius: 2px;
          position: relative;
          text-align: center;

          :root .theme-dark & {
            border-color: #464E67;
          }

          .label {
            font-size: 14px;

            :root .theme-dark & {
              color: #788dce;
            }
          }

          .value {
            font-weight: bolder;
            font-size: 16px;

            i {
              font-weight: bolder;
            }
          }

          .check {
            position: absolute;
            bottom: 0;
            right: -24px;
            height: 0;
            width: 0;
            border: 12px solid transparent;
            border-top-color: $color;
            transform: rotate(-45deg) translate(-17px);

            :root .theme-dark & {
              border-top-color: #5171d2;
            }

            &:after {
              content: '';
              position: absolute;
              top: -12px;
              left: 0;
              height: 7px;
              width: 3px;
              border: 1px solid $color;
              border-top-color: #fff;
              border-left-color: #fff;
              transform: rotate(-90deg);

              :root .theme-dark & {
                border: 1px solid #5171d2;
                border-top-color: $color-dark-bg;
                border-left-color: $color-dark-bg;
              }
            }
          }
        }

        .active {
          border-color: $color;

          :root .theme-dark & {
            border-color: #5171d2;
          }
        }

        .rise {
          color: #00cb77;
        }

        .fall {
          color: #ff392a;
        }

      }

      .btn-num {
        margin: 8px 0;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .label {
          display: inline-block;
          width: 50px;

          :root .theme-dark & {
            color: #576590;
          }
        }

        .stopWin {
          font-size: 12px;
          color: #999;
          margin-left: 5px;

          :root .theme-dark & {
            color: #B4C5F7;
          }
        }
      }

      .el-input-number {
        width: 130px;
        height: 24px;
        line-height: 24px;

        .el-input-number__increase {
          width: 16px;
          border-bottom: 0;
          background-color: $bgColor;
          user-select: none;

          &:focus, &:active {
            background: #ceb2ec;
          }

          :root .theme-dark & {
            color: #fff;
            background: #5171d2;
            border-left-color: #5171d2;

            &:focus, &:active {
              background: #354490;
            }
          }
        }

        .el-input-number__decrease {
          width: 16px;
          border-bottom: 0;
          background-color: $bgColor;
          user-select: none;

          &:focus, &:active {
            background: #ceb2ec;
          }

          :root .theme-dark & {
            color: #fff;
            background: #5171d2;
            border-left-color: #5171d2;

            &:focus, &:active {
              background: #354490;
            }
          }
        }

        .el-icon-arrow-up, .el-icon-arrow-down {
          color: $color;

          :root .theme-dark & {
            color: #ffffff;
          }
        }

        .el-input__inner {
          height: 26px;
          border-radius: 4px;
          border-color: #A5ADC4;
          color: #697797;
          background: #fff;
          padding-left: 5px;
          padding-right: 16px;

          &:focus {
            border-color: $color;
          }

          :root .theme-dark & {
            border-color: #384266;
            background: $color-dark-bg;

            &:focus {
              border-color: #5d5ed6;
            }
          }
        }
      }

      .el-select {
        width: 130px;

        /deep/ .el-input__inner {
          height: 26px;
          line-height: 26px;
          border-color: #A5ADC4;
          border-radius: 4px;

          &:focus {
            border-color: $color;
          }
        }

        /deep/ .el-input .el-select__caret {
          line-height: 24px;
        }
      }
    }

    .el-tabs__nav {
      width: 100%;

      .el-tabs__item {
        width: 50%;
        text-align: center;
      }

      :root .theme-dark & {
        .el-tabs__item {
          color: #576590;
        }

        .el-tabs__item.is-active {
          color: #B4C5F7;
        }

        .el-tabs__active-bar {
          background: #B4C5F7;
        }
      }
    }

    .el-tabs__nav-wrap::after {
      :root .theme-dark & {
        background: #434F6A;
      }
    }

    .el-dialog__footer {
      text-align: center;

      .el-button--primary {
        background: $color;
        border-color: $color;
        color: #fff;
      }
    }

    .el-dialog__header {
      :root .theme-dark & {
        border-color: #434F6A;
      }
    }

    .el-dialog__close {
      :root .theme-dark & {
        &:hover {
          color: #B4C5F7;
        }
      }
    }
  }
</style>
