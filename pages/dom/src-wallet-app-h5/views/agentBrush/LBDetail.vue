/**
*  Created by   阿紫
*  On  2019/6/20 0020
*  Content LB详情
*/
<template>
  <div class='LBDetail'>
    <p>
      700mall智能挖矿主要采用免费“交易挖宝”模式，搭起项目方与用户之间合作沟通的桥梁，可为项目方促活数字生态建设与用户寻求时间变现的双向需求提供解决方案。项目以接单、邀请和代理3种方式激励用户参与交易挖宝，享受不同挖宝渠道带来的项目收益（以锚定人民币价值的恒定币SPO进行发放），同时这种新的激励体系，也将打造全新的钱包生态体系，助力数字经济可持续发展。
    </p>
    <h5>接单赚钱</h5>
    <p>挖宝员级别</p>
    <p>铜卡：充值保证金100美金，每周系统单量价值 ≤2000美金（以锚定人民币价值的恒定币SPO展示），按接单量0.1%返佣。</p>
    <p>银卡：充值保证金700美金，每周系统单量价值 ≤1.4万美金（以锚定人民币价值的恒定币SPO展示），按接单量0.2%返佣。</p>
    <p>金卡:充值保证金3000美金，每周系统单量价值 ≤6万美金（以锚定人民币价值的恒定币SPO展示），按接单量0.4%返佣。</p>
    <p>钻石卡：充值保证金1万美金，每周系统单量价值 ≤20万美金（以锚定人民币价值的恒定币SPO展示），按接单量0.5%返佣。</p>
    <h5>邀请赚钱</h5>
    <img class="previewer-demo-img" src="./LB-1.png" alt="" @click="show(0)">
    <h5>代理收益</h5>
    <img class="previewer-demo-img" src="./LB-2.png" alt="" @click="show(1)">
    <p>
      服务中心团队每单业务，提成业务佣金的0.03%
    </p>
    <p>
      收益结算方式：每日结算
    </p>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>
<script>
  import {Previewer, TransferDom} from 'vux';

  export default {
    name: "LBDetail",
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data() {
      return {
        list: [{
          msrc: 'https://sac-test.oss-cn-beijing.aliyuncs.com/img/2c0c96ce8d3b6e4189a3503982395720.png',
          src: 'https://sac-test.oss-cn-beijing.aliyuncs.com/img/2c0c96ce8d3b6e4189a3503982395720.png',
        },
          {
            msrc: 'https://sac-test.oss-cn-beijing.aliyuncs.com/img/713d3f2af279b5aa2e2f585d5b4d7c1c.png',
            src: 'https://sac-test.oss-cn-beijing.aliyuncs.com/img/713d3f2af279b5aa2e2f585d5b4d7c1c.png',
          }],
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      };
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index)
      },
    },
    activated() {
      document.title = '详情';
    }
  };
</script>
<style lang="less">
  .LBDetail {
    height: 100%;
    overflow-y: scroll;
    padding: 15px 15px 30px 15px;
    line-height: 23px;

    p {
      margin: 0;
      font-size: 13px;
    }

    h5 {
      font-size: 14px;
      font-weight: bold;
      margin: 10px 0;
    }

    img {
      width: 100%;
      margin: 10px 0;
    }
  }
</style>
