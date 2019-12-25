/**
*  Created by   阿紫
*  On  2019/7/8 0008
*  Content 分配账号
*/
<template>
  <div class='account'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-input
        ref="phone"
        label="手机号"
        v-model.trim="filterForm.phone"
        prop="phone"></sac-input>
      <sac-coin ref="coinId" v-model="filterForm.coinId"></sac-coin>
      <sac-submit-form
        :isReset='false'
        @submitForm="getList(0)"></sac-submit-form>
      <el-form-item style="text-align: right">
        <el-button type="primary" size="small" @click="assignedAccount">分配账户</el-button>
      </el-form-item>
    </el-form>
    <sac-table :data="listData.list">
      <el-table-column prop="phone" label="手机号"  align="center">
      </el-table-column>
      <el-table-column prop="coinName" label="币种"  align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注"  align="center">
      </el-table-column >
      <el-table-column label="操作" width="360"  align="center">
        <template slot-scope="scope" prop="sysStatus">
          <el-button :type="scope.row.state==1?'danger':'warning'" size="small"
                     @click.native="goDisable(scope.row)">{{scope.row.state==1?'禁用':'启用'}}
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog title="分配账号" :visible.sync="isShowAddDialog"  :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone" size="small">
          <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="币种：" prop="coinId" size="small" class="from_box_item">
          <el-select v-model="ruleForm.coinId" placeholder="请选择币种">
            <el-option
              v-for="item in coinList"
              :key="item.coinId"
              :label="item.coinName"
              :value="item.coinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" size="small">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "account",
    data() {
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'));
        }
        if (value.length < 11) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      return {
        filterForm: {
          phone: '',
          coinId: '',
          pageNum: 0,
          pageSize: 20,
        },
        listData: {
          total: null,
          list: [],
        },
        isShowAddDialog: false,
        ruleForm: {
          phone: '',
          coinId: '',
          remark: ''
        },
        rules: {
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'},
          ],
          coinId: [
            {required: true, message: '请选择币种', trigger: 'change'},
          ]
        },
      };
    },
    computed: {
      coinList(state) {
        const { coinList } = this.$store.state;
        return coinList
      }
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.getList();
      },
      getList(pageNum) {
        pageNum && (this.filterForm.pageNum = pageNum);
        this.$http.post("/cloud/backmgr/agency/getAgencyProjectList", this.filterForm).then((res) => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
      assignedAccount() {
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
        this.$store.dispatch('getSampleCoinInfo');
        this.isShowAddDialog = true;
      },
      // 解禁&启用
      goDisable(data) {
        const h = this.$createElement;
        const {state, phone, id} = data;
        const status = state == 1 ? 'disable' : 'enable';
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '此操作将 '),
            h('span', {style: 'color: red'}, state == 1 ? `禁用 ` : `启用 `),
            h('span', {style: 'color: #0a52e0'}, `${phone}`),
            h('span', null, ' 账户, 是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http.post('/cloud/backmgr/agency/updateAgencyProjectStatus', {
                id,
                status,
              }).then((res) => {
                this.$notify({
                  title: '成功',
                  message: `${state == 1 ? '禁用' : '启用'} ${name} 成功`,
                  type: 'success'
                });
                this.getList();
                done();
              })
            } else {
              done();
            }
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/cloud/backmgr/agency/addAgencyProject', this.ruleForm).then((res) => {
              this.$notify({
                title: '成功',
                message: `创建成功`,
                type: 'success'
              });
              this.getList();
              this.isShowAddDialog = false;
            })
          }
        });
      },
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less" scoped>
  .account {
  }
</style>
