/**
*  Created by   阿紫
*  On  2019/9/11 0011
*  Content
*/
<template>
  <div class='cptFooter'>
    <div class="left">
        <span :class="{acitve: isHistory}" @click="change(true)"><i class="el-icon-time"></i>历史订单</span>
        <span :class="{acitve: !isHistory}" @click="change(false)"><i class="el-icon-sort"></i>在线交易</span>
    </div>
    <div class="right">
       <!-- <li class="list">
         <div class="value">{{viewing?length(amount.account):'****'}}</div>
         <div class="label">账户</div>
       </li> -->
      <li class="list">
        <div class="value">{{viewing?length(amount.balance):'****'}}</div>
        <div class="label">余额</div>
      </li>
      <li class="list">
        <div class="value">{{viewing?length(amount.equity):'****'}}</div>
        <div class="label">净值</div>
      </li>
      <li class="list">
        <div class="value">{{viewing?length(amount.margin_so):'****'}}</div>
        <div class="label">强平保证金</div>
      </li>
      <li class="list">
        <div class="value">{{viewing?length(amount.margin):'****'}}</div>
        <div class="label">占用保证金</div>
      </li>
      <li class="list">
        <div class="value">{{viewing?length(amount.margin_free):'****'}}</div>
        <div class="label">可用资金</div>
      </li>
      <li class="list">
        <div class="value">{{viewing?length(amount.entry):'****'}}</div>
        <div class="label">总收益</div>
      </li>
      <li class="list icon">
        <span class="account-header-right view" v-if="viewing" @click="viewing = !viewing"></span>
        <span class="account-header-right unView" v-else @click="viewing = !viewing"></span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cptFooter',
  props: {
    isHistory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      viewing: false,
    };
  },
  computed: {
    orderData() {
      return this.$store.state.orderData;
    },
    amount() {
      const account = 1; // 账户
      // const balance = 1;
      // const equity = 1;
      // const margin_so = 1;
      // const margin = 1;
      // const margin_free = 1; // 可用资金
      let entry = 0; // 总收益
      const data = this.$store.state.orderData && this.$store.state.orderData.data || [];
      data.forEach(el => {
        entry += +el.swaps + +el.commission + /* 佣金 */ + this.profitFloat(el) /* 浮动盈亏 */;
      });
      const { equity, balance, margin_so, margin, margin_free } = this.orderData ? this.orderData : {};
      return { account, balance, equity, margin_so, margin, margin_free, entry };
    }
  },
  methods: {
    profitFloat(row) {
      let { allSymbolsInfo } = this.$store.state;
      let calResult = 0;
      let symbol = null;
      const typeCFD = ['100', '200', '300', '500'];
      const typeFut = ['400'];
      // 得到当前货币对信息
      /* start */
      for (let v of allSymbolsInfo) {
        if (v.symbol === row.symbol) {
          symbol = v;
          break;
        }
      }
      const widthUSD = () => {
        for (let v of allSymbolsInfo) {
          const reg = new RegExp(v.symbol.replac(/usd/i, ''), 'i');
          if (reg.test(row.symbol)) {
            return v;
          }
        }
      }
      /* end */
      const { BID, ASK } = symbol; // 买价  卖价 0 1
      const { margin_cal_type, contract_size, volume, tick_price, tick_size, cmd } = row; // 计算模式   合约量  手数
      const BASE = [BID, ASK][cmd];
      if (/usd/i.test(row.symbol)) {
        // typeCFD 计算方法
        if (!!~typeCFD.indexOf(margin_cal_type)) {
          calResult = (+BASE  - +row.open_price) * +contract_size * +volume;
          // 不是以USD（美元）作为计算货币，需要转化, 如果是 USD 则不需要该步奏，上述结果就是最总结果
          if (row.value_currency !== 'USD') {
            const USDSymbol = widthUSD();
            // 美元开始
            if(/^USD/i.test(row.symbol)) {
              calResult /= +USDSymbol.ASK;
            } else {
              calResult *= +USDSymbol.ASK;
            }
          }
        } else if (!!~typeFut.indexOf(margin_cal_type)) {
          // Futures 计算方法
          calResult = (+BASE  - +row.open_price) * (+tick_price / +tick_size) * +volume;
          // 不是以USD（美元）作为计算货币，需要转化, 如果是 USD 则不需要该步奏，上述结果就是最总结果
          if (row.value_currency !== 'USD') {
            const USDSymbol = widthUSD();
            // 美元开始
            if(/^USD/i.test(row.symbol)) {
              calResult /= +USDSymbol.ASK;
            } else {
              calResult *= +USDSymbol.ASK;
            }
          }
        } else {
          throw new Error('浮动盈亏计算方法不存在')
        }
      }
      return calResult
    },
    change(val) {
      this.$emit('change', val);
    },
    length(number) {
      if (/^(-\d|\d)/.test(number)) {
        return parseFloat(number).toFixed(5);
      } else {
        return number;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .cptFooter {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    :root .theme-dark & {
      background: #252A40;
    }
    .left{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #a4abb3;
      span {
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        i {
          margin-right: 5px;
        }
      }
      .acitve {
        color: #fff;
        font-size: 15px;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 50%;
          top: -1px;
          margin-left: -8px;
          border-top: 8px solid #97a8be;
          border-right-width: 7px;
          border-left-width: 7px;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          border-top-color: #fff;
          border-bottom: none;
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list {
        list-style-type: none;
        height: 40px;
        min-width: 30px;
        padding: 0 20px;
        .label {
          font-size: 12px;
          color: #8e9199;
          line-height: 15px;
        }
        .value {
          font-size: 14px;
          line-height: 25px;
          color: #fff;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .account-header-right {
        display: inline-block;
        cursor: pointer;
        width:20px;
        &.view {
          height:12px;
          background: url('../../assets/trade/view.png') no-repeat;
          background-size:100%;
        }
        &.unView {
          height:18px;
          background: url('../../assets/trade/unView.png') no-repeat;
          background-size:100%;
        }
      }
    }
  }
</style>
