/**
*  Created by   阿紫
*  On  2019/7/27 0027
*  Content 奖励审核
*/
<template>
  <div class='eusc-audit'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="用户名"
        v-model.trim="filterForm.phone"></sac-input>
      <el-form-item label="状态：">
        <el-select size="small" v-model="filterForm.status" placeholder="请选状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value="0"></el-option>
          <el-option label="发放中" value="1"></el-option>
          <el-option label="发放完成" value="2"></el-option>
          <el-option label="审核拒绝" value="3"></el-option>
        </el-select>
      </el-form-item>
      <sac-submit-form
        :isReset='false'
        @submitForm="getData(1)"></sac-submit-form>
      <el-form-item>
        <el-button size="small" type="primary" @click="addSend">创建规则</el-button>
      </el-form-item>
    </el-form>
    <sac-table :data="list">
      <el-table-column prop="userId" label="用户ID " align="center">
      </el-table-column>
      <el-table-column prop="phone" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态 " align="center">
        <template slot-scope="scope">
          {{statusObj[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="总额 " align="center">
      </el-table-column>
      <el-table-column prop="remainAmount" label="待发余额" align="center">
      </el-table-column>
      <el-table-column prop="reason" label="EUSC合约" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="primary" size="small"
                     v-if="scope.row.status==0"
                     @click.native="goAudit(scope.row.id, true)">通过
          </el-button>
          <el-button type="danger" size="small"
                     v-if="scope.row.status==0"
                     @click.native="goAudit(scope.row.id, 'false')">驳回
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="register_dialog">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="135px">
        <el-form-item label="发放账户：" prop="account" class="from_box_item">
          <el-input type="text" size="small" v-model="ruleForm.account" placeholder="请输入发放账户"></el-input>
        </el-form-item>
        <el-form-item label="发放规则：" prop="configId" size="small" class="from_box_item">
          <el-select v-model="ruleForm.configId" placeholder="请选择发放规则">
            <el-option
              v-for="item in ruleList"
              :key="item.coinId"
              :label="item.coinName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放数量：" prop="amount" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.amount" placeholder="请输入发放数量">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registDetermine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "eusc-audit",
    data() {
      return {
        filterForm: {
          pageNum: 1, //已过滤多少条
          pageSize: 20, //每页条数
          phone: '',
          status: '', //状态，0-待审核，1-发放中，2-发放完成，3-审核拒绝
        },
        statusObj: {
          0: '待审核',
          1: '发放中',
          2: '发放完成',
          3: '审核拒绝',
        },
        ruleList: [],
        list: [],
        total: null,
        dialogTitle: '',
        dialogFormVisible: false,
        ruleForm: {
          account: '', // 用户账号
          configId: '', // 活动配置id
          amount: '', // 发放数量
        },
        rules: {
          account: [
            {required: true, message: '请输入发放账户', trigger: 'change'},
          ],
          configId: [
            {required: true, message: '请选择发放规则', trigger: 'change'},
          ],
          amount: [
            {required: true, message: '请输入发放数量', trigger: 'blur'},
          ],
        },
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
        this.$http.post("/cloud/backmgr/eusc/award/list", this.filterForm).then(res => {
          this.list = res.result.pageInfo.list
          this.total = parseInt(res.result.pageInfo.total)
        });
      },
      // 通过审核
      goAudit(recdId, isPass) {
        console.log(recdId, isPass, 777);
        this.$http.post('/cloud/backmgr/eusc/award/check', {
          recdId,
          isPass: isPass
        }).then(res => {
          this.getData();
          this.$Notice.success({
            title: '审核',
            desc: isPass ? '审核成功' : '驳回成功 '
          });
        })
      },
      addSend() {
        this.dialogTitle = '新增活动奖励';
        this.dialogFormVisible = true;
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      registDetermine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post("/cloud/backmgr/eusc/award/add", this.ruleForm).then((res) => {
              this.$notify({
                title: '成功',
                message: `创建成功`,
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.getData();
            })
          }
        });
      },
      getRule() {
        this.$http.get('/cloud/backmgr/eusc/awardConfig/list', {
          pageNum: 1,
          pageSize: 200,
        }).then(res => {
          const {list} = res.result.list;
          this.ruleList = list;
        })
      },
    },
    activated() {
      this.getData()
      this.getRule()
    }
  };
</script>
<style lang="">
  .eusc-audit {
  }
</style>
