/**
*  Created by   阿紫
*  On  2019-01-14
*  Content 购买页
*/
<template>
  <div class='financingBuy'>
    <NavBar
      :clickBack="clickBacks"
      :showRightText="false"
      :title="'买入'"
    />
    <div class="title">
      <img src="../../assets/img/financing/ghome.png" alt="">
      <span>{{name}}</span>
    </div>
    <transaction-com :num-all="balance" v-model="num" ref="transaction" :rules="rules.num"
                     :coin-name="coinName"></transaction-com>

    <group :title="$t('financingBuy.payment')" class="selsct">
      <radio :options="radioOptions" @on-change="radioChange" v-model="radioValue"></radio>
    </group>

    <div class="buy">
      <!--<check-icon :value.sync="isContinue"> {{ $t('financingBuy.continue') }}</check-icon>-->
      <button-com :name="$t('financingBuy.buy')" @click.native="goBuy"></button-com>
    </div>

    <div v-transfer-dom class="order">
      <popup v-model="isShowOrder" position="bottom" max-height="50%">
        <group title="确认买入">
          <!--<cell :title="$t('orderStatus.account')" value="1882938473"></cell>-->
          <cell :title="$t('orderStatus.name')" :value="name"></cell>
          <cell :title="$t('orderStatus.amount')" :value="`${num} ${coinName}`"></cell>
        </group>
        <div style="padding: 15px;">
          <button-com :name="$t('financingBuy.confirm')" @click.native="goConfirmBuy"></button-com>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { Radio, Group, CheckIcon, TransferDom, Cell } from 'vux';
  import TransactionCom from './transaction-com';
  import ButtonCom from './button-com';
  import NavBar from './nav-com';

  export default {
    name: "financingBuy",
    directives: {
      TransferDom
    },
    components: {
      Radio,
      Group,
      TransactionCom,
      CheckIcon,
      ButtonCom,
      NavBar
    },
    data() {
      const validator = (rule, value, callback) => {
        if (!value) {
          callback(this.$t('transactionCom.placeholder'));
          return;
        } else if (+value > +this.balance) {
          callback('输入金额应小于余额');
          return;
        }
        callback();
      }
      return {
        radioOptions: [{
          icon: require('../../assets/img/financing/balance.png'),
          key: '1',
          value: '余额支付'
        }
          //   {
          //   icon: require('../../assets/img/financing/wallat.png'),
          //   key: '2',
          //   value: '钱包支付'
          // },
        ],
        radioValue: '1',
        num: null,
        isContinue: false,
        rules: {
          num: {
            validator,
            msg: this.$t('transactionCom.placeholder')
          },
        },
        isShowOrder: false,
        name: '',
        coinName: '',
        balance: '',
        recdId: ''
      };
    },
    methods: {
      radioChange(value, label) {
        console.log('change:', value, label)
      },
      goBuy() {
        const { num } = this;
        if (num && +num <= +this.balance) {
          this.isShowOrder = true;
        } else {
          this.$refs.transaction.blurChange(num);
        }
      },
      goConfirmBuy() {
        const { proId } = this.$route.query;
        this.$http.post('/wallet/app/cloud/finance/createOrder', {
          proId,
          amount: this.num,
          payMethod: 'LOCLPLAT', // 余额支付-LOCLPLAT
          planStatus: 'TAKE_OUT'  // TAKE_OUT-到期提出，KEEP_ON-继续续存
        },{needToken:true}).then(res => {
          const { recdId } = res.result;
          window.confirmBuy(recdId);
          this.isShowOrder = false;
        })
      },
      getAvailBalanceByPayMethod() {
        const { proId } = this.$route.query;
        this.$http.post('/wallet/app/cloud/finance/getAvailBalanceByPayMethod', {
          payMethod: 'LOCLPLAT',
          proId,
        },{needToken:true}).then(res => {
          this.balance = res.result || 0;
        })
      },
      onOrderPayStateChanged() {
        // const self = this;
        console.log(1111, 'onOrderPayStateChanged');
        this.$router.push({
          name: 'orderStatus',
          query: {
            recdId: this.recdId
          }
        })
      },
      clickBacks(){
        this.$router.replace({
          name:'financialDetails',
          query: {
            id: this.$route.query.proId
          }})
      },
    },
    activated() {
      const { name, coinName } = this.$route.query;
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.name = name;
      this.coinName = coinName;
      document.title = lang === 'zh' ? `买入${name}` : `buy${name}`;
      this.getAvailBalanceByPayMethod();
    }
  };
</script>
<style lang="less">
  .financingBuy {
    background: #F4F6FA;
    height: 100%;

    .title {
      background: #fff;
      display: flex;
      align-items: center;
      height: 55px;
      padding: 0 20px;

      img {
        width: 29px;
        height: 29px;
        margin-right: 10px;
      }

      span {
        color: #545454;
        font-size: 15px;
        font-weight: bold;
      }
    }

    .selsct {
      .weui-cells__title {
        background: #fff;
        margin-bottom: 0;
        color: #666666;
        font-size: 14px;
        line-height: 18px;
        padding-top: 15px;
      }

      .weui-cells {
        &:before {
          border-top: 0;
        }

        img {
          width: 21px;
          height: 21px;
        }

        .vux-radio-label {
          font-size: 15px;
          color: #545454;
          font-weight: bold;
        }

        .weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
          content: '';
          width: 18px;
          height: 18px;
          margin-left: 0;
          background: url('../../assets/img/financing/radio-selscted.png') no-repeat center / 100%;
        }

        .weui-icon-checked {
          width: 18px;
          height: 18px;
          background: url('../../assets/img/financing/radio.png') no-repeat center / 100%;
        }
      }
    }

    .buy {
      position: fixed;
      bottom: 50px;
      width: 100%;
      text-align: center;

      .vux-check-icon {
        margin-bottom: 10px;

        span {
          font-size: 14px;
          color: #666;
          margin-left: 3px;
        }
      }

      .weui-icon-success {
        height: 15px;
        width: 15px;
        background: url('../../assets/img/financing/checked.png') no-repeat center / 100%;

        &:before {
          content: '';
        }
      }

      .weui-icon-circle {
        height: 15px;
        width: 15px;
        background: url('../../assets/img/financing/check.png') no-repeat center / 100%;

        &:before {
          content: '';
        }
      }

      .weui-btn {
        width: 260px;
        border-radius: 90px;
        font-size: 14px;
        font-weight: bold;
        padding: 5px;
        background: #5E87D8;
      }
    }
  }

  .order {
    .vux-popup-dialog {
      background: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .weui-cells__title {
      text-align: center;
      color: #545454;
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .vux-label {
      font-weight: bold;
      font-size: 14px;
      color: #969696;
    }

    .weui-cell__ft {
      font-weight: 500;
      color: #4F4F4F;
      font-size: 15px;
    }

  }
</style>
