/**
*  Created by   阿紫
*  On  2019-03-11
*  Content 新闻动态
*/
<template>
  <div class='newsList'>
    <div class="section">
      <h2 class="section__header">
        <span class="el-icon-arrow-left" @click="$router.go(-1)"></span>
        {{titleArr[$route.query.type]}}
      </h2>
      <!-- 热点新闻使用滑动加载 -->
      <el-scrollbar class="infinite-list-wrapper newsList__content" v-if="this.filterForm.type===0">
        <div v-infinite-scroll='getList'
             style="padding-left: 20px;"
             infinite-scroll-disabled="disabled">
          <newsTemplate :list="list" @goDetail="goDetail"></newsTemplate>
        </div>
        <p v-if="loading" style="text-align: center;"><i class="el-icon-loading"></i> 加载中...</p>
        <p v-if="noMore" style="text-align: center;">没有更多数据了</p>
      </el-scrollbar>
      <!-- 区块链,投融资使用分页 -->
      <div v-else>
        <newsTemplate  :list="list" @goDetail="goDetail"></newsTemplate>
        <jk-pagination v-show="list.length>0&&+total>0"
                       @handleChange="getPaginationChange"
                       :total="+total"
                       :page-size="filterForm.pageSize"
                       :current-page="filterForm.page">
        </jk-pagination>
      </div>
    </div>

  </div>
</template>
<script>
  import infiniteScroll from 'vue-infinite-scroll'
  import newsTemplate from './news-template.vue'

  export default {
    name: 'news',
    components: {
      newsTemplate
    },
    directives: { infiniteScroll },
    data() {
      return {
        list: [],
        total: null,
        title: '热点新闻',
        titleArr: ['热点新闻', '区块链', '投融资'],
        filterForm: {
          pageSize: 10,
          page: 1,
          type: 0 // type默认设置为0,因为需要初始化热点新闻的下拉加载,不设置为0的话,则对应组件v-if改为v-show也可
        },
        loading: false,
        noMore: false,
        isError: false
      }
    },
    computed: {
      disabled() {
        return this.loading || this.noMore || this.isError
      }
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val
        this.filterForm.page = currentPage
        this.getList()
      },
      getList() {
        if (this.filterForm.type === 0) {
          this.loading = true
          this.filterForm.page += 1
          this.$http.post('home/news', this.filterForm).then((res) => {
            this.loading = false
            const { data } = res.data || []
            this.list = [...this.list, ...data]
            if (data.length < this.page_size) {
              this.noMore = true
            }
          }).catch((res) => {
            this.loading = false
            this.isError = true
          })
        } else {
          this.$http.post('home/news', this.filterForm)
            .then((res) => {
              this.list = res.data.data || []
              this.total = res.data.total
            })
        }
      },
      goDetail(id) {
        this.$router.push({
          name: 'newsdetail',
          query: {
            id,
            type: this.filterForm.type
          }
        })
      }
    },
    activated() {
      this.list = []
      this.filterForm.type = +this.$route.query.type
      if (this.filterForm.type === 0) {
        this.filterForm.page = 0
        this.getList()
      } else {
        this.filterForm.page = 1
        this.getList()
      }
    }
  }
</script>
<style lang="scss">
  .newsList {
    padding: 36px;
    background: #fff;

    .scrollbox {
      height: calc(100vh - 320px);
      overflow-y: scroll;
    }

    .section {
      &__header {
        font-size: 22px;
        margin-top: 20px;
        margin-bottom: 14px;
        text-align: left;

        .el-icon-arrow-left {
          margin-right: 10px;
          cursor: pointer;
          font-weight: bold;
        }
      }

      &__more {
        float: right;
        color: $color;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        margin-top: 5px;

        &__img {
          width: 8px;
          margin-left: 4px;
        }
      }
    }

    &__content {
      height: calc(100vh - 320px);

      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
</style>
