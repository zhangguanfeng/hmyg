/**
*  Created by   阿紫
*  On  2019/11/7
*  Content 基本面分析
*/
<template>
    <div class='introductory'>
        <div class="center">
            <div class="title">
                什么是基本面分析
            </div>
            <div class="content">
                <p>
                    基本面分析是对影响某一经济实体如股票或外汇的当前核心要素的分析。通过分析经济指标、官方政策、社会或其他因素来预测某一商业领域的价格走势。如果将市场视为一个巨大的时钟，则基本面是提供动力的齿轮与发条。所有人都能说出现在是几点钟，但只有熟知基本面才能知晓造成时钟（或价格）运转的背后原因。
                    基本面？还是技术面？
                    似乎有一种倾向要把交易者简单地划为两类：基本面派及技术面派。实际上，大多数明智的交易者都倾向于将二者结合，而非单纯运用其中的一面。
                    基本面分析者需要时刻关注图表上发出的技术信号， 技术面分析者也不可小觑影响汇价的关键经济数据、重要政治决策或重大社会事件。
                    利用模型预测经济形势
                    基本面分析在预测经济形势时非常有效，但它不能帮助您精准预测汇价。分析 GDP 或就业数据可以帮助您大致了解一国的经济状况及其背后的原因，
                    但您仍需通过某种方式将其转化为具体的进出场交易价位。基本面数据及交易策略之间的桥梁来自于交易模型。这些模型利用当前或历史经验数据来预测未来汇价发展并将其转化为具体的交易策略。
                </p>
                <h5>预防“患得患失症”</h5>
                <p>
                    预测模型是感性与理性的结合体，由于其方式众多，所以交易者学习运用起来可能不知所措。很难说何时您可以充满信心地确认下单时机。因此，许多交易者在这个时候转向技术面分析，以验证他们的预测，并从价格形态上观察入场信号。
                </p>
                <h5>先看基本面影响因素</h5>
                <p>
                    基本面涵盖了带动一国经济及货币变动的全部要素。从利率、央行政策到自然灾害，基本面是一系列独特的计划、异常行为及未知事件的动态组合。因此，不是每种变化都能引起一国货币的波动。建议您从抓主要矛盾入手，先抓决定性因素，切勿一把抓。与其紧盯所有基本面数据，我们建议您先抓住基本面组合中最具影响力的因素。
                </p>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Introductory extends Vue {

  };
</script>
<style lang='scss'>
    .introductory {
        background-color: #050739;
        padding: 25px 20px;

        .center {
            box-shadow: 0px 2px 17px 0px rgba(8, 8, 56, 0.5);
        }

        .content {
            background: #DDF0FF;
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
        }

        .title {
            padding-left: 20px;
            height: 35px;
            line-height: 35px;
             background: #9ECDF3;
            color: #080856;
            font-size: 16px;
            text-align: left;
            margin-bottom: 10px;
            font-weight:600;
        }
    }
</style>
