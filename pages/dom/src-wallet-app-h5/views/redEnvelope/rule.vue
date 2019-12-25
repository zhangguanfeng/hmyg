/**
*  Created by   阿紫
*  On  2018-12-18
*  Content
*/
<template>
  <div class='rule'>
    <h4>{{$t('getRedEnvlp.rule')[0]}}</h4>
    <div>
      <p>{{$t('getRedEnvlp.rule')[1]}}</p>
      <p>{{$t('getRedEnvlp.rule')[2]}}</p>
      <p>{{$t('getRedEnvlp.rule')[3]}}</p>
      <p>{{$t('getRedEnvlp.rule')[4]}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "redEnvelopeRule",
    data() {
      return {};
    },
  };
</script>
<style lang="less">
  .rule {
    padding-bottom: 20px;
    color: #969696;
    h4 {
      font-size: 14px;
      text-align: center;
      margin: 0 0 15px 0;
    }

    div {
      width: 370px;
      margin: 0 auto;

      p {
        margin: 0;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
  @media (min-width: 340px) and (max-width: 380px) {
    .rule div {
      width: 320px;
    }
  }
  @media (max-width: 340px) {
    .rule {
      h4 {
        margin-bottom: 10px;
      }

      div {
        width: 300px;

        p {
          font-size: 13px;
        }
      }
    }
  }
</style>
