/*
 * @Author: Diskfan 
 * @Content: 区块链监控
 * @Date: 2019-06-05 11:19:17 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-18 11:23:25
 */
<template>
    <div class="monotoring">
        <el-row style="min-width: 800px; margin: 5px 0">
            日期：
            <el-date-picker
                size="mini"
                ref="datePicker"
                style="width: 250px"
                v-model="filter.create_time"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="datePickerChange"
                :picker-options="pickerOptions">
            </el-date-picker>
            &nbsp;&nbsp;币种：
            <el-select size="mini" class="select" v-model="filter.coinName" @change="coinNameChange">
                <el-option v-for="(item, key) in coins" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
            </el-select>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button size="small" @click="getData(true)" type="primary">查询</el-button>
        </el-row>
        <el-row class="count-row" :style="{maxHeight: rowHeight}">
            <Count ref="count" @hideCount="hideCount" :currentCoin="filter.coinName" :filter="filter" @switchTransType="switchTransType" />
        </el-row>
        <el-row class="action">
            <span class="title">
                操作记录
            </span>
            <span class="type">
                类型
                <el-select v-model="filter.transType" size="mini" clearable placeholder="选择类型" @change="transTypeChange">
                    <el-option :value="null" label="全部"></el-option>
                    <el-option v-for="(item, key) in $config.fundTypes" :key="key" :value="key" :label="item"></el-option>
                </el-select>
            </span>
            <!-- <el-button size="mini" type="primary" @click="addRecord">手动增加记录</el-button> -->
        </el-row>
        <div :style="{height: tableHeight, width: '100%', overflow: 'hidden'}">
            <Table :loading="loading" :data="data" :columns="columns" :selectConfig="selectConfig" size="mini" />
        </div>
        <div class="load-more">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="$config.pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total*1">
            </el-pagination>
        </div>
        <!-- <AddRecord @refresh="getData" :showDialog="showDialog" @showExtractCoin="showExtractCoin" /> -->
    </div>
</template>
<script>
import Count from './count'
import Table from '../../common/table.vue'
import Columns from '../../common/columns'
// import AddRecord from './addRecord'
import { yesterdayUtc } from './../../../common/util'
export default {
    name: 'monotoring',
    data () {
        return {
            data: [],
            tableHeight: 'calc(100% - 300px)',
            // showDialog: false,
            coins: [],
            defaultCoin: 'USDT',
            columns: Columns.monitoring,
            pageSize: 30,
            loading: false,
            pageNum: 1,
            total: 0,
            filter: {
                coinName: null,
                create_time: null,
                transType: null
            },
            selectConfig: {
                seleteStyle: {
                    color: '#909399'
                },
                selectIconStyle: {
                    color: '#07c4a8'
                }
            },
            rowHeight: 'auto',
            loadEnd: false,
            pickerOptions: {
                // 只能选择不能早于当前时间的日期
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '最近一日',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近两日',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近半年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    methods: {
        handleSizeChange (size) {
            this.pageSize = size
            this.getData()
        },
        handleCurrentChange (page) {
            this.pageNum = page
            this.getData()
        },
        getData (flag) {
            const filter = this.filter
            this.loading = true
            this.data = []
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            if (filter.create_time) {
                params.startTime = filter.create_time[0]
                params.endTime = filter.create_time[1]
            } else {
                // const ydutc = yesterdayUtc()
                // params.startTime = ydutc
                // params.endTime = ydutc + 86399
            }
            if (this.filter.feeCoinName) params.feeCoinName = filter.feeCoinName
            if (filter.coinName) params.coinName = filter.coinName
            if (filter.transType) params.transType = filter.transType

            this.$http.get(`${this.$config.fundAddr}/backmgr/getBlockTransList`, params)
                .then(({ code, result }) => {
                    if (code === 200) {
                        this.total = result.total
                        this.data = result.list
                        console.log(this.data)
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '获取列表失败'
                        })
                    }
                })
                .catch(e => {  })
                .finally(() => {
                    this.loading = false
                })
        },
        hideCount (refer) {
            this.rowHeight = refer ? '500px' : '30px'
            // 等待动画结束之后再计算表格高度
            setTimeout(() => {
                this.setHeight()
            }, 250)
        },
        setHeight () {
            const ch = document.body.clientHeight
            const ph = this.$el.querySelector('.monotoring .count-row').offsetHeight
            this.tableHeight = ch - ph - 225 + 'px'
        },
        allCoins () {
            this.$http
                .get(`${this.$config.fundAddr}/backmgr/coin/getAllCoinInfo`)
                .then(({ code, result }) => {
                    if (code === 200) {
                        let USDT = false
                        this.coins = result.filter(el => {
                            if (el.coinName === 'USDT' && el.sysStatus === 1) USDT = true
                            return el.sysStatus === 1
                        })
                        this.filter.coinName = USDT ? 'USDT' : this.coins.length ? this.coins[0].coinName : ''
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '查询失败'
                        })
                    }
                })
                .catch(e => console.warn(e))
                .finally(e => {
                    this.$refs.count.getData()
                })
        },
        coinNameChange () {
            this.$refs.count.getData()
            this.getData()
        },
        transTypeChange () {
            this.pageNum = 1
            this.filter.feeCoinName = this.filter.coinName === 'USDT' && this.filter.transType === 'fee' ? 'BTC' : ''
            this.getData(true)
        },
        // 子组件切换查询类型
        switchTransType(type) {
            this.filter.transType = type
            this.transTypeChange()
        },
        datePickerChange () {
            this.pageNum = 1
            this.getData()
        }
    },
    created () {
        this.getData(true)
    },
    mounted () {
        let handle = null
        this.allCoins()
        window.onresize = () => {
            clearTimeout(handle)
            handle = setTimeout(() => {
                this.setHeight()
            }, 100)
        }
        // 左侧菜单未关闭，导致高度计算不是正确值
        setTimeout(() => {
            window.onresize()
        }, 350)
    },
    components: { Count, Table, /* AddRecord */ }
}
</script>
<style lang="less">
    .monotoring {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .el-table {
            height: 100% !important;
        }
        .count-row {
            overflow: hidden;
            transition: 0.2s all cubic-bezier(0.22, 0.61, 0.36, 1);
            max-height: 500px;
        }
        .select {
            width: 120px;
        }
        .action {
            display: flex;
            min-width: 600px;
            width: 100%;
            .title {
                font-size: 22px;
                font-weight: 600;
                color: #515a6e;
                text-indent: 0.3em;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-user-select: none;
                margin-right: 30px;
            }
            .type {
                margin: 5px 20px;
                width: calc(100% - 320px)
            }
            button {
                padding: 0 5px;
                height: 25px;
            }
        }
    }
</style>
