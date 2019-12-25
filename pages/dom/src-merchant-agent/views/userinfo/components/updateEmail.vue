<template>
	<el-dialog title="修改邮箱" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
		<el-form :model="formData" :rules="rules" ref="form" label-width="110px" label-position="left">
			<el-form-item label="新邮箱地址：" prop="email">
				<el-input type="text" ref="email" placeholder="请输入新邮箱地址" v-model="formData.email"></el-input>
			</el-form-item>
			<el-form-item label="图片验证码：" prop="picCode">
				<el-input type="text" class="imgcode-wrap" ref="picCode" placeholder="请输入图片验证码" v-model="formData.picCode">
					<img slot="append" ref="imgcode" :src="SERVER_PATH+'/ajax_common/createCodeImg?randow='+random" @click="getImgCode">
				</el-input>
			</el-form-item>
			<el-form-item label="邮箱验证码：" prop="code">
				<el-input type="text" ref="code" placeholder="请输入邮箱验证码" v-model="formData.code">
					<CountdownBtn  @click="sendEmailCaptcha" slot="append" v-model="btnDisabled" :disabled="btnDisabled"></CountdownBtn>
				</el-input>
			</el-form-item>
			<el-form-item label="谷歌验证码：" prop="secret">
				<el-input type="text" v-model="formData.secret" placeholder="请输入谷歌验证码"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
			<el-button type="primary" @click="submitFormPwd" size="small">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import Md5 from 'js-md5'
import CountdownBtn from '@/components/common/countdownBtn'
export default {
	data() {
		const noEmpty = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(rule.message));
			}
			callback();
		}
		const validatePass = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入新登录密码'));
			}
			if (value == this.formData.email) {
				callback(new Error('新旧密码不能一致!'));
			}
			callback();
		}
		return {
			dialogFormVisible: false,
			formData: {
				email: '',
				code: '',
				secret: '',
				picCode: ''
			},
			rules: {
				email: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入邮箱地址'}
				],
				code: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入邮箱验证码'}
				],
				secret: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入谷歌验证码'}
				],
				picCode: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入图片验证码'}
				]
			},
			SERVER_PATH: window.SERVER_PATH,
			btnDisabled: false,
			random:Math.random()
		}
	},
	mounted() {
		
	},
	methods: {
		submitFormPwd() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$http.post('/ajax_user/changeEmailPhone', {
						account: this.formData.email,
						code: this.formData.code,
						google_code: this.formData.secret,
					}).then((res) => {
						this.$notify({
							title: '成功',
							message: res.msg,
							type: 'success'
						});
						this.$emit('refresh')
					}).catch(error => {
						return false
					})
					this.$refs.form.resetFields();
					this.dialogFormVisible = false;
				}
			});
		},
		sendEmailCaptcha() {
			let valid = true
			this.$refs.form.validateField(['email', 'picCode'], (errorMessage) => {
				if(errorMessage) {
					valid = false
				}
			})
			
			if(!valid) return
			this.btnDisabled = true
			this.$http.get('/ajax_user/sendVerifyCode', {
				account: this.formData.email,
				img_code: this.formData.picCode,
				randow: this.random,
				type:'200'
			}).then(res => {
				if(res.code == 200) {
					this.$notify({
						title: '成功',
						message: res.msg,
						type: 'success'
					});
				}
			}).catch(err => {
				this.btnDisabled = false
			})
		},
		getImgCode() {
			this.random = Math.random()
			this.$refs.imgcode.src = `${SERVER_PATH}/ajax_common/createCodeImg?randow=${this.random}`
		},
		show() {
			this.dialogFormVisible = true
			
			setTimeout(() => {
				this.getImgCode()
			}, 1)
		}
	},
	components: {
		CountdownBtn
	}
}
</script>

<style lang="less" scoped>
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
</style>

