<template>
  <div class='transfer-record'>
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
      <el-table-column prop="transferAmount" label="转账金额" width="120" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.money}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="quantity" label="USDT数量" width="120" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.AMOUNT}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="type" label="转账类型" width="120" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.type_name}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="fee" label="手续费" width="80" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.rate}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="time" label="转账时间" min-width="100" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.ADD_TIME}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="fromAddress" label="From地址" min-width="150" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.FROM_ADDRESS}}</p>
        </div>
      </el-table-column>
      <el-table-column prop="toAddress" label="To地址" min-width="150" align="center">
        <div slot-scope="scope">
          <p>{{scope.row.TO_ADDRESS}}</p>
        </div>
      </el-table-column>
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
        date:[],
        filterForm:{
          date:"",
          status:'',
          page:1,
          page_size:10,
        },
        statusOptions:[{
          value: '',
          label: '全部'
          },{
            value: 'F',
            label: '转出'
          },{
            value: 'T',
            label: '转入'
          },{
            value: 'S',
            label: '待审核'
          },{
            value: 'N',
            label: '审核不通过'
          }
        ],
        list:[],
        total:'',
        tableLoading:false,
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
      getData() {
        this.tableLoading = true
        let p = this.$http.get('/AjaxFunds/transferWater',this.filterForm)
        p.then(res => {
          this.tableLoading = false
          let {result} = res
          this.list = result.rows
          this.total = result.total
        }).catch(error => {
          this.tableLoading = false
          return false
        })
      },
      changeDate() {
        if (this.date) {
          this.filterForm.date = dateFormat(this.date[0].getTime()) +' - ' + dateFormat(this.date[1].getTime())
        } else {
          this.filterForm.date = ''
        }
      },
      exportExcel() {
        let p = this.$http.post('/AjaxFunds/exportTransferWater',this.filterForm)
        p.then(res => {
          const list = res.result.rows;
          require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('../../assets/js/Export2Excel');
            const tHeader = ['转账金额','USDT数量', '转账类型', '手续费', '转账时间','Form地址', 'To地址',];
            const filterVal = ['money','AMOUNT', 'type_name', 'rate', 'ADD_TIME','FROM_ADDRESS', 'TO_ADDRESS'];
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '转账流水');
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
  .transfer-record {
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
  }
</style>