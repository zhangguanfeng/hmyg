/**
*  Created by   阿紫
*  On  2019/7/11 0011
*  Content  刷单记录列表
*/
<template>
  <div class='log'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="账号"
        v-model.trim="filterForm.userId"
        prop="phone"></sac-input>
      <el-form-item label="日　　期:" class="sac-time">
        <el-date-picker
          size="small"
          v-model="dateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="getList(1)"></sac-submit-form>
    </el-form>

    <el-tabs v-model="filterForm.type" type="card" @tab-click="getList(1)">
      <el-tab-pane label="挖宝" name="0"></el-tab-pane>
      <el-tab-pane label="返佣" name="1"></el-tab-pane>
    </el-tabs>

    <sac-table :data="list">
      <el-table-column prop="userId" label="账号"></el-table-column>
      <el-table-column  prop="profitAmount" label="收益量">
        <template slot-scope="scope">
          {{ scope.row.profitAmount }} {{scope.row.profitCoinName }}
        </template>
      </el-table-column>
      <el-table-column  prop="brushUserId" label="刷单用户"></el-table-column>
      <el-table-column   prop="amount" label="刷单量"></el-table-column>
      <el-table-column prop="createTime" label="时间"></el-table-column>
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
  export default {
    name: "log",
    data() {
      return {
        filterForm: {
          userId: '',
          type: '', // 0代理 1直推
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20,
        },
        total: null,
        list: [],
        dateTime: [],
      };
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.getList();
      },
      getList(pageNum) {
        pageNum && (this.filterForm.pageNum = pageNum);
        this.filterForm.startTime = this.dateTime && this.dateTime[0];
        this.filterForm.endTime = this.dateTime && this.dateTime[1];
        this.$http.post("/cloud/backmgr/shop/listAgencyLog", this.filterForm).then((res) => {
          this.list = res.result.list;
          this.total = res.result.count;
        })
      },
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less">
  .log {
    .el-table__row {
      .cell {
        text-align: center;
      }
    }
  }
</style>
