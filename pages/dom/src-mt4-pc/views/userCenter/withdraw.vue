/**
*  Created by   阿紫
*  On  2019/8/19 0019
*  Content 出金
*/
<template>
  <div class='withdraw'>
    <div class="title">
      <span>出金</span>
    </div>
    <div class="center">
      <span class="tips">当前账户余额：{{info.balance}}</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="出金金额（美金)：" prop="amount">
          <el-input type="number" v-model="ruleForm.amount" size="small" placeholder="请输入出金金额">
            <template slot="suffix">| 汇率≈{{info.exchange}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手续费（美金)：">
          <el-input v-model="info.expense" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="到账银行卡：" prop="bank_id" class="bank">
          <el-select v-model="ruleForm.bank_id" placeholder="请选择到账银行卡" size="small">
            <el-option :label="`${item.bank_name}（${item.bank_last}）`" :value="item.bank_id" v-for="(item,index) in bagetList"
                       :key="index"></el-option>
          </el-select>
          <span class="add" @click="$router.push({name: 'addBank'})"> 添加新卡收款</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'withdraw',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入出金金额'))
        }
        if (value > this.info.balance) {
          callback(new Error(`金额要不能大于${this.info.balance}`))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          amount: '',
          bank_id: ''
        },
        rules: {
          amount: [
            { validator: checkNum, trigger: 'blur' }
          ],
          bank_id: [
            { required: true, message: '请选择到账银行卡', trigger: 'change' }
          ]
        },
        bagetList: [],
        info: {
          exchange: '6.8148',
          expense: '0',
          balance: '0'
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('Assets/withdrawData', this.ruleForm).then(res => {
              this.getWithdrawInfo()
            })
          }
        })
      },
      getBank() {
        this.$http.post('Assets/getBank').then(res => {
          this.bagetList = res.data.filter(item => +item.bank_status === 111)
        })
      },
      getWithdrawInfo() {
        this.$http.get('Assets/getWithdrawInfo').then(res => {
          this.info = res.data
        })
      }
    },
    activated() {
      this.$refs.ruleForm.resetFields();
      this.getBank()
      this.getWithdrawInfo()
    }
  }
</script>
<style lang="scss" scoped>
  .withdraw {
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

    .bank {
      /deep/ .el-form-item__content {
        display: flex;
        align-items: center;
      }

      .el-select {
        flex: 1;
      }

      .add {
        display: inline-block;
        color: #1D2C80;
        font-size: 12px;
        width: 100px;
        height: 28px;
        margin-left: 10px;
        line-height: 28px;
        border-radius: 4px;
        border: 1px dashed #0064FF;
        padding: 0;
        cursor: pointer;
      }
    }

    /deep/ .el-button {
      width: 353px;
    }
  }
  /deep/ .el-input__inner {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  .tips {
    font-size: 12px;
    color: #7F7F7F;
    display: inline-block;
    width: 100%;
    text-align: right;
  }
</style>
