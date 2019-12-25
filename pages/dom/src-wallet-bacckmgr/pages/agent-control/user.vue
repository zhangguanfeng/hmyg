/**
*  Created by   阿紫
*  On  2019/7/8 0008
*  Content  用户管理
*/
<template>
  <div class='user'>
    <div v-if="isDetail" class="title">
      <el-row class="sac-row">
        <el-col :span="4">
          <el-button size="small" type="primary" plain @click="goBack">返回</el-button>
        </el-col>
      </el-row>
      <h3>{{inviter}}的邀请</h3>
    </div>
    <div v-else>
      <el-form :inline="true"
               label-width="90px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="用户名"
          v-model.trim="filterForm.userId"
          prop="phone"></sac-input>
        <el-form-item label="状态">
          <el-select size="small" v-model="filterForm.state" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="已取消代理" value="0"></el-option>
            <el-option label="代理" value="1"></el-option>
          </el-select>
        </el-form-item>
        <sac-submit-form
          :isReset='false'
          @submitForm="getAgencyInfoList(1)"></sac-submit-form>
      </el-form>
    </div>
    <sac-table :data="listData.list">
      <el-table-column prop="userId" label="用户名" align="center"></el-table-column>
      <el-table-column prop="phone" label="phone" align="center"></el-table-column>
      <el-table-column v-if="!isDetail" prop="parentId" label="邀请Ta的人" align="center"></el-table-column>
      <!--      <el-table-column prop="coinName" label="实名注册时间"></el-table-column>-->
      <el-table-column prop="personCash" label="持币量（CNY）" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.personCash}}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="coinName" label="团队持币量（CNY）"></el-table-column>-->
      <el-table-column v-if="!isDetail" prop="inviteNumber" label="Ta的邀请" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; cursor: pointer" @click="goDetail(scope.row)"> {{scope.row.inviteNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope" prop="sysStatus">
          <el-button :type="scope.row.state==1?'danger':'warning'" size="small"
                     @click.native="updateAgency(scope.row)">{{scope.row.state==1?'取消代理':'恢复代理'}}
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0 &&+listData.total"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="title" :visible.sync="isShowAddDialog" :close-on-click-modal="false">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="备注：" size="small">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.remark"
            :autosize="{ minRows: 6}"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "user",
    data() {
      return {
        isDetail: false,
        listData: {
          total: null,
          list: [],
        },
        filterForm: {
          state: '',
          userId: '',
          pageNum: 1,
          pageSize: 20,
        },
        isShowAddDialog: false,
        title: '',
        ruleForm: {
          remark: ''
        },
        current: {},
        inviter: '',
        invitee: '',
      };
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val;
        this.filterForm.pageNum = currentPage;
        this.getAgencyInfoList();
      },
      getAgencyInfoList(pageNum) {
        pageNum && (this.filterForm.pageNum = pageNum);
        this.$http.post('/cloud/backmgr/agency/getAgencyInfoList', this.filterForm).then(res => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
      // 修改代理用户状态
      updateAgency(row) {
        this.current = row;
        this.title = row.state == 1 ? '取消代理' : '恢复代理';
        this.isShowAddDialog = true;
        this.ruleForm.remark = '';
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      submitForm() {
        const {id, state} = this.current;
        const status = state == 1 ? 'disable' : 'enable';
        this.$http.post('/cloud/backmgr/agency/updateAgencyInfoStatus', {
          id,
          status,
          remark: this.ruleForm.remark
        }).then((res) => {
          this.isShowAddDialog = false;
          this.$notify({
            title: '成功',
            message: `${state == 1 ? '取消代理' : '恢复代理'} ${name} 成功`,
            type: 'success'
          });
          this.getAgencyInfoList();
        })
      },
      // 删除代理用户
      deleteAgency(id) {
        this.$http.post('/cloud/backmgr/agency/deleteAgencyProjectById', {
          id
        }).then(res => {
          this.getAgencyInfoList();
        })
      },
      goDetail(row) {
        const {parentId, userId} = row;
        this.invitee = parentId;
        this.inviter = userId;
        this.isDetail = true;
        this.selectAgencyLower(userId);
      },
      // 代理下级列表
      selectAgencyLower(parentId) {
        this.$http.post('/cloud/backmgr/agency/selectAgencyLower', {
          parentId
        }).then(res => {
          this.listData.list = res.result.list;
          this.listData.total = res.result.count;
        })
      },
      goBack() {
        this.isDetail = false;
        this.getAgencyInfoList();
      },
      count(val) {
        // 超过10万的，用单位万，10万以下的正常显示
        if (+val > 100000) {
          return (+val / 10000 + '万')
        }
        return val;
      }
    },
    activated() {
      this.getAgencyInfoList();
    }
  };
</script>
<style lang="less" scoped>
  .user {
    .title {
      h3, p {
        text-align: center;
      }

      h3 {
        font-size: 24px;
      }

      p {
        font-size: 14px;
      }
    }
  }
</style>
