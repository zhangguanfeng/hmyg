/**
*  Created by   阿紫
*  On  2019/7/27 0027
*  Content 奖励记录
*/
<template>
  <div class='eusc-record'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="用户名"
        v-model.trim="filterForm.phone"></sac-input>
      <el-form-item label="币  种：" prop="coinId" size="small" class="from_box_item">
        <el-select v-model="filterForm.coinId" placeholder="请选择币种">
          <el-option
            v-for="item in coinList"
            :key="item.coinId"
            :label="item.coinName"
            :value="item.coinId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖励类型：">
        <el-select size="small" v-model="filterForm.ptype" placeholder="请选择奖励状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="节点奖励" value="2"></el-option>
          <el-option label="推广奖励" value="3"></el-option>
          <el-option label="排行榜奖励" value="4"></el-option>
          <el-option label="合约奖励" value="5"></el-option>
          <el-option label="增持奖励" value="6"></el-option>
        </el-select>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="getData(1)"></sac-submit-form>
    </el-form>
    <sac-table :data="list">
      <el-table-column prop="phone" label="用户账户" align="center">
      </el-table-column>
      <el-table-column prop="customer_id" label="用户ID " align="center">
      </el-table-column>
      <el-table-column prop="coin_id" label="币种" align="center">
        <template slot-scope="scope">
          {{scope.row.coin_id | filterCoin}}
        </template>
      </el-table-column>
      <el-table-column prop="ptypeName" label="奖励类型 " align="center">
      </el-table-column>
      <el-table-column prop="fromPhone" label="奖励来源 " align="center">
      </el-table-column>
      <el-table-column prop="amount" label="总额" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center">
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
    name: "eusc-record",
    data() {
      return {
        filterForm: {
          phone: '',
          coinId: '',
          pageNum: 1, //已过滤多少条
          pageSize: 20, //每页条数
          ptype: "", //状态，2节点奖励，3推广奖励，4排行榜奖励,5合约奖励，6表示增持奖励
        },
        list: [],
        total: null,
        coinList: []
      };
    },
    filters: {
      filterCoin: function (value) {
        if (!value) return ''
        this.coinList.filter(v => {
          if (id == v.coinId) {
            return v.coinName;
          }
        });
      }
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
        this.$http.get("/cloud/backmgr/eusc/prize/getPrizeList", this.filterForm).then(res => {
          this.list = res.result.page.list
          this.total = parseInt(res.result.page.total)
        });
      },
      getSampleCoinInfo() {
        this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
          this.coinList = res.result.list
        })
      },
    },
    async activated() {
      await this.getSampleCoinInfo();
      this.getData()
    }
  };
</script>
<style lang="less">
  .eusc-record {
    .el-table__row {
      .cell {
        text-align: center;
      }
    }
  }
</style>
