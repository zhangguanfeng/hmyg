<template>
  <div class="proxy-my-wrap">
    <el-table class="table" :data="moneyInfo" v-loading="loading">
      <el-table-column label="币种" prop="coin_name" sortable></el-table-column>
      <el-table-column label="可用" prop="over_balance" sortable></el-table-column>
      <el-table-column label="冻结" prop="lock_balance" sortable></el-table-column>
      <!-- <el-table-column label="CNY估值" prop="cny_balance" sortable></el-table-column> -->
    </el-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProxyMy extends Vue {
  protected  moneyInfo: any = [];
  protected loading: boolean = false;
  protected async getMoneyInfo() {
    this.loading = true;
    const res: any = await this.$post('money/info');
    if (res.code === 200) {
      this.moneyInfo = res.result.rows;
    } else {
      this.$message.error('获取资金信息失败');
    }
    this.loading = false;
  }
  protected activated() {
    this.getMoneyInfo();
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .proxy-my-wrap {
    .table {
       * {
        font-size: 12px !important;
        color: #666;
      }
    }
  }
</style>