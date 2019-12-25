/*
 * @Author: Diskfan 
 * @Content: 提币审核搜索条件
 * @Date: 2019-06-05 16:45:41 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-14 17:41:41
 */
<template>
    <div>
        <el-row :span="24">
            <el-col :span="8">
                <label for="createtime">
                    <span class="label">
                        创建时间:
                    </span>
                </label>
                <span class="prop">
                    <el-date-picker
                        id="createtime"
                        v-model="filter.create_time"
                        type="daterange"
                        align="right"
                        size="small"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </span>
            </el-col>
            <el-col :span="8">
                <span class="label">
                    币种：
                </span>
                <span class="prop">
                    <el-select size="mini" v-model="filter.coinName" clearable>
                        <el-option :value="null" label="全部"></el-option>
                        <el-option v-for="(item, key) in coins" :key="key" :value="item.coinName" :label="item.coinName"></el-option>
                    </el-select>
                </span>
            </el-col>
            <el-col :span="8">
                <span class="label">
                    订单状态：
                </span>
                <span class="prop">
                    <el-select v-model="filter.recdStatus" placeholder="选择订单状态" clearable size="small">
                        <el-option :value="null" label="全部"></el-option>
                        <el-option v-for="(item, key) in $config.recdStatus" :key="key" :value="key" :label="item"></el-option>
                    </el-select>
                </span>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="8">
                <span class="label">
                    地址：
                </span>
                <span class="prop">
                    <el-input v-model="filter.address" placeholder="搜索地址" size="mini"></el-input>
                </span>
            </el-col>
            <el-col :span="8">
                <span class="label">
                    订单号：
                </span>
                <span class="prop">
                    <el-input size="mini" v-model="filter.orderId" placeholder="搜索订单号"></el-input>
                </span>
            </el-col>
            <el-col>
                <span class="label">
                    TXID：
                </span>
                <span class="prop">
                    <el-input size="mini" v-model="filter.txId" placeholder="搜索TXID"></el-input>
                </span>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="8">
                <span class="label">
                    ID：
                </span>
                <span class="prop">
                    <el-input v-model="filter.id" placeholder="ID" size="mini"></el-input>
                </span>
            </el-col>
            <el-col :span="8">
                <span class="label">
                    账号：
                </span>
                <span class="prop">
                    <el-input size="mini" v-model="filter.account" placeholder="搜索账号"></el-input>
                </span>
            </el-col>
            <el-col :span="8">
                <span class="label">
                    类型：
                </span>
                <span class="prop">
                    <el-select v-model="filter.transType" placeholder="选择类型" clearable size="small">
                        <el-option value="" label="全部"></el-option>
                        <el-option v-for="(item, key) in $config.fundTypes" :key="key" :value="key" :label="item"></el-option>
                    </el-select>
                </span>
            </el-col>
        </el-row>
        <el-row>
            <el-button style="margin-left: 40px;" type="primary" @click="queryData" size="small">查询</el-button>
            <el-button style="margin-left: 40px;" type="primary" @click="clear" size="small">清空</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        coins: {
            default: [],
            type: Array
        }
    },
    data () {
        return {
            types: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
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
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            filter: {}
        }
    },
    methods: {
        queryData () {
            this.$emit('queryData', true)
        },
        clear () {
            this.$emit('resetFilter')
        },
        fetchFilter () {
            return this.filter
        }
    }
}
</script>
<style lang="less">
    
</style>
