/**
*  Created by   阿紫
*  On  2019/9/6 0006
*  Content  挂单列表
*/
<template>
  <div class="modifyOrderTable">
    <el-scrollbar>
      <el-table
        size="small"
        :data="data"
        style="width: 100%"
        :max-height="maxHeight">
        <el-table-column
          fixed
          prop="symbol"
          label="产品">
        </el-table-column>
        <el-table-column
          prop="cmd_name"
          label="方向"
          width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.cmd%2">卖</span>
            <span v-else>买</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="volume"
          label="手数">
        </el-table-column>
        <el-table-column
          prop="open_price"
          label="挂单价">
        </el-table-column>
        <el-table-column
          prop="sl"
          label="止损">
          <template slot-scope="scope">
            <modify-popover
              :isBuy="scope.row.cmd%2 ==0"
              :price="+scope.row.open_price"
              :old-val="+scope.row.sl"
              :precision="+scope.row.digits"
              @change="confirmChangeStopLoss($event,scope.row)"
            >
            </modify-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tp"
          label="止赢">
          <template slot-scope="scope">
            <modify-popover
              :isBuy="scope.row.cmd%2 ==0"
              :isLoss="false"
              :price="+scope.row.open_price"
              :old-val="+scope.row.tp"
              :precision="+scope.row.digits"
              @change="confirmChangeStopWin($event,scope.row)"
            >
            </modify-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="expiration"
          label="有效期">
        </el-table-column>
        <el-table-column
          prop="open_time"
          label="挂单时间">
        </el-table-column>
        <el-table-column
          prop="ticket"
          label="订单号">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          lang="center"
          width="80">
          <template slot-scope="scope">
            <el-tag size="small" style="cursor: pointer;" @click="del(scope.row)">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label=""
          lang="center"
          width="40">
        </el-table-column>
      </el-table>
      <p v-if="loading" style="text-align: center; font-size: 13px;"><i class="el-icon-loading"></i> 加载中...</p>
      <p v-if="noMore" style="text-align: center; font-size: 13px;">没有更多数据了</p>
    </el-scrollbar>
    <el-pagination
      v-if="isShow"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import modifyPopover from './modifyPopover.vue'
  import OrderSocket from '@/plugins/orderSocket'
  import { mapState } from 'vuex'
  import { md5pwd } from '@/common/util'

  export default {
    name: 'modifyOrderTable',
    components: {
      modifyPopover
    },
    props: {
      maxHeight: {
        type: Number,
        default: 188
      },
      page: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      isShow: {
        type: Boolean,
        default: false
      },
      ticker: {},
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        loading: false,
        noMore: false,
        modifyorderObj: {
          ORDERID: '', // 交易所成交单ID
          CMD: '', // 订单类型
          ORDERBY: '', // 下单账号
          OPENPRICE: '', // 下单价格
          SL: '', // 止损价格
          TP: '' // 止盈价格
        },
        pageSize: 10,
        OrderSocket: {}
      }
    },
    computed: mapState([
      'md5Key'
    ]),
    methods: {
      // 止损
      confirmChangeStopLoss(val, row) {
        const { cmd, ticket, open_price, tp, symbol, volume } = row
        const ORDERBY = this.$store.state.account;
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY, open_price)
        this.modifyorderObj.ORDERID = ticket.replace(/^#/, '')
        this.modifyorderObj.CMD = cmd
        this.modifyorderObj.ORDERBY = ORDERBY
        this.modifyorderObj.OPENPRICE = open_price
        this.modifyorderObj.SL = val + ''
        this.modifyorderObj.TP = tp
        this.modifyorderObj.SYMBOL = symbol
        this.modifyorderObj.SIGNATURE = SIGNATURE
        this.modifyorderObj.VOLUME = volume
        this.modifyorder(this.modifyorderObj)
      },
      // 止盈
      confirmChangeStopWin(val, row) {
        const { cmd, ticket, open_price, sl, symbol, volume } = row
        const ORDERBY = this.$store.state.account;
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY, open_price)
        this.modifyorderObj.ORDERID = ticket.replace(/^#/, '')
        this.modifyorderObj.CMD = cmd
        this.modifyorderObj.ORDERBY = ORDERBY
        this.modifyorderObj.OPENPRICE = open_price
        this.modifyorderObj.SL = sl
        this.modifyorderObj.TP = val + ''
        this.modifyorderObj.SYMBOL = symbol
        this.modifyorderObj.SIGNATURE = SIGNATURE
        this.modifyorderObj.VOLUME = volume
        this.modifyorder(this.modifyorderObj)
      },
      // 修改订单
      modifyorder(obj) {
        const message = JSON.stringify(obj)
        this.OrderSocket.modifypendingorderSendmessage(message).then(res => {
          this.$root.$emit('getLimitStopOrder')
          this.$notify({
            title: '成功',
            message: '修改挂单',
            type: 'success'
          })
        })
      },
      // 删除
      del(row) {
        this.$confirm('是否删除挂单?', '请确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmsClose(row)
        })
      },
      // 删除挂单
      confirmsClose(row) {
        console.log(row, 999)
        const { ticket, cmd, volume } = row
        const ORDERBY = this.$store.state.account;
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY, '', ticket)
        const obj = {
          ORDERBY,
          ORDERID: ticket.replace(/^#/, ''),
          CMD: cmd,
          SIGNATURE,
          VOLUME:volume
        }
        console.log(obj, '删除挂单')
        const message = JSON.stringify(obj)
        this.OrderSocket.deletependingorderSendmessage(message).then(res => {
          this.$root.$emit('getLimitStopOrder')
          this.$notify({
            title: '成功',
            message: '删除挂单成功',
            type: 'success'
          })
        })
      },
      handleCurrentChange(val) {
        this.$emit('change', val)
      },
    },
    mounted() {
      this.OrderSocket = new OrderSocket()
      this.$store.dispatch('getMd5Key')
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .el-table {
    thead {
      color: #b1b2b5;
    }

    .cell {
      text-align: center;
    }
  }
</style>
