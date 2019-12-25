/**
*  Created by   阿紫
*  On  2018-12-12
*  Content 免责及责任限制声明
*/
<template>
  <div class='disclaimer'>
    <header>
      <p v-html="$t('disclaimer.header')[0]"></p>
      <p v-html="$t('disclaimer.header')[1]"></p>
    </header>
    <main>
      <p v-for="(item,index) in $t('disclaimer.main')" v-html="item" :key="index"
         :class="{title:/^(0|8|15|16|17|22|23|24|25|26|27|28)/.test(index)}"></p>
    </main>
  </div>
</template>
<script>
  export default {
    name: "disclaimer",
    data() {
      return {};
    },
    // methods: {
    //   switchLang() {
    //     this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh';
    //   }
    // },
    activated() {
      document.title = this.$t(this.$route.query.name).title;
    }
  };
</script>
<style lang="less">
  .disclaimer {
    background: #F4F6FA;
    padding: 20px;
    line-height: 24px;

    header {
      font-size: 14px;
      color: #494949;
      font-weight: bold;
    }

    main {
      color: #323232;
      font-size: 12px;
    }

    p {
      margin: 0;
    }

    .title {
      margin-top: 20px;
    }
  }
</style>
