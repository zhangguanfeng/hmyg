<template>
  <div class="nodata">
    <div class="nodata-box">
      <img src="@/assets/nodata.png" alt />
      <p>暂无记录～</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "h-noDataImg"
};
</script>
<style lang="scss" scoped>
.nodata {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  .nodata-box {
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
    p {
      color: #989898;
    }
  }
}
</style>