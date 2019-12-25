/**
*  Created by   阿紫
*  On  2019/11/25 0025
*  Content 邀请落地页
*/
<template>
  <div class="inviteLand">
    <div class="quan">
      <div class="tips">
        <div class="phone">您的好友{{phone?phone:email}}</div>
      </div>
    </div>
<!--    <img class="quan" src="./img/quan.png" alt/>-->

    <img class="desc" src="./img/desc2.png" alt/>

    <div class="triangle_list">
      <div class="triangle"></div>
      <div class="triangle"></div>
      <div class="triangle"></div>
    </div>
    <div class="goInvite" @click="goRegister">立即注册</div>
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-down">
        <div>
          <img src="./img/open_hint.png" alt/>
          <div class="jian_tou"></div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {terminal} from "common/unti";
  import {TransferDom, Alert} from "vux";

  export default {
    name: "inviteLand",
    data() {
      return {
        phone: "",
        email: "",
        show: false
      };
    },
    components: {
      Alert
    },
    directives: {
      TransferDom
    },
    methods: {
      goRegister() {
        const ua = navigator.userAgent.toLowerCase();
        if (
          ua.match(/MicroMessenger/i) == "micromessenger" ||
          ua.match(/\sQQ/i) == " qq"
        ) {
          this.show = true;
        } else {
          this.show = false
          window.location.href = `${window.location.origin}/#/inviteRegister?inviteCode=${this.$route.query.inviteCode}&isInvest=${this.$route.query.isInvest}`;
        }
      }
    },
    activated() {
      this.phone = this.$route.query.phone;
      this.email = this.$route.query.email;
    }
  };
</script>
<style lang="less">
  .inviteLand {
    height: 100%;
    width: 100%;
    background: url("./img/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;
    overflow: hidden;

    .quan {
      padding: 20px;
      width: 100%;
      background: url("./img/quan.png") no-repeat;
      background-size: 300px, 300px;
      background-position: top center;
    }

    .tips {
      margin: 5px auto;
      height: 143px;
      width: 280px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      background: url("./img/phone_bg.png") no-repeat;
      background-size: 100% 100%;

      .phone {
        padding-top: 100px;
      }
    }

    .desc {
      margin-top: 80px;
    }

    .triangle_list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 9px;
      margin-bottom: 16px;

      .triangle {
        width: 0;
        height: 0;

        &:nth-child(1) {
          border-top: 6px solid #26ebffff;
          border-bottom: 6px solid transparent;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
        }

        &:nth-child(2) {
          border-top: 10px solid #26ebffff;
          border-bottom: 10px solid transparent;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
        }

        &:nth-child(3) {
          border-top: 14px solid #26ebffff;
          border-bottom: 14px solid transparent;
          border-right: 14px solid transparent;
          border-left: 14px solid transparent;
        }
      }
    }

    .goInvite {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 110px;
      height: 110px;
      font-size: 16px;
      font-weight: 600;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
      text-align: center;
      color: #fff;
      background: url("./img/but_bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .dialog-down {
    z-index: 3;

    .weui-mask {
      background: rgba(0, 0, 0, 0.9) !important;
    }

    .weui-dialog {
      height: 40px;
      line-height: 70px;
      right: 23px;
      top: 20px;
      bottom: auto;
      left: auto;
      text-align: center;
      color: #5e5e5e;
      font-size: 18px;
      padding: 20px 23px 0 0;
      border: none;
      background: rgba(255, 255, 255, 0);

      .jian_tou {
        position: absolute;
        right: 7px;
        top: 0;
        width: 18px;
        height: 59px;
        background: url("./img/open_hint2.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  @media (min-height: 400px) and (max-height: 506px) {
    .inviteLand {
      .desc {
        margin-top: 30px;
      }
    }
  }
  @media (min-height: 507px) and (max-height: 580px) {
    .inviteLand {
      .quan {
        padding-top: 40px;
      }
      .desc {
        margin-top: 30px;
      }
    }
  }
  @media (min-height: 581px) and (max-height: 660px) {
    .inviteLand {
      .quan {
        padding-top: 60px;
      }
      .desc {
        margin-top: 50px;
      }
    }
  }
  @media (min-height: 661px) and (max-height: 750px) {
    .inviteLand {
      .quan {
        padding-top: 80px;
      }
      .desc {
        margin-top: 60px;
      }
      .goInvite {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }
      .triangle_list {
        margin-top: 15px;
        margin-bottom: 30px;
        .triangle {
          margin-top: 9px;
        }
      }
    }
  }
  @media (min-height: 751px) and (max-height: 900px) {
    .inviteLand {
      .quan {
        padding-top: 100px;
      }
      .desc {
        margin-top: 60px;
      }
      .goInvite {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }
      .triangle_list {
        margin-top: 15px;
        margin-bottom: 30px;
        .triangle {
          margin-top: 15px;
        }
      }
    }
  }
</style>
