/**
*  Created by   阿紫
*  On  2019-01-14
*  Content 规则组件
*/
<template>
  <div class='rules-com'>
    <group>
      <cell :title="$t('financialDetails.rules')[0]" :value="$t('financialDetails.rules')[1]" @click.native="onClick"
            is-link></cell>
      <cell-box class="rules">
        <div>{{$t('financialDetails.rules')[2]}}</div>
        <div>{{$t('financialDetails.rules')[3]}}</div>
      </cell-box>
    </group>
    <group>
      <cell :title="$t('financialDetails.productHighlights')[0]"></cell>
      <cell-box class="productHighlights">
        <ul>
          <li v-for="(item,index) in value.feature" :key="index">· {{item}}</li>
        </ul>
      </cell-box>
    </group>
  </div>
</template>
<script>
  import { Cell, CellBox, Group } from 'vux';

  export default {
    name: "rules-com",
    components: {
      Group,
      Cell,
      CellBox,
    },
    props: {
      value: {
        type: Object,
        default: () => {
        },
      },
    },
    data() {
      return {};
    },
    methods: {
      onClick() {
        this.$router.push({
          name: 'rulesDetails',
          query: {
            month: this.value.month,
            lang: this.$i18n.locale
          }
        })
      }
    }
  };
</script>
<style lang="less">
  .rules-com {
    .weui-cells {
      max-width: 500px;
      margin: 8px auto 0 auto;

      .vux-label {
        color: #666666;
        font-weight: bold;
        font-size: 15px;
      }

      .weui-cell__ft {
        color: #5E87D8;
        font-size: 13px;
        font-weight: bold;

        &:after {
          border-color: #5E87D8;
        }
      }

      .vux-cell-box {
        flex-direction: column;
        align-items: normal;
        font-size: 13px;
        color: #9BA8BB;
        line-height: 18px;
        padding-top: 10px;
        padding-bottom: 20px;

      }
    }

    .rules {
      div:last-child {
        margin-top: 20px;
      }
    }

    .productHighlights {
      ul {
        list-style: disc;
        line-height: 25px;
        padding-left: 20px;
      }
    }
  }
</style>
