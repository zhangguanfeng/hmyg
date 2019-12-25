<template>
    <div class="aboutUs has-header">
        <h-navbar class="title" @backPage="onClickLeft" title="关于我们"/>
        <div class="content">
            <div class="content_box content_top">
                <div class="banner">
                    <img src="/img/aboutUs-banner.png" alt="">
                    <!--                   <span>-->
                    <!--                       2020年2月2日，CPT正式加入伦敦证券交易所-->
                    <!--                   </span>-->
                </div>
                <h4>
                    <span>
                         CPT运营数据
                    </span>
                </h4>
                <div class="data">
                    <span>服务用户267.9万</span>
                    <span>上线运营 30 年</span>
                </div>
            </div>
            <div class="content_box">
                <h4>
                     <span>
                    两大国际牌照
                     </span>
                </h4>
                <p style="text-align: center"> 英国FCA&伯利兹IFSC</p>
            </div>
            <div class="content_box">
                <h4>
                     <span>
                    关于我们
                     </span>
                </h4>
                <p>
                    CPT Markets是一家以技术驱动为主的国际金融衍生品及相关服务供应商。我们受世界上公认为最严格、最健全、最能保护投资者权益的金融监管体系英国FCA以及伯利兹IFSC监管，主要为用户提供外汇、贵金属、指数、差价合约、原油、数字货币等交易产品服务，希望凭借透明的交易价格、极具竞争力的交易点差、领先行业的交易策略以及优质的客户服务体系等产品体验，为全球金融衍生品投资用户、经纪服务商、金融企业以及银行机构营造一个安全公平、高效便捷、友好健康的综合性金融服务环境。
                    未来，我们希望继续利用新的技术来打开散户投资者和公司的市场，帮助客户通过全球市场了解投资增长和生产力的潜力，多方位拉动金融市场发展的经济价值与社会价值。
                </p>
                <h5>
                    世界级金融监管牌照
                </h5>
                <p class="tips"> 我们拥有世界上公认为最严格、最健全、最能保护投 资者权益的金融监管体系——英国FCA以及伯利兹IFSC监管牌照，也一直在用市场实力和规范化运营保障投资用户权益。</p>
                <h5>
                    伦交所上市平台
                </h5>
                <p class="tips">
                    2019年12月，CPT以非清算会员公司的身份加入伦敦证券交易所（“ LSE”），成为了国际少有外汇交易类上市公司。
                </p>
                <h5>
                    全球领先的市场报价
                </h5>
                <p class="tips">
                    2019年12月，CPT以非清算会员公司的身份加入伦敦证券交易所（“ LSE”），成为了国际少有外汇交易类上市公司。
                </p>
                <h5>
                    深耕行业的国际化团队
                </h5>
                <p class="tips">
                    CPT Markets团队成员具备多年的交易和合规经验，从交易者和销售双方获得经纪商业界知识，结合敏锐的市场洞察力，使我们能够在不断变化的市场中了解客户的需求和更好的接受挑战。
                </p>
            </div>
            <div class="content_box">
                <h4>
                    <span>为什么选择CPT Markets？</span>
                </h4>
                <p style="text-align: center">全球金融交易领航者</p>
                <P>业务覆盖3大洲，用户遍布世界各地，多个金融强国监管。</P>
                <h5>顶级牌照</h5>
                <p class="tips">拥有英国FCA以及伯利兹IFSC两大监管牌照。</p>
                <h5>交易高效</h5>
                <p class="tips">拥有英国FCA以及伯利兹IFSC两大监管牌照；
                    灵活的杠杠机制，投资门槛低，杠杆高达无限。。</p>
                <h5>账户独立</h5>
                <p class="tips">用户资金妥善存管于独立账户，安全可靠。</p>
                <h5>技术加密</h5>
                <p class="tips">采用区块链技术加密，确保用户资料安全。</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class AboutUs extends Vue {
        protected onClickLeft(name: any) {
            window.closeWebView();
        }
    }
</script>
<style lang="scss">
    .aboutUs {
        .content {
            background: #F4F5FA;
            .banner {
                width: 100%;

                img {
                    width: 100%;
                }
            }

            &_box {
                padding: 20px;
                background: #fff;
                margin-bottom: 5px;

                h4 {
                    margin: 0 0 20px 0;
                    font-size: 18px;
                    font-weight: 600;
                    text-align: center;

                    span {
                        position: relative;
                        padding: 0 5px;

                        &:after {
                            content: '';
                            position: absolute;
                            background: #5A10B1;
                            height: 3px;
                            width: 100%;
                            bottom: -5px;
                            left: 0;
                        }

                        &:before {
                            content: '';
                            position: absolute;
                            background: #5A10B1;
                            height: 1px;
                            width: 100%;
                            bottom: -8px;
                            left: 0;
                        }
                    }
                }

                .data {
                    padding: 0 30px;
                    display: flex;
                    justify-content: space-between;
                    color: #333;
                    font-size: 14px;

                    span {
                        position: relative;

                        &:after {
                            content: '';
                            position: absolute;
                            left: -10px;
                            top: 9px;
                            width: 4px;
                            height: 4px;
                            background: #0163FC;
                        }
                    }
                }

                p {
                    margin: 5px 0;
                    color: #333;
                    font-size: 14px;
                    line-height: 23px;
                }

                h5 {
                    margin: 15px  0;
                    color: #333;
                    font-size: 14px;
                    text-indent: 10px;
                    position: relative;
                    &:after {
                        content: '';
                        position: absolute;
                        left: 0px;
                        top: 9px;
                        width: 4px;
                        height: 4px;
                        background: #5A10B1;
                        transform: rotate(45deg);
                    }
                }

                .tips {
                    color: #666;
                }
            }
            &_top {
                padding: 0 0 20px 0;
            }
        }
    }
</style>
