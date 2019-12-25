/**
*  Created by   阿紫
*  On  2018-12-16
*  Content AlphaWallet ios 介绍页
*/
<template>
  <div class='download'>
    <div class="title">
      <img src="../../../assets/img/download/logo.png" alt="">
      <p>AlphaWallet</p>
    </div>

    <a href="javascript:;" @click="godownloadWalletApp">{{$t('download.download')}}</a>
    <p style="margin-bottom: 20px; text-align: left;">本次更新修改了签名证书，不再使用企业证书，所以会导致新下载的应用同时在手机上出现两个，请删除旧版本应用。</p>
    <div class="tips">
      <div class="tips_line"></div>
      <span>{{$t('download.install')[0]}}</span>
    </div>
    <p>{{$t('download.install')[1]}}</p>
    <img src="../../../assets/img/download/download_tips_1.png" alt="">
    <p>2、在手机的 <span>「设置」</span>-<span>「通用」</span>-<span>「设备管理」</span>中，找到 AlphaWallet 的证书。</p>
    <img src="../../../assets/img/download/download_tips_2.png" alt="">
    <p>3、点击<span>「信任」</span>这个证书就可以开始使用 AlphaPay 了。</p>
    <img src="../../../assets/img/download/download_tips_3.png" alt="">
  </div>
</template>
<script>
import { terminal } from 'common/unti';
  export default {
    name: "download",
    data() {
      return {};
    },
    methods: {
      godownloadWalletApp() {
        window.location.href = `${window.location.origin}/#/downloadWalletApp`
        // this.$router.push({
        //   name: 'downloadWalletApp'
        // })
      }
    },
    activated() {
      if (!terminal.ios) {
        window.location.href = `${window.location.origin}/#/downloadWalletApp`
        // this.$router.push({
        //   name: 'downloadWalletApp'
        // })
      }
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      document.title = lang === 'zh' ? ' 下载AlphaWallet' : 'Download AlphaWallet';
    },
  };
</script>
<style lang="less">
  .download {
    text-align: center;
    padding: 45px 30px 0;
    background: #fff;
    height: calc(100vh);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

    .title {
      img {
        width: 80px;
        margin: 0;
      }
      p {
        margin: 0;
        color: #545454;
        font-size: 17px;
        font-weight:600;
      }
    }

    a {
      margin: 25px 0 40px 0;
      font-size: 14px;
      text-decoration-line: none;
      color: #fff;
      background: #077EFF;
      display: inline-block;
      border-radius: 21px;
      width: 180px;
      height: 42px;
      line-height: 42px;
      font-weight: 500;
      text-decoration: none;
      box-shadow:0px 4px 27px 0px rgba(7,126,255,0.41);
    }

    img {
      width: 100%;
      margin: 10px 0 30px 0;
    }

    .tips {
      display: flex;
      justify-content: center;
      position: relative;
      height: 16px;
      margin-bottom: 36px;

      span {
        color: #969696;
        font-size: 14px;
        background: #fff;
        display: inline-block;
        position: absolute;
        top: -9px;
      }

      .tips_line {
        height: 1px;
        width: 100%;
        background: #F0F0F0;
        position: absolute;
      }
    }

    p {
      font-size: 14px;
      color: #323232;
      text-align: center;
      span {
        color: #5E87D8;
      }
    }
  }

</style>
