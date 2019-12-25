/**
*  Created by   阿紫
*  On  2019/8/19 0019
*  Content 添加银行卡
*/
<template>
  <div class='addBank'>
    <div class="title">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      <span>添加银行卡</span>
    </div>
    <div class="authentication-wrapper">
      <!-- form表单 -->
      <el-form
        :inline="true"
        ref="ruleForm"
        label-width="160px"
        :model="ruleForm"
        :rules="rules">
        <el-form-item label="持卡人：" prop="bank_user_name">
          <el-input
            size="small"
            v-model="ruleForm.bank_user_name"
            clearable
            placeholder="请输入持卡人"/>
        </el-form-item>
        <el-form-item label="卡号：" prop="bank_no">
          <el-input
            size="small"
            v-model="ruleForm.bank_no"
            clearable
            placeholder="请输入卡号"/>
        </el-form-item>
        <el-form-item label="银行名称：" prop="bank_name">
          <el-input
            v-model="ruleForm.bank_name"
            clearable
            size="small"
            placeholder="请输入银行名称"/>
        </el-form-item>
        <el-form-item label="Swif Code：" prop="swif_code">
          <el-input
            size="small"
            v-model="ruleForm.swif_code"
            clearable
            placeholder="请输入swif_code"/>
        </el-form-item>
        <el-form-item label="币种：" prop="user_currency">
          <el-input
            size="small"
            v-model="currency"
            disabled
            clearable
            placeholder="请输入swif_code"/>
        </el-form-item>
        <el-form-item label="所属国家：" prop="bank_nation">
          <el-select v-model="ruleForm.bank_nation" size="small" placeholder="请选择所属国家">
            <el-option
              v-for="item in nationOptions"
              :key="item.nation_code"
              :label="item.nation_name"
              :value="item.nation_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支行地址：" prop="bank_address">
          <el-input
            v-model="ruleForm.bank_address"
            size="small"
            clearable
            placeholder="请输入支行地址"/>
        </el-form-item>
        <div class="uploadList">
          <div class="auth" v-for="listInfo in uploadList" :key="listInfo.title">
            <jk-upload-auth-image
              :src="uploadImgSrc[listInfo.key]"
              :bgImg="listInfo.bgImg"
              :fileKey="listInfo.fileKey"
              @uploadSuccess="uploadSuccess($event, listInfo.key)"/>
          </div>
        </div>
        <el-form-item class="submit">
          <el-button v-if="!isSubmit" :disabled="disabledSubmit" type="primary" size="small" @click="submit">{{
            $t('authentication.button[1]') }}
          </el-button>
          <el-button v-else :loading="true" type="primary" size="small">{{ $t('authentication.button[2]') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { validChinese, validIdCard, validHkCard } from '@/common/util'
  import frontImg from '@/assets/userCenter/bank1.png'
  import oppositeImg from '@/assets/userCenter/bank2.png'

  export default {
    name: 'addBank',
    data() {
      return {
        ruleForm: {
          bank_user_name: '',
          bank_no: '',
          bank_name: '',
          swif_code: '',
          user_currency: 'RMB',
          bank_nation: 'CN',
          bank_address: ''
        },
        uploadImgSrc: {
          bank_img_z: '',
          bank_img_f: ''
        },
        nationOptions: [
          {
            nation_code: 'CN',
            nationality: '中国大陆'
          }
        ],
        currency: '',
        rules: {
          bank_user_name: [{ required: true, message: '请输入持卡人', trigger: 'blur' }],
          bank_no: [{ required: true, message: '请输入卡号', trigger: 'blur' }],
          bank_name: [{ required: true, message: '请输入银行名称', trigger: 'blur' }],
          swif_code: [{ required: true, message: '请输入swif_code', trigger: 'blur' }],
          user_currency: [{ required: true, message: '请选择币种', trigger: 'blur' }],
          bank_nation: [{ required: true, message: '请选择所属国家', trigger: 'blur' }],
          bank_address: [{ required: true, message: '请输入支行地址', trigger: 'blur' }],
        },
        isSubmit: false
      }
    },
    computed: {
      uploadList() {
        return [
          {
            bgImg: frontImg,
            fileKey: 'idCard_flie',
            key: 'bank_img_z'
          },
          {
            bgImg: oppositeImg,
            fileKey: 'idCard_oppo',
            key: 'bank_img_f'
          }
        ]
      },
      disabledSubmit() {
        return !Object.keys(this.uploadImgSrc)
          .every(key => this.uploadImgSrc[key])
      }
    },
    methods: {
      getNation() {
        this.$http.get('CommonFun/getNation')
          .then((res) => {
            this.nationOptions = res.data
          })
      },
      getCurrency() {
        this.$http.get('Assets/getCurrency')
          .then((res) => {
            const {currency} = res.data;
            this.currency = currency;
          })
      },
      uploadSuccess(url, key) {
        if (url) {
          this.uploadImgSrc[key] = url
        }
      },
      submit() {
        this.isSubmit = true
        const params = { ...this.ruleForm, ...this.uploadImgSrc }
        this.$http.post('Assets/addBank', params)
          .then((res) => {
            this.$notify({
              title: '成功',
              message: `${this.ruleForm.bank_name}绑卡成功`,
              type: 'success'
            });
            this.$router.go(-1)
          })
          .finally(() => {
            this.isSubmit = false
          })
      },
      resetParams() {
        this.ruleForm = {
          bank_user_name: '',
          bank_no: '',
          bank_name: '',
          swif_code: '',
          user_currency: 'RMB',
          bank_nation: 'CN',
          bank_address: ''
        }
        this.uploadImgSrc = {
          bank_img_z: '',
          bank_img_f: ''
        }
      }
    },
    activated() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      this.resetParams()
      this.getNation()
      this.getCurrency()
    }
  }
</script>
<style lang="scss" scoped>
  .el-button,
  .el-select {
    width: 100%;
  }

  .addBank {
    text-align: left;
    background: #fff;
    padding: 20px;

    .title {
      img {
        width: 12px;
        margin-right: 30px;
        vertical-align: middle;
        cursor: pointer;
      }

      span {
        vertical-align: middle;
      }

      margin-bottom: 20px;
      color: #404040;
      font-size: 18px;
      font-weight: bold;
      vertical-align: middle;
      line-height: 36px;
    }

    &-icon {
      font-size: 36px;
      color: $color;
      cursor: pointer;
    }

    &-wrapper {
      margin: 0 auto 20px auto;
      padding: 0 60px 30px 60px;
    }

    /deep/ .el-form-item__content {
      width: 280px;
    }
  }

  .uploadList {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;

    /deep/ .el-form-item__content {
      display: flex;
      justify-content: space-around;
    }
  }

  .auth {
    &-title {
      font-size: 15px;
      color: rgb(102, 102, 102);
    }

    &-upload {
      position: relative;
      width: 200px;
      height: 125px;
      margin: 10px 5px 10px 5px;
      padding: 5px;
      border: 1px dashed #333360;
    }
  }

  .submit {
    display: block;
    text-align: center;

    /deep/ .el-button {
      width: 350px;
    }
  }

  .upload-component {
    height: 100%;
    cursor: pointer;
  }

  .upload-img {
    height: 100%;
    cursor: pointer;

    &__bg,
    &__add {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  .button-wrap {
    text-align: center;

    .el-button {
      width: 450px;
    }
  }
</style>
