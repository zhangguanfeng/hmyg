/*
 * @Author: dubbing 
 * @Content: 废弃 
 * @Date: 2019-07-17 14:11:53 
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-18 15:21:04
 */

<template>
  <div class="invite-join">
    <img class="invite-join__poster" src="@/assets/img/invite/join.png" alt="">
    <div class="invite-footer">
      <p class="invite-footer__link">直接转发链接给好友</p>
      <p class="invite-footer__image">生成推广图片</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inviteJoin'
}
</script>

<style lang="less" scoped>
.invite-join {
  &__poster {
    width: 100%;
    vertical-align: middle;
  }
}
.invite-footer {
  // position: fixed;
  // bottom: 0;
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
  background: linear-gradient(
    130deg,
    rgba(138, 108, 254, 1) 0%,
    rgba(84, 126, 244, 1) 100%
  );
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
  }
  &__image {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 0;
      width: 1px;
      height: 40px;
      background-color: #fff;
    }
  }
}
</style>
