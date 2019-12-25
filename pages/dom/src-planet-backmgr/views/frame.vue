<template>
  <div class="frame-wrap">
    <BHeader />
    <div class="body-main-wrap">
      <BMenu :menu="menu" />
      <div class="body-main" :style="{width: `calc(100% - ${$store.state.collapse ? 80 : 240}px)`}">
        <Home v-if="$route.fullPath == '/'" />
        <Proxy v-else-if="$route.fullPath == '/proxy'" />
        <template v-else>
          <transition name="router-fade-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </template>
      </div>
    </div>
    <BSingleViewer />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import BHeader from '@/components/b-header.vue';
import BMenu from '@/components/b-menu';
import Config from '@/router/config';
import BSingleViewer from '@/components/b-single-viewer.vue';
import Home from './home.vue';
import Proxy from './proxy.vue';

@Component({ components: { BHeader, BMenu, BSingleViewer, Home , Proxy} })
export default class Frame extends Vue {
  protected menu: any = Config;
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .frame-wrap {
    background: #f3f3f3;
    @include wh();
    .body-main-wrap {
      @include wh(100%, calc(100% - 50px));
      @include flex();
      overflow-x: hidden;
      overflow-y: auto;
      .body-main {
        @include wh(calc(100% - 110px), calc(100% - 20px));
        margin: 5px 10px;
        padding: 5px;
        border-radius: 2px;
        background: linear-gradient(to right, #ffffff 0%, #f6f6f6 100%);
        flex: 1;
      }
    }
    .viewer-wrap-single {
      visibility: hidden;
      position: absolute;
      left: -10000px;
      top: -1000px;
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