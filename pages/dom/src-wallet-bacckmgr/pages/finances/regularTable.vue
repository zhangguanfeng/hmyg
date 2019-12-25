/**
*  Created by   阿紫
*  On  2019/7/2 0002
*  Content 定期
*/
<template>
      <sac-table :data="list">
        <el-table-column
          v-for="(col, index) in cols"
          :key="index"
          :prop="col.prop"
          :label="col.label">
          <template :slot="col.content ? 'default' : ''" slot-scope="scope">
            {{ col.content(scope) }}
          </template>
        </el-table-column>
        <el-table-column label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" >
          <template slot-scope="scope">
            <div class="table-operating">
              <el-button size="mini" type="primary" @click="modify(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteCurrency(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="上架" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="switchStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </sac-table>
</template>
<script>
    export default {
        name: "regularTable",
      props: {
        listQuery: {
          type: Object,
          default: () => { }
        },
        coinArr: {
          type: Array,
          default: () => []
        }
      },
      computed: {
        coinObj () {
          return this.coinArr.reduce((prev, v) => {
            prev[v.coinId] = v
            return prev
          }, {})
        }
      },
      data () {
        return {
          cols: [
            { label: '币种名称', prop: 'name' },
            { label: '预计年化收益率', prop: 'rate', content: scope => scope.row.rate + '%' },
            { label: '违约金比例', prop: 'penalRate', content: scope => scope.row.penalRate+ '%' },
            { label: '起购额度（USD）', prop: 'minAmount' },
            { label: '结算天数（天）', prop: 'bindCycle'},
            { label: '创建时间', prop: 'createTime' },
          ],
          list: [],
          tags:['', 'success','danger' ]
        }
      },
      methods: {
        async fetchData () {
          let { result } = await this.$http.post('/cloud/backmgr/financial/financial/getProList', {...this.listQuery,proType:1})
          this.list = result.list.list
          this.$emit('setTotal', parseInt(result.list.total))
        },
        // 修改数据
        modify (row) {
          this.$emit('modify', row)
        },
        // 上下架
        async switchStatus (row) {
          let params = {
            id: row.id,
            status: row.status === 1 ? 'enable' : 'disable'
          }
          try {
            let result = await this.$http.get('/cloud/backmgr/financial/financial/updateProStatus', params)
            let text = row.status === 1 ? '上架' : '下架'
            this.$notify.success({ title: '请求成功', message: `${text}成功` });
          } catch (error) {
            row.status = row.status === 1 ? 0 : 1
          }
        },
        // 删除定期项目
        async deleteCurrency (row) {
          const {id, status} = row;
          let params = { id }
          await this.$confirm('确认删除该条定期项目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          if (status ==1) {
            let result = await this.$http.get('/cloud/backmgr/financial/financial/updateProStatus', {
              id,
              status: 'disable'
            })
            this.del(params)
          } else {
            this.del(params)
          }
        },
        async del(params) {
          try {
            let result = await this.$http.post('cloud/backmgr/financial/deleteIntervalProById', params)
            this.$notify.success({ title: '请求成功', message: '删除定期项目成功' });
            this.fetchData()
          } catch (error) {}
        }
      },
      activated () {
        // this.fetchData()
      },
    }
</script>
<style lang="less" scoped>
  img {
    max-width: 80px ;
  }
  // .current-table {
  //   height: 100%;
  // }
</style>
