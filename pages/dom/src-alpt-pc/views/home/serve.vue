<template>
  <div class="serve">
    <div class="index w">
      <h4>{{$t('home.serve_title')}}</h4>
      <p>{{$t('home.serve_text')}}</p>
      <div class="img"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
export default class Server extends Vue {}
</script>
<style lang="scss" scoped>
.serve{
  width: 100%;
  .w{
    width: 1200px;
    margin: 0 auto;
  }
  .index{
    text-align: center;
    color: #4FC7EB;

    h4{
      font-size: 32px;
    }
    p{
      font-size: 18px;
      padding: 10px 200px 40px 200px;
    }
    .img{
      width: 1114px;
      height: 630px;
      background: url('/img/home_serve1.png');
      background-size: 100% 100%;
    }
  }
}
</style>