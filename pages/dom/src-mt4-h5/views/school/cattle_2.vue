/**
*  Created by   阿紫
*  On  2019/11/6
*  Content
*/
<template>
    <div class='cattle_2'>
        <div class="center">
            <div class="title">
                利用商品价格与商品货币的相关性进行交易
            </div>
            <div class="content">
                <p>
                    如果投资者对商品价格的走势持有某种观点，这将帮助其在外汇市场中寻找交易机会。下面我们就以根据原油价格交易美元/加元为例来进行说明。
                    你们是否对商品市场持有某种观点，不过却在外汇市场中寻找机会？了解两者的相关性可能帮助我们通过比较两种完全不同的资产来寻找市场方向。其中最为常见的就是美元/加元与美国原油之间的相关性。
                </p>
                <p>
                    下图显示的就是这两种资产的相关性，我们把美国原油与美元/加元的走势放在一张日图表上，就可以明了地看到两者的相关性，我们看到两者呈现负相关性。那么在美国原油下跌时，我们就会预期美元/加元上涨，反之美国原油上涨时，预期美元/加元下跌。了解透这种相关性，反应灵敏的投资者就会利用其对一种资产的观点交易另外一种相关资产。
                </p>
                <img src="/img/school/cattle_5.png"></img>
                <p>
                    下图显示的是美元/加元2小时图，我们看到目前汇价接近阻力位1.0100。通常情况下，投资者会把此位作为入市位，因为在这个位置汇价要么突破，要么破败。但如果投资者了解美国原油的走势，并对其走势进行了一定的预测，那么就可以根据其对原油走势的观点计划自己的交易。
                </p>
                <p>
                    如果投资者看跌美国原油，那么就可以寻机做多。因为预期美国原油价格下跌，那么利用负相关性，这将会预示著美元/加元上行突破。投资者可以把1.0100作为阻力位，若上行突破，则意味著汇价将延续上行趋势，继续建立较高的高点。我们可以把入场点设在1.0100下方，而止损则设在当前的窄幅区间下方。
                </p>
                <img src="/img/school/cattle_6.png"></img>
                <p>
                    反之，如果投资者预期美国原油上涨，那么就会预期美元/加元下行。如果汇价持续遇阻於1.0100下方，那么就可以采取做空策略。
                </p>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Cattle_2 extends Vue {

  };
</script>
<style lang='scss'>
    .cattle_2 {
        background-color: #050739;
        padding: 25px 20px;

        .center {
            background: #DDF0FF;
            box-shadow: 0px 2px 17px 0px rgba(8, 8, 56, 0.5);
        }

        .content {
            padding: 10px 20px 30px 20px;
            color: #080856;

            h5 {
                font-size: 16px;
                margin: 10px 0;
            }

            p {
                line-height: 20px;
                font-size: 14px;
            }

            img {
                width: 100%;
            }
        }

        .title {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #C0C0C0;
            color: #333333;
            font-size: 16px;
            text-align: center;
        }
    }
</style>
