/**
*  Created by   阿紫
*  On  2019/10/22
*  Content 资讯-日历
*/
<template>
    <div class="information">
        <van-tabs type="card" v-model="tabsActive">
            <van-tab title="资讯" name="1">
                <van-tabs v-model="tabsInfoActive" swipeable class="news" @click="tabsOnClick">
                    <van-tab title="快讯" name="tab1">
                        <div class="news-list">
                            <van-list
                                    v-model="alerts.loading"
                                    :finished="alerts.finished"
                                    :error.sync="alerts.error"
                                    error-text="请求失败，点击重新加载"
                                    finished-text="没有更多了"
                                    @load="onLoad('alerts', 3)"
                                    :immediate-check="false"
                                    v-if="alerts.dateArray.length>0"
                            >
                                <div class="alerts" v-for="(item,index) in alerts.dateArray" :key="index">
                                    <van-sticky :offset-top="84">
                                        <div class="date">
                                            {{item}}
                                        </div>
                                    </van-sticky>
                                    <van-steps direction="vertical">
                                        <van-step v-for="(itemList,index) in alerts.list[item]" :key="index">
                                            <p class="time">{{itemList.newstime | dateFormat('HH:mm')}}</p>
                                            <p class="text" :class="{vertical: !itemList.isOpen}"
                                               @click="changeItem(itemList)">{{itemList.newstext}}</p>
<!--                                            <div class="more" :class="{transform: itemList.isOpen }" v-if="itemList.newstext.length>105"-->
<!--                                                  @click="changeItem(itemList)">-->
<!--                                        </div>-->
                                        </van-step>
                                    </van-steps>
                                </div>
                            </van-list>
                            <h-noData v-else></h-noData>
                        </div>
                    </van-tab>
                    <van-tab title="热点" name="tab2">
                        <div class="news-list">
                            <van-list
                                    v-model="hot.loading"
                                    :finished="hot.finished"
                                    :error.sync="hot.error"
                                    class="hot"
                                    @load="onLoad('hot', 0)"
                                    :immediate-check="false"
                                    v-if="hot.list.length>0"
                                    error-text="请求失败，点击重新加载"
                                    finished-text="没有更多了">
                                <list-card v-for="(item,index) in hot.list"
                                           :key="index"
                                           :list="item"
                                           @click.native="goDetails(item.id,0)"
                                ></list-card>
                            </van-list>
                            <h-noData v-else></h-noData>
                        </div>
                    </van-tab>
                    <van-tab title="专题" name="tab3">
                        <div class="news-list">
                            <van-list
                                    v-model="project.loading"
                                    :finished="project.finished"
                                    :error.sync="project.error"
                                    class="hot"
                                    @load="onLoad('project', 1)"
                                    :immediate-check="false"
                                    v-if="project.list.length>0"
                                    error-text="请求失败，点击重新加载"
                                    finished-text="没有更多了">
                                <list-card v-for="(item,index) in project.list"
                                           :key="index"
                                           :list="item"
                                           @click.native="goDetails(item.id,1)"
                                ></list-card>
                            </van-list>
                            <h-noData v-else></h-noData>
                        </div>
                    </van-tab>
                    <van-tab title="投融资" name="tab4">
                        <div class="news-list">
                            <van-list
                                    v-model="financing.loading"
                                    :finished="financing.finished"
                                    :error.sync="financing.error"
                                    class="hot"
                                    @load="onLoad('financing', 2)"
                                    :immediate-check="false"
                                    v-if="financing.list.length>0"
                                    error-text="请求失败，点击重新加载"
                                    finished-text="没有更多了">
                                <list-card v-for="(item,index) in financing.list"
                                           :key="index"
                                           :list="item"
                                           @click.native="goDetails(item.id,2)"
                                ></list-card>
                            </van-list>
                            <h-noData v-else></h-noData>
                        </div>
                    </van-tab>
                </van-tabs>
            </van-tab>
            <van-tab title="财经日历" name="2">
                <calendar ref="calendar"></calendar>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import ListCard from './listCard.vue';
    import Calendar from './calendar.vue';
    import {dateFormat} from '@/common/util';

    interface IAlert {
        loading: any,
        finished: any,
        error: any,
        isError: any,
        list: any,
        dateArray?: any,
        page: any,
        pageSize: any,
    }

    @Component({components: {ListCard, Calendar}})
    export default class Information extends Vue {
        protected tabsActive: any = '1';
        protected tabsInfoActive: any = 'tab1';
        // 快讯
        protected alerts: IAlert = {
            loading: false,
            finished: false,
            error: false,
            isError: false,
            list: {},
            dateArray: [],
            page: 0,
            pageSize: 20,
        };
        // 热点
        protected hot: IAlert = {
            loading: false,
            finished: false,
            error: false,
            isError: false,
            list: [],
            page: 1,
            pageSize: 20,
        };

        // 专题
        protected project: IAlert = {
            loading: false,
            finished: false,
            error: false,
            isError: false,
            list: [],
            page: 1,
            pageSize: 20,
        };

        // 投融资
        protected financing: IAlert = {
            loading: false,
            finished: false,
            error: false,
            isError: false,
            list: [],
            page: 1,
            pageSize: 20,
        };

        // tab切换
        protected tabsOnClick(name: any, title: any) {
            switch (name) {
                case 'tab1': // 快讯
                    this.alerts.page = 1;
                    this.alerts.dateArray = [];
                    this.alerts.list = {};
                    this.getNews('alerts', 3);
                    break;
                case 'tab2': // 热点新闻
                    this.hot.page = 1;
                    this.hot.list = [];
                    this.getNews('hot', 0);
                    break;
                case 'tab3': // 专题
                    this.project.page = 1;
                    this.project.list = [];
                    this.getNews('project', 1);
                    break;
                case 'tab4': // 投融资
                    this.financing.page = 1;
                    this.financing.list = [];
                    this.getNews('financing', 2);
                    break;
            }
        };

        // 获取快讯
        protected onLoad(tab: string, type: number) {
            if (!(this as any)[tab].isError) {
                (this as any)[tab].page++;
            }
            this.getNews(tab, type);
        };

        protected getNews(tab: string, type: number) {
            const vm: any = this;
            const {page, pageSize, list} = vm[tab];
            this.$http.post('/home/news', {
                page,
                pageSize: pageSize,
                type
            }).then((res: any) => {
                const data: any = res.data.data || [];
                // 数据全部加载完成
                if (data.length < pageSize && data.length > 0) {
                    vm[tab].finished = true;
                }
                if (type == 3) {
                    data.forEach((item: any, index: any) => {
                        item.time = dateFormat(item.newstime, 'YYYY-MM-DD  EE');
                        item.isOpen = false;
                        if (vm.alerts.list[item.time]) {
                            vm.alerts.list[item.time].push(item);
                        } else {
                            vm.alerts.dateArray.push(item.time);
                            vm.alerts.list[item.time] = [item];
                        }
                    })
                } else {
                    if (+page === 1) {
                        vm[tab].list = data;
                    } else {
                        vm[tab].list = [...list, ...data];
                    }
                }
                // 加载状态结束
                vm[tab].loading = false;
                vm[tab].isError = false;
            }).catch((res: any) => {
                // 加载状态结束
                vm[tab].loading = false;
                // 加载失败
                vm[tab].error = true;
                vm[tab].isError = true;
            })
        }

        // 新闻详情   type: 热点：0， 投融资：2  专题：1  快讯：3
        protected goDetails(id: any, type = 0) {
            const obj = {
                title: '',
                name: 'newsDetails',
                path: 'newsDetails',
                query: {
                    id,
                    type
                }
            }
            window.openWebView(obj);
        }

        protected changeItem(res: any) {
            res.isOpen = !res.isOpen;
            this.$forceUpdate();
        }

        // 声明周期钩子
        protected activated() {
            this.alerts.page = 1;
            this.getNews('alerts', 3); // 快讯
        }
    };
</script>
<style lang='scss' scoped>
    .information {
        /deep/ .van-tabs--card > .van-tabs__wrap {
            height: 40px;
        }

        /deep/ .van-card__title {
            font-weight: normal;
            color: #333;
        }

        /deep/ .van-card__footer {
            color: #333;
        }

        /deep/ .van-tabs__nav--card {
            border-color: $color;
            height: 30px;
            width: 200px;
            margin: 8px auto 2px auto;

            .van-tab.van-tab--active {
                background: $color;
                color: #fff;
            }

            .van-tab {
                color: $color;
                border-right-color: $color;
                line-height: 28px;
            }
        }

        /deep/ .van-tabs__line {
            background-color: $color;
        }

        /deep/ .van-hairline--top-bottom::after {
            border-top: none;
        }

        /deep/ .van-tabs__content {
            .van-tab--active {
                color: $color;
                font-weight: bold;
            }
        }

        .news {
            /deep/ .van-tabs__content {
                height: calc(100vh - 84px);
                overflow: hidden;

                .van-tab__pane {
                    height: 100%;
                }

                .news-list {
                    height: 100%;
                    overflow-y: scroll;
                }
            }
        }

        /*.news-list {*/
        /*    padding-top: 10px;*/
        /*}*/

        .alerts {
            .date {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: left;
                font-size: 14px;
                color: #666;
                background: #F7F9FA;
                text-indent: 15px;
            }

            /deep/ .van-step--vertical {
                .van-step__title {
                    .time {
                        color: $color;
                        font-size: 14px;
                        width: 66px;
                        height: 20px;
                        line-height: 20px;
                        background: #F4F8FD;
                        border-radius: 6px;
                        margin-bottom: 4px;
                        margin-top: 5px;
                        text-align: center;
                        position: relative;

                        &:after {
                            content: '';
                            width: 18px;
                            height: 1px;
                            position: absolute;
                            left: -18px;
                            top: 9px;
                            z-index: 1;
                            background: #DDDFE3;
                        }
                    }

                    .text {
                        line-height: 22px;
                        font-size: 14px;
                        color: #333;
                    }

                    .vertical {
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 4; //规定几行显示省略号
                        -webkit-box-orient: vertical;
                    }

                    .more {
                       display: block;
                        height: 16px;
                        width: 30px;
                        text-align: center;
                        margin: 0 auto;
                        background: url("/img/down.png") no-repeat center center;
                        background-size: 13px 16px;
                        /*img {*/
                        /*    width: 13px;*/
                        /*}*/
                    }
                    .transform {
                        transform: rotate(180deg);
                    }

                }

                .van-step__circle, .van-step__icon {
                    width: 14px;
                    height: 14px;
                    border-radius: 14px;
                    background: rgba(27, 134, 250, 0.27);
                    position: relative;

                    &:after {
                        content: '';
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        top: 4px;
                        left: 4px;
                        border-radius: 10px;
                        background: $color;
                    }
                }

                .van-step__icon {
                    &:before {
                        content: '';
                    }
                }

                .van-step__line {
                    background-color: #DDDFE3;
                    top: 22px;
                }

                .van-step__circle-container {
                    top: 24px;
                }
            }
        }
    }
</style>
