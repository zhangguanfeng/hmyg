/**
*  Created by   阿紫
*  On  2019/10/23
*  Content 新闻详情
*/
<template>
    <div class='newsDetails'>
        <h-navbar title='新闻详情' @backPage="onClickLeft"/>
        <div class="title">
            <h5> {{details.title}}</h5>
            <div class="time">{{details.time}}</div>
        </div>
        <div class="content" v-html="details.content"></div>
        <div class="mzsm" v-html="details.mzsm"></div>
        <div class="login-box" v-if="!session">
            <span>限时福利,开户100%赠金</span>
            <van-button class="login-r" @click.native="openWebView('registed',{
             isClose:'true'
            })">立即开户
            </van-button>
        </div>
    </div>
</template>
<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';

    interface Details {
        title: string,
        time: string,
        content: string,
        mzsm: string
    }

    @Component({})
    export default class NewsDetails extends Vue {
        protected type: any = 0;
        protected id: any = '';
        protected session: any = '';
        protected details: Details = {
            title: '',
            time: '',
            content: '',
            mzsm: ''
        };

        protected getData() {
            this.$http.post('/home/newsDetails', {
                type: this.type,
                id: this.id
            }).then((res: any) => {
                const {title, newstime, newstext, mzsm} = res.data.data;
                this.details.title = title;
                this.details.time = newstime;
                this.details.content = newstext;
                this.details.mzsm = mzsm;
            })
        }

        protected onClickLeft() {
            window.closeWebView();
        }

        protected openWebView(to: string, query = {}) {
            const obj = {
                title: '',
                name: to,
                path: to,
                query,
            };
            window.openWebView(obj);
        }

        protected activated() {
            this.details = {
                title: '',
                time: '',
                content: '',
                mzsm: ''
            }
            this.type = this.$route.query.type
            this.id = this.$route.query.id
            this.getData()
            this.session = this.$util.token();
        }
    };
</script>
<style lang='scss'>
    .newsDetails {
        .title {
            padding: 56px 20px 10px 20px;
        }

        h5 {
            font-size: 20px;
            padding: 20px 0;
            color: #333;
            text-align: left;
            padding: 0;
            margin: 0 0 10px 0;
        }

        .time {
            font-size: 12px;
            color: #999;
            display: flex;
            justify-content: flex-end;
        }

        .content {
            padding: 10px 20px;
            font-size: 14px;
            color: #666;
            line-height: 24px;

            img {
                max-width: 100%;
                height: auto;
            }
        }

        .mzsm {
            border-top: 1px solid $border-color;
            padding: 10px 20px;
            font-size: 13px;
            line-height: 24px;
            color: #999;
        }

        .login-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(0, 0, 0, .7);
            position: fixed;
            bottom: 0px;
            width: calc(100vw - 40px);
            left: 0;
            height: 50px;
            color: #fff;
            padding: 0 20px;

            button {
                height: 32px;
                line-height: 32px;
                margin: 0;
                background: $color;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                font-size: 16px;
                color: #fff;
                padding: 0 18px;
            }

            span {
                font-size: 14px;
            }
        }
    }
</style>
