<template>
    <div class="forget-password has-header" @click.stop="showAreaList=false">
        <h-navbar @backPage="onClickLeft" :title='title'/>
        <HInput
            class="input user-name"
            type="number"
            v-model="form.user_name"
            @focus="inputKey='user_name'"
            @blur.stop="inputFocus('user_name')"
            @keyup.native='showError.user_name = !!!form.user_name'
            placeholder="手机号"
            :error-message="showError.user_name && '请输入手机号' || ''"
        >
            <div slot="prefix" class="area-code-prefix" @click.stop.prevent='showAreaList=!showAreaList'>
                {{countryText}}
            </div>
        </HInput>
        <HInput
            clearable
            v-model="imgCode"
            type="number"
            @focus.stop="inputKey='imgCode',inputFocus('imgCode')"
            @blur.stop="inputFocus('imgCode')"
            :error-message='showError.imgCode'
            placeholder='图形验证码'>
            <div slot="append" style="margin-left: 15px;">
                <h-img
                    @click="imgCodeKey=+new Date()"
                    width="90" height="34"
                    :src="SERVER_PATH +`/Home/getCheckImg?img_code_key=${imgCodeKey}&wl_no=${wl_no}`"
                />
            </div>
        </HInput>
        <HInput
            clearable
            type="number"
            v-model="form.msg_code"
            @focus.stop="inputKey='msg_code',inputFocus('msg_code')"
            @blur.stop="inputFocus('msg_code')"
            :error-message='showError.msg_code'
            placeholder='手机验证码'>
            <div slot="append" style="margin-left: 15px; display: flex">
                <span v-if='!coding' class="get-code" @click="sendPhoneCode">
                <van-loading v-if="sendPhoneCodeLoading" type="spinner" color="#1989fa"/>
                <span v-else>获取验证码</span>
                </span>
                <span v-else class="waiting">
                    {{timeOut}}&nbsp;秒
                </span>
            </div>
        </HInput>
        <HInput
            clearable
            type='password'
            @focus.stop="inputFocus('password')"
            @blur.stop="inputFocus('password')"
            v-model="form.password"
            :error-message='showError.password'
            placeholder='请输入6-18位字母、数字组合的密码'>
        </HInput>
        <HInput
            clearable
            v-model="form.ib_no"
            placeholder='推荐人(选填)'>
        </HInput>
        <div class="check-box">
            <h-img :src="require('@/assets/isCheck.png')" v-if="isCheck" alt="" @click="isCheck=!isCheck"/>
            <h-img :src="require('@/assets/noCheck.png')" alt="" @click="isCheck=!isCheck" v-else/>
            <span class="text1" @click="isCheck=!isCheck">我已同意阅读</span>
            <!-- <span class="text2"> 《用户协议》 </span> -->
        </div>
        <div class="rule-list">
            <span @click="$router.push('/risk')">《风险披露与免责声明》</span>
            <span @click="$router.push('/CPTMarkets')">《CPT Markets流动性指南》</span>
        </div>
        <div class="login-btn">
            <van-button :loading='loading' type="primary" @click="confirm" :disabled="disabled">{{ this.isRegist ?
                '提交注册' : '设置完成 去登陆' }}
            </van-button>
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
  import {Notify, Toast} from 'vant';
  import md5 from 'md5';

  interface IForm {
    user_name: string;
    user_cell_zd: string;
    msg_code: string;
    password: string;
    newpassword: string;
    ib_no: string;
  }

  @Component({components: {HInput}})
  export default class ForgetPassword extends Vue {
    protected active: number = 0;
    protected isCheck: boolean = false;
    protected show: boolean = false;
    protected form = {
      user_name: '', // 手机号或邮箱
      user_cell_zd: '86', // 区号
      msg_code: '', // 验证码
      password: '', // 密码
      newpassword: '', // 确认新密码
      ib_no: '', // 推荐人
    };
    protected showError = {
      user_name: '',
      user_cell_zd: '',
      msg_code: '',
      password: '',
      newpassword: '',
      imgCode: '',
      ib_no: '',
    };
    protected loading: boolean = false;
    protected sendPhoneCodeLoading: boolean = false;
    protected coding: boolean = false;
    protected timeOut: number = 60;
    protected imgCode: string = '';
    protected showAreaList: boolean = false;
    protected imgCodeKey: number = +new Date();

    protected onClickLeft() {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您离新手赠金，仅剩1 cm的距离～',
        confirmButtonText: '继续开户',
        cancelButtonText: '放弃',
        cancelButtonColor: '#999999',
        confirmButtonColor: '#0064FF',
      }).then(() => {

      }).catch(() => {
        if (this.$route.query.isClose == 'true') {
          window.closeWebView();
        } else {
          this.$router.go(-1);
        }
      })
    }

    protected get areaList(): any {
      return this.$store.state.areaList;
    }

    protected get isRegist(): boolean {
      return /registed/.test(this.$route.fullPath);
    }

    protected get title(): string {
      return this.isRegist ? '注册账户' : '忘记密码';
    }

    protected get disabled() {
      const form = this.form;
      return !!(!form.user_name || !form.msg_code || !form.password) || !this.isCheck || !this.inputFocus('password');
    }

    protected timer: any = null;

    protected get SERVER_PATH(): string {
      return window.SERVER_PATH;
    }

    protected get wl_no(): string {
      return window.wl_no;
    }

    // protected onInput(val: any) {
    //   const vm = (this as any);
    //   vm.form[this.inputKey] = vm.form[this.inputKey] + val.toString();
    //   vm.inputFocus(this.inputKey);
    // }

    // protected onDelete() {
    //   const vm = this as any;
    //   vm.form[this.inputKey] = vm.form[vm.inputKey].toString().substring(0, vm.form[vm.inputKey].length - 1);
    //   vm.inputFocus(this.inputKey);
    // }

    protected confirm() {
      if (this.disabled || this.loading) {
        return;
      }
      const params = {
        user_name: this.form.user_name,
        msg_code: this.form.msg_code,
        password: md5(this.form.password),
        user_cell_zd: this.form.user_cell_zd,
        change_type: 100,
        ib_no: this.form.ib_no,
      };
      if (this.isRegist) {
        this.loading = true;
        this.$http.post('Home/register', params).then((res: any) => {
          Toast('注册成功');
          this.autoLogin();
        }).catch(() => {
          // 重置验证码
          this.imgCode = '';
          this.form.msg_code = '';
          this.imgCodeKey = +new Date();
        }).finally(() => {
          this.loading = false;
        });
      }
    }

    protected autoLogin() {
      const params = {
        area: this.form.user_cell_zd,
        user_name: this.form.user_name,
        password: md5(this.form.password),
      };
      this.$http.post('Home/login', params).then((res: any) => {
        const {data}: any = res;
        this.$util.token(res.data.token);
        this.$store.commit('updateUserInfo', res.data);
        // localStorage.setItem('mtData', JSON.stringify(res.data));
        // localStorage.setItem('mtLoginFir', '1'); // 判断是否刚登陆进去
        // localStorage.setItem('mtMode', '1'); // 登陆默认账号为真实账号
        if (window.refreshData) {
          const obj = {
            t: res.data.token, // token
            d: res.data.demo_account, // 模拟账号
            l: res.data.live_account, // 真实账号
            m: 1, // 0模拟账号，1真实账号
          };
          window.refreshData(obj);
        }
        if ((this as any).$route.query.jL === 1) {
          window.closeWebView();
        } else if (window.selectTabBar) {
          const obj = {
            tabBarIndex: -1,
          };
          window.selectTabBar(obj);
        } else {
          this.$router.push('/home');
        }
      });
    }

    protected inputFocus(key: string) {
      const map: any = {
        user_name: '手机号',
        user_cell_zd: '区号',
        msg_code: '验证码',
        password: '密码',
        newpassword: '新密码',
        imgCode: '图形验证码',
      };
      let form: any = this.form;
      const showError: any = this.showError;
      if (key === 'imgCode') {
        form = this;
      }
      if (form[key] === '') {
        showError[key] = `请输入${map[key]}`;
        return false;
      } else {
        showError[key] = '';
      }
      if (key === 'password') {
        if (form[key].length < 6) {
          showError[key] = '密码长度不能小于6';
          return false;
        } else if (form[key].length > 18) {
          showError[key] = '密码长度不能大于18';
          return false;
        } else if (!/(?=.*[a-z])(?=.*\d)[a-z\d]/i.test(form[key])) {
          showError[key] = '请输入6-18位字母、数字组合的密码';
          return false;
        }
      }
      return true;
    }

    protected showErrorReset() {
      this.showError = {
        user_name: '',
        user_cell_zd: '',
        msg_code: '',
        password: '',
        newpassword: '',
        imgCode: '',
        ib_no: '',
      };
    }

    protected sendPhoneCode() {
      if (this.sendPhoneCodeLoading) {
        return;
      }
      this.showErrorReset();
      if (!this.inputFocus('user_name') && !this.inputFocus('imgCode')) return;
      if (!this.inputFocus('user_name')) return;
      if (!this.inputFocus('imgCode')) return;
      // 发送邮件验证码
      const params = {
        user_cell: this.form.user_name,
        img_code_key: this.imgCodeKey,
        user_cell_zd: this.form.user_cell_zd,
        img_code: this.imgCode,
        type: 100, // 需要验证账户是否已经注册
      };
      this.sendPhoneCodeLoading = true;
      clearInterval(this.timer);
      this.timeOut = 60;
      this.$http.post('/Home/sendSMSCheckCode', params).then((res: any) => {
        Notify({type: 'success', message: '验证码发送成功'});
        this.coding = true;
        this.timer = setInterval(() => {
          if (this.timeOut === 0) {
            clearInterval(this.timer);
            this.coding = false;
            this.timeOut = 60;
            return;
          }
          this.timeOut--;
        }, 1000);
      }).finally(() => {
        this.sendPhoneCodeLoading = false;
      });
    }

    protected onSelectConfirm(item: { area_code: number, area_name: string }) {
      this.form.user_cell_zd = item.area_code + '';
      this.showAreaList = false;
    }

    protected pickerClick(e: any | MouseEvent) {
      const value: string = e.target.innerHTML || '';
      for (const v of this.areaList) {
        if (v.area_name === value) {
          this.onSelectConfirm(v);
          break;
        }
      }
    }

    protected get countryText(): string {
      for (const v of this.areaList) {
        if (v.area_code === +this.form.user_cell_zd) {
          return `+${v.area_code}`;
        }
      }
      return '';
    }

    protected activated() {
      clearInterval(this.timer);
      this.showErrorReset();
    }

    protected created() {
      this.$store.dispatch('getAreaList');
    }
  }
</script>
<style lang="scss">
    @import '@/styles/mixin.scss';

    .forget-password {
        @include flex(column, flex-start, flex-start);
        padding-left: 20px;
        padding-right: 20px;

        .check-box {
            display: flex;
            padding-left: 11px;
            align-items: center;

            img {
                width: 13px;
                display: block;
            }

            .text1 {
                color: #48576E;
                font-size: 14px;
                font-weight: 500;
                margin-right: 8px;
                padding-left: 8px;
            }

            .text2 {
                color: $color;
                font-size: 14px;
                font-weight: 500;
            }
        }

        .rule-list {
            margin-top: 4px;
            margin-bottom: 8px;
            padding-left: 15px;

            span {
                font-size: 13px;
                margin-right: 5px;
                color: #0164FE;
            }
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

        .arealist-picker {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            width: 100vw;
        }

        .get-code {
            width: 80px;
            padding: 5px 0px;
            @include flex();
            font-size: 13px;
            border: 1.5px solid $color;
            border-radius: 5px;
            color: $color;
            font-weight: 500;
            height: 20px;
        }

        .waiting {
            font-size: 13px;
            width: 50px;
            border: 2px solid #eee;
            height: 20px;
            border-radius: 5px;
            color: #999;
            padding: 5px 15px;
            text-align: center;
        }

        .login-btn {
            width: 315px;
            height: 50px;
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
    }

    @include slide-fade();
</style>
