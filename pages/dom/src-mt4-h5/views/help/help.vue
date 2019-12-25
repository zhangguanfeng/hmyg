<template>
  <div class="help">
    <div class="index">
      <div style="height: 46px;width: 100%;"></div>
      <h-navbar class="title" @backPage="onClickLeft" title="帮助中心" />
      <div class="contentBox">
        <h-img class="banner" src="/img/help_banner.png" alt="banner" />
        <div class="content">
          <ul>
            <li  @click="openWebView('helpSon',{id : 1})">
              <div class="left">
                <i>
                  <h-img :src="require('@/assets/help1.png')" alt />
                </i>
                账户问题
              </div>
              <div class="right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li @click="openWebView('helpSon',{id : 2})">
              <div class="left">
                <i>
                  <h-img :src="require('@/assets/help2.png')" alt />
                </i>
                交易问题
              </div>
              <div class="right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li @click="openWebView('helpSon',{id : 3})">
              <div class="left">
                <i>
                  <h-img :src="require('@/assets/help3.png')" alt />
                </i>
                常见问题
              </div>
              <div class="right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li @click="openWebView('helpSon',{id : 4})"> 
              <div class="left">
                <i>
                  <h-img :src="require('@/assets/help4.png')" alt />
                </i>
                出入金问题
              </div>
              <div class="right">
                <van-icon name="arrow" />
              </div>
            </li>
            <li  @click="openWebView('helpSon',{id : 5})">
              <div class="left">
                <i>
                  <h-img :src="require('@/assets/help5.png')" alt />
                </i>
                产品相关问题
              </div>
              <div class="right">
                <van-icon name="arrow" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


@Component({

})
export default class Help extends Vue {
  protected onClickLeft(name: any) {
    window.closeWebView();
  }
  protected openWebView(to: string, query = {}) {
    const obj = {
      title: "",
      name: to,
      path: to,
      query
    };
    window.openWebView(obj);
  }
}
</script>

<style lang="scss" scoped>
.help {
  .contentBox {
    .banner {
      width: 100%;
    }
    .content {
      ul {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #f4f5fa;
          &:hover {
            background: #f9fafb;
          }
          .left {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              width: 25px;
              height: 25px;
              margin: 0 15px;
              img {
                width: 100%;
              }
            }
          }
          .right {
            box-sizing: border-box;
            padding-top: 5px;
            width: 25px;
            height: 25px;
            
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>