<template>
	<div class="coin-extract">
		<div class="main">
			<h4>提币</h4>
			<el-form ref="form" :model="formData" label-width="100px" label-position="left">
				<el-form-item label="币种">
					<el-select v-model="formData.coin_name" placeholder="请选择币种">
						<el-option
							v-for="item in names"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="formData.coin_type" placeholder="请选类型" @change="handleType">
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
				</el-form-item>
				<el-form-item label="可提币数量">
					<el-input v-model="formData.all_usdt_number" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="提币数量">
					<el-input v-model="formData.withdraw_amount"></el-input>
				</el-form-item>
				<el-form-item label="手续费">
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
				</el-form-item>
				<el-form-item label="谷歌验证码">
					<el-input v-model="formData.google_code"></el-input>
				</el-form-item>
				<el-button type="primary" @click="submit" :disabled="disabled">提交</el-button>
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
				coin_name:'USDT',
				coin_type:'OMNI',
				email:'',
				all_usdt_number:'',
				withdraw_amount:'',
				expense:'',
				wallet_id:'',
				money_code:'',
				google_code:''
			},
			names:[{
          value: 'USDT',
          label: 'USDT'
				},
			],
			// 类型
			erc20_expense:'',
			omni_expense:'',
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
		// 点击获取类型
		handleType(e){
			if(this.types[0].label == e){
				this.formData.expense = this.omni_expense
			}else{
				this.formData.expense = this.erc20_expense
			}
		},
		getData() {
			let p = this.$http.get('/ajax_funds/coinOutPage');
			p.then( res => {
				let {all_usdt_number,email,erc20_expense,omni_expense,coin_type} = res.result
				this.formData.all_usdt_number = all_usdt_number
				this.formData.email = email
				this.formData.expense = omni_expense
				this.erc20_expense = erc20_expense
				this.omni_expense = omni_expense
				this.getTypes(coin_type)
			}).catch(error => {
				return false	
			})
		},
		getTypes(list){
			for (let i = 0;i<list.length;i++) {
				this.types.push({
					value:list[i],
					label:list[i]
				})
			}
		},
		changeID(e) {
			// ERC20地址是0x开头
			let reg = /^(0x)+/g
			if (!reg.test(e)) {
				this.formData.coin_type = "OMNI"
			} else {
				this.formData.coin_type = "ERC20"
			}
		},
		submit() {
			this.disabled = true
			let p = this.$http.post('ajax_funds/coinOut',{
				withdraw_amount:this.formData.withdraw_amount,
				coin_name:this.formData.coin_name,
				coin_type:this.formData.coin_type,
				wallet_id:this.formData.wallet_id,
				money_code:md5(this.formData.money_code),
				google_code:this.formData.google_code
			})
			p.then(res => {
				this.disabled = false
				this.$message.success(res.msg)
				this.getData()
				this.formData.google_code = ''
				this.formData.money_code = ''
				this.formData.withdraw_amount = ''
			}).catch(error => {
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


