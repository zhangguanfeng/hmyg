<!--
 * @Autor: Diskfan
 * @Date: 2019-08-08 13:36:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2019-08-13 18:15:28
 * @Description: 分页
 -->

<template>
  <el-pagination
    class="c-page"
    background
    v-bind="$attrs"
    :page-sizes="pageSizes"
    layout="total, prev, pager, next, jumper, sizes"
    v-on="$listeners"
  ></el-pagination>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CPage extends Vue {
  protected pageSizes: number[] = [20, 30, 50, 100, 200];
}
</script>
<style lang="scss">
  .c-page {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>