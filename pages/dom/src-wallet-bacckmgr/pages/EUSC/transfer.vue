/**
*  Created by   阿紫
*  On  2019/8/6 0006
*  Content 转账记录
*/
<template>
  <div class='transfer'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="付款方："
        v-model.trim="filterForm.phone"></sac-input>
      <sac-input
        ref="targetPhone"
        label="收款方："
        v-model.trim="filterForm.targetPhone"></sac-input>
      <el-form-item label="交易状态：">
        <el-select size="small" v-model="filterForm.recdStatus" placeholder="请选择交易状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="失败" value="0"></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="待审核" value="2"></el-option>
          <el-option label="审核不通过" value="3"></el-option>
          <el-option label="审核通过" value="4"></el-option>
          <el-option label="处理中/待支付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间：" style="margin-right: 30px;">
        <el-date-picker type="datetimerange" placeholder="选择日期" v-model="date" style="width:360px;"></el-date-picker>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="getData(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="list">
      <el-table-column prop="recdId" label="订单号" align="center">
      </el-table-column>
      <el-table-column prop="fromUser" label="付款方 " align="center">
      </el-table-column>
      <el-table-column prop="targetUserId" label="收款方id" align="center">
        <!--        <template slot-scope="scope">-->
        <!--          {{scope.row.coin_id}}-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="targetUser" label="收款方 " align="center">
      </el-table-column>
      <el-table-column prop="transTypeStr" label="类型 " align="center">
      </el-table-column>
      <el-table-column prop="recdStatus" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="时间" align="center">
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
    name: "transfer",
    data() {
      return {
        date: '',
        filterForm: {
          pageSize: 20,
          pageNum: 1,
          phone: '', // 用户手机号
          targetPhone: '', // 收款方手机号
          beginTime: '', // 日期，数字格式，例如：20190730
          endTime: '',
          recdStatus: '', // 0-失败,1-成功(定期去区块链轮询),2-待审核,3-审核不通过,4-审核通过,5-处理中/待支付
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
        if (this.date[0]) {
          this.filterForm.beginTime = dateFormat(this.date[0], 'YYYY-MM-DD HH:mm:ss');
          this.filterForm.endTime = dateFormat(this.date[1], 'YYYY-MM-DD HH:mm:ss');
        }
        this.$http.get("/cloud/backmgr/eusc/getEuscTransferRecd", this.filterForm).then(res => {
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
  .transfer {
    .el-table__row {
      .cell {
        text-align: center;
      }
    }
  }
</style>
