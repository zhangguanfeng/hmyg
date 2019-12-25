<template>
  <div class="index">
    <div class="header_content">
      <div class="dsec">
        <span>USDT理财包</span>
        <div class="but" v-show="+poolData.pool_status !== 100 " @click="handleUnlock">提取</div>
      </div>
      <div class="content">
        <div class="sum">
          <countup :start-val="1" :end-val="+poolData.pool_total" :duration="0.8"></countup>
        </div>
        <div class="amount">
          <div class="box">
            <div class="left">
              <span></span>
            </div>
            <div class="right">
              <h5>昨日收益（SALPT）</h5>
              <p>{{this.poolData.yestoday_aslpt}}</p>
            </div>
          </div>
          <div class="box">
            <div class="left">
              <span class="icon"></span>
            </div>
            <div class="right">
              <h5>累计收益（SALPT）</h5>
              <p>{{this.poolData.all_aslpt}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pool">
      <div class="title">
        <div class="left">
          <div class="left_title">
            <span class="img">
              <img :src="poolData.pool_logo" do_not_open alt />
            </span>
            <p>USDT理财</p>
          </div>
          <div class="line"></div>
        </div>
        <h2>AlphaWallet</h2>
      </div>
      <div class="content">
        <div class="left">
          <p>
            <countup :start-val="1" :end-val="+poolData.pool_rate" :duration="0.8"></countup>%
          </p>
          <h4>预计收益率</h4>
        </div>
        <div class="right">
          <p>{{poolData.pool_min}}USDT</p>
          <h4>起投理财包</h4>
        </div>
      </div>
    </div>
    <x-button
      style="color:#fff; width: 260px;border-radius: 20px;background:linear-gradient(90deg,rgba(255,188,2,1) 0%,rgba(254,132,1,1) 100%);"
      @click.native="getThirdAppInfo"
    >购买理财包</x-button>
    <div>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div class="content">
          <div class="title">{{title}}</div>
          <img
            v-if="fundPwdState == 0"
            do_not_open
            src="@/assets/img/cyberPlanetl/moneyPassword.png"
            alt
          />
          <img v-else-if="googleVerifyStatus == 0" src="@/assets/img/GoEx/google.png" alt />
          <div v-else-if="antiMoneyAudit ==2" class="review">请在实名认证审核通过后再进行此操作</div>
          <img v-else-if="antiMoneyAudit == -1" src="@/assets/img/GoEx/antiMoneyAudit.png" alt />
          <div v-else-if="antiMoneyAudit ==0" class="desc">
            <div v-if="autoVerifyDesc.split('|').length>2">原因：{{autoVerifyDesc.split('|')[0]}}</div>
            <div class="reason" v-else>
              原因：
              <div v-for="(item, index) in autoVerifyDesc.split('|')" :key="index">{{item}}</div>
            </div>
          </div>
          <div class="but_list">
            <!-- <div class="close" @click="close" v-if="googleVerifyStatus==0">取消</div> -->
            <div class="close" @click="close" v-if="antiMoneyAudit == 0|| antiMoneyAudit == 1">取消</div>
            <div class="btn" @click="goInterfaceJump">{{btnText}}</div>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- 内容部分 -->
    <div class="bot_content">
      <div class="left">
        <div class="icon">
          <img do_not_open src="../../assets/img/cyberPlanetl/pool1.png" alt />
        </div>
        <div class="mask"></div>
      </div>
      <div class="right">
        <div class="title">
          <h4>产品介绍</h4>
          <x-icon
            type="ios-arrow-down"
            size="25"
            style="color:#1textCF1FF"
            @click="active1 = !active1"
            :class="{ rotate: active1 }"
            v-if="poolData.pool_present.length > 30"
          ></x-icon>
        </div>
        <div :class="[{ active: active1 }, 'text']">
          {{poolData.pool_present}}</div>
      </div>
    </div>
    <div class="bot_content">
      <div class="left">
        <div class="icon">
          <img do_not_open src="../../assets/img/cyberPlanetl/pool2.png" alt />
        </div>
        <div class="mask"></div>
      </div>
      <div class="right">
        <div class="title">
          <h4>产品特点</h4>
          <x-icon
            type="ios-arrow-down"
            size="25"
            style="color:#1CF1FF"
            @click="active2 = !active2"
            :class="{ rotate: active2 }"
            v-if="poolData.pool_features.length > 30"
          ></x-icon>
        </div>
        <div :class="[{ active: active2 }, 'text']">{{poolData.pool_features}}</div>
      </div>
    </div>
    <div class="bot_content" style="margin-bottom: 30px;">
      <div class="left">
        <div class="icon">
          <img do_not_open src="../../assets/img/cyberPlanetl/pool3.png" alt />
        </div>
        <div class="mask"></div>
      </div>
      <div class="right">
        <div class="title">
          <h4>玩法规则</h4>
          <x-icon
            type="ios-arrow-down"
            size="25"
            style="color:#1CF1FF"
            @click="active3 = !active3"
            :class="{ rotate: active3 }"
            v-if="poolData.pool_rule.length > 30"
          ></x-icon>
        </div>
        <div :class="[{ active: active3 }, 'text']" v-html="poolData.pool_rule"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { terminal } from "common/unti";
import { log } from "util";
export default {
  name: "miningPoolDetail",
  data() {
    return {
      android: {},
      poolData: {
        pool_total: "0",
        all_aslpt: "0",
        pool_rate: "0",
        pool_min: "0",
        yestoday_aslpt: "0",
        pool_status: 100, //提取按钮是否显示
        pool_features:'',
        pool_rule:'',
        pool_present:''
      },
      showToast: false,
      fundPwdState: "", // 资金密码设置  0：未设置  1：已设置
      antiMoneyAudit: "", // 审核通过,0-不通过,1-通过,2-待审,-1 还没提交过审核
      autoVerifyDesc: "", // 审核不通过 原因
      googleVerifyStatus: "", // 谷歌验证状态，0为解绑，1为绑定并开启，2为绑定但暂停验证
      title: "请先完成实名认证",
      btnText: "去认证",
      token: "",
      active1: false,
      active2: false,
      active3: false
    };
  },
  mounted() {
    document.title = this.$route.query.pool_name;
  },
  activated() {
    window.app.showShareIcon(false);
    this.getPoolDetail();
    // 右上角的点击跳转地址
    window.app.getWebViewConfigUrlString(
      `${window.LocationURL}#/miningRecord?pool_id=${this.$route.query.pool_id}`
    );
    window.getTokenCallback(nativeToken => {
      this.token = nativeToken;
      if (this.token) {
        window.getWebViewUpload = () => {
          this.getPoolDetail();
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
  methods: {
    // 提取
    handleUnlock() {
      let text = "提取记录";
      let url = `${window.LocationURL}#/extractCalculate?pool_id=${this.$route.query.pool_id}&pool_name=${this.$route.query.pool_name}&bannerRightButtonText=${text}`;
      var jsonA = encodeURI(url);
      let obj = {
        title: "提取",
        url: jsonA
      };
      window.app.openWebView(JSON.stringify(obj));
    },
    // 获取矿池详情
    getPoolDetail() {
      this.$http2
        .post(
          "invest/financeApi/getPoolDetail",
          {
            pool_id: this.$route.query.pool_id
          },
          { needToken: true }
        )
        .then(res => {
          this.poolData = res.result;
        });
    },
    // 跳转原生页面
    goInterfaceJump() {
      let page = "";
      if (this.antiMoneyAudit == 0 || this.antiMoneyAudit == -1) {
        page = terminal.android
          ? "activity.authen.AuthenRegionActivity"
          : "IdAuthViewController";
        let obj = {
          page
        };
        window.app.interfaceJump(JSON.stringify(obj));
        this.showToast = false;
      } else if (this.antiMoneyAudit == 2) {
        this.showToast = false;
      } else if (this.fundPwdState == 0) {
        // 跳转到设置资金密码
        page = terminal.android
          ? "activity.ModifyFundPwdActivity"
          : "PayPasswordSetViewController";
        let obj = {
          page
        };
        window.app.interfaceJump(JSON.stringify(obj));
        this.showToast = false;
      } else if (this.googleVerifyStatus == 0) {
        // 跳转到谷歌验证
        page = terminal.android
          ? "activity.validation.GoogleCodeBuildActivity"
          : "BindGoogleAuthController";
        let obj = {
          page
        };
        window.app.interfaceJump(JSON.stringify(obj));
        this.showToast = false;
      } else if (this.antiMoneyAudit == 1) {
        this.showToast = false;
        let text = "购买记录";
        let url = `${window.LocationURL}#/investCalculate?pool_min=${this.poolData.pool_min}&pool_id=${this.$route.query.pool_id}&pool_name=${this.$route.query.pool_name}&bannerRightButtonText=${text}`;
        var jsonA = encodeURI(url);
        let obj = {
          title: "购买理财包",
          url: jsonA
        };
        window.app.openWebView(JSON.stringify(obj));
      }
    },

    close() {
      this.showToast = false;
      // window.app.closeWebView();
    },
    // 购买理财包
    getThirdAppInfo() {
      let p = this.$http2
        .post(
          "wallet/app/user/third/getThirdAppInfo.do",
          {},
          { needToken: true }
        )
        .then(res => {
          const {
            antiMoneyAudit,
            autoVerifyDesc,
            googleVerifyStatus,
            fundPwdState
          } = res.result.resultMap;
          this.fundPwdState = fundPwdState;
          this.antiMoneyAudit = antiMoneyAudit;
          this.autoVerifyDesc = autoVerifyDesc;
          this.googleVerifyStatus = googleVerifyStatus;
          if (antiMoneyAudit == 2) {
            this.title = "实名认证正在审核中...";
            this.btnText = "知道了";
            this.showToast = true;
          } else if (fundPwdState == 0) {
            this.title = "请设置资金密码";
            this.btnText = "去设置";
            this.showToast = true;
          } else if (googleVerifyStatus == 0) {
            this.title = "请先绑定谷歌验证";
            this.btnText = "去绑定";
            this.showToast = true;
          } else if (antiMoneyAudit == -1) {
            this.title = "请先完成实名认证";
            this.btnText = "去认证";
            this.showToast = true;
          } else if (antiMoneyAudit == 0) {
            this.title = "实名认证审核失败";
            this.btnText = "重新提交";
            this.showToast = true;
          } else {
            let text = "购买记录";
            let url = `${window.LocationURL}#/investCalculate?pool_min=${this.poolData.pool_min}&pool_id=${this.$route.query.pool_id}&pool_name=${this.$route.query.pool_name}&bannerRightButtonText=${text}`;
            var jsonA = encodeURI(url);
            let obj = {
              title: "购买理财包",
              url: jsonA
            };
            window.app.openWebView(JSON.stringify(obj));
          }
        })
        .catch(res => {
          if (res.data.code == "40008") {
            let obj = {
              page: terminal.android
                ? "activity.LoginActivity"
                : "LoginViewController" //页面路径
            };
            window.app.interfaceJump(JSON.stringify(obj));
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  background: #000;
  height: 100%;
  width: 100%;
  height: 100%;
  background: #04022cff;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  padding: 10px 12px;
  padding-bottom: 0;
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
      height: 35px;
      span {
        padding-left: 10px;
        font-size: 11px;
      }
      .but {
        width: 90px;
        height: 35px;
        border: 1px solid #fff;
        border-radius: 30px;
        line-height: 35px;
        text-align: center;
        margin-right: 20px;
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
  .pool {
    margin-top: -10px;
    margin-bottom: 20px;
    height: 135px;
    background: url("../../assets/img/cyberPlanetl/pool_bg.png") no-repeat;
    background-size: 100% 100%;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding-left: 20px;
      overflow-x: hidden;
      .left_title {
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          display: inline-block;
          width: 26px;
          height: 26px;
          // background: url('../../assets/img/cyberPlanetl/home_icon.png');
          // background-size: 100% 100%;
          img {
          }
        }
      }
      .left {
        font-size: 16px;
        .line {
          width: 100%;
          height: 5px;
          background: linear-gradient(
            90deg,
            rgba(0, 203, 255, 0.2) 0%,
            rgba(1, 107, 254, 0.8) 100%
          );
        }
      }
      h2 {
        font-size: 39px;
        opacity: 0.1;
        margin-right: -50px;
      }
    }
    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 13px;
      color: #fff;
      .left {
        p {
          font-size: 25px;
          color: #ffd568;
        }
      }
      .right {
        p {
          font-size: 18px;
          padding-bottom: 7px;
        }
        h4 {
          opacity: 0.5;
        }
      }
    }
  }
  .bot_content {
    margin-top: 35px;
    padding-left: 6px;
    font-size: 14px;
    background: #1b48ad;
    box-shadow: 5px -4px 1px rgba(41, 71, 183, 0.5);
    display: flex;
    .left {
      position: relative;
      background: linear-gradient(
        180deg,
        rgba(0, 203, 255, 1) 0%,
        rgba(1, 107, 254, 1) 100%
      );
      .icon {
        width: 100px;
        height: 100px;
        z-index: 20;
      }
      .mask {
        position: absolute;
        // left: 0.1rem;
        top: -20px;
        width: 100%;
        height: 2.2rem;
        // z-index: ;
        background: linear-gradient(
          180deg,
          rgba(23, 187, 255, 0) 0%,
          rgba(50, 172, 243, 0.4) 50%,
          rgba(39, 123, 240, 0) 100%
        );
      }
    }
    .right {
      width: 100%;
      padding: 10px;
      .vux-x-icon {
        fill: #1cf1ff;
      }
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // justify-content: space-between;
        // align-items: center;
        color: #1cf1ff;
        font-size: 16px;
        .rotate {
          transform: rotate(180deg);
        }
      }
      .active {
        -webkit-line-clamp: 50 !important;
      }
      .text {
        width: 100%;
        color: #4baed3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  // 弹窗样式
  .dialog-demo {
    .content {
      padding: 10px 0;
      height: 300px;

      .title {
        color: #333333;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        padding: 0 48px;
      }
      .but_list {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      .review,
      .desc {
        padding: 0 18px;
        height: 150px;
        font-size: 14px;
        line-height: 30px;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .review {
        color: #5e87d8;
      }

      .desc {
        color: #f26754;
      }

      .reason {
        text-align: center;
      }

      img {
        width: 100px;
        margin: 20px 0;
      }

      .goExImg {
        width: 70px;
      }

      .btn {
        background: #5e87d8;
        line-height: 40px;
        height: 40px;
        width: 40%;
        // margin: 0 auto;
        color: #fff;
        border-radius: 40px;
        font-size: 14px;
      }

      .close {
        border: 1px solid #5e87d8;
        line-height: 40px;
        height: 40px;
        width: 40%;
        color: #5e87d8;
        border-radius: 40px;
        font-size: 14px;
      }
    }

    .introduce {
      border-radius: 4px;
      background: #3c3ee6;
      padding: 10px 15px;

      .title {
        &-l {
          width: 2px;
          height: 10px;
          display: inline-block;
          background: #32e4ff;
          position: relative;

          &:after {
            content: "";
            position: absolute;
            left: -10px;
            top: 3px;
            width: 2px;
            height: 4px;
            background: #32e4ff;
            opacity: 0.6;
          }

          &:before {
            content: "";
            position: absolute;
            left: -5px;
            width: 2px;
            height: 7px;
            top: 1.5px;
            background: #32e4ff;
            opacity: 0.8;
          }
        }

        &-r {
          width: 2px;
          height: 10px;
          display: inline-block;
          background: #32e4ff;
          position: relative;

          &:after {
            content: "";
            position: absolute;
            right: -10px;
            top: 3px;
            width: 2px;
            height: 4px;
            background: #32e4ff;
            opacity: 0.6;
          }

          &:before {
            content: "";
            position: absolute;
            right: -5px;
            width: 2px;
            height: 7px;
            top: 1.5px;
            background: #32e4ff;
            opacity: 0.8;
          }
        }

        &-c {
          color: #32e4ff;
          font-size: 16px;
          font-weight: 600;
          position: relative;
          display: inline-block;
          margin: 0 10px;

          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            height: 10px;
            left: -2px;
            right: -2px;
            background: linear-gradient(
              180deg,
              rgba(69, 154, 255, 0) 0%,
              rgba(41, 73, 255, 1) 100%
            );
            box-shadow: 0px 7px 13px 0px rgba(50, 29, 203, 0.25);
            border-radius: 6px;
          }
        }
      }

      &-content {
        color: #fff;
        font-size: 13px;
        opacity: 0.6;
        margin: 20px 0;
        line-height: 25px;
        text-align: left;
      }

      .btn {
        display: flex;
        justify-content: space-between;
        align-content: center;
        color: #82bbff;
        font-size: 13px;

        span {
          display: inline-block;
          width: 80px;
          border-radius: 4px;
          border: 1px solid #82bbff;
          padding: 3px 0;
        }
      }
    }
  }
}
</style>
