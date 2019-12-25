/*
 * @Author: Diskfan 
 * @Conetnt: 订单列表
 * @Date: 2019-05-25 13:03:35 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-05-25 17:05:41
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
                            <el-col :span="8">
                                <el-form-item label="创建时间">
                                    <el-date-picker
                                        size="mini"
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
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="买卖类型" prop="direction">
                                    <el-select clearable size="mini" v-model="filter.direction">
                                        <el-option label="买" value="1"></el-option>
                                        <el-option label="卖" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
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
        <el-table :data="listData" :height="tableHeifgt" tooltip-effect="light">
            <span v-for="(item, key) in columns" :key= "key">
                <el-table-column
                    :render-header="rednerHeader"
                    show-overflow-tooltip
                    align="center"
                    :label="item.label"
                    :prop="item.prop"
                    v-show="item.show">
                </el-table-column>
            </span>
            <el-table-column :render-header="rednerHeader" label="状态" prop="state" align="center">
                <template slot-scope="scope">
                    <ShipmentStep :current="getCode(scope.row.state)" :list="list" />
                </template>
            </el-table-column>
        </el-table>
        <el-row style="text-align: center; line-height: 50px;">
            <el-button type="primary" size="small" :disabled="loadEnd || this.loadText ==  '加载中...'" @click="getData">{{loadEnd ? '无更多数据' : loadText}}</el-button>
        </el-row>
        
    </div>
</template>
<script>
import ShipmentStep from './../components/common/shipmentStep'
export default {
    data () {
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
        return {
            columns: [
                {
                    label: '用户id',
                    show: true,
                    prop: 'user_id'
                }, {
                    label: '流水号',
                    show: true,
                    prop: 'ref'
                }, {
                    label: '现金',
                    show: true,
                    prop: 'cash'
                }, {
                    label: '确认金额(￥)',
                    show: true,
                    prop: 'confirmed'
                }, {
                    label: '手续费(RMB)',
                    show: true,
                    prop: 'fee'
                }, {
                    label: 'USTD',
                    show: true,
                    prop: 'token'
                }, {
                    label: '来源',
                    show: true,
                    prop: 'from'
                }, {
                    label: '去处',
                    show: true,
                    prop: 'to'
                }, {
                    label: '创建时间',
                    show: true,
                    prop: 'created_at'
                }, {
                    label: '状态',
                    show: true,
                    prop: 'state'
                }
            ],
            list: codeList.map(el => el.text),
            tableHeifgt: 'calc(100% - 280px)',
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
        rednerHeader (h, { column }) {
            const items = []
            for (let i in this.columns) {
                items.push(h('el-dropdown-item', {}, [
                    h('input', {
                            attrs: {
                                type: 'checkbox',
                                checked: this.columns[i].show
                            },
                            style: {
                                marginRight: '10px',
                                verticalAlign: 'middle'
                            },
                            on: {
                                change: e => {
                                    this.columns[i].show = !this.columns[i].show
                                }
                        }
                }), this.columns[i].label]))
            }
            return h('el-dropdown', {
                props: {
                    'hide-on-click': false,
                   //  trigger: 'click'
                }
            }, [h('span', {
                attrs: {
                    class: 'el-dropdown-link'
                }
            }, [column.label, h('i', {
                attrs: {
                    class: 'el-icon-arrow-down el-icon--right'
                }
            })]), h('el-dropdown-menu', {
                slots: 'dropdown'
            }, items)])
        },
        clearFilter () {
            for (let i in this.filter) this.filter[i] = ''
        },
        handleChange (actives) {
            this.tableHeifgt = ['calc(100% - 95px)', 'calc(100% - 280px)'][actives.length]
        },
        getCode (code) {
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
        .el-collapse-item__header {
            font-size: 16px;
            text-indent: 1em;
            color: #666;
            font-weight: 600
        }
    }
</style>