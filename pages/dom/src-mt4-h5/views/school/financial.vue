/**
*  Created by   阿紫
*  On  2019/11/7
*  Content 金融词汇
*/
<template>
    <div class='financial'>
        <van-tabs v-model="activeName">
            <van-tab title="交易术语" name="1"></van-tab>
            <van-tab title="行情术语" name="2"></van-tab>
            <van-tab title="技术指标" name="3"></van-tab>
            <van-tab title="经济指标" name="4"></van-tab>
        </van-tabs>
        <div class="center">
            <van-collapse v-if="activeName==1" v-model="activeNameTrading" accordion>
                <van-collapse-item title="做多与多空" name="1">
                    <div class="content">
                        做多指的是多仓，也可以叫利多，买入某种货币，看涨；做空指的是卖仓，也可以叫利空，卖出某种货币，看跌。也有人叫做多、做空为多头和空头
                    </div>
                </van-collapse-item>
                <van-collapse-item title="杠杆" name="2">
                    <div class="content">
                        杠杆是进行外汇交易所需资本和所需保证金之间的一个比例。借助杠杆，外汇投资者能够利用相对较小的资本进行大规模的外汇交易。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="止损价" name="3">
                    <div class="content">
                        止损是设定一个亏损的额度，如果行情朝你预测的相反方向走，你亏损了，一旦达到这个范围，系统就会自动帮你平仓，让你能有效控制损失，保存实力不受大的损失，争取下一次市场机会。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="止盈价" name="4">
                    <div class="content">
                        止盈是设定一个盈利的额度。很多人不明白为什么要设止赢价，觉得“不是赚越多越好”吗？这个想法是没错的，但你需要明白市场不会一直朝着你想要的方向一直走下去，还要懂得见好就收，所以我们需要止盈。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="库存费" name="5">
                    <div class="content">
                        外汇库存费即隔夜利息。如果是做多(持有)高利息的货币，未平仓头寸的隔夜利息将被添加账户的资本内。反之，相关的隔夜利息会被从资金中扣除。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="爆仓" name="6">
                    <div class="content">
                        当我们账户里除了已经使用的保证金外，剩余的钱也就是可用保证金为0的时候，就会爆仓，也就是强行平仓。通常强行平仓都从亏损最大的订单开始，直到保证金比例恢复到平台规定的比例。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="挂单" name="7">
                    <div class="content">
                        很多时候交易者不想用市场现在的价格进行交易，而想用以后可能出现的价格交易，例如他们判断当价格突破某一个支撑/阻力位时就会逆转，或者趋势会继续，这个支撑/阻力位就是一个很好的交易价位，这时交易者可以用挂单的方式进行交易，也就是用一个尚未出现的价格作为标准来决定是否执行交易，这就是挂单。
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-if="activeName==2" v-model="activeNameMarket" accordion>
                <van-collapse-item title="日开盘价" name="1">
                    <div class="content">
                        日开盘价是指每个交易日的第一笔成交价格。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="日收盘价" name="2">
                    <div class="content">
                        日收盘价是指每个交易日的最后一笔成交价格。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="日最低价" name="3">
                    <div class="content">
                        指当天该品种成交价格中的最低价格。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="日最高价" name="4">
                    <div class="content">
                        指当天该品种成交价格中的最高价格。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="趋势" name="5">
                    <div class="content">
                        从一般意义上说，趋势就是市场何去何从的方向。不过，为了便于实际应用，我们需要更具体的定义。在通常情况下，市场不会朝任何方向直来直去，市场运动的特征就是曲折婉蜒，它的轨迹酷似一系列前赴
                        后继的波浪，具有相当明显的峰和谷。所谓市场趋势，正是由这些波峰和波谷依次上升或下降的方向所构成的。无论这些峰和谷是依次递升，还是依次递降，或者横向延伸，其方向就构成了市场的趋势。所以，我们把上升趋势定义为一系列依次上升的峰和谷，把下降趋势定义为一系列依次下降的峰和谷；把横向延伸趋势定义为一系列依次横向伸展的峰和谷。
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-if="activeName==3" v-model="activeNameTechnology" accordion>
                <van-collapse-item title="简单移动平均线MA" name="1">
                    <div class="content">
                        各个特定时段内所有价格均值的连线。由交易者决定是否计入最高价、最低价或收盘价，然后将这些价格全部相加再平均后连成的一条曲线。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="加权移动平均线" name="2">
                    <div class="content">
                        对近期数据赋予较大权重。将价格曲线平滑处理的同时使得曲线对于近期价格的变动更敏感。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="指数移动平均线" name="3">
                    <div class="content">
                        又称平滑移动平均线，以另一种方式加重近期价格数据的权重。它是用最近价格数据的百分比乘以前一阶段的均价。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="随机指数KD" name="4">
                    <div class="content">
                        随机指数（或称震荡指数），用来监控趋势的持久度及价格反转信号。数值在 0-100 的范围以内，由 K 线与 D 线组成。 K 线为“快指标”，更加灵敏； D 线为“慢指标”，反应较慢。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="相对强弱指数 RSI" name="5">
                    <div class="content">
                        如随机指数，相对强弱指数的数值范围也为 0-100 ，它是一个测量价格涨、跌力量的指标。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="布林通道BOLL" name="6">
                    <div class="content">
                        该通道于移动平均线两边各划出两个标准偏差，常常用来表示支撑和阻力水平。
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-if="activeName==4" v-model="activeNameEconomic" accordion>
                <van-collapse-item title="央行利率" name="1">
                    <div class="content">
                        外汇市场其中一个首要影响因素，则非利率莫属。某一国家的中央银行或经济组织将会设定其货币的利率。它们调整利率，藉以鼓励贸易及维持对通胀的控制。低利率鼓励经济膨胀，因为贷款变得更为便宜。高利率阻碍经济膨胀，因为“资金成本”变得更加高昂。利率有所转变，亦会大大影响货币价值。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="非农就业数据" name="2">
                    <div class="content">
                        <div>
                            没有任何经济数字会较美国非农就业数据对上述情景构成更大的影响。非农就业数据指美国劳工统计部在每个月第一个星期五美东时间上午8:30公布的每月调查数据。
                        </div>
                        <div>
                            非农就业数据的升跌被视作美国经济健康的指标，因为报告显示出美国商业正在增加还是削减就业人数。非农就业数据已证实为美国近代史上其中一项最重大的基本面指标。作为一个有关每月在农业以外制造的新工数目报告，正数或负数非农就业数据均会令交易者迅速采取行动。若数字较预期为好，往往会令美元走强，若数字强差人意，交易者一般会参考另一个在同日公布的就业组成部份：失业率。
                        </div>
                    </div>
                </van-collapse-item>
                <van-collapse-item title="国内生产总值（ GDP ）" name="3">
                    <div class="content">
                        指一国境内无论本国企业还是外资企业的全部经济活动所生产的商品及服务的总值。 GDP 反映了一国经济增长（或后退）速度的快慢，被视为观察经济产出及增长情况最宏观的指标。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="止盈价" name="4">
                    <div class="content">
                        止盈是设定一个盈利的额度。很多人不明白为什么要设止赢价，觉得“不是赚越多越好”吗？这个想法是没错的，但你需要明白市场不会一直朝着你想要的方向一直走下去，还要懂得见好就收，所以我们需要止盈。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="采购经理人指数（ PMI ）" name="5">
                    <div class="content">
                        是由全美采购经理人协会（ NAPM
                        ），即现称供应管理协会公布的全美制造业综合指数，每月公布一次。指数涵盖了新增订单、生产状况、供应商交货次数、库存、物价、就业、进出口订单等综合方面。又细分为制造业及非制造业指数。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="生产者物价指数（ PPI ）" name="6">
                    <div class="content">
                        主要衡量一国国内制造业、矿业、农业及电力行业的生产者购买的商品及劳务价格的变化均值。通常被经济学家用来分析商品在不同生产阶段的价格变化。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="消费者物价指数（ CPI ）" name="7">
                    <div class="content">
                        衡量城市消费者（占主要货币国家 80% 的人口）为固定的一篮子商品及劳务所支付的价格均值。它反映了超过 200 个品种的价格变化。它也包含了与特定商品及劳务直接相关的各种使用花费及税费。
                    </div>
                </van-collapse-item>
                <van-collapse-item title="政治事件与突发新闻" name="8">
                    <div class="content">
                        地缘政治与突发新闻事件对外汇市场有显著影响。 政治性质事件，例如战争、地方冲突、选举或恐怖主义活动 – 以及天气相关灾难如龙卷风、海啸等，能大幅地影响货币对的买卖。
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Financial extends Vue {
    protected activeName: string = '1';
    protected activeNameTrading: string = '1'; // 交易术语
    protected activeNameMarket: string = '1'; // 行情术语
    protected activeNameTechnology: string = '1'; // 技术指标
    protected activeNameEconomic: string = '1'; // 经济指标

  };
</script>
<style lang='scss'>
    .financial {
        height: calc(100vh);
        overflow: hidden;
        background-color: #050739;

        .van-tabs__nav {
            background: #212357;

            .van-ellipsis {
                color: #6E709A;
            }
        }

        .van-tab--active {
            color: #9ECDF3;

            .van-ellipsis {
                color: #9ECDF3;
            }
        }

        .van-tabs__line {
            background: #9ECDF3;
        }

        .center {
            padding: 16px 20px;
        }


        .van-collapse-item__content {
            background: #DDF0FF;
        }

        .content {
            color: #080856;
            line-height: 20px;
            font-size: 14px;
            max-height: calc(100vh - 300px);
            overflow-y: scroll;
        }

        .van-collapse-item__title {
            color: #080856;
            font-size: 16px;
            font-weight: 600;
            background: #9ECDF3;
            padding-top: 6px;
            padding-bottom: 6px;
            border-radius: 2px;
            margin-top: 10px;
        }

        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }

        .van-hairline--top::after {
            border: none;
        }

        .van-cell__right-icon {
            color: #080856;
        }
    }
</style>
