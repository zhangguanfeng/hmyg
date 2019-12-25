/**
*  Created by   阿紫
*  On  2019/7/27 0027
*  Content  购买理财记录
*/
<template>
    <div class='purchase'>
      <el-form :inline="true"
               label-width="90px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="用户名"
          v-model.trim="filterForm.phone"></sac-input>

        <el-form-item label="结算：">
          <el-select size="small" v-model="filterForm.settleStatus" placeholder="请选择返佣周期">
            <el-option label="全部" value=""></el-option>
            <el-option label="未结算" value="0"></el-option>
            <el-option label="已结算" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日　　期:" class="sac-time">
          <el-date-picker
            size="small"
            v-model="filterForm.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          >
          </el-date-picker>
        </el-form-item>
        <sac-submit-form
          :isReset='false'
          @submitForm="getList(1)"></sac-submit-form>
      </el-form>
      <sac-table :data="list">
        <el-table-column prop="phone" label="用户名 " align="center">
        </el-table-column>
        <el-table-column prop="recdId" label="订单id" align="center">
        </el-table-column>
        <el-table-column prop="sno" label="理财产品编号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="理财产品名称 " align="center">
        </el-table-column>
        <el-table-column prop="amount" label="购买数量 " align="center">
        </el-table-column>
        <el-table-column prop="proType" label="产品类型" align="center">
          <template slot-scope="scope">
            {{proTypeObj[scope.row.proType]}}
          </template>
        </el-table-column>
        <el-table-column prop="settleStatus" label="是否结算" align="center">
          <template slot-scope="scope">
            {{scope.row.settleStatus?'已结算':'未结算'}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="购买时间" align="center">
        </el-table-column>
        <el-table-column prop="planSettleTime" label="计划结算时间" align="center">
        </el-table-column>
        <el-table-column prop="actualSettleTime" label="实际结算时间" align="center">
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
        name: "purchase",
        data() {
            return {
              dateTime: [],
              list: [],
              total:'',
              filterForm: {
                phone: '',//用户名
                settleStatus: '',//不填表示查询所有，1表示结算，0表示未结算
                date: '',//时间，到天
                pageNum: 0,
                pageSize: 20,
              },
              settleStatusObj: {
                0: '未结算',
                1: '结算'
              },
              proTypeObj: {
                0: '活期',
                1: '定期',
                2: '刷单',
                3: '代理',
                4: 'EUSC活期',
                5: 'EUSC集合',
                6: 'EUSC定期',
                7: '集合',
              },
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
          this.$http.get("/cloud/backmgr/eusc/getEuscPurChaseRecd", this.filterForm).then((res) => {
            const {list, total} = res.result.page;
            this.list =list;
            this.total = total;
          })
        },
      },
      activated() {
        this.getList();
      }
    };
</script>
<style lang="">
    .purchase {
    }
</style>
