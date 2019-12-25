/**
*  Created by   阿紫
*  On  2019/9/16 0016
*  Content 交易
*/
<template>
  <div class='transaction'>
    <template v-if="ticker.ASK !== null">
      <input-number v-model="buyAmount" :step="+ticker.trade_step" :precision="+ticker.digits" :min="+ticker.min_trade" :max="+ticker.max_trade"></input-number>
      <div class="symbol-info">
        <div class="symbol-info-sell" :class="{rise: ticker.isSellRise, fall: !ticker.isSellRise}"
             :style="{cursor: isPlaceOrder ? 'default': 'pointer'}">
          <p v-if="isPlaceOrder&& isSell">下单中 <i class="el-icon-loading"></i></p>
          <div class="sell" v-else @click="goTrade(true)">
            <span>卖</span>
            <span>{{ticker.ASK}}</span>
            <i :class="{'el-icon-top': ticker.isSellRise, 'el-icon-bottom': !ticker.isSellRise}"></i>
          </div>
        </div>
        <div class="symbol-info-buy" :class="{rise: ticker.isBuyRise, fall: !ticker.isBuyRise}"
             :style="{cursor: isPlaceOrder ? 'default': 'pointer'}">
          <p v-if="isPlaceOrder  && !isSell">下单中 <i class="el-icon-loading"></i></p>
          <div class="buy" v-else @click="goTrade(false)">
            <span>买</span>
            <span>{{ticker.BID}}</span>
            <i :class="{'el-icon-top': ticker.isBuyRise, 'el-icon-bottom': !ticker.isBuyRise}"></i>
          </div>
        </div>
        <span class="spread">{{digitsDesc}}</span>
      </div>
      <i class="el-icon-s-operation icon" @click="openOrder"></i>
      <trading :dialogVisible="dialogVisible" @change="dialogVisible=false" :ticker="ticker"></trading>
    </template>
  </div>
</template>
<script>
  import Trading from './trading.vue'
  import InputNumber from '@/components/input-number.vue'
  import { token, md5pwd, digitsDesc } from '@/common/util'
  import OrderSocket from '@/plugins/orderSocket'
  import { mapState } from 'vuex'

  export default {
    name: 'transaction',
    props: {
      ticker: {
        type: Object,
        default: () => () => {
        }
      }
    },
    components: {
      Trading,
      InputNumber
    },
    data() {
      return {
        buyAmount: 0.01,
        isPlaceOrder: false,
        isSell: false,
        dialogVisible: false,
        personalInformation: null,
        OrderSocket: {}
      }
    },
    watch: {
      ticker: {
        handler: function (val, oldVal) {
          if(val.symbol != oldVal.symbol) {
            this.buyAmount = val.min_trade
          }
        },
        deep: true
      },
    },
    computed: {
      md5Key() {
        return this.$store.state.md5Key
      },
      digitsDesc() {
        return digitsDesc(this.ticker)
      }
    },
    methods: {
      goTrade(isSell) {
        const session = token()
        if (!session) {
          this.$store.commit('toogleLoginDialog', true);
          // this.$router.push('/login')
          return
        }
        if (this.isPlaceOrder) return
        this.isSell = isSell
        this.isPlaceOrder = true
        const { ASK, BID, symbol } = this.ticker
        const ORDERBY = this.$store.state.account;
        const OPENPRICE = isSell ? `${BID}` : `${ASK}`
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY, OPENPRICE)
        const obj = {
          CORELATIONID: `${+new Date()}`, // 流水号
          CMD: isSell ? '1' : '0', // 订单类型 0:买  1:卖
          ORDERBY, // 下单账号
          SYMBOL: symbol, // 品种
          VOLUME: this.buyAmount + '', // 手数
          OPENPRICE, // 下单价格
          SL: '0', // 止损价格
          TP: '0', // 止盈价格
          SIGNATURE
        }
        const message = JSON.stringify(obj)
        this.OrderSocket.openorderSendmessage(message).then(res => {
          this.isPlaceOrder = false
          this.$notify({
            title: '成功',
            message: '下单成功',
            type: 'success'
          })
        }).catch(data => {
          this.isPlaceOrder = false
        })
      },
      openOrder() {
        const session = token()
        if (!session) {
          this.$store.commit('toogleLoginDialog', true);
          // this.$router.push('/login')
          return
        }
        this.dialogVisible = true
      },
      onmessage() {
        console.log('onmessage')
      }
    },
    created() {
      this.$store.dispatch('getMd5Key')
      this.OrderSocket = new OrderSocket()
    }
  }
</script>
<style lang="scss" scoped>
  .transaction {
    width: 457px;
    display: flex;
    align-items: center;
    margin-left: 15px;

    /deep/ .el-input-number {
      width: 110px;
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
          border-color: #5171d2;

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

    .symbol-info {
      position: relative;
      margin: 0 15px;
      display: flex;
      flex-direction: row;

      &-sell, &-buy {
        width: 115px;
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        color: #fff;
        border-radius: 3px;
        background: #C3BECC;
        cursor: pointer;
        position: relative;

        p {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 115px;
          height: 27px;
          margin: 0;
          background: rgba(0, 0, 0, .6);
        }

        i {
          font-size: 14px;
          font-weight: 800;
        }
      }

      &-sell {
        margin-right: 8px;
        padding-left: 5px;

        .sell {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      &-buy {
        padding-right: 5px;

        .buy {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }

      .rise {
        background: $fall-color;
        color: #fff;
      }

      .fall {
        background: $down-color;
        color: #fff;
      }

      .spread {
        position: absolute;
        background: #fff;
        border-radius: 3px;
        width: 40px;
        height: 17px;
        line-height: 17px;
        color: #555;
        top: 5px;
        left: 104px;
        font-size: 12px;
      }
    }

    .icon {
      font-size: 16px;
      cursor: pointer;
      color: #8E9199;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 3px;
      text-align: center;
      border: 1px solid #E1E2E6;
      cursor: pointer;

      :root .theme-dark & {
        color: #5171d2;
        border-color: #5171d2;
      }
    }
  }
</style>
