/*
 * @Author: dubbing
 * @Content: 应用免责声明
 * @Date: 2019-07-09 11:16:38
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-11 10:33:26
 */
<template>
    <div class="applicationStatement">
        <p>
            {{$t('statement.applicationStatement.content1')}}
            <!-- AlphaWallet应用板块项目均由第三方项目方提供， 您理解AlphaWallet仅作为您数字代币管理的工具。AlphaWallet不能控制第三方DApp应用提供的产品及服务的质量、安全或合法性，
            信息的真实性或准确性，以及相对方履行其在与您签订的协议项下的各项义务的能力。所有您在第三方DApp应用进行的交易行为系您的个人行为，有约束力的合同关系在您和您的相对方之间建立，
            与AlphaWallet无关。AlphaWallet提醒您应该通过自己的谨慎判断确定登录DApp应用及相关信息的真实性、合法性和有效性。您与任何第三方交易所产生的风险亦应由您自行承担。 -->
        </p>
        <p>
            {{$t('statement.applicationStatement.content2')}}
            <!-- AlphaWallet尽力为用户提供权威、可信、准确、完整和及时的数据资料与信息，所有的数据均来源于合法渠道,但是我们无法完全保证数据百分之百准确和完整。
            我司所公布的数据仅供参考，不构成任何投资建议。使用者在数据基础上所做的任何判断、推论或观点，均不代表我司的立场；使用者明确同意其使用数据所存在的风险及产生的
            后果将完全由其自己承担。因此，无论在任何情况下，我司不承担因使用方基于我方数据作出的投资决策失败担负任何赔偿责任。 -->
        </p>
    </div>
</template>
<script>
export default {
    name:'applicationStatement',
    activated() {
      document.title = this.$t('statement.applicationStatement.title');

    }
}
</script>
<style lang="less" scoped>
.applicationStatement{
    padding:16px;
    p{
        color:#999999;
        font-size:13px;
        line-height:22px;
        margin-bottom:15px;
    }
}
</style>
