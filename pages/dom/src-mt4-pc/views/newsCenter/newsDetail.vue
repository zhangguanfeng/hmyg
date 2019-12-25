/**
*  Created by   阿紫
*  On  2019-03-11
*  Content 新闻详情
*/
<template>
  <div class="newsDetail">
    <go-back></go-back>
    <div class="center">
      <div class="title">
        <h3>{{details.title}}</h3>
        <div class="describe">
          <span>{{details.time }}</span>
        </div>
      </div>
      <div v-html="details.content" class="content ql-editor"></div>
      <div class="mzsm">
        {{details.mzsm}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'newsdetail',
    data() {
      return {
        details: {
          title: '',
          time: '',
          content: '',
          mzsm: ''
        },
        next: {},
        prev: {}
      }
    },
    methods: {
      getDetails() {
        this.$http.post('home/newsDetails', {
          type: this.$route.query.type,
          id: this.$route.query.id
        }).then((res) => {
          const { newstext, newstime, title, mzsm } = res.data.data
          this.details.content = newstext
          this.details.time = newstime
          this.details.title = title
          this.details.mzsm = mzsm
        })
      },
      getNoticeDetails() {
        this.$http.post('Home/getNoticeDetails', {
          notice_id: this.$route.query.id,
        }).then((res) => {
          const {title, add_time, content} = res.data;
          this.details.title = title;
          this.details.time = add_time;
          this.details.content = content;
          this.details.mzsm = '';
        })
      }
    },
    activated() {
      this.details = {
        title: '',
        time: '',
        content: ''
      }
      if (this.$route.query.type == 'notice') {
        this.getNoticeDetails();
        this.$root.$emit('changeNewsTitle', 'notice');
      } else {
        this.getDetails();
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/styles/quill.bubble.scss';
  @import '~@/styles/quill.core.scss';
  @import '~@/styles/quill.snow.scss';

  .newsDetail {
    margin: 0 auto;
    padding: 20px;

    .go-back {
      @include media(xs) {
        display: none;
      }
    }

    @include media(xs) {
      background-color: #fff;
    }

    .center {
      background: #fff;
      padding: 20px 40px;

      @include media(xs) {
        padding: 0;
      }
    }

    .title {
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 20px;

      h3 {
        font-size: 26px;
        color: #404040;
        margin: 0;
        line-height: 60px;

        @include media(xs) {
          line-height: 1.2;
          padding: 0;
          padding-bottom: 10px;
          font-size: 22px;
        }
      }

      .describe {
        color: #999;
        font-size: 12px;

        span {
          &:first-child {
            margin-right: 40px;
          }
        }
      }
    }

    .content {
      text-align: left;
      border-bottom: 1px solid #ebebeb;
      padding: 30px;

      @include media(xs) {
        padding: 15px 0;
        font-size: 15px;
        word-break: break-all;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .mzsm {
      font-size: 12px;
      color: #999;
      margin: 20px 0;
      text-align: left;
    }
  }
</style>
