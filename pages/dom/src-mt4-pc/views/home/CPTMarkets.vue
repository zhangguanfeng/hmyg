/*
 * @Author: dubbing
 * @Content: 《CPT Markets流动性指南》
 * @Date: 2019-09-03 13:57:13
 * @Last Modified by: dubbing
 * @Last Modified time: 2019-09-03 16:54:48
 */
<template>
    <div class="CPTMarkets">
      <el-scrollbar>
        <div class="content">
            <h3>CPT Markets 流动性指南</h3>
            <div class="text-box">
                <p class="text2">
                    本指南旨在保护流动性提供商免受恶意交易的侵害。恶意交易是指客户通过非正
                    常的交易手段，从流动性提供商的交易程序中套利，而不是从市场机会中盈利。为了
                    确保您能享受到最佳的交易体验，请参照以下标准进行交易。如果市场或流动性有所
                    变化，CPT Markets 保留自行决定更改指南的权利，恕不另行通知。
                </p>
                <div class="img-box">
                  <img src="@/assets/info.png" alt="">
                </div>
                <p class="text marginBottom10">
                    举例说明：
                </p>
                <p class="text2 marginBottom10">
                    对于任何直盘货币对来说，在任意 10 秒内，不得有超过 60 手的交易量（开仓或者平
                    仓）。如果交易者 10 秒内连续开仓买入 6 次 10 手 EURUSD，此时没有违反限制准则。但如果在
                    这 10 秒内，又平仓了其中 1 次 10 手，那么交易量即为 70 手，便违反了限制准则。请注意对于清
                    算商来说，不区分开仓或者平仓。多单开仓为 LONG，多单平仓为 SHORT，空单开仓为
                    SHORT，空单平仓为 LONG。
                </p>
                <p class="text2 colorRed marginBottom10">
                    当资金管理人或 IB 管理多个交易账户，或者有多个交易账户具有高度相似的交易
                    行为时，上述流动性指南将针对整个账户池（不针对单个账户）。
                </p>
                <p class="text2 colorRed marginBottom10">
                    为了客户能获得更好的交易体验 ，请仔细阅读流动性指南，并知晓因市场流动性
                    不足可能产生的价格偏差等情况。另外，在开闭市阶段由于市场交易清淡，流通性极
                    低，市场点差会比平常时段高很多，因此在这段时间内操作交易请格外谨慎，甚至我
                    们建议避免在这个时段进行交易操作。
                </p>
                <p class="text2 marginBottom10">
                    接受这些条款，意味着客户和/或 IB 同意遵守上述指南并且接受任何因违反该指南
                    而导致的后果，包括可能会损失 IB 佣金，以及因涉嫌“恶意交易”而被撤回交易，或
                    流动性提供商采取自我保护措施而扩大点差*等。
                </p>
                <p class="text2 colorRed">
                    *2018 年 3 月 12 日，我们的流动性提供商由于受到恶意交易攻击，间歇性将黄金点
                    差扩大了近 20 个点，持续数十秒，导致 CPT Markets 平台黄金点差随之非正常扩
                    大。
                </p>
            </div>
        </div>
      </el-scrollbar>
    </div>
</template>
<script>
export default {
    /* components:{
        Viewer
    } */
}
</script>
<style lang="scss" scoped>
.CPTMarkets {
    background: #fff;
    overflow: hidden;
    .content {
      width: 1200px;
      margin: 0 auto;
        h3{
            text-align:center;
        }
        .text-box{
            padding:10px;
            margin-bottom:5px;
            .img-box{
                padding:10px 0;
                text-align: center;
                img{
                    width:90%;
                }
                p{
                    font-size:14px;
                    color:#999;
                    text-decoration: underline;
                }
            }
            .title{
                font-weight:bold;
                color:#333;
                margin-bottom:10px;
                font-size:14px
            }
            .text{
                font-size:14px;
                color:#4c4c4c;
                letter-spacing: .5px;
            }
            .text2{
                font-size:14px;
                color:#4c4c4c;
                letter-spacing: .5px;
                text-indent: 15px;
            }
            .colorRed{
                color:red
            }
            .table{
                padding:20px 0;
                table{
                    margin:0 auto;
                }
                th{
                    font-size:13px;
                    text-align: center;
                    padding:3px 5px;
                }
                td{
                    font-size:14px;
                    text-align: center;
                    padding:3px 5px;
                }
            }
            .marginBottom10{
                margin-bottom:10px;
            }
        }
    }
}
</style>
