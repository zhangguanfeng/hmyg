/**
*  Created by   阿紫
*  On  2019-01-14
*  Content 交易组件
*/
<template>

  <group :title="title" class='transaction-com'>
    <x-input name="mobile"
             :placeholder="$t('transactionCom.placeholder')"
             novalidate
             type="number"
             v-model="inputName"
             :icon-type="iconType"
             @on-change="blurChange">
    </x-input>
    <transition name="fade">
      <span class="tips" v-if="isTips">{{tips}}</span>
    </transition>
    <span class="spo">{{coinName}}</span>
    <cell-box  :class="{errorInput:isTips}">
      <span class="balance">{{$t('transactionCom.balance')}}：</span> <span class="money">{{numAll}}</span> <span
      class="all"
      @click="getALL">{{$t('transactionCom.all')}}</span>
    </cell-box>
  </group>

</template>

<script>
  import { XInput, Group, CellBox } from 'vux';

  export default {
    name: "transaction-com",
    components: {
      XInput,
      Group,
      CellBox,
    },
    model: {
      event: 'change',
    },
    props: {
      value: [String, Number],
      title: {
        type: String,
        default: '买入金额'
      },
      coinName: {
        type: String,
        default: 'SPO'
      },
      numAll: {
        type: [String, Number],
        default: 0
      },
      rules: {
        type: Object,
        default: () => {
        },
      },
    },
    data() {
      return {
        iconType: '',
        inputName: '',
        tips: '',
        isTips: false,
        clearstatus: false,
      };
    },
    methods: {
      blurChange(value) {
        this.$emit('change', this.inputName);
        if (!this.clearstatus) {
          if (this.rules) {
            this.rules.validator(this.rules, value, (msg) => {
              if (msg) {
                this.tips = msg;
                this.iconType = 'error';
                this.isTips = true;
              } else {
                this.isTips = false;
                this.iconType = 'success';
              }
            });
          }
        }
      },
      reset() {
        this.clearstatus = true
        this.inputName = '';
        this.isTips = false;
        this.iconType = '';
        setTimeout(() => {
          this.clearstatus = false
        }, 500)
      },
      getALL() {
        this.inputName = this.numAll;
        this.$emit('change', this.inputName);
      },
    },
    activated() {
      this.inputName = this.value || '';
    },
  };
</script>
<style lang="less">
  .transaction-com {
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
    }

    .weui-input {
      font-size: 14px;
    }

    .vux-x-input {
      margin-right: 50px;
    }

    .tips {
      position: absolute;
      font-size: 12px;
      color: #ff5464;
      left: 14px;
      bottom: 13px;
    }

    .spo {
      position: absolute;
      top: 13px;
      right: 20px;
      color: #666;
      font-size: 16px;
      font-weight: 500;
    }


    .vux-cell-box {
      justify-content: flex-end;
      font-size: 13px;
    }

    .balance {
      color: #A1A1A1;
    }

    .money {
      color: #5C5C5C;
      font-weight: 500;
      margin: 0 15px 0 0;
    }

    .all {
      font-weight: 500;
      color: #5E87D8;
      cursor: pointer;
    }

    .errorInput::before {
      color: red;
      border-top: 1px solid #ff5464;
    }

    .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
      font-size: 14px;
    }
    .vux-x-input .vux-input-icon {
      font-size: 14px;
    }
  }
</style>
