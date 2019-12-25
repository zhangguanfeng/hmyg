<template>
  <div class="resetPsd">
    <Header></Header>
    <div class="mainBox">
      <div class="innerBox">
        <p class="mainTips">为了您的账户资金安全，您需要完善以下资料才能进入商户后台管理系统</p>
        <div class="setBox">
          <div class="boxTitle">设置资金密码</div>
          <div class="boxContent">
            <div class="passwordBox">
              <div class="inputBox">
                <span>资金密码</span>
                <input type="password" class="password" placeholder="请输入资金密码" v-model="password1">
              </div>
              <div class="inputBox">
                <span>确认密码</span>
                <input type="password" class="confirmPsd" placeholder="请再次输入资金密码" v-model="password2">
              </div>
            </div>
          </div>
          <div class="boxTitle">
            <span>绑定谷歌验证码</span>
            <span class="titleTips">绑定谷歌验证后将开启登录验证</span>
          </div>
          <div class="boxContent">
            <div class="googleBox">
              <p class="googleText">打开 Authenticator，扫描二维码或手动输入下述秘钥添加验证令牌</p>
              <img :src="qrcode" alt="" class="qrCode">
              <p class="copyText">
                <span>{{secret}}</span>
                <img src="@/assets/copy2.png" class="copy" v-clipboard:copy="secret" v-clipboard:success="onSuccess" v-clipboard:error="onError">
              </p>
              <input type="text" class="googleCode" placeholder="请输入谷歌验证码" v-model="googleCode">
              <button class="submit" :disabled="btnDisabled" @click="submit">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const loginPwdReg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  import Header from '@/components/common/registerHeader'
  import md5 from 'js-md5'
  import { tokenHandler } from '.././../common/util'
import { log } from 'util'

  export default {
    data(){
      return {
        qrcode:'',
        secret:'',
        password1:'',
        password2:'',
        googleCode:'',
        btnDisabled:false
      }
    },
    mounted() {
      this.getQrcode()
    },
    methods:{
      getQrcode() {
        let p = this.$http.get('ajax_login/setPassword')
        p.then(res => {
          console.log(res,'222');
          
          let {result} = res
          this.qrcode = result.url
          this.secret = result.secret
        }).catch(error => {
          setTimeout(() => {
            this.$router.replace("/login")
          }, 1000)
          return false
        })
      },
      onSuccess() {
        this.$message({
            message:'复制成功',
            type:"success",
            duration:"2000"
        })
      },
      onError(){
          this.$message({
            message:'复制失败',
            duration:"2000"
        })
      },
      submit() {
        if (!this.password1 || !this.password2 || !this.googleCode) {
          this.$message.warning('请输入完整内容！')
          return
        }
        if (!loginPwdReg.test(this.password1) || !loginPwdReg.test(this.password2) ) {
        this.$message.warning('由6~16位，密码由大小写字母、数字组成')
        return
      }
      
        this.btnDisabled = true
        let p = this.$http.post('ajax_login/editPasswd',{
          trade_passwd:md5(this.password1),
          trade_confirm_passwd:md5(this.password2),
          google_auth_secret:this.secret,
          google_code:this.googleCode
        })
        p.then(res => {
          let {result} = res
           tokenHandler("token", result.token);
          localStorage.setItem('ms_username', result.user_name)
          this.$router.push('/')
        }).catch(error => {
          this.btnDisabled = false
          return false
        })
      }
    },
    components:{
      Header
    }
  }
</script>
<style lang="scss" scoped>
  .resetPsd {
    width:100%;
    height:100vh;
    background: #F0F3F7;
    background-repeat: no-repeat;
    background-position: top center;
    box-sizing: border-box;
    .mainBox {
      .innerBox {
        width:600px;
        padding:40px 0 20px;
        margin:0 auto;
        .mainTips {
          margin-bottom:20px;
          font-size:18px;
          color:#323232;
          font-weight:500;
        }
        .setBox {
          width:100%;
          height:670px;
          background-color: #FFF;
          border-radius: 8px;
          .boxTitle {
            width:100%;
            height:60px;
            line-height: 60px;
            border-bottom:1px solid #F0F0F0;
            color:#00C8A7;
            font-size:16px;
            font-weight: 500;
            text-indent: 40px;
            .titleTips {
              color:#969696;
              font-size:12px;
              margin-left:20px;
            }
          }
          .boxContent {
            padding:20px 20px 0;
            .passwordBox {
              width:100%;
              height:156px;
              margin-bottom:20px;
              padding:20px 63px 0;
              background-color: #F0F3F7;
              box-sizing: border-box;
              .inputBox {
                display: flex;
                display: -webkit-flex;
                align-items: center;
                margin-bottom:20px;
                span {
                  color:#646464;
                  font-size:14px;
                  margin-right:10px;
                }
                input {
                  flex:1;
                  height:48px;
                  padding-left:12px;
                  border:1px solid #D9D9D9;
                  outline: none;
                  border-radius: 4px;
                  &::placeholder {
                    color:#B4B4B4;
                  }
                }
              }
            }
            .googleBox {
              width:368px;
              margin:0 auto;
              text-align: center;
              .googleText {
                font-size:12px;
                color:#323232;
                margin-bottom:10px;
              }
              .qrCode {
                width:100px;
                height:100px;
                margin-bottom:10px;
              }
              .copyText {
                margin-bottom:20px;
                span {
                  color:#323232;
                  font-size:16px;
                }
                img {
                  width:14px;
                  height:14px;
                  margin-left:10px;
                  cursor: pointer;
                }
              }
              .googleCode {
                display: block;
                width:100%;
                height:48px;
                margin-bottom:20px; 
                padding-left:17px;
                background: #F4F8FF;
                border:none;
                border-radius: 4px;
                outline: none;
                font-size:14px;
                box-sizing: border-box;
                &::placeholder {
                  color:#C3CDDC;
                }
              }
              .submit {
                width:100%;
                height:48px;
                // background:linear-gradient(90deg,rgba(0,189,255,1) 0%,rgba(0,85,255,1) 100%);
                background: #2E415A;
                border-radius:4px;
                outline: none;
                border:none;
                color:#FFF;
                font-size:16px;
                cursor: pointer;
              }
            } 
          }
        }
      }
    }
  }
  @media screen and (max-width:600px) {
    .resetPsd {
      .mainBox{
        .innerBox {
          width:90%;
          .setBox {
            .boxTitle {
              text-indent: 15px;
            }
            .boxContent {
              padding:10px 10px 0;
              .passwordBox {
                padding:10px 10px 0;
              }
              .googleBox {
                width:100%;
              }
            }
          }
        } 
      }
    }
  }
</style>