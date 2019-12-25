/**
*  Created by   阿紫
*  On  2019/8/26 0026
*  Content
*/
<template>
  <div class='jk-calenda'>
    <div class="el-icon-arrow-left" @click="lastWeek"></div>
    <el-calendar
      class="content"
      v-model="date"
      :range="range">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} <span :class="{'el-icon-check':data.isSelected}"></span>
        </p>
      </template>
    </el-calendar>
    <div class="el-icon-arrow-right" @click="nextWeek"></div>
    <div class="date-picker">
      <el-tag class="today" @click="goTaday">今天</el-tag>
      <el-date-picker
        v-model="date"
        type="date"
        size="small"
        @change="getDate"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '@/common/util';

export default {
  name: 'jk-calenda',
  data() {
    return {
      date: dateFormat(new Date(), 'YYYY-MM-DD'),
      range: ['2019-08-26', '2019-09-01'],
    };
  },
  watch: {
    date(val) {
      this.$emit('getDate', dateFormat(this.date, 'YYYY-MM-DD'));
    },
  },
  methods: {
    // 今天
    goTaday() {
      this.date = dateFormat(new Date(), 'YYYY-MM-DD');
      this.getWeek(this.date);
    },
    // 根据日期获取一周数据
    getWeek(d) {
      const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      const week = dateFormat(d, 'EE');
      let start = '';
      let end = '';
      const num = +new Date(d);
      weekList.forEach((item, index) => {
        if (item === week) {
          start = dateFormat(num - 1000 * 60 * 60 * 24 * index, 'YYYY-MM-DD');
          end = dateFormat(num + 1000 * 60 * 60 * 24 * (6 - index), 'YYYY-MM-DD');
        }
      });
      this.range = [start, end];
    },
    // 获取上周数据
    lastWeek() {
      this.getWeek(+new Date(this.range[0]) - 1000 * 60 * 60 * 24);
    },
    // 获取下周数据
    nextWeek() {
      this.getWeek(+new Date(this.range[1]) + 1000 * 60 * 60 * 24);
    },
    getDate() {
      this.getWeek(this.date);
    },
  },
  activated() {
    this.goTaday();
  },
};
</script>
<style lang="scss">
  .jk-calenda {
    display: flex;
    position: relative;

    .el-icon-arrow-left, .el-icon-arrow-right {
      font-size: 30px;
      font-weight: 500;
      display: flex;
      align-items: center;
      cursor: pointer;
      opacity: 0.6;

      &:hover {
        color: $color;
        opacity: 1;
      }
    }

    .content {
      .el-calendar-table thead th {
        padding: 5px 0;
      }

      .el-calendar__body {
        text-align: center;

        .el-calendar-day {
          height: 50px;
          line-height: 50px;
          padding: 0;

          &:hover {
            background: $bgColor;
          }

          p {
            margin: 0;
          }

          .is-selected {
            background: $bgColor;
          }

          .el-icon-check {
            color: $color;
            font-weight: bold;
          }
        }
      }
    }

    .date-picker {
      position: absolute;
      right: 30px;

      .today {
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
</style>
