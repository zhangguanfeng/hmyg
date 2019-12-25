<!--
 * @ Author: Diskfan
 * @ Create Time: 2019-10-26 14:10:55
 * @ Modified by: Your name
 * @ Modified time: 2019-11-28 16:51:51
 * @ Description: 修改手机号码
 -->

<template>
    <div class="modify-phone">
        <h-navbar title="修改手机号码"/>
        <HInput
            clearable
            type="number"
            v-model="form.imgCode"
            @focus.stop="inputKey='imgCode',inputFocus('imgCode')"
            @blur.stop="inputFocus('imgCode', $event, 1)"
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
            v-model="form.cell_code"
            @focus.stop="inputKey='cell_code',inputFocus('cell_code')"
            @blur.stop="inputFocus('cell_code', $event, 1)"
            :error-message='showError.cell_code'
            placeholder='旧手机验证码'>
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
            type="number"
            class="input user-name"
            v-model="form.user_cell"
            @focus="inputKey='user_cell'"
            @blur.stop="inputFocus('user_cell', $event, 1)"
            placeholder="新手机号"
            :error-message="showError.user_cell && '请输入新手机号' || ''"
        >
            <div slot="prefix" class="area-code-prefix" @click.stop.prevent='showAreaList=!showAreaList'>
                {{countryText}}
            </div>
        </HInput>
        <HInput
            type="number"
            clearable
            v-model="form.imgNewCode"
            @focus.stop="inputKey='imgNewCode',inputFocus('imgNewCode')"
            @blur.stop="inputFocus('imgNewCode', $event, 1)"
            :error-message='showError.imgNewCode'
            placeholder='图形验证码'>
            <div slot="append" style="margin-left: 15px;">
                <h-img
                    @click="imgNewCodeKey=+new Date()"
                    width="90" height="34"
                    :src="SERVER_PATH +`/Home/getCheckImg?img_code_key=${imgNewCodeKey}&wl_no=${wl_no}`"
                />
            </div>
        </HInput>
        <HInput
            type="number"
            clearable
            v-model="form.cell_code_new"
            @focus.stop="inputKey='cell_code_new',inputFocus('cell_code_new')"
            @blur.stop="inputFocus('cell_code_new', $event, 1)"
            :error-message='showError.cell_code_new'
            placeholder='新手机验证码'>
            <div slot="append" style="margin-left: 15px; display: flex">
                <span v-if='!codingNew' class="get-code" @click="sendNewPhoneCode">
                <van-loading v-if="sendPhoneCodeLoadingNew" type="spinner" color="#1989fa"/>
                <span v-else>获取验证码</span>
                </span>
                <span v-else class="waiting">
                    {{timeOutNew}}&nbsp;秒
                </span>
            </div>
        </HInput>
        <div class="login-btn">
            <van-button :loading='loading' type="primary" @click="confirm" :disabled="disabled">
                确定修改
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

  interface IForm {
    user_cell: string;//新手机号
    user_cell_zd: string;//新区号
    cell_code: string;//旧验证码
    cell_code_new: string;//新验证码
    imgCode: string;//旧图形验证码
    imgNewCode: string;//新图形验证码
  }

  @Component({components: {HInput}})
  export default class ModeifyPhone extends Vue {
    protected inputKey: string = '';
    protected loading: boolean = false;
    // 旧手机验证码
    protected sendPhoneCodeLoading: boolean = false;
    protected coding: boolean = false;
    protected timeOut: number = 60;
    protected timer: any = null;
    // 新手机验证码
    protected sendPhoneCodeLoadingNew: boolean = false;
    protected codingNew: boolean = false;
    protected timeOutNew: number = 60;
    protected timerNew: any = null;
    // 旧图形验证码
    protected imgCodeKey: number = +new Date();
    // 新图形验证码
    protected imgNewCodeKey: number = +new Date() + 111;
    // 区号
    protected showAreaList: boolean = false;
    protected areaCode: number = 86;

    protected get areaList(): any {
      return this.$store.state.areaList;
    }

    protected get SERVER_PATH(): string {
      return window.SERVER_PATH;
    }

    protected get wl_no(): string {
      return window.wl_no;
    }

    protected form = {
      user_cell: '', // 新手机号
      user_cell_zd: '86', // 新区号
      cell_code: '', // 旧验证码
      cell_code_new: '', // 新验证码
      imgCode: '', // 旧图形验证码
      imgNewCode: '', // 新图形验证码
    };
    protected showError = {
      user_cell: '', // 新手机号
      user_cell_zd: '', // 新区号
      cell_code: '', // 旧验证码
      cell_code_new: '', // 新验证码
      imgNewCode: '', // 新图形验证码
      imgCode: '', // 旧图形验证码
    };

    protected get disabled() {
      const form = this.form;
      return !!(!form.user_cell || !form.user_cell_zd || !form.cell_code || !form.cell_code_new);
    }

    protected get countryText(): string {
      return `+${this.areaCode}`;
    }

    protected onInput(val: any) {
      const vm = (this as any);
      vm.form[this.inputKey] = vm.form[this.inputKey] + val.toString();
    }

    protected onDelete() {
      const vm = this as any;
      vm.form[this.inputKey] = vm.form[vm.inputKey].toString().substring(0, vm.form[vm.inputKey].length - 1);
      vm.inputFocus(this.inputKey);
    }

    protected inputFocus(key: string) {
      const map: any = {
        user_cell: '手机号',
        user_cell_zd: '区号',
        cell_code: '旧手机验证码',
        cell_code_new: '新手机验证码',
        imgCode: '旧图形验证码',
        imgNewCode: '新图形验证码',
      };
      let form: any = this.form;
      const showError: any = this.showError;

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
        } else if (form[key].length > 16) {
          showError[key] = '密码长度不能大于16';
          return false;
        }
      }
      return true;
    }

    // 旧手机验证码
    protected sendPhoneCode() {
      if (this.sendPhoneCodeLoading) {
        return;
      }
      this.showErrorReset();
      if (!this.inputFocus('imgCode')) return;
      const params = {
        img_code_key: this.imgCodeKey,
        img_code: this.form.imgCode
      };
      this.sendPhoneCodeLoading = true;
      clearInterval(this.timer);
      this.timeOut = 60;
      this.$http.post('/CommonFun/sendSMSCheckCode', params).then((res: any) => {
        this.coding = true;
        Notify({type: 'success', message: '验证码发送成功'});
        this.timer = setInterval(() => {
          if (this.timeOut === 0) {
            clearInterval(this.timer);
            this.coding = false;
            return;
          }
          this.timeOut--;
        }, 1000);
      }).finally(() => {
        this.sendPhoneCodeLoading = false;
      });
    }

    // 新手机验证码
    protected sendNewPhoneCode() {
      if (this.sendPhoneCodeLoadingNew) {
        return;
      }
      this.showErrorReset();

      if (!this.inputFocus('user_cell') && !this.inputFocus('imgNewCode')) return;
      if (!this.inputFocus('user_cell')) return;
      if (!this.inputFocus('imgNewCode')) return;

      // 发送验证码
      const params = {
        user_cell: this.form.user_cell,
        img_code_key: this.imgNewCodeKey,
        user_cell_zd: this.areaCode,
        img_code: this.form.imgNewCode,
        type: 100, // 需要验证账户是否已经注册
      };
      this.sendPhoneCodeLoadingNew = true;
      clearInterval(this.timerNew);
      this.timeOutNew = 60;
      this.$http.post('/Home/sendSMSCheckCode', params).then((res: any) => {
        this.codingNew = true;
        Notify({type: 'success', message: '验证码发送成功'});
        this.timerNew = setInterval(() => {
          if (this.timeOutNew === 0) {
            clearInterval(this.timer);
            this.codingNew = false;
            return;
          }
          this.timeOutNew--;
        }, 1000);
      }).finally(() => {
        this.sendPhoneCodeLoadingNew = false;
      });
    }

    protected onSelectConfirm(item: { area_code: number, area_name: string }) {
      this.areaCode = item.area_code;
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


    protected confirm() {
      if (this.disabled || this.loading) {
        return;
      }
      const params = {
        user_cell: this.form.user_cell,
        user_cell_zd: this.areaCode,
        cell_code: this.form.cell_code,
        cell_code_new: this.form.cell_code_new,
      };
      this.$http.post('/Security/changeCell', params).then(res => {
        this.$toast('修改成功,请重新登录')
        setTimeout(() => {
          // localStorage.removeItem('mtData');
          // localStorage.removeItem('mtToken');
          // localStorage.removeItem('mtRem');
          // localStorage.removeItem('mtLoginFir');
          window.refreshData({
            t: '', // token
            d: '', // 模拟账号
            l: '', // 真实账号
            m: '', // 0模拟账号，1真实账号
          })
          const obj = {
            name: "login",
            path: "login",
          };
          window.openWebView(obj);
        }, 300)
      })
    }

    protected showErrorReset() {
      this.showError = {
        user_cell: '', // 新手机号
        user_cell_zd: '', // 新区号
        cell_code: '', // 旧验证码
        cell_code_new: '', // 新验证码
        imgNewCode: '', // 新图形验证码
        imgCode: '', // 旧图形验证码
      };
    }

    protected activated() {
      this.showErrorReset();
    }

    protected created() {
      this.$store.dispatch('getAreaList');
    }
  }
</script>
<style lang="scss" scoped>
    @import '@/styles/mixin.scss';

    .modify-phone {
        padding-top: 56px;
        padding-left: 20px;
        padding-right: 20px;
        height: calc(100vh -  56px);

        .area-code-prefix {
            width: 60px;
            text-align: center;
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
            }

            .van-button--disabled {
                background: rgba(215, 233, 249, 1);
                border-color: rgba(215, 233, 249, 1);
            }
        }
    }

</style>
