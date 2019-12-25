<!--
 * @Author: 冠锋
 * @Date: 2019-12-20 16:35:47
 * @LastEditTime : 2019-12-23 09:53:28
 * @LastEditors  : Please set LastEditors
 * @Description: 未登录登录展示的新页面
 * @FilePath: \mt4-h5\src\views\user\trading.vue
 -->
<template>
  <div class="trading">
    <div class="banner" style=" height: 152px;">
      <van-swipe :autoplay="3000" style="   width: 100%; height: calc(100%)" indicator-color="white">
        <van-swipe-item style="width: 100%; height: 152px;">
          <h-img width="100%" height="100%" src="/img/user/login_banner.png" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="conter">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <img :src="`/img/user/trading_icon${item.id}.png`" alt style="width: 40px; height: 40px;" />
          <div class="right">
            <h4>{{item.title}}</h4>
            <p>{{item.text}}</p>
          </div>
        </li>
      </ul>
      <div class="but" @click="handleToRegistered">立即注册</div>
      <div class="login">
        已有账号,
        <span @click="handleToLogin">去登录</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Trading extends Vue {
  protected listData: any = [
    { id: 1, title: "T+0交易", text: "当日即买即卖" },
    { id: 2, title: "双向交易", text: "买涨买跌都赚钱" },
    { id: 3, title: "保证金交易", text: "小资金撬动财富" },
    { id: 4, title: "资金安全", text: "FCA&IFSC两大监管" }
  ];
  // 跳转到注册页面
  protected handleToRegistered() {
    const obj = {
      name: "registed",
      path: "registed",
      query:{isClose:'true'}
    };
    window.openWebView(obj);
  }
  // 跳转到登录页面
  protected handleToLogin() {
    const obj = {
      name: "login",
      path: "login"
    };
    window.openWebView(obj);
  }
  protected activated() {
    document.title = '交易'
  }
}
</script>
<style lang="scss" >
.trading {
  h4,
  p {
    padding: 0;
    margin: 0;
    font-weight: 400;
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
  .conter {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
     ul {
      margin-top: 25px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        .right {
          margin-left: 13px;
          h4 {
            font-weight: 600;
            font-size: 17px;
          }
          p {
            font-size: 14px;
            color: #666666ff;
          }
        }
      }
    }
    .but {
      width: 300px;
      height: 42px;
      margin-top: 20px;
      font-size: 14px;
      background: #0064ffff;
      color: #fff;
      text-align: center;
      line-height: 42px;
      border-radius: 25px;
    }
    .login {
      padding-top: 10px;
      font-size: 14px;
      color: #666666ff;
      span {
        color: #0064ffff;
      }
    }
  }
  @media (min-height: 400px) and (max-height: 520px) {
    .conter {
       ul {
         li {
           margin-bottom: 10px;
         }
      }
    }
  }

  @media (min-height: 521px) and (max-height: 580px) {
    .conter {
       ul {
        li {
          margin-bottom: 13px;
        }
      }
    }
  }
}
</style>
