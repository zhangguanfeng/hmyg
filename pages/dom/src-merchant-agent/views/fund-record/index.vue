<template>
  <div class='fund-record'>
    <!-- <el-collapse class="searchBox">
      <el-collapse-item title="查询条件">
      </el-collapse-item>
    </el-collapse> -->
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
        <el-input placeholder="请输入订单号" v-model="filterForm.order_no" class="input-with-select"></el-input>
      </el-form-item>
      <el-form-item label="类型:">
        <el-select v-model="filterForm.order_type" placeholder="选择类型">
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
      <el-table-column prop="billNo" label="订单号" width="200" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.SERIAL_NO}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="merchantNo" label="商户号"  align="center">
        <div slot-scope="scope">
          <p>{{scope.row.MERCHANT_NO}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="merchantName" label="商户名"  align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.MERCHANT_NAME}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="canUsed" label="可用资金变化" width="120" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.MERCHANT_SETTLE_USDT_NUMBER}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="balance" label="可用资余额" width="120" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.BALANCE_FA_USDT}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="type" label="订单类型" width="100" align="center" >
        <div slot-scope="scope">
          <p>{{scope.row.ORDER_TYPE}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="createTime" label="时间" width="170" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.CREATE_AT}}</p>
        </div>
      </el-table-column>
    </el-table>
    <div class="pages-footer">
				<div class='sumLine' v-if="footer">
					<p>{{footer[0].SERIAL_NO}}：{{footer[0].MERCHANT_SETTLE_USDT_NUMBER || 0}} </p>
					<p>{{footer[1].SERIAL_NO}}：{{footer[1].MERCHANT_SETTLE_USDT_NUMBER || 0}}</p>
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
    data() {
      return { 
        filterForm:{
          date:"",
          order_no:"",
          order_type:"",
          page:1,
          page_size:10,
        },
        date:[],
        typeOptions:[{ 
            value: '',
            label: '全部'
          },{ 
            value: '400',
            label: '兑入'
          },{ 
            value: '300',
            label: '兑出'
          },{ 
            value: '800',
            label: '充币'
          },{ 
            value: '500',
            label: '提币'
          },{ 
            value: '610',
            label: '转入'
          },{ 
            value: '620',
            label: '转出'
          }
        ],
        list:[],
        total:'',
        footer:'',
        tableLoading:false
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
        let p = this.$http.post('ajax_funds/capitalFlow',this.filterForm)
        p.then(res => {
          this.tableLoading = false
          let {rows,total_count,footer} = res.result
          this.list = rows
          this.footer = footer
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
          order_no:"",
          type:"",
          page:1,
          page_size:10,
        }
        this.getData()
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
            const tHeader = ['订单号','商户号', '商户名', '可用资金变化', '可用资余额','订单类型', '时间',];
            const filterVal = ['SERIAL_NO','MERCHANT_NO', 'MERCHANT_NAME', 'MERCHANT_SETTLE_USDT_NUMBER', 'BALANCE_FA_USDT','ORDER_TYPE', 'CREATE_AT'];
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '资金流水');
          })
        }).catch(error => {
          return false
        })
        
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    },
  }
</script>
<style lang='scss' scoped>
  .fund-record {
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