<template>
  <div class='auditAll'>
    <div class="main">
      <el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini">
				<!-- <div > -->
					<el-form-item label="订单号:">
						<el-input placeholder="请输入订单号" v-model="filterForm.order_no" class="input-with-select"></el-input>
					</el-form-item>
          <el-form-item label="谷歌验证码:">
						<el-input placeholder="请输入谷歌验证码" v-model="google_code" class="input-with-select"></el-input>
					</el-form-item>
					<el-button  type="primary" size="mini" icon="el-icon-search" @click.native="getData">搜索</el-button>
          <el-button  type="primary" size="mini" @click="submitAudit">确定</el-button>
					<br>
				<!-- </div> -->
			</el-form>
      <el-table :data="list" border style="width: 100%" height="50px" size="mini" ref="table">
        <el-table-column prop="type" label="序号" width="80" align="center" type="index">
					<div slot-scope="scope">
						<el-checkbox :checked="scope.row.checked"  @change="chooseIndex(scope.$index, scope.row)"></el-checkbox>
					</div>
				</el-table-column>
				<el-table-column prop="createTime" label="单号/添加时间" width="165" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.SERIAL_NO}}</p>
						<p>{{scope.row.CREATE_AT}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="80" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.AMOUNT}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="confirmOrderAmount" label="确认金额" width="80" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.FINAL_AMOUNT}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="changeRate" label="汇率" width="70" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.CHANGE_RATE}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="quantity" label="USDT数量" width="80" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.USDT_NUMBER}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="fee" label="USDT手续费" width="95" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.HANDLING_FEE}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="realQuantity" label="USDT到账数量" width="105" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.MERCHANT_SETTLE_USDT_NUMBER}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="tradeStatus" label="状态" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.STATUS}}</p>
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
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        filterForm:{
          applyTime:"",
          order_no: "",
          order_status: "100",
          page:1,
          page_size: 10,
        },
        google_code:'',
        total:'',
        list:[],
        footer:'',   //统计数据
        all_id:[]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let p = this.$http.post('/ajax_trade/getOutReportList',this.filterForm)
        p.then(res => {
          let {data,footer,total_count} = res.result
          this.list = data
          this.list.forEach(element => {
            element.checked = false
          })
          this.footer = footer[0]
          this.total = total_count || 0
        }).catch(error => {
          return false
        })
      },
      handleSizeChange (size) {
        this.filterForm.page_size = size
        this.getData()
      },
      handleCurrentChange (page) {
        this.filterForm.page = page
        this.getData()
      },
      chooseIndex(index,item) {
        item.checked = !item.checked
        if(item.checked) {
          this.all_id.push(item.OUT_RECORD_ID)
        } else {
          this.all_id.forEach((element,index) => {
            if (item.OUT_RECORD_ID == element) {
              this.all_id.splice(index,1)
            }
          })
        }
      },
      submitAudit() {
        if (!this.google_code || !this.all_id.length ) {
          this.$message.warning('请输入谷歌验证码并选择订单号!')
          return;
        }
        let all_id = this.all_id.join(',')
        let p =  this.$http.post('ajax_trade/checkAllOutReport',{
          google_code:this.google_code,
          all_id:all_id
        })
        p.then(res => {
          this.$message.success(res.msg)
          this.all_id = []
          this.getData()
        }).catch(error => {
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .auditAll {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    .main {
      flex: 1;
			overflow: hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			background: #fff;
			display: flex;
			flex-direction: column;
      form{
				padding: 20px;
				&>.radioBox{
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 40px;
					margin-right: 15px;
					margin-bottom: 15px;
					&>label{
						font-size: 14px;
						color: #606266;
						padding-right: 12px;
					}
					/deep/ .el-radio{margin-right: 0;}
					/deep/.el-radio__input{
						display: none;
					}
					/deep/.el-radio__label{
						color: #909399;
						padding-right: 10px;
						padding-left: 0;
					}
					/deep/.el-radio+.el-radio{
						margin-left: 0;
					}
					/deep/.is-checked{
						background: #409EFF;
						border-radius: 5px;
						padding: 3px 10px;
						margin-right: 10px;
						.el-radio__label{
							color: #fff;
							padding: 0;
						}
						
					}
				}
			}
      .el-table {
				overflow-y: auto;
				&::before{
					display: none;
				}
			}
    }
  }
</style>