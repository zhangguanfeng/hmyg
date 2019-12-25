<template>
  <div class="history">
    <NavBar
      :clickBack="clickBacks"
      :showRightText="false"
      :title="'历史'"

    />
    <scroller
      lock-x
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="100"
      class="bot"
    >
      <div class="box">
    <ul class="list">
          <li v-for="(item,index) in list" :key="index">
            <div class="left">
              <div class="logo"></div>
              <div class="con">
                <p class="tit">{{item.name}}</p>
                <p class="tip">{{returnTimer(item.createTime)}}</p>
              </div>
            </div>
            <div class="right">
              <div  class="hasBuy">
                <span :class="item.amount > 0 ? 'out' : 'enter'">{{item.amount > 0 ? '+' + item.amount : '-' + item.amount}} {{item.coinName}}</span>
              </div>
            </div>
          </li>
        </ul>
        <load-more v-if="onFetching" tip="努力加载中"></load-more>
      </div>
    </scroller>
    <div class="nodata" >
      <div class="nodataImg">
        <i></i>
        <span>暂无记录~</span>
      </div>
    </div>
  </div>
</template>

<script>
import {Scroller,LoadMore,} from 'vux'
import NavBar from './nav-com';
import {timer} from '../../common/unti'
export default {
  name: 'fanancialHistory',
  components:{
    Scroller,LoadMore,NavBar
  },
  data: function() {
    return {
      onFetching: false,
      bottomCount: 7,
      option:{
        pageSize:10,
        pageNum:1,
        proType:'REGULAR'
      },
      list:[]
    }
  },
  methods: {
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
    clickBacks(){
      this.$router.replace({name:'financing_mySPO'})
    },
    getList(){
      this.$http.post('/wallet/app/cloud/finance/getFinaceRecdList',this.option,{needToken:true}).then(res=>{
        console.log(res)
        this.list = res.result.list;

      })
    },
    returnTimer(time){
      return timer(time,true)
    },
  },
  mounted(){
    this.getList()
  }
}
</script>

<style scoped lang="less">
.nodata{
  position: relative;
  height: 100%;
  .nodataImg{
    text-align: center;
    width: 90px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    i{
      display: inline-block;
      width: 90px;
      height: 90px;
      background: url('../../assets/img/financing/nodata.png')no-repeat center / 100% 100%;
    }
    span{
      font-size: 13px;
      margin-top: 17px;
    }
  }
}
.history{
  height: 100%;
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
      .con {
        float: left;
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
          font-size: 16px;
        .enter {
          color: #FF2D0B;
        }
        .out{
          color: #00CB86;
        }
      }
    }
  }
}
</style>
