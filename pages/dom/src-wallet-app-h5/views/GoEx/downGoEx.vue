/**
*  Created by   阿紫
*  On  2018-12-16
*  Content 下载全球兑
*/
<template>
  <div class='downGoEx'>
    <div class="download" v-if="isDownload">
      <div class="text-box">
        请点击右上角，在浏览器中打开。
      </div>
    </div>
  </div>
</template>
<script>
  import {terminal} from 'common/unti';
  import {AlertModule} from 'vux'

  export default {
    name: "downGoEx",
    data() {
      return {
        isDownload: false
      };
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.isDownload = false;
      document.title = lang === 'zh' ? ' 下载AlphaPay' : 'Download AlphaPay';
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger"|| ua.match(/\sQQ/i) == ' qq') {
        //微信打开
        this.isDownload = true;
      } else if (terminal.android) {
        window.location.href = "https://alpayex.com/AlphaPay.apk"
      } else if (terminal.ios) {
        window.location.href = "itms-services://?action=download-manifest&url=https://alpayex.com/manifest.plist"
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
  .downGoEx {
    height: 100%;

    .download {
      height: 100%;
      background: rgba(3, 3, 3, 0.5);
      position: relative;
    }

    .text-box {
      height: 120px;
      width: 90%;
      background: url('../../assets/img/download/downloadbg.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 23px;
      top: 20px;
      color: #5E5E5E;
      text-align: center;
      font-size: 18px;
      line-height: 160px;
    }
  }
</style>
