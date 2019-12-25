<template>
	<div class="coin-extract">
		<div class="main">
			<h4>提至钱包</h4>
			<el-form ref="form" :model="formData" label-width="100px" label-position="left">
				<el-form-item label="币种">
					<el-select v-model="formData.coin_name" placeholder="请选择币种" @change='handleChange'>
						<el-option
							v-for="(item,index) in names"
							:key="index"
							:label="item.label"
							:value="item.value"
							
							>
						</el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="类型">
					<el-select v-model="formData.coin_type" placeholder="请选类型">
						<el-option
							v-for="(item,index) in types"
							:key="index"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="提币账户">
					<el-input v-model="formData.email" :disabled="true"></el-input>
				</el-form-item> -->
				<el-form-item label="可转账数量">
					<el-input v-model="formData.all_usdt_number" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="转账数量">
					<el-input v-model="formData.withdraw_amount"></el-input>
				</el-form-item>
				<!-- <el-form-item label="手续费">
					<el-input v-model="formData.expense" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="到账数量">
					<el-input v-model="getAmount" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="提币地址">
					<el-input v-model="formData.wallet_id" @change="changeID"></el-input>
				</el-form-item>
				<el-form-item label="资金密码">
					<el-input v-model="formData.money_code" type="password"></el-input>
				</el-form-item> -->
				<el-form-item label="谷歌验证码">
					<el-input v-model="formData.google_code"></el-input>
				</el-form-item>
				<el-button type="primary" @click="submit" >提交</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
import md5 from 'js-md5'
export default {
	data() {
		return {
			formData: {
				coin_name:'',
				coin_type:'',
				email:'',
				all_usdt_number:'',
				withdraw_amount:'',
				expense:'',
				wallet_id:'',
				money_code:'',
				google_code:''
			},
			data:[],
			names:[
			],
			types:[],
			disabled:false
		}
	},
	computed:{
		getAmount() {
			let num = Math.floor((this.formData.withdraw_amount - this.formData.expense)*10000)/10000
			return num>0?num:0
		},
	},
	mounted() {
		this.getData()
	},
	methods: {
		handleChange(e){
			this.data.forEach( (item)=> {
				if(item.currency === e){
					this.formData.all_usdt_number = item.balance
				}
			})
			
		},
		// 获取页面信息
		getData() {
			let p = this.$http.get('ajax_funds/transferWallet');
			p.then( res => {
				console.log(res);
				let { result } = res;
				this.data = result;
				this.names = result.map((e)=>{
					return {value: e.currency,label: e.currency,}
				})
				this.formData.coin_name = this.names[0].value
				this.formData.all_usdt_number = result[0].balance

				// result.forEach((e,i) => {
				// 	this.names.forEach((j,k) => {
				// 		if(e[i].currency == j.value){
				// 			this.formData.all_usdt_number = e[i].balance
				// 		}
				// 	})
				// });
				// console.log(this.formData.all_usdt_number,'55');
				
				// let {all_usdt_number,email,expense,coin_type} = res.result
				// this.formData.all_usdt_number = all_usdt_number
				// this.formData.email = email
				// this.formData.expense = expense
				// this.getTypes(coin_type)
			}).catch(error => {
				return false	
			})
		},
		// getTypes(list){
		// 	for (let i = 0;i<list.length;i++) {
		// 		this.types.push({
		// 			value:list[i],
		// 			label:list[i]
		// 		})
		// 	}
		// },
		changeID(e) {
			// ERC20地址是0x开头
			let reg = /^(0x)+/g
			if (!reg.test(e)) {
				this.formData.coin_type = "OMNI"
			} else {
				this.formData.coin_type = "ERC20"
			}
		},
		// 提交至钱包
		submit() {
			
			// this.disabled = true
			let p = this.$http.post('ajax_funds/saveTransferWallet',{
				amount:this.formData.withdraw_amount,
				google_code:this.formData.google_code,
				currency:this.formData.coin_name,

				// withdraw_amount:this.formData.withdraw_amount,
				// coin_name:this.formData.coin_name,
				// coin_type:this.formData.coin_type,
				// wallet_id:this.formData.wallet_id,
				// money_code:md5(this.formData.money_code),
				// google_code:this.formData.google_code
			})
			p.then(res => {
				console.log(res,'123');
				
				this.disabled = false
				this.$message.success(res.msg)
				this.getData()
				this.formData.google_code = ''
				this.formData.money_code = ''
				this.formData.withdraw_amount = ''
			}).catch(error => {
			console.log('123');

				this.disabled = false
				return false
			})
		}
	}
}
</script>

<style lang="less" scoped>
.coin-extract {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 10px;
	.main {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		background: #fff;
		display: flex;
		flex-direction: column;
		padding:20px;
		h4 {
			margin-bottom: 20px;
		}
		.el-form {
			width: 500px;
			.el-button {
				width: 200px;
				margin-left: 150px;
			}
		}
	}
}
</style>


