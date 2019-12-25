<template>
  <div class="news_zhu">
    <div class="banner">
      <h3>{{$t('news.banner_title')}}</h3>
      <p>
        <span @click="$router.push('/')">{{$t('news.banner_text1')}}</span>
        >
        <span @click="$router.push('/news')">{{$t('news.banner_title')}}</span>
        >
        <span @click="$router.push('/newsSon')">{{$t('news.banner_text2')}}</span>
      </p>
    </div>
    <div class="w">
      <div class="news_index">
        <div class="con">
          <div ref="left" class="left">
            <h4>{{$t('news.title')}}</h4>
            <ul>
              <li v-for="(item,index) in this.$root.$t('news.title_data')" :key="index">
                <span
                  :class="{active:isActive== index}"
                  @click="handleTab(index,item)"
                >{{item.title}}</span>
              </li>
            </ul>
          </div>
          <div ref="right" class="right">
            <ul>
              <li>{{$t("news.title_data[0].title")}}</li>
            </ul>
            <div class="right_con">
              <ul>
                <li v-for="(item,index) in this.$root.$t('news.rightData')" :key="index" @click="handelNewsSon">
                  <div class="right_con_title">{{item.title}}</div>
                  <div class="text">{{item.text}}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 移动端 -->
    <div ref="right" class="h5_right">
      <ul>
        <li
          v-for="(item,index) in this.$root.$t('news.title_data')"
          :key="index"
          :class="{active:isActive== index}"
          @click="handleTab(index,item)"
        >{{item.title}}</li>
      </ul>
      <div class="right_con">
        <ul>
          <li v-for="(item,index) in this.$root.$t('news.rightData')" :key="index" @click="handelNewsSon">
            <div class="right_con_title">{{item.title}}</div>
            <div class="text">{{item.text}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AlFooter extends Vue {
  protected done: boolean = false;
  protected title: any = this.$root.$t('news.title_data[0].title');
  protected titleData: any = this.$root.$t('news.title_data');
  protected rightData: any = this.$root.$t('news.rightData');
  protected isActive: any = 0;
  protected handleTab(index: any, item: any) {
    this.isActive = index;
    this.title = item.title;
  }
  protected handelNewsSon() {
    this.$router.push('/newsSon');
  }
  protected animation() {
    if (this.done) {
      return;
    }
    this.done = true;
    const vm = this as any;
    vm.$refs.name.className = vm.$refs.name.className + ' slide-up';
    setTimeout(() => {
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
.news_zhu {
  .h5_right {
    display: none;
  }
  .banner {
    width: 100%;
    height: 400px;
    background: url("/banner/news_ban.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      font-weight: 500;
      font-size: 60px;
      color: #56daff;
      padding-bottom: 40px;
    }
    p {
      font-size: 30px;
      color: #3D90BB;
      span{
        &:hover{
          cursor: pointer;
          color: #4fc7eb;
        }
      }
    }
  }
  .w {
    width: 1200px;
    margin: 0 auto;
  }

  .news_index {
    .title {
      @include font(32px, #4fc7eb, center);
      font-weight: 600;
      padding: 80px 0;
      // opacity: 0;
    }
    // .slide-up {
    //   animation: bounceInUps;
    //   animation-fill-mode: forwards;
    //   animation-duration: 1500ms;
    //   opacity: 1;
    // }
    .con {
      height: 327px;
      margin: 77px auto 70px;
      padding: 0 100px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .left {
        h4 {
          @include title();
          margin-bottom: 38px;
        }
        ul {
          li {
            cursor: pointer;
            text-align: center;
            color: #4fc7eb;
            font-size: 22px;
            padding: 10px 0;
            span {
              display: inline-block;
              width: 100%;
              padding: 10px 0;
              border-radius: 4px;
            }
          }
        }
      }
      .right {
        height: 100%;
        width: 660px;
        background: #080828;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        // transform: translateX(100px);
        // @include transition(800ms);
        // opacity: 0;

        > ul {
          border-bottom: 1px solid #272743;
          li {
            cursor: pointer;
            font-size: 20px;
            width: 132px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #3fd3ff;
            color: #121f42;
          }
        }
        .right_con {
          ul {
            padding: 10px 20px;
            box-sizing: border-box;
            li {
              cursor: pointer;
              box-sizing: border-box;
              padding: 10px 0;
              border-bottom: 1px solid #272743;
              .right_con_title {
                font-size: 18px;
                font-weight: 600;
                color: #56b4d0;
              }
              .text {
                font-size: 14px;
                color: #2e5d7b;
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
  .active {
    background: #3fd3ff;
    color: #121f42;
  }
}
</style>