<template>
	<div class="withdrawRecord-page">
		<div class="main">
			<el-form   ref="filterForm" :model="filterForm">
				<!-- <div > -->
					<el-form-item label="兑出商户:" label-width="120px">
						<el-input v-model="filterForm.user_name" :disabled="true"></el-input>
					</el-form-item>
					<!-- <el-form-item label="当前数量:"  label-width="120px">
						<el-input  v-model="filterForm.all_balance"  :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="冻结数量:"  label-width="120px">
						<el-input  v-model="filterForm.code_balance"  :disabled="true"></el-input>
					</el-form-item> -->
					<el-form-item label="可兑出数量："  label-width="120px">
						<el-input  v-model="filterForm.balance_can"  :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="汇率:"  label-width="120px">
						<el-input  v-model="filterForm.expense"  :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="兑出数量:"  label-width="120px">
						<el-input  :value="Math.floor(filterForm.amount_cn/filterForm.expense*10000)/10000"  :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="兑出金额:"  label-width="120px">
						<el-input  v-model="filterForm.amount_cn"  ></el-input>
					</el-form-item>
					<el-form-item label="收款人姓名:"  label-width="120px">
						<el-input  v-model="filterForm.bank_user_name"  ></el-input>
					</el-form-item>
					<el-form-item label="支行地址:"  label-width="120px">
						<el-input  v-model="filterForm.bank_name"  ></el-input>
					</el-form-item>
					<el-form-item label="银行卡号:"  label-width="120px">
						<el-input  v-model="filterForm.bank_no"  ></el-input>
					</el-form-item>
					<el-form-item label="google验证码:"  label-width="120px">
						<el-input  v-model="filterForm.google_code"  ></el-input>
					</el-form-item>
					<!-- <el-form-item label="提现类型："  label-width="120px">
						<el-radio v-model="radio" label="1">抢单</el-radio>
  					<el-radio v-model="radio" label="2">匹配订单</el-radio>
					</el-form-item> -->
					<el-button  type="primary" :disabled="disabled"
						@click.native="addOrder">发起提现
					</el-button>
					<el-button  type="primary" 
						@click.native="$router.go(-1)">返回
					</el-button>
			</el-form>
		
		</div>
	</div>
</template>
<script>
import { dateFormat } from "@/common/util";
export default {
	components:{

	},
	data(){
		return {
			// radio:'1',
			filterForm:{
				user_name:'',
				all_balance:'',
				code_balance:'',
				balance_can:'',
				expense:'',
				amount_cn:'',
				bank_user_name:'',
				bank_name:'',
				bank_no:'',
				google_code:''
			},
			list:[],
			total:0,
			loading:null,
			disabled:false
		}
	},
	mounted(){
		this.getData()
	},
	methods:{
		getData(){
			this.$http.post('/ajax_trade/createOutReport ').then((res) => {
				console.log(res)
				const { user_name,all_balance,code_balance,balance_can,expense } = res.result
				this.filterForm.user_name = user_name
				this.filterForm.all_balance = all_balance
				this.filterForm.code_balance = code_balance
				this.filterForm.balance_can = balance_can
				this.filterForm.expense = expense
			}).catch(err => {
				return false
			})
		},
		addOrder(){
			// let url  = 	this.radio == 1? '/wallet/api/apiRushOrder':'/wallet/apiMgr/apiOrder'
			this.disabled = true
			let p = this.$http.post('/ajax_trade/subCreateOutReport',this.filterForm)
			p.then(res=> {
				this.$message.success(res.msg)
				this.$router.go(-1)
			}).catch(error => {
				this.disabled = false
				return false
			})
			// this.$http.post('/ajax_trade/subCreateOutReport',this.filterForm).then((res) => {
			// 	if(res.code == 200){
			// 		if(this.radio == 1){
			// 			this.queryAdvStatus(res.result)
			// 		}else{
			// 			this.$message(res.msg)
			// 			this.$router.go(-1)
			// 		}
					
			// 	}
			// }).catch(err => {
			// 	if(err.code == 13017){
			// 		this.$message(err.result)
			// 	}else{
			// 		this.$message(err.msg)
			// 	}
			// })
		},
		openFullScreen() {
		 	this.loading = this.$loading({
				lock: true,
				text: '订单匹配中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
		},
		queryAdvStatus(advId){
			this.openFullScreen()
			this.$http.post('/wallet/api/queryAdvStatus',{
				advId: advId,
				apiId: "7"
			}).then((res) => {
				if(res.code == 200){
					this.$message(res.msg)
					this.loading.close()
					this.$router.go(-1)
				}
			}).catch(err => {
				console.log(err)
				if(err.code == 40001||err.code == 13013){
					this.$message(err.msg)
					this.loading.close()
				}else{
					setTimeout(()=>{
						this.queryAdvStatus(advId)
					},1000)
				}
				
			})
		},
		handleSizeChange (size) {
			this.filterForm.pageSize = size
			this.getData()
		},
		handleCurrentChange (page) {
			this.filterForm.pageNum = page
			this.getData()
		},
	},
	watch:{

	},
	computed:{

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
			form{
				padding: 20px;
				// /deep/.el-form-item{
				// 	display: flex;
				// 	flex-direction: row;
				// 	justify-content: space-between;
				// }
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
		
		}
}
</style>