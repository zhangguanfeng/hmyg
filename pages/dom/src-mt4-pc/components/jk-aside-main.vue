/**
*  Created by   阿紫
*  On  2019-03-11
*  Content
*/
<template>
  <el-container class='jk-aside-main'>
    <el-aside width="200px">
      <jk-menu :activeIndex="activeIndex" :menuList="menuList" mode="vertical" @handleSelect="handleSelect"></jk-menu>
    </el-aside>
    <el-container>
      <el-main>
        <!--<transition>-->
          <keep-alive :exclude="/NotAlive$/">
            <router-view class="router-view"></router-view>
          </keep-alive>
        <!--</transition>-->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'jk-aside-main',
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    $route() {
      this.getActiveIndex();
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.$emit('handleSelect', key, keyPath);
    },
    getActiveIndex() {
      const curUrl = this.$route.path;
      this.menuList.forEach((item, index) => {
        if (item.menuUrl === curUrl) {
          this.activeIndex = `${index}` || '0';
        }
      });
    },
  },
  mounted() {
    this.getActiveIndex();
  },
};
</script>
<style lang="scss">
  .el-container.jk-aside-main {
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    /*max-height: calc(100vh - 60px);*/

    .el-aside {
      background-color: #F7F7F7;
    }

    .el-menu {
      border-right: none;

      .el-menu-item {
        font-size: 16px;
        color: #7A7A7A;

        &:hover {
          background-color: #fff;
        }
      }

      .el-menu-item:hover, .el-menu-item:focus {
        background-color: #fff;
      }

      .el-menu-item.is-active {
        font-size: 17px;
        position: relative;
        color: $color;

        &:hover, &:focus {
          background-color: #fff;
        }

        &:after {
          content: '';
          position: absolute;
          right: 0;
          width: 4px;
          height: 38px;
          top: 9px;
          background: $color;
        }
      }
    }

    .el-main {
      padding: 0 0 0px 20px;
    }
  }
</style>
