<template>
	<div class="userinfo">
		<div class="main">
			<h1>账户与安全</h1>
			<ul v-if="userInfo">
				<li>
					<label>姓名：</label>
					<p>{{userInfo.USER_NAME}}</p>
					<a class="font-primary" href="javascript:;"></a>
				</li>
				<li>
					<label>手机号码：</label>
					<p>{{userInfo.USER_MOBILE}}</p>
					<a class="font-primary" href="javascript:;" @click="$refs.updatePhone.show()">更换手机</a>
				</li>
				<li>
					<label>谷歌密钥：</label>
					<p v-if="userInfo.GOOGLE_AUTH_SECRET != ''">已绑定</p>
					<p v-else>未绑定</p>
					<a v-if="userInfo.GOOGLE_AUTH_SECRET != ''" class="font-primary" href="javascript:;" @click="$refs.googleCode.show()">修改</a>
					<a v-else class="font-primary" href="javascript:;" @click="$refs.googleCode.show()">绑定</a>
				</li>
				<li>
					<label>登录密码：</label>
					<p>**********</p>
					<a class="font-primary" href="javascript:;" @click="$refs.updateLoginPwdDialog.show()">修改</a>
				</li>
				<li>
					<label>资金密码：</label>
					<p>**********</p>
					<a class="font-primary" href="javascript:;" @click="$refs.updatePayPwdDialog.show()">修改</a>
				</li>
				<li>
					<label>邀请码：</label>
					<p>{{userInfo.NODE_NO}}</p>
				</li>
			</ul>
		</div>
		<UpdateLoginPwd ref="updateLoginPwdDialog"></UpdateLoginPwd>
		<UpdatePayPwd  ref="updatePayPwdDialog"></UpdatePayPwd>
		<GoogleCode ref="googleCode" :email="email"></GoogleCode>
		<UpdatePhone ref="updatePhone" @refresh="getUserInfo"></UpdatePhone>
		<UpdateEmail ref="updateEmail" @refresh="getUserInfo"></UpdateEmail>
	</div>
</template>

<script>
import UpdateLoginPwd from './components/updateLoginPwd.vue'
import UpdatePayPwd from './components/updatePayPwd.vue'
import GoogleCode from './components/googleCode.vue'
import UpdatePhone from './components/updatePhone.vue'
import UpdateEmail from './components/updateEmail.vue'
export default {
	data() {
		return {
			userInfo: null,
			email:''
		}
	},
	mounted() {
		this.getUserInfo()
	},
	methods: {
		getUserInfo() {
			let p = this.$http.post('ajax_user/myAccount')
			p.then(res => {
				let {result} = res
				this.userInfo = result
				sessionStorage.setItem('phone1', this.userInfo.USER_MOBILE)
			}).catch(error => {
        return false
      });
		
		}
	},
	components: {
		UpdateLoginPwd,
		UpdatePayPwd,
		GoogleCode,
		UpdatePhone,
		UpdateEmail
	}
}
</script>


<style lang="less" scoped>
.userinfo {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 10px;
	.main {
		flex: 1;
		-webkit-overflow-scrolling: touch;
		background: #fff;
		display: flex;
		flex-direction: column;
		h1 {
			padding:10px 20px;
			font-size: 24px;
		}
		ul {
			padding:0 20px 20px;
			li {
				display: flex;
				align-items: center;
				margin-top: 20px;
				padding: 10px 0;
				border-bottom: 1px dashed #ebeef5;
				label {
					min-width: 100px;
				}
				p {
					flex: 1;
					font-weight: 700;
				}
			}
		}
	}
}
</style>
