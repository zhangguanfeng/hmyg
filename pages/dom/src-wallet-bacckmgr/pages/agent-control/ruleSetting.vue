/**
*  Created by   阿紫
*  On  2019/7/8 0008
*  Content 返佣规则设置
*/
<template>
  <div class='ruleSetting'>
    <el-form :inline="true"
             label-width="90px"
             ref="filterForm"
             :model="filterForm">
      <sac-coin ref="coinId" label="项　　目：" v-model="filterForm.coinId"></sac-coin>
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
        @submitForm="getList()"></sac-submit-form>
      <el-form-item style="text-align: right">
        <el-button type="primary" size="small" @click="addSend">创建规则</el-button>
      </el-form-item>
    </el-form>
    <sac-table :data="list">
      <el-table-column prop="coinName" label="项目名称"  align="center">
      </el-table-column>
      <el-table-column prop="middle" label="返佣时间"  align="center">
        <template slot-scope="scope">
          {{timeListObj[scope.row.returnTime]}}
        </template>
      </el-table-column>
      <el-table-column prop="senior" label="提成百分比"  align="center">
        <template slot-scope="scope">
          <span v-html="returnLevel(scope.row.returnLevel)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="returnPeriod" label="返佣期数"  align="center">
      </el-table-column>
      <el-table-column prop="createUser" label="创建人"  align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"  align="center">
      </el-table-column>
      <el-table-column label="上架" fixed="right"  align="center">
        <template slot-scope="scope" prop="isShow">
          <el-switch v-model="scope.row.status" :inactive-value="0" :active-value="1"
                     @click.native="registerSwitchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" fixed="right"  align="center">
        <template slot-scope="scope" prop="sysStatus">
          <el-button type="success" size="small"
                     :disabled="scope.row.state==1"
                     @click.native="modification(scope.row)">修改
          </el-button>
          <el-button type="danger" size="small"
                     :disabled="scope.row.state==1"
                     @click.native="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </sac-table>
    <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogFormVisible"
               class="register_dialog" width="800px">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :inline="true" label-width="135px">
        <el-form-item label="项目名称：" prop="coinId" size="small" class="from_box_item">
          <el-select v-model="ruleForm.coinId" placeholder="请选择项目名称">
            <el-option
              v-for="item in coinList"
              :key="item.coinId"
              :label="item.coinName"
              :value="item.coinId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返佣的时间：" prop="returnTime" size="small" class="from_box_item">
          <el-select v-model="ruleForm.returnTime" placeholder="请选择返佣的时间">
            <el-option
              v-for="(item, index) in timeList"
              :key="index"
              :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返佣分期数：" prop="returnPeriod" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.returnPeriod" placeholder="请输入返佣分期数">
          </el-input>
        </el-form-item>
        <el-form-item label="1级提成：" prop="level1" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.level1" placeholder="请输入1级提成">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="2级提成：" prop="level2" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.level2" placeholder="请输入2级提成">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="3级提成：" prop="level3" class="from_box_item">
          <el-input type="number" size="small" v-model="ruleForm.level3" placeholder="请输入3级提成">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in ruleForm.domains"
          :label="index+4+'级提成：'"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
      required: true,
      message: `请输入${index+4}级提成`,
       trigger: 'blur'
    }"
        >
          <el-input v-model="domain.value" size="small" type="number" :placeholder="`请输入${index+4}级提成`">
            <span slot="suffix">%</span>
          </el-input>
          <el-button size="small" @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDomain" size="small">新增等级提成</el-button>
        <el-button type="primary" @click="registDetermine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "ruleSetting",
    data() {
      return {
        dateTime: [],
        list: [],
        filterForm: {
          coinId: '',
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 200,
        },
        dialogTitle: '',
        dialogFormVisible: false,
        ruleForm: {
          coinId: '', // 项目币种id
          returnTime: '', // 返佣时间：1每日，2每周，3每月
          returnPeriod: '', // 返佣期数，正整数
          returnLevel: '', //返佣分级提成：用英文逗号拼接，一级在最前
          level1: '',
          level2: '',
          level3: '',
          domains: [],
        },
        rules: {
          coinId: [
            {required: true, message: '请选择币种', trigger: 'change'},
          ],
          returnTime: [
            {required: true, message: '请输入返佣时间', trigger: 'blur'},
          ],
          returnPeriod: [
            {required: true, message: '请输入返佣期数', trigger: 'blur'},
          ],
          level1: [
            {required: true, message: '请输入1级提成', trigger: 'blur'},
          ],
          level2: [
            {required: true, message: '请输入2级提成', trigger: 'blur'},
          ],
          level3: [
            {required: true, message: '请输入3级提成', trigger: 'blur'},
          ],
        },
        timeList: [
          {
            lable: '每日',
            value: 1
          }, {
            lable: '每周',
            value: 2
          }, {
            lable: '每月',
            value: 3
          }
        ],
        timeListObj: {
          1: "每日",
          2: "每周",
          3: "每月",
        }
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
      getList() {
        this.filterForm.startTime = this.dateTime && this.dateTime[0];
        this.filterForm.endTime = this.dateTime && this.dateTime[1];
        this.$http.post("/cloud/backmgr/agency/getAgencyProjectRulesList", this.filterForm).then((res) => {
          this.list = res.result.list;
        })
      },
      registerSwitchChange(itemData) {
        const {status, id} = itemData;
        this.$http.post("/cloud/backmgr/agency/updateAgencyRulesStatus", {
          status: status ? "enable" : "disable",
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `${status ? "上架" : "下架"} 成功`,
            type: 'success'
          });
          this.getList();
        })
      },
      deleteAgencyRulesById(id) {
        this.$http.post("/cloud/backmgr/agency/deleteAgencyRulesById", {
          id
        }).then((res) => {
          this.$notify({
            title: '成功',
            message: `删除成功`,
            type: 'success'
          });
          this.getList();
        })
      },
      remove(itemData) {
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {id, status} = itemData;
          if (status == 1) { // 上架状态；
            this.$http.post("/cloud/backmgr/agency/updateAgencyRulesStatus", {
              status: status ? "disable" : "enable",
              id
            }).then((res) => {
              this.deleteAgencyRulesById(id)
            })
          } else {
            this.deleteAgencyRulesById(id);
          }
        })
      },
      addSend() {
        this.dialogTitle = '新建返佣规则';
        this.dialogFormVisible = true;
        this.$store.dispatch('getSampleCoinInfo');
        this.ruleForm = {
          coinId: '', // 项目币种id
          returnTime: '', // 返佣时间：1每日，2每周，3每月
          returnPeriod: '', // 返佣期数，正整数
          level1: '',
          level2: '',
          level3: '',
          domains: [],
        }
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
      },
      modification(itemData) {
        this.dialogTitle = '修改返佣规则';
        this.dialogFormVisible = true;
        this.$store.dispatch('getSampleCoinInfo');
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
        const ruleForm = JSON.parse(JSON.stringify(itemData));
        const returnLevel = (ruleForm.returnLevel).split(',');
        let domains = [];
        this.ruleForm = {
          coinId: ruleForm.coinId, // 项目币种id
          id:ruleForm.id,
          returnTime: ruleForm.returnTime, // 返佣时间：1每日，2每周，3每月
          returnPeriod:ruleForm.returnPeriod, // 返佣期数，正整数
          level1:  returnLevel[0] * 100,
          level2:  returnLevel[1] * 100,
          level3: returnLevel[2] * 100,
          domains: [],
        }
        if (returnLevel.length > 3) {
          domains = returnLevel.slice(3)
          domains.forEach(item => {
            this.ruleForm.domains.push({
              value: item*100
            })
          })
        }
      },
      registDetermine() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const {coinId, id, returnTime, returnPeriod, level1, level2, level3, domains} = this.ruleForm;
            let returnLevel = `${level1 / 100},${level2 / 100},${level3 / 100}`;
            if (domains.length > 0) {
              returnLevel = returnLevel + ',' + domains.reduce((prev, next) => {
                if (prev) {
                  return prev + ',' + (next.value / 100)
                } else {
                  return (next.value / 100)
                }
              }, 0)
            }
            console.log(returnLevel, 'returnLevel');
            if (this.ruleForm.id) {
              this.$http.post("/cloud/backmgr/agency/updateAgencyProjectRules", {
                id, coinId, returnTime, returnPeriod, returnLevel
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
              this.$http.post("/cloud/backmgr/agency/addAgencyProjectRules", {
                coinId, returnTime, returnPeriod, returnLevel
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      returnLevel(value) {
        let str = '';
        let arr = value.split(',');
        arr.forEach((res, index) => {
          str += `${index + 1}级提成：${res * 100}%; <br/>`
        })
        return str;
      },
      addDomain() {
        this.ruleForm.domains.push({
          value: '',
        });
      },
      removeDomain(item) {
        var index = this.ruleForm.domains.indexOf(item)
        if (index !== -1) {
          this.ruleForm.domains.splice(index, 1)
        }
      },
    },
    activated() {
      this.getList();
    }
  };
</script>
<style lang="less" scoped>
  .ruleSetting {
  }
</style>
