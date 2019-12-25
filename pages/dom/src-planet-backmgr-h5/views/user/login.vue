<template>
  <div class="login-main has-header" @click="showCountry = false">
    <div class="login-img">
      <img src="/img/logo.png" alt />
    </div>
    <div class="login-con-box">
      <!-- <div class="login-con-bg"></div> -->
      <div class="login-con-del">
        <div class="del-logo">
          <img src="/img/loginIcon4.png" alt />
        </div>
        <!--<div class="del-item">
          <p class="fl country"></p>
          <div class="fl country-input" id="boxCountry">
            <span @click.stop="showList()">
              {{countryName}}
              <i></i>
            </span>
            <div class="country-box" v-show="showCountry">
              <p
                v-for="(item, key) in areaList"
                :key="key"
                @click="choseCountry(key, item)"
              >{{item+key}}</p>
            </div>
          </div>
        </div>-->
        <div class="del-item">
          <p class="fl passward"></p>
          <van-field v-model="form.username" @input="form.username=form.username.toString().replace(/\s/g, '')" placeholder="请输入您的邮箱" class="fl del-input" />
        </div>
        <div class="del-item">
          <p class="fl phone"></p>
          <div class="fl del-input">
            <input
              type="password"
              name
              id
              @input="form.password=form.password.toString().replace(/\s/g, '')"
              v-model="form.password"
              placeholder="请输入您的密码"
              class="passward"
            />
          </div>
          <!--<van-field v-model="form.password" placeholder="请输入您的密码" class="fl del-input" />-->
        </div>
        <!-- <div class="del-item">
          <p class="fl code"></p>
          <van-field
            v-model="form.google_code"
            @input="form.google_code=form.google_code.toString().replace(/[^\d]/g, '')"
            placeholder="请输入google验证码"
            class="fl del-input"
          />
        </div> -->
        <div class="forget-con"><span @click="tips">忘记密码？</span></div>
        <div class="transfer-btn" @click="login">提交</div>

      </div>
    </div>
    <div class="login-num">
      <div class="num-item">
        <em></em>
        <span>星球在线居民</span>
        <div>{{updateData.online.toLocaleString()}}人</div>
      </div>
      <div class="num-item">
        <em></em>
        <span>居民理财总额</span>
        <div>{{updateData.usdt.toLocaleString()}}USDT</div>
      </div>
      <div class="num-item">
        <em></em>
        <span>居民收益总额</span>
        <div>{{updateData.salpt.toLocaleString()}}SALPT</div>
      </div>
    </div>
    <div class="ps-box">
      <div class="login-ps">
        参与阿尔法星球理财计划，将手中的数字货<br />
        币寄存在星球中购买理财包，购买理财资产<br />
        包越多，所享的星球带宽越多，产生的理财收益就越多。
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Dialog } from "vant";
interface IForm {
  area_code: string;
  username: string;
  password: string;
}

@Component
export default class Login extends Vue {
  protected alphaHome: {[key: string]: string} = {
    online: '',
    usdt: '',
    salpt: '',
  };
  protected updateData: any = {
    online: '--',
    usdt: '--',
    salpt: '--',
  };
  protected areaList: any = [];
  protected pHeight: Number = 0;
  protected countryName: string = "中国大陆+86";
  protected form: IForm = {
    area_code: "+86",
    username: "wdfa@moakt.cc",
    password: "Abc123456",
    // google_code: ""
  };
  protected showCountry: boolean = false;

  protected login() {
    if (this.form.username == "") {
      this.$notify({ type: "danger", message: "邮箱不能为空" });
      return;
    }
    if (this.form.password == "") {
      this.$notify({ type: "danger", message: "密码不能为空" });
      return;
    }
    // if (this.form.google_code == "") {
    //   this.$notify({ type: "danger", message: "谷歌验证码不能为空" });
    //   return;
    // }
    const params = {
      area_code: this.form.area_code,
      username: this.form.username,
      password: this.$util.md5(this.form.password),
      // google_code: this.form.google_code
    };

    this.$post("/home/login", params).then((res: any) => {
      if (res.code === 200) {
        this.$store.commit("updateUserInfo", res.result);
        this.$util.token(res.result.token);
        this.$router.replace("/");
        // this.$notify({ type: "success", message: "登录成功" });
        // setTimeout(() => {
        //   this.$router.replace("/");
        // }, 300);
      } else {
        this.$notify({ type: "danger", message: "登录失败" });
      }
    });
  }

  protected tips() {
    Dialog.alert({
      title: "",
      message: "请到AlphaWallet钱包APP找回密码"
    }).then(() => {
      // on close
    });
  }

  protected showList() {
    this.showCountry = true;
  }

  protected choseCountry(n: string, e: string) {
    this.form.area_code = n;
    this.countryName = e + n;
    this.showCountry = false;
  }

  protected async getPhoneArea() {
    const res: any = await this.$http.post("home/getPhoneArea");
    if (res.code === 200) {
      this.areaList = res.result;
    } else {
      this.$notify({
        type: "danger",
        message: "获取区号列表失败"
      });
    }
  }

  protected async getAlphaHome() {
    const res: any = await this.$post("home/alpha");
    if (res.code === 200) {
      this.alphaHome = res.result;
			this.setUpdate('updateData', this.alphaHome);
    } else {
      // this.$message
    }
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
  protected created() {
    this.getPhoneArea();
    this.getAlphaHome();
    this.$util.token(null);
    this.$util.userInfo(null);
  }

  // protected mounted() {
  //   let _this = this;
  //   document.addEventListener("click", e => {
  //     var box: HTMLElement|null = document.getElementById("boxCountry");
  //     if (box && box.contains(e.target)) {
  //     } else {
  //       this.showCountry = false;
  //     }
  //   });
  // }
}
</script>
<style lang="scss">
.login-main {
  height: 100%;
  // .fl {
  //   float: left;
  // }
  // .fr {
  //   float: right;
  // }
  overflow-y: auto;
  background: url(/img/loginIcon2.png) no-repeat center;
  background-size: 100% 100%;
  .login-img {
    width: 76px;
    height: 80px;
    margin: 0 auto;
    padding: 16px 0;
    img {
      display: block;
      width: 76px;
    }
  }
  .login-con-box {
    position: relative;
    max-width: 371px;
    width: 100%;
    height: 353px;
    margin: 0 auto 40px;
    box-shadow: 0 0 30px #527b76;
  }
  .login-con-bg {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 371px;
    width: 100%;
    height: 380px;
    background: url(/img/loginIcon1.png) no-repeat center;
    background-size: 100% 100%;
    /*opacity: 0.35;*/
    z-index: 1;
  }
  .login-con-del {
    position: absolute;
    top: 12px;
    // left: 18px;
    // max-width: 330px;
    width: 100%;
    height: 368px;
    z-index: 2;
    background: url(/img/login-form-bg.png);
    .del-logo {
      padding: 14px 20px 70px;
      img {
        display: block;
        width: 183px;
        height: 29px;
      }
    }
    .del-item {
      display: flex;
      padding: 0 20px;
      height: 46px;
      .fl {
        width: 30px;
      }
      >div.fl {
        width: calc(100% - 30px);
      }
      > p {
        width: 38px;
        height: 46px;
      }
      p.country {
        background: url(/img/location.png) no-repeat center;
        background-size: 15px 19px;
      }
      p.phone {
        background: url(/img/loginIcon7.png) no-repeat center;
        background-size: 14px 17px;
      }
      p.passward {
        background: url(/img/email.png) no-repeat center;
        background-size: 16px 13px;
      }
      p.code {
        background: url(/img/loginIcon3.png) no-repeat center;
        background-size: 14px 15px;
      }
      .country-input {
        position: relative;
        width: 256px;
        height: 46px;
        padding: 0;
        text-align: left;
        line-height: 46px;
        background: none;
        color: #fff;
        border-bottom: 1px solid rgba(255,255,255,0.35);
        span {
          position: relative;
          float: left;
          padding-right: 30px;
          i {
            position: absolute;
            top: 22px;
            right: 5px;
            width: 6px;
            height: 4px;
            background: url(/img/loginIcon0.png) no-repeat center;
            background-size: 6px 4px;
          }
        }
        .country-box {
          position: absolute;
          top: 46px;
          left: 0;
          width: 116px;
          height: 150px;
          background: rgba(0, 0, 0, 0.58);
          z-index: 999;
          overflow: auto;
          p {
            font-size: 14px;
            color: #fff;
            padding-left: 14px;
            line-height: 38px;
          }
        }
      }
      .del-input {
        width: 256px;
        height: 46px;
        padding: 0;
        line-height: 46px;
        background: none;
        color: #fff;
        border-bottom: 1px solid rgba(255,255,255,0.35);
        input {
        	padding-left: 2%;
          color: #fff;
        }
        input.passward {
          display: block;
          width: 256px;
          height: 46px;
          line-height: 46px;
          background: none;
          color: #fff;
          outline: none;
          border: none;
        }
        .van-dropdown-menu__item {
          position: absolute;
          right: 16px;
          top: 8px;
        }
      }
    }
    .forget-con {
      padding: 5px 20px 20px 0;
      font-size: 14px;
      color: #999999;
      text-align: right;
    }
    .transfer-btn {
      width: 285px;
      height: 40px;
      margin: 0 auto;
      background: #39c6b4;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      border-radius: 5px;
    }


  }
  .ps-box {
	  /*padding-bottom: 20px;*/
	}
  .login-ps {
      width: 296px;
      margin: 14px auto 20px;
      font-size: 14px;
      color: #94abad;
    }
  .login-num {
    width: 260px;
    margin: 40px auto 0;
  }
  .num-item {
    height: 24px;
    em {
      float: left;
      width: 2px;
      height: 10px;
      margin: 4px 10px 0 0;
      background: #39c6b4;
    }
    span {
      float: left;
      margin-right: 38px;
      font-size: 14px;
      color: #bad8db;
    }
    div {
      float: left;
      font-size: 14px;
      color: #bad8db;
    }
  }
}
</style>
