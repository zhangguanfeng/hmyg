/**
*  Created by   阿紫
*  On  2019/9/6 0006
*  Content  持仓列表
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
          fixed="left"
          prop="symbol"
          label="产品">
        </el-table-column>
        <el-table-column
          prop="cmd_name"
          label="方向"
          width="50">
        </el-table-column>
        <el-table-column
          prop="volume"
          label="手数">
        </el-table-column>
        <!-- <el-table-column
          prop="open_price"
          label="开仓价">
        </el-table-column> -->
        <el-table-column
          label="开仓价/买价">
          <div slot-scope="scope" class="price">
            <div class="open">
              {{scope.row.open_price}}
            </div>
            <div class="current" :class="{rise: scope.row.symbolInfo.isSellRise, fall: !scope.row.symbolInfo.isSellRise}">
              {{scope.row.symbolInfo.ASK}}
              <template v-if="scope.row.symbolInfo.BID">
                 <Up v-if="scope.row.symbolInfo.isSellRise" width="6px" height="12px" />
                 <Down v-else width="6px" height="12px" />
              </template>
            </div>
          </div>
        </el-table-column>
        <el-table-column
          prop="sl"
          label="止损">
          <template slot-scope="scope">
            <modify-popover
              :isBuy="scope.row.cmd ==0"
              :price="+scope.row.open_price"
              :old-val="+scope.row.sl"
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
              :isBuy="scope.row.cmd ==0"
              :isLoss="false"
              :price="+scope.row.open_price"
              :old-val="+scope.row.tp"
              @change="confirmChangeStopWin($event,scope.row)"
            >
            </modify-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="commission"
          label="佣金">
        </el-table-column>
        <el-table-column
          label="浮动盈亏"
          prop="profit_flot">
          <template slot-scope="scope">
            {{profitFloat(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="open_time"
          width="150px"
          label="开仓时间">
        </el-table-column>
        <el-table-column
          prop="ticket"
          label="持仓单号">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          lang="center"
          width="80">
          <template slot-scope="scope">
            <el-tag size="small" style="cursor: pointer;" @click="close(scope.row)">平仓</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
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
    <el-dialog title="平仓" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               append-to-body
               class="closeOrder"
               width="500px">
      <div class="close">
        <div class="volume">
          <span>平仓手数:</span>
          <el-input-number v-model="num"
                           :precision="2"
                           :step="0.01"
                           controls-position="right"
                           :min="0.01" :max="0.5">
          </el-input-number>
        </div>
        <div class="tips">平仓手数为0.01~{{maxNum}}手</div>
        <el-row :gutter="20">
          <el-col :span="24" class="list">
            <span class="label">币种: </span>
            <span class="val">{{current.symbol}}</span>
          </el-col>
          <el-col :span="24" class="list">
            <span class="label">开仓方向: </span>
            <span class="val">{{current.cmd_name}}</span>
          </el-col>
          <el-col :span="24" class="list">
            <span class="label">开仓价格: </span>
            <span class="val">{{current.open_price}}</span>
          </el-col>
          <el-col :span="24" class="list">
            <span class="label">当前价格: </span>
            <span class="val" style="color: #FD6751">{{ticker.LASTPRICE}}</span>
          </el-col>
          <el-col :span="24" class="list">
            <span class="label">浮动盈亏: </span>
            <span class="val">{{current.profit}}</span>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmsClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import modifyPopover from './modifyPopover.vue'
  import OrderSocket from '@/plugins/orderSocket.js';
  import { md5pwd } from '@/common/util'
  import { mapState } from 'vuex'
  import Up from '@/views/svg/up';
  import Down from '@/views/svg/down';
  export default {
    name: 'modifyOrderTable',
    components: {
      modifyPopover,
      Up,
      Down
    },
    props: {
      maxHeight: {
        type: Number,
        default: 277
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
      ticker: {}, // 当前 k 线的货币对
      data: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      activeButtonList() {
        return this.$store.state.activeButtonList;
      },
      kLineIndexList() {
        return this.$store.state.kLineIndexList;
      },
      ...mapState([
        'md5Key'
      ])
    },
    data() {
      return {
        loading: false,
        noMore: false,
        dialogFormVisible: false,
        num: 0, // 平仓手数
        maxNum: 0, // 平仓最大手数
        current: {},
        orderSocket: null,
        modifyorderObj: {
          ORDERID: '', // 交易所成交单ID
          CMD: '', // 订单类型
          ORDERBY: '', // 下单账号
          OPENPRICE: '', // 下单价格
          SL: '', // 止损价格
          TP: '' // 止盈价格
        },
        pageSize: 10
      }
    },
    methods: {
      // 计算浮动盈亏 卖单
      profitFloat(row) {
        let { allSymbolsInfo } = this.$store.state;
        let calResult = 0;
        let symbol = null;
        const typeCFD = ['100', '200', '300', '500'];
        const typeFut = ['400'];
        // 得到当前货币对信息
        /* start */
        for (let v of allSymbolsInfo) {
          if (v.symbol === row.symbol) {
            symbol = v;
            break;
          }
        }
        const widthUSD = () => {
          for (let v of allSymbolsInfo) {
            const reg = new RegExp(v.symbol.replac(/usd/i, ''), 'i');
            if (reg.test(row.symbol)) {
              return v;
            }
          }
        }
        /* end */
        const { BID, ASK } = symbol; // 买价  卖价 0 1
        const { margin_cal_type, contract_size, volume, tick_price, tick_size, cmd } = row; // 计算模式   合约量  手数
        const BASE = [BID, ASK][cmd];
        if (/usd/i.test(row.symbol)) {
          // typeCFD 计算方法
          if (!!~typeCFD.indexOf(margin_cal_type)) {
            calResult = (+BASE  - +row.open_price) * +contract_size * +volume;
            // 不是以USD（美元）作为计算货币，需要转化, 如果是 USD 则不需要该步奏，上述结果就是最总结果
            if (row.value_currency !== 'USD') {
              const USDSymbol = widthUSD();
              // 美元开始
              if(/^USD/i.test(row.symbol)) {
                calResult /= +USDSymbol.ASK;
              } else {
                calResult *= +USDSymbol.ASK;
              }
            }
          } else if (!!~typeFut.indexOf(margin_cal_type)) {
            // Futures 计算方法
            calResult = (+BASE  - +row.open_price) * (+tick_price / +tick_size) * +volume;
            // 不是以USD（美元）作为计算货币，需要转化, 如果是 USD 则不需要该步奏，上述结果就是最总结果
            if (row.value_currency !== 'USD') {
              const USDSymbol = widthUSD();
              // 美元开始
              if(/^USD/i.test(row.symbol)) {
                calResult /= +USDSymbol.ASK;
              } else {
                calResult *= +USDSymbol.ASK;
              }
            }
          } else {
            throw new Error('浮动盈亏计算方法不存在')
          }
        }
        row.profit_flot = calResult;
        return calResult.toFixed(5);
      },
      // 止损
      confirmChangeStopLoss(val, row) {
        this.modifyorderObj.ORDERID = row.ticket.replace(/^#/, '');
        this.modifyorderObj.ORDERBY = this.$store.state.account;
        this.modifyorderObj.CMD = row.cmd;
        this.modifyorderObj.OPENPRICE = row.open_price;
        this.modifyorderObj.SL = val + '';
        this.modifyorderObj.TP = row.tp + '';
        this.modifyorderObj.SYMBOL = row.symbol;
        this.modifyorderObj.VOLUME = row.volume+ '';
        this.modifyorder(this.modifyorderObj);
      },
      // 止盈
      confirmChangeStopWin(val, row) {
        this.modifyorderObj.ORDERID = row.ticket.replace(/^#/, '');
        this.modifyorderObj.ORDERBY = this.$store.state.account;
        this.modifyorderObj.CMD = row.cmd;
        this.modifyorderObj.OPENPRICE = row.open_price;
        this.modifyorderObj.SL = row.sl + '';
        this.modifyorderObj.TP = val + '';
        this.modifyorderObj.SYMBOL = row.symbol;
        this.modifyorderObj.VOLUME = row.volume+ '';
        this.modifyorder(this.modifyorderObj);
      },
      // 修改订单
      modifyorder(obj) {
        obj.SIGNATURE = md5pwd(this.md5Key, obj.ORDERBY, obj.OPENPRICE);
        const message = JSON.stringify(obj)
        this.orderSocket.modifyorderSendmessage(message).then((res) => {
          this.$root.$emit('getPendingOrder')
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
          }).catch(e => {
          });
      },
      // 平仓
      close(row) {
        this.dialogFormVisible = true
        this.num = row.volume
        this.maxNum = row.volume
        this.current = row
      },
      // 平仓
      confirmsClose() {
        const { ticket, cmd , symbol} = this.current
        const ORDERBY = this.$store.state.account;
        const ORDERID =ticket.replace(/^#/, '');
        const SIGNATURE = md5pwd(this.md5Key, ORDERBY,'' ,ORDERID);
        const obj = {
          ORDERBY,
          ORDERID,
          CMD: cmd,
          VOLUME: this.num+'',
          SYMBOL: symbol,
          SIGNATURE
        }
        const message = JSON.stringify(obj)
        this.orderSocket.closeorderSendmessage(message).then((res) => {
          this.$root.$emit('getPendingOrder')
          this.$notify({
            title: '成功',
            message: '平仓成功',
            type: 'success'
          })
        }).finally(res=>{
          this.dialogFormVisible = false
        })
      },
      handleCurrentChange(val) {
        this.$emit('change', val)
      },
    },
    created() {
      this.$store.dispatch('getMd5Key')
      this.orderSocket = new OrderSocket();
      // this.$http.post('Panel/getToAddSymbols').then(res => {
      //   console.log(res);
      // })
    }
  }
</script>
<style lang="scss">
  .el-dialog {
    .el-dialog__header {
      border-bottom: 1px solid #D7E5FF;
      height: 40px;
      line-height: 40px;
      padding: 0;
      text-align: left;

      .el-dialog__title {
        color: #333333;
        font-size: 14px;
        padding-left: 20px;
      }

      .el-dialog__headerbtn {
        top: 12px;
      }
    }

    .dialog-footer {
      text-align: center;
    }

    .el-button {
      width: 300px;
      margin: 0 auto;
    }
    .close {
      width: 300px;
      margin: 0 auto;
      text-align: left;

      .volume {
        height: 30px;
        display: flex;
        justify-content: space-between;

        span {
          color: #666;
          font-size: 14px;
          line-height: 30px;
        }

        /deep/ .el-input-number {
          width: 220px;
          height: 30px;
          line-height: 30px;

          .el-input-number__increase {
            width: 16px;
            line-height: 15px;
            border-bottom: 0;
            background-color: $bgColor;

            &:focus, &:active {
              background: #ceb2ec;
            }

            :root .theme-dark & {
              background: #5171d2;
              border-left-color: #5171d2;

              &:focus, &:active {
                background: #354490;
              }
            }
          }

          .el-input-number__decrease {
            width: 16px;
            line-height: 15px;
            border-bottom: 0;
            background-color: $bgColor;

            &:focus, &:active {
              background: #ceb2ec;
            }

            :root .theme-dark & {
              background: #5171d2;
              border-left-color: #5171d2;

              &:focus, &:active {
                background: #354490;
              }
            }
          }

          .el-icon-arrow-up, .el-icon-arrow-down {
            color: $color;

            :root .theme-dark & {
              color: #ffffff;
            }
          }

          .el-input__inner {
            height: 30px;
            border-radius: 4px;
            text-align: left;
            border-color: #A5ADC4;
            color: #697797;
            background: #fff;
            padding-left: 5px;
            padding-right: 16px;

            &:focus {
              border-color: $color;
            }

            :root .theme-dark & {
              border-color: #384266;
              background: $color-dark-bg;

              &:focus {
                border-color: #5d5ed6;
              }
            }
          }
        }
      }

      .tips {
        color: #999;
        font-size: 12px;
        text-align: right;
        margin: 5px 0 20px 0;
      }

      .list {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        font-size: 14px;

        .label {
          color: #666;
          font-size: 13px;
        }

        .val {
          color: #333333;
          font-weight: 600;
        }
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
  .el-table {
    thead {
      color: #b1b2b5;
    }

    .cell {
      text-align: center;
      .price {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        >div {
          line-height: 14px;
          height: 14px;
          width: 100%;
          display: flex;
          >img {
            width: 8px;
            height: 12px;
          }
        } 
        .rise {
          color: #00cb77 !important;
        }

        .fall {
          color: #ff392a !important;
        }
        .open {
          color: #b1b2b5;
        }
      }
    }

    th {
      background-color: #FFFFFF;
    }
  }
</style>
