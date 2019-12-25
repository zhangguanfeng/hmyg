/**
*  Created by   阿紫
*  On  2019/7/25 0025
*  Content 返佣记录
*/
<template>
  <div class='record-list'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="账号"
        v-model.trim="filterForm.phone"></sac-input>
      <sac-input
        ref="userId"
        label="用户ID"
        v-model.trim="filterForm.userId"></sac-input>
      <sac-coin ref="coinId"  v-model="filterForm.coinId"></sac-coin>
      <el-form-item label="返佣周期">
        <el-select size="small" v-model="filterForm.type" placeholder="请选择返佣周期">
          <el-option label="全部" value=""></el-option>
          <el-option label="每日" value="1"></el-option>
          <el-option label="每周" value="2"></el-option>
          <el-option label="每月" value="3"></el-option>
        </el-select>
      </el-form-item>
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
        @submitForm="getList(0)"></sac-submit-form>
    </el-form>
    <sac-table :data="list">
      <el-table-column prop="phone" label="账号 " align="center">
      </el-table-column>
      <el-table-column prop="lowId" label="返佣用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="coinName" label="币种名称 " align="center">
      </el-table-column>
      <el-table-column prop="amount" label="数量 " align="center">
      </el-table-column>
      <el-table-column prop="returnTime" label="返佣周期" align="center">
        <template slot-scope="scope">
          {{timeListObj[scope.row.returnTime]}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
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
  export default {
    name: "record-list",
    data() {
      return {
        dateTime: [],
        list: [],
        total:'',
        filterForm: {
          userId: '',
          phone: '',
          coinId: '',
          type: '',
          startTime: '',
          endTime: '',
          pageNum: 0,
          pageSize: 20,
        },
        timeListObj: {
          1: "每日",
          2: "每周",
          3: "每月",
        }
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
        this.$http.post("/cloud/backmgr/agency/queryAgencyRecordList", this.filterForm).then((res) => {
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
<style lang="">
  .record-list {
  }
</style>
