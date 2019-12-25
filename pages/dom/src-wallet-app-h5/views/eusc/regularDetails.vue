/**
*  Created by   阿紫
*  On  2019/6/30 0030
*  Content EUSC合约定期详情
*/
<template>
    <div class='regularDetails'>
      <div class="center">
        <p>
          1. 注册EUSC上线的任何一家交易所、AlphaWallet钱包（以下简称：钱包）
        </p>
        <p>
          2. 在所注册的交易所购买价值大于100USDT的EUSC，把所购买的EUSC转至钱包地址。
        </p>
        <p>
          3. 钱包点击理财，存入100USD（充值额度上不封顶，以下暂称：本金），将转入钱包的EUSC数量折算USD汇率，展示可缴纳USD本金数额(100USD起)，激活账户。
        </p>
        <p class="gray">
          <span>【计息方式】</span>
        </p>
        <x-table style="font-size:13px;">
          <thead>
          <tr style="background-color: #8EB4E3; ">
            <th>定期时长（天）</th>
            <th>返息比例日结算</th>
            <th>返息比例月展示</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>活期</td>
            <td>0.3%</td>
            <td>9%</td>
          </tr>
          <tr>
            <td>10</td>
            <td>0.5%</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>30</td>
            <td>1.0%</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>60</td>
            <td>1.2%</td>
            <td>36%</td>
          </tr>
          <tr>
            <td>90</td>
            <td>1.4%</td>
            <td>42%</td>
          </tr>
          <tr>
            <td>180</td>
            <td>1.6%</td>
            <td>48%</td>
          </tr>
          </tbody>
        </x-table>
        <p class="gray">
          <span>【解约】</span>定存中途解约的客户，收取违约金，本金的10%。
        </p>
        <p class="gray">
          <span>说明：本金*10%=扣除违约金(同时扣除合约利差部分)</span>
        </p>
        <p class="gray">
          <span>【提币规则】</span>
        </p>
        <p>1. 提币时系统自动按交易时时汇率，把USD兑换成EUSC。</p>
        <p>2. 提币矿工费 1EUSC/次。</p>
        <p>3. 每个账号提取收益每天只限一次，超一次加收3%手续费。
定期到期后系统会自动提取到EUSC钱包。</p>
        <!-- <p class="gray">
          <span>说明：</span>若用户存入10000USD，选择30天定期理财，在29天时，提前取出，则按照10天利率计算收益，扣除他的违约利差，违约提出利率按实际存期的下一档次天数利率计算
        </p>
        <p style="font-weight: 600;">
          计算方式：（（10000*1%）*29天）（已获得）—（（10000*0.5%）* 29天）=1450（应该获得）
        </p>
        <p style="font-weight: 600;">
          最终到账=（10000-（10000*10%（违约金））-1450=7550
        </p>

        <p class="gray">
          <span>【提币规则】</span>
        </p>
        <p>
          1.提币需折算当前交易所EUSC价格，价格以USDT对标，进行最终核算
        </p>
        <p class="gray">
          <span>说明：</span>
          若7EUSC=1 USD，钱包充值700U EUSC，选择理财后，汇率折算为100 USD为理财本金，提币时价格上涨，1EUSC=2 元，则可提出数量为：350 EUSC，
          若价格下跌 ：1EUSC=0.5 元，则提出数量为：1400 EUSC
        </p>
        <p>
          2.提币矿工费1个币，每天一户提币超一次后加收手续费3%！
        </p>
        <p class="gray">
          <span>说明：</span> 若提币100USDT ，汇率换算EUSC后，扣除1一个EUSC为矿工费，若每天一户超一次后则：
        </p>
        <p style="font-weight: 600;">
          一次：100 USDT =700 EUSC - 1=699 EUSC（最终提币数量）
        </p>
        <p style="font-weight: 600;">
          超一次：100 USDT = 700 EUSC - （1+700*3%）=678 EUSC（最终提币数量）
        </p>
        <p style="font-weight: 600;">到期自动提取到云端钱包</p> -->
      </div>
      <div class="button">
        <div class="primary" @click="goDeposit">立即存入</div>
      </div>
    </div>
</template>
<script>
  import { XTable} from 'vux';

    export default {
        name: "regularDetails",
      components: {
        XTable
      },
      data() {
        return {
        };
      },
      methods: {
        goDeposit() {
          const obj = {
            page:'com.justtoken.wallet.activity.finance.contract.ContractFinanceRechargeActivity',
            id:  this.$route.query.id
          };
          window.app.interfaceJump(JSON.stringify(obj))
        },
        transferShareParams(inviteCode='', name=""){
          const obj = {
            title: '邀请好友',
            iconUrl: '',
            jumpUrl: `${LocationURL}/#/EUSCInviteLanding?inviteCode=${inviteCode}`,
            content:`Hi～我是${name}，邀请你一起存EUSC赚钱，存币收益超高。活期理财，定期理财，节点奖励，每日分红......助你财富自由，快来一起赚收益!`,
          }
          window.app.transferShareParams(JSON.stringify(obj));
        },
        getInviteShareInfo  ()  {
          this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res=>{
            const {inviteCode, name} = res.result.map;
            this.transferShareParams(inviteCode, name);
          })
        }
      },
      activated() {
        this.transferShareParams('', '');
        this.getInviteShareInfo();
        document.title = 'EUSC合约定期详情';
      }
    };
</script>
<style lang="less">
  .regularDetails {
    height: 100%;
    line-height: 28px;
    background: #F4F6FA;

    .vux-table {
      margin: 10px 0;
     border-top: 1px solid #C7C7C7;
     border-left: 1px solid #C7C7C7;
     border-right: 1px solid #C7C7C7;
    }
    .vux-table td:before, .vux-table th:before {
      border-bottom: 1px solid #4D4D4E;
    }
    .vux-table td:after, .vux-table th:after  {
      border-right: 1px solid #4D4D4E;
    }

    .center {
      padding: 15px 15px 30px 15px;
      background: #fff;
      overflow-y: scroll;
      height: calc(100vh - 70px);

      p {
        margin: 0;
        font-size: 13px;
        color: #333333;
      }

      .gray {
        color: #676767;
        font-size: 12px;

        span {
          font-weight: 600;
        }
      }

      img {
        width: 100%;
        margin: 10px 0;
      }
    }

    .button {
      background: #fff;
      position: absolute;
      height: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 50px;

      .primary {
        margin-top: 10px;
        background-color: #5E87D8;
        border-radius: 40px;
        color: #fff;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
