<template>
  <!-- 活期理财规则 -->
  <div class="current-financial-rule">
    <div class="rule-block">
      <p class="rule-title">{{ $t('currentFinancialRule.intro.title') }}</p>
      <p class="rule-content">{{ $t('currentFinancialRule.intro.content[0]') }}</p>
      <p class="rule-content">{{ $t('currentFinancialRule.intro.content[1]') }}</p>
    </div>
    <div class="rule-block">
      <p class="rule-title">{{ $t('currentFinancialRule.rule.title') }}</p>
      <p class="rule-content">{{ $t('currentFinancialRule.rule.content[0]') }}</p>
      <p class="rule-content">{{ $t('currentFinancialRule.rule.content[1]') }}</p>
      <p class="rule-content">{{ $t('currentFinancialRule.rule.content[2]') }}</p>
    </div>
  </div>
</template>
<script>
import VueI18n from "vue-i18n";
export default {
  mounted() {
    let language = this.$route.query.lang;
    if (language === "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
    document.title = language === 'en' ? 'Current financial management rules' : '活期理财规则';
  }
};
</script>


<style lang="less" scoped>
.rule {
  &-block {
    margin-top: 18px;
    padding: 0 13px 0 19px;
    & + & {
      margin-top: 42px;
    }
  }
  &-title {
    margin-bottom: 18px;
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(79, 79, 79, 1);
    line-height: 21px;
  }
  &-content {
    font-size: 13px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(79, 79, 79, 1);
    line-height: 21px;
  }
}
</style>
