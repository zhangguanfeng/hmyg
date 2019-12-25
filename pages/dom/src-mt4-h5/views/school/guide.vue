/**
*  Created by   阿紫
*  On  2019/11/7
*  Content 新手指南
*/
<template>
    <div class='guide'>
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="在外汇交易中我该如何控制风险？" name="1">
                <div class="content">
                    <div>
                        在交易之前我们要控制好每次的开仓比例，一般新手我们不建议开仓比例过大，只有我们积累了较多的经验，拥有良好的交易记录之后再考虑加大比例。新手上路我们建议开仓比例稳定在5%比较适合，有了些许经验之后在10%更好。
                    </div>
                    <div>
                        交易之前设好止损位，并且一旦开始操作后就严格执行。在设置止损的同时我们也应该设置好止盈点，这样也能降低风险。
                    </div>
                    <div>
                        最后我们要说的就是，外汇市场是存在风险的，我们在准备投身外汇市场的时候必须要懂得如何进行风险控制和合理运用自己手中的资金。
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="影响汇率波动的因素有哪些 ？" name="2">
                <div class="content">
                    <div>
                        一般来说最常引起汇率波动的影响因素是利率、通货膨胀和政治稳定。
                    </div>
                    <div>
                        a. 经济：国家生产的增长、国际收支、银行利率、就业以及其它有关的指标、指数、报表等经济数据。
                    </div>
                    <div>
                        b. 政治：刺激经济的有关政策、利于社会的政局变动。
                    </div>
                    <div>
                        c. 消息：发布利好消息、重要人士讲话。
                    </div>
                    <div>
                        d. 灾难：军事战争、恐怖袭击、自然灾害等。
                    </div>
                    <div>
                        e. 市场：由于世界私募和投资公司较多，游资力量非常强大，短时间内他们会左右市场走向，技术分析就成了关键。
                    </div>
                    <div>
                        同时这些因素还影响着股票市场和期货市场。特别是美国作为世界金融贸易的中心，是我们必须经常关注的，还有欧盟的国家，一般一些财经数据，重大政治新闻、特大破坏事件都可能导致汇率的暴涨或暴跌。
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="外汇市场什么时候开始和关闭?" name="3">
                <div class="content">
                    <div>
                        从新西兰的惠灵顿开市开始，直到凌晨的美国西海岸市场的闭市，澳洲、亚洲、北美洲各大市场首尾衔接，在营业日的任何时刻，交易者都可以寻找到合适的外汇市场进行交易。
                    </div>
                    <div>
                        全球各外汇交易市场被距离和时间所隔，它们各自独立又相互影响。这些外汇市场以其所在的城市为中心，辐射周边的其它国家和地区。由于所处的时区不同，各外汇市场在营业时间上此开彼关，但一个市场结束后，往往就为下一个市场的开盘定下了基调。这些市场通过先进的通讯设备和计算机网络连成一体，市场的参与者可以在世界各地进行交易，由此形成了全球一体化运作、全天候运行的国际外汇市场。
                    </div>
                    <div>
                        国际各主要外汇市场开盘收盘时间（北京时间）：
                    </div>
                    <div>
                        新西兰惠灵顿外汇市场：04：00-12：00（冬令时）；05：00-13：00 （夏令时）。
                    </div>
                    <div>
                        澳大利亚悉尼外汇市场06：00-14：00（冬令时）；07：00-15：00 （夏令时）。
                    </div>
                    <div>
                        日本东京外汇市场：08：00-15：30
                    </div>
                    <div>
                        北京外汇市场：09：30-16：30
                    </div>
                    <div>
                        德国法兰克福外汇市场：15：30-23：00
                    </div>
                    <div>
                        英国伦敦外汇市场：16：30-23：30（夏令时）；17：00-00：30（冬令时）。
                    </div>
                    <div>
                        美国纽约外汇市场：21：30-03：00（夏令时）；22：00-04：00（冬令时）
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="谁是外汇市场的主要参与者?" name="4">
                <div class="content">
                    <div>
                        外汇市场的主要参与者：从外汇交易的主体来看，外汇市场主要由下列参加者构成：
                    </div>
                    <div>
                        （1）外汇银行：外汇银行是指由各国中央银行或货币当局指定或授权经营外汇业务的银行。外汇银行通常是商业银行，可以是专门经营外汇的本国银行，也可以是兼营外汇业务的本国银行或者是在本国的外国银行分行。外汇银行是外汇市场上最重要的参加者，其外汇交易构成外汇市场活动的主要部分。
                    </div>
                    <div>
                        （2）外汇交易商：外汇交易商指买卖外国汇票的交易公司或个人。外汇交易商利用自己的资金买卖外汇票据，从中取得买卖价差。外汇交易商多数是信托公司、银行等兼营机构，也有专门经营这种业务的公司和个人。
                    </div>
                    <div>
                        （3）外汇经纪人：外汇经纪人是指促成外汇交易的中介人。它介于外汇银行之间、外汇银行和外汇市场其他参加者之间，代洽外汇买卖业务。其本身并不买卖外汇，只是联接外汇买卖双方，促成交易，并从中收取佣金。外汇经纪人必须经过所在国的中央银行批准才能营业。
                    </div>
                    <div>
                        （4）中央银行：中央银行也是外汇市场的主要参加者，但其参加外汇市场的主要目的是为了维持汇率稳定和合理调节国际储备量，它通过直接参与外汇市场买卖，调整外汇市场资金的供求关系，使汇率维系在一定水平上或限制在一定水平上。
                    </div>
                    <div>
                        （5）外汇投机者：外汇投机者的外汇买卖不是出于国际收付的实际需要，而是利用各种金融工具，在汇率变动中付出一定的保证金进行预买预卖，赚取汇率差价。
                    </div>
                    <div>
                        （6）外汇实际供应者和实际需求者：外汇市场上外汇的实际供应者和实际需求者是那些利用外汇市场完成国际贸易或投资交易的个人或公司。他们包括：进口商、出口商、国际投资者、跨国公司和旅游者等。
                    </div>

                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Guide extends Vue {
    protected activeName: string = '1';
  };
</script>
<style lang='scss'>
    .guide {
        height: calc(100vh - 50px);
        overflow: hidden;
        background-color: #050739;
        padding: 25px 20px;

        .van-collapse-item__content {
            background: #DDF0FF;
        }

        .content {
            color: #080856;
            line-height: 20px;
            font-size: 14px;
            max-height: calc(100vh - 270px);
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
