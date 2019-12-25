/*
 * @Author: Diskfan 
 * @Content: 提币审核
 * @Date: 2019-06-05 11:13:11 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-18 11:40:35
 */
 <template>
     <div class="examine">
        <div class="filter">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="查询条件" name="filter">
                    <Query ref="query" @queryData='getData' @resetFilter="resetFilter" :coins="coins"/>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="table-wrap" :style="{height: tableHeight, overflow: 'hidden'}">
            <!-- <Table @btnHandle="btnHandle" :loading="loading" :data="data" :options="options" :columns="columns" /> -->
            <Table ref="table" @btnHandle="btnHandle" headerKey="examine" :loading="loading" :data="data" :selectConfig="selectConfig" :operate="operate" :columns="columns" />
        </div>
        <div class="load-more" style="display: flex;">
            <div class="count">
                <span>
                    提币数量：{{count.amount}} USDT
                </span>
                <span>
                    手续费：{{count.fee}} USDT
                </span>
            </div>
            <el-pagination
                style="width: 50%; text-align: left"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="$config.pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <ReleaseDialog @hideDialog="hideDialog" :showDialog="showDialog" :item="item" :type="type" />
     </div>
 </template>
<script>
import Table from '../../common/table.vue'
import Query from './query'
import Columns from '../../common/columns'
import ReleaseDialog from './releaseDialog'
export default {
    name: 'examine',
    data () {
        const disabled = (row) => {
            return row.recdStatus === 3
        }
        return {
            data: [],
            loading: false,
            showDialog: false,
            type: 'auto',
            item: {},
            coins: [],
            columns: Columns.examine,
            selectConfig: {
                seleteStyle: {
                    color: '#909399'
                },
                selectIconStyle: {
                    color: '#07c4a8'
                }
            },
            operate: {
                label: '操作',
                prop: 'action',
                minWidth: '220px',
                align: 'center',
                emit: 'btnHandle',
                fixed: 'right',
                selectHeader: true,
                actions: [ // 自动放行 手动放行 拒绝 详情
                    {
                        name: '自动放行',
                        title: '自动放行',
                        type: 'primary',
                        action: 'auto',
                        disabled: disabled
                    },{
                        name: '手动放行',
                        title: '手动放行',
                        type: 'warning',
                        action: 'manual',
                        disabled: disabled
                    },{
                        name: '拒绝',
                        title: '拒绝',
                        type: 'primary',
                        action: 'reject',
                        disabled: disabled
                    }
                ]
            },
            tableHeight: 'calc(100% - 304px)',
            activeNames: 'filter',
            pageNum: 1,
            pageSize: 30,
            total: 0,
        }
    },
    computed: {
        count () {
            let count = 0
            let fee = 0
            this.data.forEach(el => {
                count += el.amount
                fee += el.fee
            })
            return {
                amount: count,
                fee: fee
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
        handleChange (active) {
            this.tableHeight = active.length ? 'calc(100% - 304px)' : 'calc(100% - 76px)'
        },
        btnHandle (action, row, key) {
            this.item = row
            switch (action) {
                case 'auto':
                    this.type = 'auto'
                    this.showDialog = true
                    break
                case 'manual':
                    this.type = 'manual'
                    this.showDialog = true
                    break
                case 'reject':
                    this.type = 'reject'
                    this.showDialog = true
                    break
            }
        },
        getData () {
            this.data = []
            this.loading = true
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            const filter = this.$refs.query && this.$refs.query.fetchFilter() || {}
            if (filter.create_time) {
                params.beginTime = parseInt(+filter.create_time[0] / 1000, 10)
                params.endTime = parseInt(+filter.create_time[1] / 1000, 10) + 86399
            }
            if (filter.coinName) params.coinName = filter.coinName
            if (filter.account) params.account = filter.account
            if (filter.id) params.recdId = filter.id
            if (filter.orderId) params.orderId = filter.orderId
            if (filter.txId) params.txId = filter.txId
            if (filter.recdStatus) params.recdStatus = filter.recdStatus
            if (filter.transType) params.transType = filter.transType
            if (filter.address) params.address = filter.address
            this.$http.get(`${this.$config.fundAddr}/backmgr/getWithdrawList`, params)
                .then(data => {
                    const { code, result: { blockWithdrawDtoPageInfo } } = data
                    if (code === 200) {
                        this.data = blockWithdrawDtoPageInfo.list
                            // .map(el => {
                            //     el.createTime = el
                            //                     .createTime
                            //                     .map((el, idx) => {
                            //                         el = el.toString()
                            //                         if (idx === 0) {
                            //                             return el
                            //                         } else {
                            //                             return el[1] ? el : '0' + el
                            //                         }
                            //                     })
                            //                     .join('')
                            //                     .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:')
                            //     })
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '获取列表失败'
                        })
                    }
                })
                .catch(e => console.warn(e))
                .finally(() => {
                    this.loading = false
                })
        },
        hideDialog (val) {
            this.showDialog = val
        },
        resetFilter () {
            this.$refs.query.filter = {}
        },
        getCoins () {
            this.$http
            .get(`${this.$config.fundAddr}/backmgr/coin/getAllCoinInfo`)
            .then(({ code, result }) => {
                if (code === 200) {
                    let USDT = false
                    this.coins = result.filter(el => {
                        if (el.coinName === 'USDT' && el.sysStatus === 1) USDT = true
                        return el.sysStatus === 1
                    })
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: '查询失败'
                    })
                }
            })
            .catch(e => console.warn(e))
        }
    },
    created () {
        this.getCoins()
        this.getData(true)
    },
    components: { Query, Table, ReleaseDialog }
}
</script>
<style lang="less">
.header-text(@indent: 1em) {
    font-size: 22px;
    font-weight: 600;
    color: #515a6e;
    text-indent: @indent;
    user-select: none;
    -webkit-user-select: none;
}
    .examine {
        width: 100%;
        height: 100%;
        .el-collapse-item__header {
            .header-text()
        }
        .count {
            width: 50%;
            font-size: 14px;
            color: #333;
            font-family: fantasy;
        }
        .el-table {
            height: 100% !important;
        }
    }
    .examine-header-dropdown {
        .el-checkbox {
            width: 100%;
            .el-checkbox__label {
                width: 100%;
                display: inline-block
            }
        }
    }
</style>
