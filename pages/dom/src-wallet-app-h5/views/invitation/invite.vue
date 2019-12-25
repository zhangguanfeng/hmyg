/**
*  Created by   阿紫
*  On  2019/11/25 0025
*  Content AlphaWallet 邀请
*/
<template>
  <div class="invite" :class="{bigInvite: !isShow}">
    <div class="title">
      <img do_not_open src="./img/title.png" alt/>
      <img do_not_open class="desc" src="./img/desc1.png" alt/>
    </div>
    <div class="card">
      <div class="code">
        <img do_not_open :src="imgSrc" alt="">
      </div>
    </div>
    <div class="goInvite" v-if=" isShow" @click="shareCapture">立即分享</div>
  </div>
</template>
<script>
  import QRCode from 'qrcode';
  import {terminal} from 'common/unti';

  export default {
    name: "invite",
    data() {
      return {
        imgSrc: "",
        link: "",
        inviteCode: "",
        content: "",
        jumpUrl: "",
        iconUrl: "",
        isInvest: '0', // 是否是理财账户  1为理财用户，0为支付账户
        isShow: true,
      };
    },
    methods: {
      getData() {
        this.$http2.post("/wallet/app/compstar/inviteShareInfo.do", {}, {needToken: true})
          .then(res => {
            const {inviteCode, content, jumpUrl, iconUrl, isInvest} = res.result.map;
            this.inviteCode = inviteCode;
            this.content = content;
            this.jumpUrl = jumpUrl;
            this.iconUrl = iconUrl;
            this.isInvest = isInvest;
            this.link = `${jumpUrl}&inviteCode=${inviteCode}&isInvest=${isInvest}`
            QRCode.toDataURL(this.link).then(url => {
              this.imgSrc = url;
            })
          });
      },
      transferShareParams() {
        if (!this.inviteCode) {
          this.$http2
            .post(
              "/wallet/app/compstar/inviteShareInfo.do",
              {},
              {needToken: true}
            )
            .then(res => {
              const {inviteCode, content, jumpUrl, iconUrl, isInvest} = res.result.map;
              const obj = {
                title: "邀请好友",
                iconUrl: iconUrl,
                jumpUrl: `${jumpUrl}&inviteCode=${inviteCode}&isInvest=${isInvest}`,
                content: content
              };
              if (window.app.transferShareParams) {
                window.app.transferShareParams(JSON.stringify(obj));
              }
            });
        } else {
          const obj = {
            title: "邀请好友",
            iconUrl: this.iconUrl,
            jumpUrl: `${this.jumpUrl}&inviteCode=${this.inviteCode}&isInvest=${this.isInvest}`,
            content: this.content
          };
          if (window.app.transferShareParams) {
            window.app.transferShareParams(JSON.stringify(obj));
          }
        }
      },
      shareCapture() {
        if (!this.inviteCode) {
          this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
            const {inviteCode, content, jumpUrl, iconUrl, isInvest} = res.result.map;
            var obj = {
              title: "邀请好友",
              iconUrl: iconUrl,
              jumpUrl: `${jumpUrl}&inviteCode=${inviteCode}&isInvest=${isInvest}`,
              webUrl: `${window.location.origin}/#/invite?inviteCode=${inviteCode}`,
              content: content
            }
            if (window.app.shareCapture) {
              window.app.shareCapture(JSON.stringify(obj));
            }
          })
        } else {
          var obj = {
            title: "邀请好友",
            iconUrl: this.iconUrl,
            jumpUrl: `${this.jumpUrl}&inviteCode=${this.inviteCode}&isInvest=${this.isInvest}`,
            webUrl: `${window.location.origin}/#/invite?inviteCode=${this.inviteCode}`,
            content: this.content
          }
          if (window.app.shareCapture) {
            window.app.shareCapture(JSON.stringify(obj));
          }
        }
      }
    },
    activated() {
      if (this.$route.query.inviteCode) {
        this.isShow = false;
        if (window.app.getContentHeight) {
          window.app.getContentHeight(375, 667);
        }
      }
      this.getData();
      this.transferShareParams('', '');
      document.title = "邀请好友";
    }
  };
</script>
<style lang="less">
  .invite {
    height: 100%;
    width: 100%;
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    padding: 0 20px;
    overflow: hidden;

    .title {
      padding: 20px;
      width: 100%;
      background: url("./img/quan.png") no-repeat;
      background-size: 300px, 300px;
      background-position: top center;

      .desc {
        padding-top: 20px;
      }
    }

    .card {
      width: calc(100% - 40px);
      height: 130px;
      background: url("./img/code_bg.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .code {
        width: 253px;
        height: 114px;
        background: url("./img/code.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 82px;
          height: 82px;
        }
      }
    }

    .goInvite {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px auto 0 auto;
      width: 110px;
      height: 110px;
      font-size: 16px;
      font-weight: 600;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      text-align: center;
      color: #fff;
      background: url("./img/but_bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  @media (min-height: 400px) and (max-height: 506px) {
    .invite {
      .title {
        padding: 10px 20px 0 20px;

        .desc {
          padding-top: 10px;
        }
      }

      .goInvite {
        margin-top: 15px;
      }
    }
    .bigInvite {
      .title {
        padding-bottom: 30px;
        .desc {
          padding-top: 30px;
        }
      }
      .card {
        height: 150px;
        .code {
          width: 300px;
          height: 134px;
        }
      }
    }
  }

  @media (min-height: 507px) and (max-height: 580px) {
    .invite {
      .title {
        padding: 20px 20px 0 20px;

        .desc {
          padding-top: 20px;
        }
      }

      .goInvite {
        margin-top: 20px;
      }
    }
    .bigInvite {
      .title {
        padding-bottom: 30px;
        .desc {
          padding-top: 30px;
        }
      }
      .card {
        height: 150px;
        .code {
          width: 300px;
          height: 134px;
        }
      }
    }
  }

  @media (min-height: 581px) and (max-height: 660px) {
    .invite {
      .title {
        padding: 30px 20px 20px 20px;

        .desc {
          padding-top: 30px;
        }
      }

      .goInvite {
        margin-top: 40px;
      }
    }
    .bigInvite {
      .title {
        padding-bottom: 50px;
        .desc {
          padding-top: 40px;
        }
      }
      .card {
        height: 150px;
        .code {
          width: 300px;
          height: 134px;
        }
      }
    }
  }

  @media (min-height: 661px) and (max-height: 750px) {
    .invite {
      .title {
        padding: 50px 20px 30px 20px;

        .desc {
          padding-top: 30px;
        }
      }

      .card {
        height: 160px;

        .code {
          width: 353px;
          height: 140px;

          img {
            width: 105px;
            height: 105px;
          }
        }
      }

      .goInvite {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }
    }
    .bigInvite {
      .title {
        padding-top: 70px;
        padding-bottom: 50px;
        .desc {
          padding-top: 40px;
        }
      }
      .card {
        height: 150px;
        .code {
          width: 300px;
          height: 134px;
        }
      }
    }
  }

  @media (min-height: 751px) and (max-height: 900px) {
    .invite {
      .title {
        padding: 60px 20px 40px 20px;

        .desc {
          padding-top: 50px;
        }
      }

      .card {
        height: 160px;

        .code {
          width: 353px;
          height: 140px;

          img {
            width: 105px;
            height: 105px;
          }
        }
      }

      .goInvite {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }
    }
    .bigInvite {
      .title {
        padding-top: 70px;
        padding-bottom: 50px;
        .desc {
          padding-top: 60px;
        }
      }
      .card {
        height: 150px;
        .code {
          width: 300px;
          height: 134px;
        }
      }
    }
  }

</style>
