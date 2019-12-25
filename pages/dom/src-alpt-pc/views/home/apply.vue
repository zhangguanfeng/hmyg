<template>
  <div class="apply-wrap">
    <div ref="name" class="name">{{$t('home.apply_name')}}</div>
    <ul ref="list">
      <li v-for="(item, key) in $root.$t('home.apply_data')" :key="key">
        <div class="wrap">
          <div class="header-line" :style="{background: item.bg}"></div>
          <div
            class="bg"
            :style="{color: item.color, background: `url('/img/apply-bg-${key}.png')`}"
          >
            <div class="title">{{item.title}}</div>
            <div class="title-en">{{item.titleEn}}</div>
            <div class="more" :style="{borderColor: item.color}">{{$t('home.apply_more')}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Apply extends Vue {
  protected done: boolean = false;
  protected animation() {
    if (this.done) {
      return;
    }
    this.done = true;
    const vm = this as any;
    vm.$refs.name.className = vm.$refs.name.className + " slide-up";
    const lis = (this as any).$refs.list.querySelectorAll("li");
    setTimeout(() => {
      Array.prototype.slice
        .call(lis)
        .forEach((el: HTMLElement, idx: number) => {
          setTimeout(() => {
            el.style.transform = "translateY(0px)";
            el.style.opacity = "1";
          }, idx * 200);
        });
    }, 400);
  }
}
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.apply-wrap {
  width: 100%;
  height: 400px;
  padding: 50px 0;
  > ul {
    padding: 0 40px;
    height: 200px;
    max-width: 1100px;
    margin: 0 auto;
    @include flex();
    > li {
      width: calc(20% - 20px);
      height: 160px;
      margin-right: 20px;
      transform: translateY(70px);
      @include transition(1200ms);
      opacity: 0;
      cursor: pointer;
      .wrap {
        @include flex(column);
        @include wh();
        @include transition(300ms);
        &:hover {
          // transform: translateY(-10px);
          transform: translateY(-8px) scale(1.1);
        }
      }
      .header-line {
        width: 80%;
        height: 10px;
        background: linear-gradient(
          to right rgba(15, 98, 153, 1) 0%,
          rgba(66, 209, 238, 1) 100%
        );
        border-radius: 4px 4px 0 0;
      }
      .bg {
        width: 100%;
        height: 100%;
        background: url("/img/apply-bg-0.png");
        @include flex(column);
        color: rgba(79, 199, 235, 1);
        font-family: PingFang-SC-Medium, PingFang-SC;
        .title {
          font-size: 28px;
        }
        .title-en {
          font-size: 15px;
          opacity: 0.7;
        }
        .more {
          margin-top: 16px;
          font-size: 14px;
          padding: 3px 10px;
          border-radius: 5px;
          border: 1px solid rgba(79, 199, 235, 1);
        }
      }
    }
    > li:last-child {
      margin-right: 0;
    }
  }
  .name {
    font-size: 32px;
    font-weight: 600;
    font-family: PingFangSC-Medium, PingFang SC;
    width: 100%;
    color: rgba(79, 199, 235, 1);
    text-align: center;
    padding: 50px 0;
    opacity: 0;
  }
  .slide-up {
    animation: bounceInUps;
    animation-fill-mode: forwards;
    animation-duration: 1000ms;
    opacity: 1;
  }
}
</style>
