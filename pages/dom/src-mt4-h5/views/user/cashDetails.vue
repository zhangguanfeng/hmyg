/**
*  Created by   阿紫
*  On  2019/10/24
*  Content 出入金明细
*/
<template>
    <div class='cashDetails'>
        <h-navbar title='出入金明细' @backPage="$router.go(-1)"/>
        <div class="content">
            <div class="calendar">
                <span class="start" @click="selsctDate('start')">{{startDate}}</span>
                <span class="line"></span>
                <span class="end" @click="selsctDate('end')">{{endDate}}</span>
                <span class="selsct" @click="isSelsct=!isSelsct">{{selsctedName}}
                    <van-icon name="arrow-down" v-if="!isSelsct"/>
                    <van-icon name="arrow-up" v-else/>
                    <div class="selsctList" v-if="isSelsct">
                    <ul>
                        <li @click="changeSelect(item)" v-for="(item,index) in option" :key="index">{{item.text}}</li>
                    </ul>
                </div>
                </span>
            </div>
            <van-row class="title">
                <van-col span="6" style="text-align: left">金额(美金)</van-col>
                <van-col span="5" style="text-align: left">类型</van-col>
                <van-col span="5" style="text-align: left">状态</van-col>
                <van-col span="8" style="text-align: right">时间</van-col>
            </van-row>
            <div class="news-list">
                <van-list
                    v-model="list.loading"
                    :finished="list.finished"
                    :error.sync="list.error"
                    class="list"
                    @load="listOnLoad"
                    :immediate-check="false"
                    v-if="list.list.length>0"
                    error-text="请求失败，点击重新加载"
                    finished-text="没有更多了">
                    <van-cell>
                        <!-- 使用 title 插槽来自定义标题 -->
                        <template slot="default">
                            <van-row class="title" v-for="(item,index) in list.list"
                                     :key="index">
                                <van-col span="6" style="text-align: left">{{item.amount}}</van-col>
                                <van-col span="5" style="text-align: left">{{item.record_type}}</van-col>
                                <van-col span="5" style="text-align: left">{{item.record_status}}</van-col>
                                <van-col span="8" style="text-align: right">{{item.add_time | dateFormat('YYYY-MM-DD HH:mm')}}</van-col>
                            </van-row>
                        </template>
                    </van-cell>
                </van-list>
                <h-noData v-else></h-noData>
            </div>
        </div>
        <van-popup
            v-model="isSelsctDate"
            position="bottom"
            :style="{ height: '50%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="confirm"
                @cancel="cancel"
            />
        </van-popup>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';
  import {dateFormat} from '@/common/util';

  interface List {
    loading: any,
    finished: any,
    error: any,
    isError: any,
    list: any,
    page: any,
    pageSize: any,
  }

  @Component({})
  export default class CashDetails extends Vue {
    protected selscted: any = 'ALL';
    protected selsctedName: any = '全部';
    protected option: any = [
      {text: '全部', value: 'ALL'},
      {text: '入金', value: 'IN'},
      {text: '出金', value: 'OUT'}];
    protected startDate: any = dateFormat(new Date(), 'YYYY-MM-DD');
    protected endDate: any = dateFormat(new Date(), 'YYYY-MM-DD');
    protected currentDate: any = new Date();
    protected isSelsctDate: boolean = false;
    protected isSelsct: boolean = false;
    protected isStart: boolean = false;
    protected list: List = {
      loading: false,
      finished: false,
      error: false,
      isError: false,
      list: [],
      page: 1,
      pageSize: 20,
    };

    protected selsctDate(type: any) {
      this.isSelsctDate = true;
      this.isSelsct = false;
      if (type === 'start') { // 起始日期
        this.isStart = true;
        this.currentDate = new Date(this.startDate);
      } else { // 结束日期
        this.isStart = false;
        this.currentDate = new Date(this.endDate);
      }
    }

    protected cancel() {
      this.isSelsctDate = false;
    }

    protected confirm() {
      this.isSelsctDate = false;
      const currentDate = dateFormat(this.currentDate, 'YYYY-MM-DD');
      if (this.isStart) {
        if (currentDate > this.endDate) {
          this.$toast('开始时间不能大于结束时间');
        } else {
          this.list.page = 1;
          this.startDate = currentDate;
          this.getCommissionRecord();
        }
      } else {
        if (currentDate < this.startDate) {
          this.$toast('开始时间不能小于结束时间');
        } else {
          this.list.page = 1;
          this.endDate = currentDate;
          this.getCommissionRecord();
        }
      }
    }

    changeSelect(type: any) {
      this.list.page = 1;
      this.selscted = type.value;
      this.selsctedName = type.text;
      this.getCommissionRecord();
    }

    protected listOnLoad() {
      if (!this.list.isError) {
        this.list.page++;
      }
      this.getCommissionRecord();
    };

    getCommissionRecord() {
      const {page, pageSize, list} = this.list;
      this.$http.post('/Report/CommissionRecord', {
        page,
        pageSize,
        startDate: dateFormat(this.startDate, 'YYYY-MM-DD'),
        endDate: dateFormat(this.endDate, 'YYYY-MM-DD'),
        money_type: this.selscted
      }).then((res: any) => {
        const data = res.data.data || [];
        // 数据全部加载完成
        if (data.length < pageSize && data.length > 0) {
          this.list.finished = true;
        }
        if (page == 1) {
          this.list.list = data;
        } else {
          this.list.list = [...list, ...data];
        }
        // 加载状态结束
        this.list.loading = false;
        this.list.isError = false;
      }).catch((res: any) => {
        // 加载状态结束
        this.list.loading = false;
        // 加载失败
        this.list.error = true;
        this.list.isError = true;
      })
    }

    activated() {
      this.list.page = 1;
      this.getCommissionRecord();
    }

  };
</script>
<style lang='scss'>
    .cashDetails {
        background: $bg-color;
        height: 100%;

        .content {
            padding-top: 46px;
            height: calc(100vh - 46px);
            overflow: hidden;
        }

        .calendar {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;

            span {
                display: inline-block;
            }

            .start, .end {
                width: 100px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                background: rgba(233, 242, 255, 1);
                border-radius: 4px;
                color: $color;
                text-align: center;
            }

            .line {
                width: 13px;
                height: 2px;
                background: #7EB0FB;
            }

            .selsct {
                width: 80px;
                height: 30px;
                border-radius: 4px;
                background: $color;
                font-size: 13px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                .van-icon {
                    margin-left: 3px;
                }
            }

            .selsctList {
                position: absolute;
                top: 35px;
                right: 0;
                width: 70px;
                text-align: center;
                color: #fff;
                background: $color;
                padding: 0 5px;
                border-radius: 4px;
                z-index: 2;

                &:after {
                    content: '';
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid $color;
                    left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                    top: -5px;
                    position: absolute;
                    width: 0;
                    height: 0;
                }

                li {
                    line-height: 30px;
                }

                li:not(:last-child) {
                    border-bottom: 1px solid #fff;
                }
            }

        }

        .title {
            font-size: 12px;
            color: #a5a5a5;
            line-height: 38px;
            border-bottom: 1px solid $border-color;
            padding: 0 15px;
        }

        .news-list {
            background: #fff;
            height: calc(100vh - 136px);
            padding: 0 15px 40px 15px;
            overflow-y: scroll;

            .list {
                .van-cell {
                    padding: 0;

                    &:after {
                        left: 0;
                    }
                }

                .title {
                    padding: 0;
                }
            }
        }
    }
</style>
