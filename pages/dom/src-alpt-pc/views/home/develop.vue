<template>
  <div class="develop-wrap">
    <div ref="name" class="name">{{$t('home.develop_name')}}</div>
    <div class="time-line" ref="timeLine">
      <ul
        v-for="(item, key) in $root.$t('home.develop')"
        :key="key"
        :style="{opacity: 1 - key * .03}"
      >
        <li>
          <div class="date-title">
            <span class="title-text">{{item.title}}</span>
          </div>
          <div :style="{height: `${item.context.length * 52}px`}" class="event-line"></div>
          <ul class="event-list">
            <li class="event-pointer"></li>
            <li class="event-pointer" v-for="(i, k) in item.context" :key="k">
              <!-- :style="{opacity: 1 - k * .07}" -->
              <div>
                <span>{{i}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Develop extends Vue {
  protected done: boolean = false;
  protected animation() {
    if (this.done) {
      return;
    }
    this.done = true;
    const vm = this as any;
    vm.$refs.name.className = vm.$refs.name.className + " slide-up";
    setTimeout(() => {
      vm.$refs.timeLine.className =
        vm.$refs.timeLine.className + " time-line-scale";
      // 显示标题
      setTimeout(() => {
        const titles = (this as any).$el.querySelectorAll(".title-text");
        Array.prototype.slice
          .call(titles)
          .forEach((el: HTMLElement, idx: number) => {
            setTimeout(() => {
              el.style.transform = "scale(1)";
              el.style.opacity = "1";
            }, idx * 300);
          });
        // 事件时间轴
        const eventsList = (this as any).$el.querySelectorAll(".event-list");
        Array.prototype.slice
          .call(eventsList)
          .forEach((pel: HTMLElement, pidx: number) => {
            const lis = pel.querySelectorAll("li");
            // 事件
            Array.prototype.slice
              .call(lis, 1)
              .forEach((cel: HTMLElement, eidx: number) => {
                setTimeout(() => {
                  cel.style.transform = "translateY(0px)";
                  cel.style.opacity = 1 - eidx * 0.07 + "";
                }, pidx * 200 + eidx * 100);
              });
          });
      }, 1000);
    }, 800);
  }
}
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.develop-wrap {
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  padding: 50px 0 50px 0;
  align-items: center;
  .time-line {
    width: 1108px;
    height: 4px;
    background: linear-gradient(
      to right,
      rgba(79, 199, 235, 1) 0%,
      rgba(79, 199, 235, 0) 100%
    );
    border-radius: 2px;
    @include flex(row, flex-start);
    opacity: 0;
    @include transition(1000ms);
    transform: scaleX(0);
    > ul {
      @include flex(row, flex-start);
      margin-top: -2px;
      width: 30%;
      .date-title {
        width: 0;
        height: 0;
        position: absolute;
        color: rgba(14, 14, 50, 1);
        margin-top: -40px;
        margin-left: -20px;
        .title-text {
          display: block;
          width: 80px;
          height: 28px;
          line-height: 28px;
          font-size: 18px;
          color: rgba(14, 14, 50, 1);
          text-align: center;
          background: rgba(64, 225, 255, 1);
          border-radius: 14px;
          transform: scale(0);
          opacity: 0.4;
          @include transition(500ms);
        }
      }
      > li {
        width: 24px;
        height: 24px;
        background: #53d6fe;
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        .event-line {
          position: absolute;
          width: 4px;
          height: 455px;
          margin-left: 10px;
          margin-top: 22px;
          background: linear-gradient(
            to bottom,
            rgba(79, 199, 235, 1) 0%,
            rgba(79, 199, 235, 0) 100%
          );
          border-radius: 2px;
        }
        > ul {
          position: absolute;
          height: 455px;
          z-index: 111;
          margin-left: 6px;
          margin-top: 6px;
          @include flex(column, flex-start);
          .event-pointer {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(83, 214, 254, 1);
            > div {
              width: 0;
              height: 0;
              display: flex;
              margin-left: 20px;
              margin-top: -5px;
              font-size: 14px;
              color: rgba(83, 214, 254, 1);
              span {
                position: absolute;
                text-indent: 0.5em;
                white-space: nowrap;
              }
            }
          }
          li:nth-child(1) {
            background: rgba(255, 255, 255, 1);
            margin-bottom: 20px;
          }
          li:nth-child(n + 2) {
            margin-top: 30px;
            opacity: 0;
            @include transition(500ms);
            transform: translateY(30px);
          }
        }
      }
    }
    ul:nth-child(1) {
      margin-left: 100px;
    }
    > ul:last-child {
      transform: scale(0.8);
      opacity: 0.6 !important;
      width: 100px;
    }
  }
  .time-line-scale {
    opacity: 1;
    transform: scaleX(1);
  }
  .name {
    text-align: center;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #4fc7eb;
    font-weight: 600;
    padding: 50px 0 100px 0;
    opacity: 0;
  }
  .slide-up {
    animation: bounceInUps;
    animation-fill-mode: forwards;
    animation-duration: 1500ms;
    opacity: 1;
  }
}
</style>
