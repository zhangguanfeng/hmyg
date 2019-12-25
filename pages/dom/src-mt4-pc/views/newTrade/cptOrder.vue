/**
*  Created by   阿紫
*  On  2019/9/11 0011
*  Content 订单
*/
<template>
  <div class='cptOrder'>
    <el-tabs v-model="activeName" tab-position="left" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="first" label="持">
        <div slot="label">持</div>
        <modify-order :ticker="ticker" :maxHeight="orderHeight"></modify-order>
      </el-tab-pane>
      <el-tab-pane name="second" label="挂">
        <div slot="label">挂</div>
        <pending-order :maxHeight="orderHeight"></pending-order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import modifyOrder from './modifyOrder.vue'
  import pendingOrder from './pendingorder.vue'

  export default {
    name: 'cptOrder',
    components: {
      modifyOrder,
      pendingOrder
    },
    props: {
      ticker: {},
      orderHeight: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick() {
        if (this.activeName == 'first') {
          this.$root.$emit('getPendingOrder')
        } else {
          this.$root.$emit('getLimitStopOrder')
        }
      }
    }
  }
</script>
<style lang="scss">
  .cptOrder {
    font-family: PingFang-SC-Medium;
    display: flex;
    flex-direction: column;
    height: 100%;

    ::-webkit-scrollbar {
      background: #efefef;
    }

    ::-webkit-scrollbar-thumb {
      background: #c0c0c0;
    }

    :root .theme-dark & {
      ::-webkit-scrollbar {
        background: #262A3E;
      }

      ::-webkit-scrollbar-thumb {
        background: #30375A;
      }
    }

    .el-table {
      thead {
        color: #b1b2b5;
      }

      .cell {
        text-align: center;
      }

      th {
        background-color: #FFFFFF;
      }
    }

    .el-tabs {
      height: 100%;
      position: relative;

      .el-tabs__header {
        width: 40px;
      }

      .el-tabs__item {
        color: #697797;
        font-size: 13px;
        text-align: center;
        height: 50px;
        padding-left: 0;
        padding-right: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        div {
          height: 22px;
          width: 22px;
          line-height: 22px;
          border-radius: 22px;
          border: 1px solid #697797;
        }
      }

      .el-tabs__item.is-active {
        color: $color;

        div {
          height: 26px;
          width: 26px;
          line-height: 26px;
          border-radius: 26px;
        }
      }

      .el-tabs__content {
        padding: 0;
      }
    }

    .more {
      font-size: 12px;
      color: $color;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 11px;
      z-index: 4;
      width: 24px;
      height: 24px;

      .cell & {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  .el-scrollbar {
    padding-bottom: 15px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
    margin-bottom: -11px !important;
    margin-right: -29px !important;
    user-select: none;
  }

  .el-scrollbar__bar.is-vertical {
    width: 0;
    top: 0;
  }

  .el-scrollbar__bar.is-horizontal {
    height: 0;
    left: 0;
  }

  .el-drawer__container {
    .el-drawer__header {
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #DEDEDE;

      span {
        color: #555;
      }
    }
  }

  :root .theme-dark {
    .more {
      color: #BAC7ED;
    }

    .el-table {
      color: #B4C5F7;

      thead {
        color: #434F6A;
      }

      th {
        background-color: #1B1F31;
      }

      tr {
        background-color: $color-dark-bg;
      }

      th.is-leaf, td {
        border-bottom: 1px solid #434F6A;
      }

      .hover-row {
        td {
          background-color: #1B1F31;
        }
      }

      .el-tag {
        background: #5171d2;
        border-color: #5171d2;
        color: #fff;
      }
    }

    .el-tabs--border-card {
      background: $color-dark-bg;
      border-color: #434F6A;
    }

    .el-tabs--border-card > .el-tabs__header {
      background: #1B1F31;
    }

    .el-tabs--left.el-tabs--border-card .el-tabs__header.is-left {
      border-right-color: #434F6A;
    }

    .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
      &.is-active {
        background-color: $color-dark-bg;
        border-bottom-color: #434F6A;
        border-top-color: #434F6A;
        color: #BAC7ED;

        div {
          border-color: #BAC7ED;
        }
      }

      &:hover {
        color: #BAC7ED;

        div {
          border-color: #BAC7ED
        }
      }
    }

    .el-drawer {
      background: $color-dark-bg;

      .el-scrollbar__wrap {
        overflow-x: hidden;
        margin-bottom: -1px !important;
      }
    }

    .el-drawer__header {
      border-bottom: 1px solid #434F6A;

      span {
        color: #BAC7ED;
      }
    }

    .el-scrollbar__bar {
      display: none;
    }

    .el-popover {
      background: $color-dark-bg;
      border-color: #434F6A;
      color: #576590;

      .popper__arrow {
        border-right-color: #434F6A;

        &::after {
          border-right-color: $color-dark-bg;
        }
      }

      .el-button--text {
        color: #576590;
      }

      .el-button--primary {
        background: #5171d2;
        border-color: #5171d2;
        color: #fff;
      }
    }

    .closeOrder {
      .el-dialog {
        background: $color-dark-bg;

        .el-dialog__header {
          border-bottom-color: #434F6A;

          .el-dialog__title {
            color: #B4C5F7;
          }
        }

        .close .volume {
          span {
            color: #7e8cb5;
          }
        }

        .close .list .label {
          color: #7e8cb5;
        }

        .close .list .val {
          color: #B4C5F7;
        }

        .el-dialog__close {
          &:hover {
            color: #B4C5F7;
          }
        }

        .el-button {
          background: #5171d2;
          border-color: #5171d2;
          color: #fff;
        }
      }
    }

    .el-table__fixed-right-patch {
      background: #1B1F31;
      border-bottom-color: #434F6A;
    }

    .el-message-box {
      background: $color-dark-bg;
      border-color: #434F6A;

      .el-message-box__title {
        color: #576590;
      }

      .el-message-box__content {
        color: #B4C5F7;
      }

      .el-button {
        background: $color-dark-bg;
        border-color: #434F6A;
        color: #B4C5F7;
      }

      .el-button--primary {
        background: #5171d2;
        border-color: #5171d2;
        color: #fff;
      }
    }

    .el-table__fixed::before, .el-table__fixed-right::before {
      background: #434F6A;
    }
    .el-table--group::after, .el-table--border::after, .el-table::before {
      background: #434F6A;
    }
    .el-table__empty-block {
      background: $color-dark-bg;
    }
    .el-pager li {
      background: $color-dark-bg;
    }
    .el-pagination button:disabled {
      background: $color-dark-bg;
      color: #7e8cb5;
    }
    .el-pagination__total {
      color: #7e8cb5;
    }
  }
</style>
