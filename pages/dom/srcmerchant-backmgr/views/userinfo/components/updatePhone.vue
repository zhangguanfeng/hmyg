<template>
	<el-dialog title="修改手机号" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
		<el-form :model="formData" :rules="rules" ref="form" label-width="110px" label-position="left">
			<el-form-item label="地 区 :" prop="area">
        <el-select v-model="value" placeholder="请选择地区" @change='handleArea' style="width: 100%;">
          <el-option
            v-for="item in areaData"
            :key="item.value"
            :label="item.name"
            :value="item.prefix"
          ></el-option>
        </el-select>
      </el-form-item>
			<el-form-item label="新手机号码：" prop="phone">
				<el-input type="text" ref="phone" placeholder="请输入新手机号码" v-model="formData.phone"></el-input>
			</el-form-item>
			<el-form-item label="图片验证码：" prop="picCode">
				<el-input type="text" class="imgcode-wrap" ref="picCode" placeholder="请输入图片验证码" v-model="formData.picCode">
					<img slot="append" ref="imgcode" :src="SERVER_PATH+'/ajax_common/createCodeImg?randow='+random" @click="getImgCode">
				</el-input>
			</el-form-item>
			<el-form-item label="短信验证码：" prop="code">
				<el-input type="text" ref="code" placeholder="请输入短信验证码" v-model="formData.code">
					<CountdownBtn @click="sendPhoneCaptcha" slot="append"  v-model="btnDisabled" :disabled="btnDisabled"></CountdownBtn>
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
			if (value == this.formData.phone) {
				callback(new Error('新旧密码不能一致!'));
			}
			callback();
		}
		return {
			dialogFormVisible: false,
			value:'中国',
			area:'+86',
			areaData:[],
			formData: {
				phone: '',
				code: '',
				secret: '',
				picCode: ''
			},
			rules: {
				phone: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入手机号码'}
				],
				code: [
					{required: true, validator: noEmpty, trigger: 'blur', message: '请输入短信验证码'}
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
		this.getArea()
	},
	methods: {
		handleArea(e){
			this.area = e
			
		},
		 // 获取区号
    getArea() {
      let p = this.$http.post("ajax_common/getArea");
      p.then(res => {
        this.areaData = res.result.map(e => {
          return {
            name: e.name,
            prefix: e.prefix
          };
        });
      });
    },
		submitFormPwd() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$http.post('/ajax_user/changeEmailPhone', {
						
						account: this.formData.phone,
						code: this.formData.code,
						google_code: this.formData.secret,
					}).then((res) => {
						this.$notify({
							title: '成功',
							message: res.msg,
							type: 'success'
						});
						this.$emit('refresh')
					})
					this.$refs.form.resetFields();
					this.dialogFormVisible = false;
				}
			});
		},
		sendPhoneCaptcha() {
			let valid = true
			this.$refs.form.validateField(['phone', 'picCode'], (errorMessage) => {
				if(errorMessage) {
					valid = false
				}
			})
			this.btnDisabled = true
			valid && this.$http.post('ajax_common/sendSms', {
				area:this.area,
				phone: this.formData.phone,
				code: this.formData.picCode,
				randow: this.random,
				type:'100'
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

