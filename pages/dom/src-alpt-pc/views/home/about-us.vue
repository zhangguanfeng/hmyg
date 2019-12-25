<template>
  <div class="about-us-wrap">
    <div ref="name" class="about-us">{{$t('home.aboutUs.title')}}</div>
    <div ref="tip" class="about-tip">{{$t('home.aboutUs.content')}}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AboutUs extends Vue {
  protected done: boolean = false;
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
<style lang="scss">
@import "@/style/mixin.scss";
.about-us-wrap {
  margin-top: 80px;
  width: 100%;
  .about-us {
    color: #4fc7eb;
    font-size: 32px;
    width: 100%;
    text-align: center;
    padding: 60px 0 20px 0;
    font-weight: 600;
    // opacity: 0;
  }
  // .slide-up {
  //   animation: bounceInUps;
  //   animation-fill-mode: forwards;
  //   animation-duration: 1500ms;
  //   opacity: 1;
  // }
  .about-tip {
    color: #4fc7eb;
    font-size: 18px;
    width: 800px;
    text-align: center;
    margin: 0 auto;
    // opacity: 0;
    // transform: scale(0);
  }
  .tip-animation {
    animation-name: tip-scale;
    animation-duration: 800ms;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}
// @keyframes tip-scale {
//   0% {
//     opacity: 0;
//     transform: scale(0);
//   }
//   80% {
//     opacity: 1;
//     transform: scale(1.1);
//   }
//   100% {
//     opacity: 1;
//     transform: scale(1);
//   }
// }
</style>