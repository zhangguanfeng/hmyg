/**
*  Created by   阿紫
*  On  2019/11/6
*  Content 投资学堂
*/
<template>
    <div class='school'>
        <h-img class="banner" src="/img/school/school_1.png"></h-img>
        <h-img class="title" src="/img/school/school_2.png"></h-img>
        <div class="column">
            <h-img @click="openWebView('新手指南','guide')" src="/img/school/school_3.png"></h-img>
            <h-img @click="openWebView('金融词汇','financial')" src="/img/school/school_4.png"></h-img>
        </div>
        <h-img class="title" src="img/school/school_5.png"></h-img>
        <div class="advanced">
            <h-img @click="openWebView('基础入门','introductory')" src="/img/school/school_6.png"></h-img>
            <h-img @click="openWebView('技术分析','technology')" src="/img/school/school_7.png"></h-img>
            <h-img @click="openWebView('资金管理','management')" src="/img/school/school_8.png"></h-img>
        </div>
        <h-img class="title" src="/img/school/school_9.png"></h-img>
        <div class="cattle">
            <van-card
                @click="openWebView('牛人必看','cattle_1')"
                desc="在外汇市场最常用的三种交易手段里，最难学的往往是突破类的交易"
                title="如何像高手一样交易突破"
                thumb="/img/school/school_10.png"
            />
            <van-card
                @click="openWebView('牛人必看','cattle_2')"
                desc="如果投资者对商品价格的走势持有"
                title="利用商品价格与商品货币的相关性进行交易"
                thumb="/img/school/school_11.png"
            />
            <van-card
                @click="openWebView('牛人必看','cattle_3')"
                desc="错过一笔盈利的交易时，交易者可能会因为贪婪感到沮丧。为了避免这"
                title="交易心理学：错失交易良机"
                thumb="/img/school/school_12.png"
            />
        </div>

    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class school extends Vue {
    protected openWebView(title: string, name: string) {
      const obj = {
        title: title,
        path: name,
        name: name,
        query: {
          hideTitleBar: '0' // 用原声头部
        }
      };
      window.openWebView(obj);
    }

  };
</script>
<style lang='scss'>
    .school {
        background-image: url('/img/school/bg_1.png'), url('/img/school/bg_2.png');
        background-position: top left, bottom left;
        background-size: 100%, 100%;
        background-repeat: repeat, no-repeat;
        background-color: #050739;
        text-align: center;
        padding-bottom: 100px;

        .banner {
            width: 100%;
        }

        .title {
            width: 235px;
            margin: 0 auto;
        }

        .column {
            margin: 10px auto 30px auto;
            padding: 0 14px;
            display: flex;
            justify-content: space-between;

            img {
                height: 80px;
            }
        }

        .advanced {
            padding: 0 9px;
            margin-bottom: 10px;
            margin-top: 10px;

            img {
                width: 100%;
            }
        }

        .cattle {
            padding: 0 18px;
            margin-top: 10px;

            .van-card {
                padding: 0;
            }

            .van-card__thumb {
                width: 125px;
                height: 85px;
            }

            .van-card__content {
                text-align: left;
                height: 65px;
                min-height: 65px;
                color:#080857;
                padding: 10px 10px 10px 0;

                .van-card__title {
                    font-size: 16px;
                    font-weight:600;
                    line-height: 20px;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: block;
                }
                .van-card__desc {
                    margin-top: 10px;
                    font-size: 14px;
                    line-height: 17px;
                    width: 100%;
                    max-height: 40px;
                    white-space: initial;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
</style>
