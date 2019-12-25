/**
*  Created by Hansen
*  On  2018-12-13
*  我的理财
*/
<template>
  <div class="mySPO">
    <NavBar
      :clickBack="clickBacks"
      :showRightText="true"
      :rightText="'历史'"
      :clickRigntText="clickRigntText"
      :title="'我的理财'"
    />
    <FinancingHeader
      :currentSPO="headerInfo"
      :listInfo="listInfo"
      :needButton="true"
    />
    <tab active-color="#5E87D8" default-color="#9BA8BB" custom-bar-widt="50px">
      <tab-item selected @on-item-click="onItemClick">已购买</tab-item>
      <tab-item @on-item-click="onItemClick">未付款</tab-item>
    </tab>
    <scroller
      lock-x
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="100"
      class="bot"
      height="-206"
    >
      <div class="box">
        <ul class="list">
          <li v-for="(item,index) in list" :key="index" @click="toDetail(item.proId)">
            <div class="left">
              <div class="logo"></div>
              <div class="con">
                <p class="tit">{{item.name}}</p>
                <p v-if="tanIndex === 0" class="tip">购买时间：{{returnTimer(item.createTime)}}</p>
                <p v-if="tanIndex === 1" class="tip">{{item.countdown}}</p>
              </div>
            </div>
            <div class="right">
              <!-- 已购买 -->
              <div v-if="tanIndex === 0" class="hasBuy">
                <b>收益:</b>
                <span class="enter">{{item.earnings || 0}} {{item.coinName}}</span>
                <i class="right_icon"></i>
              </div>
              <!-- 未付款 -->
              <div v-if="tanIndex === 1" class="handle">
                <ol>
                  <li class="cancle" @click="cancleClick(item.proId)">取消</li>
                  <li class="pay" @click="payClick(item.proId)">付款</li>
                  <!-- <li class="cancle">交易取消</li> -->
                </ol>
              </div>
            </div>
          </li>
        </ul>
        <load-more v-if="onFetching" tip="努力加载中"></load-more>
      </div>
    </scroller>
    <div class="suspension">
      <div class="out" @click="handleClick('out')">转出</div>
      <div class="in" @clicl="handleClick('in')">转入</div>
    </div>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  Scroller,
  LoadMore,
  Grid,
  GridItem,
  Countup,
  Confirm,
  XButton,
  dateFormat
} from "vux";
import FinancingHeader from './header-com';
import {timer} from '../../common/unti';
import NavBar from './nav-com';
import { setInterval } from 'timers';
export default {
  name: "mySPO",
  components: {
    Tab,
    TabItem,
    Scroller,
    LoadMore,
    Grid,
    GridItem,
    Countup,
    Confirm,
    XButton,
    FinancingHeader,
    NavBar,
  },
  data: function() {
    return {
      bottomCount: 7,
      onFetching: false,
      tanIndex: 0,
      SPOInfo:{},
      listInfo:[
        {title:'昨日收益',count:0},
        {title:'持仓资产',count:0},
        {title:'余额',count:0},
      ],
      headerInfo:{title:'当前资产（SPO）',count:0},
      option:{
        recdStatus:1,//1成功8未付款
        pageNum:1,
        pageSize:20
      },
      list:[],
      interVal:{}

    };
  },
  methods: {
    getInfo(){
      this.$http.post('/wallet/app/cloud/finance/getMyFinanceAccount',{},{needToken:true}).then(res=>{
        this.SPOInfo = res.result;
        this.headerInfo.count = this.SPOInfo.totalAmount;
        this.listInfo[0].count = this.SPOInfo.yesterdayEarnings > 0 ? '+' + this.SPOInfo.yesterdayEarnings : '-' + this.SPOInfo.yesterdayEarnings;
        this.listInfo[1].count = this.SPOInfo.holdAmount;
        this.listInfo[2].count = this.SPOInfo.remainAmount;
      })
    },
    onItemClick(index) {
      if(this.tanIndex != index){
        this.tanIndex = index;
        this.option.recdStatus = index == 0 ? 1 : 8;
        this.getList()
      }
    },
    getList(){
      this.$http.post('/wallet/app/cloud/finance/getFinanceProRecds',this.option,{needToken:true}).then(res=>{
        let thirtyTimers = 40 * 60 * 1000;
          this.list = res.result.list;
        if(this.tanIndex == 1){
          setInterval(()=>{
            thirtyTimers -= 1000;
              res.result.list.map((item,index)=>{
              let curTimers = +new Date();
              let remainingTimers = +thirtyTimers - (+curTimers - +item.createTime);
              if(remainingTimers > 0){
                item.countdown = `还有${dateFormat(new Date(remainingTimers), 'mm分ss秒')}交易取消`
              }else{
                item.countdown = `${this.returnTimer(item.createTime,true)} 交易取消`
              }
            })

          },1000)
        }
      })
    },
    // 倒计时
    countDown(list){

    },
    onScrollBottom() {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.bottomCount += 10;
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.onFetching = false;
        }, 2000);
      }
    },
    toDetail(i){
      if(this.tanIndex == 0){
        this.$router.replace({
          name: 'GhomeDetail',
          query: {
            id: i
          }
        })
      }

    },
    handleClick(type){
      this.$router.replace({name:'outOrIn',query:{type:type}})
    },
    returnTimer(time,flag){
      return timer(time,flag)
    },
    cancleClick(id){
        this.$vux.confirm.show({
          title: '提示',
          content: '确认取消吗？',
          onCancel () {
          },
          onConfirm () {
            this.$http.post('/wallet/app/cloud/finance/cancelOrder',{recdId:id},{needToken:true}).then(res=>{
              console.log(res)
            })
          }
        })

    },
    payClick(id){
      console.log('付款' + id)
    },
    clickBacks(){
      // 返回客户端页面
      window.closeWebView();
    },
    clickRigntText(){
      this.$router.replace({name:'fanancialHistory'})
    },

    timer(createTime,index){
        const thirtyTimers = 40 * 60 * 1000;
        const curTimers = +new Date();
        let remainingTimers = +thirtyTimers - (+curTimers - +createTime);

        if(remainingTimers > 0){
          this.interVal[index] = setInterval(()=>{
            return `还有${dateFormat(new Date(remainingTimers), 'mm分ss秒')}交易取消`
          },1000)
        }else{
          return `${this.returnTimer(createTime,true)} 交易取消`
        }
     }

  },
  mounted() {
    this.getInfo();
    this.getList();
  }
};
</script>

<style scoped lang="less">
.mySPO {
  background: #f4f6fa;
}

.list {
  padding: 0 18px 0 19px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 70px;
  >li {
    overflow: hidden;
    min-height: 60px;
    padding: 8px 0 0px 0;
    border-bottom: 1px solid #C8CFDE;
    box-sizing: border-box;
    &:last-child {
      border-bottom: none;
    }
    .left {
      float: left;
      overflow: hidden;
      .logo {
        display: inline-block;
        float: left;
        width: 29px;
        height: 29px;
        margin-top: 7px;
        background: url("../../assets/img/financing/ghome.png") no-repeat center /
          100% 100%;
      }
      .con {
        float: left;
        margin-left: 5px;
        .tit {
          color: #545454;
          font-size: 15px;
        }
        .tip {
          font-size: 11px;
          color: #9ba8bb;
        }
      }
    }
    .right {
      float: right;
      .hasBuy {
        line-height: 43px;
        b {
          color: #9ba8bb;
          font-size: 13px;
        }
        span {
          color: #5e87d8;
          font-size: 15px;
        }
        i {
          display: inline-block;
          width: 8px;
          height: 12px;
          background: url("../../assets/img/financing/right_icon.png") no-repeat
            center / 100% 100%;
        }
      }
    .handle{
      ol{
        >li{
          height: 19px;
          padding: 0 10px;
          display: inline-block;
          font-size: 14px;
          line-height: 19px;
          border-right: 1px solid #C8CFDE;
          margin-top: 12px;
          &:last-child {
            border-right: none;
          }
          &.cancle{
            color: #9BA8BB;
          }
          &.pay{
            color: #5E87D8;

          }
        }
      }
    }

    }
  }
}
.suspension{
  height: 50px;
  padding: 5px 15px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  div{
    width: 48%;
    display: inline-block;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    border-radius: 6px;

  }
  .out{
    background: #9A83FF;
    float: left;
  }
  .in{
    background: #5E87D8;
    float: right;
  }
}
</style>
