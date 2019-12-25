/**
*  Created by   阿紫
*  On  2019/10/11 0011
*  Content
*/
<template>
  <div class='input-number'>
    <span class="lessen" @click="goChange(false)"></span>
    <input class="buyAmount" type="number"
           v-model="buyAmount"
           :step="step"
           :min="min"
           :max="max"
           @change="change"
           ref="buyAmount">
    <span class="add" @click="goChange(true)"></span>
  </div>
</template>
<script>
  export default {
    name: 'input-number',
    model: {
      event: 'change'
    },
    props: {
      step: {
        type: Number,
        default: 0.01
      },
      precision: {
        type: Number,
        default: 2
      },
      min: {
        type: Number,
        default: null
      },
      isMin: {
        type: Boolean,
        default: true
      },
      max: {
        type: Number,
        default: null
      },
      isMax: {
        type: Boolean,
        default: true
      },
      value: [String, Number]
    },
    data() {
      return {
        buyAmount: 0
      }
    },
    watch: {
      value(val, oldVal) {
        this.buyAmount = this.value
      }
    },
    methods: {
      change() {
        const num = 0
        if (this.isMax && this.max && this.buyAmount > this.max) {
          this.buyAmount = this.max
        } else if (this.isMin && this.min && this.buyAmount < this.min) {
          this.buyAmount = this.min
        } else if (!this.isMax && this.max && this.buyAmount > this.max) {
          this.buyAmount = this.max - +(num.toFixed(this.precision - 1) + 1)
        } else if (!this.isMin && this.min && this.buyAmount < this.min) {
          this.buyAmount = this.min + +(num.toFixed(this.precision - 1) + 1)
        }
        this.buyAmount = (+this.buyAmount).toFixed(this.precision)
        this.$emit('change', this.buyAmount)
      },
      goChange(isAdd) {
        if (isAdd) {
          if (this.max && (this.buyAmount >= this.max)) {
            this.buyAmount = (+this.max).toFixed(this.precision)
          } else {
            this.buyAmount = (+this.buyAmount + this.step).toFixed(this.precision)
          }
        } else {
          if (this.min && (this.buyAmount <= this.min)) {
            this.buyAmount = (+this.min).toFixed(this.precision)
          } else {
            this.buyAmount = (+this.buyAmount - this.step).toFixed(this.precision)
          }
        }
        this.$emit('change', this.buyAmount)
      }
    },
    mounted() {
      if (this.isMin && this.min && (this.value < this.min)) {
        this.buyAmount = this.min
      } else if (this.isMax && this.max && (this.value > this.max)) {
        this.buyAmount = this.max
      } else {
        this.buyAmount = this.value
      }
    }
  }
</script>
<style lang="scss">
  .input-number {
    width: 145px;
    height: 28px;
    margin-left: 10px;
    border: 1px solid #E1E2E6;
    border-radius: 4px;
    position: relative;
    display: inline-block;

    :root .theme-dark & {
      border-color: #5171d2;
    }

    span {
      position: absolute;
      width: 26px;
      height: 26px;
      line-height: 26;
      cursor: pointer;
      text-align: center;
      top: 1px;
      user-select: none;
    }

    .lessen {
      left: 0;
      border-right: 1px solid #E1E2E6;

      :root .theme-dark & {
        border-color: #5171d2;
      }

      &:before {
        position: absolute;
        top: 12px;
        left: 7px;
        content: '';
        width: 12px;
        height: 2px;
        background: $color;

        :root .theme-dark & {
          background: #5171d2;
        }
      }
    }

    .add {
      right: 0;
      border-left: 1px solid #E1E2E6;

      :root .theme-dark & {
        border-color: #5171d2;
      }

      &:before {
        position: absolute;
        top: 12px;
        left: 7px;
        content: '';
        width: 12px;
        height: 2px;
        background: $color;

        :root .theme-dark & {
          background: #5171d2;
        }
      }

      &:after {
        position: absolute;
        top: 7px;
        left: 12px;
        content: '';
        width: 2px;
        height: 12px;
        background: $color;

        :root .theme-dark & {
          background: #5171d2;
        }
      }
    }

    .buyAmount {
      position: absolute;
      left: 27px;
      top: 0;
      width: 92px;
      height: 26px;
      font-size: 14px;
      font-family: DinotBold;
      color: #555;
      line-height: 1;
      text-align: center;
      border: none;
      outline: none;

      :root .theme-dark & {
        background: $color-dark-bg;
        color: #B4C5F7;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
</style>
