<template>
    <div class="about">
        <div class="header">
            <!-- <img src="@/assets/about/banner.png" alt=""> -->
            <span>欢迎来到 CPT Markets</span>
        </div>
        <div class="container">
            <p class="title">
                <span class="dlot"></span>
                <span class="cn">关于我们</span>
                <span class="dlot"></span>
            </p>
            <p class="caption">CPT Markets是一家以技术驱动为主的国际金融衍生品及相关服务供应商。我们受世界上公认为最严格、最健全、
                最能保护投资者权益的金融监管体系英国FCA以及伯利兹IFSC监管，主要为用户提供外汇、贵金属、指数、差价合约、原油、数字货币等交易产品服务，
                希望凭借透明的交易价格、极具竞争力的交易点差、领先行业的交易策略以及优质的客户服务体系等产品体验，为全球金融衍生品投资用户、经纪服务商、
                金融企业以及银行机构营造一个安全公平、高效便捷、友好健康的综合性金融服务环境。
                <br>
                未来，我们希望继续利用新的技术来打开散户投资者和公司的市场，
                帮助客户通过全球市场了解投资增长和生产力的潜力，多方位拉动金融市场发展的经济价值与社会价值。
            </p>
            <div class="list">
                <ul>
                    <li v-for="(item,key) in listData" :key="key">
                        <div class="li-title">
                            <span>{{item.title}}</span>
                        </div>
                        <p class="li-cn">{{item.content}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      listData: [
        {
          title: '世界级金融监管牌照',
          content: '我们拥有世界上公认为最严格、最健全、最能保护投资者权益的金融监管体系——英国FCA以及伯利兹IFSC监管牌照，也一直在用市场实力和规范化运营保障投资用户权益。',
        },
        {
          title: '全球领先的市场报价',
          content: 'CPT Markets采用先进的在线交易系统涵盖专业的外汇和差价合约市场，帮助客户通过坚实的风险管理体系获得快速准确的报价。',
        },
        {
          title: '定制化系统投资方案',
          content: 'CPT Markets与机构、专业客户和经验丰富的零售客户合作，一起创造量身定制的解决方案，进而可以使他们能够以积极的、稳健的方式构建和管理业务。',
        },
        {
          title: '深耕行业的国际化团队',
          content: 'CPT Markets团队成员具备多年的交易和合规经验，从交易者和销售双方获得经纪商业界知识，结合敏锐的市场洞察力，使我们能够在不断变化的市场中了解客户的需求和更好的接受挑战。',
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.about{
    background:#fff;
    padding-bottom:40px;
    .header{
        height:300px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('../../assets/about/banner.png') no-repeat;
        background-size:100% 100%;
        margin-bottom:40px;
        span{
            font-size:40px;
            font-weight:500;
            color:#fff;
            letter-spacing: 3px;
        }
    }
    .container{
        width:800px;
        margin:0 auto;
        .title{
            display: flex;
            justify-content: center;
            align-items: center;

            .cn{
                font-size:24px;
                color:#333;
                font-weight:500;
            }
            .dlot{
                height:6px;
                width:6px;
                background:#5B0EB2;
                display:inline-block;
                margin:0 15px;
            }
        }
        .caption{
            color:#666;
            font-size:14px;
            letter-spacing: .5px;
            text-align: left;
            line-height:23px;
        }
        .list{
            margin-top:35px;
            ul{
                li{
                    box-shadow: 0 0 5px #ccc;
                    padding:28px 20px;
                    margin-bottom:10px;
                    .li-title{
                        span{
                            color:#333;
                            padding:5px 10px;
                            border-bottom:2px solid rgba(91,14,178,.3);
                            font-weight: bold;
                        }
                    }
                    .li-cn{
                        margin-top:25px;
                        font-size:14px;
                        color:#666666;
                        text-align:left;
                    }
                }
            }
        }
    }
}
</style>
