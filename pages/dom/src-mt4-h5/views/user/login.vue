<template>
    <div class="login has-header">
        <h-navbar title='登录账号' @backPage="onClickLeft"/>
        <div class="wellcome">欢迎登录</div>
        <div class='contain'>
            <HInput
                class="input user-name"
                v-model="form.user_name"
                clearable
                type="number"
                @focus="inputKey='user_name'"
                @keyup.native='showError.user_name = !!!form.user_name'
                placeholder="手机号"
                :error-message="showError.user_name && '账号格式输入错误' || ''"
            >
                <div slot="prefix" class="area-code-prefix" @click.stop.prevent='showAreaList=!showAreaList'>
                    {{countryText}}
                </div>
            </HInput>
            <HInput
                class="input password"
                v-model="form.password"
                @keyup.native='showError.password = !!!form.password'
                clearable
                type='password'
                :error-message="showError.password && '请输入密码' || ''"
                placeholder="请输入密码"
            />
        </div>
        <!--        <div class="remember">-->
        <!--            <img src="@/assets/icon-pwd2.png" do_not_open="false" alt v-show="checkPwd" @click="checkPwd=!checkPwd"/>-->
        <!--            <img-->
        <!--                src="@/assets/icon-pwd1.png"-->
        <!--                do_not_open="false"-->
        <!--                v-show="!checkPwd"-->
        <!--                @click="checkPwd=!checkPwd"-->
        <!--            />-->
                    <div class="confirm" v-show="showTnCode">
                        <tnCode ref="tnCode" v-model="tnValue" :visible.sync='showTnCode' @change='tnCodeChange'></tnCode>
                    </div>
        <!--            <span @click="checkPwd=!checkPwd">记住密码</span>-->
        <!--        </div>-->
        <div class="login-btn">
            <van-button type="primary" @click="login" :disabled="disabled">登录</van-button>
        </div>
        <div class="forget-pwd">
            <a href="javascript: void(0)" @click="$router.push({name:'forgetPassword', query:{phone:form.user_name,area:areaCode}})">忘记密码？</a>
            <span class="none">还没有该账号?</span>
            <span class="action" @click="$router.push('/registed')">注册</span>
        </div>
        <van-overlay :show="showAreaList" @click="showAreaList=false"/>
        <transition name="slide-fade">
            <van-picker
                show-toolbar
                class="arealist-picker" v-show="showAreaList"
                ref='areaList'
                value-key='area_name'
                title="选择国家/地区"
                @click.native.stop="pickerClick"
                :columns="areaList"
                @cancel='showAreaList=false'
                @confirm="onSelectConfirm"
            />
        </transition>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';
  import HInput from '@/components/h-input.vue';
  import tnCode from '@/components/tn-code.vue';
  import {Toast} from 'vant';
  import md5 from 'md5';

  interface IForm {
    password: string,
    user_name: string;
  }

  @Component({components: {HInput, tnCode}})
  export default class Login extends Vue {
    protected form: IForm = {
      password: '',
      user_name: '',
    };
    protected showError: any = {
      password: false,
      user_name: false,
    };
    protected inputKey: string = '';
    protected tnValue: any = '';
    protected areaCode: number = 86;
    protected checkPwd: boolean = false;
    protected showTnCode: boolean = false;
    protected showAreaList: boolean = false;

    protected get disabled(): boolean {
      return !!(!this.form.user_name || !this.form.password);
    }

    protected get areaList(): any {
      return this.$store.state.areaList;
    }

    protected get countryText(): string {
      return `+${this.areaCode}`;
    }

    protected onClickLeft() {
      window.closeWebView();
      // const obj = {
      //   tabBarIndex: -1,
      // };
      // window.selectTabBar(obj);
    }

    // protected onInput(val: any) {
    //   const vm = (this as any);
    //   vm.form[this.inputKey] = vm.form[this.inputKey] + val.toString();
    // }

    // protected onDelete() {
    //   const vm = this as any;
    //   vm.form[this.inputKey] = vm.form[vm.inputKey].toString().substring(0, vm.form[vm.inputKey].length - 1);
    // }

    protected pickerClick(e: any | MouseEvent) {
      const value: string = e.target.innerHTML || '';
      for (const v of this.areaList) {
        if (v.area_name === value) {
          this.onSelectConfirm(v);
          break;
        }
      }
    }

    protected onSelectConfirm(item: { area_code: number, area_name: string }) {
      this.areaCode = item.area_code;
      this.showAreaList = false;
    }

    protected login() {
      const {user_name, password} = this.form;
      if (!user_name) {
        this.showError.user_name = true;
        return;
      }
      if (!password) {
        this.showError.password = true;
        return;
      }
      this.showTnCode = true;
      (this as any).$refs.tnCode.refresh();
    }

    protected tnCodeChange(tag: boolean) {
      if (tag) {
        const params = {
          area: this.areaCode,
          user_name: this.form.user_name,
          password: md5(this.form.password),
        };
        this.$http.post('/Home/login', params).then((res: any) => {
          const {data}: any = res;
          Toast('登录成功');
          this.$util.token(data.token);
          // localStorage.setItem('mtData', JSON.stringify(res.data));
          // localStorage.setItem('mtRem', Number(this.checkPwd) + ''); // 是否记住密码
          // localStorage.setItem('mtLoginFir', '1'); // 判断是否刚登陆进去
          // localStorage.setItem('mtMode', '1'); // 登陆默认账号为真实账号
          this.$store.commit('updateUserInfo', data);
          if (window.refreshData) {
            const obj = {
              t: res.data.token, // token
              d: res.data.demo_account, // 模拟账号
              l: res.data.live_account, // 真实账号
              m: 1, // 0模拟账号，1真实账号
            };
            window.refreshData(obj);
          }
          window.noticeAllWebViewController('loginIn');
          if (+(this as any).$route.query.jL === 1) {
            window.closeWebView();
          } else if (window.selectTabBar) {
            const obj = {
              tabBarIndex: -1,
            };
            this.$util.webViewName('home');
            window.selectTabBar(obj);
          } else {
            this.$router.push('/home');
          }
        });
      }
    }

    protected created() {
      this.$util.token(null);
      this.$store.commit('updateUserInfo', null);
      this.$store.dispatch('getAreaList');
      // setTimeout(() => {
      //   this.form.user_name = '18818772686';
      //   this.form.password = 'abc123456';
      // })
    }
  }
</script>
<style lang="scss">
    @import '@/styles/mixin.scss';

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .login {
        .arealist-picker {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            width: 100vw;
        }

        .area-code-prefix {
            width: 60px;
            text-align: center;
            position: relative;

            &:after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 1px;
                background: $border-color;
            }
        }

        .area-list-picker {
            position: fixed;
            left: 0;
            width: 100vw;
            height: auto;
            bottom: 0;
        }

        .wellcome {
            width: 192px;
            height: 67px;
            font-size: 26px;
            font-family: PingFang-SC-Heavy;
            font-weight: 800;
            color: #333333;
            line-height: 67px;
            margin-top: 10px;
            margin-left: 18px;
        }

        .contain {
            width: 90%;
            margin: 30px auto 0 auto;

            .input {
                margin-bottom: 20px;
            }
        }

        .remember {
            padding: 0 25px;
            display: flex;
            align-items: center;

            img {
                width: 15px;
                height: 15px;
            }

            span {
                font-size: 13px;
                color: #a6b1c1;
                padding-left: 5px;
            }
        }

        .login-btn {
            width: 315px;
            height: 50px;
            margin: 0 auto;
            margin: 0 auto;
            @include flex();
            margin-top: 40px;

            button {
                width: 100%;
                height: 50px;
                font-size: 18px;
                border-radius: 25px;
                background-color: $color;
                border: none;
            }

            .van-button--disabled {
                background: rgba(215, 233, 249, 1);
                border-color: rgba(215, 233, 249, 1);
            }
        }

        .confirm {
            width: 80%;
            margin: 0 3.5%;
            position: absolute;
        }

        .forget-pwd {
            width: 85%;
            margin: 20px auto 0 auto;;
            font-size: 14px;
            text-align: right;

            a {
                text-decoration: none;
                color: $color;
                font-weight: 600;
            }

            .none {
                color: #a6b1c1;
                margin-left: 8px;
            }

            .action {
                text-indent: 0.5em;
                color: $color;
                font-weight: 600;
                margin-left: 8px;
            }
        }
    }

    @include slide-fade();
</style>
