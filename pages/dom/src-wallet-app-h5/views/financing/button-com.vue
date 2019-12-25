/**
*  Created by   阿紫
*  On  2019-01-15
*  Content
*/
<template>
  <x-button type="primary" class="button-com">{{name}}</x-button>
</template>
<script>
  import { XButton } from 'vux';

  export default {
    name: "button-com",
    props: {
      name: String,
    },
    components: {
      XButton
    },
    data() {
      return {};
    },
  };
</script>
<style lang="less">
 .weui-btn.button-com {
    width: 260px;
    border-radius: 90px;
    font-size: 14px;
    font-weight: bold;
    padding: 5px;
    background: #5E87D8;
  }
 .weui-btn.button-com.weui-btn_primary:not(.weui-btn_disabled):active {
   background: #5E87D8;
 }
</style>
