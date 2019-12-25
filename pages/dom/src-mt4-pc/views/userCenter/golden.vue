/**
*  Created by   阿紫
*  On  2019/8/19 0019
*  Content 入金
*/
<template>
  <div class='golden'>
    <div class="title">
      <span>入金</span>
    </div>
    <div class="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="amount" class="amount">
          <el-input type="number" v-model="ruleForm.amount" size="small" clearable
                    :placeholder="`限额：${data.min_deposit}~${data.max_deposit}`">
            <template slot="suffix">| 汇率≈{{data.exchange}}</template>
          </el-input>
          <span class="usdt">{{data.currency}}</span>
        </el-form-item>
        <el-row :gutter="20" class="btn">
          <el-col :span="8" v-for="(item,index) in num" :key="index">
            <el-button type="primary" plain size="small" @click="btnClick(item)">{{item}} {{data.currency}}</el-button>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="small" style="width: 400px;">立即下单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'golden',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('金额不能为空'))
        }
        if (value < this.data.min_deposit || value > this.data.max_deposit) {
          callback(new Error(`金额要在${this.data.min_deposit}~${this.data.max_deposit}之间`))
        } else {
          callback()
        }
      }
      return {
        num: [100, 500, 10000],
        ruleForm: {
          amount: ''
        },
        rules: {
          amount: [
            { validator: checkNum, trigger: 'blur' }
          ]
        },
        data: {
          currency: 'RMBUSD',
          deposit_code: '',
          deposit_name: '',
          exchange: '6.8148',
          max_deposit: '5000',
          min_deposit: '100',
          regular: '100,500,1000'
        }
      }
    },
    methods: {
      btnClick(num) {
        this.ruleForm.amount = +num
        this.$refs.ruleForm.validateField('amount')
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post('Assets/depositData', {
              amount: this.ruleForm.amount,
              deposit_code: this.data.deposit_code
            }).then(res => {
              window.open(res.redict_url)
            })
          }
        })
      },
      getDepositWay() {
        this.$http.get('Assets/getDepositWay').then(res => {
          const { data } = res
          this.data = data
          this.num = data.regular.split(',')
        })
      }
    },
    activated() {
      this.$refs.ruleForm.resetFields();
      this.getDepositWay()
    }
  }
</script>
<style lang="scss" scoped>
  .golden {
    text-align: left;
    background: #fff;
    padding: 20px;

    .title {
      margin-bottom: 20px;
      color: #404040;
      font-size: 18px;
      font-weight: bold;
      vertical-align: middle;
      line-height: 36px;
    }

    .center {
      width: 500px;
      margin: 0 auto;
      text-align: center;
    }

    .btn {
      margin: 20px auto;

      /deep/ .el-button {
        width: 120px;
        margin: 10px;
      }
    }

    .amount {
      /deep/ .el-form-item__content {
        display: flex;
      }

      /deep/ .el-input {
        flex: 1;
      }

      /deep/ .el-input__inner {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }

      .usdt {
        margin-left: 10px;
        color: $color;
      }
    }
  }
</style>
