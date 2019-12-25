<template>
  <!-- 私隐保护 -->
  <div class="privacy">
    <div class="box-lj">
      <h4 class="h4-1">{{$t('privacy.content[0]')}}</h4>
      <div class="box-inner">
        <p class="pp">{{$t('privacy.content[1]')}}</p>
        <h3 class="hh">{{$t('privacy.content[2]')}}</h3>
        <p class="pp">{{$t('privacy.content[3]')}}</p>
        <p class="pp">{{$t('privacy.content[4]')}}</p>
        <p class="pp">{{$t('privacy.content[5]')}}</p>
        <p class="pp">{{$t('privacy.content[6]')}}</p>
        <p class="pp">{{$t('privacy.content[7]')}}</p>
        <p class="pp">{{$t('privacy.content[8]')}}</p>
        <h3 class="hh">{{$t('privacy.content[9]')}}</h3>
        <p class="pp">{{$t('privacy.content[10]')}}</p>
        <p class="pp">{{$t('privacy.content[11]')}}</p>
        <p class="pp">{{$t('privacy.content[12]')}}</p>
        <p class="pp">{{$t('privacy.content[13]')}}</p>
        <p class="pp">{{$t('privacy.content[14]')}}</p>
        <p class="pp">{{$t('privacy.content[15]')}}</p>
        <p class="pp">{{$t('privacy.content[16]')}}</p>
        <p class="pp">{{$t('privacy.content[17]')}}</p>
        <h3 class="hh">{{$t('privacy.content[18]')}}</h3>
        <p class="pp">{{$t('privacy.content[19]')}}</p>
        <h3 class="hh">{{$t('privacy.content[20]')}}</h3>
        <p class="pp">{{$t('privacy.content[21]')}}</p>
        <p class="pp">{{$t('privacy.content[22]')}}</p>
        <p class="pp">{{$t('privacy.content[23]')}}</p>
        <p class="pp">{{$t('privacy.content[24]')}}</p>
        <p class="pp">{{$t('privacy.content[25]')}}</p>
        <p class="pp">{{$t('privacy.content[26]')}}</p>
        <p class="pp">{{$t('privacy.content[27]')}}</p>
        <p class="pp">{{$t('privacy.content[28]')}}</p>
        <h3 class="hh">{{$t('privacy.content[29]')}}</h3>
        <p class="pp">{{$t('privacy.content[30]')}}</p>
        <h3 class="hh">{{$t('privacy.content[31]')}}</h3>
        <p class="pp">{{$t('privacy.content[32]')}}</p>
      </div>
    </div>
    <div class="childFooter">
      <div class="newfooter">{{$t('privacy.content[33]')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'privacy',
};
</script>


<style lang="scss" scoped>
  .privacy {
    overflow: hidden;
    background: #2A293E;
  }

  .box-lj {
    background: #fff;
    max-width: 1100px;
    width: 80%;
    margin: 60px auto;
    border-radius: 2px;
    padding: 20px 30px;
    text-align: left;
  }

  .h4-1 {
    height: 50px;
    line-height: 50px;
    color: #333;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 20px;
    padding: 0 20px;
  }

  .pp {
    line-height: 30px;
    color: #666;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
  }

  .box-inner {
    margin: 20px;
  }

  .hh {
    font-size: 20px;
    color: #666;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px
  }

  .childFooter {
    width: 100%;
    background: #0D1539;
    text-align: center;
    bottom: 0px;
  }

  .newfooter {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 1);
    height: 55px;
    text-align: center;
    line-height: 55px;
    font-size: 12px;
  }
</style>
