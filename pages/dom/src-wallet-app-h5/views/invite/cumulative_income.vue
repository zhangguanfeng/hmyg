/*
 * @Author: dubbing
 * @Content: 好友邀请->累计收益
 * @Date: 2019-07-17 16:23:14
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-18 15:34:24
 */

<template>
    <div class="cumulative_income">
        <ul class="cumulative_income__theader">
            <li class="cumulative_income__th">币种</li>
            <li class="cumulative_income__th">数量</li>
            <li class="cumulative_income__th">类别</li>
            <li class="cumulative_income__th">时间</li>
        </ul>


        <div class="cumulative_income__tbody">

                <scroller
                    v-model="scrollerStatus"
                    lock-x
                    :height="height"
                    scrollbar-y
                    :pullup-config="upobj"
                    @on-scroll-bottom="onScrollBottom"
                    ref="scrollerBottom"
                    :scroll-bottom-offst="200"
                    :use-pullup="showUp"
                    @on-pullup-loading="selPullUp"
                    :bounce="isbounce"

                >
                    <div style="height:100%;overflow-y:auto;"   v-if="ListData.length>0">
                        <ul class="cumulative_income__tr" v-for="(item,key) in ListData" :key="key">
                            <li class="cumulative_income__currency">{{item.coinName}}</li>
                            <li class="cumulative_income__amount">{{item.amount}}</li>
                            <li class="cumulative_income__type">{{item.returnType}}</li>
                           <li class="cumulative_income__time">{{item.createTime | dateFormat('YYYY-MM-DD')}}</li>
                        </ul>
                    </div>
                    <div class="nodata" v-else>
                        <div class="nodata-box">
                            <img src="@/assets/img/financing/nodata.png" alt>
                            <p>暂无记录～</p>
                        </div>
                    </div>
                </scroller>

        </div>

    </div>
</template>
<script>
import { Scroller, dateFormat  } from 'vux';
export default {
    name: "cumulativeIncome",
    data() {
        return{
            height: '-35',
            showUp: true,
            isbounce: true,
            upobj: {
                content: '上拉加载更多',
                pullUpHeight: 60,
                autoRefresh: false,
                downContent:
                '<spn class="iconfont icon-more" style="font-size:12px"></span>释放后加载',
                upContent: '',
                loadingContent:
                '<spn class="iconfont icon-more" style="font-size:12px"></span>加载中...',
                clsPrefix: 'xs-plugin-pullup-',
                color: '#fff',
            },
            scrollerStatus: {
                pullupStatus: 'default',
            },
            ListData: [],
            pageIndex: 1,
            pageSize: 10,
            isMounted: false,
        }
    },
  filters: {
    dateFormat
  },
    components: {
        Scroller,
    },
    methods:{
        // 监听下拉,暂时无使用
        onScrollBottom() {},
        // 上拉加载回调
        selPullUp() {
            this.pageIndex++;
            this.getListData();
        },
        // 获取记录
        getListData() {
            const postdata = {

                pageNum:this.pageIndex,
                pageSize:this.pageSize
            };
            this.$http2.post('/cloud/app/agency/queryAllRecordList', postdata, {needToken: true}).then(res=>{
                res.result.list.forEach(e => {
                    this.ListData.push(e)
                });
                if (res.result.list.length < this.pageSize) {
                    this.isbounce = false;
                    this.showUp = false;
                    if (!this.isMounted) {
                        this.isMounted = true;
                    } else {
                        this.$refs.scrollerBottom.disablePullup();
                    }
                } else if (!this.isMounted) {
                    this.isMounted = true;
                } else {
                    this.$refs.scrollerBottom.donePullup();
                }
                /* if (res.result.list.length < this.pageSize) {
                    this.isbounce = false;
                    this.showUp = false;
                    this.$refs.scrollerBottom.disablePullup();
                }  else {
                    this.$refs.scrollerBottom.donePullup();
                } */
            })
        },
    },
    mounted(){
        this.ListData=[]
        if(window.app.showShareIcon){
            window.app.showShareIcon(false);
        }

        document.title = "累计收益";
        this.getListData();
    }
};
</script>

<style lang="less" scoped>
@col1: 86px;
@col2: 82px;
@col3: 82px;
// @col4: 96px;
.cumulative_income {
  &__theader {
    display: flex;
    // justify-content: space-between;
    // padding: 6px 0;
    padding: 6px 0 6px 0;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    line-height: 19px;
    // text-align: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  &__th {
      width:25%;
      text-align:center;
    /* &:nth-child(1) {
      width: @col1;
    }
    &:nth-child(2) {
      width: @col2;
      text-align: center;
    }
    &:nth-child(3) {
      width: @col3;
      text-align: right;
    } */
    /* &:nth-child(4) {
      flex: 1;
      text-align: right;
    } */
    // &:first-child {
    //   width: 100px;
    // }
    // &:not(:last-child) {
    //   width: 96px;
    // }
  }
  &__tbody {

    height:calc(100vh - 32px)
  }
  &__tr {
    display: flex;
    padding: 15px 0px 10px 0px;
    text-align: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  &__currency {
    // flex: 0.8;
    // width: 96px;
    width: 25%;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    line-height: 21px;
    text-align: center;
  }
  &__amount {
    // flex: 1;
    // width: 70px;
    width: 25%;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 21px;
    text-align:center;
  }
  &__type {
    // flex: 1;
    // width: 70px;
    width: 25%;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(132, 132, 132, 0.7);
    line-height: 21px;
    text-align:center;
  }
  &__time {
    flex: 1;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    width: 25%;
    font-weight: 400;
    color: rgba(132, 132, 132, 0.7);
    line-height: 21px;
    text-align: center;
  }
    .nodata {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 32px);
        .nodata-box {
            text-align: center;
            img {
                width: 80px;
                height: 80px;
            }
            p {
                color: #989898;
            }
        }
    }
}
</style>
