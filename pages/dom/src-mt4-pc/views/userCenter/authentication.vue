/**
*  Created by   阿紫
*  On  2019-03-11
*  Content 实名认证
*/
<template>
  <div class='authentication'>
    <div class="title">
      <span>{{$t('authentication.title[0]')}}</span>
    </div>
    <div class="authentication-wrapper" v-if="+isAuth===300 ||  +isAuth===100">
      <!-- form表单 -->
      <el-form
        ref="ruleForm"
        label-width="160px"
        :model="ruleForm"
        :rules="rules">
        <el-form-item :label="$t('authentication.title[1]')" prop="name">
          <el-input
            v-model="ruleForm.name"
            clearable
            :disabled="+isAuth===300"
            :placeholder="$t('authentication.validate[0]')"/>
        </el-form-item>

        <el-form-item :label="$t('authentication.title[2]')" prop="nation">
          <el-select v-model="ruleForm.nation" :disabled="+isAuth===300">
            <el-option
              v-for="item in nationOptions"
              :key="item.nation_code"
              :label="item.nation_name"
              :value="item.nation_code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('authentication.title[3]')" prop="certificate_no">
          <el-input
            v-model="ruleForm.certificate_no"
            clearable
            :disabled="+isAuth===300"
            placeholder="请输入身份证号"/>
        </el-form-item>
        <el-form-item class="uploadList" v-if="+isAuth===100">
          <div class="auth" v-for="listInfo in uploadList" :key="listInfo.title">
            <jk-upload-auth-image
              url="CommonFunc/uploadImage"
              :src="uploadImgSrc[listInfo.key]"
              :bgImg="listInfo.bgImg"
              :fileKey="listInfo.fileKey"
              @uploadSuccess="uploadSuccess($event, listInfo.key)"/>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button v-if="+isAuth===300" type="primary" disabled style="width: 100%">{{ $t('authentication.button[0]')
            }}
          </el-button>
          <div class="button-wrap" v-else>
            <el-button v-if="!isSubmit" :disabled="disabledSubmit" type="primary" style="width: 100%" @click="submit">{{
              $t('authentication.button[1]') }}
            </el-button>
            <el-button v-else :loading="true" type="primary">{{ $t('authentication.button[2]') }}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="+isAuth===200" class="await item">
      <img src="@/assets/userCenter/await.png" alt="">
      <div class="tips" style="color:#5777A6;">
        审核中，请耐心等待
      </div>
    </div>
    <div v-if="+isAuth===400" class="error item">
      <img src="@/assets/userCenter/error.png" alt="">
      <div class="tips" style="color: red">
        身份信息未通过审核
      </div>
      <el-button type="primary" size="small" @click="resubmit">重新提交</el-button>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { validChinese, validIdCard, validHkCard } from '@/common/util'
  import frontImg from '@/assets/authentication/front.png'
  import oppositeImg from '@/assets/authentication/opposite.png'
  import holdImg from '@/assets/authentication/hold.png'

  export default {
    name: 'authentication',
    data() {
      return {
        ruleForm: {
          name: '',
          nation: 'CN',
          certificate_no: ''
        },
        uploadImgSrc: {
          img_z: '',
          img_f: ''
        },
        nationOptions: [
          {
            nation_code: 'CN',
            nation_name: this.$t('_authentication.nationOptions[0]')
          }
        ],
        rules: {
          name: [
            {
              required: true,
              message: this.$t('authentication.validate[0]'),
              trigger: 'blur'
            }
          ],
          certificate_no: [
            {
              required: true,
              message: '请输入身份证号',
              trigger: 'blur'
            }
          ]
        },
        isSubmit: false,
        identityInfo: {},
        isAuth: false
      }
    },
    computed: {
      uploadList() {
        return [
          {
            bgImg: frontImg,
            fileKey: 'idCard_flie',
            key: 'img_z'
          },
          {
            bgImg: oppositeImg,
            fileKey: 'idCard_oppo',
            key: 'img_f'
          }
        ]
      },
      disabledSubmit() {
        return !Object.keys(this.uploadImgSrc)
          .every(key => this.uploadImgSrc[key])
      },
      userInfo: {
        get() {
          return this.$store.state.userInfo;
        },
        set(val) {

        }
      }
    },
    methods: {
      getAllNational() {
        this.$http.post('CommonFun/getNation')
          .then((res) => {
            this.nationOptions = res.data
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
        this.$http.post('User/Authenticate', params)
          .then((res) => {
            this.$alert('资料审核约需1-3个工作日，请耐心等待，如有疑问请联系客服', '资料上传成功', {
              confirmButtonText: '确定'
            }).then(() => {
              this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
              this.resetParams()
              this.getAccountStatus()
            }).catch(() => {
              this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
              this.resetParams()
              this.getAccountStatus()
            })
          })
          .finally(() => {
            this.isSubmit = false
          })
      },
      resetParams() {
        this.ruleForm = {
          name: '',
          nation: 'CN',
          certificate_no: ''
        }
        this.uploadImgSrc = {
          img_z: '',
          img_f: ''
        }
      },
      getAccountStatus() {
        this.$http.get('/CommonFun/getAccountStatus').then(res => {
          const { account_status } = res
          this.isAuth = account_status
          if (+account_status === 100) { // 未认证
            this.getAllNational()
          } else if (+account_status === 200) { // 审核中
          } else if (+account_status === 300) { // 已实名
            this.ruleForm.certificate_no = this.userInfo.certificate_no
            this.ruleForm.name = this.userInfo.user_name
            this.ruleForm.nation = this.userInfo.user_nation
          } else if (+account_status === 400) { // 审核失败
          }
        })
      },
      resubmit() {
        this.resetParams()
        this.getAllNational()
        this.isAuth = 100
      }
    },
    activated() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      this.resetParams()
      this.getAccountStatus()
    }
  }
</script>
<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }

  /deep/ .el-form {
    width: 600px;
  }

  .authentication {
    text-align: left;
    background: #fff;
    padding: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      color: #404040;
      font-size: 18px;
      font-weight: bold;
      line-height: 36px;
    }

    &-icon {
      font-size: 36px;
      color: $color;
      cursor: pointer;
    }

    &-wrapper {
      width: 600px;
      margin: 0 auto 20px auto;
      padding: 0 60px 30px 60px;
    }
  }

  .uploadList {
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
      height: 130px;
      margin: 50px 5px 40px 5px;
      padding: 5px;
      border: 1px dashed #333360;
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
      width: 350px;
    }
  }

  .item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 300px;

    img {
      height: 100px;
    }

    .tips {
      font-size: 14px;
      margin: 40px 0;
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .await {
    img {
      animation: rotation 3s linear infinite;
    }
  }
</style>
