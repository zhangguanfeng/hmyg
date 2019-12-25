/**
*  Created by   阿紫
*  On  2019/6/30 0030
*  Content 排行榜
*/
<template>
  <div class='ranking'>
    <div class="title">
      <span class="left">名次</span> <span class="sum">金额（USD）</span> <span class="account">账号</span>
    </div>
    <scroller lock-x class="scroller" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
              :scroll-bottom-offst="200">
      <div>
        <div v-for="(item, index) in list" class="list" :key="index">
          <span class="left" style="color: #999;">{{index + 1}}</span> <span class="sum"
                                                                             style="color: #082C71;   font-weight:600;">{{item.sum}}</span>
          <span class="account" style="color: #999;">{{item.account}}</span>
        </div>
<!--        <load-more :tip="tips" v-if="onFetching" :show-loading="showLoading"></load-more>-->
        <div style=" display: flex; align-items: center; justify-content: center; height: calc(100vh - 80px)">8月13号上午10点开放,敬请期待</div>
      </div>
    </scroller>
  </div>
</template>
<script>
  export default {
    name: "ranking",
    data() {
      return {
        pageNum: 1,
        pageSize: 20,
        tips: '加载中……', // 加载提示
        showLoading: false,
        onFetching: true,
        list: []
      };
    },
    methods: {
      onScrollBottom() {
        if (!this.onFetching) {
          this.tips = '加载中……';
          this.showLoading = true;
          this.onFetching = true;
          this.pageNum += 1;
          this.getList();
        }
      },
      getList() {
        this.$http2.post('/cloud/app/eusc/open/getTodayEuscRank', {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then(res => {
          const {list, count} = res.result;
          this.onFetching = false;
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.list = this.pageNum == 1 ? list : [...this.list, ...list];
          if (!list.length) {
            this.onFetching = true;
            this.tips = '暂无数据';
            this.showLoading = false;
          }
          if (this.list.length == count) {
            this.onFetching = true;
            this.tips = '我是有底线的'
            this.showLoading = false;
          }
        }).catch(res => {
          this.onFetching = true;
          this.tips = '暂无数据';
          this.showLoading = false;
        })
      },
      transferShareParams(inviteCode='', name=""){
        const obj = {
          title: '邀请好友',
          iconUrl: '',
          jumpUrl: `${LocationURL}/#/EUSCInviteLanding?inviteCode=${inviteCode}`,
          content:`Hi～我是${name}，邀请你一起存EUSC赚钱，存币收益超高。活期理财，定期理财，节点奖励，每日分红......助你财富自由，快来一起赚收益!`,
        }
        window.app.transferShareParams(JSON.stringify(obj));
      },
      getInviteShareInfo  ()  {
        this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res=>{
          const {inviteCode, name} = res.result.map;
          this.transferShareParams(inviteCode, name);
        })
      }
    },
    activated() {
      document.title = 'EUSC排行榜';
      this.transferShareParams('', '');
      this.getInviteShareInfo();
      // this.getList();
    }
  };
</script>
<style lang="less">
  .ranking {
    background: #fff;
    height: 100%;
    overflow-y: scroll;
    font-size: 13px;

    .title, .list {
      display: flex;
      /*justify-content: space-around;*/
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      text-align: center;


      span {
        display: inline-block;
      }

      .left {
        width: 50px;
        font-weight: 500;
      }

      .sum {
        flex: 1;
        text-align: center;
      }

      .account {
        width: 88px;
        text-align: center;
        font-weight: 500;
      }
    }

    .title {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      background: #F4F6FA;
      color: #A5A5A5;
    }

    .list {
      background: #fff;
      margin-bottom: 1px;
    }

    .scroller {
      margin-top: 50px;
    }
  }
</style>
