<template>
    <div>
        <div class="userMessage">
            <div class="account">
                <div class="telphone">
                    <span class="telphone-user">
                        <h-img src="/img/user/user.png" class="headPortrait"/>
                        <span class="+">{{ userInfo && userInfo.user_cell}}</span>
                    </span>
                    <van-icon name="comment" :dot="dot" @click="goDetails('message', false)"/>
                </div>
                <div class="property">
                    <div class="money">
                        <span class="text">总账户资产(USD)</span>
                        <h-img
                                src="/img/user/icon-eyes1.png"
                                alt
                                @click="phoneTrue=false"
                                v-show="phoneTrue"
                                class="accountShow"
                        />
                        <h-img
                                src="/img/user/icon-eyes2.png"
                                alt
                                @click="phoneTrue=true"
                                v-show="!phoneTrue"
                                class="accountShow"
                        />
                        <div class="assets">
                            <span v-show="phoneTrue">${{accountEquity}}</span>
                            <span v-show="!phoneTrue">* * * *</span>
                            <!--              <span>-->
                            <!--                <h-img src="/img/user/question.png" @click="query" />-->
                            <!--              </span>-->
                        </div>
                    </div>
                    <div class="changeMode virtualBtn" v-show="mode">
                        <span @click="changeMode">{{modeText}}</span>
                    </div>
                    <div class="changeMode realBtn" v-show="!mode">
                        <span @click="changeMode">{{modeText}}</span>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="transaction">
                <div class="ft-l" @click="goDetails('cash',true,{type: 'golden'})">
                    <h-img src="/img/user/icon-download.png" alt/>
                    <span>入金</span>
                </div>
                <div class="verticalLine"></div>
                <div class="ft-r" @click="goDetails('cash',true,{type: 'gold'})">
                    <h-img src="/img/user/icon-upload.png" alt/>
                    <span>出金</span>
                </div>
            </div>
        </div>
        <div class="home_bottom">
            <div class="home_list">
                <van-cell-group>
                    <van-cell title="推荐有奖" @click="goDetails('invite')" is-link icon="/img/user/financial_fill.png"/>
                    <van-cell
                            title="实名认证"
                            is-link
                            :value="authenticationValue"
                            icon="/img/user/headlines_fill.png"
                            @click="goDetails('authentication',true,{status})"
                    />
                    <van-cell @click="goDetails('card',true)" title="收款地址" is-link icon="/img/user/coordinates.png"/>
                </van-cell-group>
            </div>
            <div class="home_list" @click="goDetails('safe')">
                <van-cell title="安全设置" is-link icon="/img/user/my-li-5.png"/>
            </div>
        </div>
        <!-- 虚拟账户弹出层 -->
        <van-popup v-model="show">
            <p class="tipTitle">提示</p>
            <div class="tipText">当前账户为模拟账户，若查看此页面信息，需切换至真实账户</div>
            <div class="tipButton">
                <div class="consider" @click="consider">考虑下</div>
                <div class="switcher" @click="switchState">立即切换</div>
            </div>
        </van-popup>
    </div>
</template>
<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import {Cell, CellGroup, Popup} from 'vant';

    @Component({components: {}})
    export default class User extends Vue {
        protected phoneTrue: boolean = true;
        protected accountEquity: any = '0';
        protected modeText: any = '切换虚拟交易';
        protected mode: any = 1;
        protected show: boolean = false;
        protected dot: boolean = false;
        protected routerTo: string | null = null;
        protected authenticationValue: any = '未实名';
        protected status: number = 100; // 100  未认证,200 审核中,300 认证成功,400 审核失败

        // 切换交易类型
        protected changeMode() {
            let accountNum = '100';   // 100 真实  111 虚拟
            // 0:虚拟   1:真实
            if (this.mode === 1) {
                this.mode = 0;
                accountNum = '111';
                this.modeText = '切换真实交易';
            } else {
                this.mode = 1;
                accountNum = '100';
                this.modeText = '切换虚拟交易';
            }
            localStorage.setItem('cptAppAccount', accountNum)
            // 告诉原生--交易类型切换
            const obj = {
                t: this.$util.token(), //token
                d: this.userInfo.demo_account, // JSON.parse(localStorage.mtData).demo_account,//模拟账号
                l: this.userInfo.live_account, // JSON.parse(localStorage.mtData).live_account,//真实账号
                m: this.mode //0模拟账号，1真实账号
            }
            window.refreshData(obj)
            this.getEquity()
        }
        protected handleToAuthentication(){
        }
        protected get userInfo(): any {
            return this.$store.state.userInfo;
        }

        protected goDetails(name: any, isCheckAccoun: false, query = {}) {
            if (isCheckAccoun) {
                if (this.mode === 1) {
                    this.getOpenWbview(name, query);
                } else {
                    this.show = true;
                }
            } else {
                this.getOpenWbview(name, query);
            }
        }

        protected getOpenWbview(name: any, query = {}) {
            const obj = {
                name,
                path: name,
                query,
            };
            window.openWebView(obj);
        }

        // 切换真实账号时考虑
        protected consider() {
            this.show = false;
        }

        // 切换账号
        protected switchState() {
            this.show = false;
            this.mode = 1;
            this.modeText = '切换虚拟交易';
            const obj = {
                t: this.$util.token(), // token
                d: this.$store.state.userInfo.demo_account, // 模拟账号
                l: this.$store.state.userInfo.live_account, // 真实账号
                m: this.mode, // 0模拟账号，1真实账号
            };
            window.refreshData(obj);
        }

        // 获取是否有未读消息
        protected getNewNotice() {
            this.$http.post('CommonFun/getNewNotice', {}).then((res: any) => {
                this.dot = res.data;
            });
        }

        protected getAccountStatus() {
            this.$http.get('CommonFun/getAccountStatus').then((res: any) => {
                this.status = +res.account_status;
                switch (this.status) {
                    case 100:
                        this.authenticationValue = '未实名';
                        break;
                    case 200:
                        this.authenticationValue = '审核中';
                        break;
                    case 300:
                        this.authenticationValue = '认证成功';
                        break;
                    case 400:
                        this.authenticationValue = '审核失败';
                        break;
                }
            });
        }

        protected getEquity() {
            this.$http.post('CommonFun/getEquity').then((res: any) => {
                const {account_equity} = res.data;
                this.accountEquity = account_equity;
            });
        }

        protected activated() {
            window.onWebViewMessage = (eventType) => {
                setTimeout(() => {
                    const token = this.$util.token();
                    // if (eventType !== 'getUserInfo') {
                    //     return;
                    // }
                    if (!token && !/\w+-/.test(token + '')) {
                        const obj = {
                            name: "login",
                            path: "login",
                        };
                        window.openWebView(obj);
                        window.closeWebView();
                        return;
                    }
                    this.$store.dispatch('getUserInfo');
                    this.getAccountStatus();
                    this.getNewNotice();
                    this.getEquity();
                    // 进入页面时 获取账户状态
                    if (!localStorage.getItem('cptAppAccount') || localStorage.getItem('cptAppAccount') == '100') { // 真实
                        this.mode = 1;
                        this.modeText = '切换虚拟交易';
                    } else { // 虚拟
                        this.mode = 0;
                        this.modeText = '切换真实交易';
                    }
                }, 100);
            };
            window.onWebViewMessage('getUserInfo');
            window.onCloseWebViewMessage = window.onWebViewMessage;
            window.onWebViewMessage = window.onWebViewMessage;
        }
    }
</script>
<style lang="scss">
    .userMessage {
        width: 100%;
        height: 209px;
        background: url("/img/user/userBackground.png") no-repeat;

        .van-icon-comment {
            font-size: 22px;
        }

        .account {
            width: 100%;
            height: 153.5px;
            overflow: hidden;

            .telphone {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 36.5px;
                line-height: 36.5px;
                margin: 21px 20px 0 23px;
                color: #fff;

                img {
                    width: 13px;
                    height: 16px;
                }

                &-user {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .van-info--dot {
                    width: 6px;
                    height: 6px;
                    border: none;
                }
            }

            .property {
                display: flex;
                justify-content: space-between;

                .money {
                    margin-top: 10px;

                    .text {
                        color: rgba(255, 255, 255, 1);
                        font-size: 13px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 200;
                        margin-left: 23px;
                    }

                    .accountShow {
                        width: 16px;
                        height: 10px;
                        margin-left: 8px;
                    }

                    .assets {
                        font-size: 25px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: #fff;
                        margin-top: 4px;
                        margin-left: 23px;
                        display: flex;

                        img {
                            width: 14px;
                            height: 14px;
                            margin-left: 4px;
                            margin-bottom: 2px;
                            vertical-align: middle;
                        }
                    }
                }

                .changeMode {
                    width: 105px;
                    height: 30px;
                    border-radius: 15px 0 0 15px;
                    font-size: 14px;
                    font-family: PingFang-SC-Medium, PingFang-SC;
                    font-weight: 500;
                    line-height: 30px;
                    text-align: center;
                    margin-top: 23px;
                }

                .virtualBtn {
                    background: #ff9c26;
                    color: #fff;
                }

                .realBtn {
                    background: #fff;
                    color: $color;
                }
            }
        }

        .line {
            width: 100%;
            height: 1px;
            background: rgba(255, 255, 255, 1);
            opacity: 0.2;
        }

        .transaction {
            height: 54.5px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;

            .verticalLine {
                width: 1px;
                height: 34px;
                background: rgba(255, 255, 255, 1);
            }

            .ft-l {
                margin-left: 22px;
                display: flex;
                justify-content: center;
                align-items: baseline;
            }

            .ft-r {
                margin-right: 22px;
                display: flex;
                justify-content: center;
                align-items: baseline;
            }

            img {
                width: 23.5px;
                height: 21px;
                margin-right: 3px;
            }
        }
    }

    .home_bottom {
        height: calc(100vh - 209px);
        overflow: hidden;
        background: $bg-color;

        .home_list {
            margin-top: 15px;

            .van-cell.van-cell--clickable {
                height: 55px;

                .van-cell__title {
                    line-height: 35px;
                    margin-left: 18px;
                    font-size: 14px;
                    padding-left: 0 !important;
                    font-family: PingFang-SC-Medium, PingFang-SC;
                    font-weight: 500;
                    color: rgba(92, 92, 92, 1);
                    padding-left: 30px;
                    padding-right: 13.5px;
                }

                .van-cell__value {
                    line-height: 35px;
                }

                i {
                    img {
                        width: 20px;
                        height: 23.5px;
                    }
                }

                .van-icon.van-icon-arrow.van-cell__right-icon {
                    width: 14px;
                    height: 14px;
                    margin-top: 6px;
                }
            }
        }
    }

    .van-popup.van-popup--center {
        width: 270px;
        height: 175px;
        border-radius: 2px;

        .tipTitle {
            width: 238px;
            height: 19px;
            text-align: center;
            margin: 14px auto 0;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
        }

        .tipText {
            width: 238px;
            height: 38px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 19px;
            margin: 20px auto 30px;
        }

        .tipButton {
            display: flex;
            justify-content: space-between;
            width: 100%;
            border-top: 1px solid #dddddd;

            .consider {
                width: 50%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                border-right: 1px solid #dddddd;
            }

            .switcher {
                width: 50%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(0, 100, 255, 1);
            }
        }
    }
</style>
