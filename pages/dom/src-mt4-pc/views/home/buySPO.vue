/**
*  Created by   阿紫
*  On  2019/6/28 0028
*  Content
*/
<template>
  <div class='buySPO'>
    <go-back></go-back>
    <div v-if="!isBuy">

    </div>
    <div class="boughted" v-else>
      <h1>
        <i class="el-icon-success"></i>
        {{$t('buySPO.boughted[0]')}}
      </h1>
      <p>
        {{$t('buySPO.boughted[1]')}}Instanex
        <span ref="codeCopy" class="btn" @click="copySuccess" data-clipboard-text="Instanex">{{$t('buySPO.title[10]')}}</span>
      </p>
      <h3> {{$t('buySPO.boughted[2]')}}</h3>
      <ul class="center">
        <li>
          <span class="label">{{$t('buySPO.boughted[3]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[4]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[5]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[6]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[7]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[8]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[9]')}}</span>
          <span class="value">122</span>
        </li>
        <li>
          <span class="label">{{$t('buySPO.boughted[10]')}}</span>
          <span class="value">122</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';

export default {
  name: 'buySPO',
  data() {
    return {
      isBuy: false,
    };
  },
  methods: {
    copySuccess() {
      this.$message({
        message: this.$t('partner[17]'),
        type: 'success',
      });
    },
  },
  activated() {
    const { codeCopy } = this.$refs;
    new Clipboard(codeCopy);
  },
};
</script>
<style lang="scss">
  .buySPO {
    background: #fff;
    width: 1080px;
    margin: 130px auto 30px;
    padding: 20px;

    .boughted {
      h1 {
        color: #27305C;
        font-size: 28px;
        margin: 0;

        i {
          color: rgb(103, 194, 58);
        }
      }

      p {
        font-size: 16px;
        color: #27305C;

        span {
          color: #0064FF;
          font-size: 16px;
          cursor: pointer;
        }
      }

      h3 {
        margin: 40px 0 0 0;
        color: #27305C;
        padding-bottom: 20px;
        font-size: 24px;
        border-bottom: 1px solid #D4D6DE;
      }

      ul {
        width: 500px;
        margin: 0 auto;
        padding: 30px 0 50px 0;

        li {
          font-size: 20px;
          border-bottom: 1px dashed #D4D6DE;
          line-height: 56px;
          padding: 0 15px;
          display: flex;
          justify-content: space-between;

          .label {
            color: #7F7F7F;
          }

          .value {
            color: #27305C;
          }
        }
      }
    }
  }
</style>
