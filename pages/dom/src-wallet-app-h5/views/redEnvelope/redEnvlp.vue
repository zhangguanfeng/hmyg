/**
*  Created by   阿紫
*  On  2018-12-23
*  Content
*/
<template>
  <div class='redEnvlp'>
    <top class="list-item">
      <p v-if="top.content">{{top.content}}{{$t('redEnvlpRegister.top')[1]}}</p>
      <span v-if="tips">{{top.title}}</span>
    </top>
    <div class="center center-tips" v-if="tips">
      {{tips}}
    </div>
    <div class="center" v-if="!tips & content.amount">
      <div class="number-coin"><span class="number">{{content.amount}}</span> <span
        class="coin">{{content.coinName}}</span></div>
      <div class="account-number">{{$t('redEnvlp.tips')[3]}}{{content.phone | phoneFilters}}</div>
    </div>

    <div class="downJustToken">
      <button @click="downJustToken">{{$t('redEnvlp.tips')[4]}}</button>
    </div>

    <div class="redEnvlpDetails">
      <div class="loading" v-if="isLading">
        <inline-loading></inline-loading>
        <span> {{$t('redEnvlp.tips')[5]}}……</span>
      </div>
      <div v-if="listTitle">
        <div class="title">{{listTitle}}</div>
        <div class="content" v-for="(item,index) in list" :key="index">
          <p><span>{{item.name}} <img v-if="item.tipsIcon" :src="item.tipsIcon" alt=""></span> <span>{{item.amount}} {{item.coinName}}</span>
          </p>
          <p><span>{{item.createTime}}</span> <span>≈￥{{item.toRmb}}</span></p>
        </div>
      </div>
    </div>
    <rule></rule>
  </div>
</template>
<script>
  import top from './top';
  import rule from './rule';
  import { InlineLoading } from 'vux';

  export default {
    name: "redEnvlp",
    components: {
      InlineLoading,
      top,
      rule
    },
    filters: {
      phoneFilters(value) {
        if (!value) return ''
        value = value.toString();
        if (value.length <= 8) {
          return value.substr(0, 2) + '****' + value.substr(6)
        }
        return value.substr(0, 3) + '****' + value.substr(7);
      }
    },
    data() {
      return {
        top: {},
        content: {},
        list: {},
        listTitle: '',
        tips: '',
        param: {
          pageNum: 1,
          pageSize: 101
        },
        isLading: false
      };
    },
    methods: {
      // 领取红包
      getReceiveRedenvlp() {
        const { redenvlpMainId, phone } = this.$route.query;
        const redenvlpToken = localStorage.getItem('justToken_redenvlpToken') || '';
        this.$http.post('wallet/app/redenvlp/open/receiveRedenvlp.do', {
          redenvlpMainId,
          phone,
          redenvlpToken
        }).then(res => {
          const { result } = res;
          const redenvlpToken = result.redenvlpToken || '';
          localStorage.setItem('justToken_redenvlpToken', redenvlpToken);
          if (+result.receivedStatus === 1) {  // 已领取
            this.tips = this.$t('redEnvlp.tips')[0];
          } else {
            this.tips = '';
            this.content = result;
          }
          this.getReceiveRedenvlpList();
        }).catch(res => {
          const { data } = res;
          // 11004 您来迟了，红包已过期~
          const redenvlpToken = data.result.redenvlpToken || '';
          localStorage.setItem('justToken_redenvlpToken', redenvlpToken);
          if (+data.code === 11004) { // 红包过期
            this.tips = this.$t('redEnvlp.tips')[2];
          } else if (+data.code === 10007) { // 红包已经领完
            this.tips = this.$t('redEnvlp.tips')[1];
          } else if (+data.code === 40010) {  //token过期
            const { redenvlpMainId } = this.$route.query;
            this.$router.replace({
              name: 'redEnvlpRegister',
              query: {
                redenvlpMainId,
                lang: this.$i18n.locale
              }
            });
            this.tips = '';
          }
          this.getReceiveRedenvlpList();
        })
      },
      // 领取列表
      getReceiveRedenvlpList() {
        const { redenvlpMainId } = this.$route.query;
        this.isLading = true;
        this.$http.post('wallet/app/redenvlp/open/getReceiveRedenvlpList.do', {
          redenvlpMainId,
          ...this.param
        }).then(res => {
          const { result } = res;
          const { receivedNum, num, amount, coinName, minute, receivedAmount } = result.appRedenvlpMain;
          if (receivedNum == num) {
            this.listTitle = num + this.$t('redEnvlp.title')[0] + amount + coinName + '，' + Math.floor(minute / 60) + this.$t('redEnvlp.title')[1] + minute % 60 + this.$t('redEnvlp.title')[2];
          } else {
            this.listTitle = this.$t('redEnvlp.title')[3] + receivedNum + '/' + num + this.$t('redEnvlp.title')[4] + receivedAmount + '/' + amount + ' ' + coinName;
          }
          this.top = result;
          this.list = result.list.list;
          this.isLading = false;
        }).catch(res => {
          this.isLading = false;
        })
      },
      downJustToken() {
        this.$router.push({
          name: 'download'
        })
      }
    },
    activated() {
      const { lang, isError } = this.$route.query;
      this.$i18n.locale = lang || 'zh';
      document.title = lang === 'zh' ? ' 领取红包' : 'Receiving red packets';
      if (isError == false || isError == 'false') {
        this.getReceiveRedenvlp();
      }
    }
  };
</script>
<style lang="less">
  .redEnvlp {
    min-height: 100%;
    background: #F5F5F5;

    .center-tips {
      color: #969696;
      font-size: 14px;
      line-height: 18px;
    }

    .center {
      padding: 0 20px;
      text-align: center;
      margin: 30px 0;

      .number-coin {
        margin: 0 0 40px 0;
        color: rgba(50, 50, 50, 1);

        .number {
          font-size: 36px;
        }

        .coin {
          font-size: 30px;
        }
      }

      .account-number {
        font-size: 14px;
        font-weight: 500;
        color: rgba(100, 100, 100, 1);
        line-height: 18px;
      }

    }

    .downJustToken {
      width: 100%;
      text-align: center;

      button {
        border: none;
        background: rgba(242, 52, 69, 1);
        box-shadow: 4px 7px 18px 0px rgba(227, 69, 74, 0.32);
        border-radius: 42px;
        color: #fff;
        font-weight: 800;
        font-size: 16px;
        height: 42px;
        width: 80%;
        max-width: 400px;

        &:focus {
          background: #db4645;
          outline: none;
        }
      }
    }

    .loading {
      text-align: center;
      font-size: 12px;
      line-height: 100px;
      height: 100px;
    }

    .redEnvlpDetails {
      background: #fff;
      padding: 0 20px;
      margin: 30px 0;
      max-height: 300px;
      overflow: auto;

      .title {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #E6E6E6;
        font-size: 12px;
        color: #646464;
      }

      .content {
        &:not(:last-child) {
          border-bottom: 1px solid #E6E6E6;
        }

        p {
          line-height: 30px;
          color: #ada7a7;
          font-size: 12px;
          display: flex;
          justify-content: space-between;

          &:first-child {
            font-size: 14px;
            color: #646464;
            font-weight: 500;
          }

          img {
            height: 14px;
          }
        }
      }
    }
  }
</style>
