/**
*  Created by   阿紫
*  On  2019/7/03 0030
*  Content EUSC要请落地页
*/
<template>
  <div class="invite-landing">
    <img class="invite-landing__poster" src="./invite-font.png" alt="landingpage">
    <div class="invite-landing__footer">
      <div class="footer-button" @click="goRegistered">立即注册</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inviteLading",
  data () {
    return {}
  },
  methods:  {
    goRegistered() {
      location.href =`${LocationPageURL}/registered.html?inviteCode=${this.$route.query.inviteCode}`
    }
  },
  activated() {
    document.title = '邀请好友';
  }
};
</script>
<style lang="less" scoped>
.invite-landing {
  height: calc(100vh);
  background: url("./invite.jpg") no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: calc(90vh -  40px);
    max-width: 85%;
  }
  .invite-landing__footer {
    position: fixed;
    height: 40px;
    color: #fff;
    text-align: center;
    background:linear-gradient(90deg,rgba(137,42,255,1) 0%,rgba(37,94,255,1) 100%);
    line-height: 40px;
    bottom: 0;
    left: 0;
    right:0;
  }
}
</style>
