/**
*  Created by   阿紫
*  On  2019-03-11
*  Content
*/
<template>
  <el-menu
    class="jk-menu"
    :default-active="activeIndex"
    :mode="mode"
    router
    @select="handleSelect"
  >
    <el-menu-item
      v-for="(item, index) in menuList"
      v-if="!item.hidden"
      :route="item.menuUrl"
      :index="`${item.key || index}`"
      :key="index"
    >{{item.menu}}</el-menu-item>
  </el-menu>
</template>
<script>


export default {
  name: 'jk-menu',
  props: {
    activeIndex: {
      type: String,
      default: '0',
    },
    mode: {
      type: String,
      default: 'horizontal',
    },
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit('handleSelect', key, keyPath);
    },
  },
};
</script>
<style lang="scss">
.jk-menu {
}
</style>
