/**
*  Created by   阿紫
*  On  2019-01-04
*  Content 助力的好友
*/
<template>
  <div class='friendsRecord'>
    <scroller lock-x scrollbar-y use-pulldown
              :pulldown-config="pulldownConfig"
              height="200px"
              @on-pulldown-loading="onScrollPulldown"
              v-model="pulldownStatus">
      <div class="content">
        <div v-for="i in bottomCount" class="list">
          <p><span>{{i}}</span> <span>{{i}}-2</span></p>
          <p><span>{{i}}-3</span> <span>{{i}}-4</span></p>
        </div>
      </div>
    </scroller>

  </div>
</template>
<script>
  import { Scroller, LoadMore } from 'vux'

  export default {
    name: "friendsRecord",
    components: {
      Scroller,
      LoadMore,
    },
    data() {
      return {
        bottomCount: 10,
        pulldownConfig: {
          content: '下拉刷新',
          downContent: '下拉刷新',
          upContent: '释放刷新',
          loadingContent: '加载中……'
        },
        pulldownStatus: {
          pulldownStatus: 'default'
        }
      };
    },
    methods: {
      onScrollPulldown() {
        setTimeout(() => {
          this.pulldownStatus.pulldownStatus = 'default'
        }, 1000)
      }
    },
    activated() {
      document.title = '助力的好友';
    }
  };
</script>
<style lang="less">
  .friendsRecord {
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
