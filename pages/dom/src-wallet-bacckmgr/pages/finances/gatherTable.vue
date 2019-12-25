/**
*  Created by   阿紫
*  On  2019/7/2 0002
*  Content 集合产品
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
            <img :src="scope.row.iconUrl" alt="">
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
<!--        <el-table-column label="上架" >-->
<!--          <template slot-scope="scope">-->
<!--            <el-switch v-model="scope.row.sysStatus" :active-value="1" :inactive-value="0" @change="switchStatus(scope.row)"></el-switch>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </sac-table>
</template>
<script>
    export default {
        name: "gatherTable",
      props: {
        list: {
          type: Array,
          default: () => []
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
            // { label: '集合产品', prop: 'proName'},
            { label: '币种名称', prop: 'coinName' },
            { label: '预计年化收益率', prop: 'rate', content: scope => scope.row.rate+ '%' },
            { label: '收益币种', prop: 'getCoinName' },
            { label: '起购额度', prop: 'minAmount' },
            { label: '创建时间', prop: 'createTime' },
          ],
        }
      },
      methods: {
        // 修改数据
        modify (row) {
          this.$emit('modify', row)
        },
        // 删除
        async deleteCurrency (row) {
          let params = { id: row.id }
          try {
            await this.$confirm('确认删除该条集合产品吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            let result = await this.$http.post('cloud/backmgr/financial/deleteColProById', params)
            this.$notify.success({ title: '请求成功', message: '删除集合产品成功' });
            this.$emit('refresh');
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
</style>
