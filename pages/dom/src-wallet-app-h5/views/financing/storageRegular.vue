<template>
  <div class="holder">
    <Header
      :currentSPO="headerInfo"
      :listInfo="listInfo"
      :needButton="false"
      />
      <ul>
        <li v-for="(item, index) in list" :key="index">
            <ol>
              <li>
                <p>{{item.name}}</p>
                <span @click="seeRule(item)">查看规则</span>
              </li>
              <li>
                <b>年化 </b> <i>{{(item.rate * 100).toFixed(2)}}%</i>
              </li>
              <li>
                <div class="in" @click="assetIn(item)">存入</div>
              </li>
            </ol>
        </li>
      </ul>
      <confirm
      v-model="show"
      show-input
      ref="confirm"
      title="请输入存款"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide"
    ></confirm>
  </div>
</template>

<script>
  import Header from './header-com'
  import {Confirm} from "vux";
  export default {
    name: 'storageRegular',
    components:{
      Header,
      Confirm
    },
    data: function() {
      return {
        show: false,
        listInfo:[
          {title:'累计收益',count:0},
          {title:'总额',count:0},
        ],
        headerInfo:{title:'昨天收益（SPO）',count:0},
        spoInfo:{},
        option:{
          proType:'REGULAR',//ALL:全部;REGULAR:定期;GHOME:GHOME系列
          pageNum:1,
          pageSize:20
        },
        list:[]
      }
    },
    methods: {
      getInfo(){
        this.$http.post('/wallet/app/cloud/finance/getRegularAccount',{},{needToken:true}).then(res=>{
          this.spoInfo = res.result;
          this.headerInfo.count = this.spoInfo.yesterdayEarnings;
          this.listInfo[0].count = this.spoInfo.earnings > 0 ? '+' + this.spoInfo.earnings : '-' + this.spoInfo.earnings;
          this.listInfo[1].count = this.spoInfo.buyAmount;
        })
      },
      getList(){
      this.$http.post('/wallet/app/cloud/finance/open/getHotFinanceProList',this.option,{needToken:true}).then(res=>{
        console.log(res)
        this.list = res.result.list;
      })
    },
    assetIn(item){
      this.show = true;
    },
    seeRule(item){
      this.$router.replace({
          name: 'rulesDetails',
          query: {
            month: 3,
            lang: this.$i18n.locale,
          }
        })
    },
    onConfirm(value) {
      this.$refs.confirm.setInputValue("");
      this.$vux.toast.text("input value: " + value);
    },
    onShow() {
      this.$refs.confirm.setInputValue("default");
    },
    onCancel() {
      console.log("on cancel");
    },
    onHide() {
      console.log("on hide");
    },
    },
    mounted(){
      this.getInfo();
      this.getList();
    }
  }
</script>

<style scoped lang="less">
.holder{
  height: 100%;
  background: #f4f6fa;
}

ul{
  padding: 0 20px 0 20px;
  background: #fff;
  >li{
    width: 100%;
    height: 65px;
    border-bottom: 1px solid #E5E6EF;
    &:last-child{
         border-bottom:none;
    }
    ol{
      width: 100%;
      height: 100%;
      overflow: hidden;
      >li{
        width: 33.33%;
        height: 100%;
        float: left;
        &:nth-child(1){
          padding-top: 8px
        }
        &:nth-child(2){
          text-align: center;
          line-height: 65px;
        }
        &:nth-child(3){
          text-align: right;
          line-height: 65px;

        }
        p{
          font-size: 15px;
          color: #545454;
        }
        span{
          font-size: 12px;
          color: #5E87D8;
        }
        b{
          font-size: 17px;
          color: #545454;
        }
        i{
          font-size: 17px;
          color: #FF2D0B;
        }
        .in{
          display: inline-block;
          width: 60px;
          height: 28px;
          background: #5E87D8;
          font-size: 14px;
          line-height: 28px;
          text-align: center;
          border-radius: 14px;
          color: #fff;
        }
      }

    }
  }
}
</style>
