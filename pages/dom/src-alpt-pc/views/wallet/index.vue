<template>
  <div class="wallet">
    <div class="banner">
      <div class="title">
        <h3>AlphaWallet</h3>
        <p class="ch">{{$t('wallet.banner_title')}}</p>
        <p class="text">{{$t('wallet.banner_text')}}</p>
        <p class="text">{{$t('wallet.banner_text1')}}</p>
        <div class="but h5" @click="handleDow">{{$t('wallet.banner_dow')}}</div>
        <div class="pc">
          <div class="icon">
            <h5><i></i><span>ios</span></h5>
            <div class="code_box">
              <div class="jiantou"></div>
              <div class="code">
                <img src="/img/alphawallet.png" alt />
              </div>
            </div>
          </div>
          <div class="icon">
            <h5><i class="android"></i><span>Android</span></h5>
            <div class="code_box">
              <div class="jiantou"></div>
              <div class="code">
                <img src="/img/alphawallet.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="desc_bg">
      <div class="desc w">
        <ul>
          <li v-for="(item,index) in $root.$t('wallet.desc')" :key="index">
            <div class="img">
              <img :src="`/img/wallet_icon${item.id}.png`" alt />
            </div>
            <h5>{{item.title}}</h5>
          </li>
        </ul>
      </div>
    </div>
    <div class="desc_two w">
      <ul class="box">
        <li v-for="(item,index) in $root.$t('wallet.desc_two')" :key="index">
          <div class="img">
            <img :src="`/img/wallet_desc${item.id}.png`" alt />
          </div>
          <h5>{{item.title}}</h5>
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>

    <!-- 轮播图 -->
    <div class="desc_bg">
      <div class="swiper_title w">
        <h4>{{$t('wallet.desc_title')}}</h4>
        <div class="swiper">
          <swiper :options="swiperOption" ref="mySwiper" class="home-swiper">
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper1.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper2.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper3.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper4.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper5.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper6.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper7.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper8.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper9.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper10.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper11.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper12.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper13.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper14.png" alt />
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="box">
                <div class="img">
                  <img src="/img/swiper15.png" alt />
                </div>
                <div class="img">
                  <img src="/img/swiper16.png" alt />
                </div>
              </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.min.css';

@Component // ({ components: { swiper, swiperSlide } })
export default class HomeSwiper extends Vue {
  protected readonly swiperOption: any = {
    loop: true,
    slidesOffsetBefore: 0,
    speed: 300,
    autoplay: {
      delay: 1000,
    },
    freeMode: true,
    slidesPerView: 8,
    autoplayDisableOnInteraction: false,
    spaceBetween: 8,
    noSwiping: true,
  };
  protected readonly images: any = [
    { src: '/banner/0.png' },
    { src: '/banner/0.png' },
    { src: '/banner/0.png' },
  ];
  protected handleDow() {
    window.open('https://walletapp.alpex.io/#/download');
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.wallet {
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .h5 {
    display: none;
  }
  .banner {
    width: 100%;
    height: 580px;
    background: url("/banner/wallet_ban.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      width: 62.5%;
      padding-left: 15%;
      color: #56daff;
      h3 {
        font-weight: 500;
        font-size: 60px;
        padding-bottom: 20px;
      }
      .ch {
        font-size: 40px;
        margin-bottom: 40px;
      }
      .text {
        font-size: 26px;
        width: 468px;
        line-height: 40px;
      }
      .pc {
        display: flex;
        margin-top: 40px;
        .icon {
          position: relative;
          text-align: center;
          width: 200px;
          height: 50px;
          margin-right: 50px;
          border: 2px solid #3FA5EA;
          border-radius: 35.5px;
          h5 {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            height: 100%;
            color: #fff;
            background: #102050;
            font-weight: 200;
            border-radius: 35.5px;
            &:hover{
              background: #203880;
            }
            i{
              display: inline-block;
              width: 24px;
              height: 24px;
              background: url('/img/ios.png');
              background-size: 100% 100%;
              vertical-align: middle;
              margin-right: 10px;
              
            }
            .android{
              background: url('/img/Android.png');
              background-size: 100% 100%;
            }
          }
          &:hover {
            .code_box {
              display: block;
            }
          }
          .code_box {
            position: absolute;
            left: 45px;
            display: none;
            .jiantou {
              width: 0;
              height: 0;
              border: 10px solid;
              border-color: transparent transparent #fff;
              margin: 0 auto;
            }
            .code {
              box-sizing: border-box;
              padding: 5px;
              width: 135px;
              height: 135px;
              background: #fff;
              opacity: 1;
              border-radius: 2px;
            }
          }
        }
      }
      .but {
        box-sizing: border-box;
        width: 271px;
        color: #fff;
        font-size: 32px;
        background: linear-gradient(to right, #34dcff, #1583b5);
        margin-top: 55px;
        padding: 13px 70px;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .desc_bg {
    background: #101040;
    .desc {
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 60px 185px;
        li {
          width: 105px;
          h5 {
            font-size: 22px;
            text-align: center;
            color: #4fc7eb;
          }
        }
      }
    }
  }
  .desc_two {
    ul {
      margin: 0 auto;
      padding: 120px 215px 278px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 300px;
        @include transition(0.6s);
        &:hover {
          transform: scale(1.1);
        }
        &:nth-child(odd) {
          padding-bottom: 260px;
        }
        &:nth-child(even) {
          padding-top: 260px;
        }
        .img {
          width: 246px;
        }
        h5 {
          font-size: 30px;
          color: #347ca1;
          font-weight: 500;
          padding: 30px 0;
        }
        p {
          font-size: 17px;
          color: #2E6A8E;
          text-align: center;
        }
      }
    }
  }
  .swiper_title {
    box-sizing: border-box;
    padding: 0 50px;
    h4 {
      @include title();
      padding-top: 41px;
      padding-bottom: 80px;
    }
  }
  .swiper {
    .swiper-wrapper {
      transition-timing-function: linear; //匀速滚动
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        margin: 50px 0;
        width: 70px;
        height: 70px;
      }
    }
    .home-swiper {
      height: 400px;
    }
    .swiper-wrapper {
      height: 100% !important;
    }
  }
}
</style>