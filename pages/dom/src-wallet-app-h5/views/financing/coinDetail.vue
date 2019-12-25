/**
*  Created by   阿紫
*  On  2019/7/19 0019
*  Content
*/
<template>
    <div class='coinDetail  ql-snow' >
           <div class="ql-editor content" v-html="content">

           </div>
      <div class="button">
        <div class="primary" @click="goDeposit">{{btn}}</div>
      </div>
    </div>
</template>
<script>
  import { terminal } from 'common/unti';

    export default {
        name: "coinDetail",
        data() {
            return {
              content:'',
              btn: '立即充值',
            };
        },
      methods: {
        getCoinDetail() {
          this.$http2.post('/wallet/app/cloud/open/coin/getCoinDetail', {
            coinId: this.$route.query.coinId
          }).then(res=>{
            this.content = res.result.coinDetail.context;
            // this.symbol =  res.result.coinDetail.symbol;
          })
        },
        goDeposit() {
          const buttonType = this.$route.query.buttonType;
          let obj = {};
          if (+buttonType==1) { // 立即存入
             obj = {
              page:'com.tokenew.wallet.activity.finance.custom.CustomFinanceRechargeActivity',
              id:  this.$route.query.financialId
            };
          } else {
            // 立即充值
            obj = {
              page: terminal.android?'com.tokenew.wallet.activity.ReceiptMoneyActivity':  'AWSCollectionController',
              coinName: this.$route.query.coinName,
            };
          }
          window.app.interfaceJump(JSON.stringify(obj))
        },
      },
      activated() {
          this.getCoinDetail();
        document.title = '详情';
        const buttonType = this.$route.query.buttonType;
        this.btn = +buttonType==1?'立即存入': '立即充值'
      }
    };
</script>
<style lang="less">
  @import '~@/styles/quill.bubble.css';
  @import '~@/styles/quill.core.css';
  @import '~@/styles/quill.snow.css';

    .coinDetail {
      height: calc(100vh);
      overflow-y: scroll;
      font-size: 14px;
      background: #F4F6FA;
      .content {
        height: calc(100vh - 70px);
        background: #fff;
        padding: 15px 15px 30px 15px;
      }

      p {
        margin: 0;
        padding: 0;
      }

      img {
        max-width: 100%;
      }
      .button {
        background: #fff;
        position: absolute;
        height: 60px;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 50px;

        .primary {
          margin-top: 10px;
          background-color: #5E87D8;
          border-radius: 40px;
          color: #fff;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
</style>
