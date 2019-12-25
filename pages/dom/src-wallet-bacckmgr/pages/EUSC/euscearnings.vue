/**
*  Created by   阿紫
*  On  2019/8/6 0006
*  Content 静态收益
*/
<template>
    <div class='euscearnings'>
      <el-form :inline="true"
               label-width="90px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="用户名"
          v-model.trim="filterForm.phone"></sac-input>
        <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
        <el-form-item label="奖励类型：">
          <el-select size="small" v-model="filterForm.type" placeholder="请选择奖励状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="活期" value="0"></el-option>
            <el-option label="定期" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <sac-submit-form
          :isReset='false'
          @submitForm="getData(1)"></sac-submit-form>
      </el-form>
      <sac-table :data="list">
        <el-table-column prop="phone" label="用户账户" align="center">
        </el-table-column>
        <el-table-column prop="userId" label="用户ID " align="center">
        </el-table-column>
        <el-table-column prop="coinName" label="收益币种" align="center">
          <!--        <template slot-scope="scope">-->
          <!--          {{scope.row.coin_id}}-->
          <!--        </template>-->
        </el-table-column>
        <el-table-column prop="amount" label="收益数量 " align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="收益时间 " align="center">
        </el-table-column>
        <el-table-column prop="proName" label="产品名称" align="center">
        </el-table-column>
      </sac-table>
      <sac-pagination v-show="list.length>0"
                      @handleChange="getPaginationChange"
                      :total="+total"
                      :page-size="filterForm.pageSize"
                      :current-page="filterForm.pageNum">
      </sac-pagination>
    </div>
</template>
<script>
  import { dateFormat } from '@/common/util';

    export default {
        name: "euscearnings",
        data() {
            return {
              date:'',
              filterForm: {
                phone: '',
                coinId: '',
                pageNum: 1, //已过滤多少条
                pageSize: 20, //每页条数
                date: '', // 日期，数字格式，例如：20190730
                type: '', // 类型 0为活期，1为定期，不填为全部
              },
              list: [],
              total: null,
            };
        },
      methods: {
        //修改每页条数
        getPaginationChange(val, currentPage) {
          this.filterForm.pageSize = val;
          this.filterForm.pageNum = currentPage;
          this.getData();
        },
        getData(pageNum) {
          pageNum && (this.filterForm.pageNum = 1);
          this.filterForm.date = dateFormat(this.date, 'YYYYMMDD');
          this.$http.get("/cloud/backmgr/eusc/getEuscEarningsRecd", this.filterForm).then(res => {
            this.list = res.result.page.list
            this.total = parseInt(res.result.page.total)
          });
        },
      },
      activated() {
        this.getData()
      }
    };
</script>
<style lang="less">
    .euscearnings {
      .el-table__row {
        .cell {
          text-align: center;
        }
      }
    }
</style>
