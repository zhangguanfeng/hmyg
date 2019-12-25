<!--
 * @Author: your name
 * @Date: 2019-12-18 14:08:10
 * @LastEditTime : 2019-12-23 17:00:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wallet-app-h5\src\views\download\justToken\downloadWalletApp.vue
 -->
/**
*  Created by   阿紫
*  On  2018-12-16
*  Content 下载AlphaWallet页面
*/
<template>
  <div class='downloadWalletApp'>
    <div class="download" v-if="isDownload">
      <div class="text-box">
        请点击右上角，在浏览器中打开。
      </div>
    </div>
  </div>
</template>
<script>
  import { terminal } from 'common/unti';
  import { AlertModule } from 'vux'

  export default {
    name: "downloadWalletApp",
    data() {
      return {
        isDownload: false
      };
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.isDownload = false;
      document.title = lang === 'zh' ? ' 下载AlphaWallet' : 'Download AlphaWallet';
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/\sQQ/i) == ' qq') {
        //微信打开
        this.isDownload = true;
      } else if (terminal.android) {
        window.location.href ="https://gdpic.oss-cn-shenzhen.aliyuncs.com/alphawallet/alphawallet.apk"
      } else if (terminal.ios) {
        window.location.href ="https://ios.llc/09VLV"
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
  .downloadWalletApp {
    height: 100%;

    .download {
      height: 100%;
      background: rgba(3, 3, 3, 0.5);
      position: relative;
    }

    .text-box {
      height: 120px;
      width: 90%;
      background: url('../../../assets/img/download/downloadbg.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 23px;
      top: 20px;
      text-align: center;
      color: #5E5E5E;
      font-size: 18px;
      line-height: 160px;
    }
  }
</style>
