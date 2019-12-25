<template>
  <div class='my-assets'>
    <div class="main">
      <div class="topbar">
        <p>总资产折合：{{detail.total_usdt}} USDT　≈　{{detail.total_rmb}} CNY</p>
        <el-row>
          <el-button type="primary" size="medium" @click.native="$router.push('/coin-recharge')">充币</el-button>
          <el-button type="primary" size="medium" @click.native="$router.push('/coin-extract')">提币</el-button>
          <el-button type="primary" size="medium" @click.native="$router.push('/coin-transfer')">内部转账</el-button>
        </el-row>
      </div>
      <el-table :data="list" border style="width: 100%" size="mini">
          <el-table-column prop="type" label="币种" align="left">
            <div slot-scope="scope">
              <p>{{scope.row.coin_name}}</p>
            </div>
          </el-table-column>
          <el-table-column prop="canUsed" label="可用" align="left">
            <div slot-scope="scope">
              <p>{{scope.row.number_over}}</p>
            </div>
          </el-table-column>
          <el-table-column prop="forrezn" label="冻结"  align="left">
            <div slot-scope="scope">
              <p>{{scope.row.number_lock}}</p>
            </div>
          </el-table-column>
          <el-table-column prop="changeCNY" label="CNY估值" align="left">
            <div slot-scope="scope">
              <p>{{scope.row.number_cny}}</p>
            </div>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        detail:'',
        list:[]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let p = this.$http.post('/ajax_funds/funds')
        p.then(res => {
          let {result} = res
          this.detail = result
          this.list = result.data
        }).catch(error => {
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .my-assets {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    .main {
      flex: 1;
      -webkit-overflow-scrolling: touch;
      background: #fff;
      display: flex;
      flex-direction: column;
      .topbar {
        padding:20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:18px;
      }
      .el-table {
        overflow-y: auto;
        &::before{
          display: none;
        }
      }
    }
  }
</style>