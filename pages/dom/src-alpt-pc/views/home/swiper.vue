<template>
  <swiper :options="swiperOption" ref="mySwiper" class="home-swiper">
    <swiper-slide v-for="(item, index) in images" :key="index">
      <div class="cn">
        <img class="img_pc" :src="`/banner/${item.id}.jpg`" alt style="width:100%" />
        <img class="img_h5" :src="`/banner/${item.id}_h5.jpg`" alt style="width:100%" />
      </div>
      <div class="en">
        <img class="img_pc" :src="`/banner/en_${item.id}.jpg`" alt style="width:100%" />
        <img class="img_h5" :src="`/banner/en_${item.id}_h5.jpg`" alt style="width:100%" />
      </div>
      <!--      <div class="slide-wrap">-->
      <!--        <div class="slide-text-contain">-->
      <!--          <div class="name">-->
      <!--            {{$t('home.swiper_name')}}-->
      <!--          </div>-->
      <!--          <div class="tip">-->
      <!--            {{$t('home.swiper_tip')}}-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.min.css';

@Component // ({ components: { swiper, swiperSlide } })
export default class HomeSwiper extends Vue {
  protected swiperOption: any = {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    speed: 300,
    autoplay: {
      delay: 3000
    }
  };
  protected images: any = [{ id: "1" },{ id: "1" }];
}
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.home-swiper {
  .img_h5 {
    display: none;
  }
  .en {
    display: none;
  }
  .slide-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    @include flex();
    .slide-text-contain {
      top: 0;
      left: 0;
      width: calc(100% - 40px);
      height: calc(100% - 80px);
      padding: 0 20px;
      max-width: 1100px;
      @include flex(column);
      .name {
        font-size: 80px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        width: 800px;
      }
      .tip {
        font-size: 39px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        width: 800px;
        opacity: 0.7;
      }
    }
  }
  .swiper-wrapper {
    height: 100% !important;
  }
  .swiper-pagination-bullet {
    width: 40px;
    height: 5px;
    border-radius: 5px;
    opacity: 0.3;
    background: #56daff;
  }
  .swiper-pagination-bullet-active {
    // width: 60px;
    width: 35px;
    background: #56daff;
    opacity: 1;
  }
}
</style>
