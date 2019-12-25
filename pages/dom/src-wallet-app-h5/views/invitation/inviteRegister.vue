/**
*  Created by   阿紫
*  On  2019/11/25 0025
*  Content  分享后的注册页
*/
<template>
  <div class="inviteRegister" :class="{isRegister:!isRegister}">
    <div class="content">
      <div v-if="isRegister" class="registers">
        <div class="box">
          <div class="title">用户注册</div>
          <div class="form">
            <div v-if="isInvest =='0'">
              <group title="手机号"></group>
              <sac-input
                placeholder="请输入您的手机号"
                v-model="postObj.phone"
                :rules="rules.phone"
                type="tel"
                ref="phone"
                :max="postObj.prefix=='+86'?11:16"
              >
                <div slot="label" class="phone-select vux-1px-r" @click="selsctPrefix">
                  {{area}}
                  <i class="iconfont icon-areaCode"></i>
                </div>
              </sac-input>
            </div>
            <div v-else>
              <group title="邮箱">
                <sac-input
                  placeholder="请输入您的邮箱"
                  v-model="postObj.email"
                  :rules="rules.email"
                  :max="30"
                  type="email"
                  ref="email"
                >
                </sac-input>
              </group>
            </div>
            <group title="发送验证码">
              <sac-input
                placeholder="请输入验证码"
                :max="6"
                type="text"
                v-model.sync="postObj.captcha"
                ref="captcha"
                :rules="rules.captcha"
              >
                <span
                  class="phoneCaptcha vux-1px-l"
                  @click="sendPhoneCaptcha"
                  slot="right"
                >{{captchaTitle}}</span>
              </sac-input>
            </group>
            <group title="设置密码">
              <sac-input
                placeholder="8-24位由大小写字母、数字组合的密码"
                type="password"
                v-model.sync="postObj.pwd"
                ref="pwd"
                :max="24"
                :rules="rules.pwd"
              ></sac-input>
            </group>
            <group title="邀请码">
              <sac-input
                placeholder="请输入邀请码"
                type="text"
                disabled
                v-model.sync="postObj.inviteCode"
                ref="inviteCode"
              ></sac-input>
            </group>
            <div class="check">
              <img src="./img/agree.png" alt="">
              <span>注册即同意</span>
              <!--              <check-icon :value.sync="checkIcon">注册即同意</check-icon>-->
              <a class="text"
                 href="https://pageswallet.alpex.io/no_responsibility.html">《免责及责任限制声明》</a>
            </div>
          </div>
        </div>
        <!--        <div class="triangle_list">-->
        <!--          <div class="triangle"></div>-->
        <!--          <div class="triangle"></div>-->
        <!--          <div class="triangle"></div>-->
        <!--        </div>-->
        <div class="goInvite" @click="register">注册</div>
      </div>
      <div class="succeed" v-else>
        <img class="succeed_title" src="./img/desc3.png" alt/>
        <img class="logo" src="./img/desc4.png" alt/>
<!--        <div class="triangle_list triangle_list2">-->
<!--          <div class="triangle"></div>-->
<!--          <div class="triangle"></div>-->
<!--          <div class="triangle"></div>-->
<!--        </div>-->
        <div class="goInvite" @click="download">立即下载</div>
      </div>
      <div v-transfer-dom class="select-group">
        <popup v-model="showSelect" position="bottom" should-scroll-top-on-show>
          <checklist
            label-position="left"
            required
            :max="1"
            :options="prefix_list"
            v-model="fullValues"
            @on-change="getSelect"
          ></checklist>
        </popup>
      </div>
    </div>
  </div>
</template>
<script>
  import SacInput from "../../components/sac-input";
  import {terminal} from "common/unti";
  import {TransferDom} from "vux";
  import {md5} from "vux";

  export default {
    name: "inviteRegister",
    directives: {
      TransferDom
    },
    data() {
      const valiphone = (rule, value, callback) => {
        if (value === "") {
          callback("请输入手机号码");
          return;
        } else if (this.postObj.prefix === "+86" && value.length !== 11) {
          callback("手机号码输入有误");
          return;
        }
        callback();
      };
      const valiEmail = (rule, value, callback) => {
        const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (value === "") {
          callback("请输入邮箱");
          return;
        } else if (!regex.test(value)) {
          callback("邮箱输入有误");
          return;
        }
        callback();
      };
      const valiCaptcha = (rule, value, callback) => {
        if (value === "") {
          callback("请输入验证码");
          return;
        }
        callback();
      };
      const pwdCaptcha = (rule, value, callback) => {
        const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]*.{8,24}$/;
        if (value === "" || !regex.test(value)) {
          callback("请输入8-24位由大小写字母、数字组合的密码");
          return;
        }
        callback();
      };
      return {
        checkIcon: true, //勾选免责声明
        area: "中国（+86）",
        postObj: {
          phone: "",
          prefix: "+86",
          email: "",
          captcha: "",
          pwd: "",
          inviteCode: "",
          type: "REGISTER"
        },
        inviteCode: "",
        rules: {
          phone: {
            validator: valiphone,
            msg: "请输入手机号码"
          },
          email: {
            validator: valiEmail,
            msg: "请输入邮箱"
          },
          captcha: {
            validator: valiCaptcha,
            msg: "请输入短信验证码"
          },
          pwd: {
            validator: pwdCaptcha,
            msg: "请输入8-24位由大小写字母、数字组合的密码"
          }
        },
        showSelect: false,
        captchaTitle: "获取验证码",
        timer: null,
        times: 60,
        codeing: false,
        isRegister: true,
        fullValues: ["+86"],
        prefix_list: [],
        isInvest: '0', // 是否是理财账户  1为理财用户，0为支付账户
      };
    },
    components: {
      SacInput
    },
    methods: {
      download() {
        if (terminal.android) {
          window.location.href = `${window.location.origin}/#/downloadWalletApp`;
        } else {
          window.location.href = `${window.location.origin}/#/download`;
        }
      },
      register() {
        const {phone, prefix, captcha, pwd, inviteCode, email} = this.postObj;
        if (this.isInvest == '0') { // 支付账户
          let isGet = true;
          const arr = [
            {
              name: "phone",
              value: phone
            },
            {
              name: "captcha",
              value: captcha
            },
            {
              name: "pwd",
              value: pwd
            }
          ];

          arr.forEach(({name, value}) => {
            if (!value || this.$refs[name].isTips === true) {
              this.$refs[name].blurChange(value);
              isGet = false;
            }
          });
          if (isGet) {
            // if (!this.checkIcon) {
            //   this.$vux.toast.text("请先阅读并同意免责声明");
            //   return;
            // }
            this.$http
              .post("/wallet/app/user/open/phoneRegisterWeb.do", {
                phone,
                prefix,
                captcha,
                loginMd5pwd: md5(pwd),
                inviteCode
              })
              .then(res => {
                this.isRegister = false;
              });
          }
        } else { // 理财
          let isGet = true;
          const arr = [
            {
              name: "email",
              value: email
            },
            {
              name: "captcha",
              value: captcha
            },
            {
              name: "pwd",
              value: pwd
            }
          ];

          arr.forEach(({name, value}) => {
            if (!value || this.$refs[name].isTips === true) {
              this.$refs[name].blurChange(value);
              isGet = false;
            }
          });
          if (isGet) {
            // if (!this.checkIcon) {
            //   this.$vux.toast.text("请先阅读并同意免责声明");
            //   return;
            // }
            this.$http
              .post("/wallet/app/user/open/emailRegisterWeb.do", {
                email,
                captcha,
                loginMd5pwd: md5(pwd),
                inviteCode
              })
              .then(res => {
                this.isRegister = false;
              });
          }
        }
      },
      selsctPrefix() {
        this.showSelect = !this.showSelect;
      },
      sendPhoneCaptcha() {
        const {phone, prefix, type, email} = this.postObj;
        if (this.codeing) {
          return;
        }
        let isSend = true;
        let arr = [];
        if (this.isInvest == '0') {
          arr = [
            {
              name: "phone",
              value: phone
            }
          ];
        } else {
          arr = [
            {
              name: "email",
              value: email
            }
          ];
        }

        this.$refs.captcha.reset();
        arr.forEach(({name, value}) => {
          if (!value || this.$refs[name].isTips === true) {
            this.$refs[name].blurChange(value);
            isSend = false;
          }
        });
        if (isSend) {
          this.codeing = true;
          this.timer = setInterval(() => {
            this.times--;
            this.captchaTitle = `${this.$t("redEnvlpRegister.center")[4]}(${
              this.times
            })`;
            if (!this.times) {
              this.resetTimes();
            }
          }, 1000);
          this.$http
            .post("wallet/app/user/open/sendPhoneCaptcha.do", {
              phone: this.isInvest == '0' ? phone : email,
              prefix,
              type
            })
            .catch(res => {
              const {data} = res;
              this.resetTimes();
            });
        }
      },
      resetTimes() {
        this.codeing = false;
        this.times = 60;
        this.captchaTitle = this.$t("redEnvlpRegister.center")[3];
        clearInterval(this.timer);
      },
      getSelect([val], [label]) {
        if (val) {
          this.postObj.prefix = val;
          if (label != "+86") {
            this.area = label;
          }
        } else {
          this.fullValues = [this.postObj.prefix];
        }
        this.showSelect = false;
      },
      getPhonePrefix() {
        this.$http.post("/wallet/app/user/open/getPhonePrefix.do").then(res => {
          const prefix_list = res.result.prefix_list || [];
          prefix_list.forEach(item => {
            item.key = item.prefix;
            item.value = `${item.name}（${item.prefix}）`;
          });
          this.prefix_list = prefix_list;
        });
      },
      reset() {
        this.postObj = {
          email: "",
          phone: "",
          prefix: "+86",
          captcha: "",
          pwd: "",
          inviteCode: this.$route.query.inviteCode || "",
          type: "REGISTER"
        };
        this.fullValues = ["+86"];
        this.$refs.phone.reset();
        this.$refs.captcha.reset();
        this.$refs.pwd.reset();
      }
    },
    activated() {
      if (this.isRegister) {
        this.reset();
      }
      this.isInvest = this.$route.query.isInvest;
      this.getPhonePrefix();
      document.title = " 注册";
    }
  };
</script>
<style lang="less">
  .inviteRegister {
    height: 100%;
    overflow-y: scroll;
    width: 100%;
    background: url("./img/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;

    input::-webkit-input-placeholder {
      color: #fff;
      opacity: 0.6;
    }

    .content {
      max-width: 500px;
      background: url("./img/quan.png") no-repeat;
      background-size: 300px, 300px;
      background-position: top center;
      margin: 0 auto;
      padding-top: 30px;

      .box {
        background: url("./img/register_bg.png") no-repeat;
        background-size: 100% 100%;
      }

      .succeed {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .succeed_title {
          width: 292px;
          margin: 0 auto;
        }

        .logo {
          margin: 60px 0;
        }
      }
    }

    .vux-1px-l:before {
      border-color: #43ffd2;
    }
    .title {
      color: #43ffd2;
      font-size: 22px;
      text-align: center;
      padding-top: 30px;
    }

    .form {
      padding: 0 10px;

      .check {
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }

        span {
          color: #fff;
          font-size: 13px;
        }

        .text {
          color: #43ffd2;
          font-size: 13px;
        }
      }

      .weui-cells {
        padding: 0;
        margin: 0;
        height: auto;
        overflow: visible;
      }

      .weui-cells__title {
        padding-left: 2px;
        color: #fff;
      }

      .weui-cells {
        /*border-radius: 6px;*/
        background: none;

        &:after,
        &:before {
          border: none;
        }
      }

      .vux-1px-r:after {
        padding-right: 4px;
      }

      .weui-cell {
        padding: 5px 15px;
      }

      .phone-select {
        padding-right: 16px;
        margin-right: 10px;
        position: relative;
        font-size: 14px;
        color: #fff;

        .iconfont {
          position: absolute;
          font-size: 10px;
          top: 8px;
          right: 6px;
        }
      }

      .phoneCaptcha {
        color: #43ffd2;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        width: 90px;
        text-align: right;
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        margin-right: -10px;
      }

      .sac-input {
        .weui-cell {
          &:before {
            border: none;
          }
        }

        .tips {
          color: #ff6262;
        }

        .vux-x-input {
          cursor: pointer;
          background: url("./img/input_bg.png") no-repeat;
          background-size: 100% 100%;
          border-radius: 6px;

          .weui-input {
            color: #fff;
            -webkit-text-fill-color: #fff;
          }
        }
      }
    }

    .triangle_list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: -30px;
      margin-bottom: -10px;

      .triangle {
        width: 0;
        height: 0;

        &:nth-child(1) {
          opacity: 0.2;
          border-top: 6px solid #26ebffff;
          border-bottom: 6px solid transparent;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
          /*animation: ghostUpdown 1s infinite alternate;*/
        }

        &:nth-child(2) {
          opacity: 0.3;
          border-top: 10px solid #26ebffff;
          border-bottom: 10px solid transparent;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          /*animation: ghostUpdown1 1s infinite alternate;*/
        }

        &:nth-child(3) {
          border-top: 14px solid #26ebffff;
          border-bottom: 14px solid transparent;
          border-right: 14px solid transparent;
          border-left: 14px solid transparent;
          /*animation: ghostUpdown2 0.5s infinite alternate;*/
        }
      }
    }

    .triangle_list2 {
      margin-top: 10px;
      margin-bottom: 10px;

    }

    .goInvite {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px auto 50px auto;
      width: 130px;
      height: 130px;
      font-size: 22px;
      font-weight: 600;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
      text-align: center;
      color: #fff;
      background: url("./img/but_bg.png") no-repeat;
      background-size: 100% 100%;
    }

    .sac-input {
      margin-bottom: 25px;
    }

    .vux-check-icon > .weui-icon-success:before {
      color: #5cffd8ff !important;
    }

    .weui-icon-success, .weui-icon-circle {
      font-size: 16px;
    }

    .content-tips {
      color: #fff;
      font-size: 16px;
      line-height: 30px;
      margin: 0 30px;
    }
  }
  @media (min-height: 400px) and (max-height: 506px) {
    .isRegister {
      overflow: hidden;
      .content {
        .succeed {
          padding: 10px 20px 0 20px;
          .logo {
            margin: 20px auto 30px auto;
          }
        }
        .goInvite {
          margin-top: 15px;
        }
      }
    }
  }
  @media (min-height: 507px) and (max-height: 580px) {
    .isRegister {
      overflow: hidden;
      .content {
        .succeed {
          padding: 30px 20px 0 20px;
          .logo {
            margin: 30px auto 40px auto;
          }
        }
        .goInvite {
          margin-top: 15px;
        }
      }
    }
  }
  @media (min-height: 581px) and (max-height: 699px) {
    .isRegister {
      overflow: hidden;
      .content {
        .succeed {
          padding: 30px 20px 0 20px;
          .logo {
            margin: 40px auto 50px auto;
          }
        }
        .goInvite {
          margin-top: 15px;
        }
      }
    }
  }
  @media (min-height: 700px) and (max-height: 750px) {
    .inviteRegister {
      .content {
        padding-top: 40px;
      }

      .goInvite {
        margin: 40px auto 50px auto;
      }
    }
    .isRegister {
      overflow: hidden;
      .content {
        .succeed {
          padding: 50px 20px 0 20px;
          .logo {
            margin: 60px auto 40px auto;
          }
        }
      }
    }
  }
  @media (min-height: 751px) and (max-height: 900px) {
    .inviteRegister {
      .content {
        padding-top: 60px;
      }

      .goInvite {
        margin: 70px auto 0 auto;
      }
    }
    .isRegister {
      overflow: hidden;
      .content {
        .succeed {
          padding: 50px 20px 0 20px;
          .logo {
            margin: 80px auto 40px auto;
          }
        }
      }
    }
  }
</style>
