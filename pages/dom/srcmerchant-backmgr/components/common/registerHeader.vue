<template>
  <div class="header">
    <div class="innerBox">
      <div class="header-left">
        <img src="@/assets/logo.png" alt="" >
        <div class="header-text">
          <span>Alphapay</span>
          <span>欢迎加入</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
  .header {
    width:100%;
    height:70px;
    background: #00C8A7;
    .innerBox {
      width:1200px;
      height:100%;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-left {
        display: flex;
        align-items: center;
        img {
          height:40px;
          margin-right:10px;
        }
        .header-text {
          color:#FFF;
          span {
            font-size:24px;
            &:last-of-type {
              font-size:16px;
              margin-left:10px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width:600px) {
    .header {
      height:55px;
      .innerBox {
        width:90%;
        .header-left {
          img {
            width:36px;
            height:36px;
          }
          .header-text {
            span {
              font-size:20px;
              &:last-of-type {
                font-size:14px;
              }
            }
          }
        }
      }
    }
  }
</style>
