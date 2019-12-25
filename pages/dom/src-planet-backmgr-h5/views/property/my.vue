<template>
  <div class="my-wrap">
    <div class="table">
      <vxe-table
        size="mini"
        border
        :data="data"
        max-height="100%">
        <vxe-table-column title="币种" field="coin_name" width="30%"></vxe-table-column>
        <vxe-table-column title="可用" field="over_balance" width="35%"></vxe-table-column>
        <vxe-table-column title="冻结" field="lock_balance" width="35%"></vxe-table-column>
        <!-- <vxe-table-column title="CNY估值" field="cny_balance" width="100"></vxe-table-column> -->
      </vxe-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';


@Component
export default class extends Vue {
  protected data: any = [];
  protected maxDate = new Date();
  
  protected queryForm: any = {
    date: [],
    order_no: '',
  };
  protected activated() {
    this.queryData();
  }
  protected async queryData() {
    const res: any = await this.$post('money/info');
    if (res.code === 200) {
      this.data = res.result.rows;
    } else {
      this.$notify({ type: 'danger', message: '请求数据失败' });
    }
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .my-wrap {
    @include wh();
    .table {
      width: 100%;
      // overflow: auto;
      height: calc(100%);
      .vxe-table--main-wrapper {
        height: 100%;
      }
      >div {
        // width: 1000px;
        height: 100%;;
        text-align: center;
      }
    }
  }
</style>