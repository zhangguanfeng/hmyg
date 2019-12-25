
<template>
  <div class="register">
    <div class="bg-layer"></div>
    <div class="innerBox">
      <div class="title">
        <img src="@/assets/logo_2.png" alt />
        <div class="title-text">
          <p class="title-text-top">商户注册</p>
          <p class="title-text-bottom">Business registration</p>
        </div>
      </div>
      <div class="loginBox">
        <div class="layer"></div>

        <div class="contain">
         
          <div class="phoneBox inputBox">
            <img src="@/assets/account.png" alt class="inputIcon" />
            <div class="quhao">
              <el-select 
                v-model="value"
                placeholder="请选择地区"
                @change="handleChange"
                style="width: 36px; height: 95%;"
              >
                <el-option
                  v-for="item in areaData"
                  :key="item.value"
                  :value="item.name"
                  :label="item.prefix"
                >
                  <span style="float: left">{{ item.prefix }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>

            <input
              type="text"
              placeholder="请输入您的手机号"
              class="accountInput"
              v-model="phone"
              maxlength="11"
            />
          </div>
          <div class="inputBox codeBox">
            <input
              type="text"
              maxlength="4"
              placeholder="请输入图形码"
              style="padding-left: 10px;"
              v-model="code"
            />
            <img
              :src="SERVER_PATH+'/ajax_common/createCodeImg?randow='+random"
              ref="code"
              class="code"
              @click="refreshCode"
            />
          </div>
          <div class="inputBox codeBox">
            <input
              type="text"
              maxlength="6"
              placeholder="手机短信验证码"
              style="padding-left: 10px;"
              v-model="phone_code"
            />
            <button
              v-bind:class="[{ active: active }, 'phone_code']"
              @click="handlePhoneCode"
            >{{this.text}}{{this.time_text}}</button>
          </div>
          <div class="inputBox codeBox">
            <input
              type="text"
              maxlength="6"
              placeholder="邀请码(选填)"
              style="padding-left: 10px;"
              v-model="invite_code"
            />
            
          </div>
          <p class="forgetPsd"></p>
          <button class="logoBtn" @click="submit">立即注册</button>
          <p class="tips">
            已有账号？
            <a @click="$router.push('/login')">点击登录</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tokenHandler } from ".././../common/util";
export default {
  data() {
    return {
      select: "",
      areaData:[],
      value:'+86',
      area: "+86",
      phone_code: "",
      phone: "",
      code: "",
      SERVER_PATH: window.SERVER_PATH,
      random: Math.random(),
      times: 60,
      timer: null,
      text: "获取验证码",
      time_text: "",
      active: false,
      invite_code:''
      
    };
  },
  mounted() {
    this.getArea();
  },
  methods: {
    handleChange(e){
      this.areaData.forEach((el,i)=>{
        if(el.name == e){
          this.area = el.prefix
        }
      })
    },
    // 获取区号
    getArea() {
      let p = this.$http.post("ajax_common/getArea");
      p.then(res => {
        this.areaData = res.result.map(e => {
          return { 
            name:e.name,
            prefix:e.prefix
            }
        })
      });
    },
    // 获取手机验证码
    handlePhoneCode() {
      if (!this.phone || !this.code ) {
        this.$message.warning("资料填写不完整");
        return;
      }
      if (this.text === "获取验证码") {
        this.text = this.times;
        this.time_text = "秒";
        this.active = true;
        this.text--;
        this.timer = setInterval(() => {
          this.text--;
          if (!this.text) {
            clearInterval(this.timer);
            this.times = 60;
            this.text = "获取验证码";
            this.time_text = "";
            this.active = false;
          }
        }, 1000);
        const p = this.$http.post("ajax_common/sendSms", {
          area: this.area,
          phone: this.phone,
          code: this.code,
          randow: this.random,
          type: "100"
        });
        p.then(res => {
          this.$message.success(res.msg);
        }).catch(error => {
          if (this.timer) {
            clearInterval(this.timer);
            this.times = 60;
            this.text = "获取验证码";
            this.time_text = "";
            this.active = false;
          }
        });
      }
    },
    refreshCode() {
      this.random = Math.random();
      this.$refs.code.src = `${SERVER_PATH}/ajax_common/createCodeImg?randow=${this.random}`;
    },
    // 提交注册信息
    submit() {
      if (!this.phone || !this.phone_code) {
        this.$message.warning("手机号或者验证码不能为空！");
        return;
      }
      this.times--;
      this.timer = setInterval(() => {
        this.times--;
        if (!this.times) {
          clearInterval(this.timer);
          this.times = 60;
        }
      }, 1000);
      const p = this.$http.post("ajax_login/register", {
        phone: this.phone,
        area: this.area,
        sms_code: this.phone_code,
        invite_code:this.invite_code
      });
      p.then(res => {
        const { result } = res;
        tokenHandler("token", result.token);
        sessionStorage.setItem("phone2", this.phone);
        this.$router.push({
          name: "finishRegister"
        });
      }).catch(error => {
        if (this.timer) {
          clearInterval(this.timer);
          this.times = 60;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.active {
  background: #afb4b4 !important;
}
.el-input--suffix .el-input__inner{
  text-align: center
}
.register {
  width: 100%;
  height: 100vh;
  // background-image: url(../../assets/login_beijing.png);
  background-image: url(/img/login_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .innerBox {
    z-index: 9;
    .title {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      img {
        width: 75px;
        height: 64px;
        margin-bottom: 20px;
      }
      .title-text {
        color: #fff;
        &-top {
          font-size: 32px;
          text-align: center;
        }
        &-bottom {
          font-size: 17px;
          text-align: center;
          color: #fff;
          line-height: 25px;
        }
      }
    }
    .loginBox {
      width: 100%;
      width: 392px;
      height: 302px;
      border-radius: 8px;
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px;
      .contain {
        width: 320px;
        position: absolute;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 15px;
         .phoneBox {
          position: relative;
          .accountInput{
            padding-left:85px;
          }
          .quhao {
            padding-top: 1px;
            height: 100%;
            position: absolute;
            left: 43px;
            top: 0;
          }
        }
        .zone {
          position: absolute;
          left: 16px;
          top: -40px;
        }
      }
      .layer {
        width: 392px;
        height: 370px;
        background: #fff;
        opacity: 0.2;
        position: fixed;
        border-radius: 8px;
        margin-left: -20px;
        margin-top: -20px;
        z-index: 0;
      }
      .inputBox {
        position: relative;
        z-index: 1;
        width: 90%;
        height: 40px;
        border-radius: 4px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 20px;
         .el-input__inner {
          height: 100%;
          padding-left: 0;
          border: 0;
          padding-right: 0;
        }

        .el-input--suffix {
          height: 100%;
        }
        .el-input__suffix {
          display: none;
        }
        input {
          width: 100%;
          height: 100%;
          padding-left: 46px;
          font-size: 14px;
          outline: none;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          box-sizing: border-box;
          &:focus {
            border-color: #00c8a7;
          }
          &::placeholder {
            color: #b4b4b4;
          }
        }
        .inputIcon {
          position: absolute;
          top: 10px;
          left: 12px;
          height: 24px;
        }
      }
      .passwordBox {
        margin-bottom: 14px;
      }
      .forgetPsd {
        width: 95%;
        margin-bottom: 20px;
        text-align: right;
        font-size: 14px;
        color: #e3e3e3;
        span {
          cursor: pointer;
        }
      }
      .logoBtn {
        width: 90%;
        height: 40px;
        margin: 0 auto;
        margin-bottom: 15px;
        // background:linear-gradient(90deg,rgba(0,189,255,1) 0%,rgba(0,85,255,1) 100%);
        background: #01d4cb;
        border-radius: 4px;
        outline: none;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }
      .tips {
        margin-bottom: 0;
        color: #bbb;
        font-size: 13px;
        text-align: center;
        a {
          color: #01d4cb;
          cursor: pointer;
        }
      }
    }
    .codeBox {
      width: 100%;
      height: 48px;
      margin-bottom: 36px;
      display: flex;
      justify-content: space-between;
      input {
        width: 248px;
        height: 100%;
        padding: 0 12px;
        font-size: 14px;
        outline: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        box-sizing: border-box;
        &:focus {
          border-color: #1fba30;
        }
        &::placeholder {
          color: #b4b4b4;
        }
      }
      .code {
        width: 110px;
        height: 41px;
        margin-left: 2px;
        margin-top: -1px;
        cursor: pointer;
      }
      .phone_code {
        width: 110px;
        height: 41px;
        margin-left: 2px;
        margin-top: -1px;
        cursor: pointer;
        color: #fff;
        background: #01d4cb;
        border-radius: 6px;
        border: 1px solid transparent;
        outline: none;
      }
    }
  }
  .popWin {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 99;
    .popBox {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 434px;
      height: 250px;
      margin-top: -125px;
      margin-left: -217px;
      padding: 40px 40px 0;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .popBox-title {
        margin-bottom: 20px;
        img {
          width: 20px;
          height: 24px;
          margin-right: 10px;
          vertical-align: top;
        }
        span {
          font-size: 16px;
          font-weight: 500;
          color: #000;
        }
      }
      .googleInput {
        position: relative;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        background: #f4f8ff;
        border: 1px solid transparent;
        outline: none;
        font-size: 14px;
        box-sizing: border-box;
        &::placeholder {
          color: #c3cddc;
        }
        &.error {
          border: 1px solid #ef3024;
          color: #ef3024;
        }
      }
      .googleTips {
        margin-bottom: 30px;
        .forgetTips {
          line-height: 24px;
          font-size: 14px;
          color: #646464;
          b {
            font-weight: normal;
            color: #1fba30;
            cursor: pointer;
          }
        }
        .errorTips {
          float: right;
          line-height: 24px;
          font-size: 12px;
          color: #ef3024;
        }
      }
      .googleBtns {
        text-align: center;
        .btn {
          width: 100px;
          height: 32px;
          padding: 0;
          outline: none;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        .cancelBtn {
          margin-right: 60px;
          background: transparent;
          border: 1px solid #969696;
          color: #969696;
          cursor: pointer;
        }
        .confirmBtn {
          background: #2e415a;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .popTips {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 434px;
      height: 314px;
      margin-top: -157px;
      margin-left: -217px;
      padding: 40px 40px 0;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      h5 {
        margin-bottom: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      .popTips-title {
        margin-bottom: 20px;
        color: #646464;
        font-size: 14px;
      }
      .popTips-text {
        margin-bottom: 10px;
        color: #323232;
        font-size: 14px;
        img {
          width: 14px;
          height: 14px;
          margin-left: 10px;
          vertical-align: baseline;
          cursor: pointer;
        }
      }
      .closeIcon {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 34px;
        height: 34px;
        padding: 10px;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
  }
  .bg-layer {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #052033;
    opacity: 0.6;
    z-index: 0;
  }
}
// @media screen and (max-width:600px) {
//     .login {
//         padding-top:50px;
//         .innerBox {
//             width:90%;
//             margin:0 auto;
//             .title {
//                 margin-bottom:20px;
//                 .logo {
//                     width:40px;
//                     height:40px;
//                     margin-right:10px;
//                 }
//                 .title-text .title-text-top{
//                     font-size:16px;
//                 }
//                 .title-text .title-text-bottom{
//                     font-size:12px;
//                 }
//             }
//             .loginBox {
//                 height:auto;
//                 padding:40px 20px 20px;
//             }
//         }
//         .popWin {
//             .popBox {
//             width:88%;
//             margin-left:-44%;
//             }
//             .popTips {
//             width:88%;
//             margin-left:-44%;
//             }
//         }
//     }
// }
</style>
