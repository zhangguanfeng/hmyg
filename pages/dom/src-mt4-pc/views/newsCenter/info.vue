<template>
  <div class="info-container">
    <h2 class="hot__title">
      热点新闻
      <a href="javascript:;" class="section__more" @click="goMore(0)">
        {{$t('newsCenterInfo.more')}}
        <span class="el-icon-arrow-right"></span>
      </a>
    </h2>
    <div class="top">
      <div class="top-left" @mouseenter="onBannerMouseEnter" @mouseleave="onBannerMouseLeave">
        <swiper
          ref="bannerSwiper"
          class="banner-swiper"
          v-if="banner.length"
          :options="bannerSwiperOption"
        >
          <swiper-slide
            onClick="_this.onSelected(this)"
            v-for="(item,index) in banner"
            :key="index"
          >
            <div class="banner-item">
              <img
                class="banner-item__img"
                :src="item.titlepic?item.titlepic: require('../../assets/news/678-300.png')"
                alt
              >
              <div class="banner-item__title">{{item.title}}</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

      </div>
      <div class="top-right">
        <div
          class="top-right-item"
          @click="goDetail(item.id, 0)"
          v-for="(item,index) in hotNew"
          :key="index"
        >
          <img
            class="top-right-item__img"
            :src="item.titlepic?item.titlepic:  require('../../assets/news/171-147.png')"
            alt
          >
          <div class="top-right-item__title">
            <div class="top-right-item__title__inner">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="recommend">
        <h2 class="recommend__title">
          快讯
          <a href="javascript:;" class="section__more" @click="$router.push({name:'newsFlash'})">
            {{$t('newsCenterInfo.more')}}
            <span class="el-icon-arrow-right"></span>
          </a>
        </h2>
        <div class="recommend__time">
          <span class=" el-icon-time"> 今天 {{ currentTime}}</span>
        </div>

        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in highHitsArea"
            :key="index"
            color="#5B0EB2">
            <span class="time">{{activity.newstime | dateFormat('HH:mm')}} </span>
            <span>{{activity.newstext}}</span>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="section" v-if="blockChainArea.length>0">
        <h2 class="section__header">
          专题
          <a href="javascript:;" class="section__more" @click="goMore(1)">
            {{$t('newsCenterInfo.more')}}
            <span class="el-icon-arrow-right"></span>
          </a>
        </h2>
        <div class="info-album-list">
          <div
            class="info-album-item"
            v-for="(item,index) in blockChainArea"
            :key="index"
            @click="goDetail(item.id, 1)"
          >
            <img
              class="info-album-item__img"
              :src="item.titlepic?item.titlepic:  require('../../assets/news/250-200.png')"
              alt
            >
            <div class="info-album-item__title">
              <h3 class="info-album-item__title__inner">{{item.title}}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="section" v-if="investArea.length>0">
        <h2 class="section__header">
          投融资
          <a href="javascript:;" class="section__more" @click="goMore(2)">
            {{$t('newsCenterInfo.more')}}
            <span class="el-icon-arrow-right"></span>
          </a>
        </h2>
        <div class="info-list">
          <div
            class="info-item"
            v-for="(item,index) in investArea"
            :key="index"
            @click="goDetail(item.id, 2)"
          >
            <img
              class="info-item__img"
              :src="item.titlepic?  item.titlepic :  require('../../assets/news/250-150.png') "
              alt
            >
            <div class="info-item__right">
              <h3 class="info-item__title">{{item.title}}</h3>
              <div class="info-item__content">{{item.smalltext| htmlContent}}</div>
              <div class="info-item__date">{{item.publishTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { dateFormat } from '@/common/util';
import 'swiper/dist/css/swiper.css';

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      banner: [], // 热点新闻
      hotNew: [], // 热点新闻
      blockChainArea: [], // 区块链前4
      investArea: [], // 投融资前4
      highHitsArea: [], // 快讯
      currentTime: dateFormat(new Date(), 'EE YYYY-MM-DD HH:mm'),
      bannerSwiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletElement: 'li', // 设定分页器指示器（小点）的HTML标签。
          dynamicMainBullets: 3, // 动态分页器的主指示点的数量
          clickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        },
      },
      cardSwiperOption: {
        loop: true,
        slidesPerView: 2,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
        },
      },
      timer: null
    };
  },
  methods: {
    onBannerMouseEnter() {
      const swiper = this.$refs.bannerSwiper && this.$refs.bannerSwiper.swiper;
      swiper && swiper.autoplay && swiper.autoplay.stop();
    },
    onBannerMouseLeave() {
      const swiper = this.$refs.bannerSwiper && this.$refs.bannerSwiper.swiper;
      swiper && swiper.autoplay && swiper.autoplay.start();
    },
    onSelected(object) {
      const index = object.attributes['data-swiper-slide-index'].nodeValue;
      this.goDetail(this.banner[index].id, 0);
    },
    goDetail(id, type = 1) {
      // type: 热点：0， 投融资：2  专题：1  快讯：3
      this.$router.push({
        name: 'newsdetail',
        query: {
          id,
          type,
        },
      });
    },
    goMore(type) {
      // type: 热点：0， 投融资：2  专题：1  快讯：3
      this.$router.push({
        name: 'news',
        query: {
          type,
        },
      });
    },
    async getList(type = 0, pageSize = 4, page = 1) {
      const res = await this.$http.post('home/news', {
        type,
        pageSize,
        page,
      });
      const { data } = res.data || [];
      switch (type) {
        case 0:
          this.bannerSwiperOption.pagination.dynamicMainBullets = 4;
          this.banner = data.slice(0, 4);
          this.hotNew = data.slice(4, 8);
          break;
        case 1:
          return this.blockChainArea = data;
        case 2:
          return this.investArea = data;
        default:
          return this.highHitsArea = data;
      }
    },
    getCurrentTime() {
      this.timer = setInterval(() => {
        this.currentTime = dateFormat(new Date(), 'EE YYYY-MM-DD HH:mm:ss');
        this.currentTimeH = dateFormat(new Date(), 'HH:mm');
      }, 1000);
    },
  },
  async activated() {
    window._this = this;
    this.getList(0, 8); // 热点新闻
    this.getList(1); // 专题
    this.getList(2); // 投融资
    this.getList(3, 4); // 快讯
    this.getCurrentTime();
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
  @import '~@/styles/variables';

  /deep/ .el-icon-arrow-right:before {
    font-weight: 600;
  }

  .info-container {
    padding: 24px;
    box-sizing: border-box;
    background-color: #fff;
    text-align: left;

    @include media(xs) {
      padding: 15px;
    }
  }

  img {
    object-fit: cover;
  }

  .top {
    display: flex;

    .top-left {
      flex: 1;
      margin-right: 6px;
    }

    .top-right {
      display: flex;
      flex-wrap: wrap;
      width: 360px;
      margin: -3px;
    }
  }

  .top-right-item {
    width: 171px;
    height: 147px;
    position: relative;
    margin: 3px;
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      box-shadow: 0 2px 2px 2px rgba(100, 100, 100, 0.2);
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__title {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      font-size: 12px;
      color: #fff;
      padding: 10px;
      overflow: hidden;
      background: linear-gradient(rgba(0, 0, 0, 0), #000);

      &__inner {
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        @include omit(16px, 2);
      }
    }
  }

  .main {
    display: flex;

    &__left {
      flex: 1;

      .info-list .info-item .info-item__right {
        padding-right: 25px;
        padding-left: 0;
      }
    }

    &__right {
      margin-left: 35px;
      width: 450px;
    }
  }

  .banner-swiper {
    width: 798px;
    height: 300px;

    .banner-item {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &__title {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fff;
        padding: 0px 24px;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        text-align: left;
        font-size: 14px;

        @include omit(32px, 1);
      }
    }
  }

  .card-swiper {
    padding: 40px 0;
    height: 225px;
    box-sizing: border-box;

    /deep/ .swiper-slide {
      z-index: 10;
    }

    /deep/ .swiper-slide-active {
      z-index: 20;
      transform: scale(1.2);
    }

    .card-item {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 5px rgba(93, 93, 93, 0.6);
    }
  }

  .side-img {
    width: 347px;
    height: 200px;
    object-fit: cover;
  }

  .recommend {
    &__title {
      margin-top: 80px;
    }

    &__time {
      background: #F9F9F9;
      height: 38px;
      line-height: 38px;
      padding: 0 15px;
      font-size: 14px;
      margin-bottom: 20px;
    }

    /deep/ .el-timeline-item__tail {
      border-left-color: #c6bcd2;
    }

    /deep/ .el-timeline-item__content {
      display: flex;

      .time {
        color: #999;
        margin-right: 10px;
      }
    }
  }

  .section {
    &__header {
      font-size: 22px;
      margin-top: 80px;
      margin-bottom: 14px;

      @include media(xs) {
        font-size: 20px;
        margin-bottom: 5px;
      }
    }

    &__more {
      float: right;
      color: $color;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      margin-top: 5px;

      &__img {
        width: 8px;
        margin-left: 4px;
      }
    }
  }

  .info-list {
    .info-item {
      display: flex;
      height: 150px;
      transition: all 0.2s linear;
      cursor: pointer;
      padding: 15px 15px 15px 0;
      text-align: left;
      padding-left: 15px;
      margin-left: -15px;

      &:hover {
        box-shadow: 0 2px 2px 2px rgba(100, 100, 100, 0.2);
      }


      &__img {
        width: 250px;
        height: 150px;
      }

      &__right {
        flex: 1;
        padding-left: 25px;

      }

      &__title {
        margin: 0;
        font-size: 18px;
        color: #555555;
        font-weight: 500;
      }

      &__content {
        margin-top: 25px;
        color: #a4a9b3;
        font-size: 14px;

      }

      &__date {
        margin-top: 16px;
        color: #cbcbcb;
        font-size: 14px;
        text-align: right;
      }
    }
  }

  .info-album-list {
    display: flex;

    .info-album-item {
      position: relative;
      // width: 250px;
      width: 280px;
      height: 200px;
      cursor: pointer;
      transition: all 0.2s linear;

      &:hover {
        box-shadow: 0 2px 2px 2px rgba(100, 100, 100, 0.2);
      }

      & + .info-album-item {
        margin-left: 12px;
      }

      &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &__title {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        font-size: 16px;
        color: #fff;
        padding: 16px;
        overflow: hidden;
        background: linear-gradient(rgba(0, 0, 0, 0), #000);

        &__inner {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          // overflow: hidden;
          // max-height: 40px;
          // line-height: 20px;
          // box-sizing: border-box;
          @include omit(22px, 2);
        }

        &::before {
          content: '';
          z-index: 0;
          position: absolute;
          height: 0;
          width: 100%;
          left: 0;
          bottom: 0;
          box-shadow: 0 0px 20px 60px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  /deep/ .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 45px;

    @include media(xs) {
      bottom: 0px;
    }
  }

  /deep/ .swiper-pagination-bullet {
    background: #fff;
    opacity: 0.8;

    @include media(xs) {
      width: 5px;
      height: 5px;
      margin: 0 2px !important;
      background: #e8e8e8;
    }
  }

  /deep/ .swiper-pagination-bullet-active {
    width: 30px;
    border-radius: 4px;
    background: $color;

    @include media(xs) {
      width: 20px;
    }
  }
</style>
