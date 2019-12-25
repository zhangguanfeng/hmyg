/**
*  Created by   阿紫
*  On  2019-03-19
*  Content
*/
<template>
  <div class='bindingDetails'>
    <go-back></go-back>
    <div class="title">
      {{title}}
    </div>
    <!--   绑定邮箱-->
    <el-form :model="ruleFormBind"
             :rules="rulesBind"
             ref="ruleFormBind"
             label-width="260px"
             v-if="!isBind"
             key="0"
             class="ruleForm">
        <el-form-item prop="imageCode" label='图形验证码：'>
          <el-input v-model="ruleFormBind.imageCode" maxlength="4" :placeholder="$t('account[5]')">
            <img slot="suffix" class="codeImg" :src="codeImg" alt="codeImg" @click="getImgCode(1)">
          </el-input>
        </el-form-item>
        <!--手机验证码-->
        <el-form-item prop="mobileCode" label="手机验证码：">
          <el-input v-model="ruleFormBind.mobileCode" maxlength="6"
                    placeholder="请输入手机验证码">
            <span slot="suffix" class="captcha" @click="sendMessageBind('ruleFormBind')">{{captchaTitleBind}}</span>
          </el-input>
        </el-form-item>
        <!--邮箱-->
        <el-form-item prop="email" label="邮箱账户：">
          <el-input v-model="ruleFormBind.email" clearable
                    placeholder="请输入邮箱账户"></el-input>
        </el-form-item>
        <!--邮箱验证码-->
        <el-form-item prop="emailCode" label="邮箱验证码：">
          <el-input v-model="ruleFormBind.emailCode" maxlength="6"
                    placeholder="请输入邮箱验证码">
            <span slot="suffix" class="captcha" @click="sendMessageEmail('ruleFormBind')">{{captchaTitleEmail}}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bindEmail('ruleFormBind')">提交</el-button>
        </el-form-item>
    </el-form>
    <!--修改手机号-->
    <el-form :model="ruleFormModify"
             :rules="rulesModify"
             ref="ruleFormModify"
             label-width="230px"
             class="ruleForm"
             v-if="isPhone&&isBind"
             key="1">
        <el-form-item :label="`${$t('accountBinding.details.common[8]')}${$t('accountBinding.details.common[0]')}：`"
                      prop="name">
          <el-input v-model="accountInfo.user_cell" disabled></el-input>
        </el-form-item>
        <el-form-item prop="imageCode" label='图形验证码'>
          <el-input v-model="ruleFormModify.imageCode" maxlength="4" :placeholder="$t('account[5]')">
            <img slot="suffix" class="codeImg" :src="codeImg" alt="codeImg" @click="getImgCode(1)">
          </el-input>
        </el-form-item>
        <el-form-item prop="originCode" :label="$t('accountBinding.details.common[1]')+'：'">
          <el-input v-model="ruleFormModify.originCode" maxlength="6"
                    :placeholder="`${$t('accountBinding.details.common[6]')}${$t('accountBinding.details.common[1]')}`">
            <span slot="suffix" class="captcha"
                  @click="sendMessage('ruleFormModify')">{{captchaTitle}}</span>
          </el-input>
        </el-form-item>
        <el-form-item :label="`${$t('accountBinding.details.common[5]')}${$t('accountBinding.details.common[0]')}：`"
                      prop="mobile">
          <el-input v-model="ruleFormModify.mobile"
                    :placeholder="`${$t('accountBinding.details.common[6]')}${$t('accountBinding.details.common[5]')}${$t('accountBinding.details.common[0]')}`"
          >
            <el-select v-model="user_cell_zd" slot="prepend" placeholder="请选择" style="width:140px;">
              <el-option :label="item.area_name" :value="item.area_code" v-for="(item, index) in areaCodeList"
                         :key="index"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="imageCode2" label='图形验证码'>
          <el-input v-model="ruleFormModify.imageCode2" maxlength="4" :placeholder="$t('account[5]')">
            <img slot="suffix" class="codeImg" :src="codeImg2" alt="codeImg" @click="getImgCode(2)">
          </el-input>
        </el-form-item>
        <!--手机验证码-->
        <el-form-item prop="newCode" :label="$t('accountBinding.details.common[1]')+'：'">
          <el-input v-model="ruleFormModify.newCode" maxlength="6"
                    :placeholder="`${$t('accountBinding.details.common[6]')}${$t('accountBinding.details.common[1]')}`">
            <span slot="suffix" class="captcha"
                  @click="sendMessageMobile('ruleFormModify')">{{captchaTitleMobile}}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyMobile('ruleFormModify')">{{$t('password.title[2]')}}</el-button>
        </el-form-item>
    </el-form>
    <!--修改邮箱-->
    <el-form :model="ruleFormModify"
             :rules="rulesModify"
             ref="ruleFormModify"
             label-width="230px"
             class="ruleForm"
             v-if="!isPhone&&isBind"
             key="2">
        <el-form-item :label="`${$t('accountBinding.details.common[8]')}${$t('accountBinding.details.common[2]')}：`"
                      prop="name">
          <el-input v-model="accountInfo.user_email" disabled></el-input>
        </el-form-item>
        <el-form-item prop="originCode" label="旧邮箱验证码：">
          <el-input v-model="ruleFormModify.originCode" maxlength="6"
                    placeholder="请输入旧邮箱验证码">
            <span slot="suffix" class="captcha" @click="changCode('ruleFormModify')">{{captchaTitle}}</span>
          </el-input>
        </el-form-item>
        <el-form-item :label="`${$t('accountBinding.details.common[5]')}${$t('accountBinding.details.common[2]')}：`"
                      prop="email">
          <el-input v-model="ruleFormModify.email"
                    :placeholder="`${$t('accountBinding.details.common[6]')}${$t('accountBinding.details.common[5]')}${$t('accountBinding.details.common[2]')}`"></el-input>
        </el-form-item>
        <!--邮箱验证码-->
        <el-form-item prop="newEmailCode" :label="$t('accountBinding.details.common[3]')+'：'">
          <el-input v-model="ruleFormModify.newEmailCode" maxlength="6"
                    :placeholder="`${$t('accountBinding.details.common[6]')}${$t('accountBinding.details.common[3]')}`">
            <span slot="suffix" class="captcha" @click="sendMessageEmail('ruleFormModify')">{{captchaTitleEmail}}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyEmail('ruleFormModify')">{{$t('password.title[2]')}}</el-button>
        </el-form-item>
    </el-form>


  </div>
</template>
<script>
  export default {
    name: 'bindingDetails',
    data() {
      // 手机号
      const validatorMobile = (rule, value, callback) => {
        if (value === '') {
          callback(`${this.$t('accountBinding.details.common[6]')}${this.$t('accountBinding.details.common[0]')}`)
          return
        }
        if (isNaN(value)) {
          callback(`${this.$t('accountBinding.placeholder[0]')}`)
          return
        }
        callback()
      }
      // 修改--原验证码
      const valiCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback('请输入验证码')
          return
        }
        if (value.length !== 6 || isNaN(value)) {
          callback(this.$t('regIfo[1]'))
          return
        }
        callback()
      }
      return {
        title: '',
        isBind: true,
        isPhone: true,
        // 绑定手机号--手机验证码倒计
        times: 60,
        timer: null,
        timesMobile: 60,
        timerMobile: null,
        captchaTitle: this.$t('accountBinding.details.common[7]'),
        captchaTitleMobile: this.$t('accountBinding.details.common[7]'),
        // 绑定邮箱--邮箱验证码倒计
        timesEmail: 60,
        timerEmail: null,
        captchaTitleEmail: this.$t('accountBinding.details.common[7]'),
        // 绑定邮箱--已绑定的手机或者邮箱验证码
        timesBind: 60,
        timerBind: null,
        captchaTitleBind: this.$t('accountBinding.details.common[7]'),
        ruleFormBind: {
          imageCode: '', // 图形验证码
          email: '', // 邮箱
          emailCode: '', // 邮箱验证码
          mobileCode: '' // 手机验证码
        },
        rulesBind: {
          imageCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
          mobileCode: [
            {
              required: true,
              message: '手机验证码',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: `${this.$t('accountBinding.details.common[6]')}${this.$t('accountBinding.details.common[2]')}`,
              trigger: 'blur'
            },
            {
              type: 'email',
              message: this.$t('accountBinding.placeholder[1]'),
              trigger: 'blur'
            }
          ],
          emailCode: [
            {
              required: true,
              message: `${this.$t('accountBinding.details.common[6]')}${this.$t('accountBinding.details.common[3]')}`,
              trigger: 'blur'
            }
          ],
        },
        // 修改
        account: '',
        ruleFormModify: {
          imageCode: '', // 图形验证码
          imageCode2: '', // 图形验证码
          sendType: '', // 验证码类型
          originCode: '', // 原验证码
          mobile: '', // 新手机号
          newCode: '', // 新手机号验证码
          email: '', // 邮箱
          newEmailCode: '' // 新邮箱验证码
        },
        rulesModify: {
          imageCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
          imageCode2: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
          originCode: [
            {
              validator: valiCaptcha,
              required: true,
              trigger: 'blur'
            }
          ],
          mobile: [
            {
              required: true,
              validator: validatorMobile,
              trigger: 'blur'
            }
          ],
          newCode: [
            {
              required: true,
              message: `${this.$t('accountBinding.details.common[6]')}${this.$t('accountBinding.details.common[1]')}`,
              trigger: 'blur'
            }
          ],
          newEmailCode: [
            {
              required: true,
              message: `${this.$t('accountBinding.details.common[6]')}${this.$t('accountBinding.details.common[3]')}`,
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: `${this.$t('accountBinding.details.common[6]')}${this.$t('accountBinding.details.common[2]')}`,
              trigger: 'blur'
            },
            {
              type: 'email',
              message: this.$t('accountBinding.placeholder[1]'),
              trigger: 'blur'
            }
          ]
        },
        accountInfo: {},
        areaCodeList: [],
        user_cell_zd: 86,
        img_code_key: '',
        codeImg: '',
        img_code_key2: '',
        codeImg2: ''
      }
    },
    methods: {
      resetTimesMobile(times, time, title) {
        this[times] = 60
        this[title] = this.$t('accountBinding.details.common[7]')
        clearInterval(this[time])
      },
      // 发送原手机验证码
      sendMessage() {
        if (this.times !== 60) {
          return
        }
        this.$refs.ruleFormModify.clearValidate()
        this.$refs.ruleFormModify.validateField(['imageCode'], (res) => {
          if (!res) {
            const postData = {
              img_code_key: this.img_code_key,
              img_code: this.ruleFormModify.imageCode
            }
            this.timer = setInterval(() => {
              this.times--
              this.captchaTitle = `${this.$t('verificationCode.value[2]')}(${this.times}s)`
              if (!this.times) {
                this.resetTimesMobile('times', 'timer', 'captchaTitle')
              }
            }, 1000)
            this.$http.post('CommonFun/sendSMSCheckCode', postData).then((res) => {}).catch((res) => {
              this.resetTimesMobile('times', 'timer', 'captchaTitle')
            })
          }
        })
      },
      // 发送手机验证码
      sendMessageMobile(name) {
        const { mobile } = this[name]
        if (+this.timesMobile !== 60) {
          return
        }
        const postData = {
          user_cell: this.ruleFormModify.mobile,
          img_code_key: this.img_code_key2,
          user_cell_zd: this.user_cell_zd,
          img_code: this.ruleFormModify.imageCode2,
          type: 100, // 需要验证账户是否已经注册
        }
        this.$refs[name].clearValidate()
        let isSend = true
        this.$refs[name].validateField(['mobile', 'imageCode2'], (res) => {
          if (res) {
            isSend = false
          }
        })
        if (isSend) {
          this.timerMobile = setInterval(() => {
            this.timesMobile--
            this.captchaTitleMobile = `${this.$t('verificationCode.value[2]')}(${this.timesMobile}s)`
            if (!this.timesMobile) {
              this.resetTimesMobile('timesMobile', 'timerMobile', 'captchaTitleMobile')
            }
          }, 1000)
          this.$http.post('Home/sendSMSCheckCode', postData)
            .then((res) => {})
            .catch((res) => {
              this.resetTimesMobile('timesMobile', 'timerMobile', 'captchaTitleMobile')
            })
        }
      },
      // 绑定--发送手机的验证码
      sendMessageBind(name) {
        if (this.timesBind !== 60) {
          return
        }
        this.$refs[name].validateField(['imageCode'], (res) => {
          if (!res) {
            this.$http.post('/CommonFun/sendSMSCheckCode', {
              img_code_key: this.img_code_key,
              img_code: this.ruleFormBind.imageCode
            })
              .then((res) => {
                this.timerBind = setInterval(() => {
                  this.timesBind--
                  this.captchaTitleBind = `${this.$t('verificationCode.value[2]')}(${this.timesBind}s)`
                  if (!this.timesBind) {
                    this.resetTimesMobile('timesBind', 'timerBind', 'captchaTitleBind')
                  }
                }, 1000)
              })
              .catch((res) => {
                this,getImgCode(1);
                this.resetTimesMobile('timesBind', 'timerBind', 'captchaTitleBind')
              })
          }
        })
      },
      // 发送邮箱验证码
      sendMessageEmail(name) {
        const { email } = this[name]
        if (this.timesEmail !== 60) {
          return
        }
        this.$refs[name].validateField(['email'], (res) => {
          if (!res) {
            this.timerEmail = setInterval(() => {
              this.timesEmail--
              this.captchaTitleEmail = `${this.$t('verificationCode.value[2]')}(${this.timesEmail}s)`
              if (!this.timesEmail) {
                this.resetTimesMobile('timesEmail', 'timerEmail', 'captchaTitleEmail')
              }
            }, 1000)
            this.$http.post('Home/sendEmailCheckCode', {
              user_email: email,
              type: 100, // 验证邮箱是否已经存在
            })
              .then((res) => {})
              .catch((res) => {
                this.resetTimesMobile('timesEmail', 'timerEmail', 'captchaTitleEmail')
              })
          }
        })
      },
      // 绑定邮箱
      bindEmail() {
        this.$refs.ruleFormBind.validate((valid) => {
          if (valid) {
            const { email, emailCode, mobileCode } = this.ruleFormBind
            this.$http.post('/Security/bindEmail', {
              user_email: email,
              email_code: emailCode,
              cell_code: mobileCode
            })
              .then((res) => {
                this.$store.dispatch('getUserInfo');
                this.$notify({
                  title: '成功',
                  message: '邮箱绑定成功',
                  type: 'success'
                });
                this.$router.go(-1)
              })
              .catch((res) => {
                this.ruleFormBind.emailCode = '';
              })
          }
        })
      },
      // 修改---- 原验邮箱证码
      changCode() {
        if (this.times !== 60) {
          return
        }
        const postData = {
          user_email: this.accountInfo.user_email
        }
        this.timer = setInterval(() => {
          this.times--
          this.captchaTitle = `${this.$t('verificationCode.value[2]')}(${this.times}s)`
          if (!this.times) {
            this.resetTimesMobile('times', 'timer', 'captchaTitle')
          }
        }, 1000)
        this.$http.post('Home/sendEmailCheckCode', postData).then((res) => {}).catch((res) => {
          this.resetTimesMobile('times', 'timer', 'captchaTitle')
        })
      },
      // 修改手机号
      modifyMobile(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {
              originCode, mobile, newCode
            } = this.ruleFormModify
            const postData = {
              user_cell: mobile,
              user_cell_zd: this.user_cell_zd,
              cell_code: originCode,
              cell_code_new: newCode
            }
            this.$http.post('/Security/changeCell', postData)
              .then((res) => {
                this.$notify({
                  title: '成功',
                  message: '手机号修改成功，请重新登录',
                  type: 'success'
                });
                sessionStorage.removeItem('cptToken')
                sessionStorage.removeItem('cptInformation')
                this.$router.replace('/login')
              })
          }
        })
      },
      // 修改邮箱
      modifyEmail(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {
             originCode, email, newEmailCode
            } = this.ruleFormModify
            this.$http.post('/Security/changeEmail', {
              user_email:email,
              email_code:originCode,
              email_code_new:newEmailCode,
            })
              .then((res) => {
                this.$notify({
                  title: '成功',
                  message: '邮箱修改成功',
                  type: 'success'
                });
                this.$store.dispatch('getUserInfo');
                this.$router.go(-1)
              })
          }
        })
      },
      getCellZd() {
        this.$http.post('Home/getCellZd').then(res => {
          this.areaCodeList = res.data
        })
      },
      getImgCode(type) {
        if (type == 1) {
          this.img_code_key = Math.random()
          this.codeImg = SERVER_PATH + `/Home/getCheckImg?img_code_key=${this.img_code_key}&wl_no=CPT`
        } else {
          this.img_code_key2 = Math.random()
          this.codeImg2 = SERVER_PATH + `/Home/getCheckImg?img_code_key=${this.img_code_key2}&wl_no=CPT`
        }
      },
    },
    activated() {
      this.getCellZd()
      this.getImgCode(1)
      this.getImgCode(2)
      const { isPhone } = this.$route.query
      this.accountInfo = JSON.parse(
        sessionStorage.getItem('cptInformation')
      )
      this.isPhone = isPhone + '' == 'true' // isPhone = true，用手机注册
      this.isBind = this.isPhone ? this.accountInfo.user_cell : this.accountInfo.user_email // isBind = true,已绑定-》修改
      const isBindTitle = this.isBind ? this.$t('accountBinding.details.modify') : this.$t('accountBinding.details.binding')
      const isPhoneTitle = this.isPhone ? this.$t('accountBinding.details.common[0]') : this.$t('accountBinding.details.common[2]')
      this.title = isBindTitle + isPhoneTitle
      this.$nextTick(() => {
        this.$refs.ruleFormBind && this.$refs.ruleFormBind.resetFields();
        this.$refs.ruleFormModify && this.$refs.ruleFormModify.resetFields();
      })
    }
  }
</script>
<style lang="scss">
  .bindingDetails {
    background: #fff;
    padding: 20px;

    .back {
      cursor: pointer;
      color: #313131;
      font-size: 14px;
      height: 18px;
      line-height: 18px;
      display: flex;
      align-items: center;
      width: 60px;

      img {
        margin-right: 6px;
        height: 12px;
      }
    }

    .title {
      color: #404040;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
      text-align: left;
    }

    .el-input__suffix {
      display: flex;
      align-items: center;
      cursor: pointer;
      right: 0;

      &-inner {
        display: flex;
        align-items: center;
      }

      .captcha {
        color: #284EE5;
        padding: 0 20px;

        @media screen and (max-width: 760px) {
          padding: 0 10px;
        }

        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 1px;
          height: 24px;
          background: #C8CDE6;
        }
      }
    }

    .ruleForm {
      width: 600px;
      margin: 30px auto;

      .el-button {
        width: 100%;
        margin-top: 30px;
      }
    }

    .codeImg {
      height: 39px;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
</style>
