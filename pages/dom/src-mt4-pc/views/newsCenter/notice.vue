/**
*  Created by   阿紫
*  On  2019/11/9
*  Content 信息公告
*/
<template>
  <div class='notice'>
    <div
      class="list"
      v-for="(item,index) in list"
      :key="index"
      @click="goDetail(item.notice_id)"
    >
      <h3 class="title">{{item.notice_title}}</h3>
      <div class="date">{{item.add_time}}</div>
    </div>
    <jk-pagination v-if="list.length>0&&+total>0"
                   @handleChange="getPaginationChange"
                   :total="+total"
                   :page-size="filterForm.pageSize"
                   :current-page="filterForm.page">
    </jk-pagination>
  </div>
</template>
<script>
  export default {
    name: 'notice',
    data() {
      return {
        list: [],
        total: null,
        filterForm: {
          pageSize: 10,
          page: 1
        }
      }
    },
    methods: {
      getPaginationChange(val, currentPage) {
        this.filterForm.pageSize = val
        this.filterForm.page = currentPage
        this.getList()
      },
      getList() {
        this.$http.post('Home/getNotifations', this.filterForm)
          .then((res) => {
            this.list = res.data.data || []
            this.total = res.data.total_count
          })
      },
      goDetail(id) {
        this.$router.push({
          name: 'newsdetail',
          query: {
            id,
            type: 'notice'
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
  .notice {
    background: #fff;

    .list {
      cursor: pointer;
      padding: 15px;
      text-align: left;
      transition: all 0.2s linear;

      &:hover {
        box-shadow: 0 2px 2px 2px rgba(100, 100, 100, 0.2);
      }

      .title {
        font-size: 18px;
        color: #555555;
        font-weight: 500;
      }

      .date {
        text-align: right;
        color: #cbcbcb;
        font-size: 14px;
      }
    }
  }
</style>
