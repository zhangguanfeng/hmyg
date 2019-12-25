<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="left">
        <div class="bg"></div>
        <div class="text">
          <div class="logo">
            <img src="/image/login-logo.png" alt="">
          </div>
          <!-- <p class="title">
            星球算力
          </p> -->
          <p class="content">
           参与阿尔法网络星球计划，将手中的数字货币寄存在网络星球中进行能量挖矿，寄存的数字货币越多，所占用带宽越多，享有的挖矿算力越高，产生的能量越多。
          </p>
          <ul>
            <li>
              <span>
                |
              </span>
              <span>
                星球在线居民
              </span>
              <span>
                {{updateData.online.toLocaleString()}}人    
              </span>
            </li>
            <li>
              <span>
                |
              </span>
              <span>
                居民量化总额
              </span>
              <span>
                {{updateData.usdt.toLocaleString()}} USDT
              </span>
            </li>
            <li>
              <span>
                |
              </span>
              <span>
                居民收益总额
              </span>
              <span>
                {{updateData.salpt.toLocaleString()}}SALPT
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="login-header">
          <img src="/image/login-header.png" alt="">
        </div>
        <el-form v-loading="loading" :model="form" ref="form" :rules="rules" label-width="0">
          <el-form-item label="" prop="username">
            <el-input placeholder="请输入您的邮箱" size="small" v-model="form.username" @input="form.username=form.username.toString().replace(/\s/g, '')">
            	<img style="margin-top: 9px;" slot="prefix" src="/image/email.png" alt="">
              <!--<div slot="prepend">
                <img src="/image/login-user.png" alt="">
                <el-select v-model="form.area_code" size="small">
                  <el-option
                    v-for="(item, key) in areaList"
                    :key="key"
                    :label="item"
                    :value="key"></el-option>
                </el-select>
              </div>-->
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" type="password" size="small" v-model="form.password" @input="form.password=form.password.toString().replace(/\s/g, '')">
              <img style="margin-top: 7px;" slot="prefix" src="/image/login-pwd.png" alt="">
            </el-input>
          </el-form-item>
          <el-form-item prop="google_code">
            <el-input size="small" v-model="form.google_code" @input="form.google_code=form.google_code.toString().replace(/\s/g, '')" placeholder="请输入google验证码">
              <img style="margin-top: 7px;" slot="prefix" src="/image/login-google.png" alt="">
            </el-input>
          </el-form-item>
          <p class="forg-pwd">
            <a href="javascripe: void 0" @click="tips">
              忘记密码？
            </a>
          </p>
          <el-form-item>
            <span class="login-btn" @click="login">
              登录
            </span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface IForm {
  area_code: string;
  username: string;
  password: string;
  google_code: string;
}

@Component
export default class Login extends Vue {
  protected areaList: any= [];
  protected updateData: any = {
    online: 0,
    usdt: 0,
    salpt: 0,
  };
  protected loading: boolean = false;
  protected alphaHome: {[key: string]: string} = {
    online: '',
    usdt: '',
    salpt: '',
  };
  protected form: IForm = {
    area_code: '+86',
    username: '',
    password: '',
    google_code: '',
  };
  protected disabled(): boolean {
    return false;
    // const { form } = this;
    // return !form.username || !form.password || !form.google_code;
  }
  protected readonly rules: any = {
    username: [{ required: true, message: '请输入邮箱' }],
    password: [{ required: true, message: '请输入密码' }],
    google_code: [{ required: true, message: '请输入Google验证码' }],
  };
  protected async getPhoneArea() {
    const res: any = await this.$http.post('home/getPhoneArea');
    if (res.code === 200) {
      this.areaList = res.result;
    } else {
      this.$message.error('获取区号列表失败');
    }
  }
  protected login() {
    // if (this.disabled) {
    //   this.$message.error('请检查表单后再提交');
    //   return;
    // }
    (this as any).$refs.form.validate(async (valid: boolean) => {
      if (valid) {
        const res: any = await this.$http.post('Home/login', {...this.form, password: this.$util.md5(this.form.password)});
        if (res.code === 200) {
          this.$store.commit('updateUserInfo', res.result);
          this.$util.token(res.result.token);
          this.$message.success('登录成功');
          setTimeout(() => {
            this.$router.replace('/');
          }, 500);
        } else {
          this.$message.error('登录失败');
        }
      }
    });
  }
  protected setUpdate(key: string, data: any, float?: boolean){
    const updateData = (this as any)[key];
    let timmer = setInterval(() => {
      const done: {[key: string]: boolean} = {};
      for (let i in updateData) {
        done[i] = !!done[i];
        updateData[i] = updateData[i] === '--' ? 0 : updateData[i];
        done[i] = Math.abs(updateData[i]) >= Math.abs(+data[i]);
        const add = float
          ? parseFloat((Math.random() * (+data[i] / 30)).toFixed(2))
          : parseInt(Math.random() * (+data[i] / 30) + '', 10);
        updateData[i] = done[i] ? +data[i] : updateData[i] + add;
      }
      if (!Object.values(done).filter((el: Boolean)=> el === false).length) {
        clearInterval(timmer);
      }
    }, 10);
  }
  protected tips() {
    this.$alert('请到AlphaWallet钱包APP找回密码');
  }
  protected async getAlphaHome() {
    const res: any = await this.$post('home/alpha');
    if (res.code === 200) {
      this.alphaHome = res.result;
      this.setUpdate('updateData', this.alphaHome);
    } else {
      // this.$message
    }
  }
  protected created() {
    this.$store.commit('updateUserInfo', null);
    this.$util.token(null);
    this.$util.userInfo(null);
    this.getPhoneArea();
    this.getAlphaHome();
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .login-wrap {
    @include wh();
    background: url(/image/login-bg.png);
    background-size: 100% 100%;
    @include flex();
    .form-wrap {
      width: 892px;
      height: 400px;
      @include flex(row);
      border-radius:10px;
      box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
      .left {
        width: 340px;
        height: 100%;
        user-select: none;
        background: url(/image/login-logo-bg.png);
        padding: 0 30px;
        // .bg {
        //   filter: blur(12px);
        //   width: 400px;
        //   height: 400px;
        //   background: #222;
        //   opacity: .56;
        //   position: absolute;
        // }
        .text {
          width: 360px;
          height: 400px;
          position: absolute;
          z-index: 1;
          line-height: 25px;
          .content {
            font-size: 12px;
            padding: 0 20px;
            color: #fff;
          }
          ul {
            padding: 0 20px;
            li {
              list-style: none;
              @include flex();
              text-align: left;
              color: #fff;
              margin-bottom: 6px;
              span:first-child {
                color: #39C6B4;
                margin-right: 10px;
              }
              span:not(:first-child) {
                width: calc(50% - 10px);
              }
              span:nth-child(2) {
                margin-right: 20px;
              }
            }
          }
        }
        .logo {
          width: 100%;
          margin-top: 30px;
          margin-bottom: 30px;
          // height: 70px;
          @include flex(row, center, flex-end);
          img {
            width: 110px;
          }
        }
        // .title {
        //   color: #fff;
        //   text-align: center;
        //   font-size: 20px;
        // }
      }
      .right {
        width: calc(100% - 470px);
        height: 100%;
        background: rgba(237,241,243,1);
        border-radius: 10px;
        padding: 30px 40px;
        // margin-left: 30px;
        .el-input-group__prepend {
          width: 120px;
          >div {
            >img {
              margin-right: 10px;
            }
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .forg-pwd {
          text-align: right;
          font-size: 12px;
          color: #888;
          margin-top: -15px;
          a {
            @include transition();
            cursor: pointer;
            user-select: none;
            color: #888;
            text-decoration: none;
            &:hover {
              color: $success;
            }
          }
        }
        .login-btn {
          margin-top: 30px;
          width: 100%;
          background: #39C6B4;
          color: #fff;
          user-select: none;
          cursor: pointer;
          @include flex();
          font-size: 17px;
          border-radius: 4px;
          @include transition();
          &:hover {
            opacity: .8;
          }
        }
        .login-btn.disabled {
          cursor: not-allowed;
          background: #888;
          color: #e3e3e3;
          &:hover {
            opacity: 1;
          }
        }
        .login-header {
          margin-bottom: 30px;
          img {
            height: 45px;
          }
        }
      }
    }
  }
</style>