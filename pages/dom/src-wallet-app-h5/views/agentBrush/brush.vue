/**
*  Created by   阿紫
*  On  2019/6/20 0020
*  Content 代理刷单
*/
<template>
  <div class='brush'>
    <div class="head">
      <span class="record" @click="goRecord">代理记录</span>
      <img src="./head.png" alt="">
      <p class="userId">ID：{{resultMap.userId}}</p>
      <p class="agent">{{resultMap.grade}}</p>
      <div class="award">
        <div>
          <p class="title">我的代理奖励({{resultMap.coinName}})</p>
          <p class="num">{{resultMap.agencyProfit}}</p>
        </div>
        <div class="btn" @click="getWithdrawal">立即提现</div>
      </div>
    </div>
    <div class="list">
      <cell title="我的邀请关系" class="invite">
        <span class="team">团队人数：<b style="color:#466AB2">{{resultMap.teamCount}}人</b></span>
      </cell>
      <tab :line-width="2" custom-bar-width="80px" active-color="#5E87D8">
        <tab-item selected @click.native="onItemClick(true)">一级代理</tab-item>
        <tab-item @click.native="onItemClick(false)">二级代理</tab-item>
      </tab>
      <group class="content">
        <group-title slot="title">账号<span style="float:right;">级别</span></group-title>
        <div v-show="isOne">
          <cell v-for="(item, index) in agencyInfoOne" :key="index" :title="item.userId" :value="item.grade"></cell>
        </div>
        <div v-show="!isOne">
          <cell v-for="(item, index) in agencyInfoTwo" :key="index" :title="item.userId" :value="item.grade"></cell>
        </div>
      </group>
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem, Cell, Group, GroupTitle} from 'vux'

  export default {
    name: "brush",
    components: {
      Tab,
      TabItem,
      Cell,
      Group,
      GroupTitle
    },
    data() {
      return {
        agencyInfoOne: [],
        agencyInfoTwo: [],
        resultMap: [],
        isOne: true,
      };
    },
    methods: {
      onItemClick(info) {
        this.isOne = info;
      },
      // 查看代理邀请信息
      getQueryAgencyInfo() {
        this.$http2.post('/wallet/app/cloud/shop/queryAgencyInfo', {}, {needToken: true}).then(res => {
          const {agencyInfoOne, agencyInfoTwo, resultMap} = res.result;
          this.agencyInfoOne = agencyInfoOne;
          this.agencyInfoTwo = agencyInfoTwo;
          this.resultMap = resultMap;
        })
      },
      // 提现
      getWithdrawal() {
        if (this.resultMap.agencyProfit == 0) {
          this.$vux.toast.text('没有可提现余额', 'middle')
          return
        }
        this.$http2.post('/wallet/app/cloud/withdrawal', {
          coinName: this.resultMap.coinName,
          type: 'agency'
        }, {needToken: true}).then(res => {
          this.getQueryAgencyInfo();
          this.$vux.toast.text('提现操作成功', 'middle')
        })
      },
      goRecord () {
        this.$router.push({
          name: 'record'
        })
      }
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      document.title = lang === 'zh' ? `代理挖宝` : `digging agent`;
      this.getQueryAgencyInfo();
      window.app.showShareIcon(false);
    }
  };
</script>
<style lang="less">
  .brush {
    background: #F4F6FA;

    .head {
      background: url("./bg.png") no-repeat center center / 100%;
      height: 200px;
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .record {
        position: absolute;
        top: 15px;
        right: 15px;
        color: #fff;
        font-size: 13px;
        background: none;
      }

      img {
        width: 70px;
        height: 70px;
      }

      .userId {
        color: #fff;
        font-weight: bold;
        line-height: 18px;
        font-size: 17px;
        margin: 5px 0;
      }

      .agent {
        color: #DFE6FF;
        font-size: 13px;
        margin-bottom: 15px;
      }

      .award {
        position: absolute;
        bottom: -35px;
        background: #fff;
        width: calc(~'100vw - 30px');
        border-radius: 10px;
        height: 70px;
        box-shadow: 0px 10px 32px 0px rgba(179, 186, 208, 0.4);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .title {
          color: #9FB2D6;
          font-size: 12px;
          line-height: 24px;
          font-weight: 500;
        }

        .num {
          color: #466AB2;
          line-height: 24px;
          font-weight: 800;
          font-size: 23px;
        }

        .btn {
          width: 80px;
          height: 30px;
          line-height: 30px;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          background: rgba(94, 135, 216, 1);
          border-radius: 30px;
        }
      }
    }

    .list {
      margin-top: 40px;

      .invite {
        line-height: 18px;
        font-size: 14px;

        .vux-cell-bd {
          color: #A5A5A5;
          font-weight: 500;
        }

        .team {
          color: #666666;
          font-weight: 500;

          b {
            font-weight: 600;
          }
        }
      }

      .weui-cells__title {
        background: #fff;
        margin: 0;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .content {
        overflow-y: scroll;
        background: #fff;
        height: calc(~'100vh - 340px');

        .vux-label, .weui-cell__ft {
          color: #575757;
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }
</style>
