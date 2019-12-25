/**
*  Created by   阿紫
*  On  2019-01-04
*  Content 注册
*/
<template>
  <div class='receiveRegister'>
    <div class="content">
      <div class="center">

        <sac-input
          :placeholder="$t('redEnvlpRegister.center')[0]"
          v-model="postObj.phone"
          :rules="rules.phone"
          type="tel"
          ref="phone"
          :max="postObj.prefix=='+86'?11:16"
        >
          <div slot="label" class="phone-select vux-1px-r" @click="selsctPrefix"> {{postObj.prefix}}
            <i class="iconfont icon-areaCode"></i>
          </div>
        </sac-input>


        <sac-input :placeholder="$t('redEnvlpRegister.center')[1]"
                   v-model="postObj.picCode"
                   :max=4
                   type="text"
                   ref="picCode"
                   :rules="rules.picCode">
          <img @click="getImgCode" :src="validateCode" alt="" slot="right" class="imgCode">
        </sac-input>

        <sac-input :placeholder="$t('redEnvlpRegister.center')[2]"
                   :max=6
                   type="text"
                   v-model="postObj.captcha"
                   ref="captcha"
                   :rules="rules.captcha">
          <span class="phoneCaptcha" @click="sendPhoneCaptcha" slot="right">{{captchaTitle}}</span>
        </sac-input>
        <button class="getRedEnvlpClass" @click="getRedEnvlp">{{$t('redEnvlpRegister.center')[5]}}</button>
      </div>

    </div>
    <div v-transfer-dom class="select-group">
      <popup v-model="showSelect" position="bottom" should-scroll-top-on-show>
        <checklist
          label-position="left"
          required
          :max=1
          :options="areaCode"
          v-model="fullValues"
          @on-change="getSelect"
        ></checklist>
      </popup>
    </div>
  </div>
</template>
<script>
  import { TransferDom } from 'vux';
  import SacInput from '../../components/sac-input';

  export default {
    name: "receiveRegister",
    directives: {
      TransferDom
    },
    components: {
      SacInput
    },
    data() {
      const valiphone = (rule, value, callback) => {
        if (value === '') {
          callback('请输入手机号码');
          return;
        } else if (this.postObj.prefix === '+86' && value.length !== 11) {
          callback('手机号码输入有误');
          return;
        }
        callback();
      };
      const valiPicCode = (rule, value, callback) => {
        if (value === '') {
          callback('请输入图形验证码');
          return;
        } else if (value.length !== 4) {
          callback('您输入的图形验证码有误');
          return;
        }
        callback();
      }
      const valiCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback('请输入短信验证码');
          return;
        } else if (value.length !== 6) {
          callback('您输入的短信验证码有误');
          return;
        }
        callback();
      }
      return {
        isTranslateY: false,
        details: {},
        fullValues: ['+86'],
        postObj: {
          phone: '',
          prefix: '+86',
          picCode: '',
          captcha: '',
          type: 'RECEIVE_REDENVLP',
        },
        validateCode: '',
        showSelect: false,
        areaCode: [
          {
            key: '+86',
            value: '中国 +86',
          }, {
            key: '+852',
            value: '中国香港 +852',
          }, {
            key: '+853',
            value: '中国澳门 +853',
          }, {
            key: '+886',
            value: '中国台湾 +886',
          }, {
            key: '+8801',
            value: '日本 +8801',
          }, {
            key: '+8802',
            value: '韩国 +8802',
          }, {
            key: '+001',
            value: '美国 +001',
          }, {
            key: '+44',
            value: '英国 +44',
          }, {
            key: '+0061',
            value: '澳大利亚 +0061',
          }
        ],
        rules: {
          phone: {
            validator: valiphone,
            msg: this.$t('redEnvlpRegister.tips.phone_num')
          },
          picCode: {
            validator: valiPicCode,
            msg: this.$t('redEnvlpRegister.tips.picCode_num')
          },
          captcha: {
            validator: valiCaptcha,
            msg: this.$t('redEnvlpRegister.tips.captcha_num')
          }
        },
        timer: null,
        times: 60,
        codeing: false,
        captchaTitle: this.$t('redEnvlpRegister.center')[3],
      };
    },
    methods: {

      getImgCode() { // 验证码
        this.validateCode = `${window.justTokenBaseURL}wallet/app/user/open/getValidateCode.do?type=RECEIVE_REDENVLP&version=1.0.0&plat=web&${Math.random()}`
      },
      // 发消息
      sendPhoneCaptcha() {
        const { phone, prefix, picCode, type } = this.postObj;

        if (this.codeing) {
          return;
        }

        let isSend = true;
        const arr = [{
          name: 'phone',
          value: phone
        }, {
          name: 'picCode',
          value: picCode
        }];

        this.$refs.captcha.reset();

        arr.forEach(({ name, value }) => {
          if (!value || this.$refs[name].isTips === true) {
            this.$refs[name].blurChange(value);
            isSend = false;
          }
        });

        if (isSend) {
          this.$http.post('wallet/app/user/open/sendPhoneCaptcha.do', {
            phone,
            prefix,
            picCode,
            type
          }).then(res => {
            this.codeing = true
            const self = this;
            this.timer = setInterval(() => {
              self.times--;
              self.captchaTitle = `${this.$t('redEnvlpRegister.center')[4]}(${self.times})`;
              if (!self.times) {
                clearInterval(self.timer);
                self.captchaTitle = this.$t('redEnvlpRegister.center')[3]
                self.times = 60;
                this.codeing = false
              }
            }, 1000);


          }).catch(res => {
            const { data } = res;
            if (+data.code === 13008) {
              this.getImgCode()
            }
          })
        }
      },
      // 确定
      getRedEnvlp() {
        const { phone, prefix, picCode, captcha, type } = this.postObj;
        const { redenvlpMainId } = this.$route.query;
        let isGet = true;
        const arr = [{
          name: 'phone',
          value: phone
        }, {
          name: 'picCode',
          value: picCode
        }, {
          name: 'captcha',
          value: captcha
        }];

        arr.forEach(({ name, value }) => {
          if (!value || this.$refs[name].isTips === true) {
            this.$refs[name].blurChange(value);
            isGet = false;
          }
        });

        if (isGet) {
          this.$http.post('wallet/app/user/open/validateCaptcha.do', this.postObj).then(res => {
            this.$router.push({
              name: 'redEnvlp',
              query: {
                redenvlpMainId,
                phone
              }
            })
          })
        }
      },
      selsctPrefix() {
        this.showSelect = !this.showSelect;
      },
      getSelect([val]) {
        if (val) {
          this.postObj.prefix = val;
        } else {
          this.fullValues = [this.postObj.prefix];
        }
        this.showSelect = false;
      },
      reset() {
        this.postObj = {
          phone: '',
          prefix: '+86',
          picCode: '',
          captcha: '',
          type: 'RECEIVE_REDENVLP',
        };
        this.fullValues = ['+86'];
      },
    },
    activated() {
      this.reset();
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      document.title = lang === 'zh' ? ' 领取红包' : 'Receiving red packets';
      this.getImgCode();
    }
  };
</script>
<style lang="less">
  .receiveRegister {
    min-height: 100%;
    background: #F5F5F5;

    .content {
      max-width: 500px;
      margin: 30px auto;

      .center {
        margin: 0 15px;
        padding: 0 15px;
        background: #fff;
        border-radius: 12px;

        .phone-select {
          padding-right: 16px;
          margin-right: 10px;
          position: relative;
          font-size: 16px;

          .iconfont {
            position: absolute;
            font-size: 10px;
            top: 8px;
            right: 6px;
          }
        }

        .imgCode {
          width: 90px;
        }

      }
    }

    .phoneCaptcha {
      color: #5E87D8;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      width: 100px;
      text-align: right;
    }

    .getRedEnvlpClass {
      border: none;
      padding: 0 15px;
      width: 100%;
      max-width: 500px;
      margin: 30px 0 20px 0;
      height: 42px;
      background: rgba(242, 52, 69, 1);
      box-shadow: 4px 7px 18px 0px rgba(227, 69, 74, 0.32);
      border-radius: 42px;
      color: #fff;
      font-weight: 800;
      font-size: 16px;

      &:focus {
        background: #db4645;
        outline: none;
      }
    }
  }
</style>
