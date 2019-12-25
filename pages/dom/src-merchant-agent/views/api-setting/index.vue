<template>
  <div class='api-setting'>
    <h3>API接入设置</h3>
    <el-form ref="form" :model="formData" label-width="100px" label-position="left">
			<el-form-item label="邮箱地址：">
				<el-input v-model="formData.USER_EMAIL" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="手机号码：">
				<el-input v-model="formData.USER_MOBILE" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="接入密钥：">
				<el-input v-model="formData.MERCHANT_SECRET" :disabled="true" class="secret"></el-input>
        <el-button type="primary" @click="getNewSecret('in')">接入密钥</el-button>
			</el-form-item>
			<el-form-item label="回调密钥：">
				<el-input v-model="formData.MERCHANT_CALLBACK_SECRET" :disabled="true"  class="secret"></el-input>
        <el-button type="primary" @click="getNewSecret('out')">回调密钥</el-button>
			</el-form-item>
			<el-form-item label="回调地址：">
				<el-input v-model="formData.MERCHANT_RETURN_URL"></el-input>
			</el-form-item>
			<el-form-item label="谷歌验证码">
				<el-input v-model="google_code"></el-input>
			</el-form-item>
			<el-button type="primary" :disabled="disabled" @click="submit">提交</el-button>
		</el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        formData:{},
        google_code:'',
        disabled:false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let p = this.$http.get('ajax_system/api')
        p.then(res => {
          let {USER_EMAIL,USER_MOBILE,MERCHANT_SECRET,MERCHANT_CALLBACK_SECRET,MERCHANT_RETURN_URL} = res.result
          this.formData = res.result
        }).catch(error => {
          return false
        })
      },
      getNewSecret(type) {
        let p = this.$http.get('ajax_system/getGuid')
        p.then(res => {
          let {result} = res
          if (type == "in") {
            this.formData.MERCHANT_SECRET = result
          } else {
            this.formData.MERCHANT_CALLBACK_SECRET = result
          }
        }).catch(error => {
          return false
        })
      },
      submit() {
        this.disabled = true
        let p = this.$http.post('ajax_system/updateApi',{
          merchant_secret:this.formData.MERCHANT_SECRET,
          merchant_callback_secret:this.formData.MERCHANT_CALLBACK_SECRET,
          google_code:this.google_code,
          return_url:this.formData.MERCHANT_RETURN_URL
        })
        p.then(res => {
          this.disabled = false
          this.$message.success(res.msg)
          this.google_code = ''
        }).catch(error => {
          this.disabled = false
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .api-setting {
    margin: 10px;
    background: #FFF;
    h3 {
      padding:10px 20px;
      font-size: 24px;
    }
    form {
      padding:40px;
      .el-input {
        width:600px;
      }
      .secret {
        width:480px;
        margin-right:20px;
      }
    }
  }
</style>