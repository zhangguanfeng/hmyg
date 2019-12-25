<template>
  <div class="home">
    <div class="home_index">
      <div class="header_content">
        <div class="dsec">
          <span>USDT理财包</span>
          <h4 @click="handleMiningPoolDetail">星球介绍</h4>
        </div>
        <div class="content">
          <div class="sum"><countup :start-val="1" :end-val="+usdtData.usdt" :duration="0.8"></countup></div>
          <div class="amount">
            <div class="box">
              <div class="left">
                <span></span>
              </div>
              <div class="right">
                <h5>昨日收益（SALPT）</h5>
                <p>{{usdtData.yesterday}}</p>
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span class="icon"></span>
              </div>
              <div class="right">
                <h5>累计收益（SALPT）</h5>
                <p>{{usdtData.total}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <h4>理财列表</h4>
        <div
          class="list_box"
          @click="handlePoolParticulars(item)"
          v-for="(item,index) in poolData"
          :key="index"
        >
          <div class="left">
            <div class="mask">
              <img :src="item.pool_logo" do_not_open alt />
            </div>
            <h5>{{item.pool_name}}</h5>
          </div>
          <div class="right">
            <h5>
              预计收益率
              <span><countup :start-val="1" :end-val="+item.pool_rate" :duration="0.8"></countup>%</span>
            </h5>
            <p>起投理财包：{{item.pool_min}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { terminal } from "common/unti";
export default {
  name: "cyberPlanetl",
  data() {
    return {
      token: "",
      android: {},
      isShow: true,
      poolData: [],
      usdtData: {
        total: "0.000",
        usdt: "0.000",
        yesterday: "0.000"
      }
    };
  },

  activated() {
    window.app.showShareIcon(false);
    this.getPollData();
    this.getUsdtData();
    window.getTokenCallback(nativeToken => {
      this.token = nativeToken;
      if (this.token) {
         window.getWebViewUpload = () => {
            this.getPollData();
            this.getUsdtData();
          };
      } else {
        // 没有登录跳转到登录页面
        let obj = {
          page: terminal.android
            ? "activity.LoginActivity"
            : "LoginViewController" //页面路径
        };
        window.app.interfaceJump(JSON.stringify(obj));
      }
    });
  },
  mounted() {
    document.title = "网络星球";
  },
  methods: {
    // 获取理财列表
    getPollData() {
      this.$http2
        .post("invest/financeApi/getPoolList", {}, { needToken: true })
        .then(res => {
          this.poolData = res.result.data;
        })
        .catch(error => {});
    },

    getUsdtData() {
      this.$http2
        .post("invest/financeApi/currencyInfo", {}, { needToken: true })
        .then(res => {
          this.usdtData = res.result;
        });
    },
    handleMiningPoolDetail() {
      let obj = {
        title: "星球介绍",
        url: `${window.LocationURL}#/starIntroduce`
      };
      window.app.openWebView(JSON.stringify(obj));
    },
    // 列表点击
    handlePoolParticulars(item) {
      
      let text = "收益记录";
      let url = `${window.LocationURL}#/miningPoolDetail?pool_id=${item.pool_id}&pool_name=${item.pool_name}&bannerRightButtonText=${text}`;
      var jsonA = encodeURI(url);
      let obj = {
        title: item.pool_name,
        url: jsonA
      }; 
       window.app.openWebView(JSON.stringify(obj));
    }
  }
};
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  background: #04022cff;
  .home_index {
    width: 100%;
    padding: 0 12px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .header_content {
    margin-top: 10px;
    color: #fff;
    height: 165px;
    background: url("../../assets/img/cyberPlanetl/home_bg.png");
    background-size: 100% 100%;
    .dsec {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      span {
        padding-left: 10px;
        font-size: 11px;
      }
      h4 {
        text-align: center;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        width: 90px;
        background: linear-gradient(
          90deg,
          rgba(0, 203, 255, 1) 0%,
          rgba(1, 107, 254, 1) 100%
        );
        border-radius: 35px 0px 0px 35px;
      }
    }
    .content {
      padding: 0 18px;
      .sum {
        font-size: 30px;
      }
      .amount {
        margin-top: 24px;
        font-size: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 37px;
          .left {
            span {
              display: inline-block;
              width: 26px;
              height: 26px;
              background: url("../../assets/img/cyberPlanetl/header_icon.png");
              background-size: 100% 100%;
              margin-right: 10px;
              opacity: 1;
            }
            .icon {
              background: url("../../assets/img/cyberPlanetl/header_icon1.png");
              background-size: 100% 100%;
            }
          }
          .right {
            h5 {
              opacity: 0.6;
            }
          }
        }
      }
    }
  }
  .list {
    > h4 {
      font-size: 16px;
      font-weight: 600;
      padding: 24px 0;
      color: #1cf1ff;
    }
    .list_box {
      box-shadow: 5px -4px 1px rgba(41, 71, 183, 0.5);
      width: 98%;
      height: 65px;
      padding: 0 5px;
      margin-bottom: 18px;
      background: #1b48ad;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .mask {
          margin-bottom: 17px;
          width: 65px;
          height: 80px;
          // background:linear-gradient(180deg,rgba(23,187,255,0) 0%,rgba(0,253,255,0.48) 23%,rgba(1,107,254,1) 100%);
          background: url("../../assets/img/cyberPlanetl/home_icon_bg.png");
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-top: 20px;
            width: 70%;
          }
        }
        h5 {
          font-size: 16px;
          color: #1cf1ff;
          margin-left: 10px;
        }
      }
      .right {
        color: #fff;
        font-size: 13px;
        h5 {
          padding-right: 5px;
          span {
            font-size: 16px;
            color: #ffd568;
          }
        }
        p {
          opacity: 0.5;
          text-align: right;
        }
      }
    }
  }
}
</style>