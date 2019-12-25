/**
*  Created by   阿紫
*  On  2019-03-04
*  Content
*/
<template>
  <div class="home">
    <div class="introduce_text" :class="{active: introduceActive}" ref="introduceText">
      <div class="bg">
        <img class="bg0" src="@/assets/home/download-bg1.png" alt="">
        <img class="bg1" src="@/assets/home/download-bg.png" alt="">
      </div>
      <div class="download-float">
        <div class="title">
            <span class="meta">
              下载APP  畅想交易
            </span>
          <span class="support">
              支持iOS & Android 多系统，扫码下载随手随地交易
            </span>
        </div>
        <div class="pic-wrap">
          <div class="download-app" id="download">
            <div class="cpt">
              <img src="@/assets/home/cpt.png" alt="">
            </div>
            <div class="mt4app">
              MT4 APP
            </div>
            <div class="tip">
              下载客户端，随时随地畅享交易
            </div>
            <div class="app-icon-warp">
              <img src="@/assets/home/android_icon_blue.png" alt="">
              <span class="strong">/</span>
              <img src="@/assets/home/ios_icon_blue.png" alt="">
              APP下载
            </div>
            <div class="qrcode">
              <img :src="qrcode" alt>
            </div>
            <div class="download-tip">
              IOS & Android 扫码下载
            </div>
          </div>
          <div class="pic">
            <div class="kline-pic">
              <img src="@/assets/home/kline.png" alt="">
            </div>
            <div class="app-pic">
              <img src="@/assets/home/app.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-swiper" @mouseenter="onBotEnter" @mouseleave="onBotLeave" v-show="$i18n.locale !== 'en'">
      <swiper :options="swiperOption" class="affiche" ref="myBotSwiper">
        <swiper-slide v-for="(item,index) in afficheList" :key="index">
          <div class="content">
            <span class="text" @click="goNewsDetails(item.notice_id,'notice')">
              <img src="@/assets/home/affiche.png" alt="affiche">
              <span>{{item.notice_title}}</span>
            </span>
            <span class="right">
               <span class="time">{{item.add_time}}</span>
               <span class="more" @click="goNotice()">查看更多 <i class="el-icon-arrow-right"></i></span>
            </span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="introduce">
      <div class="introduce_icon">
        <el-row :gutter="24">
          <el-col :span="8">
            <span class="title0">
              业务覆盖
            </span>
            <span class="title1">
              3大洲
            </span>
            <span class="title2">
              <img src="@/assets/home/guid0.png" alt="">
            </span>
          </el-col>
          <el-col :span="8">
            <span class="title0">
              用户
            </span>
            <span class="title1">
              100万+
            </span>
            <span class="title2">
              <img src="@/assets/home/guid1.png" alt="">
            </span>
          </el-col>
          <el-col :span="8">
            <span class="title0">
              杠杆
            </span>
            <span class="title1">
              ∞:1
            </span>
            <span class="title2">
              <img src="@/assets/home/guid2.png" alt="">
            </span>
          </el-col>
        </el-row>
      </div>
      <div class="introduce_choose">
        <div class="why">
          为什么选择CPT Markets？
        </div>
        <div class="tips">
          全球金融交易领航者
        </div>
        <div class="tips">
          业务覆盖3大洲，用户遍布世界各地，多个金融强国监管
        </div>
        <div class="why-list" ref="whyList">
          <div class="animation" v-if="whyActive">
            <div class="why-wrap">
              <div class="pointer">&nbsp;</div>
              <div class="title">
                顶级牌照
              </div>
              <div class="text">
                拥有英国FCA以及伯利兹IFSC两大监管牌照
              </div>
              <div class="pic">
                <img src="@/assets/home/why0.png" alt="">
              </div>
            </div>
          </div>
          <div class="animation" v-if="whyActive" style="animation-delay: 150ms">
            <div class="why-wrap">
              <div class="pointer">&nbsp;</div>
              <div class="title">
                交易高效
              </div>
              <div class="text">
                24小时不间断交易，5*24小时客户服务
              </div>
              <div class="pic">
                <img src="@/assets/home/why1.png" alt="">
              </div>
            </div>
          </div>
          <div class="animation" v-if="whyActive" style="animation-delay: 300ms">
            <div class="why-wrap">
              <div class="pointer">&nbsp;</div>
              <div class="title">
                杠杠无限
              </div>
              <div class="text">
                灵活的杠杠机制，投资门槛低，杠杆高达无限
              </div>
              <div class="pic">
                <img src="@/assets/home/why2.png" alt="">
              </div>
            </div>
          </div>
          <div class="animation" v-if="whyActive" style="animation-delay: 450ms">
            <div class="why-wrap">
              <div class="pointer">&nbsp;</div>
              <div class="title">
                账户独立
              </div>
              <div class="text">
                用户资金妥善存管于独立账户，安全可靠
              </div>
              <div class="pic">
                <img src="@/assets/home/why3.png" alt="">
              </div>
            </div>
          </div>
          <div class="animation" v-if="whyActive" style="animation-delay: 600ms">
            <div class="why-wrap">
              <div class="pointer">&nbsp;</div>
              <div class="title">
                技术加密
              </div>
              <div class="text">
                用户资金妥善存管于独立账户，安全可靠
              </div>
              <div class="pic">
                <img src="@/assets/home/why4.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news">
      <div class="content">
        <h3>
          新闻中心
          <span style="cursor: pointer" @click="$router.push({name:'news',query:{type:0}})">
             查看更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </h3>
        <div class="list">
          <el-row :gutter="12">
            <el-col :span="12" v-for="(item,index) in newsList" :key="index" v-if="index==0">
              <div class="first" @click="goNewsDetails(item.id)">
                <img
                  style="width:100%;height:100%;object-fit:cover;"
                  :src="item.titlepic || require('@/assets/home/news1.png')"
                  alt
                >
                <p>{{item.title}}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="12" class="row-right">
                <el-col
                  :span="24"
                  v-for="(item,index) in newsList"
                  :key="index"
                  v-if="index==1||index==2"
                >
                  <div class="right" @click="goNewsDetails(item.id)">
                    <img
                      v-lazy="item.titlepic || (index == 1 ? require('@/assets/home/news2.png') : require('@/assets/home/news3.png'))"
                      alt
                    >
                    <span style="flex: 1;
    word-break: break-all;">
                      <h3>{{item.title}}</h3>
                      <!-- <p>{{item.content}}</p> -->
                      <p ref="">{{item.smalltext}}</p>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import QRCode from 'qrcode'
  import { platform } from '@/common/util'

  const isTestEnv = location.origin.search('dev.ijikee') > -1
    || location.origin.search('localhost') > -1
    || location.origin.search('8080') > -1
  const IOS_PATH = 'https://www.ijikee.co/exchange/#/installation'
  const ANDROID_PATH = 'https://www.ijikee.co/packet/jikee.apk'
  const PATH = `${location.origin}/down`
  export default {
    name: 'home',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        platform,
        bannerList: [],
        afficheList: [],
        newsList: [],
        qrcode: '',
        andrioidQrcode: '',
        // 设置属性
        swiperOption: {
          // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
          direction: 'vertical',
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          // 切换速度，即slider自动滑动开始到结束的时间（单位ms）
          speed: 300,
          // 强制Swiper的高度(px)
          height: 36,
          // 开启无限循环
          loop: false,
          // 设置同屏显示的数量，默认为1，使用auto是随意的意思。
          slidesPerView: 1,
          mousewheel: true
        },
        bannerSwiperOption: {
          loop: true,
          autoplay: {
            delay: 3000
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletElement: 'li', // 设定分页器指示器（小点）的HTML标签。
            dynamicMainBullets: 5, // 动态分页器的主指示点的数量
            clickable: true // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
          }
        },
        swiperOptionCard: {
          centeredSlides: true,
          spaceBetween: 0,
          slidesPerView: 'auto',
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        buySPO: 100,
        introduceActive: true, // k线和zapp背景图是否处于激活状态
        whyActive: true // 为什么选择是否处于激活状态
      }
    },
    computed: {
      myBotSwiper() {
        return this.$refs.myBotSwiper.swiper
      }
    },
    // watch: {
    //   $route() {
    //     this.introduceActive = false
    //     this.whyActive = false
    //   }
    // },
    methods: {
      onBannerMouseEnter() {
        const swiper = this.$refs.bannerSwiper && this.$refs.bannerSwiper.swiper
        swiper
        && swiper.autoplay
        && swiper.autoplay.stop()
      },
      onBannerMouseLeave() {
        const swiper = this.$refs.bannerSwiper && this.$refs.bannerSwiper.swiper
        swiper
        && swiper.autoplay
        && swiper.autoplay.start()
      },
      onBotEnter() {
        this.myBotSwiper
        && this.myBotSwiper.autoplay
        && this.myBotSwiper.autoplay.stop()
      },
      onBotLeave() {
        this.myBotSwiper
        && this.myBotSwiper.autoplay
        && this.myBotSwiper.autoplay.start()
      },
      // 公告
      getNotifations() {
        this.$http.post('Home/getNotifations', {
          page: 1,
          pageSize: 5
        }).then((res) => {
          this.afficheList = res.data.data
        })
      },
      // 新闻
      getNewsList() {
        this.$http
          .post('home/news', {
            type: 0, // 热点新闻
            pageSize: 3,
            page: 1
          })
          .then((res) => {
            this.newsList = res.data.data || []
          })
      },
      goBannerDetails(res) {
        location.href = res.banner_link
      },
      goDown() {
        if (platform.android) {
          location.href = ANDROID_PATH
        } else {
          window.open(PATH)
        }
      },
      goNewsMore() {
        this.$router.push({
          path: '/newsInfo'
        })
      },
      goNewsDetails(id, type = 0) { // type   1:新闻    2:公告   3:热点新闻
        this.$router.push({
          name: 'newsdetail',
          query: {
            id,
            type
          }
        })
      },
      // 公告列表
      goNotice() {
        this.$router.push({
          name: 'notice'
        })
      },
      go() {
        this.$router.push({
          name: 'newsdetail',
          query: {
            id,
            type: 'notice'
          }
        })
      },
      generateQrcode() {
        QRCode.toDataURL(PATH)
          .then((url) => {
            this.qrcode = url
          })
      },
      deleteImg(index) {
        this.bannerList.splice(index, 1)
        const { bannerList } = this
        this.bannerList = []
        this.$nextTick(() => {
          this.bannerList = bannerList
          this.bannerSwiperOption.pagination.dynamicMainBullets = bannerList.length
        })
      },
      setAnimationHandle() {
        const Index = document.querySelector('.index')
        // app
        let curr = 0
        const rate = 0.85
        const handle0 = (e) => {
          const domReact = this.$refs.introduceText.getClientRects()[0]
          const winHeight = document.body.clientHeight
          const isUp = Index.scrollTop < curr // 是否向上滚动
          curr = Index.scrollTop
          if (!isUp) { // 向下
            if (winHeight - domReact.top > domReact.height * rate) {
              this.introduceActive = true
            }
            if (-domReact.top - domReact.height > 100) {
              this.introduceActive = false
            }
          } else { // 向上
            if (domReact.height + domReact.top > domReact.height * rate) {
              this.introduceActive = true
            }
            if (domReact.top - winHeight > 100) {
              this.introduceActive = false
            }
          }
        }
        // 为什么选择
        const handle1 = (e) => {
          const domReact = this.$refs.whyList.getClientRects()[0]
          const winHeight = document.body.clientHeight
          if (winHeight - domReact.top > domReact.height * 0.5) {
            this.whyActive = true
          }
        }
        Index.onscroll = (e) => {
          if (this.$route.fullPath !== '/download' && this.$route.fullPath !== '/') return
          handle0(e)
          if (!this.whyActive) handle1(e)
        }
        window.onresize = (e) => {
          if (this.$route.fullPath !== '/download' && this.$route.fullPath !== '/') return
          if (!this.introduceActive) handle0(e)
          if (!this.whyActive) handle1(e)
        }
        window.onresize()
      }
    },
    activated() {
      this.getNewsList()
      this.getNotifations()
    },
    async mounted() {
      window._this = this
      this.generateQrcode()
      // this.setAnimationHandle()
    }
  }
</script>
<style lang="scss">
  @mixin transition($duration: 500ms) {
    transition: all $duration cubic-bezier(0.23, 0.74, 0.55, 0.97);
  }

  .home {

    .introduce_text {
      width: 100%;
      height: 574px;
      margin: 0 auto;
      overflow: hidden;
      background: linear-gradient(178deg, rgba(78, 12, 185, 1) 0%, rgba(45, 89, 197, 1) 100%);
      position: relative;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        img {
          width: 100%;
        }

        .bg0 {
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          z-index: 3;
          transform: translate(0, 100%);
          @include transition(800ms);
        }

        .bg1 {
          width: 100%;
          position: absolute;
          left: 0;
          right: 0;
          bottom: -90px;
          z-index: 2;
          transform: translate(0, 100%);
          @include transition(800ms);
        }
      }

      .download-float {
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        background: transparent;
        user-select: none;

        .title {
          height: 20%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #FFFFFF;
          @include transition();
          transform: translate(0, 80px);
          opacity: 0;

          .meta {
            font-size: 26px;
          }

          .support {
            font-size: 16px;
          }
        }

        .pic-wrap {
          height: 80%;
          width: 100%;
          display: flex;

          .download-app {
            height: calc(100% - 25px);
            width: 30%;
            padding-left: 10%;
            display: flex;
            flex-direction: column;
            align-content: center;
            transform: translate(0, -150px);
            @include transition();
            opacity: 0;

            > div {
              width: 100%;
              display: flex;
              justify-content: center;
              align-content: center;
            }

            .cpt {
              height: 50px;

              > img {
                width: 50px;
                height: 50px;
              }
            }

            .mt4app {
              font-size: 20px;
              color: #FFFFFF;
              text-align: center;
              width: 100%;
              height: 40px;
              line-height: 40px;
            }

            .tip {
              width: 100%;
              height: 22px;
              font-size: 16px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
              opacity: .7;
            }

            .app-icon-warp {
              width: 184px;
              margin: 0 auto;
              height: 40px;
              margin-top: 40px;
              background: red;
              line-height: 40px;
              color: #FFFFFF;
              background: rgba(255, 255, 255, 0.16);
              border: 1px solid rgba(255, 255, 255, 1);
              border-radius: 8px;
              vertical-align: top;

              .strong {
                font-size: 27px;
              }

              > img {
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin: 4px 2px;
              }
            }

            .qrcode {
              width: 168px;
              height: 168px;
              margin: 0 auto;
              margin-top: 20px;
              border: 1px solid rgba(255, 255, 255, 1);
              display: flex;
              align-items: center;
              justify-content: center;

              > * {
                width: 142px;
                height: 142px;
                background: #FFF;
                @include transition();

                &:hover {
                  transform: scale(1.01);
                }
              }
            }

            .download-tip {
              margin-top: 5px;
              height: 22px;
              font-size: 16px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
              opacity: .7;
            }
          }

          .pic {
            width: 60%;
            height: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;

            .kline-pic {
              display: flex;
              justify-content: flex-start;
              @include transition();
              transform: translate(-80%, 0);
              opacity: 0;

              img {
                width: 581px;
                height: 403px;
                @include transition();

                &:hover {
                  transform: scale(1.01);
                }
              }
            }

            .app-pic {
              transform: translate(40px, 120px);
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              @include transition();
              opacity: 0;

              img {
                width: 152px;
                height: 302px;
                @include transition();

                &:hover {
                  transform: translate(0, -2px) scale(1.01);
                }
              }
            }
          }
        }
      }
    }

    .introduce_text.active {
      .bg {
        .bg0 {
          transform: translate(0, 0);
        }

        .bg1 {
          transform: translate(0, 0);
        }
      }

      .download-float {
        .title {
          transform: translate(0, 0);
          opacity: 1;
        }

        .pic-wrap {
          .kline-pic {
            opacity: 1;
            transform: translate(0, 0);
          }

          .app-pic {
            opacity: 1;
            transform: translate(-110px, 120px);
          }

          .download-app {
            opacity: 1;;
            transform: translate(0, 0);
          }
        }
      }
    }

    .affiche {
      background: rgba(0, 0, 0, 1);
      opacity: 0.4;
      color: #fff;
      font-size: 16px;
      margin-top: -36px;
      z-index: 10;
      height: 36px;

      .content {
        width: 1200px;
        margin: 0 auto;
        text-align: left;
        vertical-align: middle;
        height: 36px;
        line-height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #AFC0FF;
        font-size: 14px;

        img {
          width: 18px;
          height: 18px;
          margin-right: 10px;
          vertical-align: middle;
        }

        span {
          cursor: pointer;
          vertical-align: middle;
        }

        .text {
          vertical-align: middle;
          width: 950px;
          text-align: left;
          font-size: 18px;
          @include omit(36px, 1);
        }

        .right {
          width: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .time {
          margin-right: 20px;
          width: 140px;
        }
      }
    }

    .introduce {
      text-align: center;
      margin: 20px 0 120px 0;

      &_icon {
        margin: 30px auto;
        background: red;
        height: 205px;
        line-height: 205px;
        color: #203c73;
        font-size: 22px;
        max-width: 1200px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.14);
        border-radius: 6px;
        padding: 15px 0;

        .el-row {
          margin: 0 auto !important;

          .el-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;

            .title0 {
              font-size: 18px;
              line-height: 40px;
              color: #BEAECF;
            }

            .title1 {
              font-size: 30px;
              line-height: 45px;
              color: #5B0EB2;
            }

            .title2 {
              height: 130px;

              img {
                width: 100px;
                height: 100px;
                margin-right: 10px;
                transition: all 0.3s cubic-bezier(0.23, 0.74, 0.55, 0.97);

                &:hover {
                  transform: scale(1.12);
                }
              }
            }
          }
        }
      }

      &_choose {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        margin-top: 60px;

        .why {
          height: 50px;
          font-size: 28px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 50px;
          margin-bottom: 10px;
        }

        .tips {
          height: 33px;
          font-size: 18px;
          font-family: PingFangSC;
          font-weight: 400;
          line-height: 33px;
          color: #82778E;
        }

        .why-list {
          width: 100%;
          height: 280px;
          margin: 20px 0;
          display: flex;
          flex: 1;
          margin: 0 auto;
          margin-top: 30px;

          .animation {
            width: 18%;
            margin: 0 1%;
            transform: translateY(50px);
            opacity: 0;
            animation: slide-up 1.5s cubic-bezier(0.23, 0.74, 0.55, 0.97);
            animation-fill-mode: forwards;

            .why-wrap {
              width: 100%;
              height: 100%;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.14);
              border-radius: 8px;
              display: flex;
              flex-direction: column;
              @include transition();
              user-select: none;

              &:hover {
                transform: translate(0, -3px);
              }

              .pointer {
                width: 16px;
                height: 16px;
                background: rgba(130, 51, 219, 1);
                box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.5);
                opacity: 0.1;
                border-radius: 50%;
                margin: 10px 0 0 10px;;
              }

              .title {
                color: #333333;
                font-size: 20px;
                position: relative;

                &:after {
                  content: '';
                  height: 10px;
                  position: absolute;
                  bottom: 0px;
                  left: 40px;
                  right: 40px;
                  border-radius: 10px;
                  background: rgba(91, 14, 178, 0.1);
                }
              }

              .text {
                min-width: 100px;
                width: calc(100% - 40px);
                padding: 0 20px;
                text-align: left;
                margin-top: 20px;
                font-size: 16px;
                height: 240px;
                font-family: PingFangSC;
                font-weight: 400;
                color: #666666;
                line-height: 28px;
              }

              .pic {
                width: calc(100% - 40px);
                padding: 10px 20px 20px 20px;
                height: 74px;
                display: flex;
                justify-content: flex-end;

                img {
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
    }

    &_content {
      margin: 0 auto;
    }

    .news {
      width: 1200px;
      margin: 30px auto 90px auto;

      h3 {
        text-align: left;
        color: #333333;
        font-size: 22px;

        span {
          font-size: 16px;
          color: $color;
          float: right;
        }
      }

      .content {
        margin: 0 auto;
      }

      .el-card__body {
        padding: 0;
      }

      .el-card {
        border: none;
      }

      .first {
        height: 330px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 6px;

        img {
          border-radius: 6px;
        }

        &:hover {
          transform: translate(0, -2px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
        }

        p {
          position: absolute;
          bottom: 0;
          margin: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 16px;
          height: 56px;
          line-height: 56px;
          padding-left: 0;
          text-align: left;
          text-indent: 20px;
          border-radius: 6px;
        }
      }

      .row-right {
        .el-col {
          &:not(:first-child) {
            margin-top: 10px;
          }
        }
      }

      .right {
        height: 160px;
        display: flex;
        background: #fff;
        padding-right: 20px;
        cursor: pointer;
        transition: all 0.3s;
        overflow: hidden;
        border-radius: 4px;

        &:hover {
          transform: translate(0, -2px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
        }

        h3 {
          color: #404040;
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin: 15px 0;
        }

        p {
          color: #8c8c8c;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          margin: 0;
        }

        img {
          width: 250px;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        span {
          flex: 1;
          text-align: left;
          margin-left: 20px;
        }
      }
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 45px;
    }

    .swiper-pagination-bullet {
      background: #fff;
      opacity: 0.8;
    }

    .swiper-pagination-bullet-active {
      width: 30px;
      border-radius: 4px;
      background: $color;
    }


    .project {
      .swiper-button-prev, .swiper-button-next {
        background: rgba(255, 162, 42, 0.7);
        width: 36px;
        height: 94px;
        position: absolute;
        top: 120px;
      }

      .swiper-button-prev {
        left: 0;

        &:after {
          content: '';
          position: absolute;
          top: 36px;
          left: 12px;
          width: 12px;
          height: 21px;
          background: url("../../assets/left.png");
        }
      }

      .swiper-button-next {
        right: 0;

        &:after {
          content: '';
          position: absolute;
          top: 36px;
          left: 12px;
          width: 12px;
          height: 21px;
          background: url("../../assets/right.png");
        }
      }

      .swiper-container {
        height: 334px;
        position: relative;

        .project_content {
          width: 300px;
          height: 270px;
          margin-top: 15px;

          img {
            width: 300px;
            height: 180px;
          }
        }

        .swiper-slide-active {
          margin: 0 15px;
        }

        .swiper-slide-prev, .swiper-slide-active, .swiper-slide-next {
          box-shadow: 7px 1px 43px 0px rgba(0, 0, 0, 0.1);
          width: 300px;
          height: 300px;
          margin-top: 0;
          z-index: 2;

          img {
            width: 300px;
            height: 200px;
          }
        }
      }
    }
  }

  .tooltip {
    width: 150px;
    height: 150px;

    img {
      width: 100%;
    }
  }

  @keyframes slide-up {
    from {
      transform: translate(0, 30px);
      opacity: 0;
    }
    to {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
</style>
