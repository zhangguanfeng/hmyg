<template>
    <div class="message has-header">
        <h-navbar title="消息中心" @backPage="backPage"/>
        <van-tabs v-model="activeName" @click="tabChange" sticky>
            <van-tab title="系统消息" name="system">
                <div class="content">
                    <van-list
                        v-model="systemList.loading"
                        :finished="systemList.finished"
                        :error.sync="systemList.error"
                        class="list"
                        @load="onLoad"
                        :immediate-check="false"
                        v-if="systemList.list.length>0"
                        error-text="请求失败，点击重新加载"
                        finished-text="没有更多了">
                        <van-cell-group>
                            <van-cell
                                is-link
                                @click="goDetails(item.id,'system',item.status)"
                                v-for="(item,index) in systemList.list"
                                :key="index">
                                <div slot="title" class="title">
                                    【
                                    <span class="label-title">{{item.title}}</span>
                                    】
                                    <span class="dot" v-if="item.status==1"></span>
                                </div>
                                <div slot="label" class="label">
                                    <span class="left">{{item.content}}</span>
                                    <span class="right">{{item.add_time}}</span>
                                </div>
                            </van-cell>
                        </van-cell-group>
                    </van-list>
                    <h-noData v-else></h-noData>
                </div>
            </van-tab>
            <van-tab title="消息公告" name="notice">
                <div class="content">
                    <van-list
                        v-model="noticeList.loading"
                        :finished="noticeList.finished"
                        :error.sync="noticeList.error"
                        class="list"
                        @load="noticeOnLoad"
                        :immediate-check="false"
                        v-if="noticeList.list.length>0"
                        error-text="请求失败，点击重新加载"
                        finished-text="没有更多了">
                        <van-cell-group>
                            <van-cell
                                is-link
                                @click="goDetails(item.notice_id,'notice')"
                                v-for="(item,index) in noticeList.list"
                                :title="item.notice_title"
                                :label="item.add_time"
                                :key="index">
                            </van-cell>
                        </van-cell-group>

                    </van-list>
                    <h-noData v-else></h-noData>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  interface List {
    loading: any;
    finished: any;
    error: any;
    isError: any;
    list: any;
    page: any;
    pageSize: any;
  }

  @Component
  export default class Message extends Vue {
    protected activeName: any = 'system';
    protected preActiveName: any = 'system';
    protected systemList: List = {
      loading: false,
      finished: false,
      error: false,
      isError: false,
      list: [],
      page: 1,
      pageSize: 20,
    };
    protected noticeList: List = {
      loading: false,
      finished: false,
      error: false,
      isError: false,
      list: [],
      page: 1,
      pageSize: 20,
    };

    protected backPage() {
      if(this.$route.query.isClose === 'true') {
        window.closeWebView();
      } else {
        // const obj = {
        //   tabBarIndex: 4, // 我的页面
        // };
        // window.selectTabBar(obj);
        window.noticeAllWebViewController('freshUserInfo');
        window.closeWebView();
      }
    }

    protected tabChange() {
      if (this.activeName === this.preActiveName) {
        return;
      }
      this.preActiveName = this.activeName;
      if (this.activeName == 'system') {
        this.systemList.page = 1;
        this.getSystemNotifations();
        this.$router.push({
          name: 'message',
          query: {
            type: 'system',
            isClose: 'true',
          }
        })
      } else {
        this.noticeList.page = 1;
        this.getNotifations();
        this.$router.push({
          name: 'message',
          query: {
            type: 'notice',
            isClose: 'true',
          }
        })
      }
    }

    // 系统消息
    protected onLoad() {
      if (!this.systemList.isError) {
        this.systemList.page++;
      }
      this.getSystemNotifations();
    };

    // 获取系统消息数据
    protected getSystemNotifations() {
      const {page, pageSize, list} = this.systemList;
      this.$http.post('CommonFun/getNotifations', {
        page,
        pageSize,
      }).then((res: any) => {
        const data: any = res.data.data || [];
        // 数据全部加载完成
        if (data.length < pageSize && data.length > 0) {
          this.systemList.finished = true;
        }

        if (+page === 1) {
          this.systemList.list = data;
        } else {
          this.systemList.list = [...list, ...data];
        }
        // 加载状态结束
        this.systemList.loading = false;
        this.systemList.isError = false;
      }).catch((res: any) => {
        // 加载状态结束
        this.systemList.loading = false;
        // 加载失败
        this.systemList.error = true;
        this.systemList.isError = true;
      })
    }

    // 消息公告
    protected noticeOnLoad(tab: string, type: number) {
      if (!this.noticeList.isError) {
        this.noticeList.page++;
      }
      this.getNotifations();
    };

    // 获取公告数据
    protected getNotifations() {
      const {page, pageSize, list} = this.noticeList;
      this.$http.post('Home/getNotifations', {
        page,
        pageSize,
      }).then((res: any) => {
        const data: any = res.data.data || [];
        // 数据全部加载完成
        if (data.length < pageSize && data.length > 0) {
          this.noticeList.finished = true;
        }

        if (+page === 1) {
          this.noticeList.list = data;
        } else {
          this.noticeList.list = [...list, ...data];
        }
        // 加载状态结束
        this.noticeList.loading = false;
        this.noticeList.isError = false;
      }).catch((res: any) => {
        // 加载状态结束
        this.noticeList.loading = false;
        // 加载失败
        this.noticeList.error = true;
        this.noticeList.isError = true;
      })
    }


    protected goDetails(id: any, type: any, status: any) {
      if (this.activeName == 'system' && status == 1) {
        this.updateNewNotice(id);
      }
      this.$router.push({
        name: 'messageDetails',
        query: {
          id,
          type,
          isRouteBack: 'true'
        }
      })
    }

    protected updateNewNotice(id: any) {
      this.$http.post('CommonFun/updateNewNotice', {
        notice_id: id,
      });
    }

    protected activated() {
      if (this.$route.query.type === 'notice') {
        this.activeName = 'notice'
        this.noticeList.page = 1;
        this.getNotifations();
      } else {
        this.activeName = 'system';
        this.systemList.page = 1;
        this.getSystemNotifations();
      }
      this.preActiveName = this.activeName;
    }
  }
</script>
<style lang="scss" scoped>
    @import '@/styles/mixin.scss';

    .message {
        background: $bg-color;

        /deep/ .van-tab--active {
            color: $color;
        }

        /deep/ .van-tabs__line {
            background: $color;
        }

        .content {
            padding: 10px 0;

            .list {
                .van-cell {
                    position: relative;
                }

                .van-cell__title {
                    font-size: 14px;
                    height: 50px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #333;

                    .title {
                        display: flex;
                        align-items: center;
                        color: #333;

                        .label-title {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            max-width: calc(100vw - 113px);
                            display: inline-block;
                        }

                        .dot {
                            background: #F24724;
                            width: 8px;
                            height: 8px;
                            display: inline-block;
                            border-radius: 50%;
                        }
                    }
                }

                .van-cell__label {
                    position: absolute;
                    left: 22px;
                    right: 9px;
                    color: #666;
                    font-size: 13px;
                }

                .label {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;


                    .left {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 13px;
                        color: #666;
                    }

                    .right {
                        width: 120px;
                        font-size: 13px;
                        color: #666;
                    }
                }
            }
        }
    }
</style>
