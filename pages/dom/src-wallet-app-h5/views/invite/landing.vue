/*
 * @Author: dubbing
 * @Content: 废弃
 * @Date: 2019-07-17 14:12:06
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-17 14:12:06
 */

<template>
  <div class="invite-landing">
    <img class="invite-landing__poster" src="@/assets/img/invite/poster.png" alt="landingpage">
    <div class="invite-landing__footer">
      <div class="footer-content">
        <img class="footer-content__logo" src="@/assets/img/invite/logo.png" alt="logo">
        <div class="footer-content__intro">
          <p class="footer-content__title">AlphaWallet</p>
          <p class="footer-content__detail">
            <span>一款智能数字化，轻便快捷的多链钱包</span>
          </p>
        </div>
      </div>
      <div v-if="type === 'download'" class="footer-button">下载App</div>
      <div v-if="type === 'open'" class="footer-button">立即打开</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inviteLading",
  data () {
    return {
      type: 'download'
    }
  },
  mounted () {
    this.type === this.$route.query.type || 'download'
  }
};
</script>
<style lang="less" scoped>
.invite-landing {
  &__poster {
    width: 100%;
  }
  &__footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding: 0 15px;
    background: linear-gradient(
      130deg,
      rgba(138, 108, 254, 1) 0%,
      rgba(84, 126, 244, 1) 100%
    );
  }
}
.footer {
  &-content {
    display: flex;
    align-items: center;
    &__logo {
      width: 40px;
      height: 40px;
    }
    &__intro {
      margin-left: 3px;
    }
    &__title {
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
    }
    &__detail {
      font-size: 12px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(255, 255, 255, 1);
      line-height: 15px;
      span {
        display: block;
        transform: scale(0.83333333);
        transform-origin: left;
        white-space: nowrap;
        transform: scale(10/12);
      }
    }
  }
  &-button {
    width: 116px;
    height: 36px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    background: rgba(255, 255, 255, 1);
    color: rgba(76, 21, 220, 1);
    border-radius: 18px;
    line-height: 36px;
    text-align: center;
  }
}
</style>
