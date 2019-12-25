/**
*  Created by   阿紫
*  On  2019/7/27 0027
*  Content 活动规则
*/
<template>
    <div class='eusc-rule'>
      <el-col :span="22" style="text-align:right;margin-bottom: 10px;">
        <el-button size="small" type="primary" @click="addSend">创建规则</el-button>
      </el-col>
      <sac-table :data="list">
        <el-table-column prop="coinName" label="奖励活动名称">
        </el-table-column>
        <el-table-column prop="name" label="直推返佣">
        </el-table-column>
        <el-table-column prop="coinName" label="奖励活动币种">
        </el-table-column>
        <el-table-column prop="actualCoinName" label="实际到账币种">
        </el-table-column>
        <el-table-column prop="senior" label="释放比例 (%/天)">
          <template slot-scope="scope">
            {{scope.row.grantRate*100 || 0}}%
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope" prop="sysStatus">
            <el-button type="danger" size="small"
                       :disabled="scope.row.state==1"
                       @click.native="remove(scope.row)">删除
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
          <el-form-item label="活动名称：" prop="name" class="from_box_item">
            <el-input type="text" size="small" v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="奖励币种：" prop="coinId" size="small" class="from_box_item">
            <el-select v-model="ruleForm.coinId" placeholder="请选择奖励币种" >
              <el-option
                v-for="item in coinList"
                :key="item.coinId"
                :label="item.coinName"
                :value="item.coinId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实际到账币种：" prop="actualCoinId" size="small" class="from_box_item">
            <el-select v-model="ruleForm.actualCoinId" placeholder="请选择实际到账币种" >
              <el-option
                v-for="item in coinList"
                :key="item.coinId"
                :label="item.coinName"
                :value="item.coinId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="释放比例：" prop="grantRate" class="from_box_item">
            <el-input type="number" size="small" v-model="ruleForm.grantRate" placeholder="">
              <span slot="suffix">%</span>
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
        name: "eusc-rule",
        data() {
          return {
            coinList: [],
            list: [],
            total: null,
            dialogTitle: '',
            dialogFormVisible: false,
            filterForm: {
              pageNum: 1, //已过滤多少条
              pageSize: 20, //每页条数
            },
            ruleForm: {
              name: '', // 活动名称
              coinId: '', // 奖励币种
              actualCoinId: '', // 实际收益币种
              grantRate: '', // 每日发放比例
            },
            rules: {
              coinId: [
                {required: true, message: '请选择奖励币种', trigger: 'change'},
              ],
              actualCoinId: [
                {required: true, message: '请选择实际到账币种', trigger: 'change'},
              ],
              name: [
                {required: true, message: '请输入活动名称', trigger: 'blur'},
              ],
              grantRate: [
                {required: true, message: '请输入释放比例', trigger: 'blur'},
              ],
            },
          };
        },
      methods: {
        //修改每页条数
        getPaginationChange(val, currentPage) {
          this.filterForm.pageSize = val;
          this.filterForm.pageNum = currentPage;
          this.getList();
        },
        remove(itemData) {
          const {id} = itemData;
          this.$confirm(`确定删除吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post("/cloud/backmgr/eusc/awardConfig/delete", {
              id
            }).then((res) => {
              this.$notify({
                title: '成功',
                message: `删除成功`,
                type: 'success'
              });
              this.getList();
            })
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
              const {name, coinId, actualCoinId, grantRate, id}= this.ruleForm;
              if (this.ruleForm.id) {
                this.$http.put("/cloud/backmgr/eusc/awardConfig/update", {
                  id, name, coinId, actualCoinId, grantRate: grantRate / 100
                }).then((res) => {
                  this.$notify({
                    title: '成功',
                    message: `修改成功`,
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                })
              } else {
                this.$http.post("/cloud/backmgr/eusc/awardConfig/add", {
                  name, coinId, actualCoinId, grantRate: grantRate / 100
                }).then((res) => {
                  this.$notify({
                    title: '成功',
                    message: `创建成功`,
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                })
              }
            }
          });
        },
        getSampleCoinInfo() {
          this.$http.post("wallet/backmgr/coin/getSampleCoinInfo.do", {}).then((res) => {
            this.coinList = res.result.list
          })
        },
        getList() {
          this.$http.get("/cloud/backmgr/eusc/awardConfig/list", this.filterForm).then((res) => {
            this.list = res.result.list.list;
            this.total = res.result.list.total;
          })
        }
      },
      activated() {
        this.getList();      // 获取记录
        this.getSampleCoinInfo(); // 币种
      }
    };
</script>
<style lang="less">
    .eusc-rule {
    .el-table__row {
    .cell {
      text-align: center;
    }
    }
    }
</style>
