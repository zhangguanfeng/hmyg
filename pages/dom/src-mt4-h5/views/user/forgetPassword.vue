<template>
    <div class="forget-password has-header" @click.stop="showAreaList=false">
        <h-navbar :title='title'/>
        <HInput
                class="input user-name"
                v-model="userInfo.user_phone"
                clearable
                type="number"
                @focus="inputKey='user_name'"
                @blur.stop="inputFocus('user_name')"
                @keyup.native='showError.user_name = !!!form.user_name'
                placeholder="手机号"
                :error-message="showError.user_name && '请输入手机号' || ''"
        >
            <div slot="prefix" class="area-code-prefix">
                {{countryText}}
            </div>
        </HInput>
        <HInput
                clearable
                v-model="imgCode"
                type="number"
                @focus.stop="show=true,inputKey='imgCode',inputFocus('imgCode')"
                @blur.stop="inputFocus('imgCode')"
                :error-message='showError.imgCode'
                placeholder='验证码'>
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
                v-model="form.msg_code"
                @focus.stop="show=true,inputKey='msg_code',inputFocus('msg_code')"
                @blur.stop="inputFocus('msg_code')"
                :error-message='showError.msg_code'
                placeholder='手机验证码'>
            <div slot="append" style="margin-left: 15px; display: flex">
                  <span v-if='!coding' class="get-code" @click="sendPhoneCode">
                      <van-loading v-if="sendPhoneCodeLoading" type="spinner" color="#1989fa"/>
                      <span v-else>获取验证码</span>
                  </span>
                <span v-else class="waiting">{{timeOut}}&nbsp;秒</span>
            </div>
        </HInput>
        <HInput
                clearable
                type='password'
                @focus.stop="inputFocus('password')"
                @blur.stop="inputFocus('password')"
                v-model="form.password"
                :error-message='showError.password'
                placeholder='请输入6-16位登陆密码'>
        </HInput>
        <div class="login-btn">
            <van-button :loading='loading' type="primary" @click="confirm" :disabled="disabled">设置完成 去登陆</van-button>
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
    }

    @Component({components: {HInput}})
    export default class ForgetPassword extends Vue {
        protected active: number = 0;
        protected show: boolean = false;
        protected inputKey: string = '';
        protected title: string = '忘记密码';
        protected form = {
            user_name: '', // 手机号或邮箱
            user_cell_zd: '86', // 区号
            msg_code: '', // 验证码
            password: '', // 密码
            newpassword: '', // 确认新密码
        };
        protected showError = {
            user_name: '',
            user_cell_zd: '',
            msg_code: '',
            password: '',
            newpassword: '',
            imgCode: '',
        };
        protected loading: boolean = false;
        protected sendPhoneCodeLoading: boolean = false;
        protected coding: boolean = false;
        protected timeOut: number = 60;
        protected imgCode: string = '';
        protected showAreaList: boolean = false;
        protected imgCodeKey: number = +new Date();

        protected get areaList(): any {
            return this.$store.state.areaList;
        }

        protected get disabled() {
            const form = this.form;
            return !!(!form.user_name || !form.msg_code || !form.password) || !this.inputFocus('password');
        }

        protected get userInfo(): any {
            const info = this.$store.state.userInfo || { };
            this.form.user_name = info.user_phone;
            this.form.user_cell_zd = info.user_cell_zd;
            return info;
        }

        protected timer: any = null;

        protected get SERVER_PATH(): string {
            return window.SERVER_PATH;
        }

        protected get wl_no(): string {
            return window.wl_no;
        }

        protected onInput(val: any) {
            const vm = (this as any);
            let form = vm.form;
            if (this.inputKey === 'imgCode') {
                form = vm;
            }
            form[this.inputKey] = form[this.inputKey] + val.toString();
        }

        protected onDelete() {
            const vm = this as any;
            let form = vm.form;
            if (this.inputKey === 'imgCode') {
                form = vm;
            }
            form[this.inputKey] = form[vm.inputKey].toString().substring(0, vm.form[vm.inputKey].length - 1);
        }

        protected confirm() {
            if (this.disabled || this.loading) {
                return;
            }
            const params = {
                user_name: this.form.user_name,
                msg_code: this.form.msg_code,
                password: md5(this.form.password),
                change_type: 100,
            };
            this.loading = true;
            this.$http.post('/Home/resetPassword', params).then((res: any) => {
                Toast('重置密码成功');
                this.$router.push('/login');
            }).catch(() => {
                // 重置验证码
                this.imgCode = '';
                this.form.msg_code = '';
                this.imgCodeKey = +new Date();
            }).finally(() => {
                this.loading = false;
            })
        }

        protected inputFocus(key: string) {
            const map: any = {
                user_name: '手机号',
                user_cell_zd: '区号',
                msg_code: '验证码',
                password: '密码',
                newpassword: '新密码',
                imgCode: '图片验证码',
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
                } else if (form[key].length > 16) {
                    showError[key] = '密码长度不能大于16';
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
            // 发送短信验证码
            const params = {
                user_cell: this.form.user_name,
                img_code_key: this.imgCodeKey,
                user_cell_zd: this.form.user_cell_zd,
                img_code: this.imgCode,
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
            return this.form.user_cell_zd == undefined ? `+${this.$route.query.area}` : `+${this.form.user_cell_zd}`;
        }

        protected activated() {
            clearInterval(this.timer);
            this.showErrorReset();
            this.$store.dispatch('getUserInfo');
            this.$store.dispatch('getAreaList');
            if (this.$route.query.type == 'fix') {
                this.title = '修改密码'
            }
        }
    }
</script>
<style lang="scss">
    @import '@/styles/mixin.scss';

    .forget-password {
        @include flex(column, center, flex-start);
        width: 90vw;
        margin: 0 auto;

        .country {
            width: 100%;
            margin: 20px auto 16px auto;
            height: 45px;
            line-height: 45px;
            font-family: PingFangSC-Medium, PingFang SC;
            display: flex;
            border-bottom: 1px solid #E5E5E5;

            .text {
                width: 50%;
                color: #333333;
                font-weight: 500;
                font-size: 17px;
            }

            .value {
                width: 50%;
                text-align: right;
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
