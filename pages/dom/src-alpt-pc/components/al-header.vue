<template>
  <header class="al-header-wrap">
    <div class="header pc">
      <div class="logo">
        <img class="logo" src="/img/logo.png" alt />
      </div>
      <ul class="menu">
        <li
          v-for="(item, key) in $root.$t('home.menu')"
          :key="key"
          :class="{active: active === key}"
          @click="changeMenu(key,item)"
        >
          <span>{{item.name}}</span>
        </li>
        <!-- <li class="dow">
          <span>{{$t('home.download')}}</span>
          <div class="dow_box">
            <div class="jaintou"></div>
            <div class="dow_list">
              <div class="dow_title">
                AlphaWallet
                <div class="code_box">
                  <div class="jaintou"></div>
                  <div class="code">
                    <img src="/img/alphawallet.png" alt />
                  </div>
                </div>
              </div>
              <div class="dow_title">
                AlphaPay
                <div class="code_box">
                  <div class="jaintou"></div>
                  <div class="code">
                    <img src="/img/alphapay.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> -->
        <li @click="openWhiteBook">
          <span>{{$t('home.header_title')}}</span>
        </li>
        <!-- 中英文切换按钮 -->
        <li class="qiehuan"> 
          <span @click="changeLocal('cn')" v-show="this.language === false"><img src="/img/cn.png" alt=""></span>
          <span @click="changeLocal('en')"  v-show="this.language === true"><img src="/img/en.png" alt=""></span>
          <!-- <div class="title"><span>{{this.language}}</span><i class="iconfont icon-jiantou up"></i></div>
          <div class="dow_box">
            <div class="jaintou"></div>
            <div class="dow_list">
              <div class="dow_title" @click="changeLocal('cn')">
                {{$t('home.ch')}}
              </div>
              <div class="dow_title" @click="changeLocal('en')">
               {{$t('home.en')}}
              </div>
            </div>
          </div> -->
        </li>
        <li ref="underLine" class="under-line"></li>
      </ul>
    </div>
    <!-- h5 头部 -->
    <div class="mobile">
      <img class="logo" src="/img/logo.png" alt />
      <ul class="tab" @click.stop="showMenu=!showMenu">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <transition name="header-slide-fade">
        <ul v-if="showMenu" class="menu-list">
          <li
            v-for="(item, key) in $root.$t('home.menu')"
            :key="key"
            :class="{h5Active: h5Active === key}"
            @click.stop="routerPush(item.path,key)"
          >{{item.name}}</li>
          <li  @click="openWhiteBook">
            <h4>{{$t('home.header_title')}}</h4>
          </li>
          <li class="dow">
            <h4>{{$t('home.download')}}</h4>
            <h5 @click="handleDowAlphaWallet">AlphaWallet</h5>
            <h5 @click="handleDowAlphaPay">AlphaPay</h5>
          </li>
          <li @click="changeLocal('cn')" v-show="this.language == false">
            <i>
            <img src="/img/cn.png" alt="">
            </i>
          </li>
          <li @click="changeLocal('en')" v-show="this.language == true">
            <i>
             <img src="/img/en.png" alt="">
            </i>
          </li>
        </ul>
      </transition>
      <div class="shade" v-if="showMenu" @click.stop="showMenu=!showMenu"></div>
    </div>
  </header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { log } from "three";

@Component
export default class Template extends Vue {
  protected active: number | null = null;
  protected h5Active: number = 0;
  protected showMenu: boolean = false;
  protected menu: any = this.$root.$t('home.menu')
  protected timmer: any = null;
  protected translateX: number = 0;

  protected openWhiteBook() {
    // window.open('/pdf/alpt.pdf')
    ( this as any ).$i18n.locale === 'cn' ? window.open('/pdf/alpt.pdf') : window.open('/pdf/EnAlpt.pdf')
  }
  protected handleDowAlphaWallet() {
    window.open('https://walletapp.alpex.io/#/download')
  }
  protected handleDowAlphaPay() {
    window.open('https://walletapp.alpex.io/#/iosGoExDown')
  }
  protected routerPush(path: string, key: any) {
    if (this.$route.fullPath === path) {
      return;
    }
    this.h5Active = key;
    this.$router.push(path);
    this.showMenu = false;
  }
  protected calUnderLine() {
    if (this.active === null) {
      return;
    }
    const activeEl: any = this.$el.querySelectorAll("li")[this.active];
    const react = activeEl.getClientRects();
    if (!react) {
      return;
    }
    const $el = (this as any).$refs.underLine;
    const desc = react[0].left - this.translateX;
    $el.style.width = react[0].width + "px";
    if (window.screen.width > 500) {
      $el.style.transform = `translateX(${desc - 19}px)`;
    } else {
      $el.style.transform = `translateX(${desc - 9}px)`;
    }
    $el.style.display = "block";
  }
  protected changeMenu(key: number, item: any) {
    this.active = key;
    clearTimeout(this.timmer);
    this.timmer = setTimeout(() => {
      this.calUnderLine();
    }, 100);
    if (this.$route.fullPath === this.menu[key].path) {
      return;
    }
    this.$router.push(this.menu[key].path);
  }
  protected mounted() {
    let timmer: any = null;
    this.$util.bindEvent(window, "resize", () => {
      clearTimeout(timmer);
      timmer = setTimeout(() => {
        this.calUnderLine();
      }, 10);
    });
    const dom: HTMLElement|null = this.$el.querySelector('.header.pc')
    this.$util.bindEvent(window, 'scroll', (e) => {
      const scrollWidth: number = document.documentElement.scrollWidth;
      const offsetWidth: number = (document as any).scrollingElement.offsetWidth;
      this.translateX = -(document as any).scrollingElement.scrollLeft;
      if (scrollWidth > offsetWidth && dom) {
        dom.style.transform = `translateX(${this.translateX}px)`;
      } else if (dom) {
        this.translateX = 0;
        dom.style.transform = '';
      }
    });
    setTimeout(() => {
      for (const i in this.menu) {
        if (this.menu[i].path === this.$route.fullPath) {
          this.active = +i;
          this.h5Active = +i;
          break;
        }
      }
      this.calUnderLine();
    }, 300);
  }
  // 中英文切换
  public get language(): boolean {
    return ( this as any ).$i18n.locale === 'cn' ? true : false;
  }
  public changeLocal( locale: string ): void {
    
    ( this as any ).$util.locale(locale);
    ( this as any ).$i18n.locale = locale
    setTimeout(() => {
      this.calUnderLine();
    }, 0);
    document.title = ( this as any ).$i18n.locale === 'cn' ? 'Alpha生态官网' : 'Alpha ecological official website';
    
  }

}
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.al-header-wrap {
  .mobile {
    display: none;
  }
  height: 70px;
  width: 100%;
  z-index: 100;
  background: #18183d;
  position: fixed;
  left: 0;
  top: 0;
  min-width: 1200px;
  @include flex();
  .menu {
    width: calc(100% - 300px);
    height: 100%;
    @include flex();
    color: #0c768d;
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    user-select: none;
    // 中英文切换
    .qiehuan{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      .title{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        .dow_box {
          display: block;
        }
        .up{
        transform: rotate(180deg);
        }
      }
      .up{
        display:inline-block;
        transition: .2s all;
        }
      .dow_box {
        display: none;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50px;
        left: -20px;
        width: 120px;
        .jaintou {
          width: 0;
          height: 0;
          margin: 0 auto;
          border-width: 0 10px 10px;
          border-style: solid;
          border-color: transparent transparent #fff;
        }
        .dow_list {
          box-sizing: border-box;
          background: #fff;
          border-radius: 5px;
          .dow_title {
            &:hover {
              background: #F1F1FF;
              border-radius: 5px;
              
            }
            padding: 10px 0;
            font-size: 12px;
          }
        }
      }
    }
    .dow {
      position: relative;
      &:hover {
        .dow_box {
          display: block;
        }
      }
      .dow_box {
        display: none;
        width: 100%;
        text-align: center;
        position: absolute;
        left: -20px;
        top: 50px;
        width: 120px;

        .jaintou {
          width: 0;
          height: 0;
          margin: 0 auto;
          border-width: 0 10px 10px;
          border-style: solid;
          border-color: transparent transparent #fff;
        }
        .dow_list {
          box-sizing: border-box;
          background: #fff;
          border-radius: 5px;
          .dow_title {
            &:hover {
              background: #F1F1FF;
              border-radius: 5px;
              &:hover {
                .code_box {
                  display: block;
                }
              }
            }
            padding: 10px 0;
            font-size: 12px;
            position: relative;
            .code_box {
              display: none;
              position: absolute;
              right: -83px;
              top: 0;
              width: 70px;
              height: 70px;
              background: #fff;
              border-radius: 2px;
              .jaintou {
                position: absolute;
                top: 10px;
                left: -19px;
                width: 0;
                height: 0;
                border: 10px solid;
                border-color: transparent #fff transparent transparent;
              }
              .code {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding: 4px;
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
    li {
      margin: 0 20px;
      padding: 18px 0;
      @include transition(0.4s);
      cursor: pointer;
      &:hover {
        color: rgb(125, 221, 243);
        .dow_box {
          color: #000;
        }
      }
    }
    .under-line {
      position: absolute;
      width: 20px;
      height: 4px;
      background: #29d2f6;
      margin-top: 30px;
      left: 0;
      display: none;
      padding: 0;
    }
    .active {
      color: #29d2f6;
      transform: translateY(-2px) scale(1.06);
    }
  }
  .header {
    max-width: 1160px;
    width: 100%;
    padding: 0 20px;
    height: 100%;
    @include flex();
    .logo {
      width: 300px;
      img {
        width: 140px;
        height: 40px;
      }
    }
  }
}
.header-slide-fade-enter-active {
  transition: all 0.3s ease;
}
.header-slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.14, 0.5, 0.8, 1);
}
.header-slide-fade-enter,
.header-slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
