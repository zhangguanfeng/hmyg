/**
*  Created by   阿紫
*  On  2019/10/22
*  Content 暂无数据
*/
<template>
    <div class='h-noData'>
       {{title}}
    </div>
</template>
<script>
    export default {
        name: "h-noData",
        props:{
            title:{
                type: String,
                default:'暂无数据'
            }
        },
        data() {
            return {};
        },
    };
</script>
<style lang="scss">
    .h-noData {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
