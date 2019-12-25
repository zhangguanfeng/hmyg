<template>
  <div class="investCalculate">
    <div class="main">
      <div class="bandwidth_name"><img alt="icon" class="icon" src="../../assets/img/cyberPlanetl/home_icon.png"/>{{pool_name}}</div>
      <div class="bandwidth">
        <div class="prompt">
          <span :class="selete? 'selete' : ''" @click="handleSeleteclick('0')">提取理财包</span>
          <span :class="selete? '' : 'selete'" @click="handleSeleteclick('1')">提取收益</span>
        </div>
        <div class="bandwidth_input">
          <input type="text" v-model="money"  @input="money=inputFloat(money)" @blur="inputBlur" placeholder="请输入提取数量"/>
          <span class="currency">{{selete ? 'USDT' : 'SALPT'}}</span></div>
        <div class="money">
          <span>可用余额：{{total}} {{selete ? 'USDT' : 'SALPT'}}</span>
          <input class="all" type="button" @click="handleALlClick" value="全部">
        </div>
      </div>
      <div class="transaction">
        <p>手续费：1 {{selete ? 'USDT' : 'SALPT'}}</p>
        <p>到账：{{ money > 1 ? Math.floor((+money - 1)*100)/100 : '0' }} {{selete ? 'USDT' : 'SALPT'}}</p>
      </div>
    </div>
    <!-- 解锁按钮 -->
    <div class="footer">
      <p v-if="unlockActive" class="unlock">
        <input class="active_btn" @click="handleUnlockClick" type="button" value="提取">
      </p>
      <p v-if="!unlockActive" class="unlock">
        <input class="inactive_btn" type="button" value="提取">
      </p>
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
import md5 from 'js-md5';
import { inputFloat } from '@/common/unti.js';

export default {
  name: 'extractCalculate',
  data() {
    return {
      token: '',
      selete: true,
      showToast: false,
      showPassword: false,
      pswInput: '',
      pointList: [],
      total: '',
      salptTotal: '',
      usdtTotal: '',
      pool_name: '',
      money: '',
      reason: '',
      msg: '',
      hasRecharge: false
    }
  },
  mounted() {
    this.pool_name = this.$route.query.pool_name;
  }, 
  methods: {
    inputBlur() {
      // total
      if(+this.money == 0){
        return
      }
      if ( +this.money > +this.total ) {
        this.$vux.toast.text(`可提${this.selete ? 'USDT' : 'SALPT'}不足`);
          this.money = parseFloat(+this.total)
      } else if (+this.money < 1.01) {
        this.$vux.toast.text(`提取数量须大于1.01${this.selete ? 'USDT' : 'SALPT'}`);
        this.money = (0);
      }
      this.money = parseFloat(this.money);
    },
    inputFloat(val) {
      val = inputFloat(val);
      return val;
    },
    // 获取可用余额
    getListData() {
      
      this.$http2.post('invest/financeApi/currencyType',{
        pool_id: this.$route.query.pool_id
      },{ needToken: true }).then(res => {
        this.total = res.result[1].value;
        this.salptTotal = res.result[0].value;
        this.usdtTotal = res.result[1].value;
      })
    },
    // 切换带宽和能量
    handleSeleteclick(selete) {
      if (selete === '0') {
        this.selete = true;
        this.money = this.usdtTotal;
        this.total = this.usdtTotal;
      }
      if (selete === '1') {
        this.selete = false;
        this.money = this.salptTotal;
        this.total = this.salptTotal;
      }
    },
    // 输入密码
    inputNumber(res) {
      if (this.pointList.length < 6 && res.key !== 'Backspace') {
        this.pointList.push('●');
      }
      if (res.key === 'Backspace') {
        this.pointList.pop();
      }
      if (this.pointList.length === 6) {
        const moneyPwd = md5(this.pswInput);
        const currency = this.selete? 'USDT' : 'SALPT';
        const pool_id = this.$route.query.pool_id;
        this.$http2.post('invest/financeApi/transferOut', { currency: currency, moneyPwd: moneyPwd, value: Math.floor((+this.money)*100)/100, pool_id: pool_id }, {needToken: true }).then(res => {
          this.msg = res.msg;
          if (res.code === 200) {
            setTimeout(() => {
          this.showPassword = false;
          this.pointList.length = 0;
              window.app.closeWebView();
            }, 2000);
          }
        }).catch(error => {
          this.pointList.length = 0;
          this.showPassword = false;
        });
      }
    },
    // 提取
    handleUnlockClick() {
      if (this.money <= 0) {
        this.reason = '请输入提取数量';
        this.showToast = true;
        return;
      }
      if (Number(this.money) > Number(this.total)) {
        this.reason = '提取数量大于可用余额';
        this.showToast = true;
        return;
      };
      this.pswInput = '';
      this.pointList = [];
      this.showPassword = true;
    },
    // 全部可用余额
    handleALlClick() {
      this.money = +this.total;
    }
  },
  activated() {
    document.title = '提取';
    this.getListData();
    window.app.showShareIcon(false);
    window.app.getWebViewConfigUrlString(
      `${window.LocationURL}#/unlockRecord?pool_id=${this.$route.query.pool_id}`
    );
  },
  computed: {
    unlockActive() {
      if (this.money > 1) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>

<style lang="less">
  .investCalculate{
    width: 100%;
    height: 100%;
    background: #04022C;
    .main{
      padding-left: 12px;
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
        padding: 0  10px 0 16px;
        box-shadow: 6px -6px rgba(41,71,183,0.4);
        background:rgba(27,72,173,1);
        opacity:0.8;
        .prompt{
          padding-top: 18px;
          font-size: 14px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          font-weight:500;
          color:rgba(99,123,188,1);
          span{
            margin-right: 18px;
          }
          .selete{
            color:rgba(255,255,255,1);
            border-bottom: solid 1px rgba(0,189,255,1);
            border-radius: 1.25px;
          }
        }
        .bandwidth_input{
          overflow: hidden;
          height: 74px;
          border-bottom: solid 1px  rgba(94,135,216,0.43);
          position: relative;
          input{
            display:block;
            width: 319px;
            margin-top: 53.5px;
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
          .currency{
            position: absolute;
            right: 0;
            bottom:0;
            font-size: 13px;
            font-family:PingFang-SC-Medium,PingFang-SC;
            color:rgba(255,255,255,1);
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
      .transaction{
        padding-right: 28px;
        p{
          height: 18.5px;
          text-align: right;
          font-size: 13px;
          margin-top: 6px;
          font-family:PingFang-SC-Medium,PingFang-SC;
          color:rgba(85,97,129,1);
          line-height: 18.5px;
        }
      }
    }
    .footer{
      width: 100%;
      margin-top: 154.5px;
      .unlock{
        padding-left: 37.5px;
        margin-top: 12px;
        .active_btn{
          width: 300px;
          height: 40px;
          border: 0;
          outline: none;
          display: block;
          background:linear-gradient(90deg,rgba(0,199,255,1) 0%,rgba(1,107,254,1) 100%);
          border-radius: 20px;
          font-size: 14px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(255,255,255,1);
        }
        .inactive_btn{
          width: 300px;
          height: 40px;
          border: 0;
          outline: none;
          display: block;
          background:rgba(86,104,152,1);
          border-radius: 20px;
          font-size: 14px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(255,255,255,1);
        }
      }
    }
    .dialog-demo {
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
