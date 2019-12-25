<template>
	<el-dialog title="修改登录密码" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
		<el-form :model="formData" :rules="rulesPwd" ref="formData" label-width="140px" label-position="left">
			<el-form-item label="旧登录密码：" prop="loginPwd">
				<el-input type="password" ref="loginPwd" placeholder="请输入旧登录密码" size="small" v-model="formData.loginPwd"></el-input>
			</el-form-item>
			<el-form-item label="新登录密码：" prop="newLoginPwd">
				<el-input type="password" size="small" v-model="formData.newLoginPwd" placeholder="请输入新登录密码"></el-input>
			</el-form-item>
			<el-form-item label="确认新登录密码：" prop="newLoginPwd2">
				<el-input type="password" size="small" v-model="formData.newLoginPwd2" placeholder="请再次输入密码"></el-input>
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
const loginPwdReg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
export default {
	data() {
		const checkOldPwd = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入旧登录密码'));
			}
			callback();
		};
		const validatePass = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入新登录密码'));
			}
			if (!loginPwdReg.test(value)) {
				return callback(new Error('由6~16位，密码由大小写字母、数字组成'))
			}
			if (value == this.formData.loginPwd) {
				callback(new Error('新旧密码不能一致!'));
			}
			if (this.formData.newLoginPwd2 !== '') {
				this.$refs.formData.validateField('checkPass');
			}
			callback();
		};
		const checkPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));

			} else if (value !== this.formData.newLoginPwd) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			dialogFormVisible: false,
			formData: {
				loginPwd: '',
				newLoginPwd: '',
				newLoginPwd2: ''
			},
			rulesPwd: {
				loginPwd: [
					{required: true, validator: checkOldPwd, trigger: 'blur'}
				],
				newLoginPwd: [
					{required: true, validator: validatePass, trigger: 'blur'}
				],
				newLoginPwd2: [
					{required: true, validator: checkPass, trigger: 'blur'}
				]
			},
		}
	},
	methods: {
		submitFormPwd() {
			this.$refs.formData.validate((valid) => {
				if (valid) {
					this.$http.post('/ajax_user/changePassword', {
						old_pass: Md5(this.formData.loginPwd),
						new_pass: Md5(this.formData.newLoginPwd),
						re_new_pass: Md5(this.formData.newLoginPwd2),
						pass_type:'login'
					}).then((res) => {
						this.$notify({
							title: '成功',
							message: `密码修改成功`,
							type: 'success'
						});
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

