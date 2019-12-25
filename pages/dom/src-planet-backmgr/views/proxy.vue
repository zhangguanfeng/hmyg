<template>
  <div class="proxy-wrap">
    <div class="filters">
      <div class="form-item">
        <label for="order_no">
          编号/ID:
        </label>
        <BInput placeholder="按照编号/ID 查询" style="width: 200px" size="small" id="keyword" v-model="queryForm.keyword"/>
      </div>
      <div class="form-item">
        <el-button type="primary" v-loading="loading" class="button primary-btn" @click="queryData()" size="small">查询</el-button>
      </div>
    </div>
    <el-table
      height="calc(100% - 40px)"
      :data="data"
      row-key="id"
      lazy
      :load="queryData"
      ref="table"
      @row-click="rowClick"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="编号" prop="node_no"></el-table-column>
      <!-- <el-table-column label="姓名" prop="user_name"></el-table-column> -->
      <el-table-column label="Email" prop="user_email"></el-table-column>
      <el-table-column label="代理级别" prop="ib_type"></el-table-column>
    </el-table>
    <BPage
      :total="total"
      :current-page="page"
      :page-size="rows"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Page from '@/mixin/page.js';

@Component({
  mixins: [ Page ],
})
export default class Proxy extends Vue {
  protected loading: boolean = false;
  protected data: any = [];
  protected queryForm: any = {
    keyword: '',
  };
  protected rowClick(row: any) {
    let elem: any = (window as any).event.toElement;
    while(elem && elem.nodeName.toUpperCase() != 'TR') {
      if (!elem) {
        return
      }
      elem = elem.parentNode;
    }
    try {
      elem.querySelector('.el-icon-arrow-right').click();
    } catch(e) {}
    // (this as any).$refs.table.toggleRowExpansion(row, true);
  }
  protected async queryData(tree?: any, treeNode?: any, resolve?: (arg?: any) => void) {
    const params: any = {
      ...this.queryForm,
    };
    if (tree) {
      params.node_no = tree.node_no;
    }
    const res: any = await this.$post('UserTree/index', params);
    if (res.code == 200) {
      const { result }: any = res;
      this.total = +result.total_count;
      result.data.map((el: any, idx: number) => {
        el.hasChildren = el.has_child == 111;
        el.children = [];
        el.id = this.$util.ramdonString();
      });
      if (tree && resolve) {
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
      this.$message.error('请求数据失败');
    }
    this.loading = false;
  }
  protected created(){
    this.queryData();
  }
 }
</script>
<style lang="scss">
  @import '@/style/mixin.scss';
  .proxy-wrap {
    @include wh();
    @include flex(column, flex-start);
    .el-table {
       * {
        font-size: 12px !important;
        color: #666;
      }
    }
    .filters {
      width: 100%;
      min-height: 40px;
      @include flex(row, flex-start);
      flex-wrap: wrap;
      .form-item {
        label {
          width: 90px;
          padding: 5px 6px;
          text-align: right;
          font-size: 14px;
        }
        padding: 5px 0;
        @include flex();
        .button {
          margin-left: 20px;
          padding: 8px 30px;
        }
      }
    }
  }
</style>