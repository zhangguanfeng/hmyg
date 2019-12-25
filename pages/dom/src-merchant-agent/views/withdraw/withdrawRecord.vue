<template>
	<div class="withdrawRecord-page">
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
					<el-form-item label="客户姓名:">
						<el-input placeholder="请输入客户姓名" v-model="filterForm.bank_user_name" class="input-with-select"></el-input>
					</el-form-item>
					<el-button  type="primary" size="mini" @click.native="getData">查询</el-button>
					<el-button  type="primary" size="mini" @click.native="$router.push('/withdraw')">添加</el-button>
					<el-button  type="primary" size="mini" icon="el-icon-document" @click.native="exportExcel">导出</el-button>
					<el-button  type="primary" size="mini" icon="el-icon-document" @click.native="$router.push('/importExcel')">导入</el-button>
					<el-button  type="primary" size="mini" icon="el-icon-search" :disabled="filterForm.order_status != 100" @click.native="confirmAllAudit" >批量审核</el-button>
					<el-button  type="primary" size="mini" icon="el-icon-search" :disabled="filterForm.order_status != 'PAY'" @click.native="confirmAllGet">批量确认收款</el-button>
					<br>
					<div class="radioBox">
						<label >状态:</label>
						<el-radio-group v-model="filterForm.order_status">
							<el-radio :label="'ALL'">全部</el-radio>
							<el-radio :label="'100'">
								<el-badge  :is-dot="!!checkCnt" class="badgeImte">商户待审核</el-badge>
							</el-radio>
							<el-radio :label="'110'">平台待审核</el-radio>
							<el-radio :label="'NO_PAY'">未付款</el-radio>
							<el-radio :label="'PAY'">
								<el-badge  :is-dot='!!payCnt' class="badgeImte">已付款</el-badge>
							</el-radio>
							<el-radio :label="'ACCEPTANT_STATUS'">已完成</el-radio>
							<el-radio :label="'APPEAL_STATUS'">申诉中</el-radio>
							<el-radio :label="'IS_CANCEL'">已取消</el-radio>
						</el-radio-group>
					</div>
				<!-- </div> -->
			</el-form>
			<el-table :data="list" border style="width: 100%" height="auto" size="mini" ref="table"
			  @selection-change="handleSelectionChange"
				:highlight-current-row="true"
				element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        v-loading="tableLoading">
				<el-table-column type="selection" width="55" align="center" v-if="filterForm.order_status == 100 || filterForm.order_status == 'PAY'"></el-table-column>
				<el-table-column prop="serialNo" label="单号" width="165" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.SERIAL_NO}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="orderAmount" label="订单金额" width="80" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.AMOUNT}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="receiveName" label="收款人" width="80" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.BANK_USER_NAME}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="receiveAccount" label="收款账号" width="140" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.BANK_NO}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="bankAddress" label="支行地址" width="150" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.BANK_ADDRSSS}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="changeRate" label="汇率" width="70" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.CHANGE_RATE}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="fee" label="手续费" width="95" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.HANDLING_FEE}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="quantity" label="结算数量(USDT)" width="120" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.MERCHANT_SETTLE_USDT_NUMBER}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="status" label="状态" width="95" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.STATUS}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="pay" label="付款凭证" width="80" align="center" >
					<div slot-scope="scope">
						<el-button v-if="scope.row.PAY_IMG" type="text" @click="showPay(scope.row.OUT_RECORD_ID)">查看</el-button>
						<p v-else>--</p>
					</div>
				</el-table-column>
				<el-table-column prop="createTime" label="添加时间" width="155" align="center">
					<div slot-scope="scope">
						<p>{{scope.row.CREATE_AT}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="confirmTime" label="确认时间" width="155" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.CONFIRM_TIME}}</p>
					</div>
				</el-table-column>
				<el-table-column prop="confirmTime" label="附言" width="200" align="center" >
					<div slot-scope="scope">
						<p>{{scope.row.REMARK}}</p>
					</div>
				</el-table-column>
				<el-table-column  label="操作" width="140" align="center" fixed="right">
					<div slot-scope="scope">
						<!-- <el-button  type="text" @click.native=" detail(scope.row)">详情</el-button> -->
						<el-button v-show=" scope.row.APPEAL==100 "  type="text" @click.native="audit(scope.row)">审核</el-button>
						<el-button v-show=" scope.row.APPEAL==200 "  type="text" @click.native="ShowAppealWindon(scope.row)">申诉</el-button>
						<el-button v-show=" scope.row.APPEAL==200 "  type="text" @click.native="confirmGet(scope.row)">确认收款</el-button>
					</div>
				</el-table-column>
			</el-table>
			<div class="pages-footer">
				<div class='sumLine'>
					<p>订单总额：{{footer.AMOUNT || 0}} </p>
					<p>结算总数量：{{footer.MERCHANT_SETTLE_USDT_NUMBER || 0}}</p>
				</div>
				<el-pagination
					:small="true"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="filterForm.pageNum"
					:page-size="filterForm.page_size"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total*1">
				</el-pagination>
			</div>
		</div>

		<el-dialog
			title="查看详情"
			:visible.sync="showDetail"
			width="500">
			<el-form   ref="currItem" :model="currItem">
				<el-form-item label="状态:"  label-width="100px">
					<el-input :value="currItem.STATUS"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="兑出商户:"  label-width="100px">
					<el-input  :value="currItem.MERCHANT_CODE"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="兑出金额:"  label-width="100px">
					<el-input  :value="currItem.AMOUNT"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="汇率:"  label-width="100px">
					<el-input  :value="currItem.CHANGE_RATE"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="兑出数量:"  label-width="100px">
					<el-input  :value="currItem.FINAL_USDT_NUMBER"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="收款人姓名:"  label-width="100px">
					<el-input  :value="currItem.BANK_USER_NAME"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="银行名称:"  label-width="100px">
					<el-input  :value="currItem.BANK_ADDRSSS"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="银行卡号:"  label-width="100px">
					<el-input  :value="currItem.BANK_NO"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="付款凭证:"  label-width="100px" >
					<el-image
						style="width: 100px; height: 100px;margin-right:10px;"
						v-for="url in imgList"
						:key="url"
						:src="url"
						:preview-src-list="imgList">
					</el-image>
					<span v-show="!imgList.length">未上传</span>
				</el-form-item>
			</el-form >
		</el-dialog>
		<el-dialog
			title="申诉"
			:visible.sync="appealWindon"
			:close-on-click-modal="false"
			width="500">
			<el-form    >
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
				:on-error ='fileError'
				:on-preview="handlePictureCardPreview"
				:class="urls.length>2?'hideAdd':''"
				>
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<span slot="footer" class="dialog-footer">
				<el-button @click="appealWindon = false">取 消</el-button>
				<el-button type="success" @click="submitProof">提交</el-button>
			</span>
		</el-dialog>
		<!-- <el-dialog
			title="审核"
			:visible.sync="showAudit"
			:close-on-click-modal="false"
			width="500">
			<el-form  ref="currItem" :model="currItem">
				<el-form-item label="兑出商户:"  label-width="100px">
					<el-input  :value="currItem.MERCHANT_CODE"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="兑出金额:"  label-width="100px">
					<el-input  :value="currItem.AMOUNT"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="汇率:"  label-width="100px">
					<el-input  :value="currItem.CHANGE_RATE"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="兑出数量:"  label-width="100px">
					<el-input  :value="currItem.FINAL_USDT_NUMBER"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="收款人姓名:"  label-width="100px">
					<el-input  :value="currItem.BANK_USER_NAME"  :disabled="true"></el-input>
				</el-form-item>
					<el-form-item label="银行名称:"  label-width="100px">
						<el-input  :value="currItem.BANK_ADDRSSS"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="银行卡账户:"  label-width="100px">
					<el-input  :value="currItem.BANK_NO"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="银行卡账户:"  label-width="100px">
					<el-input  :value="currItem.BANK_NO"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="谷歌验证码:"  label-width="100px">
					<el-input v-model="auditForm.google_code"></el-input>
				</el-form-item>
				<el-row style="text-align:center;">
					<el-button  type="success" @click="passAudit('Y')" :disabled="auditDisabled">通过</el-button>
					<el-button @click="passAudit('N')" :disabled="auditDisabled">不通过</el-button>
				</el-row>
			</el-form >
		</el-dialog> -->
		<div class="imgBox">
			<el-image
				style="width: 0; height: 0;"
				:src="imgList[0]"
				id="peveImg"
				:preview-src-list="imgList">
			</el-image>
		</div>
		<el-dialog
			title="谷歌验证码"
			:visible.sync="popGoogle"
			:close-on-click-modal="false"
			@close="google_code = ''"
			width="400">
			<el-input  v-model="google_code" placeholder="请输入谷歌验证码"></el-input>
			<el-row style="text-align:center;margin-top:30px;">
				<el-button  type="success" @click="submitAudit(110)" :disabled="auditDisabled">通过</el-button>
				<el-button @click="submitAudit(900)" :disabled="auditDisabled">不通过</el-button>
			</el-row>
		</el-dialog>
	</div>
</template>
<script>
import { dateFormat } from "@/common/util";
const refreshTime = 30000;
export default {
	components:{

	},
	data(){
		return {
			dialogImageUrl: '',
			dialogVisible: false,
			appealWindon:false,
			showDetail:false,
			// fileData:{
			// 	token:'',
			// 	fileName:'aa.jpg',
			// 	type:'payCode'
			// },
			desc:'',
			urls:[],
			filterForm:{
				applyTime:"",
				order_no: "",
				order_status: "ALL",
				page:1,
				page_size: 20,
			},
			list:[],
			total:0,
			currItem:'',
			//新增字段
			date:[],
			footer:"",
			checkCnt:"",
			payCnt:"",
			showAudit:false,
			imgList:[],
			loading:null,
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
			popGoogle:false,
			selectList:[],
			google_code:"",
			auditDisabled:false,
			tableLoading:false
		}
	},
	computed:{
		orderStatus(){
			return this.filterForm.order_status
		}
	},
	mounted(){
		this.getLoadingData()
	},
	methods:{
		ShowAppealWindon(data){
			this.appealWindon = true
			this.currItem = data
			this.appealForm.id = data.OUT_RECORD_ID
		},
		submitProof(){
			this.appealForm.picture_img = this.urls.join(',')
			let p = this.$http.post('ajax_trade/appealOutReport',this.appealForm)
			p.then(res => {
				this.$message.success(res.msg)
				this.appealWindon = false
				this.getLoadingData()
			}).catch(error => {
				return false
			})
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
		getData(){
			//每30秒更新数据，不加载loading以免影响体验
			if (this.timer) clearTimeout(this.timer)
			this.timer = setTimeout(()=>{
				this.getData()
			},refreshTime)
			this.$http.post('/ajax_trade/getOutReportList',this.filterForm).then((res) => {
				this.tableLoading = false
				let {data,footer,total_count,checkCnt,payCnt} = res.result
				this.list = data
				this.footer = footer[0]
				this.total = total_count || 0
				this.payCnt = payCnt
				this.checkCnt = checkCnt
				this.getHeight()
			}).catch(err => {
				this.tableLoading = false
				return false
			})
		},
		//获取数据时载入loading图
		getLoadingData(){
			this.tableLoading = true
			this.getData()
		},
		//计算table中间高度
		getHeight(){
			// let tableHeight = document.getElementsByClassName('el-table')[0].offsetHeight
			// let headerHeight = document.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
			// this.$nextTick(()=>{
			// 	let footerHeight = document.getElementsByClassName('el-table__footer-wrapper')[0].offsetHeight
			// 	document.getElementsByClassName('el-table__body-wrapper')[0].style.height = tableHeight - headerHeight - footerHeight + 'px'
			// })
			//有横向滚动栏时表头显示正常
			document.getElementsByClassName('gutter')[0].style.display = 'block'
			document.getElementsByClassName('gutter')[0].style.width = '17px'
		},
		handleSizeChange (size) {
			this.filterForm.page_size = size
			this.getLoadingData()
		},
		handleCurrentChange (page) {
			this.filterForm.page = page
			this.getLoadingData()
		},

		//flashex 新增

		changeDate() {
			if (this.date) {
				this.filterForm.applyTime = dateFormat(this.date[0].getTime()) +' - ' + dateFormat(this.date[1].getTime())
			} else {
			this.filterForm.applyTime = ''
			}
		},
		//获取底部统计数据
		getSummaries() {
			let {AMOUNT,MERCHANT_SETTLE_USDT_NUMBER} = this.footer
			let sums = ['合计',AMOUNT,'','','','','',MERCHANT_SETTLE_USDT_NUMBER];
			return sums
		},
		showPay(id) {
			this.loading = this.$loading({
				lock:true,
				text:'加载凭证……',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			let p = this.$http.post('/ajax_trade/payawayOutReport',{
				id:id
			})
			p.then(res => {
				let {img} = res.result
				this.imgList = img
				setTimeout(()=>{
					document.getElementById('peveImg').click()
				},200)
				this.loading.close()
			}).catch(error => {
				this.loading.close()
				return false
			})
		},
		//查看详情
		detail(data){
			this.imgList = []
			this.currItem = data
			if(this.currItem.PAY_IMG) {
				this.loading = this.$loading({
					lock:true,
					text:'获取详情中……',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				let p = this.$http.post('/ajax_trade/payawayOutReport',{
					id:this.currItem.OUT_RECORD_ID
				})
				p.then(res => {
					let {img} = res.result
					this.imgList = img
					this.showDetail = true
					this.loading.close()
				}).catch(error => {
					return false
				})
			} else {
				this.showDetail = true
			}
		},
		//确认收款
		confirmGet(data) {
			this.$confirm('确认已经收款？', '提示', {
				distinguishCancelAndClose: true,
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			}).then(()=> {
				let p = this.$http.post('ajax_trade/appealOutReport',{
					id:data.OUT_RECORD_ID,
					key:'200_300'
				})
				p.then(res => {
					this.$message.success(res.msg)
					this.getLoadingData()
				}).catch(error => {
					return false
				})
			}).catch(action => {
				return false
			})
		},
		audit(data) {
			this.popGoogle = true
			this.selectList = []
			this.selectList.push(data.OUT_RECORD_ID)
		},
		// passAudit(type){
		// 	this.auditForm.check_type = type
		// 	if (!this.auditForm.google_code) {
		// 		this.$message.warning('请输入谷歌验证码！')
		// 		return
		// 	}
		// 	this.auditDisabled = true
		// 	let p = this.$http.post('ajax_trade/checkOutReport',this.auditForm)
		// 	p.then(res => {
		// 		this.auditDisabled = false
		// 		this.$message.success(res.msg)
		// 		this.showAudit = false
		// 		this.getData()
		// 	}).catch(error => {
		// 		this.auditDisabled = false
		// 		return false
		// 	})
		// },
		//导出Excel
		exportExcel() {
			let p = this.$http.post('/ajax_trade/exportOutReportList',this.filterForm)
			p.then(res => {
				const list = res.result.data
				require.ensure([], () => {
					const {
							export_json_to_excel
					} = require('../../assets/js/Export2Excel');
					const tHeader = ['订单号','金额', '手续费', '汇率', '商户结算数量(USDT)','状态','收款人','卡号','支行地址','添加时间','确认时间','商户码'];
					const filterVal = ['SERIAL_NO','AMOUNT', 'HANDLING_FEE', 'CHANGE_RATE', 'MERCHANT_SETTLE_USDT_NUMBER','STATUS', 'BANK_USER_NAME', 'BANK_NO', 'BANK_ADDRSSS','CREATE_AT','CONFIRM_TIME','MERCHANT_CODE'];
					const data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, data, '兑出记录');
				})
			}).catch(error => {
				return false
			})
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]))
		},
		//选择行数
		handleSelectionChange(val) {
			this.selectList = []
			val.forEach(el => {
				this.selectList.push(el.OUT_RECORD_ID)
			})
		},
		//点击批量审核
		confirmAllAudit() {
			if (!this.selectList.length) {
				this.$message.warning('请选择订单！')
				return
			}
			this.popGoogle = true
		},
		//批量审核
		submitAudit(type) {
			if (!this.google_code) {
				this.$message.warning('请输入谷歌验证码!')
				return;
			}
			this.auditDisabled = true
			let selectList = this.selectList.join(',')
			let p =  this.$http.post('ajax_trade/checkAllOutReport',{
				google_code:this.google_code,
				all_id:selectList,
				status:type
			})
			p.then(res => {
				this.auditDisabled = false
				this.popGoogle = false
				this.google_code = ''
				this.$message.success(res.msg)
				this.selectList = []
				this.getLoadingData()
			}).catch(error => {
				this.auditDisabled = false
				return false
			})
		},
		//批量确认收款
		confirmAllGet() {
			if(!this.selectList.length) {
				this.$message.warning('请选择订单！')
				return
			}
			let selectList = this.selectList.join(',')
			this.$confirm('是否批量确认收款', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					let p = this.$http.post('ajax_trade/appealAllOutReport',{
						all_id:selectList,
						key:'200_300'
					})
					p.then(res => {
						this.$message.success(res.msg)
						this.selectList = []
						this.getLoadingData()
					}).catch(error => {
						return false
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消批量确认收款'
          });
        });
		}
	},
	destroyed(){
		if (this.timer) {
			clearTimeout(this.timer)
		}
	},
	watch:{
		orderStatus(newVal,oldVal) {
			this.filterForm.page = 1
			this.getLoadingData()
		}
	},
	filters: {
    //转换时间
    isDateFormat(val) {
			if (!val) return "";
			let obj = val * 1
			let date = new Date(obj)
			let y = 1900 + date.getYear()
			let m = "0" + (date.getMonth() + 1)
			let d = "0" + date.getDate()
			let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
			let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
			let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
			return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h + ":" + minutes + ":" + s
		}
	},
}
</script>
<style lang="less" scoped>
.withdrawRecord-page{
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
			// justify-content: space-between;
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
				/deep/ .el-badge {
					.el-badge__content.is-dot {
						width:4px;
						height:4px;
						right:0px;
						background:red;
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
		/deep/ .hideAdd{
			.el-upload--picture-card{display: none;}
		}
		.imgBox {
			position: absolute;
			top:0;
			left:0;
			width:0;
			height:0;
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
					margin-right:20px;
					font-size:13px;
				}
			}
		}

}
</style>
