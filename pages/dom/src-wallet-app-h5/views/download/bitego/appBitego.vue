/**
*  Created by   阿紫
*  On  2018-12-16
*  Content 下载bitgoe页面
*/
<template>
  <div class='appBitego'>
    <div class="download" v-if="isDownload">
      <div class="text-box">
        <p>请点击右上角，请您在<img src='../../../assets/img/download/brower.png'>浏览器中打开。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { terminal } from 'common/unti';
  import { AlertModule } from 'vux'

  export default {
    name: "appBitego",
    data() {
      return {
        isDownload: false
      };
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.isDownload = false;
      document.title = lang === 'zh' ? ' 下载比特购' : 'Download Bitego';
      if (terminal.android) {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //微信打开
          this.isDownload = true;
        } else {
          window.location.href = "https://static.moralchain.io/moralchain/bitgoe/Bitgoe.apk"
        }
      } else if (terminal.ios) {
        window.location.href = "itms-services://?action=download-manifest&url=https://static.moralchain.io/moralchain/bitgoe/manifest.plist"
      } else {
        AlertModule.show({
          title: '提示',
          content: this.$t('download.tips')
        })
      }
    },
  };
</script>
<style lang="less">
  .appBitego {
    height: 100%;

    .download {
      height: 100%;
      background: rgba(3, 3, 3, 0.5);
      position: relative;
    }

    .text-box {
      height: 110px;
      width: 80%;
      right: 23px;
      background: url('../../../assets/img/download/downloadbg.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;

      p {
        width: 83%;
        color: #5E5E5E;
        font-size: 18px;
        padding: 0 15px;
        margin-top: 40px;
      }

      img {
        width: 17px;
        height: 17px;
      }

    }
  }
</style>
