<template>
  <header class="b-header-wrap">
    <div class="logo" :style="{width: $store.state.collapse ? '80px' : '189px'}">
      <img width="40px" v-show="$store.state.collapse" src="/image/logo.png" alt="">
      <img width="120px" v-show="!$store.state.collapse" :src="`/image/logo-text.png`" alt="">
    </div>
    <span class="title">
      {{$store.state.appName}}
    </span>
    <div class="position">
      {{position}}
    </div>
    <div class="right">
      <BFullscreen />
      <div class="username">
        欢迎观临&nbsp;{{$store.state.userInfo && $store.state.userInfo.user_name}}
      </div>
      |
      <div class="exit" @click="exit">
        <img src="/image/exit.png" alt="">
        退出
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BFullscreen from '@/components/b-fullscreen.vue';

@Component({ components: {  BFullscreen } })
export default class BHeader extends Vue {
  protected get position(): string {
    let { options: { routes } }: any = this.$router;
    const { fullPath }: any = this.$route;
    if (fullPath === '/') {
      for (const v of routes) {
        if (v.path === fullPath) {
          return v.menu;
        }
      }
    }
    const sp: string[] = fullPath.split(/\//).filter((el: string) => el);
    const match: any = [];
    while(sp.length) {
      const path = sp.shift();
      for (const v of routes) {
        if (v.path.replace(/^\//, '') === path) {
          match.push(v.menu);
          routes = v.children && v.children.length && v.children || [];
          break;
        }
      }
    }
    return match.join(' > ');
  }
  protected exit() {
    this.$router.replace('/login');
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .b-header-wrap {
    width: 100%;
    height: 50px;
    line-height: 40px;
    box-shadow: 0px 0px 5px #C2C2C2;
    display: flex;
    align-items: center;
    background: #373D41;
    color: #fff;
    .right {
      flex: 1;
      padding: 0 30px;
      @include flex(row, flex-end);
      .username {
        padding: 0 10px 0 0;
      }
      .exit {
        padding: 0 0 0 10px;
        @include flex();
        user-select: none;
        cursor: pointer;
        img {
          width: 20px;
        }
      }
    }
    .logo {
      height: 100%;
      @include flex(row);
      @include transition();
    }
    .position {
      font-size: 13px;
      color: #eee;
      padding: 0 20px;
    }
    // background: linear-gradient(to right, #0178bc 0%, #00bdda 100%);
    .title {
      @include flex();
      font-size: 18px;
      font-weight: 600;
      color: $font-color;
      user-select: none;
      color: #fff;
      background: #2F363B;
      padding: 0 20px 0 20px;
    }
  }
</style>