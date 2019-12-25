<template>
  <footer class="al-footer-wrap">
    <div class="index">
      <table class="list">
        <tr>
          <td class="logo">
            <img src="/img/logo.png" alt />
          </td>
          <td class="xiao">{{$t('home.footer_text1_1')}}</td>
          <th class="left margin">{{$t('home.footer_name1')}}</th>
          <td class="left">{{$t('home.footer_text1_2')}}</td>
        </tr>
        <tr>
          <th>{{$t('home.footer_name2')}}</th>
          <td>{{$t('home.footer_text2_1')}}</td>
          <td>{{$t('home.footer_text2_2')}}</td>
          <td>{{$t('home.footer_text2_3')}}</td>
        </tr>
        <tr>
          <th>{{$t('home.footer_name3')}}</th>
          <td>{{$t('home.footer_text3_1')}}</td>
          <td>{{$t('home.footer_text3_2')}}</td>
          <td>{{$t('home.footer_text3_3')}}</td>
        </tr>
        <tr>
          <th class="left">{{$t('home.footer_name4')}}</th>
          <td class="white pc">
            <div class="desc">
              <div class="icon">
                <img src="@/assets/footer1.png" alt />
                <h5>AlphaPay</h5>
                <div class="code_box">
                  <div class="code">
                    <img src="/img/alphapay.png" alt />
                  <div class="jiantou"></div>

                  </div>
                </div>
              </div>
              <div class="icon">
                <img src="@/assets/footer2.png" alt />
                <h5>AlphaWallet</h5>
                <div class="code_box">
                  <div class="code">
                    <img src="/img/alphawallet.png" alt />
                  </div>
                  <div class="jiantou"></div>

                </div>
              </div>
            </div>
          </td>
          
          <td class="white h5">
            <div class="desc">
              <div class="icon" @click="handleDowAlphaPay">
                <img src="@/assets/footer1.png" alt />
                <h5>AlphaPay</h5>
                <div class="code_box">
                  <div class="jiantou"></div>
                  <div class="code">
                    <img src="/img/alphapay.png" alt />
                  </div>
                </div>
              </div>
              <div class="icon"  @click="handleDowAlphaWallet">
                <img src="@/assets/footer2.png" alt />
                <h5>AlphaWallet</h5>
                <div class="code_box">
                  <div class="jiantou"></div>
                  <div class="code">
                    <img src="/img/alphawallet.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <p class="copyright">Copyright ©2019 ALPEX Ltd All Rights Reserved</p>
    </div>
  </footer>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AlFooter extends Vue {
  protected handleDowAlphaPay() {
    window.open('https://walletapp.alpex.io/#/iosGoExDown')
  }
  protected handleDowAlphaWallet() {
    window.open('https://walletapp.alpex.io/#/download')
  }
}
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.al-footer-wrap {
  background: #080828;
  min-width: 1200px;
  // width: 100vw;
  .index {
    .h5{
      display: none;
    }
    height: 400px;
    margin: 0 auto;
    .copyright {
      text-align: center;
      font-size: 12px;
      color: #fff;
      margin-top: 46px;
      opacity: 0.5;
      font-family: "Courier New", Courier, monospace;
    }
    .list {
      display: flex;
      justify-content: space-between;
      width: 750px;
      margin: 0 auto;
      padding-top: 130px;
      tr {
        display: flex;
        flex-direction: column;
        color: #fff;
        font-size: 16px;
        .logo {
          width: 105px;
          height: 30px;
          img {
            width: 100%;
          }
        }
        .white {
          opacity: 1;
          .icon {
            position: relative;
            text-align: center;
            h5{
              padding-top: 10px;

            }
            &:hover {
              .code_box {
                display: block;
                height: 100%;
              }
            }
            .code_box {
              position: absolute;
              left: -20px;
              bottom: 120px;
              display: none;
              .jiantou {
                width: 0;
                height: 0;
                border: 10px solid;
                border-color: #fff transparent transparent ;
                margin: 0 auto;
              }
              .code {
                box-sizing: border-box;
                padding: 5px;
                width:100px;
                height: 100px;
                background: #fff;
                opacity: 1;
                border-radius: 2px;
              }
            }
          }
        }
        .xiao {
          font-size: 10px;
          opacity: 0.4;
        }
        .margin{
          margin: 0;
        }
        .left {
          text-align: left;
        }
        th {
          opacity: 0.5;
          font-weight: 500;
          margin-bottom: 24px;
        }
        td {
          opacity: 0.8;
          padding-bottom: 20px;
          .desc {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            color: #838393;
            .icon {
              width: 70px;
              height: 70px;
              margin-right: 30px;
              img {
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>