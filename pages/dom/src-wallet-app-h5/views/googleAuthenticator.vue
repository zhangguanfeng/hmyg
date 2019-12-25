/**
*  Created by   阿紫
*  On  2018-12-13
*  Content 绑定谷歌验证器教程
*/
<template>
  <div class='googleAuthenticator'>
    <h3>{{$t('googleAuthenticator.main')[0]}}</h3>
    <p>{{$t('googleAuthenticator.main')[1]}}</p>
    <p>{{$t('googleAuthenticator.main')[2]}}</p>
    <h3>{{$t('googleAuthenticator.main')[3]}}</h3>
    <p>{{$t('googleAuthenticator.main')[4]}}</p>
    <p>{{$t('googleAuthenticator.main')[5]}}</p>
    <p>{{$t('googleAuthenticator.main')[6]}}</p>
    <img src="../assets/img/google/tutorial_1.jpg" alt="">
    <img src="../assets/img/google/tutorial_2.jpg" alt="">
    <p>{{$t('googleAuthenticator.main')[7]}}</p>
    <img src="../assets/img/google/tutorial_3.jpg" alt="">
    <p>{{$t('googleAuthenticator.main')[8]}}</p>
    <img src="../assets/img/google/tutorial_4.jpg" alt="">
    <h3>{{$t('googleAuthenticator.main')[9]}}</h3>
    <p>{{$t('googleAuthenticator.main')[10]}}</p>
    <h3>{{$t('googleAuthenticator.main')[11]}}</h3>
    <p>{{$t('googleAuthenticator.main')[12]}}</p>
    <h3>{{$t('googleAuthenticator.main')[13]}}</h3>
    <p>{{$t('googleAuthenticator.main')[14]}}</p>
    <h3>{{$t('googleAuthenticator.main')[15]}}</h3>
    <h3>{{$t('googleAuthenticator.main')[16]}}</h3>
    <p>{{$t('googleAuthenticator.main')[17]}}</p>
    <p>{{$t('googleAuthenticator.main')[18]}}</p>
    <p>{{$t('googleAuthenticator.main')[19]}}</p>
    <img src="../assets/img/google/tutorial_5.jpg" alt="">
    <p>{{$t('googleAuthenticator.main')[20]}}</p>
    <img src="../assets/img/google/tutorial_6.jpg" alt="">
    <p>{{$t('googleAuthenticator.main')[21]}}</p>
    <img src="../assets/img/google/tutorial_7.jpg" alt="">
    <p>{{$t('googleAuthenticator.main')[22]}}</p>
    <img src="../assets/img/google/tutorial_8.jpg" alt="">
    <h3>{{$t('googleAuthenticator.main')[23]}}</h3>
    <p>{{$t('googleAuthenticator.main')[24]}}</p>
    <p>{{$t('googleAuthenticator.main')[25]}}</p>
    <p>{{$t('googleAuthenticator.main')[26]}}</p>
    <p>{{$t('googleAuthenticator.main')[27]}}</p>
    <p>{{$t('googleAuthenticator.main')[28]}}</p>
    <p>{{$t('googleAuthenticator.main')[29]}}</p>
  </div>
</template>
<script>
  export default {
    name: "googleAuthenticator",
    data() {
      return {};
    },
    activated() {
      document.title = this.$t(this.$route.query.name).title;
    }
  };
</script>
<style lang="less">
  .googleAuthenticator {
    padding: 20px;

    h3 {
      color: #545454;
      font-size: 16px;
      line-height: 18px;
    }
    p {
      color: #666666;
      font-size: 13px;
      line-height: 18px;
    }

    img {
      width: 100%;
    }
  }
</style>
