/**
*  Created by   阿紫
*  On  2019/4/30 0030
*  Content  比特购下载地址
*/

<template>
  <div class='bitego'>
    <h3>下载企业发布版本</h3>

    <a href="javascript:;" @click="godownloadWalletApp">点击下载</a>
    <p style="margin-bottom: 20px;">本版本仅作企业内部分发使用，不对外发布</p>
    <div class="tips">
      <div class="tips_line"></div>
      <span>iOS安装教程</span>
    </div>
    <p>1、第一次打开 比特购 时会弹出如下框。</p>
    <img src="./down1.png" alt="">
    <p>2、在手机的 <span>「设置」</span>-<span>「通用」</span>-<span>「设备管理」</span>中，找到 比特购 的证书。</p>
    <img src="./down2.png" alt="">
    <p>3、点击<span>「信任」</span>这个证书就可以开始使用 比特购 了。</p>
    <img src="./bitego.png" alt="">
  </div>
</template>
<script>
  export default {
    name: "download",
    data() {
      return {};
    },
    methods: {
      godownloadWalletApp() {
        this.$router.push({
          name: 'appBitego'
        })
      }
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      document.title = lang === 'zh' ? ' 下载比特购' : 'Download Bitego';
    },
  };
</script>
<style lang="less">
  .bitego {
    text-align: center;
    padding: 45px 30px 0;
    background: #fff;
    height: calc(100vh);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

    h3 {
      font-size: 24px;
      color: #323232;
      margin: 0;
      padding: 0 10px;
    }

    a {
      margin: 25px 0 40px 0;
      font-size: 14px;
      text-decoration-line: none;
      color: #fff;
      background: #5E87D8;
      display: inline-block;
      border-radius: 21px;
      width: 140px;
      height: 42px;
      line-height: 42px;
      font-weight: 500;
      text-decoration: none;
      box-shadow: 1px 1px 10px #5679BD;
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
