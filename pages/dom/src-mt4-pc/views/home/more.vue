/**
*  Created by   阿紫
*  On  2019-03-05
*  Content 查看更多
*/
<template>
  <span id="more" @click="goMore">{{$t('more')}}
    <img v-if="isBlack" src="@/assets/userCenter/more.png" alt="affiche">
    <img v-else src="@/assets/userCenter/more.png" alt="affiche"></span>
</template>
<script>
export default {
  name: 'more',
  props: {
    isBlack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    goMore() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss">
  #more {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    color: $color;

    img {
      width: 8px;
      height: 14px;
    }
  }
</style>
