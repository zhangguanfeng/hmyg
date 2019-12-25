<!--
 * @Author: your name
 * @Date: 2019-12-15 11:49:29
 * @LastEditTime : 2019-12-19 17:40:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wallet-app-h5\src\App.vue
 -->
<template>
  <div id="app">
    <transition name="slide-fade">
      <keep-alive :exclude="/NotAlive$/">
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Group,
    Cell,
    Swiper,
    SwiperItem,
    XHeader,
    LoadMore,
    Scroller,
    XInput,
    Popup,
    Checklist,
    XButton,
    XDialog,
    ToastPlugin,
    ConfirmPlugin,
    CheckIcon ,
    Countup
  } from 'vux';

  const vuxComponents = [Group, Cell, Swiper, SwiperItem, XHeader, LoadMore, Countup, Scroller, CheckIcon, XInput, Popup, Checklist, XButton, XDialog ];

  Vue.use(ToastPlugin);
  Vue.use(ConfirmPlugin);

  Vue.filter('empytValue', function (value) {
    if (!value) return ''
  })

  vuxComponents.forEach((comp) => {
    Vue.component(comp.name, comp);
  });

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~@/styles/index.less';

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  h1,h2,h3,h4,h5,p{
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  img{
    width: 100%;
  }
  .slide-fade-enter {
    transform: translateY(10px);
    opacity: 0;
  }

  ul,ol,li {
    list-style: none;
  }
  s,i,em,b {
  font-style: normal;
  text-decoration: none;
  font-weight: normal;
}
*{
    box-sizing: border-box;
}
</style>
