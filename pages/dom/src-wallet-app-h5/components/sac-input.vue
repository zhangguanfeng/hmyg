/**
*  Created by   阿紫
*  On  2018/12/21
*  Content
*/
<template>
  <div class='sac-input'>
    <x-input name="mobile"
             :show-clear="false"
             :placeholder="placeholder"
             novalidate
             :type="type"
             :min="min"
             :max="max"
             :disabled="disabled"
             v-model.sync="inputName"
             :class="{errorInput:isTips}"
             :icon-type="iconType"
             @on-change="blurChange">
      <div slot="label">
        <slot name="label"></slot>
      </div>
      <div slot="right">
        <slot name="right"></slot>
      </div>
    </x-input>
    <transition name="fade">
      <span class="tips" v-if="isTips">{{tips}}</span>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'sac-input',
    model: {
      event: 'change',
    },
    props: {
      placeholder: {
        type: String,
        //default: this.$t('components.please_enter')//'请输入',
        default: '',
      },
      value: [String, Number],
      rules: {
        type: Object,
        default: () => {
        },
      },
      type: {
        type: String,
        default: 'text',
      },
      min: {
        type: Number,
        default: 1,
      },
      max: {
        type: Number,
        default: 16,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      value(val, oldVal) {
        this.inputName = this.value;
      }
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
    },
    activated() {
      this.inputName = this.value || '';
    },
  };
</script>
<style lang="less">
  .sac-input {
    position: relative;
    margin-bottom: 15px;

    .weui-input {
      font-size: 14px;
    }

    .tips {
      position: absolute;
      font-size: 12px;
      color: #ff5464;
      left: 14px;
      top: 100%;
      padding-top: 3px;
    }

    .weui-cell {
      padding-bottom: 0px;
    }

    .weui-cell:first-child:before {
      display: block;
    }

    .weui-cell:before {
      top: 40px;
    }

    .weui-cell__bd {
      line-height: 30px;
    }

    .errorInput::before {
      color: red;
      border-top: 1px solid #ff5464;
    }

    .weui-icon-warn {
      color: #ff5464;
    }

    .weui-cell__ft .weui_icon_warn, .weui-cell__ft .weui-icon-success {
      font-size: 14px !important;
    }

    .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
      font-size: 14px;
    }

    .weui-cell__ft {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .weui-cell__ft div {
      display: inline-block;
      padding-left: 10px;
    }
  }
</style>
