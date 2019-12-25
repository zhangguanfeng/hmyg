/**
*  Created by   阿紫
*  On  2019/7/27 0027
*  Content   用户查询
*/
<template>
  <div class='eusc-user'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="手机号"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <sac-submit-form
        :isReset='false'
        @submitForm="query"></sac-submit-form>
    </el-form>

    <el-tabs v-model="type" type="card">
      <el-tab-pane label="列表" name="0"></el-tab-pane>
      <el-tab-pane label="树状关系" name="1"></el-tab-pane>
    </el-tabs>
    <div v-if="type ==0" class=" box">
      <sac-table :data="list">
        <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="130"></el-table-column>
        <el-table-column prop="euscAmount" label="EUSC余额" width="150"></el-table-column>
        <el-table-column prop="amount" label="理财数额" width="150"></el-table-column>
        <el-table-column prop="totalEarnings" label="总收益" width="150"></el-table-column>
        <el-table-column prop="currentEarnings" label="余下收益" width="150"></el-table-column>
        <el-table-column prop="repAmount" label="已复投" width="150"></el-table-column>
        <el-table-column prop="rePurchaseAmount" label="待复投" width="150"></el-table-column>
        <el-table-column prop="staticEarnings" label="当前静态收益" width="150"></el-table-column>
        <el-table-column prop="dynEarnings" label="当前动态收益" width="150"></el-table-column>
        <el-table-column prop="num" label="直推人数" width="150"></el-table-column>
        <el-table-column prop="incrAmount" label="增持发放" width="150"></el-table-column>
        <el-table-column prop="giveAmount" label="已发增持" width="150"></el-table-column>
        <el-table-column prop="openTime" label="开通增持时间" width="150"></el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="150"></el-table-column>
        <el-table-column prop="profitAmount" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click.native="openHold(scope.row)">开通增持</el-button>
            <el-button type="error" size="small" @click.native="closeHold(scope.row)">关闭增持</el-button>
          </template>
        </el-table-column>
      </sac-table>
      <sac-pagination v-show="list.length>0"
                      @handleChange="getPaginationChange"
                      :total="+total"
                      :page-size="filterForm.pageSize"
                      :current-page="filterForm.pageNum">
      </sac-pagination>
    </div>
    <div v-else class=" box">
      <el-tree
        v-if="treeList.length>0"
        :data="treeList"
        :load="loadNode"
        node-key="id"
        lazy>
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span>账号：<span> {{ node.phone }}</span></span>
          <span>节点奖励：<span> {{ node.nodeAmount }}</span></span>
          <span>排行奖励：<span> {{ node.sortAmount }}</span></span>
          <span>当前EUSC余额：<span> {{ node.amount }}</span></span>
          <span>邀请奖励：<span> {{ node.inviteAmount }}</span></span>
          <span>增持奖励：<span> {{ node.incrAmount }}</span></span>
          <span>当前理财数额：<span> {{ node.purchaseAmount }}</span></span>
          <span>理财收益：<span> {{ node.fAmount }}</span></span>
          <span>增持：<span> {{ node.incrState== 1 ? '已开通' : '未开通' }}</span></span>
          <span>直推人数：<span> {{ node.inviteNum }}</span></span>
          <span>注册时间：<span> {{ node.createTime }}</span></span>
        </div>
      </el-tree>
      <div v-else style="display: flex; justify-content: center; align-items: center; height: 100%;">
        {{emptyText}}
      </div>
    </div>
    <el-dialog title="开通增持" :visible.sync="dialogFormVisible" class="register_dialog">
      <div slot="header" class="modal-title">
        <h3>开通增持</h3>
        <Row>
          <Col span="6">姓名：{{ current.nickName }}</Col>
          <Col span="6">手机号：{{ current.phone }}</Col>
          <!-- <Col span="12">身份证号：655265664584</Col> -->
        </Row>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="135px">
        <el-form-item label="发放数量：" prop="amount" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.amount" placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item label="发放时间" prop="openTime">
          <el-date-picker type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期"
                          v-model="ruleForm.openTime"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmOpen" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "eusc-user",
    data() {
      return {
        type: '0',
        filterForm: {
          phone: '',
          pageNum: 1,
          pageSize: 20,
        },
        total: null,
        list: [],
        treeList: [],
        dialogFormVisible: false,
        ruleForm: {
          openTime: '',
          amount: null,
        },
        current: {},
        rules: {
          amount: [
            {required: true, message: '请输入发放数量', trigger: 'blur'},
          ],
          openTime: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ]
        },
        emptyText: '请输入手机号查询',
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
        this.$http.post("/cloud/backmgr/eusc/user/getEuscUsers", this.filterForm).then((res) => {
          this.list = res.result.page.list;
          this.total = res.result.page.total;
        })
      },
      openHold(row) {
        this.ruleForm.amount = null;
        this.ruleForm.openTime = row.openTime || row.createTime || ' 2019-01-01 00:00:00';
        this.dialogFormVisible = true;
        this.current = row;
      },
      confirmOpen() {
        const {amount, openTime} = this.ruleForm;
        const postData = {
          userId: this.current.userId,
          amount,
          openTime
        };
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post("/cloud/backmgr/eusc/incr/openhold", postData).then(res => {
              this.$Notice.success({
                title: "提示",
                desc: "开通增持成功"
              });
              this.dialogFormVisible = false;
              this.getList(1);
            });
          }
        });
      },
      closeHold(row) {
        this.$Modal.confirm({
          title: `此操作将会关闭用户增持功能`,
          content: ``,
          loading: true,
          okText: "确认关闭",
          onOk: () => {
            this.$http
              .post("/cloud/backmgr/eusc/incr/closehold", {
                userId: row.userId
              })
              .then(res => {
                this.$Notice.success({
                  title: "提示",
                  desc: "关闭增持成功"
                });
                this.$Modal.remove();
                this.getData();
              });
          }
        });
      },
      query() {
        if (this.tabsName == "list") {
          this.getList(1);
        } else {
          this.getEuscInviteUserInfo(this.filterForm.phone);
        }
      },
      async getEuscInviteUserInfo(phone) {
        const res = await this.$http.post("/cloud/backmgr/eusc/user/getEuscInviteUserInfo", {
          phone
        })
        this.treeList = res.result.list;
        this.emptyText = '暂无数据';
      },
      async loadNode(node, resolve) {
        const res = await this.$http.post("/cloud/backmgr/eusc/user/getEuscInviteUserInfo", {
          userId: node.userId
        })
        resolve(res.result.list);
      }
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less" scoped>
  .eusc-user {
    height: 100%;

   /deep/ .el-table__row {
      .cell {
        text-align: center;
      }
    }

    .box {
      height: calc(100vh - 200px);
    }

    .el-table__row {
      .cell {
        text-align: center;
      }
    }

    .modal-title {
      text-align: center;
      padding-top: 20px;

      h3 {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }
</style>
