/**
*  Created by   阿紫
*  On  2019/4/4 0004
*  Content
*/
<template>
  <div class='notFound'>
    <div class="box">
      <img src="@/assets/404.png" alt="">
      <p @click="goBackHome">{{$t('common.backHome')}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'notFound',
  data() {
    return {};
  },
  methods: {
    goBackHome() {
      this.$router.push('/');
    },
  },
};
</script>
<style lang="scss">
  .notFound {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 399px;
      width: 762px;
    }

    p {
      color: #6779B6FF;
      font-size: 26px;
      cursor: pointer;
    }
  }
</style>
