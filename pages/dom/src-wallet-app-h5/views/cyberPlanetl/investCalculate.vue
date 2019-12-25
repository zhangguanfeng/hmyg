<template>
  <div class="investCalculate">
    <div class="main">
      <div class="bandwidth_name"><img alt="icon" class="icon" src="../../assets/img/cyberPlanetl/home_icon.png"/>{{pool_name}}</div>
      <div class="bandwidth">
        <div class="prompt">购买理财包</div>
        <div class="bandwidth_input"><input v-model="value" @input="value = inputFloat(value)" @blur="inputBlur($event, 'value')" type="tel" placeholder="请输入数量"/></div>
        <div class="money">
          <span>可用余额：{{total}} USDT</span>
          <input class="all" type="button" @click="handleALlClick" value="全部">
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="agreement"><span @click="switchAgreement"><img  alt="" do_not_open class="agree" :src="agreementSrc"/>我已阅读并同意</span><a href="#" @click="handleAgreement">《网络星球相关协议》</a></p>
      <p  class="Loading">
        <input type="button" v-if="loadingActive" @click="handleLoadingClick" value="购买">
      </p>
      <p v-if="!loadingActive" class="notLoading">
        <input type="button" value="购买">
      </p>
    </div>
    <div>
      <x-dialog v-model="showToast" hide-on-blur class="dialog-demo">
        <div class="content">
          <div class="title">
            系统提示
          </div>
          <div class="reason">
            {{reason}}
          </div>
          <div v-if="hasRecharge" class="btn">
            <div class="close" @click="showToast = false">取消</div>
            <div class="recharge" @click="handleRechargeClick">充币</div>
          </div>
        </div>
      </x-dialog>
    </div>
    <div>
      <x-dialog v-model="showPassword" hide-on-blur class="dialog-demo">
        <div class="password">
          <div class="title">
            请输入交易密码
          </div>
          <div class="password-wrapper">
            <input type="tel" class="input-box" v-model="pswInput" maxlength="6" @keyup="inputNumber">
            <ul class="show-ul">
              <li class="show-li" v-for="(i,index) in 6" :key="index">{{pointList[index]}}</li>
            </ul>
          </div>
          <div class="prompt">
            {{msg}}
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import agree from  '../../assets/img/cyberPlanetl/agree.png'
import disagree from  '../../assets/img/cyberPlanetl/disagree.png'
import md5 from 'js-md5';
import { inputFloat } from '@/common/unti.js';
import { terminal } from "common/unti";
export default {
  name: 'investCalculate',
  data() {
    return {
      token: '',
      showToast: false,
      showPassword: false,
      hasRecharge: true,
      pointList: [],
      pswInput: '',
      agreeSrc: agree,
      disagreeSrc: disagree,
      agreementSrc: '',
      pool_name: '',
      total: '', //可用的USDT
      value: '', //输入的值
      reason: '余额不足，请充值',
      msg: ''
    }
  },
  methods: {
    inputFloat(val) {
      return inputFloat(val);
    },
    inputBlur(e, key) {
      if (key === this.value) {
        if (+this.value < this.$route.query.pool_min) {
          this.value = Math.min(this.$route.query.pool_min, +this.total).toFixed(2);
        } else if (+this.value > this.total) {
          this.value =  Math.floor(parseFloat(this.total)*100)/100;
        } else {
          this.value =  Math.floor(parseFloat(this.value)*100)/100;
        }
      }
    },
    // 获取可用余额
    getListData() {
      this.$http2.post('wallet/app/wallet/queryUSDTBalance.do',{
        pool_id: this.$route.query.pool_id
      },{ needToken: true }).then(res => {
        this.total = res.result.balance;
      })
    },
    // 获取密码
    inputNumber(res) {
      if (this.pointList.length < 6 && res.key !== 'Backspace') {
        this.pointList.push('●');
      }
      if (res.key === 'Backspace') {
        this.pointList.pop();
      }
      if (this.pointList.length === 6) {
        const moneyPwd = md5(this.pswInput);
        const pool_id = this.$route.query.pool_id;
        this.$http2.post('invest/financeApi/transferIn', { currency: 'USDT', moneyPwd: moneyPwd, value: this.value, pool_id: pool_id }, { needToken: true }).then(res => {
         
          this.msg = res.msg
          if (res.code === 200) {
            setTimeout(() => {
            this.showPassword = false;
            this.pointList.length = 0;
              window.app.closeWebView();
            }, 2000);
          }
        }).catch(error => {
          this.showPassword = false;
          this.pointList.length = 0;
        });
      }
    },
    // 载入
    handleLoadingClick() {
      if (this.agreementSrc === this.disagreeSrc) {
        this.$vux.toast.text('请先阅读并同意相关协议');
        return;
      };
      if(+this.total < this.$route.query.pool_min){
        this.reason = '余额不足，请充值';
        this.showToast = true;
        return
      }
      if (+this.value < this.$route.query.pool_min) {
        this.$vux.toast.text(`您的起投不足${this.$route.query.pool_min}，暂不能投`);
        return;
      }
      
      this.pswInput = '';
      this.pointList = [];
      this.showPassword = true;
    },
    // 切换是否同意协议
    switchAgreement() {
      if (this.agreementSrc === this.disagreeSrc) {
        this.agreementSrc = this.agreeSrc;
      } else {
        this.agreementSrc = this.disagreeSrc;
      }
    },
    // 点击免责声明
    handleAgreement(){
        let url = `${window.LocationURL}#/poolAgreement`;
        var jsonA = encodeURI(url);
        let obj = {
          title: " 用户协议",
          url: jsonA
        };
        window.app.openWebView(JSON.stringify(obj));
    },
    // 全部可用余额
    handleALlClick() {
      this.value = parseFloat(this.total).toFixed(2);
    },
    // 充值
    handleRechargeClick() {
        let page = terminal.android
          ? "activity.ReceiptMoneyActivity"
          : "AWSCollectionController";
        let obj = {
          page,
          coinName:"USDT"
        };
        window.app.interfaceJump(JSON.stringify(obj));
        this.showToast = false;
    },
  },
  mounted () {
    this.value = this.$route.query.pool_min
    this.pool_name = this.$route.query.pool_name
  },
  activated() {
    document.title = '购买理财包';
    this.agreementSrc = this.disagreeSrc;
    this.getListData();
    window.app.showShareIcon(false);
    window.app.getWebViewConfigUrlString(
      `${window.LocationURL}#/loadingRecord?pool_id=${this.$route.query.pool_id}`
    );
  },
  watch: {
    value(newVal){
      if (newVal < 0) {
        this.value = this.$route.query.pool_min;
      }
    }
  },
  computed: {
    loadingActive() {
      if (+this.value >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less">
  .investCalculate{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #04022C;
    .main{
      padding-top: 18px;
      .bandwidth_name{
        width: 345px;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        box-shadow: 6px -6px rgba(18,29,99,0.4);
        font-family:PingFangSC-Medium,PingFang SC;
        color:rgba(255,255,255,1);
        background:rgba(25,63,158,1);
        opacity:0.8;
        .icon{
          margin: 0 6px 0 16px;
          position: relative;
          top:7px;
          display: inline-block;
          width: 25px;
          height: 25px;
        }
      }
      .bandwidth{
        width: 345px;
        height: 159.5px;
        margin-top: 18px;
        padding: 0 10px 0 16px;
        box-shadow: 6px -6px rgba(41,71,183,0.4);
        background:rgba(27,72,173,1);
        opacity:0.8;
        .prompt{
          padding-top: 18px;
          font-size: 14px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
        .bandwidth_input{
          overflow: hidden;
          height: 74px;
          border-bottom: solid 1px  rgba(94,135,216,0.43);
          input{
            display:block;
            width: 319px;
            margin-top: 54.9px;
            color: rgba(255,255,255,1);
            background:rgba(27,72,173,1);
            opacity:0.8;
            font-size: 13px;
            outline: none;
            border: 0;
          }
          input::placeholder {
            color:rgba(99,123,188,1);
          }
        }
        .money{
          text-align: right;
          font-size: 13px;
          padding-top: 7.5px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          color:rgba(117,139,196,1);
          .all{
            width: 55px;
            height: 25px;
            border: 0;
            outline: none;
            margin-left: 6px;
            background:linear-gradient(90deg,rgba(0,199,255,1) 0%,rgba(1,107,254,1) 100%);
            border-radius: 12.5px;
            font-size: 12px;
            font-family:PingFang-SC-Medium,PingFang-SC;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
    .footer{
      width: 100%;
      margin-top: 171.5px;
      // margin: 0 auto;
      p{
        input{
          margin: 0 auto;
        }
      }
      .agreement{
        font-size: 14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(66,66,66,1);
        text-align: center;
        .agree{
          margin-right: 5px;
          display: inline-block;
          position: relative;
          top:5px;
          width: 20px;
          height: 20px;
        }
        a{
          text-decoration:none;
          color:rgba(16,142,233,1);
        }
      }
      .Loading{
        padding-left: 37.5px;
        margin-top: 12px;
        input{
          width:300px;
          height: 40px;
          border: 0;
          outline: none;
          display: block;
          background:linear-gradient(90deg,rgba(0,199,255,1) 0%,rgba(1,107,254,1) 100%);
          border-radius: 20px;
          font-size: 14px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight: 600;
          color:rgba(255,255,255,1);
        }
      }
    }
    .notLoading{
      margin-top: 12px;
      input{
        width:300px;
        height: 40px;
        border: 0;
        outline: none;
        display: block;
        background: rgba(86,104,152,1);
        border-radius: 20px;
        font-size: 14px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight: 600;
        color:rgba(140,153,189,1);
      }
    }
    .dialog-demo{
      .content {
        padding: 10px 0;
        height: 300px;

        .title {
          color: rgba(51,51,51,1);;
          font-size: 16px;
          font-weight: 500;
          line-height: 22.5px;
          padding: 0 48px;
        }

        .reason {
          margin-top: 76px;
          text-align: center;
          font-size:18px;
          font-weight:400;
          color:rgba(242,103,84,1);
          line-height:25px;
        }
        .btn{
          margin-top: 77px;
          height: 40px;
          .recharge {
            width:130px;
            height:40px;
            float: left;
            margin-left: 15px;
            line-height: 40px;
            background:rgba(94,135,216,1);
            border:1px solid rgba(94,135,216,1);
            border-radius:40px;
            font-size: 14px;
            color: rgba(255,255,255,1);
            margin-top: 10px;
            font-weight:600;
          }
          .close {
            width:130px;
            height:40px;
            float: left;
            margin-left: 10px;
            line-height: 40px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(94,135,216,1);
            border-radius:40px;
            font-size: 14px;
            color: rgba(94,135,216,1);
            margin-top: 10px;
            font-weight:600;
          }
        }
      }
      .password{
        padding: 10px 10px;
        height: 300px;
        .title {
          color: rgba(51,51,51,1);;
          font-size: 16px;
          font-weight: 500;
          line-height: 22.5px;
          padding: 0 48px;
        }
        .password-wrapper {
          margin-top: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          .input-box{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            color: transparent;
            opacity: 0;
            // width: 100%;
            // visibility: hidden;
          }
          .show-ul{
            flex: 1;
            display: flex;
            height: 50px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            .show-li{
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: 1px solid #ccc;
              &:last-child{
                border-right: none
              }
            }
          }
        }
        .prompt{
          font-size: 14px;
          text-align: right;
          margin-top: 8px;
          margin-right: 10px;
          color:rgba(94,135,216,1);
        }
      }
    }
  }
</style>
