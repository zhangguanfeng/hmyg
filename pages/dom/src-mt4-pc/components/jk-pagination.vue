/**
*  Created by   阿紫
*  On  2019-03-08
*  Content
*/
<template>
  <el-pagination
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :page-size="pageSize"
    :current-page="currentPage"
    :total="total">
  </el-pagination>
</template>
<script>
export default {
  name: 'jk-pagination',
  model: {
    event: 'change',
  },
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    total: Number,
  },
  data() {
    return {
      pageSizes: [this.pageSize, 2 * this.pageSize, 3 * this.pageSize],
      currentPageSize: this.pageSize,
    };
  },
  methods: {
    handleCurrentChange(currentVal) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.$emit('handleChange', this.currentPageSize, currentVal);
    },
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.$emit('handleChange', val, 1);
    },
  },
};
</script>
