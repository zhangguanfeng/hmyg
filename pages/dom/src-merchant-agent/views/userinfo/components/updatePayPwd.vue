<template>
	<el-dialog title="修改支付密码" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
		<el-form :model="formData" :rules="rulesPwd" ref="formData" label-width="140px" label-position="left">
			<el-form-item label="旧支付密码：" prop="payPwd">
				<el-input type="password" ref="payPwd" placeholder="请输入旧支付密码" size="small" v-model="formData.payPwd"></el-input>
			</el-form-item>
			<el-form-item label="新支付密码：" prop="newPayPwd">
				<el-input type="password" size="small" v-model="formData.newPayPwd" placeholder="请输入新支付密码"></el-input>
			</el-form-item>
			<el-form-item label="确认新支付密码：" prop="newPayPwd2">
				<el-input type="password" size="small" v-model="formData.newPayPwd2" placeholder="请再次输入密码"></el-input>
			</el-form-item>
			<el-form-item label="谷歌验证码：" prop="secret">
				<el-input type="text" size="small" v-model="formData.secret" placeholder="请输入谷歌验证码"></el-input>
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
export default {
	data() {
		const checkOldPwd = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入旧支付密码'));
			}
			callback();
		};
		const validatePass = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入新支付密码'));
			}
			if (value == this.formData.payPwd) {
				callback(new Error('新旧密码不能一致!'));
			}
			if (this.formData.newPayPwd2 !== '') {
				this.$refs.formData.validateField('checkPass');
			}
			callback();
		};
		const checkPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));

			} else if (value !== this.formData.newPayPwd) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		}
		const checkSecret = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入谷歌验证码'));
			}
			callback();
		}
		return {
			dialogFormVisible: false,
			formData: {
				payPwd: '',
				newPayPwd: '',
				newPayPwd2: '',
				secret: ''
			},
			rulesPwd: {
				payPwd: [
					{required: true, validator: checkOldPwd, trigger: 'blur'}
				],
				newPayPwd: [
					{required: true, validator: validatePass, trigger: 'blur'}
				],
				newPayPwd2: [
					{required: true, validator: checkPass, trigger: 'blur'}
				],
				secret: [
					{required: true, validator: checkSecret, trigger: 'blur'}
				]
			},
		}
	},
	methods: {
		submitFormPwd() {
			this.$refs.formData.validate((valid) => {
				if (valid) {
					this.$http.post('/ajax_user/changePassword', {
						old_pass: Md5(this.formData.payPwd),
						new_pass: Md5(this.formData.newPayPwd),
						re_new_pass:Md5(this.formData.newPayPwd2),
						pass_type:'money',
						google_code: this.formData.secret
					}).then((res) => {
						this.$notify({
							title: '成功',
							message: `密码修改成功`,
							type: 'success'
						});
					}).catch(error => {
						return false
					})
					this.$refs.formData.resetFields();
					this.dialogFormVisible = false;
				}
			});
		},
		show() {
			this.dialogFormVisible = true
		}
	}
}
</script>

