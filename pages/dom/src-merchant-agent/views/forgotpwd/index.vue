<template>
  <div class="forgetPsd">
    <header>
      <div class="innerBox">
        <div class="header-left">
          <img src="@/assets/logo1.png" alt="">
        </div>
        <a @click="$router.push('/login')" class="header-right">登录</a>
      </div>
    </header>
    <div class="mainBox">
      <p class="title">重置密码</p>
      <div class="content content1 " v-if="activeBox == 1">
        <div class="emailBox inputBox">
          <span>地&nbsp;&nbsp;区</span>
          <el-select v-model="value" placeholder="请选择地区" @change="handleChange" style="width: 344px;">
              <el-option
                v-for="item in areaData"
                :key="item.value"
                :label="item.name"
                :value="item.prefix"
              ></el-option>
          </el-select>
        </div>
        <div class="emailBox inputBox">
          <span>手&nbsp;&nbsp;机&nbsp;&nbsp;号</span>
          <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11">
        </div>
        <div class="codeBox inputBox">
          <span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span>
          <input type="text" placeholder="请输入验证码" v-model="validateCode" maxlength="4">
          <img :src="SERVER_PATH+'/ajax_common/createCodeImg?randow='+random" alt="" class="codeImg" ref="codeImg" @click="changeCodeUrl">
        </div>
        <div class="inputBox codeBox">
          <span>手机验证码</span>
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
        <div class="emailBox inputBox">
          <span>新&nbsp;&nbsp;密&nbsp;&nbsp;码</span>
          <input type="password" placeholder="请输入新密码" v-model="passwd">
        </div>
        <button class="btn1 btn" @click="submitEmail">确认</button>
      </div>
      <div class="content content2 " v-else-if="activeBox == 2">
        <div class="passwordBox inputBox">
          <span>登录密码</span>
          <input type="password" placeholder="设置登录密码" v-model="loginPwd1">
        </div>
        <div class="confirmPsdBox inputBox">
          <span>确认密码</span>
          <input type="password" placeholder="确认登录密码" v-model="loginPwd2">
        </div>
        <button class="btn2 btn" @click="submitPwd" :disabled="btnDisabled">确认</button>
      </div>
    </div>
    <div class="popWin" v-show="showPop">
      <div class="popBox">
        <h5 class="popTitle">
          <img src="@/assets/success.png" alt="">
          <span>安全验证</span>
        </h5>
        <div class="popInput emailCode">
          <input type="text" placeholder="请输入邮箱验证码" v-model="emailCode">
          <span class="getEmailCode">
            <b v-if="times == 60" @click="getCode">获取验证码</b>
            <b v-else>{{times}}</b>
          </span>
        </div>
        <div class="popInput googleCode" v-if="isGoogle">
          <input type="text" placeholder="请输入谷歌验证码" v-model="googleCode" maxlength="6">
        </div>
        <div class="popBtns">
          <button class="popBtn cancelBtn" @click="popCancel">取消</button>
          <button class="popBtn confirmBtn" @click="popConfirm">确认</button>
        </div>
        <img src="@/assets/close.png" alt="" class="closeIcon" @click="popCancel">
      </div>
    </div>
  </div>
</template>
<script>

const loginPwdReg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
import md5 from 'js-md5'
export default {
  data() {

    return {
      activeBox:1,
			showPop:false,
			phone:'',
      validateCode:'',   //图形验证码
      passwd:'',
			loginPwd1:'',
			loginPwd2:'',
			phone_code:'',
			googleCode:'',
      SERVER_PATH: window.SERVER_PATH,
      random:Math.random(),
      timer:null,
      times:60,
      btnDisabled:false,
      isGoogle: false,
      emailCode:'',

      //
      areaData:[], //区号列表
      area:'', //选中的区号
      value:'',
      text: "获取验证码",
      time_text: "",
      active: false
    }
  },
  created () {
    this.getArea();
  },
  methods:{
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
    // 选中的区号
    handleChange(e){
      console.log(e,'999');
      
      this.area = e
    },
    // 图像验证码
		changeCodeUrl() {
      this.random = Math.random()
			this.$refs.codeImg.src = `${SERVER_PATH}/ajax_common/createCodeImg?randow=${this.random}`
    },
    // 获取手机验证码
    handlePhoneCode() {
      if (!this.phone || !this.validateCode) {
        this.$message.warning("手机号或者验证码不能为空！");
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
          code: this.validateCode,
          randow: this.random,
          type: "200"
        });
        p.then(res => {
          this.$message.success('获取成功')

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
		//提交手机和验证码
		submitEmail() {
			if (!this.phone || !this.validateCode) {
				this.$message.warning('请输入手机号和验证码！')
				return
      }
      if (!loginPwdReg.test(this.passwd)) {
        this.$message.warning('由6~16位，密码由大小写字母、数字组成')
        return
      }
      let p = this.$http.post('ajax_login/changePasswd',{
        area:this.area,
        phone:this.phone,
        sms_code:this.phone_code,
        passwd:md5(this.passwd),
      })
      p.then( res => {
        this.$message.success('修改成功')
        this.$router.push('/login')
        // this.showPop = true
        // this.isGoogle = res.result.is_google || false
      }).catch( error => {
        return false
      })
    },




//  旧代码
    //获取邮箱验证码
    getCode() {
      if (this.timer) {
        clearInterval(this.timers)
      }
      this.times--
      this.timer = setInterval(()=>{
          this.times--;
          if (!this.times) {
              clearInterval(this.timer);
              this.times = 60;
          }
      },1000)
      let p = this.$http.post('ajax_login/changePasswdSendEmail',{
        email:this.email
      })
      p.then(res => {
        this.$alert(res.msg)
      }).catch(error => {
        return false
      })
    },
		//弹出窗取消
		popCancel() {
			this.emailCode = ''
			this.googleCode = ''
			this.showPop = false
		},
		//弹出窗确认
		popConfirm() {
			if (!this.emailCode) {
				this.$message.warning('请输入邮箱验证码！')
				return
      }
      let p = this.$http.post('ajax_login/changePasswdTwo',{
        code:this.emailCode,
        google_code:this.googleCode,
        email:this.email
      })
      p.then(res => {
        if (this.timer) {
          clearInterval(this.timer)
          this.times = 60
        }
        this.showPop = false
        this.activeBox = 2
        this.emailCode = ''
        this.googleCode = ''
      }).catch(error => {
        return false
      })
			//调用接口成功回调
		},
		//提交新密码
		submitPwd() {
			if (!this.loginPwd1 || !this.loginPwd2) {
				this.$message.warning('请输入密码！')
				return
			}
			if (!loginPwdReg.test(this.loginPwd1)) {
				this.$message.warning('由6~16位，密码由大小写字母、数字组成')
				return
			}
			if (this.loginPwd2 != this.loginPwd1) {
				this.$message.warning('两次密码输入不一致')
				return
      }
      this.btnDisabled = true
      let p = this.$http.post('ajax_login/changePasswdsThree',{
        passwd:md5(this.loginPwd1),
        confirm_passwd:md5(this.loginPwd2),
        email:this.email
      })
      p.then(res => {
        this.$notify({
          title: '成功',
          message: '',
          type: 'success'
        });
        setTimeout(()=>{git
          this.$router.push('/login')
        },2000)
      }).catch(error => {
        this.btnDisabled = false
        return false
      })
		}
  }
}
</script>
<style lang="scss" scoped>
.active {
  background: #afb4b4 !important;
}
.phone_code {
        width: 95px;
        height: 50px;
        margin-left: 10px;
        margin-top: -1px;
        cursor: pointer;
        color: #fff;
        background: #01d4cb;
        border-radius: 6px;
        border: 1px solid transparent;
        outline: none;
      }
  .forgetPsd {
    width:100%;
    height:100vh;
    background: #F0F3F7;
    background-repeat: no-repeat;
    background-position: top center;
    box-sizing: border-box;
    header {
      width:100%;
      height: 70px;
      margin-bottom: 40px;
      background: #00C8A7;
      .innerBox {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-left {
          display: flex;
          align-items: center;
          img {
            height: 40px;
            margin-right: 10px;
          }
          span {
            font-size: 24px;
            color: #FFF;
          }
        }
        .header-right {
            width: 80px;
            height: 32px;
            line-height: 32px;
            background: transparent;
            border: 1px solid #FFF;
            border-radius: 4px;
            font-size: 14px;
            color: #FFF;
            text-align: center;
            outline: none;
            cursor: pointer;
        }
      }
    }
    .mainBox {
      width: 600px;
      height: 510px;
      margin: 0 auto;
      background: #FFF;
      border-radius: 8px;
      .title {
        width:100%;
        height:60px;
        margin-bottom:0;
        line-height: 60px;
        border-bottom:1px solid #F0F0F0;
        text-indent: 40px;
        color:#00C8A7;
        font-size:16px;
        font-weight: 500;
      }
      .content {
        padding:40px 83px 0;
        text-align: center;
        box-sizing: border-box;
        .inputBox {
          width:100%;
          height:48px;
          margin-bottom:20px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          span {
              width:80px;
              margin-right:10px;
              color:#646464;
              display: block;
              font-size:14px;
              text-align: center;
              font-weight: 500;
          }
          input {
            flex: 1;
            height:100%;
            padding-left:12px;
            border:1px solid #D9D9D9;
            border-radius: 4px;
            outline: none;
            font-size:14px;
            &::placeholder {
              color:#B4B4B4;
            }
            &:focus {
              border-color:#00C8A7;
            }
          }
        }
        .btn {
          width:368px;
          height:48px;
          // background: linear-gradient(90deg,rgba(0,189,255,1) 0%,rgba(0,85,255,1) 100%);
          background: #2E415A;
          border-radius:4px;
          outline: none;
          border:none;
          color:#FFF;
          font-size:16px;
          cursor: pointer;
        }
      }
      .content1 {
        display: block;
        .codeBox {
          // margin-bottom:40px;
          .codeImg {
            width:96px;
            height:100%;
            margin-left:10px;
            cursor: pointer;
          }
        }
      }
      .content2 {
        .confirmPsdBox {
          margin-bottom:40px;
        }
      }
    }
    .popWin {
      display: block;
      position: fixed;
      top:0;
      left:0;
      bottom:0;
      right:0;
      background: rgba(0,0,0,.35);
      z-index:99;
      .popBox {
        position: absolute;
        top:50%;
        left:50%;
        width:434px;
        height:276px;
        margin-left:-217px;
        margin-top:-138px;
        padding:40px 40px 0;
        background: #FFF;
        border-radius: 4px;
        box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
        box-sizing: border-box;
        .popTitle {
          display: flex;
          align-items: center;
          margin-bottom:20px;
          img {
            width:20px;
            height:24px;
            margin-right:10px;
          }
          span {
            color:#000;
            font-size:16px;
          }
        }
        .popInput {
          position: relative;
          width:100%;
          height:40px;
          margin-bottom:20px;
          input {
            width:100%;
            height:100%;
            padding:0 90px 0 10px;
            background: #F4F8FF;
            border:none;
            outline: none;
            border-radius: 4px;
            font-size:14px;
            box-sizing: border-box;
            &::placeholder {
              color:#C3CDDC;
            }
          }
        }
        .emailCode span {
          position: absolute;
          top:0;
          right:10px;
          line-height: 40px;
          color:#1FBA30;
          font-size:14px;
          cursor: pointer;
          b {
            font-weight: normal;
          }
        }
        .googleCode {
          margin-bottom:30px;
        }
        .popBtns {
          display: flex;
          justify-content: center;
        }
        .popBtn {
          width:100px;
          height:32px;
          outline: none;
          border:none;
          border-radius:4px;
          font-size:14px;
          cursor: pointer;
        }
        .cancelBtn {
          margin-right:60px;
          background: transparent;
          border:1px solid #969696;
          color:#969696;
        }
        .confirmBtn {
          background: #2E415A;
          color:#FFF;
        }
        .closeIcon {
          position: absolute;
          top:10px;
          right:10px;
          width:34px;
          height:34px;
          padding:10px;
          cursor: pointer;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
