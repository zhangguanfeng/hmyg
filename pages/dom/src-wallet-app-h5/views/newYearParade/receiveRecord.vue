/**
*  Created by   阿紫
*  On  2019-01-04
*  Content 领取记录
*/
<template>
  <div class="receiveRecord">
    <scroller lock-x height="600px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="content">
        <div v-for="i in bottomCount" class="list">
          <p><span>{{i}}</span> <span>{{i}}-2</span></p>
          <p><span>{{i}}-3</span> <span>{{i}}-4</span></p>
        </div>
        <load-more :tip="tips" v-if="onFetching" :show-loading="showLoading"></load-more>
      </div>
    </scroller>
  </div>
</template>
<style>

</style>
<script>
  import { Scroller, LoadMore } from 'vux'

  export default {
    name: "receiveRecord",
    components: {
      Scroller,
      LoadMore,
    },
    data() {
      return {
        tips: '加载中……', // 加载提示
        showLoading: true,
        onFetching: false,
        bottomCount: 10
      };
    },
    methods: {
      onScrollBottom() {
        this.tips = '加载中……'
        if (!this.onFetching) {
          this.onFetching = true
          setTimeout(() => {
            this.bottomCount += 10
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      }
    },
    activated() {
      document.title = '领取记录';
    }
  };
</script>
<style lang="less">
  .receiveRecord {
    padding: 15px;

    .list {
      position: relative;
      display: flex;
      flex-direction: column;

      p {
        display: flex;
        justify-content: space-between;

        span {
          color: #333;
        }
      }

      &:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        background: #ecebeb;
      }
    }
  }
</style>
