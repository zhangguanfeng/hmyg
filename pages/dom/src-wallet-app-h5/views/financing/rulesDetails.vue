/**
*  Created by   阿紫
*  On  2019-01-10
*  Content 规则详情
*/
<template>
  <div class='rulesDetails'>
    <span v-html="details"></span>
    <span v-html="rules"></span>
  </div>
</template>
<script>
  export default {
    name: "rulesDetails",
    data() {
      return {
        details: '',
        rules: ''
      };
    },
    methods: {
      getDate() {
        const { month } = this.$route.query;
        if (month == 0) {
          this.details = this.$t('rulesDetails')[0];
          this.rules = this.$t('rulesDetails')[1] + '无锁定期' + this.$t('rulesDetails')[2];
        } else {
          this.details = this.$t('rulesDetails')[3] + month + this.$t('rulesDetails')[4] + month + this.$t('rulesDetails')[5];
          this.rules = this.$t('rulesDetails')[1] + '锁定期' + month + this.$t('rulesDetails')[2];
        }
      }
    },
    activated() {
      const lang = this.$route.query.lang || 'zh';
      this.$i18n.locale = lang;
      this.getDate();
      // document.title = lang === 'zh' ? '' : '';
    }
  };
</script>
<style lang="less">
  .rulesDetails {
    padding: 20px;
    color: #4F4F4F;
    line-height: 21px;

    h4 {
      font-size: 15px;
      margin: 0 0 25px 0;
    }

    div {
      font-size: 13px;
      margin-bottom: 50px;
    }

    p {
      font-size: 13px;
    }

    .rules {
      li {
        font-weight: normal;
      }
    }

    ul {
      margin-top: 30px;

      li {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 25px;
      }
    }
  }
</style>
