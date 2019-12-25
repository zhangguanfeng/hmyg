<template>
  <div class="frame-wrap">
    <div :style="{transform: `translateX(${collapse ? 0 : - .4 * width}px)`, width: width + 'px'}">
      <HSlideLeft />
      <div class="right-contain" :style="{width: width / 2 + 'px'}" @click.stop="bodyClick">
        <header>
          <ul @click.stop="collapse=!collapse">
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p class="title">
            {{position}}
          </p>
        </header>
        <div class="main-contain">
          <transition name="router-fade-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HSlideLeft from '@/components/h-slide-left.vue';

@Component({ components: { HSlideLeft } })
export default class extends Vue {
  protected get width(): number {
    return document.documentElement.offsetWidth * 2
  }
  protected get collapse(): boolean {
    return this.$store.state.collapse
  }
  protected set collapse(val: boolean) {
    this.$store.commit('updatCollapse', val);
  }
  protected get position(): string {
    return this.$store.state.title || this.$route.meta.title;
  }
  protected bodyClick() {
    if (this.collapse) {
      this.collapse = false;
    }
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .frame-wrap {
    @include wh();
    overflow: hidden;
    >div {
      @include transition();
      height: 100%;
      display: flex;
    }
    .right-contain {
      left: 80%;
      top: 0;
      width: 100%;
      background: #04052D;
      header {
        height: 50px;
        width: calc(100% - 40px);
        padding: 0 20px;
        background: #081A44;
        @include flex(row, flex-start);
        ul {
          width: 30px;
          padding: 0;
          margin: 0;
          height: 100%;
          @include flex(column, center, flex-start);
          li{
            list-style: none;
            background: #fff;
            width: 100%;
            height: 2px;
            margin-bottom: 7px;
          }
          li:nth-child(2) {
            width: 80%;
          }
          li:last-child {
            margin-bottom: 0;
          }
        }
        .title {
          color: #fff;
          font-size: 22px;
          text-align: center;
          width: calc(100% - 30px);
          transform: translateX(-15px);
        }
      }
      .main-contain {
        width: 100vw;
        height: calc(100vh - 50px);
      }
      width: 100vw;
      height: 100vh;
    }
  }
  .router-fade-in-enter-active {
    transition: all .1s ease-in;
    opacity: 0;
  }
  .router-fade-in-leave-active {
    transition: all .1s ease-in;
    opacity: 0;
  }
  .router-fade-in-enter, .router-fade-in-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
</style>