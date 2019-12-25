<template>
    <div class='home-page'>
        <div class="main">
            <div class="title">
                <h3>尊敬的{{name}}代理商</h3>
                <p class="time">欢迎您！上次登录时间：{{dataList.login_time}} </p>
                <p class="exchange">
                    <span style="margin-right: 20px; color: #666;">当前交易价格:</span>
                    <span style="margin-right: 100px;">兑入价格：<b>{{dataList.in_rate}} </b> CNY</span>
                    <span>兑出价格：<b>{{dataList.out_rate}} </b> CNY</span>
                </p>
            </div>
            <div class="money">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="content">
                            <div class="btn">当前余额</div>
                            <div> {{dataList.balance}}{{dataList.currency}}</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content">
                            <div class="btn">今日收益</div>
                            <div> {{dataList.day_commission}}{{dataList.currency}}</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content">
                            <div class="btn">本月收益</div>
                            <div> {{dataList.month_commission}}{{dataList.currency}}</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content hidden">
                            <div class="btn">累计收益</div>
                            <div> {{dataList.all_commission}}{{dataList.currency}}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="steps">
                <h3>代理商如何赚取佣金？</h3>
                <div class="content">
                    <span class="flow"></span>
                    <el-steps :active="5" align-center>
                        <el-step class="bottom" title="联系商户业务并获得商户入驻邮箱"></el-step>
                        <el-step class="top" title="在商户管理界面通过邮件向商户发起入驻邀请"></el-step>
                        <el-step class="bottom" title="商户收到系统邮件并提交入驻资料"></el-step>
                        <el-step class="top" title="商户入驻成功，商户成交您即可获得佣金"></el-step>
                    </el-steps>
                    <i class="el-icon-position"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dataList: '',
                name: '',
                time: '2019-10-30 10：30：23'
            }
        },
        methods: {
            getData() {
                this.$http.get('ajax_home/index').then(res => {
                    let {result} = res
                    this.dataList = result
                }).catch(error => {
                    return false
                })
            }
        },
        mounted() {
            this.name = localStorage.getItem('ms_username')
            this.getData()
        },
    }
</script>
<style lang='scss' scoped>
    .home-page {
        .title {
            background: #fff;
            padding: 30px;

            .time {
                margin-top: 20px;
                padding-left: 40px;
                font-size: 14px;
            }

            .exchange {
                margin-top: 20px;
                padding-left: 40px;
                font-size: 16px;

                b {
                    color: #07c4a8;
                }
            }
        }

        .money {
            background: #fff;
            margin: 10px 0;
            padding: 50px;
            text-align: center;

            .content {
                border-right: 1px solid #eaeaea;
            }

            .content.hidden {
                border-right: none;
            }

            .btn {
                background: #07c4a8;
                width: 100px;
                height: 30px;
                line-height: 30px;
                border-radius: 4px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                margin: 0 auto 30px auto;
            }
        }

        .steps {
            margin-top: 20px;
            background: #fff;
            padding: 30px;

            h3 {
                margin-bottom: 30px;
            }

            .content {
                height: 300px;
                width: 1200px;
                margin: 0 auto;
                position: relative;

                .flow {
                    position: absolute;
                    top:47px;
                    left: 0;
                    background: #07c4a8;
                    font-size: 16px;
                    color: #fff;
                    display: inline-block;
                    width: 90px;
                    height: 90px;
                    line-height: 90px;
                    text-align: center;
                    border-radius: 50%;
                    margin-right: 115px;

                    &:after {
                        position: absolute;
                        content: '赚取流程';
                        width: 80px;
                        height: 80px;
                        line-height: 80px;
                        border: 2px solid #fff;
                        top: 3px;
                        left: 3px;
                        background: #07c4a8;
                        border-radius: 50%;
                    }

                    &:before {
                        position: absolute;
                        content: '';
                        right: -180px;
                        top: 44px;
                        width: 180px;
                        height: 2px;
                        background: #07c4a8;
                    }
                }

                .el-icon-position {
                    position: absolute;
                    top: 76px;
                    left: 845px;
                    font-size: 30px;
                    color: #07c4a8;
                    position: relative;
                    margin-left: 120px;
                    transform: rotate(45deg);

                    &:after {
                        content: '';
                        transform: rotate(-45deg);
                        position: absolute;
                        width: 223px;
                        height: 2px;
                        left: -179px;
                        top: 98px;
                        background: #07c4a8;
                    }
                }

                .el-steps {
                    display: inline-block;
                    position: absolute;
                    left: 157px;
                    top: 80px;

                    /deep/ .el-step {
                        position: relative;
                        width: 180px;
                    }

                    .bottom {
                        /deep/ .el-step__main {
                            width: 180px;
                            position: absolute;
                            top: 55px;

                            &:after {
                                position: absolute;
                                content: '';
                                top: -30px;
                                height: 30px;
                                left: 90px;
                                width: 1px;
                                background: #07c4a8;
                            }

                            .el-step__title {
                                width: 150px;
                                margin: 0 auto;
                                line-height: 30px;
                                padding: 10px;
                                border: 1px solid #07c4a8;
                            }
                        }
                    }

                    .top {
                        /deep/ .el-step__main {
                            width: 180px;
                            position: absolute;
                            bottom: 59px;

                            &:after {
                                position: absolute;
                                content: '';
                                bottom: -34px;
                                height: 30px;
                                left: 90px;
                                width: 1px;
                                background: #07c4a8;
                            }

                            .el-step__title {
                                width: 150px;
                                margin: 0 auto;
                                line-height: 30px;
                                padding: 10px;
                                border: 1px solid #07c4a8;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
