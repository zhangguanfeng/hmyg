<template>
  <div class="clear-wrap">
    <el-tabs style="width: 100%" v-model="currency">
      <el-tab-pane label="提取量化包" name="USDT"></el-tab-pane>
      <el-tab-pane label="提取收益" name="SALPT"></el-tab-pane>
    </el-tabs>
    <div class="filters">
      <div class="form-item">
        <label for="date">
          开始日期:
        </label>
        <el-date-picker
          id="date"
          style="width: 240px"
          v-model="queryForm.date"
          type="daterange"
          clearable
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="queryData(true)"
           :picker-options="pickerOptions"
          size="small">
        </el-date-picker>
      </div>
      <div class="form-item">
        <label for="order_no">
          订单号:
        </label>
        <BInput type="int" clearable placeholder="按照订单号查询" style="width: 200px" size="small" id="order_no" v-model="queryForm.order_no"/>
      </div>
      <!-- <div class="form-item">
        <label for="type">
          类型:
        </label>
        <BInput type="select" @change="queryData(true)" placeholder="按类型查询" :options="commissiontTypes" style="width: 200px" size="small" id="type" v-model="queryForm.commission_type"/>
      </div> -->
      <div class="form-item">
        <label for="order_no">
          状态:
        </label>
        <el-select clearable v-model="queryForm.status" size="small" placeholder="按照状态查询" @change="queryData(true)">
          <el-option
            v-for="(item, key) in statuss"
            :key="key"
            :value="item.value"
            :label="item.label"></el-option>
        </el-select>
      </div>
      <div class="form-item">
        <el-button type="primary" v-loading="loading" class="button primary-btn" @click="queryData(true)" size="small">查询</el-button>
      </div>
    </div>
    <el-table class="table" :data="data" v-loading="loading" ref="table" height="calc(100% - 40px)">
      <el-table-column label="序列" prop="" type="index" width="80">
        <template slot-scope="scope">{{scope.$index + 1 + page * rows - rows}}</template>
      </el-table-column>
      <el-table-column label="提取时间" prop="CREATED_AT" min-width="130"></el-table-column>
      <el-table-column label="提取类型" prop="CURRENCY"></el-table-column>
      <el-table-column label="提取数量" prop="USDT_NUMBER"></el-table-column>
      <!-- <el-table-column label="解锁类型" prop="OPERATE_TYPE_TEXT" min-width="130"></el-table-column> -->
      <el-table-column label="状态" prop="STATUS"></el-table-column>
      <el-table-column label="手续费" prop="HANDING_FEE"></el-table-column>
      <el-table-column label="到账数量" prop="AMOUNT_RECEIVE" ></el-table-column>
    </el-table>
    <BPage
      :total="total"
      :current-page="page"
      :page-size="rows"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Page from '@/mixin/page.js';

@Component({
  mixins: [ Page ],
})
export default class Clear extends Vue {
  protected currency: string = 'USDT';
  protected data: any = [];
  protected commissiontTypes: any = [];
  protected queryForm: any = {
    date: [],
    order_no: '',
    status: '',
    // commission_type: '',
  };
  @Watch('currency')
  protected currencyChange() {
    this.queryData(true);
  }
  protected readonly statuss: {[key: string]: string}[] = [
    { label: '全部', value: '' },
    { label: '提取中', value: '100' },
    { label: '提取失败', value: '201' },
    { label: '提取成功', value: '200' },
    // { label: '全部', value: '' },
    // { label: '解冻中', value: '100' },
    // { label: '解冻失败', value: '201' },
    // { label: '解冻成功', value: '200' },
  ];
  protected loading: boolean = false;
  protected readonly pickerOptions: any = {
    shortcuts: [{
      text: '最近一周',
      onClick(picker: Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker: Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker: Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近半年',
      onClick(picker: Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
        picker.$emit('pick', [start, end]);
      }
    }],
    disabledDate(date: Date) {
      return +date >= +new Date();
    }
  };
  protected async queryData(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.loading = true;
    const res: any = await this.$post('JournaLing/ReportWithdrawal', {
      page: this.page,
      rows: this.rows,
      ...this.queryForm,
      currency: this.currency,
      date: this.queryForm.date.length ? this.queryForm.date.join('-') : '',
    });
    if (res.code == 200) {
      const { result } = res;
      this.total = +result.total_count;
      this.data = result.data || [];
    } else {
      this.$message.error('请求数据失败');
    }
    this.loading = false;
  }
  protected async getTypes() {
    const res: any = await this.$post('JournaLing/commissionType');
    if (res.code === 200) {
      res.result.forEach((el: any) => {
        el.label = el.commission_name;
        el.value = el.commission_type;
      })
      this.commissiontTypes = res.result;
    } else {
      this.$message.error('获取类型失败');
    }
  }
  protected activated() {
    // this.getTypes();
    this.queryData();
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .clear-wrap {
    @include wh();
    @include flex(column, flex-start);
    .table {
       * {
        font-size: 12px !important;
        color: #666;
      }
    }
    .filters {
      width: 100%;
      min-height: 40px;
      @include flex(row, flex-start);
      flex-wrap: wrap;
      .form-item {
        label {
          width: 90px;
          padding: 5px 6px;
          text-align: right;
          font-size: 14px;
        }
        padding: 5px 0;
        @include flex();
        .button {
          margin-left: 20px;
          padding: 8px 30px;
        }
      }
    }
  }
</style>