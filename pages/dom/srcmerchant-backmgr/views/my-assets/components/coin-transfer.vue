<template>
  <div class='coin-transfer'>
    <div class="main">
			<h4>内部转账</h4>
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
				<el-form-item label="可转账数量">
					<el-input v-model="formData.usdt_number" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="转账数量">
					<el-input v-model="formData.withdraw_amount"></el-input>
				</el-form-item>
				<el-form-item label="手续费">
					<el-input v-model="formData.expense" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="到账数量">
					<el-input v-model="getAmount" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="转账地址">
					<el-input v-model="formData.wallet_id" placeholder="请输入AlphaWallet USDT钱包地址"></el-input>
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
  export default {
    data() {
      return { 
        formData: {
          coin_name:'USDT',
          usdt_number:'',
          withdraw_amount:'',
          expense:'',
          wallet_id:'',
          google_code:''
        },
        names:[{
            value: 'USDT',
            label: 'USDT'
          },
        ],
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
      getData() {
        let p = this.$http.get('/ajax_funds/transfer');
        p.then( res => {
          let {usdt_number,expense} = res.result
          this.formData.usdt_number = usdt_number
          this.formData.expense = expense
        }).catch(error => {
          return false	
        })
      },
      submit() {
        this.disabled = true
        let p = this.$http.post('/ajax_funds/saveTransfer',{
          coin_name:this.formData.coin_name,
          to_address: this.formData.wallet_id,
          transfer_amount: this.formData.withdraw_amount,
          google_code: this.formData.google_code
        })
        p.then(res => {
          this.disabled = false
          this.$message.success(res.msg)
          this.$router.push('/my-assets')
        }).catch(error => {
          this.disabled = false
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .coin-transfer {
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