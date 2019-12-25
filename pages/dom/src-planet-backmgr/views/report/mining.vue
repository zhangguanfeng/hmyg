<template>
  <div class="mining-wrap">
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
        <BInput type="int" placeholder="按照订单号查询" style="width: 200px" size="small" id="order_no" v-model="queryForm.order_no"/>
      </div>
      <div class="form-item">
        <label for="type">
          类型:
        </label>
        <BInput type="select" @change="queryData(true)" placeholder="按类型查询" :options="statuss" style="width: 200px" size="small" id="type" v-model="queryForm.commission_type"/>
      </div>
      <div class="form-item">
        <el-button type="primary" v-loading="loading" class="button primary-btn" @click="queryData(true)" size="small">查询</el-button>
      </div>
    </div>
    <el-table class="table" :data="data" size="mini" v-loading="loading" ref="table" height="calc(100% - 40px)">
      <el-table-column label="序列" prop="" type="index" width="80">
        <template slot-scope="scope">{{scope.$index + 1 + page * rows - rows}}</template>
      </el-table-column>
      <el-table-column label="订单号" prop="SERIAL_NO" min-width="140"></el-table-column>
      <el-table-column label="收益类型" prop="COMMISSION_TYPE" min-width="80"></el-table-column>
      <el-table-column label="USDT量化包" prop="BALANCE" min-width="130"></el-table-column>
      <el-table-column label="收益比" prop="RATE" min-width="100">
        <template slot-scope="scope">
          {{+scope.row.RATE * 100}}
        </template>
      </el-table-column>
      <el-table-column label="收益数量" prop="AMOUNT" min-width="150"></el-table-column>
      <el-table-column label="时间" prop="CREATED_AT" min-width="150"></el-table-column>
      <el-table-column label="产品类型" prop="POOL_NAME" min-width="120"></el-table-column>
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
import { Vue, Component } from 'vue-property-decorator';
import Page from '@/mixin/page.js';

@Component({
  mixins: [ Page ],
})
export default class Mining extends Vue {
  protected loading: boolean = false;
  protected data: any = [];
  protected statuss: any = [];
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
  protected queryForm: any = {
    date: [],
    order_no: '',
    commission_type: '',
  };
  protected async queryData(flag?: boolean) {
    if (flag) {
      this.page = 1;
    }
    this.loading = true;
    const res: any = await this.$post('JournaLing/ReportCommission', {
      page: this.page,
      rows: this.rows,
      ...this.queryForm,
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
      this.statuss = res.result;
    } else {
      this.$message.error('获取类型失败');
    }
  }
  protected activated() {
    this.getTypes();
    this.queryData();
  }
 }
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .mining-wrap {
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