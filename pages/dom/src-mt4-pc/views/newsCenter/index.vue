/**
*  Created by   阿紫
*  On  2019-03-11
*  Content
*/
<template>
  <div class="newsIndex">
    <el-radio-group class="radio-group" v-model="newsType" size="large" @change="changeRadio">
      <el-radio-button label="newsinfo">新闻资讯</el-radio-button>
      <el-radio-button label="newsinfo/calenda">财经日历</el-radio-button>
      <el-radio-button label="newsinfo/notice">信息公告</el-radio-button>
    </el-radio-group>
    <keep-alive :exclude="/NotAlive$/">
      <router-view class="router-view"></router-view>
    </keep-alive>
  </div>

</template>
<script>
  export default {
    name: 'newsIndex',
    data() {
      return {
        newsType: 'newsinfo'
      }
    },
    methods: {
      changeNewsTitle() {
        this.newsType = 'newsinfo/notice'
      },
      changeRadio(val) {
        this.$router.replace(`/${val}`)
      }
    },
    created() {
      if (this.$route.path.indexOf('/calenda') !== -1) {
        this.newsType = 'newsinfo/calenda'
      } else if (this.$route.path.indexOf('/notice') !== -1) {
        this.newsType = 'newsinfo/notice'
      }
      this.$root.$on('changeNewsTitle', this.changeNewsTitle)
    },
    destroyed() {
      // clearInterval(this.timer);
      this.$root.$off('changeNewsTitle', this.changeNewsTitle)
    }
  }
</script>
<style lang="scss" scoped>
  .newsIndex {
    margin: 0 auto;
    max-width: 1200px;

    .radio-group {
      margin-top: 18px;
      margin-bottom: 18px;

      @include media(xs) {
        margin-top: 15px;
        margin-bottom: 5px;
      }

      /deep/ .el-radio-button__inner {
        width: 166px;
        height: 40px;
        border-color: $color;;
        width: 166px;
        font-size: 16px;
        color: $color;;
        outline: none;

        @include media(xs) {
          font-size: 14px;
          padding: 10px;
          height: 35px;
        }
      }

      /deep/ .el-radio-button:first-child .el-radio-button__inner {
        border-left: 1px solid $color;;
      }

      /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        color: #fff;
      }
    }
  }
</style>
