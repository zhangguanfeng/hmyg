<template>
	<div class="home-wrap">
		<div class="welcome">
			<span>
				尊敬的：{{userInfo.user_name}}
			</span>
			<div class="line">
				<img src="/img/home/liner.png" alt="">
			</div>
			<div class="text">
				欢迎您来到星球算力，在这里开启您的星球之旅吧！
			</div>
		</div>
		<div class="disp">
			<span @click="$router.push('/deposit')">
				转入USDT
			</span>
			<span @click="$router.push('/invite')">
				邀请好友
			</span>
		</div>
		<div class="angle" ref="angle">
			<ul ref="angleUl">
				<li>
					<p class="tit">{{updateData.online.toLocaleString()}} <img src="/img/home/pointer-up.png" /></p>
					<div class="del">目前在线人数</div>
				</li>
				<li>
					<p class="tit"> {{updateData.usdt.toLocaleString()}} <img src="/img/home/pointer-up.png" /></p>
					<div class="del">居民理财总额(USDT)</div>
				</li>
				<li class="space"></li>
				<li>
					<p class="tit">{{updateData.salpt.toLocaleString()}} <img src="/img/home/pointer-up.png" /></p>
					<div class="del">居民收益总额(SALPT)</div>
				</li>
			</ul>
		</div>
		<!-- <div class="data"> -->
			<ul ref="ul">
				<li>
					<div class="space"></div>
					<div class="main">
						<p>USDT理财包</p>
						<div class="con-num">
							数量：<span>{{poolData.usdt_loading.toFixed(2)}}</span>
							<span>USDT</span>
						</div>
					</div>
				</li>
				<li>
					<div class="space"></div>
					<div class="main">
						<p>可用收益</p>
						<div class="con-num">
							数量：<span>{{poolData.salpt_success.toFixed(2)}}</span>
							<span>SALPT</span>
						</div>
					</div>
				</li>
				<li>
					<div class="space"></div>
					<div class="main">
						<p>可提取</p>
						<div class="con-num">
							理财包：<span>{{poolData.usdt_unlock.toFixed(2)}}</span>
							<span>USDT</span><br />
							收益：<span>{{poolData.salpt_unlock.toFixed(2)}}</span>
							<span>SALPT</span>
						</div>
					</div>
				</li>
				<li>
					<div class="space"></div>
					<div class="main">
						<p>已完成提取</p>
						<div class="con-num">
							理财包：<span>{{poolData.usdt_success.toFixed(2)}}</span>
							<span>USDT</span><br />
							收益：<span>{{poolData.salpt_success.toFixed(2)}}</span>
							<span>SALPT</span>
						</div>
					</div>
				</li>
				<li>
					<div class="space"></div>
					<div class="main">
						<p>提取中</p>
						<div class="con-num">
							理财包：<span>{{poolData.usdt_lock.toFixed(2)}}</span>
							<span>USDT</span><br />
							收益：<span>{{poolData.salpt_lock.toFixed(2)}}</span>
								<span>SALPT</span>
						</div>
					</div>
				</li>
				<li>
					<div class="space"></div>
					<div class="main">
						<p>历史累计</p>
						<div class="con-num">
								理财包累计：<span>{{poolData.usdt_all.toFixed(2)}}</span>
								<span>USDT</span><br />
								收益累计：<span>{{poolData.salpt_all.toFixed(2)}}</span>
								<span>SALPT</span>
						</div>
					</div>
				</li>
			</ul>
		<!-- </div> -->
	</div>
</template>>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
	interface IData {
		usdt_loading: number; //usdt 载入带宽值 -
		salpt_loading: number;  //salpt 能量值 -
		usdt_unlock: number; //usdt 可解锁带宽
		salpt_unlock: number;  //salpt 可解锁能量
		usdt_success: number; //usdt 已完成解锁带宽
		salpt_success: number; //salpt 已完成解锁能量
		usdt_lock: number; //usdt 解锁中带宽
		salpt_lock: number; //salpt 解锁中能量
		usdt_balance: number; //usdt 可用余额带宽
		salpt_balance: number; //salpt 可用余额能量
		usdt_all: number;
		salpt_all: number;
	}

  @Component
  export default class Home extends Vue {
		protected updateData: any = {
			online: '--',
			usdt: '--',
			salpt: '--',
		};
		protected loading: boolean = false;
		protected alphaHome: {[key: string]: string} = {
			online: '',
			usdt: '',
			salpt: '',
		};
		protected poolData: IData = {
			usdt_loading: 0,
			salpt_loading: 0,
			usdt_unlock: 0,
			salpt_unlock: 0,
			usdt_success: 0,
			salpt_success: 0,
			usdt_lock: 0,
			salpt_lock: 0,
			usdt_balance: 0,
			salpt_balance: 0,
			usdt_all: 0,
			salpt_all: 0,
		}
		protected data: any = {};
		protected get userInfo() {
			return this.$store.state.userInfo || {};
		}
		protected async getAlphaHome() {
			const res: any = await this.$post('home/alpha');
			if (res.code === 200) {
				this.alphaHome = res.result;
				this.setUpdate('updateData', this.alphaHome);
			} else {
				// this.$message
			}
		}
		protected setUpdate(key: string, data: any, float?: boolean){
			const updateData = (this as any)[key];
			let timmer = setInterval(() => {
				const done: {[key: string]: boolean} = {};
				for (let i in updateData) {
					done[i] = !!done[i];
					updateData[i] = updateData[i] === '--' ? 0 : updateData[i];
					done[i] = Math.abs(updateData[i]) >= Math.abs(+data[i]);
					const add = float
						? parseFloat((Math.random() * (+data[i] / 30)).toFixed(2))
						: parseInt(Math.random() * (+data[i] / 30) + '', 10);
					updateData[i] = done[i] ? +data[i] : updateData[i] + add;
				}
				if (!Object.values(done).filter((el: Boolean)=> el === false).length) {
					clearInterval(timmer);
				}
			}, 10);
		}
		protected async getQrcode() {
			const result: any = await this.$post('userTree/inviteQr');
			if (result.code === 200) {
				this.$store.commit('updateInvate', result.result);
			}
		}
		protected async setAnimation() {
			const vm = this as any;
			const angle: HTMLElement = vm.$refs.angle;
			const angleUl: HTMLElement = vm.$refs.angleUl;
			angle.style.transform = `translate(0, 0) scale(1)`;
			angle.style.opacity = '1';
			setTimeout(() => {
				angleUl.style.transform = `translate(0, -30px) scale(1)`;
				angleUl.style.opacity = '1';
				this.getAlphaHome();
			}, 300);
			//
			const lis: NodeListOf<HTMLElement> = vm.$refs.ul.querySelectorAll('li');
			Array.prototype.slice.call(lis).forEach((el: HTMLElement, idx: number) => {
				setTimeout(() => {
					el.style.transform = `translate(0, 0) scale(1)`;
					el.style.opacity = '1';
				}, idx * 60);
			});
      const res: any = await this.$post('home/index');
      if (res.code === 200) {
				this.data = res.result;
				this.setUpdate('poolData', this.data, true);
      } else {
        // this.$message.error('加载数据失败');
      }
		}
		protected deactivated() {
			const vm = this as any;
			setTimeout(() => {
				const angle: HTMLElement = vm.$refs.angle;
				const angleUl: HTMLElement = vm.$refs.angleUl;
				angle.style.transform = `translate(0, 60px) scale(.3)`;
				angle.style.opacity = '0';
				angleUl.style.transform = `translate(0, -70px) scale(1)`;
				angleUl.style.opacity = '0';
				const lis: NodeListOf<HTMLElement> = vm.$refs.ul.querySelectorAll('li');
				Array.prototype.slice.call(lis).forEach((el: HTMLElement, idx: number) => {
					el.style.transform = `translate(0, -70px) scale(.4)`;
					el.style.opacity = '0';
				});
			}, 200);
		}
    protected async activated() {
			this.getQrcode();
			setTimeout(() => {
				this.setAnimation();
			}, 400)
			this.updateData = {
				online: '--',
				usdt: '--',
				salpt: '--',
			};
			this.poolData = {
				usdt_loading: 0,
				salpt_loading: 0,
				usdt_unlock: 0,
				salpt_unlock: 0,
				usdt_success: 0,
				salpt_success: 0,
				usdt_lock: 0,
				salpt_lock: 0,
				usdt_balance: 0,
				salpt_balance: 0,
				usdt_all: 0,
				salpt_all: 0,
			}
    }
  }
</script>
<style lang="scss">
	@import '@/style/mixin.scss';
	.home-wrap {
		width: 100%;
		height: 100%;
		padding: 10px 0;
		background: url(/img/home/bg.png);
		background-size: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		background-repeat: no-repeat;
		.disp {
			width: calc(100% - 40px);
			padding: 6px 20px 20px 20px;
			display: flex;
			span {
				background: rgb(34, 150, 228);
				padding: 5px 20px;
				color: #fff;
				border-radius: 4px;
				margin-right: 20px;
				font-size: 15px;
				user-select: none;
				cursor: pointer;
			}
		}
		.welcome {
			width: calc(100% - 40px);
			padding: 0 20px;
			span {
				font-size: 18px;
				color: #45FFFE;
			}
			.text {
				color: #349493;
				font-size: 13px;
			}
		}
		.angle {
			background: url(/img/home/angle.png);
			width: calc(100% - 20px);
			margin: 0 auto;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			height: 250px;
			@include transition(500ms);
			transform: translate(0, 60px) scale(.3);
			opacity: 0;
			ul {
				@include transition(500ms);
				transform: translate(0, -70px) scale(1);
				opacity: 0;
				height: 210px;
				width: 100%;
				@include flex(row);
				flex-wrap: wrap;
				font-size: 12px;
				// transform: translate(0, -25px);
				li {
					width: 30%;
					@include flex(column);
					p {
						font-family:PingFang-SC-Bold,PingFang-SC;
						font-weight:bold;
						color: #01DAE9;
						text-indent: 1rem;
						img {
							width: 15px;
							transform: translate(-5px, 0);
						}
					}
					.del {
						color: #00DFE6;
					}
				}
				li:first-child {
					width: 100%;
					text-align: center;
					// transform: translate(0, -20px);
				}
				.space {
					width: 34%;
					height: 20px;
				}
			}
		}
			>ul {
				// background: url(/img/home/data-bg.png);
				background-repeat: no-repeat;
				background-size: 100%;
				// height: 65vh;
				// height: 525px;
				// width: 45%;
				// width: 40%;
				// padding: 0 25%;
				width: calc(100% - 30px);
				margin: 0 auto;
				padding: 0 0 80px 0;
				li {
					height: 8vh;
					width: 100%;
					@include flex();
					margin-bottom: 15px;
					flex-direction: row-reverse;
					@include transition(500ms);
					transform: translate(0, -70px) scale(.4);
					opacity: 0;
					// height: 75px;
					// padding: 5px 0 0 0;
					.space {
						height: 100%;
						width: 22%;
					}
					.main {
						// flex: 1;
						height: 100%;
						width: 50%;
						padding: 0 0 0 30%;
						background-size: 100% 100% !important;
						background-repeat: no-repeat !important;
						display: flex;
						flex-direction: column;
						justify-content:  center;
						.con-num {
							white-space: nowrap;
						}
						p {
							font-size: 16px;
							color: #45FFFE;
						}
						div {
							font-size: 12px;
							color: #349493;
							align-items: center;
						}
						@media screen and (max-width: 410px){
								p {
									font-size: 13px;
									transform: translate(-5%, 3px) scale(.9);
									color: #45FFFE;
								}
								div {
									font-size: 12px;
									color: #349493;
									transform: translate(-16%, 0) scale(.7);
								}
						}

					}

				}
				li:nth-child(2n) {
					text-align: end;
					flex-direction: row;
					.main {
						width: 54%;
						padding: 0 26% 0 0;
						@media screen and (max-width: 410px){
							p {
									transform: translate(5%, 3px) scale(.9);
								}
								div {
									font-size: 12px;
									color: #349493;
									transform: translate(14%, 0) scale(.7);
								}
						}
					}
				}
				li:nth-child(2n+1) {
					.space {
						width: 20%;
					}
				}
				li:nth-child(1) .main {
					background: url(/img/home/list-0.png);
				}
				li:nth-child(2) .main  {
					background: url(/img/home/list-1.png);
				}
				li:nth-child(3) .main  {
					background: url(/img/home/list-2.png);
				}
				li:nth-child(4) .main  {
					background: url(/img/home/list-3.png);
				}
				li:nth-child(5) .main  {
					background: url(/img/home/list-4.png);
				}
				li:nth-child(6) .main  {
					background: url(/img/home/list-5.png);
				}
			}
		}
	// }
</style>
