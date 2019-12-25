/**
*  Created by   阿紫
*  On  2019/11/22 0022
*  Content 收益明细
*/
<template>
    <div class='returns'>
        <el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini">
            <el-form-item label="创建时间:">
                <el-date-picker
                        v-model="date"
                        type="daterange"
                        align="left"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="changeDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="订单号:">
                <el-input placeholder="请输入订单号" v-model="filterForm.order_sn" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item label="商户名称:">
                <el-input placeholder="请输入商户名称" v-model="filterForm.mer_sn" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item label="订单类型:">
                <el-select v-model="filterForm.type" placeholder="选择类型">
                    <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button  type="primary" size="mini"
                        @click.native="getData">查询
            </el-button>
            <el-button  type="primary" size="mini" icon="el-icon-document" @click="exportExcel">导出</el-button>
        </el-form>
        <el-table :data="list" border style="width: 100%" height="auto" size="mini"
                  :highlight-current-row="true"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  v-loading="tableLoading">
            <el-table-column prop="merchantName" label="商户名"  align="center" >
                <div slot-scope="scope">
                    <p>{{scope.row.mer_sn}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="billNo" label="订单号"  align="center">
                <div slot-scope="scope">
                    <p>{{scope.row.node_no}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="type" label="订单类型"  align="center" >
                <div slot-scope="scope">
                    <p>{{scope.row.order_type == 100 ? '兑入':' 兑出'}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="type" label="价格"  align="center" >
                <div slot-scope="scope">
                    <p>{{scope.row.rate}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="type" label="USDT数量"  align="center" >
                <div slot-scope="scope">
                    <p>{{scope.row.usdt_number}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="type" label="收益比例" align="center" >
                <div slot-scope="scope">
                    <p>{{scope.row.commission_recyled}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="type" label="收益USDT"  align="center" >
                <div slot-scope="scope">
                    <p>{{scope.row.commission_usdt}}</p>
                </div>
            </el-table-column>
            <el-table-column prop="createTime" label="时间" align="center">
                <div slot-scope="scope">
                    <p>{{scope.row.created}}</p>
                </div>
            </el-table-column>
        </el-table>
        <div class="pages-footer">
            <div class='sumLine' v-if="footer">
                <p>{{footer[0].serial_no}}：{{footer[0].number || 0}} </p>
                <p>{{footer[1].serial_no}}：{{footer[1].number || 0}}</p>
                <p>{{footer[2].serial_no}}：{{footer[1].number || 0}}</p>
            </div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="filterForm.page"
                    :page-size="filterForm.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total*1">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {dateFormat} from '@/common/util'
    export default {
        name: "returns",
        data() {
            return {
                filterForm:{
                    start_date:"",
                    end_date:"",
                    order_sn:"",
                    type:"",
                    mer_sn:"",
                    page:1,
                    page_size:20,
                },
                date:[],
                typeOptions:[{
                    value: '300',
                    label: '全部'
                },{
                    value: '100',
                    label: '兑入'
                },{
                    value: '200',
                    label: '兑出'
                }],
                list:[],
                total:'',
                footer:'',
                tableLoading:false
            }
        },
        methods: {
            changeDate(){
                if (this.date) {
                    this.filterForm.start_date = dateFormat(this.date[0].getTime());
                    this.filterForm.end_date = dateFormat(this.date[1].getTime())
                } else {
                    this.filterForm.start_date = '';
                    this.filterForm.end_date = '';
                }
            },
            getData() {
                this.tableLoading = true
                let p = this.$http.post('ajax_funds/commission', this.filterForm)
                p.then(res => {
                    this.tableLoading = false
                    let {data,total_count,footer} = res.result
                    this.list = data
                    this.footer = footer
                    this.total = total_count || 0
                }).catch(error => {
                    this.tableLoading = false
                    return false
                })
            },
            handleSizeChange(size) {
                this.filterForm.page_size = size
                this.getData()
            },
            handleCurrentChange(page) {
                this.filterForm.page = page
                this.getData()
            },
            exportExcel() {
                let p = this.$http.post('/ajax_funds/exportCapitalFlow',this.filterForm)
                p.then(res => {
                    const list = res.result.data
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../assets/js/Export2Excel');
                        const tHeader = ['商户名','订单号', '订单类型', '价格', 'USDT数量','收益比例','收益USDT', '时间',];
                        const filterVal = ['mer_sn','node_no', 'order_type', 'rate', 'usdt_number','commission_recyled', 'commission_usdt', 'created'];
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '收益明细');
                    })
                }).catch(error => {
                    return false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
        },
        mounted() {
            this.getData()
        },
    };
</script>
<style lang="scss" scoped>
    .returns {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding:10px;
        .el-form {
            padding:20px;
            background: #FFF;
        }
        .el-table {
            overflow-y: auto;
            &::before{
                display: none;
            }
            /deep/ .el-table__header {
                thead {
                    tr {
                        th {
                            background: #F5F7FA;
                        }
                    }
                }
            }
            /deep/ .el-table__row.hover-row>td {
                background: #ecf5ff;
            }
        }
        .pages-footer {
            border:1px solid #ebeef5;
            padding:5px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #FFF;
            .sumLine {
                display: flex;
                p {
                    margin-right:20px;
                    font-size:13px;
                }
            }
        }
    }
</style>
