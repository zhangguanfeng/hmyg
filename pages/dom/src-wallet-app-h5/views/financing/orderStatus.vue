/**
*  Created by   阿紫
*  On  2019-01-10
*  Content 订单状态页
*/
<template>
  <div class='orderStatus'>
    <div class="msg">
      <img src="../../assets/img/financing/success.png" alt="" v-if="isSuccess">
      <img src="../../assets/img/financing/unpaid.png" alt="" v-else>
      <span>{{title}}</span>
    </div>

    <group class="order">
      <cell :title="$t('orderStatus.account')" :value="details.phone"></cell>
      <cell :title="$t('orderStatus.name')" :value="details.name "></cell>
      <cell :title="$t('orderStatus.amount')" :value="`${details.amount} ${details.coinName}` | empytValue"></cell>
      <cell :title="$t('orderStatus.orderNumber')" :value="details.recdId"></cell>
    </group>


    <div class="button">
      <x-button type="primary" @click.native="goBack" v-if="isSuccess">{{$t('orderStatus.return')}}</x-button>
      <div class="pay" v-else>
        <span class="countdown">还有<span>{{countdown}}</span>交易结束</span>
        <x-button type="primary" @click.native="goPay">{{$t('orderStatus.pay')}}</x-button>
        <span class="tips">*您需要在30分钟内完成付款，超时订单自动取消</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { Cell, Group, dateFormat } from 'vux'

  export default {
    name: "orderStatus",
    components: {
      Cell,
      Group
    },
    data() {
      return {
        title: '支付成功',
        isSuccess: false,
        countdown: 0,
        timer: null,
        details: {}
      };
    },
    methods: {
      getCountdown() {
        clearInterval(this.timer);
        const thirtyTimers = 30 * 60 * 1000;
        const curTimers = +new Date();
        const { createTime, recdId } = this.details;
        let remainingTimers = +thirtyTimers - (+curTimers - +createTime);
        this.countdown = dateFormat(new Date(remainingTimers), 'mm分ss秒');
        this.timer = setInterval(() => {
          remainingTimers -= 1000;
          if (remainingTimers <= 0) {
            this.$http.post('/wallet/app/cloud/finance/cancelOrder', {
              recdId
            },{needToken:true})
            clearInterval(this.timer);
          } else {
            this.countdown = dateFormat(new Date(remainingTimers), 'mm分ss秒');
          }
        }, 1000);
      },
      getOrderByRecdId() {
        const { recdId } = this.$route.query;
        this.$http.post('/wallet/app/cloud/finance/getOrderByRecdId', {
          recdId
        },{needToken:true}).then(res => {
          this.details = res.result;
          this.isSuccess = res.result.recdStatus == 1 ? true : false;
          this.title = res.result.recdStatus == 1 ? '支付成功' : '待支付';
          this.getCountdown();
          console.log(res, this.isSuccess, 'res');
        })
      },
      goBack() {
        console.log('goBack');
      },
      goPay() {
        console.log('goPay');
      }
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.getOrderByRecdId();
      // document.title = lang === 'zh' ? '' : '';
    }
  };
</script>
<style lang="less">
  .orderStatus {
    background: #F4F6FA;
    height: 100%;

    .msg {
      background: #fff;
      height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        margin-right: 10px;
        width: 28px;
        height: 28px;
      }

      span {
        font-weight: bold;
        font-size: 17px;
      }
    }

    .order {
      .vux-no-group-title {
        margin-top: 10px;

        .vux-label {
          font-weight: bold;
          font-size: 14px;
          color: #969696;
        }

        .weui-cell__ft {
          font-weight: 500;
          color: #4F4F4F;
          font-size: 18px;
        }
      }
    }

    .button {
      position: fixed;
      bottom: 50px;
      width: 100%;

      .weui-btn_primary {
        width: 260px;
        border-radius: 90px;
        font-size: 14px;
        font-weight: bold;
        padding: 5px;
        background: #5E87D8;
      }

      .pay {
        text-align: center;

        .countdown {
          color: #A5A5A5;
          font-size: 13px;
          display: inline-block;
          margin-bottom: 18px;

          span {
            color: #5E87D8;
            font-weight: bold;
            margin: 0 2px;
          }
        }

        .tips {
          color: #A5A5A5;
          font-size: 12px;
          display: inline-block;
          margin-top: 15px;
        }
      }

    }
  }
</style>
