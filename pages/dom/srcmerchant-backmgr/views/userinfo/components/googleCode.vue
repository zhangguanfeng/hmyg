<template>
	<el-dialog title="修改谷歌秘钥" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
		<el-form :model="formData" :rules="rules" ref="form" label-position="left">
			<el-form-item prop="validateCode">
				<el-input type="text" class="imgcode-wrap" ref="picCode" placeholder="请输入图片验证码" v-model="formData.validateCode">
					<img slot="append" ref="imgcode" :src="SERVER_PATH+'/ajax_common/createCodeImg?randow='+random" @click="getImgCode">
				</el-input>
			</el-form-item>
			<el-form-item prop="code">
				<el-input type="text" ref="code" placeholder="请输入手机验证码" v-model="formData.code">
					<CountdownBtn @click="sendEmail" slot="append" v-model="btnDisabled" :disabled="btnDisabled"></CountdownBtn>
				</el-input>
			</el-form-item>
			<div id="qrcode" ref="qrcode"></div>
			<h3>{{secretText}}</h3>
			<el-form-item prop="secret">
				<el-input type="text" ref="secret" placeholder="请输入谷歌验证码" v-model="formData.secret"></el-input>
			</el-form-item>
		</el-form>
		<p>1, 请打开您设备上的谷歌验证器扫描上面二维码或手动输入上面的秘钥串，绑定新的谷歌秘钥</p>
		<p>2, 请在上面的输入框中输入新谷歌秘钥生成的验证码</p>
		<p>3, 点击“提交”按钮</p>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
			<el-button type="primary" :disabled="confirmDisabled" @click="submitFormPwd" size="small">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import Md5 from 'js-md5'
import QRCode from 'qrcodejs2'
import CountdownBtn from '@/components/common/countdownBtn'

export default {
	props:{
		email: {
			type: String,
			required:true
		},
	},
	data() {
		const noEmpty = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(rule.message));
			}
			callback();
		}
		return {
			dialogFormVisible: false,
			secretText: "",
			phone:'',
			formData: {
				code: '',
				secret: '',
				validateCode: ''
			},
			rules: {
				code: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入手机验证码'}
				],
				secret: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入谷歌验证码'}
				],
				validateCode: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入图片验证码'}
				],
			},
			SERVER_PATH: window.SERVER_PATH,
			btnDisabled: false,
			random:Math.random(),
			confirmDisabled: false,
		}
	},
	mounted() {
		this.phone = sessionStorage.getItem('phone1')
		
	},
	methods: {
		submitFormPwd() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.confirmDisabled = true
					this.$http.post('/ajax_user/changeGoogleSecret', {
						code: this.formData.code,
						google_code: this.formData.secret,
						google_secret: this.secretText
					}).then((res) => {
						this.$notify({
							title: '成功',
							message: `修改成功`,
							type: 'success'
						});
						this.$refs.form.resetFields()
						this.dialogFormVisible = false
						this.this.confirmDisabled = false
					}).catch(error => {
						this.confirmDisabled = false
						return false
					})
				}
			});
		},
		getGoogleCode() {
			this.$http.get('/ajax_user/getGoogleSecret',).then(res => {
				if(res.code == 200) {
					this.$nextTick(()=>{
						this.qrcode(res.result.title)
					})
					this.secretText = res.result.secret
				}
			})
		},
		qrcode(text){
			this.$refs.qrcode.innerHTML = ""
			let qrcode = new QRCode(this.$refs.qrcode, {
				width: 120,
				height: 120, // 高度
				text: text, // 二维码内容
				render: 'canvas',   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
				// background: '#f0f',
				// foreground: '#ff0'
			})
		},
		show() {
			this.dialogFormVisible = true
			this.getGoogleCode()
		},
		// 获取短信验证码
		sendEmail() {
			let valid = true
			this.$refs.form.validateField(['validateCode'], (errorMessage) => {
				if(errorMessage) {
					valid = false
				}
			})
			if(!valid) return
			this.btnDisabled = true
			this.$http.get('/ajax_user/sendVerifyCode', {
				account:this.phone,
				img_code:this.formData.validateCode,
				randow:this.random,
				type:'100'
			}).then(res => {
				if(res.code == 200) {
					this.$notify({
						title: '成功',
						message: res.msg,
						type: 'success'
					});
				}else {
					this.btnDisabled = false
				}
			}).catch(err => {
				this.btnDisabled = false
			})
		},
		getImgCode() {
			this.random = Math.random()
			this.$refs.imgcode.src = `${SERVER_PATH}/ajax_common/createCodeImg?randow=${this.random}`
		},
	},
	components: {
		CountdownBtn
	},
}
</script>

<style lang="less" scoped>
#qrcode {
	/deep/ img {
		display: block;
		margin: 0 auto;
	}
}
.el-input {
	/deep/.el-input-group__append {
		width: 110px;
		padding: 0;
		margin: 0;
		line-height: normal;
		cursor: pointer;
		text-align: center;
		img {
			display: block;
			margin:0 auto;
			width: 108px;
			height: 38px;
		}
	}
}
h3 {
	text-align: center;
	margin: 10px 0;
}
</style>


