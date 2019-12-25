<template>
  <div class="EuscLog">
    <div class="EuscLog-m">
        <div v-if="ListData.length>0">
            <div class="EuscLog-three" v-if="this.ptype==3||this.ptype==6">
                <span>奖励来源</span>
                <span>金额</span>
                <span>时间</span>
            </div>
            <div class="EuscLog-two" v-else>
                <span>金额</span>
                <span>时间</span>

            </div>
        </div>
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
            v-if="ListData.length>0"
        >
            <div class="EuscLog-m-cn">
                <ul class="three" v-if="this.ptype==3||this.ptype==6">
                    <li v-for="(item,key) in ListData" :key="key">
                        <span class="span-l">{{item.fromPhone}}</span>
                        <span class="span-m">{{item.amount}}</span>
                        <span class="span-r">{{item.create_time|time}}</span>
                    </li>
                </ul>
                <ul class="two" v-else>
                    <li v-for="(item,key) in ListData" :key="key">
                        <span>{{item.amount}}</span>
                        <span>{{item.create_time|time}}</span>
                    </li>
                </ul>
            </div>
        </scroller>
        <div class="EuscLog-m-cn-nodata" v-else>
            <div class="nodata-box">
                <img src="@/assets/img/financing/nodata.png" alt>
                <p>暂无记录～</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { Scroller,dateFormat  } from 'vux';
export default {
  name: 'myIncome',
  data() {
    return {
      // isAnd:'',
      isTwo:true,
      ptype:'',

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
    };
  },
  filters:{
      time(val){
          if(val) return dateFormat(new Date(val), 'YYYY-MM-DD')
          else return val

      }
  },
  components: {
    Scroller,
  },
  methods: {
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
            ptype:this.ptype,
            pageNum:this.pageIndex,
            pageSize:this.pageSize
        };
        this.$http2.get('/cloud/app/eusc/prize/getPrizeList', postdata, {needToken: true}).then(res=>{
            res.result.page.list.forEach(e => {
                this.ListData.push(e)
            });
            if (res.result.page.list.length < this.pageSize) {
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
        })
    },
  },
  activated() {
      this.ListData=[]
    if(this.$route.query.ptype){
        this.ptype=this.$route.query.ptype.toString()
    }
    switch(this.ptype){
        case '2':
            document.title = "节点奖励记录";
            break
        case '3':
            document.title = "邀请奖励记录";
            break
        case '4':
            document.title = "排行榜奖励记录";
            break
        case '5':
            document.title = "空投记录";
            break
        case '6':
            document.title = "增持奖励记录";
            break
        default:
            document.title = "记录";
            break;
    }
    if(window.app.showShareIcon){
        window.app.showShareIcon(false);
    }
    this.getListData();
  },
};
</script>
<style lang="less" scoped>
.EuscLog {
    background:#F4F6FA;
    height:100vh;
    .EuscLog-three{
        display: flex;
        background:#fff;
        line-height:40px;
        border-bottom:1px solid #e6e6e6;
        span{
            text-align:center;
            color:#A5A5A5;
            font-size:14px;
              flex: 1;
            display: block;
        }
    }
    .EuscLog-two{
        border-bottom:1px solid #e6e6e6;
        padding:0 20px;
        display: flex;
        background:#fff;
        line-height:40px;
        justify-content: space-between;
        span{

            text-align:center;
            color:#A5A5A5;
            font-size:14px;
            width:40%;
            display: block;
        }
    }
    .EuscLog-m {
        background: #fff;
        height: calc(100vh);
        .EuscLog-m-cn-nodata {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100% - 40px);
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
        .EuscLog-m-cn {
            height: calc(100%);
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .three {
                li {
                    display: flex;
                    justify-content: space-between;
                    padding: 7px 0px;
                    border-bottom: 1px solid #e6e6e6;
                    span{
                        flex:1;
                        text-align:center;
                        font-size:13px;
                    }
                    .span-l{
                        flex:1
                    }
                    .span-m{
                        flex:1;
                    }
                    .span-r{
                        flex:1;
                    }
                }
            }
            .two {
                li {
                    display: flex;
                    justify-content: space-between;
                    padding: 7px 20px;
                    border-bottom: 1px solid #e6e6e6;
                    span{
                        width:40%;
                        text-align:center;
                        font-size:13px;
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
