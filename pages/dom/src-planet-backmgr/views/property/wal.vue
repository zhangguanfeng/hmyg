<template>
  <div class="wal-wrap">
    <div class="wal">
      <el-form :model="form"  ref="form" label-width="100px" style="width: 500px;" :rules="rules">
        <el-form-item label="选择量化池" prop="pool_id">
          <el-select v-model="form.pool_id" placeholder="请选择量化池" @change="getMoneyInfo">
            <el-option
              v-for="(item, key) in poolList"
              :key="key"
              :label="item.POOL_NAME"
              :value="item.POOL_ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提取类型" prop="currency">
          <el-select :disabled="!form.pool_id" v-model="form.currency" placeholder="请选择提取类型" @change="getMoneyInfo">
            <el-option value="USDT" label="USDT"></el-option>
            <el-option value="SALPT" label="SALPT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提取数量" prop="value">
          <BInput
            v-model="form.value"
            type="float"
            prop="value"
            :disabled="!form.pool_id"
            @blur="inputBlur"
            placeholder="请输入提取数量"/>
        </el-form-item>
        <el-form-item label="可用余额" prop="amount">
          <BInput
            v-model="amount"
            type="float"
            prop="amount"
            :disabled="true"/>
        </el-form-item>
        <el-form-item label="资金密码" prop="moneyPwd">
          <BInput
            :disabled="!form.pool_id"
            v-model="form.moneyPwd"
            type="password"
            id="moneyPwd"/>
        </el-form-item>
         <el-form-item style="width: 100%; text-align: right">
          <el-button type="primary" class="primary-btn" size="small" style="padding: 10px 40px" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  protected poolList: IPool[] = [];
  protected loading: boolean = false;
  protected moneyInfo: any = [];
  protected amount:number = 0;
  protected form: any = {
    pool_id: '', // 池ID
    currency: 'USDT', // 转出的币种，SALPT、USDT
    moneyPwd: '', // 资金密码
    value: '', // 金额
  };
  protected rules: any = {
    pool_id: [{ required: true, message: '矿池未选择' }], // 池ID
    currency: [{ required: true, message: '币种未选择' }], // 转出的币种，SALPT、USDT
    moneyPwd: [{ required: true, message: '资金密码不能为空' }], // 资金密码
    value: [{ required: true, message: '金额不能为空' }], // 金额
  }
  // get amount(): string {
  //   const filter = this.moneyInfo.filter((el: any) => el.coin_name === this.form.currency);
  //   return filter && filter.length && filter[0].over_balance || '';
  // }
  protected submit() {
    (this as any).$refs.form.validate( async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        const res: any = await this.$post('money/transfer', {...this.form, moneyPwd: this.$util.md5(this.form.moneyPwd)});
        if (res.code == 200) {
          this.$message.success('转出成功')
        } else {
          this.$message.error('转出失败,' + res.msg);
        }
        this.loading = false;
      }
    });
  }
  protected inputBlur() {
    if (+this.form.value > +this.amount) {
      this.form.value = this.amount;
    }
  }
  protected async getPoolList() {
    const res: any = await this.$post('money/usedPoolList', {});
    if (res.code === 200) {
      this.poolList = res.result.list || [];
    } else {
      this.$message.error('获取矿池信息失败');
    }
  }
  protected async getMoneyInfo() {
    const res: any = await this.$post('money/balance', {
      currency: this.form.currency,
      pool_id: this.form.pool_id,
    });
    if (res.code === 200) {
      this.amount = +res.result.balance;
    } else {
      this.$message.error('获取资金信息失败');
    }
  }
  protected activated() {
    try {
      (this as any).$refs.form.resetFields();
    } catch(e) {}
    this.getPoolList();
    // this.getMoneyInfo();
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .wal-wrap {
    .wal {
      margin-left: 100px;
      margin-top: 50px;
      .el-select, .b-input-wrap, .el-input {
        width: 100%;
      }
    }
  }
</style>