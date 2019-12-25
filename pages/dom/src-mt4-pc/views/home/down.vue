/**
*  Created by   阿紫
*  On  2019/6/11 0011
*  Content  下载
*/
<template>
  <div class='down'>
    <div class="download" v-if="isDownload">
      <div class="text-box">
        <p>请点击右上角，请您在<img src='@/assets/home/brower.png'>浏览器中打开。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { platform } from '@/common/util';

export default {
  name: 'down',
  data() {
    return {
      isDownload: false,
    };
  },
  mounted() {
    this.isDownload = false;
    if (platform.android) {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        // 微信打开
        this.isDownload = true;
      } else {
        window.location.href = 'https://www.ijikee.co/packet/jikee.apk';
      }
    } else {
      window.location.href = 'https://www.ijikee.co/exchange/#/installation';
    }
  },
};
</script>
<style lang="scss">
  .downloadWalletApp {
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
      background: url('../../assets/home/downloadbg.png') no-repeat;
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
