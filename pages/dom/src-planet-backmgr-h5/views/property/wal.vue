<template>
	<div class="transfer-box">
		<div class="out-item">
			<div class="transfer-box-item">
				<p class="fl transfer-tit">
					<em class="fl"></em>选择理财:
				</p>
				<van-field :disabled="true"  @click.native.stop="showPop('pool')" v-model="poolText" placeholder="请选择理财" class="fr transfer-input" />
			</div>
			<div class="transfer-box-item">
				<p class="fl transfer-tit">
					<em class="fl"></em>提取类型：
				</p>
				<van-field :disabled="true" @click.native.stop="showPop('symbol')" :border="true" v-model="symbolText" placeholder="请选择提取类型" class="fr transfer-input" />
				<!-- <van-dropdown-menu class="fr transfer-input">
					 <van-dropdown-item v-model="value2" :options="option2" />
				</van-dropdown-menu> -->
			</div>
			<div class="transfer-box-item">
				<p class="fl transfer-tit">
					<em class="fl"></em>提取数量：
				</p>
				<van-field v-model="form.value" @blur.stop="blurHandle('value')" @input="form.value=$util.floatNumber(form.value)" placeholder="请输入提取数量" class="fr transfer-input" />
			</div>
			<div class="transfer-box-item">
				<p class="fl transfer-tit">
					<em class="fl"></em>可用余额：
				</p>
				<van-field :disabled="true" v-model="amount" placeholder="" class="fr transfer-input" />
			</div>
			<div class="transfer-box-item">
				<p class="fl transfer-tit">
					<em class="fl"></em>资金密码：
				</p>
				<van-field type="password" v-model="form.moneyPwd" placeholder="" class="fr transfer-input" />
			</div>
			<div class="transfer-btn" @click="submit">提交</div>
		</div>
		<van-popup :style="{width: width + 'px', transform: `translateX(80%)`}" v-model="show" position="bottom">
			<van-picker
				v-if="show"
				:columns="statuss"
				show-toolbar
				@change="onChange"
				@cancel="cancel"
				@confirm="confirm"
				confirm-button-text="确定"
				cancel-button-text="重置"
				value-key="label"
				/>
    </van-popup>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
interface IPool {
  POOL_ID: string;
  POOL_NAME: string;
  NUMROW: string;
}
interface IForm {
  pool_id: string; // 池ID
  currency: string; // 转出的币种，SALPT、USDT
  moneyPwd: string; // 资金密码
  value: string; // 金额
}

@Component
export default class Wal extends Vue {
	protected symbolText: string = 'USDT';
	protected amount: number = 0;
	protected poolText: string = '';
	protected show: boolean = false;
	protected selectType: string = '';
	protected poolList: IPool[] = [];
  protected loading: boolean = false;
  protected moneyInfo: any = [];
  protected form: any = {
    pool_id: '', // 池ID
    currency: 'USDT', // 转出的币种，SALPT、USDT
    moneyPwd: '', // 资金密码
    value: '', // 金额
	};
	protected readonly currencies: {label: string, value: string}[] = [
		{ label: 'USDT', value: 'USDT' },
		{ label: 'SALPT', value: 'SALPT' },
	];
  protected readonly rules: any = {
    pool_id: [{ required: true, message: '矿池未选择' }], // 池ID
    currency: [{ required: true, message: '币种未选择' }], // 转出的币种，SALPT、USDT
    moneyPwd: [{ required: true, message: '资金密码不能为空' }], // 资金密码
    value: [{ required: true, message: '金额不能为空' }], // 金额
	}
	protected showPop(type: string) {
		this.selectType = type;
		this.show = true;
	}
	protected get statuss() {
		let result: any = [];
		if (this.selectType === 'pool') {
			result = this.poolList.slice();
		} else if (this.selectType === 'symbol') {
			result = this.currencies.slice();
		}
		return result;
	}
  // protected get amount(): string {
  //   const filter = this.moneyInfo.filter((el: any) => el.coin_name === this.form.currency);
  //   return filter && filter.length && filter[0].over_balance || '';
	// }
	protected get width() {
    return document.documentElement.offsetWidth;
	}
	protected blurHandle(key: string) {
		const form: any = this.form;
		if (form[key] === '') {
			return;
		}
		form[key] = parseFloat(form[key]);
		if (key === 'value') {
			if (form[key] > +this.amount) {
				form[key] = this.amount;
			}
		}
	}
	protected  onChange() {

  }
  protected confirm(item: {label: string, value: string}) {
		if (this.selectType === 'pool') {
			this.poolText = item.label;
			this.form.pool_id = item.value;
		} else if(this.selectType === 'symbol') {
			this.symbolText = item.label;
			this.form.currency = item.value;
		}
		this.getMoneyInfo();
		this.show = false;
  }
  protected cancel() {
		this.show = false;
	}
	protected async getMoneyInfo() {
    const res: any = await this.$post('money/balance', {
      currency: this.form.currency,
      pool_id: this.form.pool_id,
    });
    if (res.code === 200) {
      this.amount = +res.result.balance;
    } else {
      this.$notify({ type: 'danger', message: '获取资金信息失败' });
    }
  }
	protected async getPoolList() {
    const res: any = await this.$post('money/usedPoolList', {});
    if (res.code === 200) {
			res.result.list.forEach((el: any, idx: number) => {
				el.label = el.POOL_NAME;
				el.value = el.POOL_ID;
			});
      this.poolList = res.result.list || [];
    } else {
			this.$notify({ type: 'danger', message: '获取矿池信息失败' });
    }
	}
	protected  async submit() {
		// pool_id: '', // 池ID
    // currency: 'USDT', // 转出的币种，SALPT、USDT
    // moneyPwd: '', // 资金密码
		// value: '', // 金额
		const { form } = this;
		if (!form.pool_id) {
			this.$notify({ type: 'danger', message: '请选择矿池' });
			return;
		}
		if (!form.currency) {
			this.$notify({ type: 'danger', message: '请选择转出币种' });
			return;
		}
		if (!form.value) {
			this.$notify({ type: 'danger', message: '请输入数量' });
			return;
		}
		if (!form.moneyPwd) {
			this.$notify({ type: 'danger', message: '请输入资金密码' });
			return;
		}
		const res: any = await this.$post('money/transfer', {...this.form, moneyPwd: this.$util.md5(form.moneyPwd)});
		if (res.code == 200) {
			this.$notify({ type: 'success', message: '转出成功' });
			this.form = {
				pool_id: '', // 池ID
				currency: 'USDT', // 转出的币种，SALPT、USDT
				moneyPwd: '', // 资金密码
				value: '', // 金额
			};
		} else {
			this.$notify({ type: 'danger', message: '转出失败,' + res.msg });
		}
	}
	protected activated() {
		this.form = {
			pool_id: '', // 池ID
			currency: 'USDT', // 转出的币种，SALPT、USDT
			moneyPwd: '', // 资金密码
			value: '', // 金额
		};
    // try {
    //   (this as any).$refs.form.resetFields();
    // } catch(e) {}
    this.getPoolList();
    // this.getMoneyInfo();
  }
}
</script>

<style lang="scss">
	.transfer-box {
		.fl {
			float: left;
		}

		.fr {
			float: right;
			padding: 0 10px;
		}

		height: calc(100vh);
		// background: #fff;

		.out-item {
			padding-top: 12px;
		}

		.transfer-box-item {
			height: 34px;
			padding: 0 18px 18px;

			.transfer-tit {
				font-size: 14px;
				color: #fff;
				line-height: 34px;

				em {
					width: 5px;
					height: 5px;
					margin: 12px 8px 0 0;
					background: #39C6B4;
					border-radius: 50%;
				}
			}

			.transfer-input {
				width: 238px;
				height: 34px;
				padding-top: 0;
				line-height: 34px;
				border: 1px solid #E6E6E6;
				.van-dropdown-menu__item {
					position: absolute;
					right: 16px;
					top: 8px;
				}
			}
		}
		.transfer-btn {
			width: 320px;
			height: 40px;
			margin: 40px auto 0;
			background: #39C6B4;
			font-size: 14px;
			color: #fff;
			text-align: center;
			line-height: 40px;
			border-radius: 5px;
		}
	}
</style>
