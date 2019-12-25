<template>
  <div class="home">
    <div class="header_hint" v-if="!session">
      <div
        @click="openWebView('registed',{isClose:'true'})"
      >Hi,注册限时福利,开户100%赠金!</div>
      <span @click="openWebView('service')">
        <h-img src="/img/service1.png" alt />
      </span>
    </div>
    <div class="header_hint" v-else>
      <p>
        <span>
          <h-img src="/img/user.png" alt />
        </span>
        {{ userInfo && userInfo.user_cell}}
      </p>
      <span @click="openWebView('service')">
        <h-img src="/img/service1.png" alt />
      </span>
    </div>
    <div class="banner" :style="{ height: this.bannerHeight  + 'px' }">
      <van-swipe :autoplay="3000" style="width: 100%; height: calc(100%)" indicator-color="white">
        <van-swipe-item
          :style="{width: '100%', height: bannerHeight + 'px' }"
          v-for="(item, key) in banners"
          :key="key"
        >
          <h-img width="100%" height="100%" :src="item[`banner_img_${$i18n.locale}`]" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="notice">
      <!--            <van-icon name="volume"/>-->
      <h-img src="/img/volume.png" style="margin-right:10px" alt />
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item,index) in noticeList" :key="index" class="list">
          <span
            class="text"
            @click="openWebView('messageDetails', {
                                   id:item.notice_id,
                                   isRouteBack:'false',
                                   type:'notice'})"
          >{{item.notice_title}}</span>
        </van-swipe-item>
      </van-swipe>
      <van-icon
        class="more"
        name="arrow"
        @click="openWebView('message', {type:'notice', isClose:'true'})"
      />
    </div>
    <div class="home-info">
      <ul class="data">
        <li v-for="(item, key) in symbols" :key="key" @click="goKline(key)">
          <div class="info-t" v-html="item.NAME"></div>
          <div
            class="info-m"
            :class="{unset: item.isUp === null, fall: item.isUp === false, rise: item.isUp === true}"
          >
            {{item.LASTPRICE}}
            <h-img
              class="pointer up"
              v-show="item.isUp === true"
              :src="require('@/assets/up.png')"
            />
            <h-img
              class="pointer down"
              v-show="item.isUp === false"
              :src="require('@/assets/down.png')"
            />
          </div>
          <div
            class="info-b"
            :class="{unset: item.isPUP === null, fall: item.isPUP === false, rise: item.isPUP === true}"
          >{{item.PERCENT}}</div>
        </li>
      </ul>
      <div class="icon">
        <ul class="icon">
          <li @click="openWebView('aboutUs')">
            <h-img style="width:26px" src="/img/aboutUs.png" alt />
            <span class="text">关于我们</span>
          </li>
          <li @click="goSchool">
            <h-img style="width:24px" src="/img/school.png" alt />
            <span class="text">投资学堂</span>
          </li>
          <li @click="openWebView('help')">
            <h-img style="width:24px" src="/img/help.png" alt />
            <span class="text">帮助中心</span>
          </li>
          <li @click="openWebView('service')">
            <h-img style="width:27px" src="/img/service.png" alt />
            <span class="text">在线客服</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="activityBox">
      <div class="activity">
        <span>活动专区</span>
      </div>
      <van-swipe :autoplay="3000" v-if="!session">
        <van-swipe-item>
          <h-img
            src="/img/activity.png"
            style="width:90%; "
            @click="openWebView('registed',{isClose:'true'})"
          ></h-img>
        </van-swipe-item>
        <van-swipe-item>
          <h-img
            src="/img/activity1.png"
            style="width:90% "
            @click="openWebView('registed',{isClose:'true'})"
          ></h-img>
        </van-swipe-item>
      </van-swipe>
      <van-swipe :autoplay="3000" v-else>
        <van-swipe-item>
          <h-img
            src="/img/activity.png"
            style="width:90%; "
            @click="openWebView('cash',{type: 'golden'})"
          ></h-img>
        </van-swipe-item>
        <van-swipe-item>
          <h-img src="/img/activity1.png" style="width:90% " @click="openWebView('invite')"></h-img>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 交易情绪 -->
    <div class="emotion">
      <div class="activity">
        <span>交易情绪</span>
      </div>
      <div class="swipe_box">
        <van-swipe :loop="false" :width="300" :show-indicators="false">
          <van-swipe-item v-for="(item,index) in tradeMoodList" :key="index">
            <div class="box"  @click="goKline(item.symbol)">
              <div class="title">
                <div class="title_left">
                  <p>{{item.symbol}}多空持仓</p>
                  <p class="time">{{item.add_time}}</p>
                </div>
              </div>
              <div class="con_bottom">
                <div class="left">
                  <van-circle
                    v-model="item.currentRate"
                    :rate="+item.short"
                    :speed="1000"
                    :text="item.symbol"
                    layer-color="#EF534BFF"
                    color="#2AAB91FF"
                    :stroke-width="80"
                    size="84"
                  />
                </div>
                <div class="right">
                  <div class="right_top">
                    <i></i>
                    <p>多头</p>
                    <span>{{item.long}}%</span>
                  </div>
                  <div class="right_bottom">
                    <i></i>
                    <p>空头</p>
                    <span>{{+item.short}}%</span>
                  </div>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="trading">
      <span>交易机会</span>
    </div>
    <ul class="comment">
      <van-list
        class="container"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="getNews"
        :immediate-check="false"
      >
        <li v-for="(item, key) in news" :key="key">
          <div class="icon">
            <div class="img-wrap">
              <van-image
                width="40px"
                height="40px"
                fit="cover"
                do_not_open="false"
                :src="item.avatar"
              />
            </div>
            <div class="user-name">{{item.author}}</div>
          </div>
          <div class="main">
            <div
              class="text"
              :class="{vertical: !item.isOpen}"
              @click="item.isOpen=!item.isOpen"
            >{{ item.content }}</div>
            <van-image v-if="item.img" fit="cover" @click="changeImg(item.img)" :src="item.img" />
            <div
              class="data-text"
              :class="{unset: listSymbols[item.coin_pair].isPUP === null, fall: listSymbols[item.coin_pair].isPUP === false, rise: listSymbols[item.coin_pair].isPUP === true}"
            >
              {{item.coin_pair}}
              <span>{{listSymbols[item.coin_pair].LASTPRICE}}</span>
              <span class="info-b">{{listSymbols[item.coin_pair].PERCENT}}</span>
              <span
                class="text-icon"
                :class="{riseBg:item.how_long == 100,fallBg:item.how_long != 100}"
              >{{item.how_long == 100 ? '多':'空'}}</span>
            </div>
            <div class="date">
              <!-- 2019-10-21 05:00 -->
              <span>{{item.add_time}}</span>
              <span
                class="more"
                v-if="item.content.length>80"
                @click="item.isOpen=!item.isOpen"
              >{{item.isOpen?'收起':'查看更多'}}</span>
            </div>
          </div>
        </li>
      </van-list>
    </ul>

    <div class="hidden" ref="hidden">
      <div class="icon"></div>
      <div class="comment"></div>
    </div>
    <!-- 悬浮窗 -->
    <div class="activity_hanging" @click="handleToLink" v-show="hangingImg.hanging_img">
      <h-img width="100%" :src="hangingImg.hanging_img" alt />
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import Take from "@/common/take.js";
import Service from "@/svg/service.vue";
import Help from "@/svg/help.vue";
import Learn from "@/svg/learn.vue";
import AboutUs from "@/svg/aboutUs.vue";
import { ImagePreview, Circle } from "vant";

interface IBanner {
  banner_img_cn: string;
  banner_img_en: string;
}

interface ITakeSymbol {
  ASK: string | null;
  BID: string | null;
  LASTPRICE: string;
  HISTORY: string | null;
  isUp: boolean | null;
  isPUP: boolean | null;
  PERCENT: string | null;
  CLOSE: string | null;
  desc?: any;
  digits?: any;
  NAME?: any;
}

interface ISymbols {
  USOUSD: ITakeSymbol;
  XAUUSD: ITakeSymbol;
  EURUSD: ITakeSymbol;
}

interface ISymbolKey {
  USOUSD: string;
  XAUUSD: string;
  EURUSD: string;
}

@Component({ components: { Service, Help, Learn, AboutUs } })
export default class Home extends Vue {
  public socket: Take | null = null; // 报价Socket链接
  protected readonly bannerRate: number = 339 / 160;
  protected commentLenght: number = 0;
  protected timmer: any = null;
  protected bannerHeight: number = 160;
  protected news: any = [];
  protected noticeList: any = [];
  protected session: any = "";
  protected loadBanner: boolean = false;
  protected loadSymbolInfo: boolean = false;
  // 数据条展示参数
  protected currentRate: any = 0;
  protected tradeMoodList: any = [];
  // 悬浮窗图片
  protected hangingImg: any = {};
  // 无限滚动
  protected loading: boolean = false;
  protected finished: boolean = false;
  protected error: boolean = false;
  protected page: number = 0;
  protected pageSize: number = 3;
  protected symbols: ISymbols = {
    // 原油
    USOUSD: {
      NAME: "原油美元",
      ASK: "--",
      BID: "--",
      LASTPRICE: "--",
      HISTORY: null,
      isUp: null,
      isPUP: null,
      PERCENT: "  ",
      CLOSE: null
    },
    // 黄金
    XAUUSD: {
      NAME: "黄金美元",
      ASK: "--",
      BID: "--",
      LASTPRICE: "--",
      HISTORY: null,
      isUp: null,
      isPUP: null,
      PERCENT: "  ",
      CLOSE: null
    },
    // 欧美
    EURUSD: {
      NAME: "欧元美元",
      ASK: "--",
      BID: "--",
      LASTPRICE: "--",
      HISTORY: null,
      isUp: null,
      isPUP: null,
      PERCENT: "  ",
      CLOSE: null
    }
  };
  protected listSymbols: any = {};
  protected readonly swiperOption: any = {
    slidesPerView: 1.18,
    loopAdditionalSlides: 100,
    centeredSlides: true,
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  };
  protected banners: IBanner[] = [];

  protected get userInfo(): any {
    return this.$store.state.userInfo;
  }

  protected tabActive: number = 0;
  protected comments: any = [
    {
      text: ""
    },
    {
      text: ""
    },
    {
      text: ""
    }
  ];
  protected closeTag: boolean[] = [false, false, false];

  @Watch("userInfo", {
    deep: true
  })
  protected userInfoChange() {
    // alert('change' + this.$store.state.token)
    // this.session = this.$store.state.token;
  }

  protected goKline(item: any) {
    const objAndroid = {
      page: "activity.kline.KLineActivity",
      trade_exchange: item
    };
    const objIos = {
      page: "KLineViewController",
      trade_exchange: item
    };
    window.interfaceJump(objAndroid, objIos);
  }

  protected getBanner() {
    if (this.loadBanner) {
      return;
    }
    this.loadBanner = true;
    this.$http
      .post("home/getBanner", {
        type: 1
      })
      .then((res: any) => {
        this.banners = res.data;
      })
      .finally(() => {
        this.loadBanner = false;
      });
  }
  // 获取交易情绪数据
  protected getTradeMood() {
    this.$http
      .post("home/getTradeMood", {
        page: 1,
        page_size: 10
      })
      .then((res: any) => {
        this.tradeMoodList = res.data.data;
        this.tradeMoodList.forEach((e: any) => {
          e.currentRate = 0;
        });
      });
  }
 
  // 获取浮窗图片
  protected getActivityHanging() {
    this.$http.post("home/getActivityHanging", {}).then((res: any) => {
      this.hangingImg = res.data;
    });
  }
  // 点击浮窗跳转
  protected handleToLink() {
    const obj = {
      title: "",
      url: this.hangingImg.hanging_link
    };
    window.openWebView(obj);
  }
  protected routerToSwiper(item: any) {
    if (this.socket) {
      this.socket.close();
    }

    const obj = {
      title: "",
      url: item.banner_link
    };
    window.openWebView(obj);
    // window.open(item.banner_link);
  }

  protected onmessage(data: any) {
    const vm = this as any;
    for (const i in this.symbols) {
      if (data.SYMBOL === i) {
        const obj = vm.symbols[i];
        obj.LASTPRICE = data.LASTPRICE;
        if (obj.HISTORY !== null) {
          obj.isUp = +data.LASTPRICE - obj.HISTORY > 0;
        }
        obj.HISTORY = obj.LASTPRICE;
        this.setClose(i);
        break;
      }
    }
    for (const i in this.listSymbols) {
      if (data.SYMBOL === i) {
        const obj = vm.listSymbols[i];
        obj.LASTPRICE = data.LASTPRICE;
        if (obj.HISTORY !== null) {
          obj.isUp = +data.LASTPRICE - obj.HISTORY > 0;
        }
        obj.HISTORY = obj.LASTPRICE;
        this.setClose(i);
        this.$forceUpdate();
        break;
      }
    }
  }

  protected setClose(symbol: string) {
    const vm = this as any;
    const target: ITakeSymbol = vm.symbols[symbol] || vm.listSymbols[symbol];
    if (!/\d+/.test(target.LASTPRICE) || target.CLOSE === null) {
      return;
    }
    try {
      const desc = parseFloat(target.LASTPRICE) - parseFloat(target.CLOSE);
      const prefix = desc > 0 ? "+" : desc < 0 ? "-" : "";
      target.isPUP = desc > 0 ? true : desc < 0 ? false : null;
      target.PERCENT =
        prefix +
        ((Math.abs(desc) * 100) / Math.abs(+target.CLOSE)).toFixed(2) +
        "%";
    } catch (e) {}
  }

  protected getSymbolInfo(setSymbol?: any) {
    setSymbol = setSymbol || this.symbols;
    const symbol = Object.keys(setSymbol);
    this.$http.post("Panel/getSymbolAllInfo", { symbol }).then((res: any) => {
      const { data } = res;
      for (const v of data) {
        setSymbol[v.symbol].LASTPRICE = v.ask_price;
        setSymbol[v.symbol].ASK = v.ask_price;
        setSymbol[v.symbol].BID = v.bid_price;
        setSymbol[v.symbol].CLOSE = v.close_price;
      }
    });
  }

  protected getNews() {
    const postdata = {
      page: ++this.page,
      pageSize: this.page > 1 ? 10 : this.pageSize
    };
    this.$http
      .post("Home/getTradeOpportunity", postdata)
      .then(async ({ data: { data, total_count, total_page } }: any) => {
        if (data.length > 0) {
          data.forEach((item: any, index: any) => {
            item.isOpen = false;
            this.$set(this.listSymbols, item.coin_pair, {
              ASK: "--",
              BID: "--",
              LASTPRICE: "--",
              HISTORY: null,
              isUp: null,
              isPUP: null,
              PERCENT: " ",
              desc: "--",
              CLOSE: null,
              digits: null
            });
          });
          this.news = [...this.news, ...data];
        }
        await this.getSymbolInfo(this.listSymbols);
        this.sendTakeMessage();
        this.finished = +total_page === this.page;
        this.loading = false;
        this.error = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  protected openWebView(to: string, query = {}) {
    const obj = {
      title: "",
      name: to,
      path: to,
      query
    };
    window.openWebView(obj);
  }

  protected goSchool() {
    const obj = {
      title: "投资学堂",
      path: "school",
      name: "school",
      query: {
        hideTitleBar: "0" // 用原声头部
      }
    };
    window.openWebView(obj);
  }

  protected getNotifations() {
    this.$http
      .post("Home/getNotifations", {
        page: 1,
        pageSize: 5
      })
      .then((res: any) => {
        this.noticeList = res.data.data;
      });
  }

  protected sendTakeMessage() {
    if (this.socket) {
      const keys = [
        ...Object.keys(this.symbols),
        ...Object.keys(this.listSymbols)
      ];
      this.socket.sendMessage(keys.join(","));
    }
  }

  protected changeImg(img: string) {
    ImagePreview([img]);
  }

  protected activated() {
    this.socket = new Take({
      onmessage: this.onmessage
    });
    this.$util.webViewName("home");
    this.session = this.$util.token();
    this.getNotifations();
    this.sendTakeMessage();
    this.getSymbolInfo();
    this.getNews();
    this.getTradeMood();
    this.getActivityHanging();
    this.$store.dispatch('getUserInfo');
    window.onWebViewMessage = () => {
      this.session = this.$util.token();
      // alert('on' + this.session)
      this.$store.dispatch("getUserInfo");
    };
    window.onCloseWebViewMessage = () => {
      this.session = this.$util.token();
      // alert('we' + this.session);
      this.$store.dispatch("getUserInfo");
    };
    this.getBanner();
    this.timmer = setTimeout(() => {
      this.getSymbolInfo();
      this.sendTakeMessage();
    }, 1000 * 60 * 30);
  }

  protected beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
    clearTimeout(this.timmer);
  }

  private mounted() {
    window.index = this;
    const width = document.body.clientWidth;
    this.bannerHeight = width / this.bannerRate;
  }
}
</script>
<style lang="scss">
@import "@/styles/mixin.scss";
.home {
  p {
    padding: 0;
    margin: 0;
  }
  .banner {
    position: relative;

    .simgle-img {
      width: calc(100% - 30px);

      img {
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 10px #aeaeaf;
      }
    }
  }
  .header_hint {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    p {
      padding: 0;
      margin: 0;
    }
    span {
      display: inline-block;
      width: 20px;
      height: 23px;
      vertical-align: middle;

      img {
        width: 100%;
      }
    }
  }

  .emotion {
    padding: 5px 0;
    // background: #f9f9f9;
    .swipe_box {
      padding-left: 13px;
      .van-swipe-item {
        box-sizing: border-box;
        padding: 5px;
      }
      .box {
        color: #999999ff;
        border-radius: 10px;
        padding: 10px 7.5px;
        box-shadow: 1px 1px 6px #d9dde0a3;
        display: flex;
        height: 170px;
        box-sizing: border-box;
        .title {
          margin-bottom: 17px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .title_left{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            align-items: center;
          }
          .title_right {
            box-sizing: border-box;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 2.5px;
            span {
              padding: 2px 4px;
              display: inline-block;
              margin: 4px 0;
              &:nth-child(1) {
                border-right: 1px solid #ccc;
              }
            }
          }
          p {
            font-size: 14px;
            color: #333333ff;
            font-weight: 600;
          }
          .time {
            padding-top: 5px;
            font-size: 12px;
            color: #999999ff;
          }
        }
        .van-circle__text {
          color: #999999ff;
        }
        flex-direction: column;
        .con_bottom {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .right {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p {
              font-size: 13px;
            }
            .right_top {
              height: 21px;
              line-height: 21px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-bottom:10px;
              i {
                display: inline-block;
                width: 5px;
                height: 5px;
                border-radius: 100%;
                background: #ef534bff;
              }
              p {
                padding: 0 8px;
              }
              span {
                display: inline-block;
                color: #ef534bff;
              }
            }
            .right_bottom {
              height: 21px;
              line-height: 21px;
              display: flex;
              justify-content: center;
              align-items: center;
              i {
                display: inline-block;
                width: 5px;
                height: 5px;
                border-radius: 100%;
                background: #00cb77;
              }
              p {
                padding: 0 8px;
              }
              span {
                color: #00cb77;
              }
            }
          }
        }
      }
    }
  }
  // 悬浮窗样式
  .activity_hanging {
    position: fixed;
    top: 425px;
    right: 0;
    width: 114px;
    height: 114px;
  }
  .hidden {
    display: block;
    position: fixed;
    width: calc(100vw - 20px);
    padding: 0 10px;
    height: 100vh;
    background: transparent;
    z-index: -1;
    left: -1111vw;
    top: 0;
    z-index: 999;
    @include flex();

    .icon {
      width: 40px;
      height: 40px;
    }

    .comment {
      min-height: 30px;
      margin-left: 5px;
      width: calc(100% - 45px);
      word-break: break-all;
    }
  }

  .banner {
    height: 280px;
    overflow-y: scroll;
    overflow: hidden;

    > div {
      overflow: visible;
    }

    .swiper-container {
      width: 100%;
      height: 280px;

      .swiper-slide {
        transform: scale(0.9);
        transition: 300ms;
        border-radius: 5px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }

      .swiper-slide-active {
        box-shadow: 0px 0px 10px #aeaeaf;
      }

      /* .swiper-wrapper{
                    transform: translate3d(-423px, 0px, 0px);
                } */
      .swiper-slide-active {
        transform: scale(1);
        /* width:80% !important ; */
      }

      .swiper-pagination-bullet {
        opacity: 0.5;
        background: #fff;
      }

      .swiper-pagination-bullet-active {
        opacity: 1;
        background: #fff;
      }
    }
  }

  .notice {
    padding-left: 18px;
    height: 30px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eef7faff;

    .van-icon {
      width: 16px;
    }

    .van-icon-volume {
      color: $color;
      margin-right: 5px;
      font-size: 24px;
      width: 24px;
    }

    .van-icon-arrow {
      color: #828991;
    }

    .van-swipe {
      color: #465264;
      text-align: left;
      flex: 1;
      font-size: 12px;

      .list {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .more {
      color: #a3a9b2;
      font-size: 16px;
      display: inline-block;
      width: 10px;
      padding: 10px 18px 10px 20px;
    }
  }

  .home-info {
    ul.data {
      display: flex;
      padding: 10px;
      justify-content: space-around;
      align-items: center;
      li {
        box-sizing: border-box;
        width: 30%;
        border-radius: 2.5px 2.5px 10px 10px;
        box-shadow: 1px 1px 4px #d5dcebff;
        padding: 19px 0;
        height: 110px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        .info-t {
          font-size: 15px;
          color: #333333;
          text-align: center;
          font-weight: 600;

          span {
            color: #666;
            font-size: 13px;
          }
        }

        .info-m {
          font-size: 14px;
          text-align: center;
          margin: 4px 0 0px;
          font-weight: 600;
          @include flex();

          .pointer {
            width: 7px;
            height: 13px;
            margin-left: 3px;
          }

          .up {
            transform: translateY(-3px);
          }

          .down {
            transform: translateY(3px);
          }
        }

        .rise {
          color: #26a69a;
        }

        .fall {
          color: #ef5350;
        }

        .unset {
          color: #999 !important;
        }

        .info-b {
          text-align: center;
          font-size: 11px;
          padding: 5px 0 0 0;
          font-weight: 600;
          height: 14px;
        }
      }

      // li:last-child {
      //     border: none
      // }
    }

    div.icon {
      background: #f9f9f9;
      padding: 5px 0;
    }

    ul.icon {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #fff;
      padding: 15px 0;

      li {
        width: 25%;
        @include flex(column);

        img {
          margin-bottom: 15px;
        }

        svg {
          margin: 7px 0;
        }

        .text {
          width: 100%;
          font-size: 13px;
          color: #14325e;
          text-align: center;
          margin-top: -7px;
        }
      }
    }
  }

  .activityBox {
    background: #f9f9f9;
    margin-bottom: 15px;
    .van-swipe {
      height: 116px;
      padding-bottom: 25px;
      background: #fff;
      .van-swipe-item {
        display: flex;
        justify-content: center;
      }
      .van-swipe__indicators {
        .van-swipe__indicator {
          border-radius: 8px;
          width: 14px;
          background: #dcdcdeff;
        }
        .van-swipe__indicator--active {
          width: 20px;
          background: #2c76e4ff !important;
        }
      }
    }

    .activeimg {
      background: #fff;
      padding-bottom: 12px;

      img {
        width: 134px;
        height: 40px;
      }

      span {
        border-radius: 4px;
        font-size: 14px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
        font-weight: 600;
      }

      div {
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cash,
      .registed {
        margin-bottom: 12px;

        span {
          background: #ffeaa9;
          color: #923809;
        }
      }

      .invite {
        span {
          background: #d0e8ff;
          color: #133c6f;
        }
      }
    }
  }

  .activity,
  .trading {
    background: #fff;
    padding: 15px 18px;
    height: 20px;
    line-height: 20px;
    color: #144da4;
    font-weight: 600;
    font-size: 15px;

    span {
      text-indent: 0.4em;
      color: #333333;
      position: relative;
      padding-left: 10px;

      &:after {
        position: absolute;
        content: "";
        background: #2c76e4ff;
        top: 2px;
        bottom: 2px;
        left: 0;
        width: 3px;
        border-radius: 10px;
      }
    }
  }

  .comment {
    width: 100%;
    margin: 0 auto;
    @include flex(column, flex-start);

    li {
      background: #fff;
      width: calc(100% - 36px);
      padding: 12px 18px;
      padding-bottom: 8px;
      border-bottom: 5px solid $bg-color;
      @include flex(column, flex-start);

      .icon {
        width: 100%;
        height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;

        .user-name {
          height: 40px;
          line-height: 40px;
          color: #333333;
          font-size: 14px;
          font-weight: 600;
          text-indent: 0.5em;
        }

        .img-wrap {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          overflow: hidden;
        }

        > img {
          width: 100%;
        }
      }

      .main {
        margin-top: 8px;
        width: calc(100%);
        flex: 1;

        .text {
          color: #333;
          font-size: 14px;
        }

        .vertical {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2; //规定几行显示省略号
          -webkit-box-orient: vertical;
        }

        > img {
          border-radius: 4px;
        }

        img {
          max-width: 100%;
          margin-top: 5px;
        }

        .data-text {
          font-size: 13px;
          padding: 5px 3px;
          font-weight: 600;
          @include flex(row, center, flex-start);

          .text-icon {
            color: #fff;
            margin-left: 10px;
            border-radius: 8px;
            width: 33px;
            height: 22px;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .riseBg {
            background: #00cb77;
          }

          .fallBg {
            background: #ff392a;
          }

          span {
            margin-left: 10px;
          }
        }

        .rise {
          color: #00cb77;
        }

        .fall {
          color: #ff392a;
        }

        .unset {
          color: #999 !important;
        }

        .date {
          color: #333;
          font-size: 12px;
          position: relative;

          .more {
            display: inline-block;
            height: 17px;
            line-height: 17px;
            text-align: left;
            border-radius: 3px;
            color: $color;
            position: absolute;
            right: 0;
            bottom: 0;
            padding-left: 5px;
          }
        }
      }
    }
  }
}
</style>
