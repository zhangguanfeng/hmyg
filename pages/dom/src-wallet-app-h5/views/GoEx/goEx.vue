/**
*  Created by   阿紫
*  On  2019/11/14
*  Content AlphaPay
*/
<template>
  <div class='goEx'>
    <h2>
      <span>我的理财</span>
    </h2>
    <div class="card">
      <div class="card-title">
        <span class="card-title__left">可用数量(USDT)</span>
        <span class="card-title__right" @click="showIntroduce=true">AlphaPay挖矿理财</span>
      </div>
      <div class="balance">{{balance}} </div>
      <div class="btn" @click="goTransferExchange">转入AlphaPay</div>
    </div>

    <div class="earnings">
      <div class="earnings-title">
        <span class="earnings-title__left">累计收益（ALPT）</span>
        <span class="earnings-title__right" @click="showIntroduce=true">AlphaPay挖矿理财</span>
      </div>
      <div class="num">{{income}} <span> ≈ ¥{{cny}}</span></div>
      <div class="btn" @click="downLoad"> 下载AlphaPay APP</div>
    </div>

    <div class="tips">
      <div class="title">
        <span class="title-l"></span>
        <span class="title-c">参与理财</span>
        <span class="title-r"></span>
      </div>
      <div class="center">
        <p>1、将AlphaWallet内的USDT一键划转到AlphaPay账户作为保证金；</p>
        <p>2、在AlphaPay APP内进行接单操作，获得ALPT收益。</p>
      </div>
    </div>
    <div class="tips">
      <div class="title">
        <span class="title-l"></span>
        <span class="title-c">计算规则</span>
        <span class="title-r"></span>
      </div>
      <div class="center">
        <p>挖矿收益=挖矿订单*相应算力比</p>
      </div>
    </div>
    <div class="tips">
      <div class="title">
        <span class="title-l"></span>
        <span class="title-c">收益发放</span>
        <span class="title-r"></span>
      </div>
      <div class="center">
        <p>挖矿所得USDT 以等值“ALPT”进行结算发放，相关汇率参考市场价格。</p>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div class="content">
          <div class="title">
            {{title}}
          </div>

          <img v-if="fundPwdState == 0" src="@/assets/img/GoEx/money.png" alt="">
          <img v-else-if="googleVerifyStatus == 0" src="@/assets/img/GoEx/google.png" alt="">
          <img v-else-if="antiMoneyAudit ==-1"
               src="@/assets/img/GoEx/antiMoneyAudit.png" alt="">
          <div v-else-if="antiMoneyAudit ==2" class="review">请在实名认证审核通过后再进行此操作</div>
          <div v-else-if="antiMoneyAudit ==0" class="desc">
            <div v-if="autoVerifyDesc.split('|').length>2">
              原因：{{autoVerifyDesc.split('|')[0]}}
            </div>
            <div class="reason" v-else>
              原因：
              <div v-for="(item, index) in autoVerifyDesc.split('|')" :key="index">
                {{item}}
              </div>
            </div>
          </div>
          <img class="goExImg" v-else-if="antiMoneyAudit ==1 && googleVerifyStatus ==1"
               src="@/assets/img/GoEx/goEx.png" alt="">

          <div class="btn" @click="goInterfaceJump">{{btnText}}</div>

          <div class="close" @click="close" v-if="googleVerifyStatus==0">取消
          </div>
          <div class="close" @click="close" v-else-if="antiMoneyAudit == 0|| antiMoneyAudit == 1">
            取消
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showIntroduce" hide-on-blur class="dialog-demo">
        <div class="introduce">
          <div class="title">
            <span class="title-l"></span>
            <span class="title-c">AlphaPay挖矿理财</span>
            <span class="title-r"></span>
          </div>
          <div class="introduce-content">
            这是AlphaWallet针对AlphaPay智能支付项目量身定制的一款理财产品，是根据AlphaPay支付生态发展以及资源共享而规划的一项0成本、稳健型挖矿理财计划。用户缴纳任意保证金（USDT）即可参与挖矿，保证金随存随取，系统将按照实时保证金的数量匹配等量挖矿能量值，能量值是挖矿工作启动凭证以及工作量动能，挖矿过程中能量值不展示、不消耗。
          </div>
          <div class="btn">
            <span>0成本</span>
            <span>收益稳定</span>
            <span>随存随取</span>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {Flow, FlowState, FlowLine, TransferDomDirective as TransferDom} from 'vux'
  import {terminal} from 'common/unti';

  export default {
    name: "goEx",
    data() {
      return {
        showToast: false,
        showIntroduce: false,
        fundPwdState: '', // 资金密码设置  0：未设置  1：已设置
        antiMoneyAudit: '', // 审核通过,0-不通过,1-通过,2-待审, -1 还没提交过审核
        autoVerifyDesc: '', // 审核不通过 原因
        googleVerifyStatus: '', // 谷歌验证状态，0为解绑，1为绑定并开启，2为绑定但暂停验证
        globalExchangeRule: '', // 全球兑规则
        thirdAppActivation: '', // 是否激活 1激活 0没激活
        title: '请先绑定谷歌验证',
        btnText: '去绑定',
        balance: 0,
        income: 0,
        cny: 0,
        token: '',
      };
    },
    directives: {
      TransferDom
    },
    components: {
      Flow,
      FlowState,
      FlowLine
    },
    methods: {
      downLoad() {
        let url = '';
        if (terminal.android) {
          url = 'https://alpayex.com/AlphaPay.apk';
          window.app.openBrowser(url)
        } else {
          window.app.downLoadApp()
          // this.$router.push({
          //   name: 'iosGoExDown'
          // })
          // url = 'itms-services://?action=download-manifest&url=https://alpayex.com/manifest.plist';
        }
      },
      close() {
        window.app.closeWebView();
      },
      goInterfaceJump() { // 跳转原生页面
        let page = '';
        if (this.fundPwdState == 0) {
          page = terminal.android ? 'activity.ModifyFundPwdActivity' : 'PayPasswordSetViewController'
          let obj = {
            page,//页面路径
          };
          window.app.interfaceJump(JSON.stringify(obj))
        }else if (this.googleVerifyStatus == 0) {
          page = terminal.android ? 'activity.validation.GoogleCodeBuildActivity' : 'BindGoogleAuthController'
          let obj = {
            page,//页面路径
          };
          window.app.interfaceJump(JSON.stringify(obj))
        } else if (this.antiMoneyAudit == 0 || this.antiMoneyAudit == -1) {
          page = terminal.android ? 'activity.authen.AuthenRegionActivity' : 'IdAuthViewController'
          let obj = {
            page,//页面路径
          };
          window.app.interfaceJump(JSON.stringify(obj))
        } else if (this.antiMoneyAudit == 2) {
          this.close()
        } else if (this.antiMoneyAudit == 1) {
          this.showToast = false
          this.downLoad();
        }
      },
      goTransferExchange() {
        if (!this.token) {
          this.$vux.toast.show({
            type: 'warn',
            text: '请先登录，再执行此操作！',
            time: 1500,
          });
          return
        }
        this.$router.push({
          name: 'transferExchange',
          query: {
            balance: this.balance,
          }
        })
      },
      queryUSDTBalance() {
        this.$http.post('/wallet/app/wallet/queryUSDTBalance.do', {}, {needToken: true}).then(res => {
          const {balance} = res.result;
          this.balance = Math.floor(parseFloat(balance)*10000)/10000;
        })
      },
      getExchange() {
        this.$http.post('/wallet/app/wallet/queryBenifit.do', {}, {needToken: true}).then(res => {
          const {income, cny} = res.result;
          this.income = income;
          this.cny = cny;
        })
      },
      getThirdAppInfo() {
        this.$http.post('/wallet/app/user/third/getThirdAppInfo.do', {
          appId: this.$route.query.appId
        }, {needToken: true}).then(res => {
          const {
            antiMoneyAudit, autoVerifyDesc, googleVerifyStatus,
            globalExchangeRule, thirdAppActivation,fundPwdState
          } = res.result.resultMap;
          this.fundPwdState = fundPwdState;
          this.antiMoneyAudit = antiMoneyAudit;
          this.autoVerifyDesc = autoVerifyDesc;
          this.googleVerifyStatus = googleVerifyStatus;
          this.globalExchangeRule = globalExchangeRule;
          this.thirdAppActivation = thirdAppActivation;
          if (fundPwdState == 0) {
            this.title = '请先设置资金密码'
            this.btnText = '去设置';
          } else if (googleVerifyStatus == 0) {
            this.title = '请先绑定谷歌验证'
            this.btnText = '去绑定';
          } else if (antiMoneyAudit == 2) {
            this.title = '实名认证正在审核中...'
            this.btnText = '知道了';
          } else if (antiMoneyAudit == -1) {
            this.title = '请先完成实名认证'
            this.btnText = '去认证';
          } else if (antiMoneyAudit == 0) {
            this.title = '实名认证审核失败'
            this.btnText = '重新提交';
          } else if (antiMoneyAudit == 1) {
            this.title = '请先下载全球兑AlphaPay APP并登录账号'
            this.btnText = '去下载';
          }
          if (thirdAppActivation == '1') { // 是否激活
            this.showToast = false
          } else {
            this.showToast = true
          }
        }).catch(res => {
          if (res.data.code == '40008') {
            let obj = {
              page: terminal.android ? 'activity.LoginActivity' : 'LoginViewController',//页面路径
            };
            window.app.interfaceJump(JSON.stringify(obj))
          }
        })
      }
    },
    activated() {
      if (window.app.showShareIcon) {
        window.app.showShareIcon(false);
      }
      window.getTokenCallback((nativeToken) => {
        this.token = nativeToken;
        if (this.token) {
          if (terminal.ios) {
            window.getWebViewUpload = () => {
              if (window.location.href.indexOf('goEx') > -1) {
                this.getThirdAppInfo();
                this.queryUSDTBalance();
                this.getExchange();
              }
            }
          } else {
            window.app.transferCommonParams(JSON.stringify({
              isReloadWhenBackToFront: '1'
            }))
            this.getThirdAppInfo();
            this.queryUSDTBalance();
            this.getExchange();
          }
        } else { // 没有登录跳转到登录页面
          let obj = {
            page: terminal.android ? 'activity.LoginActivity' : 'LoginViewController',//页面路径
          };
          window.app.interfaceJump(JSON.stringify(obj))
        }
      })
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      document.title = lang === 'zh' ? ' AlphaPay App' : 'AlphaPay App';
    }
  };
</script>
<style lang="less">
  .goEx {
    background: linear-gradient(180deg, rgba(21, 7, 118, 1) 0%, rgba(14, 4, 81, 1) 100%);
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    padding: 10px 20px;

    h2 {
      color: #FFFFFF;
      font-size: 24px;
      margin-bottom: 10px;

      span {
        position: relative;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          height: 10px;
          left: -2px;
          right: -2px;
          background: linear-gradient(180deg, rgba(69, 154, 255, 0) 0%, rgba(41, 73, 255, 1) 100%);
          box-shadow: 0px 7px 13px 0px rgba(50, 29, 203, 0.25);
        }
      }
    }

    .card {
      background: url("../../assets/img/GoEx/bg-1.png") no-repeat top left;
      background-size: 100% 100%;
      min-height: 190px;
      padding: 10px;
      border-radius: 4px;

      &-title {
        display: flex;
        justify-content: space-between;
        align-content: center;

        &__left {
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          padding-left: 30px;
        }

        &__right {
          display: inline-block;
          border-radius: 4px;
          color: #fff;
          opacity: 0.7;
          border: 1px solid #fff;
          font-size: 13px;
          width: 125px;
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
      }

      .balance {
        color: #fff;
        font-size: 30px;
        padding-left: 30px;
        font-weight: bold;
        margin-top: 10px;

        span {
          font-size: 18px;
          opacity: 0.7;
        }
      }

      .btn {
        background: #32E4FF;
        color: #0A3E44;
        font-size: 14px;
        border-radius: 4px;
        width: 190px;
        height: 35px;
        line-height: 35px;
        font-weight: bold;
        text-align: center;
        margin: 30px auto 10px auto;
      }
    }

    .earnings {
      background: url("../../assets/img/GoEx/bg-2.png") no-repeat center center;
      background-size: 100% 100%;
      min-height: 154px;
      padding: 10px;
      margin: 0 10px 30px 10px;

      &-title {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        align-content: center;

        &__left {
          color: #fff;
          font-size: 15px;
          font-weight: bold;
        }

        &__right {
          display: inline-block;
          border-radius: 4px;
          color: #fff;
          opacity: 0.7;
          border: 1px solid #fff;
          font-size: 13px;
          width: 125px;
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
      }

      .num {
        color: #fff;
        font-size: 30px;
        padding-left: 30px;
        font-weight: bold;

        span {
          font-size: 14px;
          color: #96A6D3;
        }
      }

      .btn {
        color: #32E4FF;
        border-radius: 4px;
        border: 1px solid #32E4FF;
        width: 190px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin: 10px auto 0 auto;
        font-size: 14px;
      }

    }

    .tips {
      background: url("../../assets/img/GoEx/bg-3.png") no-repeat center center;
      background-size: 100% 100%;
      min-height: 90px;
      padding: 10px;
      margin-bottom: 10px;

      .title {
        text-align: center;
        margin-bottom: 10px;

        &-l {
          width: 2px;
          height: 10px;
          display: inline-block;
          background: #fff;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            left: -10px;
            top: 3px;
            width: 2px;
            height: 4px;
            background: #fff;
            opacity: 0.6;
          }

          &:before {
            content: '';
            position: absolute;
            left: -5px;
            width: 2px;
            height: 7px;
            top: 1.5px;
            background: #fff;
            opacity: 0.8;
          }
        }

        &-r {
          width: 2px;
          height: 10px;
          display: inline-block;
          background: #fff;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            right: -10px;
            top: 3px;
            width: 2px;
            height: 4px;
            background: #fff;
            opacity: 0.6;
          }

          &:before {
            content: '';
            position: absolute;
            right: -5px;
            width: 2px;
            height: 7px;
            top: 1.5px;
            background: #fff;
            opacity: 0.8;
          }
        }

        &-c {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          position: relative;
          display: inline-block;
          margin: 0 10px;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 10px;
            left: -2px;
            right: -2px;
            background: linear-gradient(180deg, rgba(69, 154, 255, 0) 0%, rgba(41, 73, 255, 1) 100%);
            box-shadow: 0px 7px 13px 0px rgba(50, 29, 203, 0.25);
            border-radius: 6px;
          }
        }
      }

      .center {
        color: #fff;
        opacity: 0.6;
        font-size: 13px;
        line-height: 20px;
      }
    }

  }

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

      .review, .desc {
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
        color: #5E87D8;
      }

      .desc {
        color: #F26754;
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
        background: #5E87D8;
        line-height: 40px;
        height: 40px;
        width: 80%;
        margin: 0 auto;
        color: #fff;
        border-radius: 40px;
        font-size: 14px;
      }

      .close {
        text-align: center;
        font-size: 14px;
        color: #5E87D8;
        margin-top: 10px;
      }
    }

    .introduce {
      border-radius: 4px;
      background: #3C3EE6;
      padding: 10px 15px;

      .title {
        &-l {
          width: 2px;
          height: 10px;
          display: inline-block;
          background: #fff;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            left: -10px;
            top: 3px;
            width: 2px;
            height: 4px;
            background: #fff;
            opacity: 0.6;
          }

          &:before {
            content: '';
            position: absolute;
            left: -5px;
            width: 2px;
            height: 7px;
            top: 1.5px;
            background: #fff;
            opacity: 0.8;
          }
        }

        &-r {
          width: 2px;
          height: 10px;
          display: inline-block;
          background: #fff;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            right: -10px;
            top: 3px;
            width: 2px;
            height: 4px;
            background: #fff;
            opacity: 0.6;
          }

          &:before {
            content: '';
            position: absolute;
            right: -5px;
            width: 2px;
            height: 7px;
            top: 1.5px;
            background: #fff;
            opacity: 0.8;
          }
        }

        &-c {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          position: relative;
          display: inline-block;
          margin: 0 10px;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 10px;
            left: -2px;
            right: -2px;
            background: linear-gradient(180deg, rgba(69, 154, 255, 0) 0%, rgba(41, 73, 255, 1) 100%);
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
        color: #82BBFF;
        font-size: 13px;

        span {
          display: inline-block;
          width: 80px;
          border-radius: 4px;
          border: 1px solid #82BBFF;
          padding: 3px 0;
        }
      }
    }
  }
</style>
