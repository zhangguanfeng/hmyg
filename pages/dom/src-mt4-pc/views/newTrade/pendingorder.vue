/**
*  Created by   阿紫
*  On  2019/9/6 0006
*  Content 修改挂单 删除挂单
*/
<template>
    <div class='pendingorder'>
      <span class="more" @click="drawer=true">更多</span>
      <pending-order-table :maxHeight="maxHeight" :data="list">
      </pending-order-table>
      <el-drawer
        size="470px"
        title="挂单"
        :wrapperClosable="false"
        :visible.sync="drawer"
        :before-close="handleClose"
        direction="btt">
        <pending-order-table
          :maxHeight="450"
          :data="list"
          isShow
          :total="total"
          @change="handleCurrentChange"
          :page="filterForm.page"
        >
        </pending-order-table>
      </el-drawer>
    </div>
</template>
<script>
import pendingOrderTable from './pendingOrderTable.vue';

export default {
  name: 'pendingorder',
  components: {
    pendingOrderTable,
  },
  props: {
    maxHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      drawer: false, // 控制查看持仓更多
      list:[],
      total: 0,
      filterForm: {
        pageSize: 10,
        page: 1
      },
    };
  },
  methods: {
    handleClose(){
      this.drawer = false;
      this.filterForm.page = 1;
      this.getLimitStopOrder();
    },
    handleCurrentChange(val) {
      this.filterForm.page = val;
      this.getLimitStopOrder();
    },
    getLimitStopOrder() {
      this.loading = true
      this.$http.post('report/limitStopOrder', this.filterForm).then((res) => {
        this.loading = false
        const data = res.data.data || [];
        this.list = data;
        this.total = +res.data.total_count;
      }).catch((res) => {
        this.loading = false
      })
    },
  },
  created() {
    this.filterForm.page = 1;
    this.getLimitStopOrder();
    this.$root.$on('getLimitStopOrder', this.getLimitStopOrder)
  },
  destroyed() {
    this.$root.$off('getLimitStopOrder', this.getLimitStopOrder)
  }
};
</script>
<style lang="scss" scoped>
    /deep/.el-drawer__container{
      .el-drawer__header {
        margin-bottom: 0px;
        padding-bottom: 10px;
        border-bottom: 1px solid #DEDEDE;
        span {
          color: #555;
        }
      }
    }
</style>
