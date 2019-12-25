/**
*  Created by   阿紫
*  On  2019/11/6
*  Content
*/
<template>
    <div class='cattle_3'>
        <div class="center">
            <div class="title">
                交易心理学：错失交易良机
            </div>
            <div class="content">
                <p>
                    错过一笔盈利的交易时，交易者可能会因为贪婪感到沮丧。
                    为了避免这种沮丧变成报复心理，交易者可以使用价格提醒和限价订单。
                    作为交易员，我们每天都要与各种情绪做斗争。然而，大多数情绪在交易时是不可避免的，这仅仅因为我们都是人类。但是如果我们在交易时没能有效地控制这些情绪，它们可能会给我们的交易带来灾难性的后果。下面，我们将深入探讨交易时的贪婪和错过交易时的沮丧会给我们带来什么影响，以及我们应该如何去避免这种情况发生。
                    我们都曾经历过，在错过一笔交易时感到后悔和沮丧 –
                    这主要来源于我们对那些错过的盈利的贪婪。因此，我们在这个时候就需要告诉自己：不赚钱总比亏钱要好、留得青山在不怕没柴烧。对于很多交易者来说，如果不及时对这种贪婪做出应对，那它可能会随之衍变成报复心理。一旦交易者产生了报复市场的心理，他们的交易可能就会变得一团糟，因为他们可能不再关注交易策略，而是不断地加大杠杆只为赚回亏损的钱。
                    通常情况，在真实的交易过程中，我们有两种方法可以避免上述情况的发生。
                </p>
                <h5>价格提醒</h5>
                <p>
                    价格提醒可以帮助我们克服错过交易的恐惧。如果您想了解价格在经过技术分析后（例如支撑和阻力水平、斐波那契水平，唐奇安通道）会有什么样的变动，那么价格提醒将是您最好的伙伴。价格提醒可以设置为音频提醒，或通过交易平台设置电子邮箱发送消息进行提醒。
                </p>
                <h5>限价订单</h5>
                <p>
                    使用限价订单是另一种可以帮助避免错过交易时机的方法。限价订单可以让我们根据交易策略设置一个合适的入场价格。当价格达到了我们理想的水平时，系统会自动执行我们的订单。限价单的设置比较简单：您只需要点击买入或卖出，然后输入您的理想价格水平即可，还可以在高级选项里设置限价和止损点。
                    不管您用的是哪一种方法，价格提醒和限价订单都可以帮您避免错过交易良机。当价格达到合适的水平时，我们收到通知或系统会帮我们执行预先制定好的交易策略。这样一来，之前被视为交易绊脚石现在却反倒成为了盈利机会！
                </p>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Cattle_3 extends Vue {

  };
</script>
<style lang='scss'>
    .cattle_3 {
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
