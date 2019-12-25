/**
*  Created by   阿紫
*  On  2019/10/23
*  Content 日历
*/
<template>
    <div class='calendar'>
        <div class="calendar-select">
            <van-tabs v-model="active" @click="getTabChange">
                <van-tab v-for="(item, index) in dateList" :key="index">
                    <div slot="title" class="title">
                        <div>{{item.week}}</div>
                        <div>{{item.date|dateFormat('DD')}}</div>
                    </div>
                </van-tab>
            </van-tabs>
            <div class="today" @click="goToday">今天</div>
        </div>
        <div class="calendar-content">
            <ul class="list">
                <li v-for="(item,key) in list" :key="key">
                    <div class="list-l">
                        <div class="img-box">
                            <span>{{item.country}}</span>
                        </div>
                    </div>
                    <div class="list-r">
                        <div class="r-t">
                            <van-rate
                                    v-model="item.star"
                                    :size="15"
                                    readonly
                                    :color="item.star>2?'#ee0a24':'#ffd21e'"
                                    void-icon="star"
                                    void-color="#eee"
                            />
                            <div v-if="item.actual" class="effect">
                                <div v-if="+item.affect===1"> <!--  正向-->
                                    <div v-if="item.consensus"> <!--  有预测值-->
                                        <!--                      预测值大于真是值-->
                                        <div class="tags badNews" v-if="+item.consensus < +item.actual"
                                             :class="{badNewsbg:item.star>2}">
                                            <span>利空</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="tags goodNews" v-if="+item.consensus > +item.actual"
                                             :class="{goodNewsbg:item.star>2}">
                                            <span>利多</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="small tags" v-if="+item.consensus === +item.actual"
                                             :class="{smallbg:item.star>2}">影响小
                                        </div>
                                    </div>
                                    <div v-else><!--  没有预测值-->
                                        <div class="tags badNews" v-if="+item.previous < +item.actual"
                                             :class="{ badNewsbg:item.star>2 }">
                                            <span>利空</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="tags goodNews" v-if="+item.previous > +item.actual"
                                             :class="{goodNewsbg:item.star>2}">
                                            <span>利多</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="small tags" v-if="+item.previous === +item.actual"
                                             :class="{smallbg:item.star>2}">影响小
                                        </div>
                                    </div>
                                </div>
                                <div v-else>  <!--  反向-->
                                    <div v-if="item.consensus"> <!--  有预测值-->
                                        <!--                      预测值大于真是值-->
                                        <div class="tags badNews" v-if="+item.consensus > +item.actual"
                                             :class="{badNewsbg:item.star>2}">
                                            <span>利空</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="tags goodNews" v-if="+item.consensus < +item.actual"
                                             :class="{goodNewsbg:item.star>2}">
                                            <span>利多</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="small tags" v-if="+item.consensus === +item.actual"
                                             :class="{smallbg:item.star>2}">影响小
                                        </div>
                                    </div>
                                    <div v-else> <!--  没有预测值-->
                                        <div class="tags badNews" v-if="+item.previous > +item.actual"
                                             :class="{badNewsbg:item.star>2}">
                                            <span>利空</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="tags goodNews" v-if="+item.previous < +item.actual"
                                             :class="{goodNewsbg:item.star>2}">
                                            <span>利多</span>
                                            <span>金银</span>
                                            <span>原油</span>
                                        </div>
                                        <div class="small tags" v-if="+item.previous === +item.actual"
                                             :class="{smallbg:item.star>2}">影响小
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="r-m">
                            {{item.country}}{{item.time_period}}{{item.name}}
                        </div>
                        <div class="r-b">
                            <span>前值：{{item.previous}}</span>
                            <span>预测：{{item.consensus?item.consensus:'--'}}</span>
                            <span>公布：{{item.actual?item.actual:'--'}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import {dateFormat} from '@/common/util';

    @Component({})
    export default class Calendar extends Vue {
        protected active: any = 3;
        protected dateList: any = [];
        protected list: any = [];
        protected listDate: any = {};
        protected date: any = dateFormat(new Date(), 'YYYY-MM-DD');

        goToday() {
            this.dateList.forEach((item: any, index: any) => {
                if (item.date == this.date) {
                    this.active = index
                }
            })
            this.getDate(this.dateList[this.active].date);
        };

        // 获取一月的日期数据
        getWeek() {
            const date = dateFormat(new Date(), 'YYYY-MM-DD'); // 今天
            const week = dateFormat(new Date(), 'EE'); // 今天周几
            const num = +new Date();
            this.dateList = [{
                date,
                week
            }]
            // 获取今天之后的15天数据
            for (let i = 1; i < 16; i++) {
                this.dateList = [...this.dateList, {
                    date: dateFormat(num + 1000 * 60 * 60 * 24 * i, 'YYYY-MM-DD'),
                    week: dateFormat(num + 1000 * 60 * 60 * 24 * i, 'EE')
                }]
            }
            // 获取今天之前的15天数据
            for (let i = 1; i < 16; i++) {
                this.dateList = [{
                    date: dateFormat(num - 1000 * 60 * 60 * 24 * i, 'YYYY-MM-DD'),
                    week: dateFormat(num - 1000 * 60 * 60 * 24 * i, 'EE')
                }, ...this.dateList]
            }
        }

        getTabChange(index: any) {
            this.getDate(this.dateList[index].date);
        }

        getDate(date: any) {
            if (date != this.date && this.listDate[date]) {
                this.list = this.listDate[date];
                return;
            }
            this.$http.get('/home/calendar', {
                date
            }).then((res: any) => {
                this.listDate[date] = res.data.Economics;
                this.list = res.data.Economics;
            })
        }

        activated() {
            this.getWeek();
            this.getDate(this.date);
        }

        mounted() {
            this.getWeek();
            this.goToday();
        }
    };
</script>
<style lang='scss' scoped>
    .calendar {
        &-select {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin: 10px 0;

            /deep/ .van-tabs {
                width: calc(100vw - 60px);

                .van-tabs__wrap {
                    &:after {
                        border: none;
                    }
                }

                .van-tab--active {
                    .title {
                        border: 1px solid $color;
                        background: $color;

                        div {
                            color: #fff;
                        }
                    }
                }

                .title {
                    height: 42px;
                    width: 42px;
                    border: 1px solid #A6B4CA;
                    border-radius: 4px;

                    div {
                        height: 20px;
                        line-height: 20px;
                        color: #A6B4CA;
                        font-size: 12px;
                    }
                }

                .van-tabs__line {
                    display: none;
                }
            }

            .today {
                margin-right: 10px;
                width: 42px;
                font-size: 14px;
                height: 42px;
                line-height: 44px;
                text-align: center;
                color: $color;
                border: 1px solid #A6B4CA;
                border-radius: 4px;
                cursor: pointer;
            }
        }

        &-content {
            height: calc(100vh - 104px);
            overflow: hidden;

            .list {
                height: 100%;
                overflow-y: scroll;

                li {
                    display: flex;
                    padding: 10px 0;
                    background: #fff;
                    &:nth-child(2n) {
                        background: #F7F9FA;
                    }

                    .list-l {
                        width: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .img-box {
                            text-align: center;

                            span {
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                display: block;
                                display: flex;
                                font-size: 12px;
                                justify-content: center;
                                align-items: center;
                                background: #3075de;
                                color: #fff;
                            }
                        }
                    }

                    .list-r {
                        width: calc(100% - 100px);

                        .r-t {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding-right: 10px;
                            height: 30px;

                            .star {
                                margin-left: 10px;

                                img {
                                    width: 12px;
                                }
                            }

                            .effect {
                                .tags {
                                    border-radius: 4px;
                                    display: inline-block;
                                    padding: 1px 8px;
                                    font-size: 12px;
                                    line-height: 20px;

                                    span {
                                        margin: 0 3px;
                                    }
                                }

                                .badNews {
                                    border: 1px solid #24b166;
                                    color: #24b166;
                                }

                                .badNewsbg {
                                    background: #24b166;
                                    border: 1px solid #24b166;
                                    color: #fff;
                                }

                                .goodNews {
                                    border: 1px solid #F24724;
                                    color: #F24724;
                                }

                                .goodNewsbg {
                                    background: #F24724;
                                    border: 1px solid #F24724;
                                    color: #fff;
                                }

                                .small {
                                    border: 1px solid #FF9900;
                                    color: #FF9900;
                                }

                                .smallbg {
                                    background: #FF9900;
                                    color: #fff;
                                }
                            }
                        }

                        .r-m {
                            color: #333333;
                            font-size: 14px;
                            padding-right: 15px;
                            line-height: 22px;

                        }

                        .r-b {
                            color: #999999;
                            font-size: 12px;
                            display: flex;
                            justify-content: space-between;
                            padding-right: 30px;
                            line-height: 22px;
                        }
                    }
                }
            }
        }
    }

    /deep/ .van-tabs__wrap--scrollable .van-tab {
        flex-basis: 20% !important;
        flex: 0 0 20%
    }
</style>
