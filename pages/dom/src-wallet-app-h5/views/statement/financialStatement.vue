/*
 * @Author: dubbing
 * @Content: 理财免责声明
 * @Date: 2019-07-09 11:16:38
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-07-12 17:12:28
 */
<template>
    <div class="financialStatement">
        <!-- <p>感谢你选择AlphaWallet。</p>
        <p>AlphaWallet本着公平、公正、公开、合理、合法和人性化的原则，关于您在AlphaWallet平台选择的项目智能合约，我们在此真诚地给予您相关的风险提示：</p>
        <p>数字资产是高收益和高风险并存的理财产品，您应该通过自己的谨慎判断确定理财应用。您所选择的任何一种数字资产所带来的风险亦应由您自行承担。</p>
        <p>AlphaWallet会为用户提供相对权威、可信、准确、完整和及时的数据资料与信息，所有的数据均来源于合法渠道，但是我们无法完全保证数据百分之百准确和完整。在AlphaWallet所公布的数据仅供参考，不构成任何投资建议。用户在使用参考数据所存在的风险及产生的后果将完全由自己承担。因此，无论在任何情况下，AlphaWallet不承担用户基于我方提供数据作出的投资决策失败担负任何赔偿责任。AlphaWallet将全心全意为您提供服务。</p>
 -->

        <p>
            {{$t('statement.financialStatement.content1')}}
        </p>
        <p>
            {{$t('statement.financialStatement.content2')}}
        </p>
        <p>
            {{$t('statement.financialStatement.content3')}}
        </p>
        <!-- <p>
            {{$t('statement.financialStatement.content4')}}
        </p> -->

    </div>
</template>
<script>
export default {
  name: 'financialStatement',
  activated() {
    document.title = this.$t('statement.financialStatement.title');
  },
};
</script>
<style lang="less" scoped>
.financialStatement{
    padding:16px;
    p{
        color:#999999;
        font-size:13px;
        line-height:22px;
        margin-bottom:15px;
    }
}
</style>
