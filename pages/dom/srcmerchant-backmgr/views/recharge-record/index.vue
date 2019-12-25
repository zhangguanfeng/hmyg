<template>
  <div class='recharge-record'>
    <!-- <el-collapse class="searchBox">
      <el-collapse-item title="查询条件">
      </el-collapse-item>
    </el-collapse> -->
    <el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini">
      <el-form-item label="添加时间:">
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
      <el-form-item label="订单状态:">
        <el-select v-model="filterForm.status" placeholder="选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提币地址:">
        <el-input placeholder="搜索地址" v-model="filterForm.widthdrawAddress" class="input-with-select"></el-input>
      </el-form-item>
      <el-form-item label="订单号:">
        <el-input placeholder="请输入订单号" v-model="filterForm.order_no" class="input-with-select"></el-input>
      </el-form-item>
      <el-form-item label="类型:">
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
      <el-button  type="primary" size="mini"
        @click.native="clearSearch">清空
      </el-button>
      <el-button  type="primary" size="mini" icon="el-icon-document" @click="exportExcel">导出</el-button>
    </el-form>
    <el-table :data="list" border style="width: 100%" height="auto" size="mini"
      :highlight-current-row="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      v-loading="tableLoading">
      <el-table-column prop="createTime" label="创建时间" width="150" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.CREATED_AT}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="80" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.FUNDS_TYPE == '100'?'充币':scope.row.FUNDS_TYPE == '500'?'提币':''}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="orderAmount" label="数量(USDT)" width="90" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.USDT_NUMBER}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="fee" label="手续费(USDT)" width="100" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.EXPENSE}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="finalAmount" label="到账数量(USDT)" width="115" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.FINAL_USDT_NUMBER}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="remark" label="审核备注" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.REMARK}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.STATUS}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="walletId" label="提币地址" min-width="120" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.WALLET_ID}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="billNo" label="订单号" min-width="120" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.BILL_NO}}</p>
        </div>
      </el-table-column>
      <!-- <el-table-column prop="tradeStatus" label="TXID" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.TXID}}</p>
        </div>
      </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filterForm.page"
      :page-size="filterForm.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total*1">
    </el-pagination>
  </div>
</template>
<script>
  import {dateFormat} from '@/common/util'
  export default {
    data() {
      return {
        filterForm:{
          date:"",
          status:"",
          widthdrawAddress:"",
          order_no:"",
          TXID:"",
          type:"",
          page:1,
          page_size:10,
        },
        date:[],
        statusOptions:[{
          value: '',
          label: '全部'
          },{
            value: '100',
            label: '平台审核中'
          },{
            value: '200',
            label: '转账中'
          },{
            value: '300',
            label: '转账成功'
          },{
            value: '400',
            label: '取消订单'
          },{
            value: '700',
            label: '退款中'
          },{
            value: '900',
            label: '订单作废'
          }
        ],
        typeOptions:[{ 
            value: '',
            label: '全部'
          },{ 
            value: '100',
            label: '充币'
          },{ 
            value: '500',
            label: '提币'
          }
        ],
        list:[],
        total:'',
        tableLoading:false
      }
    },
    computed:{
      orderStatus(){
        return this.filterForm.status
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      changeDate(){
        if (this.date) {
          this.filterForm.date = dateFormat(this.date[0].getTime()) +' - ' + dateFormat(this.date[1].getTime())
        } else {
          this.filterForm.date = ''
        }
      },
      getData() {
        this.tableLoading = true
        let p = this.$http.post('ajax_funds/chargeWater',this.filterForm)
        p.then(res => {
          this.tableLoading = false
          let {data,total_count} = res.result
          this.list = data
          this.total = total_count || 0
        }).catch(error => {
          this.tableLoading = false
          return false
        })
      },
      clearSearch() {
        this.date = []
        this.filterForm = {
          date:"",
          status:"",
          widthdrawAddress:"",
          order_no:"",
          TXID:"",
          type:"",
          page:1,
          page_size:10,
        }
        this.getData()
      },
      exportExcel() {
        let p = this.$http.post('/ajax_funds/exportChargeWater',this.filterForm)
        p.then(res => {
          const list = res.result.data;
          require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('../../assets/js/Export2Excel');
            const tHeader = ['订单号','USDT数量', '手续费', 'USDT到账数量', '商户','状态', '创建时间',];
            const filterVal = ['BILL_NO','USDT_NUMBER', 'EXPENSE', 'FINAL_USDT_NUMBER', 'USER_ID','STATUS', 'CREATED_AT'];
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '充提流水');
          })
        }).catch(error => {
          return false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      handleSizeChange(size) {
        this.filterForm.page_size = size
			  this.getData()
      },
      handleCurrentChange(page) {
        this.filterForm.page = page
        this.getData()
      },
    },
    watch:{
      orderStatus(newVal,oldVal) {
        this.filterForm.page = 1
        this.getData()
      }
    },
  }
</script>
<style lang='scss' scoped>
  .recharge-record {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding:10px;
    // .searchBox {
    //   /deep/ .el-collapse-item__header  {
    //     padding-left:10px;
    //   }
    // }
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
    .el-pagination {
      text-align: right;
    }
  }
</style>