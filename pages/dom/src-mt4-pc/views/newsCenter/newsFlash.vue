/**
*  Created by   阿紫
*  On  2019/8/26 0026
*  Content 快讯
*/
<template>
  <div class='newsFlash'>
    <h2 class="newsFlash__header">
      <span class="el-icon-arrow-left" @click="$router.go(-1)"></span>
      快讯
    </h2>
    <div class="newsFlash__time">
      <span class=" el-icon-time"> 今天 {{ currentTime}}</span>
    </div>
    <el-timeline>
      <el-scrollbar class="infinite-list-wrapper newsFlash__content">
        <div   v-infinite-scroll='getList'
               style="padding-left: 20px;"
               infinite-scroll-disabled="disabled">
          <el-timeline-item
            v-for="(activity, index) in list"
            :key="index"
            color="#5B0EB2">
            <span class="time">{{activity.newstime | dateFormat('YYYY-MM-DD HH:mm')}} </span>
            <span class="text">{{activity.newstext}}</span>
          </el-timeline-item>
        </div>
          <p v-if="loading" style="text-align: center;"><i class="el-icon-loading"></i> 加载中...</p>
          <p v-if="noMore" style="text-align: center;">没有更多数据了</p>
      </el-scrollbar>
    </el-timeline>

  </div>
</template>
<script>
import infiniteScroll from 'vue-infinite-scroll';
import { dateFormat } from '@/common/util';

export default {
  name: 'newsFlash',
  directives: { infiniteScroll },
  data() {
    return {
      currentTime: dateFormat(new Date(), 'EE YYYY-MM-DD HH:mm:ss'),
      list: [],
      page: 0,
      pageSize: 20,
      data: [],
      loading: false,
      noMore: false,
      isError: false,
      timer: null,
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore || this.isError;
    },
  },
  methods: {
    getList(isMore) {
      this.loading = true;
      this.page += 1;
      this.$http.post('home/news', {
        type: 3,
        pageSize: this.pageSize,
        page: this.page,
      }).then((res) => {
        this.loading = false;
        const { data } = res.data || [];
        this.list = [...this.list, ...data];
        if (data.length < this.page_size) {
          this.noMore = true;
        }
      }).catch((res) => {
        this.loading = false;
        this.isError = true;
      });
    },
    getCurrentTime() {
      this.timer = setInterval(() => {
        this.currentTime = dateFormat(new Date(), 'EE YYYY-MM-DD HH:mm:ss');
        this.currentTimeH = dateFormat(new Date(), 'HH:mm');
      }, 1000);
    },
  },
  activated() {
    this.page = 0;
    this.getList(); // 快讯
    this.getCurrentTime();
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
  .newsFlash {
    background: #fff;
    padding: 15px 60px;
    text-align: left;

    .el-icon-arrow-left {
      margin-right: 10px;
      cursor: pointer;
      font-weight: bold;
    }

    &__time {
      background: #F9F9F9;
      height: 38px;
      line-height: 38px;
      padding: 0 15px;
      font-size: 14px;
      margin-bottom: 20px;
    }
    &__content {
      height: calc(100vh - 350px);
      /deep/ .el-scrollbar__wrap{
        overflow-x: hidden;
      }
    }

    /deep/ .el-timeline-item__content {
      display: flex;

      .time {
        color: #999;
        margin-right: 10px;
        width: 120px;
      }
      .text {
        flex:1;
      }
    }

    /deep/ .el-timeline-item__tail {
      border-left-color: #c6bcd2;
    }

    /deep/ .el-timeline {
      height: calc(100vh - 350px);
      overflow-y: auto;
    }
  }
</style>
