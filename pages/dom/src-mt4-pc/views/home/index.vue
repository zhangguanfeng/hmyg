/**
*  Created by   阿紫
*  On  2019-03-04
*  Content 首页
*/

<template>
  <div class="index" @scroll="scrollHandle($event)" id="homeIndex">
    <header-home ref="headerHome"></header-home>
    <div class="mainContent">
      <transition name="el-fade-in-linear" @leave="leave">
        <keep-alive :exclude="/(NotAlive$)|trade$|newsIndex$|partner$|agent|newinfo$|userIndex$/gi">
          <router-view class="home-router-view"></router-view>
        </keep-alive>
      </transition>
    </div>
    <footer-home v-if="showFooter" ref="footer"></footer-home>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import headerHome from './header.vue';
import FooterHome from './footerHome.vue';
import { platform } from '@/common/util';

export default {
  name: 'index',
  components: {
    headerHome,
    FooterHome
  },
  props: {
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState(['isLoading']),
  },
  data() {
    return {
      platform,
      contentHeight: 0,
    };
  },
  methods: {
    scrollHandle() {
      const nbicon = document.querySelector('#nb_icon_wrap');
      if (!nbicon) {
        return;
      }
      const H = window.document.body.offsetHeight;
      nbicon.style.transition = 'none';
      nbicon.style.top = `${H - 130 - this.$el.scrollTop + this.scrollTop}px`;
      clearTimeout(this.timmer);
      this.timmer = setTimeout(() => {
        this.scrollTop = this.$el.scrollTop;
        nbicon.style.transition = 'all 500ms cubic-bezier(0.15, 0.87, 0.52, 1)';
        nbicon.style.top = `${H - 130}px`;
      }, 500);
    },
    leave() {
      this.$el.scrollTo({
        top: 0,
      });
    },
    download() {
      if (this.platform.ios) {
        window.open('https://www.ijikee.co/exchange/#/installation');
      } else {
        location.href = 'https://www.ijikee.co/packet/jikee.apk';
      }
    },
  },
};
</script>
<style lang="scss">
  .index {
    height: 100%;
    background: #f7f7f7;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }

    .mainContent {
      margin-top: 60px;
      min-height: calc(100vh - 60px - 220px);
      .home-router-view {
        width: 100%;
        min-height: calc(100vh - 60px - 220px);
      }
    }

    .bottom-download {
      display: none;
      padding: 10px 0;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      background: #4c4d5f;
      color: #fff;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        margin-left: 16px;
        margin-right: 10px;
      }

      .main {
        text-align: left;
        flex: 1;

        .title {
          font-size: 18px;
        }

        .sub {
          margin-top: 4px;
          font-size: 12px;
          color: #eee;
          transform: scale(0.75);
          transform-origin: left;
        }
      }

      button {
        width: 95px;
        height: 36px;
        line-height: 36px;
        border-radius: 2px;
        font-size: 16px;
        color: #fff;
        background-color: #fea129;
        border: none;
        margin-right: 16px;
        margin-left: 5px;
        padding: 0;
      }
    }
  }
</style>
