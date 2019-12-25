/**
*  Created by   阿紫
*  On  2019/8/23 0023
*  Content 财经日历
*/
<template>
  <div class='calenda'>
    <jk-calenda @getDate="getDate"></jk-calenda>
    <div class="select">
      <div class="select-list">
        <span class="select-list_lable"> 国家/地区：</span>
        <el-radio-group v-model="cnt" size="small" @change="onChange">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button :label="item" v-for="(item, index) in countryList" :key="index"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="select-list">
        <span class="select-list_lable"> 状态：</span>
        <el-radio-group v-model="imp" size="small" @change="onChange">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">重要</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="news">
      <economics :data="Economics"
                 :current-time="currentTime"
                 :isFixed="isFixed"
                 :sameTimeCountry="sameTimeCountry"></economics>
      <div class="news-list">
        <div class="news-list_title el-icon-notebook-2">
          {{ currentTime}} 财经事件一览
        </div>
        <el-table :data="Financial" border size="small" style="width: 100%">
          <el-table-column
            label="时间" width="150px">
            <template slot-scope="scope">
            <span :class="{vital:scope.row.star>2}">
               {{scope.row.event_time | dateFormat('YYYY-MM-DD')}}
            </span>
            </template>
          </el-table-column>
          <el-table-column prop="country" label="国家" width="150px">
            <template slot-scope="scope">
                <span :class="{vital:scope.row.star>2}">
                  {{scope.row.country}}
                </span>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="城市" width="180px">
            <template slot-scope="scope">
                   <span :class="{vital:scope.row.star>2}">
                        {{scope.row.region}}
                   </span>
            </template>
          </el-table-column>
          <el-table-column prop="star" label="重要性" width="150px">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.star"
                :colors="colors"
                disabled>
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="event_content" label="事件">
            <template slot-scope="scope">
              <div style="text-align: left" :class="{vital:scope.row.star>2}">
                {{scope.row.event_content}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="news-list">
        <div class="news-list_title el-icon-close-notification">
          {{ currentTime}} 假期休市一览
        </div>

        <el-table :data="closed" size="small" border style="width: 100%" empty-text="今日无假期休市安排">
          <el-table-column
            label="时间">
            <template slot-scope="scope">
              {{scope.row.date | dateFormat('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <el-table-column prop="country" label="国家/地区"></el-table-column>
          <el-table-column prop="exchange_name" label="市场"></el-table-column>
          <el-table-column prop="name" label="节日"></el-table-column>
          <el-table-column prop="rest_note" label="详细安排"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { dateFormat } from '@/common/util';
import JkCalenda from '@/components/jk-calenda.vue';
import economics from './economics.vue';

export default {
  name: 'calenda',
  components: {
    JkCalenda,
    economics,
  },
  data() {
    return {
      colors: ['#FF9900', '#F24724', '#F24724', '#F24724'],
      date: dateFormat(new Date(), 'YYYY-MM-DD'),
      currentTime: dateFormat(new Date(), 'EE YYYY-MM-DD HH:mm:ss'),
      currentTimeH: dateFormat(new Date(), 'HH:mm'),
      cnt: '',
      imp: '', // 重要性(默认非重要,1.为重要)
      countryList: ['全部'],
      Economics: [],
      Financial: [],
      closed: [],
      sameTimeCountry: {},
      timeObj: {},
      headerFixed: '',
      offsetTop: '',
      offsetHeight: '',
      isFixed: false,
      timer: null,
    };
  },
  watch: {
    currentTimeH(val) {
      if (this.timeObj[val]) {
        this.getCalendar();
      }
    },
  },
  methods: {
    getDate(val) {
      this.date = val;
      this.getCalendar();
    },
    onChange() {
      this.getCalendar();
    },
    getCalendar() {
      const { date, cnt, imp } = this;
      this.sameTimeCountry = {};
      this.timeObj = {};
      this.Economics = [];
      this.$http.post('home/calendar', { date, cnt, imp }).then((res) => {
        const { Economics, Financial, closed } = res.data;
        Economics.forEach((item, index) => {
          item.pub_time = dateFormat(item.pub_time, 'HH:mm');
          if (index > 0) {
            if (this.sameTimeCountry[item.country + item.pub_time]) {
              this.sameTimeCountry[item.country + item.pub_time].push(item);
            } else {
              this.timeObj[item.pub_time] = true;
              this.sameTimeCountry[item.country + item.pub_time] = [item];
            }
          } else {
            this.timeObj[item.pub_time] = true;
            this.sameTimeCountry[item.country + item.pub_time] = [item];
          }
        });
        let arr = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const [k, v] of Object.entries(this.sameTimeCountry)) {
          arr = [...arr, ...v];
        }
        this.Economics = arr || [];
        this.Financial = Financial || [];
        this.closed = closed.length > 0 ? closed : [];
      });
    },
    getCountry() {
      this.$http.post('home/getCountry').then((res) => {
        this.countryList = res.data || [];
      });
    },
    getCurrentTime() {
      this.timer = setInterval(() => {
        this.currentTime = dateFormat(new Date(), 'EE YYYY-MM-DD HH:mm:ss');
        this.currentTimeH = dateFormat(new Date(), 'HH:mm');
      }, 1000);
    },
    handleScroll() {
      const { scrollTop } = document.querySelector('#homeIndex');
      if (scrollTop > 550) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
  },
  activated() {
    this.getCurrentTime();
    this.getCountry();
    this.getCalendar();
  },
  mounted() {
    document.querySelector('#homeIndex').addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    clearInterval(this.timer);
    document.querySelector('#homeIndex').removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
  .vital {
    color: #F24724
  }
  .calenda {
    background: #FFFFFF;
    text-align: left;
    padding: 20px 30px;
    .fixTableHeader{
        /*   position: fixed;
        width: calc(100% - 60px);
        top: 62px;
        height: 30px;
        z-index: 111; */
    }
    .date {
      text-align: right;
    }

    .select {
      margin: 10px 0 40px 0;

      &-list {
        min-height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #D7E5FF;

        &_lable {
          color: #333333;
          font-size: 16px;
          font-weight: 500;
          margin-right: 20px;
        }

        /deep/ .el-radio-button {
          margin-right: 10px;
          margin-bottom: 10px;

          .el-radio-button__inner {
            border: 0;
            font-size: 14px;
          }
        }

        /deep/ .el-radio-button.is-active {
          .el-radio-button__inner {
            border-radius: 4px;
          }
        }
      }
    }

    .news {
      &-list {
        margin-bottom: 40px;
        position: relative;

        &_title {
          color: #333;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        /deep/ .el-table--border {
          border-radius: 4px;
        }

        /deep/ .el-table th {
          background: $color;
          border-right-color: $color;
          border-bottom-color: $color;
          color: #fff;
          text-align: center;
        }

        /deep/ .el-table .cell {
          text-align: center;
        }
      }
    }
  }
</style>
