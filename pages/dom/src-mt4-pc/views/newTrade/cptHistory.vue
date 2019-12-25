/**
*  Created by   阿紫
*  On  2019/9/12 0012
*  Content 历史记录
*/
<template>
  <div class='cptHistory'>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="交易类型:">
        <el-select v-model="formInline.type" style="width: 100px;">
          <el-option label="全部" value="all"></el-option>
          <el-option label="买入" value="buy"></el-option>
          <el-option label="卖出" value="sell"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易品种:">
        <el-select v-model="formInline.symbol" style="width: 100px;">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,index) in allSymbols" :key="index" :label="item.symbol"
                     :value="item.symbol"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开仓时间:">
        <el-date-picker
          style="width: 250px;"
          v-model="openDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="平仓时间:">
        <el-date-picker
          style="width: 250px;"
          v-model="closeDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border
      height="100%"
      size="small"
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="symbol"
        fixed="left"
        label="交易品种">
      </el-table-column>
      <el-table-column
        prop="cmd_name"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="volume"
        label="手数">
      </el-table-column>
      <el-table-column
        prop="open_price"
        label="开仓价">
      </el-table-column>
      <el-table-column
        prop="close_price"
        label="平仓价">
      </el-table-column>
      <el-table-column
        prop="sl"
        label="止损">
      </el-table-column>
      <el-table-column
        prop="tp"
        label="止赢">
      </el-table-column>
      <el-table-column
        prop="commission"
        label="佣金">
      </el-table-column>
      <el-table-column
        prop="open_time"
        label="开仓时间">
      </el-table-column>
      <el-table-column
        prop="close_time"
        label="平仓时间">
      </el-table-column>
      <el-table-column
        prop="ticket"
        label="持仓单号">
      </el-table-column>
      <el-table-column
        prop="profit"
        fixed="right"
        label="盈亏">
        <template slot-scope="scope">
          <span style="font-weight: 700; font-size: 14px;"
                :class="{succeed: +scope.row.profit>0, deficit: scope.row.profit<0}">{{scope.row.profit}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="list.length>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formInline.page"
      :page-sizes="[30, 50, 80, 120]"
      :page-size="formInline.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import { dateFormat } from '@/common/util'

  export default {
    name: 'cptHistory',
    props: {
      allSymbols: {
        type: Array,
        default: [],
        required: true
      }
    },
    data() {
      return {
        total: 0,
        formInline: {
          page: 1,
          pageSize: 30,
          type: '',
          symbol: '',
          openStartDate: '',
          openEndDate: '',
          closeStartDate: '',
          closeEndDate: ''
        },
        openDate: [],
        closeDate: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        list: []
      }
    },
    methods: {
      handleSizeChange(val) {
        this.formInline.page = 1
        this.formInline.pageSize = val
        this.getClosedOrder()
      },
      handleCurrentChange(val) {
        this.formInline.page = val
        this.getClosedOrder()
      },
      onSubmit() {
        this.formInline.page = 1
        this.getClosedOrder()
      },
      getClosedOrder() {
        if (this.openDate.length > 0) {
          this.formInline.openStartDate = dateFormat(this.openDate[0], 'YYYY-MM-DD')
          this.formInline.openEndDate = dateFormat(this.openDate[1], 'YYYY-MM-DD')
        }
        if (this.closeDate.length > 0) {
          this.formInline.closeStartDate = dateFormat(this.closeDate[0], 'YYYY-MM-DD')
          this.formInline.closeEndDate = dateFormat(this.closeDate[1], 'YYYY-MM-DD')
        }
        this.$http.post('report/closedOrder', this.formInline).then((res) => {
          const { data, total_count } = res.data
          this.list = data
          this.total = +total_count
        })
      }
    },
    created() {
      this.getClosedOrder()
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .el-table {
    margin-top: 0 !important;

    thead {
      color: #b1b2b5;
    }

    .cell {
      text-align: center;
    }
  }

  .demo-form-inline {
    text-align: left;
  }

  .succeed {
    color: #00aa6d;
  }

  .deficit {
    color: red;
  }

  .cptHistory {
    display: flex;
    flex-direction: column;

    /deep/ .el-form-item__label {
      :root .theme-dark & {
        color: #576590;
      }
    }

    /deep/ .el-input__inner {
      border-radius: 4px;
      text-align: left;
      border-color: #A5ADC4;
      color: #697797;
      background: #fff;

      &:focus {
        border-color: $color;
      }
    }
  }

  :root .theme-dark {
    .cptHistory {
      background: $color-dark-bg;
    }

    .el-form {
      /deep/ .el-input__inner {
        border-color: #384266;
        background: $color-dark-bg;
        color: #B4C5F7;

        &:focus {
          border-color: #5d5ed6;
        }
      }

      /deep/ .el-select .el-input .el-select__caret {
        color: #576590;
      }

      /deep/ .el-range-input {
        background: $color-dark-bg;
        color: #B4C5F7;
      }

      /deep/ .el-range-separator {
        color: #576590;
      }

      /deep/ .el-button {
        background: #5171d2;
        border-color: #5171d2;
        color: #fff;

        &:hover, &:focus {
          border-color: #5171d2 !important;
          background: #5171d2 !important;
        }
      }

      /deep/ .el-input__icon {
        color: #576590;
      }
    }

    .el-table {
      color: #B4C5F7;
      border-color: #434F6A;
      background-color: $color-dark-bg;

      &:before, &:after {
        background-color: #434F6A;
      }


      /deep/ thead {
        color: #434F6A;
      }

      /deep/ th {
        background-color: #1B1F31;
      }

      /deep/ tr {
        background-color: $color-dark-bg;
      }

      /deep/ td {
        color: #B4C5F7;
        border-color: #434F6A;
        background-color: $color-dark-bg;
      }

      /deep/ th.is-leaf {
        border-color: #434F6A;
      }

      /deep/ .hover-row {
        td {
          background-color: #1B1F31;
        }
      }

      /deep/ .el-table__fixed::before, /deep/ .el-table__fixed-right::before {
        background-color: #434F6A;
      }
    }

    .el-pagination {
      /deep/ .el-pagination__total {
        color: #576590;
      }

      /deep/ .el-pagination__sizes {
        .el-input__inner {
          background-color: $color-dark-bg;
          border-color: #384266;
          color: #576590;

          &:focus {
            border-color: #5d5ed6;
          }
        }

        .el-select .el-input .el-select__caret {
          color: #576590;
        }
      }

      /deep/ button:disabled {
        background-color: $color-dark-bg;
        color: #576590;
      }

      /deep/ .el-pager li {
        background-color: $color-dark-bg;
        color: #576590;

        &.active {
          color: #B4C5F7;
        }
      }

      /deep/ .btn-prev, /deep/ .btn-next {
        background-color: $color-dark-bg;
        color: #B4C5F7;
      }

      /deep/ .el-pagination__jump {
        color: #576590;
      }

      /deep/ .el-input__inner {
        background-color: $color-dark-bg;
        color: #576590;
        border-color: #384266;
        text-align: center;

        &:focus {
          border-color: #5d5ed6;
        }
      }
    }
  }

</style>
