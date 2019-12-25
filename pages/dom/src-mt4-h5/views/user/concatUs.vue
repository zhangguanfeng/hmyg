<template>
  <div class="concatUs has-header">
    <h-navbar title='联系我们' />
    <ul>
      <li>
        <h-img :src='require("@/assets/wechat.png")'></h-img>
        <span class="text">
          客服微信
        </span>
        <span class="wait">
          Q77169m
        </span>
      </li>
      <li>
        <h-img :src='require("@/assets/qq.png")'></h-img>
        <span class="text">
          客服QQ
        </span>
        <span class="wait">
          1589143241
        </span>
      </li>
      <li>
        <h-img :src='require("@/assets/email.png")'></h-img>
        <span class="text">
          官方邮箱
        </span>
        <span class="wait">
          instantexserv@gmail.com
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  @import '@/styles/mixin.scss';
  .concatUs {
    width: 96%;
    padding: 0 2%;
    margin: 0 auto;
    background: rgba(244,246,250,1);
    ul {
      @include flex(column);
      li {
        width: calc(100% - 30px);
        padding: 0 15px;
        height: 55px;
        border-radius: 3px;
        background: #fff;
        margin: 5px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
        }
        .text {
          margin-left: 12px;
          color: #5C5C5C;
          font-size: 14px;
          width: 100%;
        }
        .wait {
          color: $color;
        }
      }
    }
  }
</style>