<template>
  <div class="load-wrap" :style="{height: height - 50 + 'px'}">
    <div class="filter">
      <div class="form-item">
        <img src="/img/date.png"  alt="">
        <van-field :border="true" clearable v-model="queryForm.order_no" placeholder="请输入订单号">
        </van-field>
      </div>
      <div class="form-item">
        <img src="/img/time.png"  alt="">
        <van-field @click.native="pickerDate('start')" :disabled="true" class="date-picker" :border="true" v-model="queryForm.date[0]" placeholder="开始时间"></van-field>
        <span class="text">
          至
        </span>
        <van-field @click.native="pickerDate('end')" :disabled="true" class="date-picker" :border="true" v-model="queryForm.date[1]" placeholder="结束时间"></van-field>
      </div>
    </div>
    <div class="button">
      <span @click="queryData(true)">查询</span>
    </div>
    <div class="table">
      <vxe-table
        size="mini"
        border
        :data="data"
        max-height="100%">
        <vxe-table-column title="序列" field="index" width="70" fixed="left"></vxe-table-column>
        <vxe-table-column title="USDT理财包" field="USDT_NUMBER" width="120"></vxe-table-column>
        <vxe-table-column title="用户编号" field="ACCEPTANT_CODE" width="100"></vxe-table-column>
        <vxe-table-column title="状态" field="STATUS" width="100"></vxe-table-column>
        <vxe-table-column title="时间" field="CREATED_AT" width="180"></vxe-table-column>
        <vxe-table-column title="From地址" field="FROM_ADDRESS" width="120"></vxe-table-column>
        <vxe-table-column title="To地址" field="TO_ADDRESS" width="100"></vxe-table-column>
        <vxe-table-column title="产品类型" field="PRODUCT_TYPE" width="120"></vxe-table-column>
      </vxe-table>
    </div>
    <van-pagination
      v-model="page"
      :total-items="total"
      :items-per-page="rows"
      :show-page-size="3"
      force-ellipses
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';


@Component
export default class extends Vue {
  protected total: number = 0;
  protected page: number = 1;
  protected rows: number = 30;
  protected pickerType: string = '';
  protected loading: boolean = false;
  protected data: any = [];
  protected maxDate = new Date();

  protected queryForm: any = {
    date: [],
    order_no: '',
  };
  @Watch('page')
  protected pageChange() {
    this.queryData();
  }
  protected get height() {
    return document.documentElement.offsetHeight;
  }
  protected pickerDate(type: string) {
    this.$store.commit('showDateSelect', true);
  }
  protected dateChange(date: string[]) {
    this.queryForm.date = date;
    this.queryData();
  }
  protected activated() {
    this.queryData();
    this.$root.$on('dateDelectChange', this.dateChange);
  }
  protected deactivated() {
    this.$root.$off('dateDelectChange', this.dateChange);
  }
  protected async queryData(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.loading = true;
    this.data = [];
    const res: any = await this.$post('JournaLing/ReportDeposit', {
      page: this.page,
      rows: this.rows,
      ...this.queryForm,
      date: this.queryForm.date.length ? this.queryForm.date.join('-') : '',
    });
    if (res.code == 200) {
      const { result } = res;
      this.total = +result.total_count;
      result.data.forEach((el: any, idx: number) => {
        el.index = this.page * this.rows - this.rows + 1 + idx
      });
      this.data = result.data || [];
    } else {
      this.$notify({ type: 'danger', message: '请求数据失败' });
    }
    this.loading = false;
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .load-wrap {
    @include wh();
    .filter {
      width: calc(100% - 40px);
      padding: 5px 20px 0px 20px;
      .form-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .van-field {
          border: 1px solid rgba(230,230,230,1);
          padding: 5px 10px;
        }
        .date-picker {
          width: calc(50% - 35px);
        }
        .text {
          flex: 1;
          text-align: center;
          color: #999;
        }
        >img {
          width: 20px;;
          padding: 0 10px 0 0;
        }
      }
    }
    .button {
      width: calc(100% - 40px);
      @include flex(row, flex-end);
      span {
        padding: 5px 30px;
        background: #39C6B4;
        border-radius: 4px;
        color: #fff;
      }
      padding: 0 0 10px 20px;
    }
    .table {
      width: 100%;
      // overflow: auto;
      height: calc(100% - 180px);
      >div {
        // width: 1000px;
        height: 100%;;
        text-align: center;
      }
    }
  }
</style>
