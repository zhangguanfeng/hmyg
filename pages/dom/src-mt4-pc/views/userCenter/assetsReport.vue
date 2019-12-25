/**
*  Created by   阿紫
*  On  2019-03-11
*  Content 资产明细
*/
<template>
  <div class="assetsReport">
    <div class="title">
      {{$t('userCenterMenu[0]')}}
      <el-form :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item :label="$t('assetsReport[1]')+'：'" style="margin-right:30px;">
          <el-select v-model="filterForm.money_type" placeholder="请选择类型" size="small" style="width:120px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="入金" value="1"></el-option>
            <el-option label="出金" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            v-model="date"
            size="small"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getAsset">{{$t('transactionRecords.title[3]')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="totalAmount" :label="$t('assetsReport[0]')"></el-table-column>
      <el-table-column prop="availableAmount" :label="$t('assetsReport[1]')"></el-table-column>
      <el-table-column prop="frozenAmount" :label="$t('assetsReport[2]')"></el-table-column>
      <el-table-column prop="frozenAmount" :label="$t('assetsReport[3]')"></el-table-column>
    </el-table>
    <jk-pagination
      v-show="list.length>0"
      @handleChange="getPaginationChange"
      :total="+total"
      :page-size="filterForm.pageSize"
      :current-page="filterForm.pageNum"
    ></jk-pagination>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Clipboard from 'clipboard'
  import QRCode from 'qrcode'

  export default {
    name: 'assetsReport',
    data() {
      return {
        total: 0,
        list: [],
        date:[],
        filterForm: {
          pageSize: 10,
          page: 0,
          startDate: '',
          endDate: '',
          money_type: ''
        },
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
        }
      }
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val
        this.filterForm.page = (currentPage - 1) * val
        this.getAsset()
      },
      getAsset() {
        this.filterForm.startDate = this.date[0];
        this.filterForm.endDate = this.date[1];
        this.$http.post('Report/CommissionRecord', this.filterForm)
          .then((res) => {
            const { total_page, data } = res.data
            this.total = res.total_page
            this.list = data
          })
      },
    },
    activated() {
      this.getAsset()
      new Clipboard('.copy')
    }
  }
</script>
<style lang="scss">
  .assetsReport {
    text-align: left;
    background: #fff;
    padding: 20px;

    .title {
      color: #404040;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .demo-form-inline {
      text-align: right;
    }

    .el-table {
      .cell {
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }

  .el-dialog {
    .tips {
      border-top: 1px solid #ebebeb;
      margint-top: 50px;
      text-align: left;
      padding: 10px;

      li {
        font-size: 14px;
        line-height: 30px;
      }
    }

    .addressImg {
      text-align: center;

      img {
        width: 128px;
        height: 128px;
      }
    }


    .demo-ruleForm {
      margin: 40px 0;

      .el-select {
        width: 100%;
      }
    }

    .el-input__suffix {
      display: flex;
      align-items: center;
      cursor: pointer;

      &-inner {
        display: flex;
        align-items: center;
      }

      .all-proposed {
        color: #284ee5;
        padding: 0 20px;

        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 1px;
          height: 24px;
          background: #c8cde6;
        }
      }
    }

  }
</style>
