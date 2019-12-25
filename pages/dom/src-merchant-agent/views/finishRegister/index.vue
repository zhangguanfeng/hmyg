<template>
    <div class="finishRegister">
        <Header></Header>
        <div class="content">
            <div class="registerBox">
                <h5 class="register-title">完善注册信息</h5>
                <div class="register-form">
                    <!-- <div class="email item">
                        <span><b>*</b>电子邮箱</span>
                        <input type="text" placeholder="请输入邮箱账号" v-model="email" disabled>
                    </div> -->
                    <div class="phone item">
                        <span><b>*</b>手&nbsp;&nbsp;机&nbsp;&nbsp;号</span>
                        <input type="text" placeholder="请输入联系方式" v-model="mobilePhone" disabled>
                    </div>
                    <div class="password item">
                        <span><b>*</b>登录密码</span>
                        <input type="password" placeholder="请设置登录密码" v-model="password">
                    </div>
                    <div class="confirmPsd item">
                        <span><b>*</b>确认密码</span>
                        <input type="password" placeholder="请确认登录密码" v-model="confirmPsd">
                    </div>
                    <button class="btn" @click="submit">提交</button>
                </div>
            </div>
        </div>
        <div class="popWin" v-show="showPop">
            <div class="popBox">
                <div class="popBox-title">
                    <img src="../../assets/success.png" alt="">
                    <span>注册信息提交成功！请耐心等待审核...</span>
                </div>
                <p class="popBox-text">您的注册信息已经成功提交，我们将在 1 个工作日内完成审核，审核结果将通过短信通知您</p>
                <button class="popBtn" @click='close'>关闭</button>
                <img src="../../assets/close.png" alt="" class="closeIcon" @click='showPop = false'>
            </div>
        </div>
    </div>
</template>
<script>

    import Header from '@/components/common/registerHeader'
    import VDistpicker from 'v-distpicker'
    import md5 from 'js-md5'
    import {GetQueryString} from '@/common/util'

    const loginPwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    export default {
        name:'finishRegister',
        data() {
            return {
                mobilePhone: '',
                password: '',
                confirmPsd: '',
                showPop: false
            }
        },
        methods: {
            submit() {
                if (!this.mobilePhone || !this.password || !this.confirmPsd) {
                    this.$message.warning('请填写完整表格！')
                    return
                }
                if (!loginPwdReg.test(this.password)) {
                    this.$message.warning('由6~16位，密码由大小写字母、数字组成')
                    return
                }
                // let token = localStorage.getItem('register_token')
                let p = this.$http.post('ajax_login/information', {
                    phone: this.mobilePhone,
                    passwd: md5(this.password),
                    confirm_passwd: md5(this.confirmPsd),
                })
                p.then(res => {
                    this.showPop = true
                }).catch(error => {
                    return false
                })
            },
            close() {
                this.showPop = false;
                this.$router.push('/login')
            },
            // getRegister() {
            //     this.$http.post('/ajax_login/register', {
            //         email: this.email
            //     }).then(res => {
            //         const {user_mobile} = res.result;
            //         this.mobilePhone = user_mobile || '';
            //     })
            // }
        },
        components: {
            Header,
            VDistpicker
        },
        mounted() {
            this.mobilePhone= sessionStorage.getItem('phone')
            // this.email = decodeURIComponent(GetQueryString('email'))
            // this.getRegister()
        }
    }
</script>
<style lang="scss" scoped>
    .finishRegister {
        width: 100%;
        height: 100vh;
        background: #F0F3F7;
        box-sizing: border-box;

        .content {
            width: 100%;
            padding-top: 40px;

            .registerBox {
                width: 600px;
                margin: 0 auto;
                background-color: #FFFFFF;
                border-radius: 8px;

                .register-title {
                    height: 60px;
                    padding-left: 40px;
                    line-height: 60px;
                    border-bottom: 1px solid #F0F0F0;
                    color: #00C8A7;
                    font-size: 16px;
                }

                .register-form {
                    padding: 40px 77px;
                    text-align: center;

                    .btn {
                        width: 289px;
                        height: 48px;
                        margin-top: 40px;
                        // background:linear-gradient(90deg,rgba(0,189,255,1) 0%,rgba(0,85,255,1) 100%);
                        background: #2E415A;
                        border-radius: 4px;
                        color: #FFF;
                        font-size: 16px;
                        outline: none;
                        border: none;
                        cursor: pointer;
                    }

                    .item {
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;

                        span {
                            width: 68px;
                            margin-right: 10px;
                            color: #646464;
                            font-size: 14px;
                            text-align: right;
                            font-weight: 500;

                            b {
                                margin-right: 2px;
                                color: #EF3024;
                            }
                        }

                        input {
                            flex: 1;
                            height: 48px;
                            border: 1px solid #D9D9D9;
                            padding-left: 12px;
                            border-radius: 4px;
                            font-size: 14px;
                            box-sizing: border-box;
                            background: #FFF;

                            &::placeholder {
                                color: #B4B4B4;
                            }
                        }

                        .distpicker-address-wrapper {
                            flex: 1;
                            display: flex;

                            /deep/ select {
                                height: 48px;
                                flex: 1;
                                max-width: 120px;
                                margin-right: 4px;
                                font-size: 14px;

                                &:last-of-type {
                                    margin-right: 0;
                                }

                                option {
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .popWin {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, .35);

            .popBox {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 434px;
                height: 264px;
                padding: 40px 40px 0;
                margin-left: -217px;
                margin-top: -132px;
                background: #FFF;
                box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                box-sizing: border-box;
                text-align: center;

                .popBox-title {
                    margin-bottom: 40px;
                    font-size: 16px;
                    display: flex;
                    align-items: center;

                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 10px;
                    }

                    span {
                        font-size: 16px;
                        font-weight: 500;
                        color: #000;
                    }
                }

                .popBox-text {
                    margin-bottom: 40px;
                    line-height: 24px;
                    color: #646464;
                    font-size: 14px;
                    text-align: left;
                }

                .popBtn {
                    width: 100px;
                    height: 32px;
                    background: transparent;
                    border-radius: 4px;
                    color: #969696;
                    font-size: 14px;
                    border: 1px solid #969696;
                    outline: none;
                    cursor: pointer;
                }

                .closeIcon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 14px;
                    height: 14px;
                    padding: 10px;
                    cursor: pointer;
                }
            }
        }
    }

    @media screen and (max-width: 600px) {
        .finishRegister {
            background-color: #FFF;

            .content {
                width: 100%;
                padding-top: 0;

                .registerBox {
                    width: 100%;
                    margin: 0 auto;

                    .register-title {
                        padding-left: 20px;
                    }

                    .register-form {
                        padding: 20px 10px;

                        .btn {
                            width: 100%;
                        }

                        .item {
                            .distpicker-address-wrapper {
                                /deep/ select {

                                    width: 33%;
                                    margin-right: 1%;
                                    padding: 0.5rem .2rem;

                                    &:last-of-type {
                                        margin-right: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .popWin {
                .popBox {
                    width: 90%;
                    max-width: 434px;
                    margin-left: -45%;
                    padding: 20px 20px 0;

                    .closeIcon {
                        top: 0;
                        right: 0;
                    }
                }
            }
        }
    }
</style>
