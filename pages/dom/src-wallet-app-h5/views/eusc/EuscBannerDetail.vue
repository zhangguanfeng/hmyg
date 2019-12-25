<template>
    <div class="EuscBannerDetail">
        <div class="img-box">
            <img src="./detail_banner.png" alt="">
        </div>
        <div class="content">
            <p>EUSC-生态国际</p>
            <p>自2016年12月开疆破土，全球布局区块链生态产业链以来，至2019年3月10日发行ERC20主网代币，同时启动《EUSC-生态国际智能合约系统》APP开发，并迎来了全球500余家知名媒体的争相报导。</p>
            <p>Ecobusiness alliance（EUSC）
是由英国生态国际基金会（Ecological Global ）组织发起，致力于解决全球生态环境保护与经济可持续协调发展问题。EUSC将基于区块链技术，通过建立创新的模式，解决信任、流通问题，打通全球贸易壁垒，减少贸易周边成本以及生产过程对环境的破坏，促进全球生态资源的合理利用</p>
            <p>EUSC自2019年7月上线即刻金服和OKNodes交易所以来，受到了全球各大生态社区的强烈关注。</p>
            <p>《EUSC-生态国际智能合约系统》将于7月13日正在上线，并在英国、韩国、日本、新加坡、马来西亚、俄罗斯、中国(台湾，香港，澳门)、越南等地区同步启动“千城生态社区”战略。EUSC生态国际基金会将会对参与生态社区建设的社群和各大节点，超级节点给予大力支持和社区奖励！</p>
            <p>EUSC-生态国际在全球的生态建设已全面拉开序幕。EUSC在8月至10月将陆续登录10-60家国际交易所，并计划2019年12月主网上线。</p>
            <p>让我们共同见证EUSC-生态国际的伟大奇迹！</p>
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        document.title = 'EUSC-生态国际';
    }
}
</script>
<style lang="less" scoped>
.EuscBannerDetail{
    height:100vh;
    overflow-y:auto;
    -webkit-overflow-scrolling : touch;
    .content{
        padding-bottom:15px;
    }
    .img-box{
        img{
            width:100%;
        }
        
    }
    p{
        color:#5f5a5a;
        font-size:14px;
        margin-bottom:15px;
        padding:0 10px;
    }
}

</style>
