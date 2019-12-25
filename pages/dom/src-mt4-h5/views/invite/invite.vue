<template>
  <div class="invite">
    <h-navbar title="推荐有奖" @backPage="onClickLeft">
      <span slot="right" @click="toInviteDetails">邀请明细</span>
    </h-navbar>
    <div class="contentBOx">
      <div class="content">
        <div class="img-box">
          <h-img src="/img/invite/bg.png" />
        </div>
        <div class="copy-box">
          <div class="copy-text">邀请链接：{{inviteLink}}</div>
          <span class="copy-btn copyBtn" @click="copy" :data-clipboard-text="inviteLink">点击复制</span>
        </div>
        <div class="qrcode-box">
          <i class="dot1"></i>
          <i class="dot2"></i>
          <i class="dot3"></i>
          <i class="dot4"></i>
          <div class="qrcode-title">
            <span>
              我的专属二维码
              <i></i>
            </span>
          </div>
          <div class="qrcode-img">
            <div>{{inviteCode}}</div>
          </div>
          <span class="saveImg copyBtn" @click="copy" :data-clipboard-text="inviteCode">点击复制</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Toast } from "vant";
@Component({})
export default class Invite extends Vue {
  protected inviteLink: any = "http://asdsdsfsfdsfdsfgasdasdsd";
  protected inviteCode: any = "";
  protected clipboard: any = "";

  protected onClickLeft() {
    window.closeWebView();
  }
  //复制
  protected copy(): void {
    const clipboard: any = new Vue.prototype.clipboard(".copyBtn");
    clipboard.on("success", (e: any) => {
      console.log(e);
      this.$toast({
        message: "复制成功"
      });
      clipboard.destroy();
    });
  }
  //获取邀请码
  protected getInviteCode() {
    this.$http.get("/Agent/getInvideCode").then((res: any) => {
      this.inviteCode = res.invite_code;
    });
  }
  //跳转邀请详情
  protected toInviteDetails() {
    const obj = {
      title: "",
      name: "inviteDetails",
      path: "inviteDetails",
      query: {}
    };
    window.openWebView(obj);
  }
  activated() {
    this.getInviteCode();
  }
}
</script>
<style lang="scss">
.invite {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  background: linear-gradient(
    to top,
    #5304ad,
    #5636d3,
    #5636d3,
    #5743dc,
    #752bbe,
    #a00993
  );
  overflow: hidden;
  .contentBOx {
    height: 100%;
    overflow-y: auto;
    .content {
      height: 621px;
      margin-top: 46px;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      .img-box {
        img {
          width: 100%;
        }
      }
      .copy-box {
        padding-top: 15px;
        .copy-text {
          background: #8b9fff;
          color: #fff;
          line-height: 38px;
          padding: 0 15px;
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          text-align: center;
          border-radius: 3px;
        }
        .copy-btn {
          width: 50%;
          margin: 20px auto 0;
          background: #ffd800;
          color: #4a3211;
          font-size: 16px;
          text-align: center;
          padding: 8px 0;
          border-radius: 3px;
          display: block;
          font-weight: 500;
        }
      }
      .qrcode-box {
        width: 75%;
        height: 230px;
        margin: 0 auto;
        background: #361a87;
        border: 2px solid #836bff;
        border-radius: 5px;
        margin-top: 15px;
        padding: 15px 0;
        position: relative;
        /* box-shadow:0 0 5px #836BFF; */
        .qrcode-title {
          width: 60%;
          margin: 0 auto;
          margin-bottom: 50px;
          padding-bottom: 10px;
          text-align: center;
          border-bottom: 1px solid rgba(131, 107, 255, 0.5);
          span {
            font-size: 16px;
            color: #fff;
            //padding: 0 20px;
            margin: 0 auto;
            position: relative;
            i {
              height: 14px;
              position: absolute;
              width: 140%;
              bottom: 0;
              left: -20%;
              background: linear-gradient(to top, #361a87, #5736b7);
              opacity: 0.4;
            }
          }
        }
        .qrcode-img {
          margin: 0 auto;
          // width:40%;
          // new
          width: 64%;
          height: 50px;
          text-align: center;
          vertical-align: middle;
          line-height: 50px;
          background: #fff;
          border-radius: 7px;
          color: #757dbd;
          font-size: 20px; // end new
        }
        .saveImg {
          display: block;
          font-size: 12px;
          color: #fff;
          font-weight: 500;
          padding: 7px 0;
          width: 40%;
          margin: 0 auto;
          background: #2a9aff;
          border-radius: 3px;
          text-align: center;
          margin-top: 45px;
        }
        .dot1 {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          left: 9px;
          top: 9px;
          display: block;
          background: #7f56f3;
        }
        .dot2 {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          right: 9px;
          top: 9px;
          display: block;
          background: #7f56f3;
        }
        .dot3 {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          left: 9px;
          bottom: 9px;
          display: block;
          background: #7f56f3;
        }
        .dot4 {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          right: 9px;
          bottom: 9px;
          display: block;
          background: #7f56f3;
        }
      }
    }
  }
}
</style>
