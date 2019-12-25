/**
*  Created by   阿紫
*  On  2019/9/11 0011
*  Content
*/
<template>
  <div class='news'>
    <div class="news_list">
      <div class="news_list--content" :class="{active: isNewsActive}">
        <div class="news_list--body">
          <span class="news_list--text">快讯</span>
          <span class="el-icon-document" @click="openNews"></span>
        </div>
      </div>
    </div>
    <div v-if="isNewsActive" class="news-content">
      <div class="title">
        <span class="close el-icon-d-arrow-right" @click="isNewsActive=false"></span>
        <span class="calendar" :class="{titleActive:isCalendar}" @click="changSwitch(true)">财经日历</span>
        <span class="firewire" :class="{titleActive:!isCalendar}" @click="changSwitch(false)">火线速递</span>
        <span class="more" @click="goMore">更多 <i class="el-icon-d-arrow-right"></i></span>
      </div>
      <el-scrollbar class="scrollbar" ref="scrollBar">
        <div class="calendars" v-if="isCalendar" ref="calendars">
          <div v-for="(item,index) in calendarList" :key="index" class="calendars_list"
               :style="{animationDelay: index * 50 + 'ms'}">
            <div class="calendars_list-left">
              <time>{{item.pub_time | dateFormat('HH:mm')}}</time>
              <span>{{item.country}}</span>
            </div>
            <div class="calendars_list-right">
              <div class="calendars_list-right-title">{{item.name}}</div>
              <div class="calendars_list-right-content">
                <div class="calendars_list-right-content-item">
                  <div class="calendars_list-right-content-lable">前值</div>
                  <div class="calendars_list-right-content-value">
                    {{item.previous}}{{item.unit}}
                  </div>
                </div>
                <div class="calendars_list-right-content-item">
                  <div class="calendars_list-right-content-lable">预测</div>
                  <div class="calendars_list-right-content-value" v-if="item.consensus" >
                    {{item.consensus}}{{item.unit}}
                  </div>
                  <div class="calendars_list-right-content-value" v-else >---</div>
                </div>
                <div class="calendars_list-right-content-item">
                  <div class="calendars_list-right-content-lable">公布</div>
                  <div class="calendars_list-right-content-value" v-if="item.actual" >
                    {{item.actual}}{{item.unit}}
                  </div>
                  <div class="calendars_list-right-content-value" v-else>未公布</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="firewire-list" v-else>
          <el-timeline v-if="newsList.length">
            <el-timeline-item
              v-for="(activity, index) in newsList"
              :key="index"
              color="#5B0EB2">
              <span class="time">{{activity.newstime | dateFormat('HH:mm')}} </span>
              <span>{{activity.newstext}}</span>
            </el-timeline-item>
          </el-timeline>
          <div v-else class="without"> 暂无数据</div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '@/common/util';

export default {
  name: 'news',
  data() {
    return {
      isNewsActive: false,
      isCalendar: true,
      calendarList: [],
      newsList: [],
    };
  },
  watch: {
    isNewsActive(val) {
      try {
        this.$refs.scrollBar.$el.querySelector('.el-scrollbar__wrap').scrollTop = 0;
      } catch (e) {
      }
    },
  },
  methods: {
    openNews() {
      this.isNewsActive = !this.isNewsActive;
      this.getCalendar();
    },
    changSwitch(isCalendar) {
      this.isCalendar = isCalendar;
      if (this.isCalendar) {
        this.getCalendar();
      } else {
        this.getNews();
      }
    },
    goMore() {
      let url = `${location.origin}/newsinfo`;
      if (this.isCalendar) {
        url = `${location.origin}/newsinfo/calenda`;
      } else {
        url = `${location.origin}/newsinfo/newsFlash`;
      }
      window.open(url);
    },
    getCalendar() {
      const date = dateFormat(new Date(), 'YYYY-MM-DD');
      const imp = ''; // 重要性(默认非重要,1.为重要)
      const cnt = ''; // 国家
      this.$http.post('home/calendar', { date, cnt, imp }).then((res) => {
        const { Economics } = res.data;
        this.calendarList = Economics;
      });
    },
    getNews() {
      this.$http.post('home/news', { type: 3, pageSize: 30, page: 1 }).then((res) => {
        const { data } = res.data;
        this.newsList = data || [];
      });
    },
  },
  activated() {
    this.getCalendar();
  },
};
</script>
<style lang="scss" scoped>
  .news {
    position: relative;
    border-left: 1px solid #e1e2e6;

    &_list {
      font-size: 20px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      position: relative;

      &:hover {
        .news_list--content {
          width: 110px;
          background-color: $color;
          color: #fff;
          user-select: none;
          :root .theme-dark & {
            background: #5171d2;
            .el-icon-document {
              color: #fff;
            }
          }
        }
      }

      &--content {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 100%;
        transition: all .2s;
        z-index: 4;
        overflow: hidden;
      }

      &--body {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 110px;
      }

      .el-icon-document {
        display: inline-block;
        width: 40px;
        :root .theme-dark & {
          color: #B4C5F7;
        }
      }

      &--text {
        display: inline-block;
        width: 70px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
      }
    }
  }

  .active {
    background: $color;
    color: #fff;
    :root .theme-dark & {
      background: #5171d2;
      .el-icon-document {
        color: #fff;
      }
    }
  }

  .el-dialog__wrapper {
    top: 62px;
    right: 41px;
    bottom: 46px;
  }

  .news-content {
    width: 320px;
    position: absolute;
    top: 0;
    right: 41px;
    bottom: 0;
    z-index: 4;
    background: #fafafc;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    :root .theme-dark & {
      background: $color-dark-bg;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 15px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;

      span {
        cursor: pointer;
        :root .theme-dark & {
          color: #576590;
        }
      }
      .titleActive {
        font-weight: 600;
        color: $color;
        :root .theme-dark & {
          color: #B4C5F7;
        }
      }

      .more, .close {
        font-size: 14px;
        color: #999;

        &:hover {
          font-weight: 600;
          color: $color;
          :root .theme-dark & {
            color: #B4C5F7;
          }
        }
      }
    }

    .scrollbar {
      height: calc(100% - 50px);
      overflow-y: hidden;
    }
  }

  .scrollbar {
    height: 100%;

    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  @keyframes fade-slide {
    from {
      opacity: 0;
      /*height: 0;*/
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      /*height: 72px;*/
      transform: translateX(0);
    }
  }

  .calendars {
    padding: 15px;

    &_list {
      opacity: 0;
      animation: fade-slide .6s cubic-bezier(0.09, 0.69, 0.58, 1);
      animation-fill-mode: forwards;
      border-bottom: 1px solid #edeef2;
      transform: translateX(50px);
      padding: 15px 0;
      :root .theme-dark & {
        border-color: #434F6A;
      }

      &-left {
        float: left;
        width: 40px;
        font-size: 12px;
        color: #999;
        :root .theme-dark & {
          color: #576590;
        }

        time {
          display: block;
          line-height: 20px;
        }

        span {
          line-height: 35px;
        }
      }

      &-right {
        margin-left: 50px;

        &-title {
          text-align: left;
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
          :root .theme-dark & {
            color: #576590;
          }
        }

        &-content {
          display: flex;
          justify-content: space-between;
          font-size: 12px;

          &-lable {
            color: #999;
            line-height: 24px;
            :root .theme-dark & {
              color: #576590;
            }
          }

          &-value {
            color: $color;
            line-height: 24px;
            :root .theme-dark & {
              color: #B4C5F7;
            }
          }
        }
      }
    }
  }

  /deep/ .el-timeline-item__content {
    display: flex;

    .time {
      color: #999;
      margin-right: 10px;
    }
  }

  /deep/ .el-timeline-item__tail {
    border-left-color: #c6bcd2;
  }

  /deep/ .el-timeline {
    height: 100%;
    overflow-y: auto;
  }

  /deep/ .el-scrollbar__view {
    height: 100%;
  }

  .firewire-list {
    height: 100%;
  }

  .without {
    height: 100%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    :root .theme-dark & {
      color: #576590;
    }
  }
  :root .theme-dark {
    .news {
      border-left-color: #434F6A;
    }
  }
</style>
