<template>
  <div class="newsSon">
    <div class="banner">
      <h3>{{$t('news.banner_title')}}</h3>
      <p>
        <span @click="$router.push('/')">{{$t('news.banner_text1')}}</span>
        >
        <span @click="$router.push('/news')">{{$t('news.banner_title')}}</span>
        >
        <span @click="$router.push('/newsSon')">{{$t('news.banner_text2')}}</span>
      </p>
    </div>
    <div class="index w">
      <div class="title">
        <h4>{{$t('news.son_title')}}</h4>
        <p>2019-12-06 14:36</p>
      </div>
      <div class="con">
        <p>{{$t('news.son_text1')}}</p>
        <p>{{$t('news.son_text2')}}</p>
        <img src="/img/news_desc.png" alt />
        <!-- <p>{{$t('news.son_text3')}}</p>
        <p>{{$t('news.son_text4')}}</p>
        <p>{{$t('news.son_text5')}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.newsSon {
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .banner {
    width: 100%;
    height: 400px;
    background: url("/banner/news_ban.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      font-weight: 500;
      font-size: 60px;
      color: #56daff;
      padding-bottom: 40px;
    }
    p {
      font-size: 30px;
      color: #3D90BB;
      span{
        &:hover{
          cursor: pointer;
          color: #4fc7eb;
        }
      }
    }
  }
  .index {
    .title {
      padding-top: 70px;
      padding-bottom: 90px;
      width: 69%;
      margin: 0 auto;
      h4 {
        font-size: 32px;
        color: #4fc7eb;
        margin-bottom: 35px;
      }
      p {
        font-size: 24px;
      }
    }
    .con {
      margin-top: 90px;
      width: 900px;
      margin: 0 auto;
      p {
        font-size: 24px;
        margin-bottom: 46px;
      }
      img {
        width: 100%;
        margin-bottom: 46px;
      }
    }
  }
}
</style>