/**
*  Created by   阿紫
*  On  2018-12-17
*  Content
*/
<template>
  <div class='getRedEnvlp'>
    <div class="title" :class="{translateY: isTranslateY,titleTranslateY:!isTranslateY}">
      <h4>{{details.coinName}}{{$t('getRedEnvlp.coinName')}}</h4>
      <h6>{{$t('getRedEnvlp.name')}}{{details.content}}</h6>
    </div>
    <div class="redPacket" :class="{translateY: isTranslateY,redPacketTranslateY:!isTranslateY}">
      <h3>{{$t('getRedEnvlp.title')}}</h3>
      <span class="getPacket" @click="goGetPacket">{{$t('getRedEnvlp.btn')}}</span>
    </div>
    <rule></rule>
  </div>
</template>
<script>
  import rule from './rule';

  export default {
    name: "getRedEnvlp",
    components: {
      rule,
    },
    data() {
      return {
        isTranslateY: false,
        details: {}
      };
    },
    methods: {
      goGetPacket() {
        const { appRedenvlpMainId } = this.$route.query;
        this.$router.replace({
          name: 'redEnvlpRegister',
          query: {
            redenvlpMainId: appRedenvlpMainId,
            lang: this.$i18n.locale
          }
        })
      },
      goRedEnvlp(isError = false) {
        const { appRedenvlpMainId } = this.$route.query;
        this.$router.replace({
          name: 'redEnvlp',
          query: {
            redenvlpMainId: appRedenvlpMainId,
            lang: this.$i18n.locale,
            isError
          }
        })
      },
      getRedEnvlpSendNickName() {
        const { appRedenvlpMainId } = this.$route.query;
        setTimeout(() => {
          this.isTranslateY = true;
        }, 100)
        const redenvlpToken = localStorage.getItem('justToken_redenvlpToken') || '';
        this.$http.post('wallet/app/redenvlp/open/getRedEnvlpSendNickName.do', {
          redenvlpMainId: appRedenvlpMainId,
          redenvlpToken,
        }).then(res => {
          const { result } = res;
          this.details = result;
          if (+result.receivedStatus !== 0) {  // receivedStatus = 1 已领取
            this.goRedEnvlp();
          } else if (redenvlpToken) {
            this.goRedEnvlp();
          }
        }).catch(res => {
          this.goRedEnvlp(true);
        })
      }
    },
    activated() {
      this.getRedEnvlpSendNickName();
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      document.title = lang === 'zh' ? ' AlphaWallet红包' : 'AlphaWallet red packet';
    }
  };
</script>
<style lang="less">
  .getRedEnvlp {
    min-height: calc(100vh);
    width: 100%;
    background: url('../../assets/img/redEnvelope/WechatIMG1.jpg') no-repeat center/100% 100%;

    .translateY {
      transform: none;
    }

    .titleTranslateY {
      transform: translateY(-120px);
    }

    .redPacketTranslateY {
      transform: translateY(500px);
    }

    .title {
      padding-top: 20px;
      transition: all .4s;

      h4 {
        font-size: 36px;
        color: #fff;
        text-align: center;
        margin: 0;
      }

      h6 {
        font-size: 20px;
        color: #fff;
        margin: 10px 0 0 0;
        text-align: center;
      }
    }

    .redPacket {
      width: 240px;
      height: 300px;
      margin: 23px auto;
      background: url('../../assets/img/redEnvelope/WechatIMG2.png') no-repeat center / 100%;
      transition: all .4s;
      position: relative;

      h3 {
        font-size: 25px;
        color: #F9EAB8;
        text-align: center;
        margin: 0;
        padding: 140px 13px 0 13px;
      }

      span {
        display: block;
        width: 200px;
        height: 80px;
        padding: 0 10px;
        font-family: 'PingFang-SC-Heavy';
        background: url('../../assets/img/redEnvelope/btn.png') no-repeat center / 100%;
        font-size: 16px;
        color: #995712;
        text-align: center;
        line-height: 63px;
        font-weight: 900;
        position: absolute;
        bottom: 10px;
        left: 10px;
      }
    }

    .rule {
      color: #fff;

      p {
        color: #fff;
      }
    }
  }

  @media (max-width: 320px) {
    .title {
      padding-top: 10px;
      transition: all .4s;

      h4 {
        font-size: 25px;
      }

      h6 {
        font-size: 16px;
      }
    }

    .redPacket {
      width: 220px;
      height: 280px;
      margin: 15px auto;

      h3 {
        font-size: 20px;
        padding: 130px 13px 0 13px;
      }

      span {
        width: 180px;
        height: 60px;
        line-height: 45px;
        margin-top: 0;
        left: 10px;
        font-size: 14px;
      }
    }
  }

</style>
