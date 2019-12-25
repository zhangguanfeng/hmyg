<template>
  <div class='home-page'>
    <div class="main">
      <!-- <p class="title">价格</p> -->
      <div class="list">
        <p class="title">价格</p>
        <ul class="list-item">
          <li>
            <p class="item-title"><span>兑入价格</span></p>
            <p class="item-text price">
              <span>{{dataList.in_rate}}</span>
              <img src="../../assets/homePage_img1.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>兑出价格</span></p>
            <p class="item-text price">
              <span>{{dataList.out_rate}} </span>
              <img src="../../assets/homePage_img2.png" alt="">
            </p>
          </li>
        </ul>
      </div>
      <div class="list">
        <p class="title">充币</p>
        <ul class="list-item">
          <li>
            <p class="item-title"><span>可用余额</span></p>
            <p class="item-text">
              <span>{{dataList.can_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img3.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>总兑入</span></p>
            <p class="item-text">
              <span>{{dataList.inn_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img4.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>总充币</span></p>
            <p class="item-text">
              <span>{{dataList.dep_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img5.png" alt="">
            </p>
          </li>
        </ul>
      </div>
      <div class="list">
        <p class="title">兑出</p>
        <ul class="list-item">
          <li>
            <p class="item-title"><span>总兑出</span></p>
            <p class="item-text">
              <span>{{dataList.ota_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img6.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>兑出冻结中</span></p>
            <p class="item-text">
              <span>{{dataList.otc_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img7.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>已完成兑出</span></p>
            <p class="item-text">
              <span>{{dataList.otn_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img8.png" alt="">
            </p>
          </li>
        </ul>
      </div>
      <div class="list">
        <p class="title">提币</p>
        <ul class="list-item">
          <li>
            <p class="item-title"><span>总提币</span></p>
            <p class="item-text">
              <span>{{dataList.wda_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img9.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>提币冻结中</span></p>
            <p class="item-text">
              <span>{{dataList.wdc_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img10.png" alt="">
            </p>
          </li>
          <li>
            <p class="item-title"><span>已完成提币</span></p>
            <p class="item-text">
              <span>{{dataList.wdn_usdt_number || 0}}</span>
              <img src="../../assets/homePage_img11.png" alt="">
            </p>
          </li>
        </ul>
      </div>
      <!-- 
        <ul class="list-item fourth">
          <li>
            <p class="item-title">总提币</p>
            <p class="item-text">{{dataList.wda_usdt_number || 0}}</p>
          </li>
          <li>
            <p class="item-title">提币冻结中</p>
            <p class="item-text">{{dataList.wdc_usdt_number || 0}}</p>
          </li>
          <li>
            <p class="item-title">已完成提币</p>
            <p class="item-text">{{dataList.wdn_usdt_number || 0}}</p>
          </li>
        </ul> -->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        dataList:''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let p = this.$http.get('ajax_home/index')
        p.then(res => {
          console.log(res)
          let {result} = res
          this.dataList = result
        }).catch(error => {
          return false
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .home-page {
    width:100%;
    height:100%;
    display: flex;
    box-sizing: border-box;
    padding:10px;
    .main {
      flex:1;
      // background: #F8F8FC;
      // padding:20px;
      overflow-y:auto;
      -webkit-overflow-scrolling: touch;
      .list {
        width:100%;
        margin:0 auto 10px;
        border:1px solid rgba(231,232,242,1);
        box-sizing: border-box;
        .title {
          padding:12px 20px;
          font-size:14px;
          font-weight: bold;
          background: #FFF;
          color:#324157;
          border-bottom:1px solid #E7E8F2;
          border-radius:6px 6px 0px 0px;
        }
        &-item {
          width: 100%;
          height:184px;
          background: #FFF;
          display: flex;  
          justify-content: space-between;
          border-radius: 0px 0px 6px 6px;
          box-sizing: border-box;
          li {
            position: relative;
            flex:1;
            padding:20px;
            text-align: center;
            &::before {
              content:'';
              position: absolute;
              top:40px;
              left:0;
              width:1px;
              height:104px;
              background: #E7E8F2;
            }
            &:first-of-type {
              &::before {
                display: none;
              }
            }
            .item-title {
              width:100%;
              height:40px;
              text-align: left;
              span {
                display: inline-block;
                padding:2px 10px;
                background: #4D627D;
                color:#FFF;
                font-size:14px;
                border-radius:2px;
              }
            }
            .item-text {
              width:100%;
              height:104px;
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                font-size:32px;
                color:#33343D;
                
              }
              img {
                margin-left:30px;
                width:116px;
              }
            }
            .price {
              img {
                margin-left:39px;
                width:117px;
              }
            }
          }
        }
      }
    }
  }
</style>