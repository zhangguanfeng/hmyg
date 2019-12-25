<template>
  <van-nav-bar
    class="h-navbar"
    v-on="$listeners"
    v-bind="$attrs"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    :left-arrow="leftArrow">
    <slot name="right" slot="right"></slot>
    <slot name="title" slot="title"></slot>
  </van-nav-bar>
</template>
<script>
export default {
  props: {
    'left-arrow': {
      default: true,
    }
  },
  name: 'h-navbar',
  methods: {
    onClickLeft() {
      if (this.$listeners.backPage) {
        this.$emit('backPage');
        return;
      }
      this.$emit('beforeBack');
      this.$router.go(-1);
      this.$emit('onBack');
    },
    onClickRight() {
      this.$emit('onRight');
    }
  }
}
</script>
<style lang="scss">
  .h-navbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    box-shadow:0px 0px 11px 0px rgba(234,234,234,1);
    .van-nav-bar__title {
      color: #333333;
      font-weight: 500;
      font-size: 17px;
      font-family: PingFang-SC-Medium,PingFang-SC;
    }
    .van-nav-bar__arrow {
      color: #666;
      font-weight: 600;
      font-size: 20px;
    }
    .van-nav-bar__text {
      color: #5C5C5C;
    }
  }
</style>
