/**
*  Created by   阿紫
*  On  2019-03-08
*  Content
*/
<template>
  <div class="projectList">
    <el-tabs v-model="isActiveChoose" @tab-click="handleClick">
      <el-tab-pane label="自选" name="0" v-if="cptToken"></el-tab-pane>
      <el-tab-pane :label="item.security_name" :name="index+1+''" v-for="(item, index) in tabs"
                   :key="index"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <ul class="title">
        <li>币种</li>
        <li>卖出价</li>
        <li>买入价</li>
        <li>最新价</li>
        <li>24H涨跌</li>
      </ul>
      <ul v-for="(item,index) in listData" :key='index' class="list">
        <li>
          <img @click="goDelChoose(item.symbol)" src="@/assets/project/stars.png" alt="" v-if="+isActiveChoose==0">
          <img @click="goChoose(item.symbol)" src="@/assets/project/star.png" alt="" v-else>
          <span @click="goTransaction(item.symbol)" style="cursor: pointer">
               {{item.symbol}} <span style="font-size:14px; color:#666;">{{item.symbol_name}}</span>
          </span>
        </li>
        <li  :class="{rise: symbols[item.symbol].isAskUp > 0 ,fall:symbols[item.symbol].isAskUp < 0 }">
          <i class="el-icon-bottom"
             v-if="symbols[item.symbol].isAskUp < 0"></i>
          <i class="el-icon-top"
             v-if="symbols[item.symbol].isAskUp > 0"></i>
          {{symbols[item.symbol].ASK || 0}}
        </li>
        <li  :class="{rise: symbols[item.symbol].isBidUp > 0 ,fall:symbols[item.symbol].isBidUp < 0 }">
          <i class="el-icon-bottom"
             v-if="symbols[item.symbol].isBidUp < 0"></i>
          <i class="el-icon-top"
             v-if="symbols[item.symbol].isBidUp > 0"></i>
          {{symbols[item.symbol].BID || 0}}
        </li>
        <li   :class="{rise: symbols[item.symbol].isNewUp > 0 ,fall:symbols[item.symbol].isNewUp < 0 }">
          <i class="el-icon-bottom"
             v-if="symbols[item.symbol].isNewUp < 0"></i>
          <i class="el-icon-top"
             v-if="symbols[item.symbol].isNewUp > 0"></i>
          {{symbols[item.symbol].LASTPRICE || 0}}
        </li>
        <li>
          {{symbols[item.symbol].changePrice || 0}}%
        </li>
      </ul>
      <div v-if="listData.length==0" class="onData">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
  import { subExchangeInfo, getIsConnect, createWebSocket } from '@/plugins/socket'
  import TakeSocket from '@/plugins/takeSocket'

  export default {
    name: 'projectList',
    data() {
      return {
        isActiveChoose: '0',
        tabs: [],
        list: {},
        listData: [],
        symbols: {}, // 所有币种
        cptToken: null,
        takeSocket: ''
      }
    },
    computed: {
      data() {
        // this.listData.forEach((item, index) => {
        //   if(this.symbols[item.symbol].ASK) {
        //     item = this.symbols[item.symbol]
        //   }
        // })
      }
    },
    methods: {
      handleClick() {
        this.listData = []
        if (this.isActiveChoose != 0) {
          const sec_wl_id = this.tabs[+this.isActiveChoose - 1].sec_wl_id
          this.getTabSymbols(sec_wl_id)
        } else {
          this.getMySymbols() // 获取自选货币
        }
      },
      // 获取tab
      getTabType() {
        this.$http.post('Panel/getTabType', {
          wl_no: 'CPT'
        }).then(res => {
          this.tabs = res.data.data
          if (this.cptToken) {
            this.isActiveChoose = '0'
            this.getMySymbols()
          } else {
            this.isActiveChoose = '1'
            this.getTabSymbols(this.tabs[0].sec_wl_id)
          }
        })
      },
      // 获取tab下的货币对
      getTabSymbols(sec_wl_id) {
        if (this.list[this.isActiveChoose] && this.list[this.isActiveChoose].length > 0) {
          this.listData = this.list[this.isActiveChoose]
          return
        }
        this.getTabSymbol(sec_wl_id)
      },
      getTabSymbol(sec_wl_id) {
        this.$http.post('Panel/getTabSymbols', {
          wl_no: 'CPT',
          sec_wl_id
        }).then(res => {
          const { data } = res.data
          this.listData = data
          this.$set(this.list, this.isActiveChoose, data)
        })
      },
      // 获取自选货币
      getMySymbols() {
        this.$http.post('MyPanel/getMySymbols').then(res => {
          const { data } = res.data
          this.listData = data
          this.$set(this.list, this.isActiveChoose, data)
        })
      },
      // 获取所有交易对
      getAllSymbols() {
        this.$http.post('Panel/getAllSymbols', {
          wl_no: 'CPT'
        }).then(res => {
          const { data } = res.data
          let symbolStr = ''
          data.forEach((item, index) => {
            this.symbols[item.symbol] = item
            symbolStr = index > 1 ? symbolStr + ',' + item.symbol : item.symbol
          })
          this.takeSocket.sendMessage(symbolStr)
        })
      },
      // 返回数据处理
      onmessage(e) {
        if (this.symbols[e.SYMBOL]) {
          this.$set(this.symbols, e.SYMBOL, {
            ...this.symbols[e.SYMBOL],
            ...e,
            isAskUp: +e.ASK - +this.symbols[e.SYMBOL].ASK,
            isBidUp: +e.BID - +this.symbols[e.SYMBOL].BID,
            isNewUp: +e.LASTPRICE - +this.symbols[e.SYMBOL].LASTPRICE,
            changePrice:  ((+e.LASTPRICE -  +this.symbols[e.SYMBOL].close_price)*100 / (+this.symbols[e.SYMBOL].close_price)).toFixed(2)
          })
          this.$nextTick(() => {
            this.$forceUpdate()
          })
        }
      },
      // 去交易
      goTransaction(symbol) {
        this.$router.push({
          path: '/project/trade',
          query: {
            symbol
          }
        })
      },
      // 绑定解绑自选
      goChoose(symbol) {
        if (!sessionStorage.getItem('cptToken')) {
          this.$message.warning(this.$t('_projectList.chooseWarning'))
          return
        }
        this.$http.post('/MyPanel/addMySymbols', {
          symbol
        })
          .then((res) => {
            if (+this.isActiveChoose == 0) {
              this.getMySymbols()
            } else {
              const sec_wl_id = this.tabs[+this.isActiveChoose - 1].sec_wl_id
              this.getTabSymbol(sec_wl_id)
            }
          })
          .catch((res) => {
            const { code, message } = res.data
            console.log(res, 'res')
          })
      },
      goDelChoose(symbol) {
        if (!sessionStorage.getItem('cptToken')) {
          this.$message.warning(this.$t('_projectList.chooseWarning'))
          return
        }
        this.$http.post('MyPanel/delMySymbols', {
          symbol
        })
          .then((res) => {
            if (+this.isActiveChoose == 0) {
              this.getMySymbols()
            } else {
              const sec_wl_id = this.tabs[+this.isActiveChoose - 1].sec_wl_id
              this.getTabSymbol(sec_wl_id)
            }
          })
          .catch((res) => {
            const { code, message } = res.data
            console.log(res, 'res')
          })
      }
    },
    async activated() {
      this.list = {}
      this.cptToken = sessionStorage.getItem('cptToken')
      this.getTabType()
      this.getAllSymbols()
      this.takeSocket = new TakeSocket({
        onmessage: this.onmessage
      })
    }
  }
</script>
<style lang="scss" scoped>
  .projectList {
    width: 1160px;
    padding: 20px;
    margin: 0 auto;
    background: #fff;

    /deep/ .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }

    .content {
      .title, .list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 40px;

        li {
          width: 20%
        }
      }

      .title {
        font-size: 14px;
        color: #666666;
      }

      .list {
        font-size: 16px;
        color: #333333;

        img {
          width: 16px;
          cursor: pointer;
        }

        i {
          font-weight: 600;
        }
      }
    }

    .onData {
      height: 40px;
      line-height: 40px;
    }

    .rise {
      color: #00cb77;
    }

    .fall {
      color: #ff392a;
    }
  }
</style>
