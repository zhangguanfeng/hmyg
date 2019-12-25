<template>
    <div class="matter">
        <el-form ref="form" :model="filter" label-width="40px" label-position="left" size="mini" inline>
            <el-form-item label="日期">
                <el-date-picker v-model="filter.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="账号">
                <el-input placeholder="搜索账号" v-model="filter.account"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input placeholder="搜索昵称" v-model="filter.nickName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="primary">清空</el-button>
            </el-form-item>
        </el-form>

        <h4 class="title">平台账号</h4>
        <div class="platform-account">
            <Table :data="platformData" :columns="platformColumns" size="mini"  />
        </div>

        <h4 class="title">用户账号</h4>
        <div class="user-account">
            <Table :data="userData" :columns="userColumns" />
        </div>
    </div>
</template>
<script>
import Table from '../../common/table.vue'
import Columns from '../../common/columns'
export default {
    name: 'matter',
    data () {
        return {
            platformData: [],
            platformColumns: Columns.platformAccount,
            userData: [],
            userColumns: Columns.userAccount,
            filter: {
                account: '',
                nickName: '',
                date: new Date()
            }
        }
    },
    methods: {
        getData (flag) {
            if (flag === true) {

            }
        }
    },
    components: { Table }
}
</script>
<style lang="less">
.header-text() {
    font-size: 16px;
    font-weight: 600;
    color: #515a6e;
    user-select: none;
    -webkit-user-select: none;
    padding: 10px 0;
}
.matter {
    height: calc(100% - 30px);
    padding: 10px;
    .platform-account {
        height: calc(100% - 400px)
    }
    .user-account {
        height: calc(100% - 600px)
    }
    .title {
        .header-text()
    }
    .label {
        display: inline-block;
        width: 60px;
    }
    .prop {
        display: inline-block;
        width: calc(100% - 60px);
        max-width: 220px;
    }
}
</style>