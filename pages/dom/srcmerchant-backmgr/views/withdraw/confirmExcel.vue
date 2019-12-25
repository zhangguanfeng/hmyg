<template>
  <div class='confirmExcel'>
    <div class="main">
      <p class="title">文件内容</p>
      <el-button type="primary" size="medium" class="confirmBtn" @click="submitConfirm" :disabled="btnDisabled || !this.selectList.length">确认</el-button>
      <el-table :data="list" border style="width: 100%" height="auto" size="mini" ref="table" 
			  @selection-change="handleSelectionChange"
				:highlight-current-row="true"
				element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        v-loading="tableLoading">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="amount" label="金额" width="100" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.AMOUNT}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="name" label="收款人" width="120" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.BANK_USER_NAME}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="bankCard" label="卡号" min-width="180" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.BANK_NO}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="bankAddress" label="支行地址" min-width="150" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.BANK_ADDRESS}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="" label="商户号" width="80" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.MERCHANT_CODE}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="createTime" label="添加时间" min-width="150" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.CREATED_AT}}</p>
					</div>
				</el-table-column>
			</el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total*1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        page:1,
        rows:10,
        total:'',
        list:[],
        selectList:[],
        tableLoading:false,
        btnDisabled:false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableLoading = true
        let p = this.$http.get('/ajax_trade/cursorGrid',{
          page:this.page,
          rows:this.rows
        })
        p.then(res => {
          this.tableLoading = false
          let {result} = res
          this.list = result.data
          this.total = result.total
        }).catch(error => {
          this.tableLoading = false
          return false
        })
      },
      handleSizeChange(size) {
        this.rows = size
			  this.getData()
      },
      handleCurrentChange(page) {
        this.page = page
			  this.getData()
      },
      //选择行数
      handleSelectionChange(val) {
        this.selectList = []
        val.forEach(el => {
          this.selectList.push(el.CURSOR_ID)
        })
      },
      submitConfirm() {
        this.btnDisabled = true
        let orders = this.selectList.join(',')
        let p = this.$http.post('/ajax_trade/save_all_order',{
          s:orders
        })
        p.then(res => {
          this.$message.success(res.msg)
          this.$router.push('/importExcel')
        }).catch(error => {
          this.btnDisabled = false
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .confirmExcel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    .main{
			flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background: #fff;
			display: flex;
			flex-direction: column;
      .title {
        padding:20px;
        font-size:18px;
      }
      .confirmBtn {
        width:150px;
        margin-left:20px;
        margin-bottom:20px;
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
        padding:5px 10px;
        border:1px solid #ebeef5;
      }
    }
  }
</style>