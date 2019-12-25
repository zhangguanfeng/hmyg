/**
*  Created by   阿紫
*  On  2019/11/6
*  Content 客服
*/
<template>
    <div class='service'>
        <h-navbar title='在线客服' @backPage="onClickLeft"/>
        <iframe id="service" :src="url" seamless width="100%" :height="height"></iframe>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Service extends Vue {
    protected url: any = '';
    protected height: any = '';

    protected onClickLeft() {
      window.closeWebView();
    }

    protected callService() {
      this.url = `https://html.ecqun.com/kf/sdk/openwin.html?corpid=8579385&cstype=rand&mode=0&cskey=j6GngpqRUhpmVjKhHw&scheme=2`;
    }

    protected activated() {
      this.callService();
      this.height = window.innerHeight;
    }

  };
</script>
<style lang='scss'>
    .service {
        height: calc(100vh);
        overflow-y: hidden;
        .van-nav-bar {
            height: 50px;
            line-height: 50px;
        }
        #service {
            border: none;
        }
    }
</style>
