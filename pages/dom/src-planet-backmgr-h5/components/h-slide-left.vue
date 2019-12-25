<template>
  <div class="h-slide-left-wrap" :style="{transform: `translateX(${collapse ? 0 : 60}vw)`}">
    <header>
      <div class="icon">
        <img src="/img/user-icon.png" alt="">
      </div>
      <div class="info">
        <div class="username">
          用户{{$store.state.userInfo && $store.state.userInfo.user_name}}
        </div>
        <div class="exit" @click="loginOut">
          <img src="/img/exit.png" alt="">
          退出
        </div>
      </div>
    </header>
    <ul class="menu" ref="menu">
      <li @click="toRouter('/')" class="menu-item">
        <img src="/img/amount.png" alt="">
        <span>
          汇总
        </span>
        <img src="/img/pointer.png" alt="">
      </li>
      <li @click="toRouter('/report')" class="menu-item" style="margin-top: 15px">
        <img src="/img/menu-icon-0.png" alt="">
        <span>
          报表
        </span>
        <img src="/img/pointer.png" alt="" :style="{transform: `rotate(${report ? 90 : 0}deg)`}">
        <ul :style="{height: report ? '126px' : '0', background: report? '#082058' : ''}">
          <li @click.stop="toRouter('/load')">
            购买记录
          </li>
          <li @click.stop="toRouter('/clear')">
            提取记录
          </li>
          <li @click.stop="toRouter('/mining')">
           	收益记录
          </li>
          <!-- <li @click.stop="toRouter('/extract')">
        		提矿记录
          </li> -->
        </ul>
      </li>
      <li  @click="toRouter('/property')" class="menu-item">
        <img src="/img/menu-icon-1.png" alt="">
        <span>
          资产管理
        </span>
        <img src="/img/pointer.png" alt="" :style="{transform: `rotate(${property ? 90 : 0}deg)`}">
          <ul :style="{height: property ? '123px' : '0',  background: property ? '#082058' : ''}">
            <li @click.stop="toRouter('/my')">
              我的资产
            </li>
            <li @click.stop="toRouter('/deposit')">
              转入
            </li>
            <li @click.stop="toRouter('/wal')">
              提取
            </li>
          </ul>
      </li>
      <li @click="toRouter('/proxy')" class="menu-item">
        <img src="/img/menu-icon-2.png" alt="">
        <span>
          代理
        </span>
        <img src="/img/pointer.png" alt="">
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class HSlideLeft extends Vue {
  protected report: boolean = false;
  protected property: boolean = false;
  protected get collapse(): boolean {
    return this.$store.state.collapse
  }
  protected set collapse(val: boolean) {
    this.$store.commit('updatCollapse', val);
  }
  @Watch('collapse')
  protected collapseCHange() {
    const slice = Array.prototype.slice;
    const lis = (this as any).$refs.menu.querySelectorAll('.menu-item');
    if (this.collapse) {
      slice.call(lis).forEach((el: HTMLElement, idx: number) => {
        setTimeout(() => {
          el.style.transform = `translate(0)`;
          el.style.opacity = '1';
        }, idx * 80 + 80);
      });
    } else {
      setTimeout(() => {
        slice.call(lis).forEach((el: HTMLElement, idx: number) => {
          el.style.transform = `translate(-50px)`;
          el.style.opacity = '0';
        });
      }, 500)
    }
  }
  protected toRouter(path: string) {
    if (path === '/report' || path === '/property') {
      const key: string = path.replace(/\//, '');
      (this as any)[key] =  !(this as any)[key];
    } else if (path !== this.$route.fullPath) {
      this.$store.commit('updatCollapse', false);
      setTimeout(() => {
        this.$router.push(path);
      }, 100);
    }
  }
  protected loginOut() {
    this.$store.commit('updatCollapse', false);
    window.location.href = '/login.html';
    // this.$router.replace('/login');
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .h-slide-left-wrap {
    @include transition();
    width: 80vw;
    background: #081A44;
    height: 100%;
    z-index: -1;
    header {
      width: 100%;
      height: 70px;
      @include flex();
      color: #fff;
      font-size: 20px;
      padding: 10px 0 20px 0;
      .icon {
        margin-left: 20px;
        img {
          width: 50px;
        }
      }
      .info {
        height: 100%;
        flex: 1;
        padding: 0 10px 0 10px;
        @include flex();
        .username {
          flex: 1;
        }
        .exit {
          @include flex();
          img {
            width: 18px;
            margin-right: 5px;
          }
          color: #7F8292;
          font-size: 14px;
        }
      }
    }
    .menu {
      padding: 0;
      >li {
        @include transition();
        list-style: none;
        @include flex(row, flex-start);
        color: #fff;
        font-size: 18px;
        padding: 0 0 15px 0;
        flex-wrap: wrap;
        overflow: hidden;
        transform: translateX(-50px);
        opacity: 0;
        img {
          width: 20px;
          @include transition();
        }
        img:first-child {
          margin-left: 20px;
        }
        span {
          width: calc(100% - 110px);
          padding: 0 10px;
        }
        ul {
          margin-top: 15px;
          background: #041233;
          width: calc(100% - 40px);
          padding: 0 0 0 40px;
          @include transition();
          overflow: hidden;
          li {
            font-size: 15px;
            list-style: none;
            padding: 10px 0;
            text-indent: 1em;
          }
        }
      }
      .space {
        padding: 0;
        height: 20px;
        width: 100%;
      }
    }
  }
</style>