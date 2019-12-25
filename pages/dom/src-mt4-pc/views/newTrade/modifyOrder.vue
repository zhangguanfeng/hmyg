/**
*  Created by   阿紫
*  On  2019/9/6 0006
*  Content  修改订单  平仓
*/
<template>
  <div class='modifyOrder'>
    <!-- <span class="more" @click="drawer=true">更多</span> -->
    <modify-order-table :maxHeight="maxHeight" :ticker="ticker" :data="list">
    </modify-order-table>
    <el-drawer
      size="470px"
      title="持仓列表"
      :wrapperClosable="false"
      :visible.sync="drawer"
      :before-close="handleClose"
      direction="btt">
      <modify-order-table :maxHeight="440"
                          :ticker="ticker"
                          :data="list"
                          isShow
                          :total="total"
                          @change="handleCurrentChange"
                          :page="filterForm.page">
      </modify-order-table>
    </el-drawer>
  </div>
</template>
<script>
import modifyOrderTable from './modifyOrderTable.vue';

export default {
  name: 'modifyOrder',
  components: {
    modifyOrderTable,
  },
  props: {
    ticker: {},
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
      data: {},
      filterForm: {
        page_size: 30,
        page: 1
      },
    };
  },
  methods: {
    handleClose(){
      this.drawer = false;
      this.filterForm.page = 1;
      this.getPendingOrder();
    },
    handleCurrentChange(val) {
      this.filterForm.page = val;
      this.getPendingOrder();
    },
    getPendingOrder(loaded = [], page = 1) {
      if (page == 1) {
        this.list = [];
      }
      this.loading = true
      // this.$store.commit('updateOrderData', null);
      this.$http.post('report/PendingOrder', Object.assign({
        page
      }, this.filterForm)).then(res => {
        const { allSymbolsInfo } = this.$store.state;
        res.data.data.forEach(el => {
          for (let v of allSymbolsInfo) {
            if (v.symbol === el.symbol) {
              el.symbolInfo = v;
              return;
            }
          }
        });
        // loaded = [...loaded, ...res.data.data];
        // console.log(loaded)
        // 防止频繁触发的情况下，数据重复问题
        for (let v of res.data.data) {
          const tickets = loaded.map(el => el.ticket);
          if (!~tickets.indexOf(v.ticket)) {
            loaded.push(v);
          }
        }
        res.data.data = loaded;
        this.data = res.data;
        this.list = res.data.data;
        this.total = +res.data.total_count;
        this.$store.commit('updateOrderData', this.data);
        if (this.total !== 0 && this.list.length < this.total) {
          this.getPendingOrder(loaded, ++page);
        } else {
          this.filterForm.page = 1;
        }
      });
    },
  },
  created() {
    this.filterForm.page = 1;
    this.getPendingOrder();
    this.$root.$on('getPendingOrder', this.getPendingOrder)
  },
  destroyed() {
    this.$root.$off('getPendingOrder', this.getPendingOrder)
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
