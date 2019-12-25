<template>
    <router-view></router-view>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    .load-more {
        position: absolute;
        bottom: 3px;
        right: 1px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        text-align: center;
        z-index: 1;
        background: #F5F7F9;
    }
    .center-dialog {
        border-radius: 4px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%);
        .el-dialog__header {
            border-bottom: 1px solid #e8eaec;
            .el-dialog__title {
                font-size: 14px;
                color: #17233d;
                font-weight: 700;
            }
        }
        .el-dialog__body {
            padding: 10px 20px 10px 20px;
            color: #515a6e;
            font-size: 15px;
        }
        .el-dialog__footer {
            border-top: 1px solid #e8eaec;
            padding: 10px 20px 10px 20px;
        }
    }
    .filter {
        .el-row {
            width: 1000px;
            height: 50px;
            .el-col {
                width: 320px;
                .label {
                    display: inline-block;
                    width: 95px;
                    height: 100%;
                    text-indent: 2em;
                    user-select: none;
                    text-align: right;
                    -webkit-user-select: none;
                }
                .prop {
                    display: inline-block;
                    width: calc(100% - 95px);
                    height: 100%;
                    .el-date-editor {
                        width: 222px !important;
                    }
                }
            }
        }
    }
</style>