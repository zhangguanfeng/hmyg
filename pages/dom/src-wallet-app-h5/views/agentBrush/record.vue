/**
*  Created by   阿紫
*  On  2019/7/22 0022
*  Content  返佣记录
*/
<template>
    <div class='record'>
     <div class="select">
       <span @click="typeClick" class="type">{{type==0?'返佣':'直推奖励'}}</span>
       <datetime  v-model="createDay" @on-confirm="datetimeConfirm" ></datetime>
     </div>
      <div class="title">
        <span class="left">{{title[0]}}</span> <span class="sum">{{title[1]}}</span> <span class="account">{{title[2]}}</span>
      </div>
      <scroller lock-x class="scroller" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"
                :scroll-bottom-offst="200">
        <div>
          <div v-for="(item, index) in list" class="list" :key="index">
            <span class="left" style="color: #999;">{{item.phone}}</span>
            <span class="sum" style="color: #082C71;   font-weight:600;">{{item.amount}}</span>
            <span class="account" style="color: #999;">{{item.profitAmount}}</span>
          </div>
          <load-more :tip="tips" v-if="onFetching" :show-loading="showLoading"></load-more>
        </div>
      </scroller>

      <div v-transfer-dom>
        <popup v-model="typeShow">
          <!-- group already has a top border, so we need to hide header's bottom border-->
          <popup-header
            left-text="取消"
            right-text="确定"
            :show-bottom-border="false"
            @on-click-left="typeShow = false"
            @on-click-right="typeConfirm"></popup-header>
          <group gutter="0">
            <radio :options="typList" v-model="isType"></radio>
          </group>
        </popup>
      </div>

    </div>
</template>
<script>
  import { PopupHeader, Radio, TransferDom, Datetime , dateFormat } from 'vux';

    export default {
        name: "record",
      directives: {
        TransferDom
      },
      components: {
        PopupHeader,
        Radio,
        Datetime
      },
      data() {
        return {
          pageNum: 1,
          pageSize: 20,
          createDay:dateFormat(new Date, 'YYYY-MM-DD'),
          type: 0,
          isType: 0,
          tips: '加载中……', // 加载提示
          showLoading: true,
          onFetching: true,
          list: [],
          title: ['返佣对象', '挖宝量', '返佣(SPO)'],
          typeShow: false,
          typList: [{
            key: 0,
            value: '返佣'
          },{
            key: 1,
            value: '直推奖励'
          }]
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
          const {type,createDay} = this;
          this.$http2.post('/wallet/app/cloud/queryAgencyLog', {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            createDay:dateFormat(createDay, 'YYYYMMDD') ,
            type
          },{needToken:true}).then(res => {
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
        typeClick() {
          this.typeShow = true;
          this.isType = this.type;
        },
        typeConfirm() {
          this.typeShow = false;
          this.pageNum = 1;
          this.type = this.isType;
          this.title = this.isType  ==0 ? ['返佣对象', '挖宝量', '返佣(SPO)'] :  ['邀请对象', '收益(SPO)', '直推奖励(SPO)'];
          this.getList();
        },
        datetimeConfirm() {
          this.pageNum = 1;
          this.getList();
        }
      },
      activated() {
        document.title = '返佣记录';
        this.type = 0;
        this.title = ['返佣对象', '挖宝量', '返佣(SPO)'];
        this.createDay = dateFormat(new Date, 'YYYY-MM-DD');
        this.getList();
        window.app.showShareIcon(false);
      }
    };
</script>
<style lang="less">
    .record {
      background: #F4F6FA;
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
      .vux-cell-value {
        color: #666;
      }
      .type {
        position: relative;
        &:after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 0 2px 2px  0;
          border-color: #999;
          border-style: solid;
          -webkit-transform:  matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform:  matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -5px;
          right: -15px;
        }
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
