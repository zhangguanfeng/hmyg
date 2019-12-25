/**
*  Created by   阿紫
*  On  2019/9/6 0006
*  Content 修改止损 止盈
*/
<template>
  <div class='modifyPopover'>
    <el-popover
      placement="right"
      width="300"
      class="modify"
      v-model="visible"
      trigger="click">
      <div class="stopLoss">
        <div class="title">修改{{isLoss?'止损':'止盈'}}</div>
        <div v-if="isBuy&&isLoss" class="content">
          <input-number
            v-model="value"
            :precision="precision"
            :step="step"
            :max="+intervalVal"
            :isMax="false"
            controls-position="right"></input-number>
          < <span>{{intervalVal}}</span>
        </div>

        <div v-if="isBuy&&!isLoss" class="content">
          <input-number
            v-model="value"
            :precision="precision"
            :step="step"
            :min="+intervalVal"
            :isMin="false"
            controls-position="right"></input-number>
          > <span>{{intervalVal}}</span>
        </div>
        <div v-if="!isBuy&&isLoss" class="content">
          <input-number
            v-model="value"
            :precision="precision"
            :step="step"
            :min="+intervalVal"
            :isMin="false"
            controls-position="right"></input-number>
          > <span>{{intervalVal}}</span>
        </div>
        <div v-if="!isBuy&&!isLoss" class="content">
          <input-number
            v-model="value"
            :precision="precision"
            :step="step"
            :max="+intervalVal"
            :isMax="false"
            controls-position="right"></input-number>
          < <span>{{intervalVal}}</span>
        </div>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="confirmChange">确定</el-button>
      </div>
      <div slot="reference" style="cursor: pointer" @click="setStopLoss">{{oldVal?oldVal:'设置'}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </el-popover>
  </div>
</template>
<script>
  import InputNumber from '@/components/input-number.vue';

  export default {
    name: 'modifyPopover',
    components: {
      InputNumber
    },
    props: {
      oldVal: {
        type: [String, Number],
        default: null
      },
      precision: {
        type: Number,
        default: 2
      },
      step: {
        type: [String, Number],
        default: 0.1
      },
      min: {
        type: [String, Number],
        default: 0.00001
      },
      price: {
        type: [String, Number],
        default: 0
      },
      isLoss: {
        type: Boolean,
        default: true
      },
      isBuy: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        visible: false,
        value: 0
      }
    },
    computed: {
      intervalVal() {
        const legBID = (this.price.toString().split('.')[1] && this.price.toString().split('.')[1].length) || 0
        // 买入
        if (this.isBuy) {
          // 买-止损价>卖入价格 -  0.6; 止赢价>卖出价格 +  0.6;
          return this.isLoss ? (+this.price - 0.6).toFixed(legBID) : +(this.price + 0.6).toFixed(legBID)
        }
        // 卖-止损价>卖入价格 + 0.6; 止赢价>卖出价格 -  0.6;
        return this.isLoss ? (+this.price + 0.6).toFixed(legBID) : +(this.price - 0.6).toFixed(legBID)
      }
    },
    methods: {
      setStopLoss() {
        // this.visible = !this.visible;
        this.value = this.oldVal
      },
      confirmChange() {
        // 买入
        if (this.isBuy) {
          // 止损
          if (this.isLoss && +this.value > +this.intervalVal) {
            this.$alert('止损不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          // 止盈
         else if (!this.isLoss && +this.value < +this.intervalVal) {
            this.$alert('止赢不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          } else {
            this.visible = false;
            this.$emit('change', this.value)
          }
        } else { // 卖出
          // 止损
          if (this.isLoss && +this.value < +this.intervalVal) {
            this.$alert('止损不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          // 止盈
         else if (!this.isLoss && +this.value > +this.intervalVal) {
            this.$alert('止赢不在范围内', '提示', {
              confirmButtonText: '确定'
            })
            return
          } else {
            this.visible = false;
            this.$emit('change', this.value)
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .stopLoss {
    width: 100%;
    font-size: 13px;
    margin-bottom: 10px;

    .title {
      color: #b1b2b5;
      font-size: 14px;
      margin: 5px 0 20px 0;
    }

    .content {
      display: flex;
      align-items: center;
      .input-number {
        margin-right: 10px;
      }
    }
  }
</style>
