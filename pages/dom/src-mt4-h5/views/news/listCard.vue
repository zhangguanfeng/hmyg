/**
*  Created by   阿紫
*  On  2019/10/22
*  Content 新闻组件
*/
<template>
    <div class="listCard">
        <div class="content">
            <div class="title">
                {{list.title}}
            </div>
            <div class="time">
                {{list.newstime}}
            </div>
        </div>
        <img :src="list.titlepic" alt="">
    </div>
</template>
<script lang='ts'>
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component({})
    export default class ListCard extends Vue {
        @Prop()
        list: any
    };
</script>
<style lang='scss' scoped>
    .listCard {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px;
        &:nth-child(2n) {
            background: #F7F9FA;
        }

        img {
            width: 109px;
            height: 69px;
            margin-left: 10px;
        }

        .content {
            flex: 1;
            height: 69px;
            .title {
                font-size: 14px;
                color: #333;
                font-weight:600;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2; //规定几行显示省略号
                -webkit-box-orient: vertical;
            }
            .time {
                font-size: 12px;
                color: #999;
                margin-top: 17px;
            }
        }
    }
</style>
