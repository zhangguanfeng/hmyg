<template>
  <div class="clear-wrap" :style="{height: height - 50 + 'px'}">
    <div class="filter">
      <div class="form-item">
        <img src="/img/date.png"  alt="">
        <van-field :border="true" clearable v-model="queryForm.order_no" placeholder="请输入订单号">
        </van-field>
      </div>
      <div class="form-item">
        <img src="/img/search.png"  alt="">
          <van-field :disabled="true" @click.native.stop="show=true" :border="true" v-model="statusText" placeholder="请选择状态">
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
        max-height="100%">en
        <vxe-table-column title="序列" field="index" width="70" fixed="left"></vxe-table-column>
        <vxe-table-column title="解冻时间" field="CREATED_AT" width="180"></vxe-table-column>
        <vxe-table-column title="解冻币种" field="CURRENCY" width="100"></vxe-table-column>
        <vxe-table-column title="解冻数量" field="USDT_NUMBER" width="100"></vxe-table-column>
        <vxe-table-column title="解冻类型" field="OPERATE_TYPE_TEXT" width="110"></vxe-table-column>
        <vxe-table-column title="状态" field="STATUS" width="120"></vxe-table-column>
        <vxe-table-column title="手续费" field="HANDING_FEE" width="100"></vxe-table-column>
      </vxe-table>
    </div>
    <van-pagination
      v-model="page" 
      :total-items="total" 
      :items-per-page="rows"
      :show-page-size="3" 
      force-ellipses
    />
    <van-popup :style="{width: width + 'px', transform: `translateX(80%)`}" v-model="show" position="bottom">
      <van-picker
        v-show="show"
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


@Component
export default class extends Vue {
  protected statusText: string = '';
  protected show: boolean = false;
  protected total: number = 0;
  protected page: number = 1;
  protected rows: number = 30;
  protected pickerType: string = '';
  protected loading: boolean = false;
  protected data: any = [];
  protected maxDate = new Date();
  protected readonly statuss: {[key: string]: string}[] = [
    // { label: '全部', value: '' },
    { label: '解冻中', value: '100' },
    { label: '解冻失败', value: '201' },
    { label: '解冻成功', value: '200' },
  ];
  protected queryForm: any = {
    date: [],
    order_no: '',
    status: '',
  };
  protected get height() {
    return document.documentElement.offsetHeight;
  }
  protected get width() {
    return document.documentElement.offsetWidth;
  }
  @Watch('page')
  protected pageChange() {
    this.queryData();
  }
  protected  onChange() {

  }
  protected confirm(item: {label: string, value: string}) {
    this.statusText = item.label;
    this.queryForm.status = item.value;
    this.page = 1;
    this.show = false;
    this.queryData();
  }
  protected cancel() {
    this.statusText = '';
    this.queryForm.status = '';
    this.show = false;
    this.queryData(true);
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
    const res: any = await this.$post('JournaLing/ReportWithdrawal', {
    	currency: 'SALPT',
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
  .clear-wrap {
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
    .table {
      width: 100%;
      // overflow: auto;
      height: calc(100% - 225px);
      >div {
        // width: 1000px;
        height: 100%;;
        text-align: center;
      }
    }
  }
</style>