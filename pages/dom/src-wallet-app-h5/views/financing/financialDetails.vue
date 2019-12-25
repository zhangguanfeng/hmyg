/**
*  Created by   阿紫
*  On  2019-01-10
*  Content 理财详情
*/
<template>
  <div class='financialDetails'>
    <NavBar
      :clickBack="clickBacks"
      :showRightText="true"
      :rightText="'分享'"
      :clickRigntText="clickRigntText"
      :title="title"
    />
    <div class="card">
      <div class="title">{{$t('financialDetails.card')[0]}}</div>
      <div class="earnings">{{details.rate*100?details.rate*100:'0'}}%</div>
      <div>
        <span v-for="(item,index) in details.tags" :key="index">{{item}}</span>
      </div>
    </div>
    <rules-com :value="rulesValue"></rules-com>
    <div class="buy">
      <button-com :name="$t('financialDetails.buy')" @click.native="goBuyNow"></button-com>
    </div>
  </div>
</template>
<script>
  import RulesCom from './rules-com';
  import ButtonCom from './button-com';
  import NavBar from './nav-com';

  export default {
    name: "financialDetails",
    components: {
      RulesCom,
      ButtonCom,
      NavBar
    },
    data() {
      return {
        details: {},
        rulesValue: {
          feature: [],
          month: 0,
        },
        title:''
      };
    },
    methods: {
      getFinanceProDetail() {
        const proId = this.$route.query.id;
        this.$http.post('/wallet/app/cloud/finance/open/getFinanceProDetail', {
          proId
        },{needToken:true}).then(res => {
          this.details = res.result;
          this.details.tags = res.result.tags.split(',');
          this.rulesValue.feature = res.result.feature.split(',');
          this.title = this.$i18n.locale === 'zh' ? res.result.name : '';
        })
      },
      onClick() {
      },
      goBuyNow() {
        const { coinName, name, id } = this.details;
        this.$router.push({
          name: 'financingBuy',
          query: {
            coinName,
            name,
            proId: id
          }
        })
      },
      clickRigntText(){
        alert('分享')
      },
      clickBacks(){
      window.closeWebView()
    },
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.getFinanceProDetail();
    }
  };
</script>
<style lang="less">
  .financialDetails {
    background: #F4F6FA;
    height: 100%;

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 126px;
      background: url('../../assets/img/financing/bg_1.png') no-repeat center / 100% 100%;
      color: #fff;

      .title {
        font-size: 12px;
        margin: 13px 0;
      }

      .earnings {
        font-size: 30px;
        line-height: 26px;
        margin-bottom: 20px;
      }

      span {
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        display: inline-block;
        border-radius: 21px;
        padding: 2px 8px;
        font-size: 12px;
        line-height: 20px;
        margin-right: 8px;
      }
    }

    .buy {
      position: fixed;
      bottom: 50px;
      width: 100%;
    }
  }
</style>
