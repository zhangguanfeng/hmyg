/**
*  Created by   阿紫
*  On  2018-12-18
*  Content
*/
<template>
  <div class='top' :class="{translateY: isTranslateY,titleTranslateY:!isTranslateY}">
    <div class="banner"></div>
    <div class="user">
      <img src="../../assets/img/redEnvelope/portrait.png" alt="">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "redEnvelopeTop",
    data() {
      return {
        isTranslateY: false
      };
    },
    activated() {
      setTimeout(() => {
        this.isTranslateY = true;
      }, 100)
    }
  };
</script>
<style lang="less">
  p {
    padding: 0;
    margin: 0;
  }

  .translateY {
    transform: none;
  }

  .titleTranslateY {
    transform: translateY(-120px);
  }


  .top {
    transition: all 0.6s;

    .banner {
      width: 100%;
      height: 92px;
      background: url('../../assets/img/redEnvelope/banner.png') no-repeat center / 100%;
    }

    .user {
      text-align: center;
      margin-top: -42px;

      img {
        width: 81px;
        height: 81px;
      }

      p {
        font-size: 18px;
        color: #646464
      }

      span {
        color: #969696;
        font-size: 14px;
        display: block;
        text-align: center;
        margin-top: 12px;
      }
    }
  }

  @media (max-width: 340px) {
    .top {
      .banner {
        height: 80px;
      }
    }
  }
</style>
