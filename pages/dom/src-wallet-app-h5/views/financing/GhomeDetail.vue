<template>
  <div class="cover">
    <FinancingHeader
      :currentSPO="headerInfo"
      :listInfo="listInfo"
      :needButton="false"
    />
    <div class="yearRate">
      <span class="tit">预计年化收益率</span>
      <span class="rate">8.98%</span>
      <ul class="list">
        <li>1SPO起投</li>
        <li>低风险</li>
        <li>随存随取</li>
      </ul>
    </div>
    <Rules/>
    <div class="buyAgain">
      追加购买
    </div>
  </div>
</template>

<script>
import FinancingHeader from './header-com';
import Rules from './rules-com';

export default {
  name: 'GhomeDetail',
  components:{
    FinancingHeader,Rules
  },
  data: function() {
    return {
      listInfo:[
        {title:'昨日收益',count:'+80'},
        {title:'累计收益',count:'5645'},
      ],
      headerInfo:{title:'当前市值（SPO）',count:222333.8}
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.cover{
  height: 100%;
  background: #f4f6fa;
}
.yearRate{
  height: 100px;
  width: 100%;
  background: #fff;
  text-align: center;
  padding: 8px 0 10px 0;
  overflow: hidden;
  margin-bottom: 10px;
  span{
    display: block;
    text-align: center;
  }
  .tit{
    color: #A7BBE1;
    font-size: 11px;
  }
  .rate{
    color: #5E87D8;
    font-size: 24px;
  }
  .list{

    li{
      display: inline-block;
      padding: 2px 20px;
      background: #F0F3F8;
      color: #B1BBC9;
      font-size: 11px;
      border-radius: 13px;
    }
  }
}
.buyAgain{
  height: 42px;
  width: 80%;
  background: #5E87D8;
  text-align: center;
  line-height: 42px;
  font-size: 14px;
  color: #fff;
  border-radius: 21px;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
