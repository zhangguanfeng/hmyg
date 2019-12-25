<template>
  <div class="EuscLog has-header">
    <h-navbar title="邀请明细" @backPage="onClickLeft" />
    <p class="inviteInfo">
      累计邀请人数：
      <span>{{totalCount}}人</span>
    </p>
    <div class="EuscLog-m">
      <div>
        <div class="EuscLog-two">
          <div>账号</div>
          <div>注册时间</div>
        </div>
        <van-list
          class="container"
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="getData"
          :immediate-check="false">
          <div class="inviteItem" v-for="(item,index) in data" :key="index">
            <div class="account">{{item.user_cell}}</div>
            <div class="date">{{item.add_time.replace(/\s.*$/, '').replace(/-/g, '/')}}</div>
          </div>
        </van-list>
      </div>
      <!-- <h-noDataImg v-else /> -->
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
interface IItem {
  add_time: string;
  user_cell: string;
  user_id: string;
}
@Component
export default class InviteDetails extends Vue {
  protected data: IItem[] = [];
  protected pageIndex: number = 0;
  protected pageSize: number = 30;
  protected totalCount: number = 0;
  protected loading: boolean = false;
  protected finished: boolean = false;
  protected error: boolean = false;
  protected onClickLeft() {
    window.closeWebView();
  }
  protected getData() {
    const postdata = {
      page: ++this.pageIndex,
      pageSize: this.pageSize,
    };
    this.$http.post('Agent/getInvidedUser', postdata).then(({ data: { data, total_count, total_page } }: any) => {
      this.totalCount = +total_count;
      if (data.length > 0) {
        data.forEach((e: any) => {
          this.data.push(e);
        });
      }
      this.finished = +total_page === this.pageIndex;
      this.loading = false;
      this.error = false;
    }).catch(() => {
      this.loading = false;
    });
  }
  protected activated() {
    this.data = [];
    this.getData();
  }
}
</script>
<style lang='scss'>
  .EuscLog {
    background: #f4f6fa;
    .inviteInfo {
      font-size: 14px;
      color: #666666;
      padding: 0 18px;
      line-height: 40px;
      margin: 0;
      span {
        color: #0064ff;
      }
    }
    .EuscLog-m {
      background: $bg-color;
      height: calc(100vh - 46px - 40px);
      overflow-y: scroll;
      .EuscLog-two {
        padding: 0 24.5px 0 48.5px;
        display: flex;
        background: #fff;
        line-height: 33px;
        justify-content: space-between;
        font-size: 12px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #a5a5a5;
        span {
          text-align: center;
          color: #a5a5a5;
          font-size: 14px;
          width: 40%;
          display: block;
        }
      }
      .container {
        .inviteItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px;
          line-height: 45px;
          border-bottom: 1px solid $border-color;
          background: #fff;
          .account {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .date {
            font-size: 11px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
      }
      .EuscLog-m-cn-nodata {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100% - 40px);
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
      .EuscLog-m-cn {
        height: calc(100%);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .two {
          li {
            display: flex;
            justify-content: space-between;
            padding: 7px 20px;
            border-bottom: 1px solid #e6e6e6;
            span {
              width: 40%;
              text-align: center;
              font-size: 13px;
              display: block;
            }
          }
        }
      }
    }
  }
</style>
