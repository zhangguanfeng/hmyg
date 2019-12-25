<template>
  <div class="alpt">
    <!-- 遮罩层 -->
    <div :class="{'zhezhao':Active}" @touchmove.prevent @mousewheel.prevent></div>
    <div class="banner">
      <div class="title">
        <div class="logo">
          <img src="/img/bigLogo.png" alt />
        </div>
        <h3>{{$t('alpt.banner_name')}}</h3>
      </div>
      <div class="text">
        <p>{{$t('alpt.banner_text')}}</p>
      </div>
      <ul class="box">
        <li v-for="(item,index) in $root.$t('alpt.banner_list')" :key="index">
          <h4>{{item.title}}</h4>
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <div class="con w">
      <div class="run">
        <h4>{{$t('alpt.run_title')}}</h4>
        <p>{{$t('alpt.run_text')}}</p>
        <!-- 持牌经营 -->
        <ul class="box">
          <li>{{$t('alpt.run_list')}}</li>
          <li>{{$t('alpt.run_list1')}}</li>
          <li>{{$t('alpt.run_list2')}}</li>
          <li>
            <img
              src="/img/alpt_paiD.png"
              alt
              :class="{'active':Active}"
              @click="handleBigImg"
              @touchmove.prevent
              @mousewheel.prevent
            />
          </li>
        </ul>
      </div>
      <div class="alptForm cn">
        <h4>{{$t('alpt.alptForm_title')}}</h4>
        <div class="img_list">
          <span>
            <img src="/img/alpt_con_bgs1.png" alt />
          </span>
          <span>
            <img src="/img/alpt_con_bgs2.png" alt />
          </span>
        </div>
        <div class="img_list">
          <span>
            <img src="/img/alpt_con_bgs3.png" alt />
          </span>
          <span>
            <img src="/img/alpt_con_bgs4.png" alt />
          </span>
          <span class="end">
            <img src="/img/alpt_con_bgs5.png" alt />
          </span>
        </div>
      </div>
      <div class="alptForm en">
        <h4>{{$t('alpt.alptForm_title')}}</h4>
        <div class="img_list">
          <span>
            <img src="/img/en_alpt_con_bgs1.png" alt />
          </span>
          <span>
            <img src="/img/en_alpt_con_bgs2.png" alt />
          </span>
        </div>
        <div class="img_list">
          <span>
            <img src="/img/en_alpt_con_bgs3.png" alt />
          </span>
          <span>
            <img src="/img/en_alpt_con_bgs4.png" alt />
          </span>
          <span class="end">
            <img src="/img/en_alpt_con_bgs5.png" alt />
          </span>
        </div>
      </div>
      <div class="alptValue">
        <div class="box">
          <h4>{{$t('alpt.alptValue_name')}}</h4>
          <div class="text">
            <h5>{{$t('alpt.alptValue_title')}}</h5>
            <p>{{$t('alpt.alptValue_text')}}</p>
          </div>
          <div class="text">
            <h5>{{$t('alpt.alptValue_title1')}}</h5>
            <p>{{$t('alpt.alptValue_text1')}}</p>
          </div>
        </div>
        <div class="box">
          <h4>{{$t('alpt.alptValue_name1')}}</h4>
          <div class="text">
            <p>{{$t('alpt.alptValue_text2')}}</p>
          </div>
        </div>
        <ul class="box2">
          <li v-for="(item,index) in $root.$t('alpt.fund_data')" :key="index">
            <h5>{{item.title}}</h5>
            <div class="fund_desc">
              <p class="text" v-for="(item2,index2) in item.text_list" :key="index2">{{item2.text}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Alpt extends Vue {
  protected done: boolean = false;
  protected Active: boolean = false;
  protected handleBigImg() {
    this.Active = !this.Active;
    // this.Active ?  document.body.style.overflow='hidden' :   document.body.style.overflow='';
  }
  protected animation() {
    if (this.done) {
      return;
    }
    this.done = true;
    const vm = this as any;
    vm.$refs.name.className = vm.$refs.name.className + " slide-up";
    setTimeout(() => {
      const tip: HTMLElement = (this as any).$refs.tip;
      tip.className = tip.className + " tip-animation";
    }, 400);
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.alpt {
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .zhezhao {
    position: fixed;
    height: 100vh;
    width: 100%;
    background: #000;
    opacity: 0.8;
    z-index: 33;
  }
  .banner {
    box-sizing: border-box;
    width: 100%;
    height: 1010px;
    background: url("/banner/alpt_ban.png");
    background-size: 100% 100%;
    display: flex;
    padding-top: 250px;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .logo {
        width: 194px;
        height: 152px;
        margin-bottom: 10px;
      }
      h3 {
        font-weight: 500;
        font-size: 60px;
        color: #56daff;
        padding-bottom: 40px;
      }
    }
    .text {
      width: 100%;
      background: rgba($color: #10aae4, $alpha: 0.05);
      padding: 35px 0;
      p {
        margin: 0% auto;
        text-align: center;
        font-size: 26px;
        color: #56daff;
        width: 1010px;
        opacity: 0.8;
      }
    }
    ul {
      width: 1010px;
      padding: 50px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        width: 198px;
        height: 196px;
        background: url("/img/alpt_banner_bg.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        @include transition(0.6s);
        &:hover {
          transform: scale(1.1);
        }
        h4 {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(162, 232, 255, 1);
          line-height: 33px;
        }
        p {
          font-size: 14px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(86, 218, 255, 1);
          line-height: 22px;
        }
      }
    }
  }
  .con {
    .en{
      display: none;
    }
    .run {
      box-sizing: border-box;
      width: 100%;
      padding: 110px 100px 150px;
      text-align: center;
      h4 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(79, 199, 235, 1);
        line-height: 45px;
        margin-bottom: 43px;
      }
      p {
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(79, 199, 235, 1);
        line-height: 25px;
      }
      // 持牌经营
      ul {
        position: relative;
        display: flex;
        justify-content: center;
        height: 440px;
        margin-top: 80px;
        margin-right: 180px;
        li {
          width: 206px;
          height: 206px;
          line-height: 206px;
          background: url("/img/alpt_con_bg.png");
          background-size: 100% 100%;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(162, 232, 255, 1);
          &:nth-child(2) {
            position: absolute;
            top: 115px;
            left: 192px;
          }
          &:nth-child(3) {
            position: absolute;
            top: 230px;
          }
          &:nth-child(4) {
            position: absolute;
            top: 35px;
            right: 30px;
            width: 369px;
            height: 369px;
            display: flex;
            justify-content: center;
            align-items: center;

            .active {
              position: fixed;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(0.8);
              z-index: 100;
            }
            img {
              // transform: scale(1);
              transition: all ease 0.5s;
              width: 32%;
            }
          }
        }
      }
    }
    .alptForm {
      h4 {
        @include title();
        margin-bottom: 70px;
      }
      .img_list {
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(3) {
          margin-top: -50px;
        }
        .end {
          margin-left: -12px;
        }
        span {
          @include transition(0.6s);
          &:hover {
            transform: scale(1.05);
          }
          &:nth-child(odd) {
            margin-right: -12px;
          }

          display: inline-block;
          width: 260px;
          height: 260px;
        }
      }
    }
    .alptValue {
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h4 {
          @include title();
          padding: 150px 0 87px 0;
        }
        .text {
          width: 1000px;
          background: #101040;
          border-radius: 10px;
          padding: 42px 80px;
          margin-bottom: 40px;
          h5 {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(79, 199, 235, 1);
            text-align: center;
            margin-bottom: 25px;
          }
          p {
            font-size: 18px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: rgba(79, 199, 235, 1);
            line-height: 25px;
          }
        }
      }
      ul {
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 50px 100px 130px;
        li {
          width: 226px;
          h5 {
            font-size: 26px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(79, 199, 235, 1);
            text-align: center;
            margin-bottom: 18px;
          }
          .fund_desc {
            width: 100%;
            height: 292px;
            margin: 0 auto;
            background: url("/img/alpt_con_bg3.png");
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            @include transition(0.6s);
            &:hover {
              transform: scale(1.05);
            }
            p {
              width: 90%;
              font-size: 18px;
              color: rgba(79, 199, 235, 1);
              line-height: 35px;
              text-align: center
            }
          }
        }
      }
    }
  }
}
</style>