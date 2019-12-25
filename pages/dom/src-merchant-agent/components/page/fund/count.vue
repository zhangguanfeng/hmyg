/*
 * @Author: Diskfan 
 * @Content: 区块链监控步奏
 * @Date: 2019-06-05 14:03:05 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-18 10:29:19
 */
<template>
    <div class="count-wrap">
        <el-row class="count">
            <div :class="'stept ' + (open ? 'expand' : '')">
                <el-steps  @click.native.stop="clickHandle" align-center>
                    <el-step title="入金" icon="el-icon-sold-out">
                        <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'transfer_in')">
                            <p>笔数： {{count.transInNum}}</p>
                            <p>金额： {{count.transInAmount}}</p>
                            <p>当前未归拢： {{count.transInRemain}}</p>
                        </el-card>
                    </el-step>
                    <el-step title="冷钱包" icon="el-icon-s-finance">
                        <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'transfer_out')">
                            <p>笔数： {{count.coolToCfoNum}}</p>
                            <p>金额： {{count.coolToCfoAmount}}</p>
                            <p>当前余额： {{count.coolRemain}}</p>
                            <p>
                                地址：{{count.coolAddr}}
                                <a class="copy-link"
                                    v-clipboard:copy="count.coolAddr"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError"
                                    href="javascript:void 0">复制</a>
                            </p>
                        </el-card>
                    </el-step>
                    <el-step title="CFO" icon="el-icon-user-solid" >
                        <el-card slot="description" class="box-card" style="min-width: 180px" @click.native="$emit('switchTransType', 'cool_to_cfo')">
                            <p>
                                <el-row :span="24">
                                    <el-col :span="12">
                                        充币笔数： {{count.coolToCfoNum}}
                                    </el-col>
                                    <el-col :span="12">
                                        提币笔数： {{count.cfoOutNum}}
                                    </el-col>
                                </el-row>
                            </p>
                            <p>
                                <el-row :span="24">
                                    <el-col :span="12">
                                        充币金额： {{count.coolToCfoAmount}}
                                    </el-col>
                                    <el-col :span="12">
                                        提币金额：{{count.cfoOutAmount}}
                                    </el-col>
                                </el-row>
                            </p>
                            <p>
                                <el-row :span="24">
                                    <el-col :span="12">
                                        当前余额：{{count.cfoRemain}}
                                    </el-col>
                                </el-row>
                            </p>
                            <p v-if="extract !== false">
                                <font color="red">
                                    当前CFO余额={{extract.percent}}冷钱包余额，不足10%，还需充值 {{extract.amount}} {{currentCoin}}。
                                </font>
                            </p>
                            <p>
                                地址：{{count.cfoAddr}}
                                <a class="copy-link"
                                    v-clipboard:copy="count.cfoAddr"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError"
                                    href="javascript:void 0">复制</a>
                            </p>
                        </el-card>
                    </el-step>
                    <el-step title="手工提币" icon="el-icon-s-platform">
                        <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'manual')">
                            <p>笔数： {{count.manualOutNum}}</p>
                            <p>金额： {{count.manualOutAmount}}</p>
                            <p>总提币额：{{count.coolToCfoAmount}}</p>
                        </el-card>
                    </el-step>
                    <el-step title="手续费" icon="el-icon-price-tag">
                        <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'fee')">
                            <p>笔数： {{count.feeNum}}</p>
                            <p>金额： {{count.feeAmount}}</p>
                            <p>
                                地址：{{count.feeAddr}}
                                <a class="copy-link"
                                    v-clipboard:copy="count.feeAddr"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError"
                                    href="javascript:void 0">复制</a>
                            </p>
                        </el-card>
                    </el-step>
                </el-steps>
            </div>
        </el-row>
        <el-row class="series">
            <span class="label">
                净入：
            </span>
            <span class="props">
                {{count.earn}}&nbsp;&nbsp;USTD
            </span>
            <span class="label">
                理论余额：
            </span>
            <span class="props">
                {{count.preRemain}}
            </span>
            <span class="label">
                实际余额：
            </span>
            <span class="props">
                {{count.realRemain}}
            </span>
        </el-row>
        <el-dialog :visible.sync="visible" custom-class="center-dialog" title="详情">
            <div slot="footer">
                <el-button size="small" @click="visible=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { yesterdayUtc, dateFormat } from '@/common/util'
export default {
    props: {
        filter: {
            default: () => {},
            type: Object
        },
        currentCoin: {
            default: () => '',
            type: String
        }
    },
    data () {
        return {
            open: true,
            visible: false,
            count: {}
        }
    },
    computed: {
        extract () {
            if (typeof this.count.cfoRemain === 'undefined' || typeof this.count.coolToCfoAmount === 'undefined') return false
            const decs = this.count.cfoRemain * 100 / this.count.coolToCfoAmount
            let percent = '0%'
            let amount = '0'
            if (decs < 10 && !isNaN(decs)) {
                percent = decs.toFixed(2) + '%'
                amount = this.$config.percent * this.count.coolRemain - this.count.cfoRemain 
            }
            return {
                percent: percent,
                amount: amount
            }
        }
    },
    methods: {
        showDetail (refer) {
            this.visible = true
            switch (refer) {
                case 'service': // 手续费

                    break
                case 'extractCoin':

                    break
                case 'cfo':
                    
                    break
                case 'wallet': // 冷钱包

                    break
                case 'entry': // 入金

                    break
            }
        },
        clickHandle (e) {
            const target = e.target
            if (!/el-step__head|el-step__icon-inner|el-step__line|pointer/.test(target.className)) return
            this.open = !this.open
            this.$emit('hideCount', this.open)
        },
        onCopy () {
            this.$message.success('复制成功')
        },
        getData () {
            const params = {}
            const filter = this.filter
            if (filter.create_time) {
                params.startTime = dateFormat(filter.create_time[0], 'YYYY-MM-DD HH:mm:ss') // parseInt(+filter.create_time[0] / 1000, 10)
                params.endTime = dateFormat(filter.create_time[1], 'YYYY-MM-DD HH:mm:ss') // parseInt(+filter.create_time[1] / 1000, 10) + 86399
            } else {
                const ydUtc = yesterdayUtc()
                params.startTime = dateFormat(ydUtc * 1000, 'YYYY-MM-DD HH:mm:ss') // ydUtc
                params.endTime = dateFormat(ydUtc * 1000 + 86399000, 'YYYY-MM-DD HH:mm:ss') // ydUtc + 86399
            }
            if (filter.coinName) params.coinName = filter.coinName

            this.$http
                .get(`${this.$config.fundAddr}/backmgr/getDailySumInfo`, params)
                .then(({ code, result }) => {
                    if (code === 200) {
                        this.count = result
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '获取数据失败'
                        })
                    }
                })
                .catch(e => console.warn(e))
        },
        switchTransType() {
            console.log(222)
            
        },
        onError () {
            this.$message.error('浏览器不支持复制，请选择后右键复制')
        },

    }
}
</script>
<style lang="less">
    .monotoring {
        .copy-link {
            text-decoration: none;
        }
        .count-row {
            margin-top: 10px;
        }
        .count-wrap {
            .el-step__head {
                cursor: pointer;
            }
            .pointer {
                display: inline-block;
                width: 20px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                vertical-align: top;
                color: #07C4A8;
                font-weight: 900;
                margin-top: -3px;
                text-indent: .4em;
                cursor: pointer;
                user-select: none;
                -webkit-user-select: none;
                transition: .3s all;
            }
            .active {
                transform: rotate(90deg);
            }
            .stept {
                display: inline-block;
                width: calc(100% - 20px);
            }
            .label {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                margin-left: 10px;
                color: #555;
            }
            .props {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                margin-right: 30px;
                color: #555;
            }
            .count {
                min-width: 500px;
                min-height: 120px;
                .el-step__title.is-wait, .el-step__icon-inner[class*=el-icon]:not(.is-status){
                    transition: .3s all;
                }
                .el-step.is-center .el-step__description {
                    padding: 0 10px;
                    cursor: pointer;
                   .el-card {
                        &:hover {
                            box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
                        }
                        .el-card__body {
                            padding: 10px;
                        }
                    }
                }
                .expand {
                    .el-step__title.is-wait {
                        color: #424750;
                    }
                    .el-step__icon-inner[class*=el-icon]:not(.is-status) {
                        color: #07C4A8;
                    }
                }
                .el-step__icon.is-icon {
                    background: #F5F7F9;
                }
                .detail {
                    position: absolute;
                    float: right;
                    margin-top: -20px;
                    width: calc(90% - 25px);
                    text-align: right;
                    button {
                        padding: 2px 5px;
                    }
                }
                .el-steps {
                    .el-step {
                    }
                }
            }
        }
        
    }
</style>