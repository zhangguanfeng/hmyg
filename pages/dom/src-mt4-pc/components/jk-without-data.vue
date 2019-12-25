/**
*  Created by   阿紫
*  On  2019-03-08
*  Content
*/
<template>
  <div class='jk-without-data'>
    {{title?title:$t('withoutData')[0]}}
    <i class="el-icon-refresh" v-if="isRefresh" @click="refresh"></i>
  </div>
</template>
<script>
export default {
  name: 'jk-without-data',
  props: {
    title: {
      type: String,
      default: '',
    },
    isRefresh: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    },
  },
};
</script>
<style lang="scss">
  .jk-without-data {
    height: calc(100vh - 60px - 500px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    @at-root .theme-dark & {
      color: #ccc;
    }
    .el-icon-refresh {
      cursor: pointer;
    }
  }
</style>
