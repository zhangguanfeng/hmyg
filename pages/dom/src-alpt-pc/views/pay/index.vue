<template>
  <div class="pay">
    <div class="banner">
      <div class="title">
        <h3>{{$t('pay.banner_title')}}</h3>
        <p>{{$t('pay.banner_text')}}</p>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="con">
      <!-- 背景颜色 -->
      <div class="alphaPay">
        <div class="w">
          <div class="alphaPay_text">
            <h4>AlphaPay</h4>
            <p>{{$t('pay.alphaPay')}}</p>
          </div>
        </div>
      </div>
      <div class="w">
        <div class="product">
          <h4 class="title">{{$t('pay.product_title')}}</h4>
          <ul>
            <li v-for="(item,index) in $root.$t('pay.product')" :key="index">
              <div class="img">
                <img :src="`/img/pay_${item.id}.png`" alt />
              </div>
              <p class="text">{{item.text}}</p>
              <p class="text">{{item.text2}}</p>
            </li>
           
          </ul>
        </div>
      </div>
      <div class="product_bg">
        <div class="w">
          <div class="product_2">
            <h4>{{$t('pay.product_title1')}}</h4>
            <ul class="box">
              <li v-for="(item,i) in $root.$t('pay.product2')" :key="i">
                <h5>{{item.text}}</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.pay {
  .w {
    width: 1200px;
    margin: 0 auto;
  }
  .banner {
    width: 100%;
    height: 400px;
    background: url("/banner/pay_ban.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      width: 62.5%;
      padding-left: 15%;
      h3 {
        font-weight: 500;
        font-size: 60px;
        color: #56daff;
        padding-bottom: 20px;
      }
      p {
        font-size: 40px;
        color: #56DAFF;
      }
    }
  }
  .con {
    .alphaPay {
      background: #101040;
      .alphaPay_text {
        text-align: center;
        color: #4fc7eb;
        padding: 50px 10%;
        h4 {
          font-size: 32px;
          margin-bottom: 30px;
        }
        p {
          font-size: 18px;
        }
      }
    }
    .product {
      margin-bottom: 180px;
      .title {
        @include title();
        padding: 70px 0 100px 0;
      }
      ul {
        padding: 0 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          @include transition(0.6s);
          &:hover{
            transform: scale(1.1);
          }
          width: 160px;
          .img {
            width: 100%;
            height: 175px;
          }
          p {
            font-size: 18px;
            text-align: center;
          }
        }
      }
    }
    .product_bg{
      background: #101040;
      .product_2{
        h4{
          @include title();
          padding: 50px 0 130px 0;
        }
        ul{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          padding-bottom: 85px;
          li{
            padding: 32px 53px;
            background: #191961;
            border-radius:10px;
            margin-right: 50px;
            color: #4FC7EB;
            &:hover{
              opacity: 0.8;
            }
            &:nth-child(3){
              margin-right: 0; 
            }
            h5{
              font-size: 26px;
            }
          }
        }
      }
    }
  }
}
</style>