<template>
  <div class='extractRecord'>
    <div class="select">
      <span class="type"></span>
      <datetime  v-model="createDay" @on-confirm="datetimeConfirm" ></datetime>
      <x-icon type="ios-arrow-down" size="15"></x-icon>
    </div>
    <div class="title">
      <span class="left">{{title[0]}}</span> <span class="sum">{{title[1]}}</span> <span class="account">{{title[2]}}</span>
    </div>
    <scroller lock-x class="scroller" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
              :scroll-bottom-offst="200">
      <div>
        <div v-for="(item, index) in list" class="list" :key="index">
          <span class="left" style="color: #999;">USDT</span>
          <span class="sum" style="color: #082C71;   font-weight:600;">{{item.amount}}</span>
          <span class="account" style="color: #999;">{{conversionTime(item.created_at)}}</span>
        </div>
        <load-more :tip="tips" v-if="onFetching" :show-loading="showLoading"></load-more>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Datetime , dateFormat } from 'vux';

export default {
  name: "loadingRecord",
  components: {
    Datetime
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 20,
      createDay:dateFormat(new Date, 'YYYY/MM/DD'),
      tips: '加载中……', // 加载提示
      showLoading: true,
      onFetching: true,
      list: [],
      title: ['类型', 'USDT理财包', '时间']
    };
  },
  methods: {
    onScrollBottom() {
      if (!this.onFetching) {
        this.tips = '加载中……'
        this.showLoading = true;
        this.onFetching = true;
        this.pageNum += 1;
        this.getList();
      }
    },
    getList() {
      const {createDay} = this;
      const pool_id = this.$route.query.pool_id;
      this.$http2.post('invest/financeApi/getExDepositList', {
        page: this.pageNum,
        page_size: this.pageSize,
        query_time: dateFormat(createDay, 'YYYY/MM/DD'),
        pool_id: pool_id
      },{needToken: true}).then(res => {
        const { data, total_count } = res.result;
        this.onFetching = false;
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
        this.list = this.pageNum == 1 ? data : [...this.list, ...data];
        if (!data.length) {
          this.onFetching = true;
          this.tips = '暂无数据';
          this.showLoading = false;
          return
        }
        if (this.list.length == total_count) {
          this.onFetching = true;
          this.tips = ''
          this.showLoading = false;
        }
      }).catch(res => {
        this.onFetching = true;
        this.tips = '暂无数据';
        this.showLoading = false;
      })
    },
    datetimeConfirm() {
      this.pageNum = 1;
      this.getList();
    },
    
    conversionTime(val) {
      return val.slice(0, 5);
    }
  },
  activated() {
    document.title = '购买记录';
    this.title = ['类型', 'USDT理财包', '时间'];
    this.createDay = dateFormat(new Date, 'YYYY/MM/DD');
    this.getList();
    window.app.showShareIcon(false);
  }
}; 
</script>
<style lang="less">
  .extractRecord {
    background: #F4F6FA;
    height: 100%;
    overflow-y: scroll;
    font-size: 13px;

    .title, .list {
      display: flex;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      text-align: center;
      background: #fff;


      span {
        display: inline-block;
      }

      .left {
        width: 60px;
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
      top: 40px;
      left: 0;
      right: 0;
      z-index: 2;
      color: #A5A5A5;
    }

    .list {
      margin-bottom: 1px;
    }
    .select {
      background: #F4F6FA;
      position: fixed;
      top: 0;
      left: 20px;
      right: 20px;
      z-index: 2;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      color: #666;
      .vux-x-icon {
      position: absolute;
      top: 13px;
      right: -15px;
    }
      .vux-cell-value {
        color: #666;
      }
      .type {
        position: relative;
      }
      .weui-cell_access .weui-cell__ft:after {
        border-color: #999;
        border-width: 0 2px 2px  0;
        right: -5px;
        margin-top: -5px;
      }
    }
    .scroller {
      margin-top: 90px;
      background: #fff;
      padding-bottom: 50px;
    }
  }
</style>
