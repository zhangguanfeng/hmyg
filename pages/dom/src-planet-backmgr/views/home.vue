<template>
  <div class="home-wrap">
    <div class="wellcome">
      <div class="header">
        <p class="username">
          尊敬的： {{$store.state.userInfo.user_name}}
        </p>
        <p class="text">
          欢迎您来到星球算力,在这里开启您的星球之旅吧!
        </p>
      </div>
      <ul class="list">
        <li>
          <div>
            {{updateData.online.toLocaleString()}} 
          </div>
          <div>
            目前在线人数
            <!-- <span class="human">(人)</span> -->
          </div>
        </li>
        <li>
          <div>
            {{updateData.usdt.toLocaleString()}} 
          </div>
          <div>
            居民量化总额
            <!-- <span class="usdt">(USDT)</span> -->
          </div>
        </li>
        <li>
          <div>
            {{updateData.salpt.toLocaleString()}}
          </div>
          <div>
            居民收益总额
            <!-- <span class="salpt">(SALPT)</span> -->
          </div>
        </li>
      </ul>
    </div>
    <ul ref="data">
      <li v-loading="loading">
        <div class="img">
          <img src="/image/home0.png" alt="">
        </div>
        <div class="text">
          <div class="title">
            USDT量化包
          </div>
          <div>
            数量：{{poolData.usdt_loading.toFixed(2)}}
          </div>
        </div>
      </li>
      <li v-loading="loading">
        <div class="img">
          <img src="/image/home1.png" alt="">
        </div>
        <div class="text">
          <div class="title">
            可用收益
          </div>
          <div>
            数量：{{poolData.salpt_success.toFixed(2)}}
          </div>
        </div>
      </li>
      <li v-loading="loading">
        <div class="img">
          <img src="/image/home2.png" alt="">
        </div>
        <div class="text">
          <div class="title">
            可提取
          </div>
          <div>
            量化包：{{poolData.usdt_unlock.toFixed(2)}}
            <!-- 带宽数量：{{(+data.usdt_lock + +data.usdt_success).toFixed(2)}} -->
          </div>
          <div>
            收益：{{poolData.salpt_unlock.toFixed(2)}}
            <!-- 能量数量：{{(+data.usdt_lock + +data.usdt_success).toFixed(2)}} -->
          </div>
        </div>
      </li>
      <li v-loading="loading">
        <div>
          <img src="/image/home3.png" alt="">
        </div>
        <div class="text">
          <div class="title">
            已完成提取
          </div>
          <div>
            量化包：{{poolData.usdt_success.toFixed(2)}}
          </div>
          <div>
            收益：{{poolData.salpt_success.toFixed(2)}}
          </div>
        </div>
      </li>
      <li v-loading="loading">
        <div>
          <img src="/image/home4.png" alt="">
        </div>
        <div class="text">
          <div class="title">
            提取中
          </div>
          <div>
            量化包：{{poolData.usdt_lock.toFixed(2)}}
          </div>
          <div>
            收益：{{poolData.salpt_lock.toFixed(2)}}
          </div>
        </div>
      </li>
      <li v-loading="loading">
        <div>
          <img src="/image/home5.png" alt="">
        </div>
        <div class="text">
          <div class="title">
            历史累计
          </div>
          <div>
            量化包累计：{{poolData.usdt_all.toFixed(2)}}
          </div>
          <div>
            收益累计：{{poolData.salpt_all.toFixed(2)}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
interface IData {
  usdt_loading: number; //usdt 载入带宽值 -
  salpt_loading: number;  //salpt 能量值 -
  usdt_unlock: number; //usdt 可解锁带宽
  salpt_unlock: number;  //salpt 可解锁能量
  usdt_success: number; //usdt 已完成解锁带宽
  salpt_success: number; //salpt 已完成解锁能量
  usdt_lock: number; //usdt 解锁中带宽
  salpt_lock: number; //salpt 解锁中能量
  usdt_balance: number; //usdt 可用余额带宽
  salpt_balance: number; //salpt 可用余额能量
  usdt_all: number;
  salpt_all: number;
}

@Component
export default class Home extends Vue {
  protected updateData: any = {
    online: '--',
    usdt: '--',
    salpt: '--',
  };
  protected loading: boolean = false;
  protected alphaHome: {[key: string]: string} = {
    online: '',
    usdt: '',
    salpt: '',
  };
  protected poolData: IData = {
    usdt_loading: 0,
    salpt_loading: 0,
    usdt_unlock: 0,
    salpt_unlock: 0,
    usdt_success: 0,
    salpt_success: 0,
    usdt_lock: 0,
    salpt_lock: 0,
    usdt_balance: 0,
    salpt_balance: 0,
    usdt_all: 0,
    salpt_all: 0,
  }
  protected data: any = {};
  protected setUpdate(key: string, data: any, float?: boolean){
    const updateData = (this as any)[key];
    let timmer = setInterval(() => {
      const done: {[key: string]: boolean} = {};
      for (let i in updateData) {
        done[i] = !!done[i];
        updateData[i] = updateData[i] === '--' ? 0 : updateData[i];
        done[i] = Math.abs(updateData[i]) >= Math.abs(+data[i]);
        const add = float
          ? parseFloat((Math.random() * (+data[i] / 30)).toFixed(2))
          : parseInt(Math.random() * (+data[i] / 30) + '', 10);
        updateData[i] = done[i] ? +data[i] : updateData[i] + add;
      }
      if (!Object.values(done).filter((el: Boolean)=> el === false).length) {
        clearInterval(timmer);
      }
    }, 10);
  }
  protected async getAlphaHome() {
    const res: any = await this.$post('home/alpha');
    if (res.code === 200) {
      this.alphaHome = res.result;
      this.setUpdate('updateData', this.alphaHome);
    } else {
      // this.$message
    }
  }
  protected created() {
    this.getAlphaHome();
  }
  protected setAnimate() {
    const ul: HTMLElement = (this as any).$refs.data;
    const lis: NodeListOf<HTMLLIElement> = ul.querySelectorAll('li');
    const ulRect: ClientRect = ul.getClientRects()[0];
    const center: number[] = [ulRect.left + ulRect.width / 2, ulRect.top + ulRect.height / 2];
    const slice = Array.prototype.slice;
    slice.call(lis).forEach((el: HTMLElement, idx: number) => {
      const liRect: ClientRect = el.getClientRects()[0];
      let x = (center[0] > liRect.left + liRect.width / 2 ? 1 : -1 ) * Math.abs(center[0] - liRect.left - liRect.width / 2);
      let y = (center[1] > liRect.top + liRect.height / 2 ? 1 : -1 ) * Math.abs(center[1] - liRect.top - liRect.height / 2);
      el.style.transform = `translate(${x}px, ${y}px) scale(.4)`;
    });
    setTimeout(() => {
      slice.call(lis).forEach((el: HTMLElement, idx: number) => {
        el.style.transform = `translate(0px, 0px) scale(1)`;
        el.style.opacity = '1';
      });
    }, 300);
  }
  protected mounted() {
    setTimeout(async () => {
      this.setAnimate();
      this.loading = false;
      const res: any = await this.$post('home/index');
      if (res.code === 200) {
        this.data = res.result;
        setTimeout(() => {
          this.setUpdate('poolData', this.data, true);
        }, 100)
      } else {
        this.$message.error('加载数据失败');
      }
      this.loading = false;
    }, 300);
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .home-wrap {
    @include wh();
    @include flex(column, flex-start);
    overflow: scroll;
    min-width: 800px;
    overflow: auto;
    // max-height: 500px;
    .wellcome {
      width: 100%;
      height: 300px;
      box-shadow:0px 5px 10px #9C9C9C;
      .list  {
        width: 100%;
        height: 120px;
        @include flex();
        // min-width: 800px;
        li {
          list-style: none;
          width: 30%;
          @include flex(column);
          div:first-child {
            font-size: 24px;
            padding: 10px 0;
            font-weight: 600;
            letter-spacing: 3px;
          }
          div:nth-child(2) {
            opacity: .9;
            span {
              display: inline-block;
            }
            .human {
              transform: translate(-5px, -1px) scale(.64);
              // transform: translateX(5px) scale(1.4);
              // font-weight: 600;
            }
            .usdt {
              transform: translate(-5px, -1px) scale(.64);
            }
            .salpt {
              transform: translate(-5px, -1px) scale(.64);
            }
          }
        }
      }
      .header {
        width: calc(100% - 60px);
        // height: 80px;
        background: #f3f8ff;
        margin-top: -10px;
        padding: 20px 30px 10px 30px;;
        .username {
          span-weight: 600;
          span-size: 19px;
        }
        .text {
          text-indent: 2em;
          padding: 0px 0;
          color: #999;
        }
      }
    }
    >ul {
      @include flex(row);
      max-width: 1200px;
      flex-wrap: wrap;
      li {
        opacity: 0;
        list-style: none;
        width: 30%;
        height: 60px;
        @include flex(row, flex-start);
        padding: 30px 20px;
        border-radius: 5px;
        box-shadow:0px 1px 11px 0px rgba(195,195,195,0.5);
        border-radius:2px;
        @include flex(row, flex-start);
        margin: 20px 30px 0 0;
        user-select: none;
        @include transition(600ms);
        &:hover {
          transform: scale(1.07) !important;
          background: #eeeeee;
        }
        .text {
          margin-left: 20px;
          @include flex(column, center, flex-start);
          .title {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 8px;
          }
          div:not(.title) {
            color: #777;
            @include flex(column, center, flex-start);
            font-size: 14px;
          }
        }
      }
    }
  }
</style>