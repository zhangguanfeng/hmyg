<template>
  <div class="al-home-wrap">
    <Swiper/>
    <AboutUs id="aboutUs" ref="aboutUs" />
    <RunCircle id="runCircle" ref="runCircle" />
    <Develop id="develop"  ref="develop"/>
    <Apply id="apply" ref="apply" />
    <Serve />
    
    <News id="news" ref="news"/>
    <Partner id="partner" ref="partner" />
    <AlBackground id="background" :color="0x30F1FF" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AboutUs from './about-us.vue';
import Swiper from './swiper.vue';
import RunCircle from './run-circle.vue';
import Develop from './develop.vue';
import Apply from './apply.vue';
import Partner from './partner.vue';
import News from './news.vue';
import Serve from './serve.vue';
import AlBackground from '@/components/al-background.vue';

@Component({ components: { Swiper, AboutUs, RunCircle, Develop, Apply, Serve, Partner, News, AlBackground} })
export default class Home extends Vue {
  // protected checkIds: string[] = ['runCircle', 'develop', 'apply', 'news'];
  protected readonly checkedIds: {id: string, limit: number}[] = [
    {
      id: 'aboutUs',
      limit: 100,
    },
    {
      id: 'runCircle',
      limit: 400,
    }, {
      id: 'develop',
      limit: 200,
    }, {
      id: 'apply',
      limit: 200,
    }, {
      id: 'news',
      limit: 200,
    }, {
      id: 'partner',
      limit: 200,
    },
  ];
  protected windowResizeHandle() {
    let timmer: any = null;
    timmer = setTimeout(() => {
      clearTimeout(timmer);
      const vm = this as any;
      const scrollToped: number = (document as any).scrollingElement.scrollTop;
      for (const i in this.checkedIds) {
        const v = this.checkedIds[i];
        const react = vm.$refs[v.id].$el.getClientRects();
        if (!react || !react.length) {
          continue;
        }
        if (document.body.clientHeight - react[0].top >= v.limit) {
          vm.$refs[v.id].animation && vm.$refs[v.id].animation();
        }
      }
    });
  }
  protected mounted() {
    this.$util.bindEvent(window, 'scroll', this.windowResizeHandle);
    this.windowResizeHandle();
  }
  protected beforeDestroy() {
    this.$util.unBindEvent(window, 'scroll', this.windowResizeHandle);
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  #background {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #0E0E32;
  z-index: -1;
}

  .al-home-wrap {
    width: 100%;
    min-height: 1300px;
    .serve{
      
    }
  }
</style>
