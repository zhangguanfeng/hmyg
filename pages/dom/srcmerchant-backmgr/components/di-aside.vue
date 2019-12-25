
<template>
    <el-menu
            :default-active="activeIndex"
            class="di-aside"
            background-color="#373f74"
            text-color="#fff"
            router
            @select="handleSelect"
            active-text-color="#ffd04b">
        <el-menu-item
                v-for="(item, index) in menuList"
                :route="item.path"
                :index="`${item.key || index}`"
                :key="index"
        >
            <i :class="item.meta.icon"></i>
            <span slot="title"> {{item.meta.title}}</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
    import {appRouter} from '../router/router';

    export default {
        name: "di-aside",
        data() {
            return {
                activeIndex: '0',
                menuList: []
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$emit("handleSelect", key, keyPath);
            },
            // 设置当前菜单索引
            getActiveIndex() {
                const curUrl = this.$route.path;
                this.menuList.some((item, index) => {
                    if (curUrl.indexOf(item.path) > -1 && item.path !== "/") {
                        this.activeIndex = index + "" || "0";
                    }
                });
            },
        },
        mounted() {
            this.menuList = appRouter;
            this.getActiveIndex();
        }
    };
</script>
<style lang="scss">
    .di-aside {
        height: 100%;
    }
</style>
