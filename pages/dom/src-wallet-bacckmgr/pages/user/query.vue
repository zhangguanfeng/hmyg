/**
*  Created by   阿紫
*  On  2018/8/10
*  Content 用户查询
*/
<template>
  <div class='query'>
    <el-col :span="22" style="text-align:right; margin-bottom: 30px;">
      <el-button size="small" type="primary" @click="addUser">创建用户</el-button>
    </el-col>
    <el-form :inline="true"
             label-width="80px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="手机号"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <sac-input
        ref="nickName"
        label="昵称"
        v-model.trim="filterForm.nickName"
        prop="nickName"></sac-input>
      <sac-input
        ref="cardNo"
        label="身份证"
        v-model.trim="filterForm.cardNo"
        prop="cardNo"></sac-input>
      <sac-input
        ref="coinAddr"
        label="收款地址"
        v-model="filterForm.coinAddr"
        prop="coinAddr"></sac-input>
      <sac-submit-form
        @submitForm="submitForm(1)"
        @resetForm="resetForm"></sac-submit-form>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="userId" label="序号" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="cardNo" label="身份证号"></el-table-column>
      <el-table-column prop="registTime" label="注册时间"></el-table-column>
      <el-table-column label="操作" width="380">
        <template slot-scope="scope">
          <el-button size="small" type="success"
                     @click="synchrodata(scope.row)">同步
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 2" type="success"
                     @click="optStatusChange(0,'解冻账号',scope.row)">解冻账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus != 2" type="danger"
                     @click="optStatusHandle(2,'冻结账号',scope.row)">冻结账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 1" type="success" plain
                     @click="optStatusChange(0,'解锁账号',scope.row)">解锁账号
          </el-button>
          <el-button size="small" v-show="scope.row.optStatus== 0" type="warning"
                     @click="optStatusHandle(1,'锁定账号',scope.row)">锁定账号
          </el-button>
          <el-button type="primary" size="small" @click.native="goDetail(scope.row.phone)">查看详情</el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <sac-input ref="phone" v-model="ruleForm.phone" label="手机号" prop="phone"></sac-input>
        <sac-input ref="nickName" v-model="ruleForm.nickName" label="昵称" prop="nickName"></sac-input>
        <sac-input ref="pwd" type="password" v-model="ruleForm.pwd" label="登录密码" placeholder="请输入6-16位密码"
                   prop="pwd"></sac-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="备注" :visible.sync="optDialogFormVisible" class="opt-dialog-wrap">
      <el-form :model="dialogForm" :rules="optRules" ref="dialogForm">
        <el-form-item prop="optReason" :label="`${dialogForm.optStatus == 1 ? '锁定':'冻结'}账号${dialogForm.phone}理由：`">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    v-model="dialogForm.optReason" maxlength="50"
                    placeHolder="请输入理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="optDialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click.native="optSubmit('dialogForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="同步信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <el-button type="primary" @click="confirmSynchrodata(1)" size="small">同步AlphaPay</el-button>
      <el-button type="primary" @click="confirmSynchrodata(2)" size="small">同步理财</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import Md5 from '../../../static/js/md5';

  export default {
    name: 'query',
    data() {
      const checkUserName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        }
        callback();
      }
      const checkPwd = (rule, value, callback) => {
        if (!value || value.length < 6 || value.length > 16) {
          return callback(new Error('请输入6-16位密码'));
        }
        if (!/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*.])[a-z\d#@!~%^&*.]/i.test(value)) {
          return callback(new Error('登录密码必须是字母、数字和符号的组合'));
        }
        callback();
      };
      return {
        filterForm: {
          phone: '',
          nickName: '',
          cardNo: '',
          coinAddr: '',
          pageNum: 1,
          pageSize: 20
        },
        listData: {
          total: null,
          list: [],
        },
        dialogTitle: '创建用户',
        ruleForm: {
          phone: '',
          pwd: '',
          nickName: '',
        },
        rules: {
          phone: [
            {required: true, validator: checkUserName, trigger: 'blur'},
          ],
          pwd: [
            {required: true, validator: checkPwd, trigger: 'blur'},
          ],
        },
        optRules: {
          optReason: [
            {required: true, message: '请输入理由', trigger: 'blur'},
          ]
        },
        dialogForm: {
          userId: '',
          optStatus: '',
          phone: '',
          optReason: ''
        },
        dialogFormVisible: false,
        optDialogFormVisible: false,
        dialogVisible: false,
        current: {},
      };
    },
    methods: {
      resetForm() {
        this.$refs.phone.reset();
        this.$refs.nickName.reset();
        this.$refs.cardNo.reset();
        this.$refs.coinAddr.reset();
        this.$refs.filterForm.resetFields(); // 重置query的数据
        this.listData.list = [];
      },
      submitForm(num) {
        this.filterForm.pageNum = num;
        const {phone, nickName, cardNo, coinAddr} = this.filterForm;
        if (phone || nickName || cardNo || coinAddr) {
          this.getUserInfoList();
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询内容不能为空'
          });
        }
      },
      getUserInfoList() {
        this.$http.post('/wallet/backmgr/user/getUserInfoList.do', this.filterForm)
          .then((res) => {
            const {list, total} = res.result.list;
            this.listData.list = list;
            this.listData.total = total;
          });
      },
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        // this.filterForm.pageNum = currentPage;
        this.submitForm(currentPage);
      },
      goDetail(phone) {
        this.$router.push({name: 'queryDetails', query: {phone}});
      },
      /**
       * 冻结/解冻 锁定/解锁 用户   optStatus  用户状态：2表示冻结，1表示锁定，0表示解冻
       * */
      optStatusHandle(type, title, data) {
        this.optDialogFormVisible = true;
        this.dialogForm = {
          userId: data.userId,
          optStatus: type,
          phone: data.phone,
          optReason: ''
        }
      },
      optStatusChange(type, title, data) {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确定执行 '),
            h('span', {style: 'color: red'}, `${title} `),
            h('span', {style: 'color: #0a52e0'}, `${data.phone}`),
            h('span', null, ' 吗?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('wallet/backmgr/user/operatetUser.do', {
                userId: data.userId,
                optStatus: type,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${title} ${data.phone} 成功`,
                  type: 'success'
                });
                this.getUserInfoList();
                done();
              })
            } else {
              done();
            }
          }
        })
      },
      optSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return;
          const title = this.dialogForm.optStatus == 1 ? '锁定' : '冻结';
          this.$http.post('wallet/backmgr/user/operatetUser.do', this.dialogForm).then((res) => {
            this.$notify({
              title: '成功',
              message: `${title} ${this.dialogForm.phone} 成功`,
              type: 'success'
            });
            this.optDialogFormVisible = false;
            this.getUserInfoList();
          })
        })
      },
      // 创建用户
      addUser() {
        this.dialogTitle = '创建用户';
        this.dialogFormVisible = true;
        this.ruleForm = {
          phone: '',
          pwd: '',
          nickName: '',
        };
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields(); // 重置query的数据
      },
      determine() {
        const {phone, nickName} = this.ruleForm;
        const pwd = Md5(this.ruleForm.pwd);
        this.$http.post('wallet/backmgr/user/addUsers.do', {
          pwd,
          phone,
          nickName
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `创建用户 ${this.ruleForm.phone} 成功`,
            type: 'success'
          });
          this.dialogFormVisible = false;
        });
      },
      synchrodata(res) {
        this.dialogVisible = true;
        this.current = res;
      },
      confirmSynchrodata(type) {
        this.$http.post('/wallet/backmgr/user/manualSyncUser.do', {
          userId: this.current.userId,
          type,
        }).then((res) => {
          this.$notify({
            title: '成功',
            message:` 同步${type==1?'AlphaPay':'理财'}成功`,
            type: 'success'
          });
        });
      }
    }
  };
</script>
<style lang="less">
  .opt-dialog-wrap {
    .el-dialog {
      padding: 0;

      &__body {
        padding: 0 20px;
      }
    }
  }
</style>
