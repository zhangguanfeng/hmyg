/*
* @Author: dubbing
* @Content: 新闻动态列表内容子组件,父组件为newsCenter->news.vue
* @Date: 2019-08-27 15:40:44
* @Last Modified by: dubbing
* @Last Modified time: 2019-08-27 15:41:27
*/

<template>
    <div class="news-template">
        <div class="info-list">
          <div
            class="info-item"
            v-for="(item,index) in list"
            :key="index"
            @click="goDetail(item.id)"
          >
            <img
              v-if="item.coverImg"
              class="info-item__img"
              :src="item.coverImg"
              alt
            >
            <img
              v-else-if="item.titlepic"
              class="info-item__img"
              :src="item.titlepic"
              alt
            >
            <img v-else   class="info-item__img" src="../../assets/news/678-300.png" alt="">
            <div class="info-item__right">
              <h3 class="info-item__title">{{item.title}}</h3>
              <div class="info-item__content">{{item.smalltext || item.intro || item.content| htmlContent}}</div>
              <div class="info-item__date">{{item.publishTime || item.newstime}}</div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goDetail(id) {
      this.$emit('goDetail', id);
    },
  },
};
</script>
<style lang="scss">
.news-template{
    .info-list {
      .info-item {
        display: flex;
        height: 150px;
        transition: all 0.2s linear;
        cursor: pointer;
        padding: 15px 15px 15px 0;
        text-align: left;
        padding-left: 15px;
        margin-left: -15px;

        &:hover {
          box-shadow: 0 2px 2px 2px rgba(100, 100, 100, 0.2);
        }

        &__img {
          width: 250px;
          height: 150px;
        }

        &__right {
          flex: 1;
          padding-left: 25px;
        }

        &__title {
          margin: 0;
          font-size: 18px;
          color: #555555;
          font-weight: 500;
        }

        &__content {
          margin-top: 25px;
          color: #a4a9b3;
          font-size: 14px;
        }

        &__date {
          margin-top: 16px;
          color: #cbcbcb;
          font-size: 14px;
          text-align: right;
        }
      }
    }
}
</style>
