/**
*  Created by   阿紫
*  On  2019/10/31
*  Content 公告详情
*/
<template>
    <div class='noticeDetails' :class="{'has-header':headTitle}">
        <h-navbar v-if="headTitle" :title='title' @backPage="onClickLeft"/>
        <div class="title">
            <h5> {{details.title}}</h5>
            <div class="time">{{details.time}}</div>
        </div>
        <div class="content" v-html="details.content"></div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  interface Details {
    title: string,
    time: string,
    content: string
  }

  @Component({})
  export default class NoticeDetails extends Vue {
    protected title: any = '公告详情';
    protected isRouteBack: any = true;
    protected headTitle: any = true;
    protected details: Details = {
      title: '',
      time: '',
      content: '',
    };

    protected onClickLeft() {
      if (this.isRouteBack) {
        this.$router.go(-1);
      } else {
        window.closeWebView();
      }
    }

    // 获取公告详情
    protected getData() {
      this.$http.post('Home/getNoticeDetails', {
        notice_id: this.$route.query.id,
      }).then((res: any) => {
        const {title, add_time, content} = res.data;
        this.details.title = title;
        this.details.time = add_time;
        this.details.content = content;
      })
    }

    // 获取消息详情
    protected getNoticeDetails() {
      this.$http.post('CommonFun/getNoticeDetails', {
        notice_id: this.$route.query.id,
      }).then((res: any) => {
        const {title, add_time, content} = res.data;
        this.details.title = title;
        this.details.time = add_time;
        this.details.content = content;
      })
    }

    protected activated() {
      this.details = {
        title: '',
        time: '',
        content: ''
      }

      this.isRouteBack = this.$route.query.isRouteBack == 'false' ? false : true;
      this.headTitle = this.$route.query.hideTitleBar == '0' ? false : true;
      if (this.$route.query.type == 'notice') {
        this.getData()
        this.title = '公告详情';
      } else {
        this.getNoticeDetails();
        this.title = '消息详情';
      }
    }
  };
</script>
<style lang='scss'>
    .noticeDetails {

        .title {
            padding: 10px 20px 10px 20px;
            border-bottom: 1px solid $border-color;
        }

        h5 {
            font-size: 14px;
            padding: 20px 0;
            color: #333;
            text-align: center;
            padding: 0;
            margin: 0 0 10px 0;
        }

        .time {
            font-size: 12px;
            color: #333;
            display: flex;
            justify-content: flex-end;
        }

        .content {
            padding: 10px 20px;
            font-size: 14px;
            color: #333;
            line-height: 24px;
            word-break: break-all;
            img {
                max-width: 100%;
                height: auto;
            }
        }
    }
</style>
