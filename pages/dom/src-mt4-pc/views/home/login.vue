<template>
  <div class="login-page">
    <div class="login-box">
      <el-menu
        :default-active="accountIndex"
        class="login-switch xs-hide"
        mode="horizontal"
        @select="accountSelect"
      >
        <el-menu-item index="0" style="margin-right: 30px;" class="first-item">{{$t('login')}}</el-menu-item>
        <el-menu-item index="1" style="margin-left: 30px;">{{$t('register')}}</el-menu-item>
      </el-menu>

      <!--登录-->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        v-show="accountIndex==0"
        class="demo-ruleForm"
      >
      
        <el-form-item prop="account">
          <el-input
            v-model="ruleForm.user_name"
            clearable
            placeholder="请输入手机号码"
            class="account"
            @input="ruleForm.user_name=ruleForm.user_name.toString().replace(/[^\d]/g, '')">
            <el-select v-model="user_cell_zd" filterable slot="prepend" placeholder="请选择">
              <el-option :label="item.area_name" :value="item.area_code" v-for="(item, index) in areaCodeList"
                        :key="index"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            clearable
            @input="ruleForm.password=ruleForm.password.toString().replace(/\s/g, '')"
            v-model="ruleForm.password"
            :placeholder="$t('account[2]')"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item prop="code" v-if="ruleForm.user_name&&ruleForm.password">
          <tnCode v-model="isTnCode" ref="tnCode"></tnCode>
        </el-form-item> -->
        <el-form-item class="remember">
          <span class="forget" @click="forgetPwd">{{$t('loginIfo[1]')}}</span>
        </el-form-item>
        <el-form-item class="login">
          <el-button type="primary" @click="submitForm">{{$t('login')}}</el-button>
        </el-form-item>
      </el-form>
      <!--注册-->
      <el-form
        :model="ruleFormReg"
        :rules="rulesReg"
        ref="ruleFormReg"
        label-width="0"
        v-show="accountIndex==1"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input v-model="ruleFormReg.account" clearable placeholder="请输入手机号码" class="account">
            <el-select v-model="user_cell_zd" slot="prepend" placeholder="请选择">
              <el-option :label="item.area_name" :value="item.area_code" v-for="(item, index) in areaCodeList"
                         :key="index"></el-option>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item prop="imageCode">
          <el-input v-model="ruleFormReg.imageCode" maxlength="4" :placeholder="$t('account[5]')">
            <img slot="suffix" class="codeImg" :src="codeImg" alt="codeImg" @click="getImgCode">
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="ruleFormReg.code" maxlength="6" placeholder="请输入手机验证码">
            <span slot="suffix" class="captcha" @click="sendCaptcha('sendRegCode')">{{captchaTitle}}</span>
          </el-input>
        </el-form-item>

        <el-form-item prop="passwd">
          <el-input
            type="password"
            clearable
            v-model="ruleFormReg.passwd"
            :placeholder="$t('account[2]')"
            @keypress.native.enter="submitFormReg()"
          ></el-input>
        </el-form-item>

        <el-form-item prop="inviteCode">
          <el-input
            type="inviteCode"
            clearable
            v-model="ruleFormReg.inviteCode"
            placeholder="推荐人(选填)"
            @keypress.native.enter="submitFormReg()"
          ></el-input>
        </el-form-item>
        <el-form-item prop="isAgree" style="text-align: left;">
          <el-checkbox-group v-model="ruleFormReg.isAgree" style="line-height: 24px;">
            <el-checkbox name="isAgree">{{$t('regIfo[7]')}}
            </el-checkbox>
          </el-checkbox-group>
          <div style="line-height: 24px;">
            <a style="color:#284ee5; cursor: pointer"
               @click="goPagesAgreement('agreement')">《风险披露与免责声明》</a>
            <a style="color:#284ee5; cursor: pointer"
               @click="goPagesAgreement('CPTMarkets')">《CPT Markets流动性指南》</a>
          </div>
        </el-form-item>
        <el-form-item class="login">
          <el-button type="primary" @click="submitFormReg()">{{$t('register')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--忘记密码-->
    <el-dialog
      :visible.sync="dialogForgotPwdVisible"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
      @open="openHandle"
      :lock-scroll="false"
    >
      <div slot="title" class="forgotPwd-title">{{$t('forgotPwd[0]')}}</div>

      <el-form
        :model="ruleFormReg"
        :rules="rulesReg"
        ref="ruleFormReg"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input v-model="ruleFormReg.account" clearable placeholder="请输入手机号码" class="account">
            <el-select v-model="user_cell_zd" slot="prepend" placeholder="请选择">
              <el-option :label="item.area_name" :value="item.area_code" v-for="(item, index) in areaCodeList"
                         :key="index"></el-option>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item prop="imageCode">
          <el-input v-model="ruleFormReg.imageCode" maxlength="4" :placeholder="$t('account[5]')">
            <img slot="suffix" class="codeImg" :src="codeImg" alt="codeImg" @click="getImgCode">
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="ruleFormReg.code" maxlength="6" placeholder="请输入验证码">
            <span
              slot="suffix"
              class="captcha"
              @click="sendCaptcha('sendUserCode', 'forgot')"
            >{{captchaTitle}}</span>
          </el-input>
        </el-form-item>

        <el-form-item prop="passwd">
          <el-input
            type="password"
            clearable
            v-model="ruleFormReg.passwd"
            :placeholder="$t('forgotPwd[1]')"
          ></el-input>
        </el-form-item>
        <el-form-item class="login">
          <el-button type="primary" @click="submitForgotPwd()">{{$t('forgotPwd[2]')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="showTnCode"
      title=""
      width="400px"
      :show-close="false"
      :modal="false"
      custom-class="tn-code-dialog"
      :append-to-body="true"
      @open="openTnCodeHandle"
      >
      <tnCode v-loading="loginLoading" v-model="isTnCode" class="tn-code" ref="tnCode"></tnCode>
      <i class="el-icon-circle-close turn-back" @click="turnBack"></i>
    </el-dialog>
  </div>
</template>

<script>
  import md5 from 'md5'
  import { information, platform, token } from '@/common/util'
  import tnCode from '@/components/tn-code'

  export default {
    name: 'loginNotAlive',
    props: {
      register: {
        type: Boolean,
        default: false
      }
    },
    components: {
      tnCode
    },
    computed: {
      areaCodeList() {
        return this.$store.state.areaCodeList;
      }
    },
    data() {
      // 账号
      const valiAccount = (rule, value, callback) => {
        if (value === '') {
          callback(this.$t('account[0]'))
          return
        }
        if (
          // eslint-disable-next-line no-useless-escape
        // eslint-disable-next-line no-useless-escape
          /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(value)
        ) {
          callback()
          return
        }
        if (value.length === 11 && !isNaN(value)) {
          callback()
        } else {
          callback(this.$t('account[1]'))
        }
      }
      // 密码
      const valiPwd = (rule, value, callback) => {
        if (!value || value.length < 6 || value.length > 18) {
          return callback(new Error(this.$t('account[3]')))
        }
        if (!/(?=.*[a-z])(?=.*\d)[a-z\d]/i.test(value)) {
          return callback(new Error(this.$t('account[4]')))
        }
        callback()
      }
      // 图形验证码
      const valiPicCode = (rule, value, callback) => {
        if (value === '') {
          callback(this.$t('account[5]'))
          return
        }
        if (value.length !== 4) {
          callback(this.$t('account[6]'))
          return
        }
        callback()
      }
      // 验证码
      const valiCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(this.$t('regIfo[0]'))
          return
        }
        if (value.length !== 6 || isNaN(value)) {
          callback(this.$t('regIfo[1]'))
          return
        }
        callback()
      }
      return {
        isTnCode: false,
        loginLoading: false,
        showTnCode: false, // 是否显示验证码
        accountIndex: '0',
        codeImg: '',
        ruleForm: {
          user_name: '',
          password: ''
        },
        rules: {
          user_name: [{
            validator: valiAccount,
            trigger: 'blur'
          }],
          password: [{
            validator: valiPwd,
            trigger: 'blur'
          }]
        },
        captchaTitle: this.$t('regIfo[3]'),
        timer: null,
        times: 60,
        ruleFormReg: {
          account: '',
          passwd: '',
          code: '', // 验证码
          inviteCode: '',
          imageCode: '', // 图形验证码
          isAgree: []
        },
        rulesReg: {
          account: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
          passwd: [{
            validator: valiPwd,
            trigger: 'blur'
          }],
          newpassword: [{
            validator: valiPwd,
            trigger: 'blur'
          }],
          imageCode: [{ validator: valiPicCode, trigger: 'blur' }],
          code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
          isAgree: [{
            type: 'array',
            required: true,
            message: this.$t('regIfo[9]'),
            trigger: 'change'
          }]
        },
        dialogForgotPwdVisible: false, // 忘记密码
        img_code_key: '',
        user_cell_zd: 86,
        // areaCodeList: [],
        platform
      }
    },
    watch: {
      $route() {
        if (this.$route.path === '/login') {
          this.ruleForm.type = false
          this.$refs.ruleForm.resetFields()
          this.user_cell_zd = 86
          this.ruleForm.account = '';
        } else {
          this.user_cell_zd = 86
          this.$refs.ruleFormReg.resetFields()
        }
        this.getImgCode()
      },
      register() {
        this.accountIndex = this.register ? '1' : '0'
      },
      isTnCode() {
        if (this.isTnCode) {
          this.loginLoading = true;
          const { user_name, password } = this.ruleForm
          this.$http
            .post('/Home/login', {
              area: this.user_cell_zd,
              user_name,
              password: md5(password)
            })
            .then((res) => {
              this.setHaveLogin(res.data)
              this.$router.go(-1)
            })
            .catch((e) => {
              this.$refs.tnCode.refresh();
            }).finally(() => {
              this.showTnCode = false;
              this.loginLoading = false;
            });
        }
      }
    },
    methods: {
      turnBack() {
        this.showTnCode = false;
      },
      // 登录后的设置
      setHaveLogin(data) {
        // 设置token
        information(JSON.stringify(data))
        token(data.token)
        this.$store.commit('updateUserInfo', data);
      },
      // 注册登录切换
      accountSelect(key, keyPath) {
        if (+key === 0) {
          this.$router.replace('/login')
        } else {
          this.$router.replace('/register')
        }
      },
      openHandle() {
        try {
          this.$refs.ruleFormReg.resetFields();
        } catch(e) {}
      },
      openTnCodeHandle() {
        this.isTnCode = false;
      },
      // 登录
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.showTnCode = true;
          }
        })
      },
      // 发送验证码
      sendCaptcha(code, type) {
        const { account, imageCode } = this.ruleFormReg
        if (this.times !== 60) {
          return
        }
        clearInterval(this.timer)
        let isError = true
        // 验证账号和图形密码
        this.$refs.ruleFormReg.validateField(['account', 'imageCode'], (res) => {
          if (res) {
            // 报错
            isError = false
          }
        })
        // 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
        this.$refs.ruleFormReg.clearValidate(['code', 'passwd'])
        this.ruleFormReg.code = ''
        if (isError) {
          this.timer = setInterval(() => {
            this.times--
            this.captchaTitle = `${this.$t('regIfo[4]')}(${this.times}s)`
            if (!this.times) {
              this.resetTimes()
            }
          }, 1000)
          this.$http
            .post(`/Home/sendSMSCheckCode`, {
              user_cell: account, // 账户
              user_cell_zd: this.user_cell_zd,// 区号
              img_code_key: this.img_code_key,
              img_code: imageCode,
              type: type == 'forgot' ? '' : 100 // 需要验证账户是否已经注册
            })
            .then((res) => {
            })
            .catch((res) => {
              const { data } = res
              this.resetTimes()
            })
        }
      },
      resetTimes() {
        this.times = 60
        this.captchaTitle = this.$t('regIfo[3]')
        clearInterval(this.timer)
      },
      // 注册
      submitFormReg() {
        this.$refs.ruleFormReg.validate((valid) => {
          if (valid) {
            const { account, passwd, code, inviteCode } = this.ruleFormReg
            this.$http
              .post('/Home/register', {
                user_name: account,//手机号或邮箱
                user_cell_zd: this.user_cell_zd,//区号
                msg_code: code,//验证码
                password: md5(passwd),//密码
                ib_no: inviteCode//推荐人
              })
              .then((res) => {
                this.$notify({
                  title: '成功',
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.replace('/login')
              })
              .catch(() => {
                this.ruleFormReg.imageCode = ''
                this.getImgCode()
              })
          }
        })
      },
      // 忘记密码
      forgetPwd() {
        this.getImgCode()
        this.dialogForgotPwdVisible = true
      },
      submitForgotPwd() {
        this.$refs.ruleFormReg.validate((valid) => {
          if (valid) {
            this.$http.post('/Home/resetPassword', {
              user_name: this.ruleFormReg.account,
              msg_code: this.ruleFormReg.code,
              password: md5(this.ruleFormReg.passwd),
              change_type: 100//100手机 200邮箱
            })
              .then((res) => {
                this.$message({
                  message: '重置密码成功',
                  type: 'success'
                })
                this.dialogForgotPwdVisible = false
              }).catch(res => {
              this.getImgCode()
              this.ruleFormReg.code = ''
            })
          }
        })
      },
      getImgCode() {
        this.img_code_key = Math.random()
        this.codeImg = SERVER_PATH + `/Home/getCheckImg?img_code_key=${this.img_code_key}&wl_no=CPT`
      },
      goPagesAgreement(type) {
        const url = `${location.origin}/${type}`
        window.open(url)
      },
      // getCellZd() {
      //   this.$http.post('Home/getCellZd').then(res => {
      //     this.areaCodeList = res.data
      //   })
      // },
      resetData() {
        try {
          this.$refs.ruleForm.resetFields();
        } catch(e) {}
      }
    },
    mounted() {
      // 清除登录状态
      token(null)
      information(null)
      this.resetData();
    },
    created() {
      this.accountIndex = this.register ? '1' : '0'
      this.getImgCode()
      this.$store.dispatch('getAreaCodeList');
      // this.getCellZd()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }


</script>
<style lang="scss">
  .tn-code-dialog {
    margin-top: calc(50vh - 220px) !important;
    .el-dialog__header {
      display: none;
    }
    .el-loading-mask {
      display: flex;
      align-items: center;
      justify-content: center;
      .el-loading-spinner {
        position: relative !important;
      }
    }
    .el-dialog__body {
      padding: 0;
      width: 400px;
      height: 300px;
      .turn-back {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 25px;
        cursor: pointer;
        transition: .3s all ease;
        &:hover {
          opacity: .7;
        }
      }
      .tn-code {
        padding: 25px 0 15px 0;
        >div {
          border: none;
          box-shadow: none;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .first-item {
    &:after {
      right: -30px !important
    }
  }
  .login-page {
    background-color: #fff;
  }

  .login-box {
    padding-top: 120px;
    margin: 0 auto;
    width: 350px;
  }

  .remember {
    /deep/ .el-form-item__content {
      display: flex;
      justify-content: flex-end;

      &:before,
      &:after {
        display: none;
      }
    }

    /deep/ .forget {
      cursor: pointer;
      color: #284ee5;

      &:hover {
        color: $color;
      }
    }
  }

  .login {
    margin-top: 50px;
    @include media(xs) {
      padding-bottom: 50px;
    }
  }

  .register-title {
    font-size: 20px;
    color: $color;
  }

  .forgotPwd-title {
    color: $color;
    font-size: 22px;
    padding-top: 20px;
  }

  .login-box {
    .demo-ruleForm {
      margin-top: 20px;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom-width: 4px;
    }

    .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
      color: $color;
    }

    .el-menu.el-menu--horizontal {
      border-bottom: none;
      display: inline-block;
    }

    .el-menu--horizontal {
      .loginInfo.el-menu-item {
        text-align: center;

        &:hover {
          color: $color;
        }
      }

      .loginInfo.el-menu-item.is-active {
        color: #909399;

        &:hover {
          color: $color;
        }
      }
    }

    .el-menu-item {
      font-size: 22px;
      color: #c8cde6;
      position: relative;
      margin: 0 20px;

      &:first-child {
        &:after {
          content: '';
          position: absolute;
          right: -20px;
          width: 1px;
          top: 15px;
          bottom: 15px;
          background: #8d95b6;
        }
      }
    }

    /deep/ .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom-width: 2px;
      color: $color;
    }

    /deep/ .el-button {
      width: 100%;
    }
  }

  /deep/ .el-input__suffix {
    display: flex;
    align-items: flex-start;
    justify-content: right;
    cursor: pointer;
    right: 0;

    &-inner {
      display: flex;
      align-items: center;
      justify-content: right;
    }

    .captcha {
      color: #284ee5;
      padding: 0 20px;

      @media screen and (max-width: 760px) {
        font-size: 12px;
        padding: 0;
        padding-left: 6px;
      }

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        width: 1px;
        height: 24px;
        background: #c8cde6;
      }
    }
  }

  .codeImg {
    height: 39px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }

  .account {
    .el-input-group__prepend {
      padding: 0;

      .el-select {
        width: 130px;
      }
    }
  }

  .el-dialog__wrapper {
    .el-button {
      width: 100%;
    }
  }
</style>
