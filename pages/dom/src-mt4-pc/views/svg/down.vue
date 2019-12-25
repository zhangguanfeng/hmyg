<template>
  <div class="down-svg">
    <svg :width="width" :height="height" viewBox="2 2 8 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path :fill="fill" fill-rule="nonzero"  d="M4.8125,4.58466764 L6.1875,4.58466764 L6.1875,24.5846676 L4.8125,24.5846676 L4.8125,4.58466764 Z M5.5,1.54543045e-13 L11,5.20556363 L-3.28626015e-14,5.20556363 L5.5,1.54543045e-13 Z"></path>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      default: '100%',
    },
    height: {
      default: '100%'
    },
    fill: {
      default: '#ff392a'
    }
  }
}
</script>
<style lang="scss">
  .down-svg {
    padding-left: 3px;
    svg {
      transform: rotateZ(180deg) translateY(-3px);
    }
  }
</style>
