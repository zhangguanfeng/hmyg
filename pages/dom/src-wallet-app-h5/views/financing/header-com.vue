/**
*  Created by Hansen
*  On  2018-12-13
*  理财头部组件
*/
<template>
  <div class="mySPO">
    <div  :class="needButton ? 'highter header' : 'hight header'">
      <div class="asset">
        <p>{{currentSPO.title}}</p>
        <p>
          <countup class="centeryAsset" :end-val="currentSPO.count" :duration="2" :decimals="2"></countup>
        </p>
      </div>
      <div class="assetInfo">
        <ul>
          <li
          :style="{width: (100 / listInfo.length).toFixed(2) + '%'}"
          v-for="(item, index) in listInfo" :key="index">
            <p>{{item.title}}</p>
            <span>{{item.count}}</span>
          </li>
        </ul>
      </div>
      <div v-if="needButton" @click="handleAsset" class="assetCss">存余额</div>
    </div>


  </div>
</template>

<script>
import {Countup} from "vux";
export default {
  name: "header-com",
  components: {
    Countup
  },
  data: function() {
    return {

    };
  },
  props:{
    currentSPO:Object,//标题名和金额
    listInfo:Array,//中间需显示的数组
    needButton:Boolean,//是否需要按钮
  },
  methods: {
    handleAsset() {
      //
      this.$router.replace({name:'storageRegular'})
    },

  },
  mounted() {

  }
};
</script>

<style scoped lang="less">
.header {
  padding: 15px 30px 17px;
  box-sizing: border-box;
  min-height: 139px;
  &.hight{
    background: url("../../assets/img/financing/bg_1.png") no-repeat center /100% 100%;
  }
  &.highter{
    background: url("../../assets/img/financing/myspo_back.png") no-repeat center /100% 100%;
  }
  margin-bottom: 10px;
  .asset {
    text-align: center;
    > p {
      font-size: 11px;
      color: #fff;
      .centeryAsset {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .assetCss {
    background: #fff;
    height: 40px;
    font-size: 14px;
    border-radius: 20px;
    padding: 0;
    color: #5362ff;
    text-align: center;
    line-height: 40px;
    margin-top: 17px;
  }
  .assetInfo {
    height: 40px;
    width: 100%;
    // overflow: hidden;
    > ul {
      li {
        float: left;
        min-width: 33.33%;
        height: 40px;
        text-align: center;
        border-right: 1px solid #d5e5ff;
        box-sizing: border-box;
        &:last-child {
          border-right: none;
        }
        p {
          font-size: 12px;
          color: #fff;
        }
        span {
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
}


</style>
