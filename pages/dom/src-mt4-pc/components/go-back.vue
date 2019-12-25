/**
*  Created by   阿紫
*  On  2019/4/22 0022
*  Content 返回
*/
<template>
  <div class='go-back'>
     <span class="back" @click="$router.go(-1)">
            <i class="el-icon-arrow-left"></i>{{$t('common.back')}}
     </span>
  </div>
</template>
<script>
export default {
  name: 'go-back',
  data() {
    return {};
  },
};
</script>
<style lang="scss">
  .go-back {
    padding-bottom: 22px;
    text-align: left;

    .back {
      cursor: pointer;
      color: #313131;
      font-size: 16px;
      display: flex;
      align-items: center;

      img {
        margin-right: 6px;
        width: 11px;
        height: 16px;
      }
    }
  }
</style>
