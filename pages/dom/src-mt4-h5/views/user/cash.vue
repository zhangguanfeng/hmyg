/**
*  Created by   阿紫
*  On  2019/10/24
*  Content 出金&入金
*/
<template>
  <div class="cash">
    <h-navbar right-text="明细" @backPage="backPage" @onRight="$router.push({name:'cashDetails'})">
      <div slot="title" class="header-title">
        <van-tabs type="card" v-model="tabsActive" @click="onTabsClick">
          <van-tab title="入金" name="golden"></van-tab>
          <van-tab title="出金" name="gold"></van-tab>
        </van-tabs>
      </div>
    </h-navbar>
    <div class="content" v-if="tabsActive==='golden'">
      <van-cell-group class="content-input">
        <van-field
          type="number"
          v-model="amount"
          center
          :error="isError"
          @input="change"
          placeholder="请输入金额"
        >
          <span slot="right-icon">{{currency}}</span>
        </van-field>
      </van-cell-group>
      <div class="exchange">
        <span>当前汇率≈{{exchange}}</span>
        <span :class="{tips:isError}">限额：{{min_deposit}}~{{max_deposit}}</span>
      </div>
      <div class="default-parameters">
        <van-row>
          <van-col span="8" v-for="(item,index) in regular" :key="index">
            <span @click="onchange(item)">{{item}}{{currency}}</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="form" v-else>
      <div class="form-title">出金信息</div>
      <div class="all-box">
        <div class="form-box">
          <span class="label">出金金额(美金)：</span>
          <span class="prop">
            <van-field
              type="number"
              v-model="amount"
              clearable
              :error="isError"
              @input="change"
              placeholder="请输入金额"
            />
          </span>
        </div>
        <div class="right-tips" :class="{tips:isError}">
          当前账户余额：
          <span>${{balance}}</span>
        </div>
        <div class="form-box">
          <span class="label">手续费(美金)：</span>
          <span class="prop">
            <van-field readonly v-model="expense" disabled="disabled" />
          </span>
        </div>
        <div class="right-tips">
          当前汇率：
          <span>{{exchange}}</span>
        </div>
      </div>
    </div>
    <van-cell
      v-if="tabsActive==='gold'"
      title="到账银行卡"
      is-link
      class="bank"
      arrow-direction="down"
      @click="isBankList=true"
      :value="bank"
    />
    <van-button
      v-if="tabsActive=='golden'"
      :loading="loading"
      loading-text="立即入金"
      class="btn"
      type="primary"
      :disabled="isDisabled"
      @click="commonBtnMethods"
      size="large"
    >立即入金</van-button>
    <van-button
      v-if="tabsActive=='gold'&&bankList.length>0"
      :loading="loading"
      loading-text="提交申请"
      class="btn"
      type="primary"
      :disabled="isDisabled"
      @click="commonBtnMethods"
      size="large"
    >提交申请</van-button>
    <div v-if="tabsActive=='gold'&&bankList.length==0">
      <div class="bank-tips">您需要绑定到银行卡才可以发起出金申请</div>
      <van-button class="btn" type="primary" @click="goBild" size="large">去绑定</van-button>
    </div>
    <van-action-sheet v-model="isBankList" title="选择到账银行卡">
      <van-radio-group v-model="radioBank">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in bankList"
            :key="index"
            clickable
            @click="exchanBank(item)"
            :title="`${item.bank_name}(${item.bank_last})`"
          >
            <van-radio slot="right-icon" :name="item.bank_id" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="addCard" @click="goBild">+使用新的卡收款</div>
    </van-action-sheet>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Dialog } from "vant";

@Component({})
export default class Cash extends Vue {
  protected tabsActive: string = "gold";
  protected amount: any = "";
  protected isError: boolean = false;
  protected isDisabled: boolean = true;
  protected currency: string = "USD";
  protected exchange: string = "6.8";
  protected min_deposit: any = null;
  protected max_deposit: any = null;
  protected regular: any = [];
  protected deposit_code: any = ""; //入金方式
  // 出金
  protected balance: any = 0; // 当前账户余额
  protected expense: any = null; // 手续费
  protected bankList: any = []; // 银行卡列表
  protected bank: any = ""; // 选中的银行卡
  protected radioBank: any = ""; // 选中的
  protected account_status: any = "111"; // 111 已实名  其它未实名
  protected isBankList: boolean = false;
  protected loading: boolean = false;

  // 返回
  backPage() {
    window.closeWebView();
  }

  // tabs 切换
  onTabsClick() {
    this.amount = "";
    this.isError = false;
    this.isDisabled = false;
    if (this.tabsActive === "gold") {
      // 出金
      this.getBank();
      this.getWithdrawInfo();
      this.$router.push({
        name: "cash",
        query: {
          type: "gold"
        }
      });
    } else {
      this.getDepositWay(); // 入金
      this.$router.push({
        name: "cash",
        query: {
          type: "golden"
        }
      });
    }
  }

  onchange(num: any) {
    this.amount = num;
    this.isDisabled = false;
  }

  change() {
    if (!this.amount) return;
    if (this.tabsActive === "golden") {
      if (
        +this.amount < +this.min_deposit ||
        +this.amount > +this.max_deposit
      ) {
        this.isError = true;
        this.isDisabled = true;
      } else {
        this.isError = false;
        this.isDisabled = false;
      }
    } else {
      // 出金
      if (+this.amount > +this.balance) {
        this.isError = true;
        this.isDisabled = true;
      } else {
        this.isError = false;
        this.isDisabled = false;
      }
    }
  }

  commonBtnMethods() {
    if (this.loading) return;
    this.loading = true;
    if (this.tabsActive == "golden") {
      //入金
      const postData = {
        amount: this.amount,
        deposit_code: this.deposit_code
      };
      this.$http
        .post("/Assets/depositData", postData)
        .then((res: any) => {
          const obj = {
            title: "",
            url: res.redict_url
          };
          window.openWebView(obj);
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      if (this.account_status == "110") {
        this.loading = false;
        Dialog.alert({
          message: "实名审核中，请耐心等待"
        }).then(() => {
        });
        return;
      }
      if (this.account_status == "101") {
        this.loading = false;
        Dialog.confirm({
          message: "实名认证审核失败,请重新认证"
        }).then(() => {
          const obj = {
            name: "authentication",
            path: "authentication"
          };
          window.openWebView(obj);
        });
        return;
      }
      if (this.account_status != "111") {
        this.loading = false;
        Dialog.confirm({
          message: "请先实名认证"
        }).then(() => {
          const obj = {
            name: "authentication",
            path: "authentication"
          };
          window.openWebView(obj);
        });
        return;
      }
      //出金
      const postData = {
        amount: this.amount,
        bank_id: this.radioBank
      };
      this.$http
        .post("/Assets/withdrawData", postData)
        .then((res: any) => {
          this.$dialog
            .alert({
              title: "提示",
              message: "出金申请已提交，请耐心等待如有疑问，请联系咨询客服"
            })
            .then(() => {
              // on close
            });
          this.amount = "";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  // 选则银行卡
  exchanBank(res: any) {
    this.isBankList = false;
    this.radioBank = res.bank_id;
    this.bank = `${res.bank_name}(${res.bank_last})`;
  }

  goBild() {
    this.$router.push({
      name: "addCard"
    });
  }

  // 入金
  getDepositWay() {
    this.$http.get("/Assets/getDepositWay").then((res: any) => {
      const {
        max_deposit,
        min_deposit,
        currency,
        exchange,
        regular
      } = res.data;
      this.min_deposit = min_deposit;
      this.max_deposit = max_deposit;
      this.currency = currency;
      this.exchange = exchange;
      this.regular = regular.split(",");
    });
  }

  // 出金

  getBank() {
    this.$http.post("/Assets/getBank").then((res: any) => {
      this.bankList =
        res.data.filter((item: any) => +item.bank_status === 111) || [];
      this.bank = `${this.bankList[0].bank_name}(${this.bankList[0].bank_last})`;
      this.radioBank = this.bankList[0].bank_id;
    });
  }

  getWithdrawInfo() {
    this.$http.get("/Assets/getWithdrawInfo").then((res: any) => {
      const { balance, exchange, expense, account_status } = res.data;
      this.balance = balance;
      this.expense = expense;
      this.exchange = exchange;
      this.account_status = account_status;
    });
  }

  activated() {
    if (this.$route.query.type == "golden") {
      this.getDepositWay(); // 入金
      this.tabsActive = "golden";
    } else {
      // 出金
      this.getBank();
      this.getWithdrawInfo();
      this.tabsActive = "gold";
    }
  }
}
</script>
<style lang='scss' scoped>
.cash {
  background: $bg-color;
  height: 100%;

  .header-title {
    margin-top: 7px;

    /deep/ .van-tabs__nav--card {
      border-color: $color;

      .van-tab.van-tab--active {
        background: $color;
        color: #fff;
      }

      .van-tab {
        color: $color;
        border-right-color: $color;
      }
    }
  }

  .content {
    padding-top: 66px;
    background: #fff;
    padding: 66px 20px 0 20px;

    &-input {
      .van-cell {
        border: 1px solid $border-color;
        border-radius: 4px;
        padding: 5px 10px;
      }

      /deep/ .van-field__right-icon {
        border-left: 1px solid $border-color;
      }
    }

    .exchange {
      font-size: 13px;
      color: #666;
      line-height: 33px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;

      .tips {
        color: #ee0a24;
      }
    }

    .default-parameters {
      padding: 20px 0 40px 0;

      span {
        display: inline-block;
        border: 1px solid $color;
        color: $color;
        border-radius: 4px;
        width: 100px;
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }

  .form {
    padding-top: 56px;
    display: flex;
    flex-direction: column;
    background: #fff;

    .all-box {
      padding-top: 10px;
    }

    .enter-numbox {
      margin: 10px 20px;
      border: 1px solid #c8c4c4;
      border-radius: 7px;
      height: 33px;
      line-height: 33px;
      display: flex;
      padding: 2px 0;

      span {
        width: 85px;
        text-align: center;
        border-left: 1px solid #c8c4c4;
        font-size: 14px;
        color: #333333;
      }
    }

    .rate {
      padding-left: 33px;
      margin: 0 0 15px;
      color: #666;
      font-size: 12px;
    }

    .enter-list {
      ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        li {
          width: 25%;
          text-align: center;
          color: #0064ff;
          font-size: 14px;
          border: 1px solid #0064ff;
          border-radius: 3px;
          height: 33px;
          line-height: 33px;
          margin-bottom: 20px;
        }

        .active-li {
          color: #fff;
          background: #0064ff;
        }
      }
    }

    .form-title {
      color: #10326b;
      font-size: 15px;
      font-weight: 500;
      padding-left: 1em;
      border-bottom: 1px solid #f4f3f3;
      padding: 10px 1em;
      margin: 0;
    }

    .form-box {
      width: 100%;
      display: flex;
      height: 40px;
      line-height: 40px;
      margin: 5px 0;

      .label {
        width: 140px;
        text-indent: 1em;
        color: #7f7f7f;
        font-size: 14px;
      }

      .prop {
        width: calc(100% - 173px);
        padding: 0 0px 0 10px;

        .van-cell {
          border: 1px solid $border-color;
          border-radius: 4px;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
    }

    .right-tips {
      color: #7f7f7f;
      font-size: 12px;
      text-align: right;
      padding-right: 25px;
      margin-bottom: 20px;

      span {
        color: #16325d;
      }
    }

    .tips {
      color: #ee0a24;

      span {
        color: #ee0a24;
      }
    }
  }

  .bank {
    margin-top: 30px;
  }

  .btn {
    background: $color;
    border: none;
    margin: 50px 20px 0 20px;
    height: 42px;
    line-height: 42px;
    width: calc(100vw - 40px);
  }

  .bank-tips {
    width: 100%;
    height: 100px;
    color: #ee0a24;
    font-size: 12px;
    text-align: center;
    line-height: 100px;
  }

  .van-action-sheet__content {
    max-height: 400px;

    .van-radio-group {
      max-height: 320px;
      overflow-y: scroll;
      padding-bottom: 10px;
    }

    .addCard {
      margin: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: $color;
      border-radius: 4px;
      border: 1px dashed $color;
    }
  }
}
</style>
