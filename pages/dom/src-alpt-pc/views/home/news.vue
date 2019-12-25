<template>
  <div class="news">
    <div class="news_index">
      <div ref="name" class="title">
        {{$t('home.news_title')}}
      </div>
      <div class="con">
        <div ref="left" class="left">
          <p>{{$t('home.news_text')}}</p>
        </div>
        <div ref="right" class="right">
          <ul>
            <li v-for="(item,index) in this.$root.$t('home.titleData')" :key="index" :class="{active:isActive== index}" @click="handleTab(index)">
              {{item.title}}
            </li>
          </ul>
          <div class="but" @click="handleNewsSon">
            <p>
              {{$t('home.news_more')}}
            </p>
            <span ></span></div>
          <div class="right_con">
            <ul>
              <li v-for="(item,index) in this.$root.$t('home.rightData')" :key="index" @click="$router.push('/newsSon')">
                <div class="right_con_title">
                  {{item.title}}
                </div>
                <div class="text">
                  {{item.text}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AlFooter extends Vue {
  protected done: boolean = false;
  protected titleData: any = this.$root.$t('home.titleData');
  protected rightData: any = this.$root.$t('home.rightData');
  protected isActive: any = 0;
  protected handleTab(index: any) {
    this.isActive = index;
  }
  protected handleNewsSon() {
    this.$router.push('/news');
  }
  protected animation() {
    if (this.done) {
      return;
    }
    this.done = true;
    const vm = this as any;
    vm.$refs.name.className = vm.$refs.name.className + ' slide-up';
    setTimeout( ()=> {
      const left: HTMLElement = (this as any).$refs.left;
      const right: HTMLElement = (this as any).$refs.right;
      left.style.transform = 'translate(0)';
      left.style.opacity = '1';
      right.style.transform = 'translate(0)';
      right.style.opacity = '1';
    }, 500);
  }
}
</script>

<style lang="scss">
@import "@/style/mixin.scss";
.news{
  width: 100%;  
  height: 585px;
  background: url('/img/news_bg.png');
  background-size: 100% 100%;
  .news_index{
    width: 1200px;
    margin: 0 auto;
    .title{
      @include font(32px,#4FC7EB,center);
      font-weight: 600;
      padding: 80px 0;
    }
    .con{
      width: 1160px;
      height: 327px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .left{
        height: 100%;
        width: 469px;
        background: url('/img/news_left.png');
        background-size: 100% 100%;
        position: relative;
        p{
          box-sizing: border-box;
          width: 100%;
          padding: 0 10px;
          margin: 0;
          position: absolute;
          bottom: 0;
          font-size: 23px;
          line-height: 61px;
          font-family: 'Courier New', Courier, monospace;
          color: #56B4D0;
          background: rgba($color: #000000, $alpha: 0.6)
        }
        
      }
      .right{
        height: 100%;
        width: 660px;
        background: #080828;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .but{
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 14px;
          color:#14587A;
          padding: 2px 0;
          p{
            padding: 0;
            margin: 0;
            display: inline-block;
          }
          span{
            vertical-align:middle;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-left: 5px;
            background: url('/img/youjiantou.png');
            background-size: 100% 100%;
            
          }
        }
        >ul{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #272743;
          .active{
            background: #3FD3FF;
            color: #121F42;
          }
          li{
            cursor: pointer;
            font-size: 20px;
            width: 132px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #14587A;
          }
        }
        .right_con{
          
          ul{
            padding: 10px 20px;
            box-sizing: border-box;
            li{
              box-sizing: border-box;
              padding: 10px 0;
              border-bottom: 1px solid #272743;
              cursor: pointer;
              .right_con_title{
                font-size: 18px;
                font-weight: 600;
                color: #56B4D0;
              }
              .text{
                font-size: 14px;
                color: #2E5D7B;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
}
</style>