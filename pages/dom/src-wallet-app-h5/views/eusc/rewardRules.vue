/**
*  Created by   阿紫
*  On  2019/6/30 0030
*  Content 奖励规则
*/
<template>
  <div class='rewardRules'>
    <div class="center">
      <tab bar-active-color="#5E87D8" active-color="#5E87D8">
        <tab-item selected @on-item-click="onItemClick('1')">邀请奖励</tab-item>
        <tab-item @on-item-click="onItemClick('2')">节点奖励</tab-item>
        <tab-item @on-item-click="onItemClick('3')">其他奖励</tab-item>
      </tab>
      <div class="Invite" v-show="current==1">
        <p>成功邀请一个用户，可获得他充值本金合约生息奖励的100%</p>
        <p class="gray">例如：直接邀请户，为第一层级用户</p>
        <p>① 若A用户本金为1000，邀请B用户，B充值1000本金，B每日利息为3 USD，则A用户也可获得3USD。</p>
        <p>当A用户本金≥B用户本金，则：</p>
        <p>公式：A用户收益= （自身1000本金*（活期/定期）返息比例）+（B用户1000本金*（活期/定期）返息比例）</p>
        <p class="blod">例：自身：1000 * 1.0%（定期30天）+ B用户：1000 * 0.5%（定期10天）=15 USD /天</p>
        <p>② 若A用户本金为100，邀请B用户，B充值1000本金，B每日利息为3USD，则A只获得每日自身本金利息额的+1倍。</p>
        <p>当A用户本金"<"B用户本金，则：</p>
        <p>公式：A用户收益= （自身100本金*（活期/定期）返息比例）* 2 ）</p>
        <p class="blod">例：自身：100 * 1.0%（定期30天）* 2 = 2 USD/天</p>
        <p>邀请1层级用户：奖励=第1层级用户收益×100%</p>
        <p>邀请2层级用户：奖励=第2层级收益×30%</p>
        <p>邀请3层级用户：奖励=第3层级收益×20%</p>
        <p>邀请4层级用户：奖励=第4层级至第10层级收益×10%</p>
        <p class="blod">*第4层级必须邀请第五层级才享有第4层级到第10层级收益的10%</p>
        <p class="gray"><span>【复投股则】</span>动态奖励30%必须用于复投，且满100USD才能复投</p>
        <p class="gray"><span>说明： </span></p>
        <p class="gray">动态奖励：指除去自身持币生息模式以外的收益（推广奖励、节点奖励）（30%进入复投）</p>
        <p class="gray">复投：指需将收益30%用于本金存储，且需满100USD，即可提收益最大为70%（70%进入可用）</p>
        <p class="gray"><span>【结算方式】</span>日结</p>
        <p class="gray"><span>【提币规则】 </span></p>
        <p class="gray">1.提币需把可用USD按照交易所时时汇率兑换成EUSC</p>
        <p class="gray">2.提币矿工费1EUSC/次，每天一户提币超一次后加收手续费3%！</p>
        <!-- <p class="gray">定期到期自动提取到云端钱包</p> -->
        <!-- <p class="gray">1.提币需折算当前交易所EUSC价格，价格以USDT对标，进行最终核算</p>
        <p class="gray"><span>说明： </span>若7EUSC=1 USD，钱包充值700U EUSC，选择理财后，汇率折算为100 USD为理财本金，提币时价格上 涨，1EUSC=2
          元，则可提出数量为：350 EUSC，若价格下跌
          ：1EUSC=0.5 元，则提出数量为：1400 EUSC</p>
        <p class="gray">2.提币矿工费1个币，每天一户提币超一次后加收手续费3%！</p>
        <p class="gray"><span>说明： </span>若提币100USD ，汇率换算EUSC后，扣除1一个EUSC为矿工费，若每天一户超一次后则：</p>
        <p class="blod">一次：100 USDT=700 EUSC - 1=699 EUSC（最终提币数量）</p>
        <p class="blod">超一次：100 USD = 700 EUSC - （1+700*3%）=678 EUSC（最终提币数量）</p> -->
      </div>
      <div class="node" v-show="current==2">
        <p>个人存价值不低于1000 USD的币，否则无法享受节点奖励</p>
        <p>1. 节点说明：至少三个社区，最小社区储存价值不低于10000 USD的币，可升级初级节点。</p>
        <p class="blod">享受所有社区新增算力×5%</p>
        <p><span>说明：</span>社区指A用户邀请了B、C、D三位用户，B与B自己邀请的用户为一个社区，计算每个社区共计定额本金，例如B社区有三位用户，三位用户共计存入5000
          USD本金，B存入本金有6000USD，则B社区储存价值为11000USD，根据社区最小储存价值来设置节点级别。若为初级节点，则A用户可获得升级节点后，新增邀请用户产生的静态收益的（存币生息）* 5%</p>
        <x-table style="font-size:13px;">
          <thead>
          <tr style="background-color: #8EB4E3; ">
            <th>个人存储（USD）</th>
            <th>社区存储（USD）</th>
            <th>奖励（%）</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>初级节点（PN） ≥ 1000</td>
            <td>≥ 10000</td>
            <td>5</td>
          </tr>
          <tr>
            <td>高级节点（AN） ≥ 5000</td>
            <td>≥ 30000</td>
            <td>8</td>
          </tr>
          <tr>
            <td>超级节点（SN） ≥ 10000</td>
            <td>≥ 50000</td>
            <td>10</td>
          </tr>
          </tbody>
        </x-table>
        <p class="gray"><span>【复投股则】</span>动态奖励30%必须用于复投，且满100USD才能复投</p>
        <p class="gray"><span>说明： </span></p>
        <p>动态奖励：指除去自身持币生息模式以外的收益（推广奖励、节点奖励）（30%进入复投）</p>
        <p>复投：指需将收益30%用于本金存储，且需满100USD，即可提收益最大为70%（70%进入可用）</p>
        <p class="gray"><span>【结算方式】</span>日结</p>
        <p class="gray"><span>【提币规则】 </span></p>
        <p class="gray">1.提币需把可用USD按照交易所时时汇率兑换成EUSC</p>
        <p class="gray">2.提币矿工费1EUSC/次，每天一户提币超一次后加收手续费3%！</p>
        <!-- <p class="gray">定期到期自动提取到云端钱包</p> -->
        <!-- <p class="gray">1.提币需折算当前交易所EUSC价格，价格以USDT对标，进行最终核算</p>
        <p class="gray"><span>说明： </span>若7EUSC=1 USD，钱包充值700U EUSC，选择理财后，汇率折算为100 USD为理财本金，提币时价格上 涨，1EUSC=2
          元，则可提出数量为：350 EUSC，若价格下跌 ：1EUSC=0.5 元，则提出数量为：1400 EUSC</p>
        <p class="gray">2.提币矿工费1个币，每天一户提币超一次后加收手续费3%！</p>
        <p class="gray"><span>说明： </span>若提币100USD ，汇率换算EUSC后，扣除1一个EUSC为矿工费，若每天一户超一次后则：</p>
        <p class="blod">一次：100 USDT=700 EUSC - 1=699 EUSC（最终提币数量）</p>
        <p class="blod">超一次：100 USD = 700 EUSC - （1+700*3%）=678 EUSC（最终提币数量）</p> -->
      </div>
      <div class="other" v-show="current==3">
        <!-- <p class="gray"><span>【合约EUSC】  </span></p>
        <p class="gray"><span>规则： </span></p>
        <p class="gray">后台空投币USD给用户，按空投EUSC数量*1%，折算USD汇率 每日释放USD给本金账户（100填释放完毕）</p>
        <p class="gray"><span>【增持USD】  </span></p>
        <p class="gray"><span>规则： </span></p>
        <p class="gray">后台操作用户账户，可设置开启增持功能，开启后给用户打币USD，作为奖金池，用户邀请新用户后，新用户获得的动态收益利润，将会从奖金池中100%的再奖励给用户</p>
        <p class="gray"><span>说明： </span></p>
        <p class="gray">用户开启了增持USD，增持账户中有10W USD，A用户邀请B用户，B用户产生的动态收益（推广奖励+节点奖励）若为100 USD，则A用户也可以多获得100
          USD，（在原有收益基础上，在增加100%动态收益）</p> -->
        <p class="gray"><span>【全球排名奖励】  </span></p>
        <p class="gray"><span>规则： </span></p>
        <p class="gray"> 1.钱包注册用户，一个月内开通30天定期的用户数据，根据储存本金数额大小做排名，取前103名，每天更新排名，并进行每日奖励分红。</p>
        <p class="gray">2.奖励说明: 将开通定存30、60、90、180天以上的定存用户每日收益的总和，按照收益总和的百分比分配给对应排名用户。</p>
        <p class="blod">例如：30天以上定存用户收益总和为：</p>
        <p class="blod">10000USD，则</p>
        <p class="gray">第1名可获得：10000*3%=300USD</p>
        <p class="gray">第2名可获得：10000*2%=200USD </p>
        <p class="gray">第3名可获得：10000*1%=100USD</p>
        <p class="gray"> 第4-103名可共计获得：10000*10%=1000USD，每位用户可获得1000/100=10 USD</p>
        <x-table style="font-size:13px;">
          <thead>
          <tr style="background-color: #8EB4E3; ">
            <th>排名</th>
            <th>奖励（%）</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>3%</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2%</td>
          </tr>
          <tr>
            <td>3</td>
            <td>1%</td>
          </tr>
          <tr>
            <td>4-103</td>
            <td>10%</td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </div>
    <div class="button">
      <div class="primary" @click="goInviteFriends">立即邀请好友</div>
    </div>
  </div>
</template>
<script>
  import {XTable, Tab, TabItem, Sticky} from 'vux';

  export default {
    name: "rewardRules",
    components: {
      Tab,
      TabItem,
      Sticky,
      XTable
    },
    data() {
      return {
        current: '1'
      };
    },
    methods: {
      onItemClick(num) {
        this.current = num;
      },
      getInviteShareInfo() {
        this.$http2.post('/wallet/app/compstar/inviteShareInfo.do', {}, {needToken: true}).then(res => {
          const {inviteCode, name} = res.result.map;
          const obj = {
            title: '邀请好友',
            iconUrl: '',
            jumpUrl: `${LocationURL}/#/EUSCInviteLanding?inviteCode=${inviteCode}`,
            content: `Hi～${name?'我是'+name:''}，邀请你一起存EUSC赚钱，存币收益超高。活期理财，定期理财，节点奖励，每日分红......助你财富自由，快来一起赚收益!`,
          }
          window.app.shareLink(JSON.stringify(obj));
        })
      },
      goInviteFriends() {
        this.getInviteShareInfo();
      }
    },
    activated() {
      document.title = '奖励规则';
      window.app.showShareIcon(false);
    }
  };
</script>
<style lang="less" scoped>

  .rewardRules {
    height: 100%;
    line-height: 24px;
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

    .vux-table td:after, .vux-table th:after {
      border-right: 1px solid #4D4D4E;
    }

    .center {
      padding: 15px 15px 30px 15px;
      background: #fff;
      overflow-y: scroll;
      height: calc(100vh - 70px);

      .Invite, .node, .other {
        padding-top: 10px;
      }

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

      .blod {
        font-weight: 600;
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
