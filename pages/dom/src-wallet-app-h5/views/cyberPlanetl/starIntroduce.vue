<template>
  <div class="index">
    <div class="title">
      <h2>阿尔法星球</h2>
      <div class="line"></div>
    </div>
    <div class="desc">
      <div class="box top">
        <div class="text">
          <p> <countup :start-val="1" :end-val="+salpt" :duration="0.8"></countup>SALPT</p>
          <h4>居民收益总额</h4>
        </div>
        <div class="bgimg">
          <img class="imgUpDown" src="../../assets/img/cyberPlanetl/star1.png" do_not_open alt/>
        </div>
        <div class="xian1"></div>
      </div>
      <div class="box zhong">
        <div class="text">
          <p><countup :start-val="1" :end-val="+online" :duration="0.8" style="text-align: center"></countup></p>
          <h4>星球在线居民</h4>
        </div>
        <div class="bgimg">
          <img class="imgUpDown"  src="../../assets/img/cyberPlanetl/star2.png" do_not_open alt/>
        </div>
      </div>
      <div class="box">
        <div class="text">
          <p><countup :start-val="1" :end-val="+usdt" :duration="0.8"  style="text-align: center"></countup>USDT</p>
          <h4>居民理财总额</h4>
        </div>
        <div class="bgimg">
          <img class="imgUpDown"  src="../../assets/img/cyberPlanetl/star3.png" do_not_open alt/>
        </div>
        <div class="xian2"></div>
      </div>
    </div>
    <div class="text">
      <div class="text_title">
        <h5>阿尔法星球介绍</h5>
      </div>
      <p>
        用户可使用数字货币参与阿尔法网络星球理财计划，网络星球将为用户开设阿尔法星球ID，确认其为该星球居民。居民可将手中的数字货币寄存在星球中购买理财包，用于拓展星球网络建设，用户购买理财资产包越多，所享的星球带宽越多，产生的理财收益就越多。星球的总理财收益来源于阿尔法星球生态中的成交量与成交额，用户可随时提取保证金，也可随时从星球提取理财收益进行价值换算，将其转化为全球购买力。
      </p>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        salpt: 0,
        online: 0,
        usdt: 0,
      }
    },
    mounted() {
      document.title = '星球介绍';
    },
    activated() {
      this.getIndexData()
      window.app.showShareIcon(false);
    },
    methods: {
      getIndexData() {
        this.$http2
          .post("invest/financeApi/getIndexData")
          .then(res => {
            const {online, salpt, usdt} =  res.result;
            this.salpt = salpt;
            this.online = online;
            this.usdt = usdt;
          })
          .catch(error => {
          });
      }
    },
  };
</script>

<style lang="less" scoped>
  @keyframes ghostUpdown {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(10px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  .index {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/cyberPlanetl/star_bg.png") no-repeat;
    background-size: 100% 100%;
    overflow-y: auto;
    padding: 0 24px;

    .title {

      margin-top: 20px;
      width: 40%;

      h2 {
        font-size: 24px;
        color: #fff;
        text-align: center;
      }

      .line {
        width: 100%;
        height: 10px;
        background: url('../../assets/img/cyberPlanetl/line.png') no-repeat;
        background-size: 100% 100%;
      }
    }

    .desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 44px;

      .top {
        padding-bottom: 100px;
      }

      .zhong {
        padding-top: 100px;
      }

      .box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #00dfe6ff;

        .xian1 {
          position: absolute;
          right: -23px;
          bottom: 72px;
          width: 71px;
          height: 51px;
          background: url('../../assets/img/cyberPlanetl/xiexian1.png') no-repeat;
          background-size: 100% 100%;
        }

        .xian2 {
          position: absolute;
          right: -60px;
          top: 0;
          width: 84px;
          height: 97px;
          background: url('../../assets/img/cyberPlanetl/xiexian2.png') no-repeat;
          background-size: 100% 100%;
        }

        > .text {
          width: 100%;
          font-size: 21px;
          background: url("../../assets/img/cyberPlanetl/star4.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          p {
            span {
              display: inline-block;
              width: 111px;
            }
          }

          h4 {
            font-size: 14px;
            color: #00dfe6ff;
          }
        }

        .bgimg {
          width: 123px;
          height: 136px;
        }
        .imgUpDown {
          animation: ghostUpdown 5s infinite alternate;
        }
      }
    }

    > .text {
      background: #1b48adff;
      box-shadow: 5px -4px 1px rgba(41, 71, 183, 0.5);
      padding: 0 10px;
      margin-top: 40px;
      margin-bottom: 50px;

      .text_title {
        background: linear-gradient(#00cbffff, #016bfeff);
        box-shadow: 5px -7px 1px rgba(41, 71, 183, 0.5);
        height: 35px;
        line-height: 35px;

        h5 {
          font-size: 16px;
          color: #fff;
          text-align: center;
        }
      }

      p {
        font-size: 14px;
        text-align: justify;
        color: #4baed3ff;
        padding: 16px 10px;
      }
    }
  }
</style>
