<template>
  <div class='rollInRecord-page'>
    <div class="main">
      <el-form :inline="true"  ref="filterForm" :model="filterForm" size="mini">
				<!-- <div > -->
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
					<el-form-item label="订单号:">
						<el-input placeholder="请输入订单号" v-model="filterForm.order_no" class="input-with-select"></el-input>
					</el-form-item>
					<el-button  type="primary" size="mini"
						@click.native="getData">查询
					</el-button>
          <el-button  type="primary" size="mini" icon="el-icon-document" @click="exportExcel">导出</el-button>
					<br>
					<div class="radioBox">
						<label >状态:</label>
						<el-radio-group v-model="filterForm.order_status">
							<el-radio :label="'ALL'">全部</el-radio>
              <el-radio :label="'RUNING_ORDER'">进行中</el-radio>
							<el-radio :label="'ACCEPTANT_STATUS'">已完成</el-radio>
							<el-radio :label="'APPEAL_STATUS'">申诉中</el-radio>
							<el-radio :label="'IS_CANCEL'">已取消</el-radio>
						</el-radio-group>
					</div>
				<!-- </div> -->
			</el-form>
      <el-table :data="list" border style="width: 100%" height="50px" size="mini"
        :highlight-current-row="true"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        v-loading="tableLoading">
        <el-table-column prop="type" label="类型" width="80" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.ORDER_TYPE}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="createTime" label="单号/添加时间" width="180" align="center">
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
        <el-table-column prop="quantity" label="USDT数量" width="110" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.USDT_NUMBER}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="fee" label="USDT手续费" width="100" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.HANDLING_FEE}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="realQuantity" label="USDT到账数量" width="110" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.MERCHANT_SETTLE_USDT_NUMBER}}</p>
					</div>
				</el-table-column>
        <el-table-column prop="tradeStatus" label="状态" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.STATUS}}</p>
					</div>
				</el-table-column>
				<el-table-column  label="操作" width="160" align="center" fixed="right">
					<div slot-scope="scope">
						<el-button  type="text" @click.native="openDetail(scope.row)">查看</el-button>
						<el-button v-show="scope.row.APPEAL== 200" type="text"  @click.native="ShowAppealWindow(scope.row)">申诉</el-button>
					</div>
				</el-table-column>
			</el-table>
      <div class="pages-footer">
				<div class='sumLine'>
					<p>
            <span>订单总额</span>
            <span>{{footer.AMOUNT || 0}}</span>
          </p>
					<p>
            <span>确定总额</span>
            <span>{{footer.FINAL_AMOUNT || 0}}</span>
          </p>
          <p>
            <span>总数</span>
            <span>{{footer.USDT_NUMBER || 0}}</span>
          </p>
          <p>
            <span>手续费共</span>
            <span>{{footer.HANDLING_FEE || 0}}</span>
          </p>
          <p>
            <span>到账总数</span>
            <span>{{footer.MERCHANT_SETTLE_USDT_NUMBER || 0}}</span>
          </p>
				</div>
        <el-pagination
            :small="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="filterForm.page"
            :page-size="filterForm.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total*1">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="查看详情"
      :visible.sync="showDetail"
      width="800px">
      <el-form :inline="true"  ref="detailForm" :model="detailForm" size="mini">
        <el-form-item label="单号:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.SERIAL_NO" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="金额:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.AMOUNT" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="到账金额:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.FINAL_AMOUNT" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="汇率:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.CHANGE_RATE" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="USDT:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.USDT_NUMBER" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户结算USDT:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.MERCHANT_SETTLE_USDT_NUMBER" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="承兑商结算USDT:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.ACCEPTANT_SETTLE_USDT_NUMBER" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="手续费:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.HANDLING_FEE" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否返佣:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.GOT_COMMISSION" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="返佣金额:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.COMMISSION_AMOUNT" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="利润:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.PROFIT" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.STATUS" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.CREATE_AT" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="IP:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.IP" class="input-with-select" disabled></el-input>
        </el-form-item>
      </el-form>
      <p class="title">用户信息</p>
      <el-form :inline="true"  ref="detailForm" :model="detailForm" size="mini">
        <el-form-item label="商户ID:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.MERCHANT_ID" class="input-with-select" disabled ></el-input>
        </el-form-item>
        <el-form-item label="商户码:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.MERCHANT_CODE" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="商户名称:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.MERCHANT_NAME" class="input-with-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="承兑商名称:" class="inputLine" label-width="110px">
          <el-input  v-model="detailForm.ACCEPTANT_NAME" class="input-with-select" disabled></el-input>
        </el-form-item>
      </el-form>
      <p class="title">承兑商银行卡信息</p>
      <el-input  v-model="detailForm.BANKCARD_NO" class="input-with-select" disabled></el-input>
    </el-dialog>
    <el-dialog
    title="申诉"
		:visible.sync="showAppeal"
    :close-on-click-modal="false"
		width="800px">
      <el-form>
				<el-form-item label="申诉理由：">
					<el-input type="textarea" v-model.trim="appealForm.remark"></el-input>
				</el-form-item>
			</el-form>
			<label for="">上传图片：</label>
			<el-upload
				:action="SERVER_PATH+'/ajax_trade/uploadimg'"
				:headers="headers"
				:limit='3'
				list-type="picture-card"
				:on-remove="handleRemove"
				:on-success='fileSuccess'
				:on-error='fileError'
				:on-preview="handlePictureCardPreview"
				:class="urls.length>2?'hideAdd':''"
				>
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<span slot="footer" class="dialog-footer">
				<el-button :disabled="btnDisabled" @click="showAppeal = false">取 消</el-button>
				<el-button type="success" :disabled="btnDisabled" @click="submitProof">提交</el-button>
			</span>
    </el-dialog>
  </div>
</template>
<script>
  import {dateFormat} from '@/common/util'
  export default {
    data() {
      return {
        date:[],
        filterForm:{
          applyTime:"",
          order_no: "",
          order_status: "RUNING_ORDER",
          page:1,
          page_size: 20,
        },
        total:'',
        list:[],
        footer:'',   //统计数据
        showDetail:false,
        showAppeal:false,
        dialogVisible:false,
        detailForm:'',
        appealForm:{
          id:'',
          key:'200_700',
          picture_img:'',
          remark:''
        },
        SERVER_PATH:window.SERVER_PATH,
        headers:{
          'token':localStorage.getItem('token'),
          'lang':'cn',
          'wl_no':'Alphapay'
        },
        urls:[],
        dialogImageUrl:'',
        btnDisabled:false,
        tableLoading:false,
      }
    },
    computed:{
      orderStatus(){
        return this.filterForm.order_status
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableLoading = true
        let p = this.$http.get('/ajax_trade/getInReportList',this.filterForm)
        p.then(res => {
          this.tableLoading = false
          let {data,footer,total_count} = res.result
          this.list = data
          this.footer = footer[0]
          this.total = total_count || 0
          this.getHeight()
        }).catch(error => {
          this.tableLoading = false
          return false
        })
      },
      //计算table中间高度
      getHeight(){
        // let tableHeight = document.getElementsByClassName('el-table')[0].offsetHeight
        // let headerHeight = document.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
        // this.$nextTick(()=>{
        //   let footerHeight = document.getElementsByClassName('el-table__footer-wrapper')[0].offsetHeight
        //   document.getElementsByClassName('el-table__body-wrapper')[0].style.height = tableHeight - headerHeight - footerHeight + 'px'
        // })
        document.getElementsByClassName('gutter')[0].style.display = 'block'
			  document.getElementsByClassName('gutter')[0].style.width = '17px'
      },
      //获取底部统计数据
      getSummaries(){
        let {AMOUNT,FINAL_AMOUNT,USDT_NUMBER,HANDLING_FEE,MERCHANT_SETTLE_USDT_NUMBER} = this.footer
        let sums = ['合计','',AMOUNT,FINAL_AMOUNT,'',USDT_NUMBER,HANDLING_FEE,MERCHANT_SETTLE_USDT_NUMBER];
        return sums
      },
      changeDate(){
        if (this.date) {
          this.filterForm.applyTime = dateFormat(this.date[0].getTime()) +' - ' + dateFormat(this.date[1].getTime())
        } else {
          this.filterForm.applyTime = ''
        }
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
        let p = this.$http.post('/ajax_trade/exportInReportList',this.filterForm)
        p.then(res => {
          const list = res.result.data
          require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('../../assets/js/Export2Excel');
            const tHeader = ['订单金额','汇率', 'USDT金额', '手续费(USDT)', '商户到账金额(USDT)','添加时间', '状态', '商户订单号','承兑商','商户','付款人','转账备注码','打款时间','确认时间'];
            const filterVal = ['AMOUNT','CHANGE_RATE', 'USDT_NUMBER', 'HANDLING_FEE', 'MERCHANT_SETTLE_USDT_NUMBER','CREATE_AT', 'STATUS', 'SERIAL_NO', 'ACCEPTANT_CODE','MERCHANT_CODE','PAY_USERNAME','TRANSFER_REMARK','NOTICE_TIME','CONFIRM_TIME'];
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '兑入记录');
          })
        }).catch(error => {
          return false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //查看详情
      openDetail(item) {
        this.detailForm = item
        this.showDetail = true
      },
      //申诉窗口
      ShowAppealWindow(item) {
        this.showAppeal = true
        this.appealForm.id = item.IN_RECORD_ID
      },
      handleRemove(file, fileList) {
        this.urls = []
        fileList.forEach(element => {
          this.urls.push(element.response.result)
        });
      },
      fileSuccess(esponse, file, fileList){
        if(esponse.code==200){
          this.urls.push(esponse.result)
        } else {
          this.$message.warning(esponse.msg)
        }
      },
      fileError(){
        this.$message.error('文件上传失败，请检查网络连接；');
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitProof(){
        this.btnDisabled = true
        this.appealForm.picture_img = this.urls.join(',')
        let p = this.$http.post('ajax_trade/appealInReport',this.appealForm)
        p.then(res => {
          this.$message.success(res.msg)
          this.showAppeal = false
          this.getData()
        }).catch(error => {
          this.btnDisabled = false
          return false
        })
      },
    },
    watch:{
      orderStatus(newVal,oldVal) {
        this.filterForm.page = 1
        this.getData()
      }
    }
  }
</script>
<style lang='scss' scoped>
  .rollInRecord-page {
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
          margin-top:8px;
					margin-right: 15px;
					&>label{
						font-size: 14px;
						color: #606266;
						padding-right: 12px;
					}
					/deep/ .el-radio{margin-right: 15px;}
					/deep/.el-radio__input{
						display: none;
					}
					/deep/.el-radio__label{
						color: #909399;
						padding-right: 10px;
						padding-left: 10px;
					}
					/deep/.el-radio+.el-radio{
						margin-left: 0;
					}
					/deep/.is-checked{
						background: #409EFF;
						border-radius: 2px;
						padding: 5px 10px;
						margin-right: 15px;
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
    .el-dialog {
      .inputLine {
        width:40%;
        margin-right:10%;
      }
      .title {
        padding:40px 0 20px;
        border-top:1px solid #ebebeb;
        font-size:18px;
      }
    }
    /deep/ .hideAdd{
			.el-upload--picture-card{display: none;}
		}
    .pages-footer {
			border:1px solid #ebeef5;
			padding:5px 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.sumLine {
				display: flex;
				p {
          display: flex;
          flex-direction: column;
					margin-right:15px;
					font-size:13px;
          span:first-of-type {
            font-size:12px;
            margin-bottom:3px;
            color:#999;
          }
				}
			}
		}
  }
</style>
