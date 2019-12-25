/*
 * @Author: Diskfan 
 * @Conetnt: 订单列表
 * @Date: 2019-05-25 13:03:35 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-05 15:22:49
 */

<template>
    <div style="height: 100%; overflow: hidden" class="order-bill">
        <el-collapse v-model="activeNames" @change="handleChange" style="100%">
            <el-collapse-item title="查询条件" name="filter">
                <div style="width: 1000px">
                    <el-form :modal="filter" label-width="90px">
                        <el-row :span="24">
                            <el-col :span="8">
                                <el-form-item label="商户ID" prop="app_id">
                                    <el-input v-model="filter.app_id" size="mini" placeholder="请输入商户ID"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="用户ID" prop="app_user_id">
                                    <el-input v-model="filter.app_user_id" size="mini" placeholder="请输入用户ID"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="商铺用户ID" prop="agent_id">
                                    <el-input v-model="filter.agent_id" size="mini" placeholder="请输入商铺用户ID"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="12">
                                <el-form-item label="创建时间">
                                    <el-date-picker
                                        size="mini"
                                        ref="datePicker"
                                        style="width: 250px"
                                        v-model="filter.create_time"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                    &nbsp;
                                    <el-button class="near-day" size="mini" @click="nearDay(1)" type="warning">近1天</el-button>
                                    <el-button class="near-day" size="mini" @click="nearDay(2)" type="warning">近2天</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="买卖类型" prop="direction">
                                    <el-select clearable size="mini" v-model="filter.direction">
                                        <el-option label="买" value="1"></el-option>
                                        <el-option label="卖" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="状态" prop="state">
                                    <el-select clearable size="mini" v-model="filter.state" placeholder="请选择状态">
                                        <el-option v-for="(item, key) in codeList" :key="key" :value="item.value" :label="item.text"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row style=" padding-left: 50px;">
                        <el-button size="small" type="primary" @click="queryData">查询</el-button>
                        <el-button size="small" type="info" @click="clearFilter">清空</el-button>
                    </el-row>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div :style="{height:tableHeight}">
            <el-table :data="listData" :height="tableHeight" tooltip-effect="light">
                <el-table-column label="用户id" min-width="70px" show-overflow-tooltip prop="user_id" align="center"></el-table-column>
                <el-table-column label="流水号"  min-width="70px" show-overflow-tooltip prop="ref" align="center"></el-table-column>
                <el-table-column label="现金" prop="cash" show-overflow-tooltip min-width="70px" align="center"></el-table-column>
                <el-table-column label="确认金额(￥)" show-overflow-tooltip min-width="70px" prop="confirmed" align="center"></el-table-column>
                <el-table-column label="手续费(RMB)" show-overflow-tooltip min-width="70px" prop="fee" align="center"></el-table-column>
                <el-table-column label="USTD" show-overflow-tooltip min-width="70px" prop="token" align="center"></el-table-column>
                <el-table-column label="来源" show-overflow-tooltip  min-width="70px" prop="from" align="center"></el-table-column>
                <el-table-column label="去处" show-overflow-tooltip  min-width="70px" prop="to" align="center"></el-table-column>
                <el-table-column label="创建时间" show-overflow-tooltip min-width="70px" prop="created_at" align="center"></el-table-column>
                <el-table-column label="状态" prop="state" align="center">
                    <template slot-scope="scope">
                        <!-- {{getCode(scope.row.state)}} -->
                        <ShipmentStep :current="getCode(scope.row)" :list="list" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-row style="text-align: center; line-height: 50px;">
            <el-button type="primary" size="small" :disabled="loadEnd || this.loadText ==  '加载中...'" @click="getData">{{loadEnd ? '无更多数据' : loadText}}</el-button>
        </el-row>
        
    </div>
</template>
<script>
import ShipmentStep from './../components/common/shipmentStep'
export default {
    data () {
        console.log(this)
        const codeList = [
            {value: 1,text:' 创建',text2:'CREATED'},
            {value: 2,text:'等待服务商付款',text2:'USER_SET_GOAL'},
            {value: 4,text:'请放行',text2:'USER_PAID'},
            {value: 5,text:'部分放行',text2:'AGENT_APPROVED'},
            {value: 7,text:'用户投诉',text2:'USER_APPEAL'},
            {value: 3,text:'匹配',text2:'MATCHED'},
            {value: -1000,text:'已结束',text2:'FINISHED'},
            {value: -1,text:'已拒绝',text2:'AGENT_REJECTED'},
            {value: -2,text:'用户拒绝',text2:'USER_REJECTED'},
            {value: -3,text:'用户取消',text2:'USER_CANCELED'},
            {value: -4,text:'冻结',text2:'FROZEN'}
        ]
        const list = codeList.map(el => el.text)
        list.push('成功')
        return {
            list: list,
            tableHeight: 'calc(100% - 280px)',
            filter: {
                app_user_id: '',
                create_time: '',
                app_id: '',
                state: '',
                direction: '',
                agent_id: ''
            },
            activeNames: 'filter',
            loadEnd: false,
            listData: [],
            loadText: '载入更多',
            codeList: codeList,
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
        nearDay (day) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
            this.filter.create_time = [start, end]
        },
        clearFilter () {
            for (let i in this.filter) this.filter[i] = ''
        },
        handleChange (actives) {
            this.tableHeight = ['calc(100% - 95px)', 'calc(100% - 280px)'][actives.length]
        },
        getCode (row) {
            const code = row.state
            if (row.fee) return '成功'
            for (let c of this.codeList) {
                if (c.text2 === code) {
                    return c.text
                }
            }
            return code
        },
        queryData () {
            this.listData = []
            this.getData()
        },
        getData () {
            if (this.loadText ==  '加载中...' && this.listData.length) return
            const params = Object.assign({}, this.filter)
            if (params.create_time) {
                params.from_timestamp = parseInt(+params.create_time[0] / 1000, 10)
                params.to_timestamp = parseInt(+params.create_time[1] / 1000, 10) + 86399
            }
            delete params.create_time
            params.cursor_id = this.listData.length && ([]).concat(this.listData).pop().ref
            this.loadText =  '加载中...',
            this.$http.get("/hotline/shipment/list", params).then(({ code, data }) => {
                if (code === 200) {
                    this.loadEnd = !data.length
                    this.listData = this.listData.concat(data)
                } else {
                    this.$notify.error({
                        title: '提示',
                         message: '获取数据失败'
                    })
                }
            })
            .catch(e => {  })
            .finally(e => {
                this.loadText =  '载入更多'
            })
        }
    },
    mounted () {
        this.getData()
    },
    components: {
        ShipmentStep
    }
}
</script>
<style lang="less">
    .order-bill {
        .el-table {
            height: 100%;
            .el-table__body-wrapper {
                height: 100%;
                overflow: auto;
            }
        }
        .el-collapse-item__header {
            font-size: 16px;
            text-indent: 1em;
            color: #666;
            font-weight: 600
        }
        .near-day {
            padding: 4px 5px;
        }
    }
</style>