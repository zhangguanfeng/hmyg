/**
*  Created by   阿紫
*  On  2019/11/15
*  Content 转入全球兑
*/
<template>
  <div class='transferExchange'>
    <div class="content">
      <cell title="币种：USDT"></cell>
      <cell class="transfer">
        <div slot="title">
          <div class="title">转入数额</div>
          <x-input type="number" :show-clear="false" @on-change="onChange" v-model="amount"
                   placeholder="请输入转账数额"></x-input>
        </div>
      </cell>
      <cell title="余额">
        <div class="balance">
          <span class="num">{{balance}}USDT</span>
          <span class="all" @click="getAll">全部</span>
        </div>
      </cell>
    </div>
    <x-button :show-loading="isShowLoading" :disabled="disabled" @click.native="submit">确认转入
    </x-button>
  </div>
</template>
<script>
  import {Cell, Group, XInput} from 'vux'

  export default {
    name: "transferExchange",
    components: {
      Group,
      Cell,
      XInput
    },
    data() {
      return {
        amount: 0,
        balance: 0,
        isShowLoading: false,
        disabled: true,
      };
    },
    methods: {
      onChange() {
        if (+this.amount > +this.balance || +this.amount == 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      getAll() {
        this.amount = this.balance;
      },
      submit() {
        if (this.isShowLoading) return
        this.isShowLoading = true;
        this.$http.post('wallet/app/wallet/balanceTransfer.do', {
          amount: this.amount
        }, {needToken: true}).then(res => {
          this.amount = '';
          this.$vux.toast.show({
            type: 'success',
            text: '转入成功',
            time: 3000,
          });
        }).finally(res => {
          this.isShowLoading = false;
        })
      }
    },
    activated() {
      if (window.app.showShareIcon) {
        window.app.showShareIcon(false);
      }
      this.balance = this.$route.query.balance || 0;
    }
  };
</script>
<style lang="less">
  .transferExchange {
    background: #F4F6FA;
    height: 100%;
    padding-top: 20px;

    .content {
      background: #fff;

      .vux-label {
        color: #545454;
        font-size: 14px;
        font-weight: 600;
      }

      .transfer {
        .vux-label {
          width: 100%;
        }

        .vux-x-input {
          padding: 0 3px;
        }

        input::-webkit-input-placeholder {
          color: #CCCCCC;
        }

        .weui-cell:before {
          height: 0;
          border: none;
        }
      }
    }

    .balance {
      .num {
        color: #5E87D8;
        font-size: 13px;
        font-weight: bold;
      }

      .all {
        width: 65px;
        height: 25px;
        line-height: 25px;
        background: #5E87D8;
        border-radius: 20px;
        display: inline-block;
        color: #fff;
        text-align: center;
        font-size: 13px;
        margin-left: 5px;
      }
    }

    .weui-btn {
      margin-top: 300px;
      width: 80%;
      background: #5E87D8;
      color: #fff;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      border-radius: 40px;
    }

    .weui-btn_default:not(.weui-btn_disabled):active {
      background: #5E87D8;
      color: #fff;
    }

    .weui-btn_disabled.weui-btn_default {
      background: #B8C3DA;
      color: #fff;
    }
  }
</style>
