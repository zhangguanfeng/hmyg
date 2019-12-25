/**
*  Created by   阿紫
*  On  2018-12-16
*  Content 消息推送
*/
<template>
  <div class='push_message_details'>
      <div v-html="details"></div>
  </div>
</template>
<script>
  export default {
    name: "push_message_details",
    data() {
      return {
        details: "",
        params: {}
      };
    },
    methods: {
      getPageInfo() {
        const { id } = this.params;
        this.$http.post('cloud/backmgr/page/open/getPageInfo', {
          id
        }).then(res => {
          const { appPageInfo } = res.result;
          this.details = appPageInfo.content;
          document.title = appPageInfo.title;
        })
      }
    },
    activated() {
      this.params = this.$route.query;
      this.getPageInfo();
      // const lang = this.$route.query.lang || 'zh';
      // this.$i18n.locale = lang;
    },
  };
</script>
<style lang="less">
  .push_message_details {
  }
</style>
