<template>
  <div class="proxy-wrap">
    <div class="filter">
      <div class="form-item">
        <img src="/img/date.png"  alt="">
        <van-field :border="true" clearable v-model="queryForm.keyword" placeholder="请输入编号/ID">
        </van-field>
      </div>
    </div>
    <div class="button">
      <span @click="queryData(true)">查询</span>
    </div>
    <div class="table">
      <vxe-table
        border
        :data="data"
        row-id="id"
        :tree-config="{lazy: true, children: 'children', hasChild: 'hasChildren', loadMethod: queryData}">
        <vxe-table-column fixed="left" field="node_no" width="150" title="编号" tree-node></vxe-table-column>
        <vxe-table-column field="user_email" title="Email"></vxe-table-column>
        <vxe-table-column field="ib_type" title="代理级别"></vxe-table-column>
      </vxe-table>
    </div>
    <van-pagination 
      v-model="page" 
      :total-items="total" 
      :items-per-page="rows"
      :show-page-size="3" 
      force-ellipses
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';


@Component
export default class extends Vue {
  protected total: number = 0;
  protected page: number = 1;
  protected rows: number = 30;
  protected pickerType: string = '';
  protected loading: boolean = false;
  protected data: any = [];
  protected queryForm: any = {
    dkeyword: '',
  };

  @Watch('page')
  pageChange() {
    this.queryData();
  }
  protected activated() {
    this.queryData();
  }
  protected deactivated() {

  }
  protected reloadExpandContent() {
    console.log(arguments)
  }
  protected queryData(target?: any): Promise<any> {
    const params: any = {
      ...this.queryForm,
    };
    let row: any = null;
    if (typeof target === 'boolean') {

    } else {
      row = target && target.row || null;
      if (target) {
        params.node_no = row.node_no;
      }
    }
    return new Promise( async (resolve: (arg?: any) => void, reject: () => void) => {
      const res: any = await this.$post('UserTree/index', params);
      if (res.code == 200) {
        const { result }: any = res;
        this.total = +result.total_count;
        result.data.map((el: any, idx: number) => {
          el.hasChildren = el.has_child == 111;
          el.children = [];
          el.id = this.$util.ramdonString();
        });
        if (row) {
          resolve(result.data);
        } else {
          const root: any = result.data.filter((el: any) => el.is_root == 111);
          if (root && root.length) {
            const data: any = [];
            const children: any = [];
            for (const v of result.data) {
              if (v !== root[0]) {
                data.push(v)
              }
            }
            root[0].children = data;
            result.data = root;
          }
          this.data = result.data;
        }
      } else {
        this.$notify({ type: 'danger', message: '请求数据失败' });
      }
    });
  }
}
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .proxy-wrap {
    @include wh();
    .button {
      width: calc(100% - 40px);
      @include flex(row, flex-end);
      span {
        padding: 5px 30px;
        background: #39C6B4;
        border-radius: 4px;
        color: #fff;
      }
      padding: 0 0 10px 20px;
    }
    .filter {
      width: calc(100% - 40px);
      padding: 5px 20px 0px 20px;
      .form-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .van-field {
          border: 1px solid rgba(230,230,230,1);
          padding: 5px 10px;
        }
        .text {
          flex: 1;
          text-align: center;
          color: #999;
        }
        >img {
          width: 20px;;
          padding: 0 10px 0 0;
        }
      }
    }
    .table {
      width: 100%;
      // overflow: auto;
      height: calc(100% - 135px);
      >div {
        // width: 1000px;
        height: 100%;;
        text-align: center;
      }
    }
  }
</style>