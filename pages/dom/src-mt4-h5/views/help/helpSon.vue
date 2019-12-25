<template>
  <div class="son">
    <div
      class="son_index"
      v-for="(item,index) in newData"
      :key="index"
      v-show="$route.query.id == index+1"
    >
      <h-navbar class="title" @backPage="onClickLeft" :title="item.title" />
      <div class="son_index_box" v-for="(item2,index2) in item.children" :key="index2">
        <div class="box">
          <div class="title">{{item2.son_title}}</div>
          <div class="text" :class="{isActive:item2.showBox }">
            <div class="text_con">
              {{item2.son_text}}
              <div v-for="(item3,index3) in item2.children" :key="index3">
                <p class="text_con_title">{{item3.son_title}}</p>
                <p>{{item3.son_text}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="but">
          <div class="icon" @click="handleShow(item2,index2,index)" v-if="item2.hidden">
            <h-img :src="item2.imgURL" alt />
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgURL: require(`@/assets/help_xia.png`),
      imgURL1: require(`@/assets/help_shang.png`),
      newData:[],
      listData: [
        {
          title: "账户问题",
          children: [
            {
              son_title: "如何开立真实账户？",
              son_text: "通过手机号完成用户注册，即成功开立真实账户。",
              imgURL: require(`@/assets/help_xia.png`),
            },
            {
              son_title: "有模拟账户进行模拟交易吗？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "只需注册一个真实账户就可以进行真实及模拟交易，只是在模拟交易中，您所使用的保证金是虚拟的，真实交易则需要您在开始交易之前向账户注资。"
            },
            {
              son_title: "开立真实账户之后就可以进行真实交易吗？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "开立真实账户后，还需要完成实名认证以及账户入金，才可以进行真实交易。"
            },
            {
              son_title: "如何查看我的账户？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "您注册的手机号就是您的账户，在用户中心界面可以查看对应账号的账户资产，在交易界面可以查看对应账号的交易盈亏情况，在出入金功能界面的明细查询里可以查询到对应账号的出入金情况。"
            },
            {
              son_title: "实名认证需要准备哪些资料？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "实名认证需要您准备您本人的身份证正反面照片。"
            },
            {
              son_title: "实名认证未通过怎么办？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "实名认证未通过的原因通常为身份证照片与您本人的真实身份信息不符，或者上传的身份证照片不符合平台规范，您只需要根据提示重新提交资料进行实名认证即可。"
            },
            {
              son_title: "我忘记了密码，如何才能找回？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "如果忘记密码，可以在登录页面点击忘记密码，通过手机号进行找回。"
            },
            {
              son_title: "如何修改密码？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "在用户中心的安全设置里可以修改密码。"
            },
            {
              son_title: "我是iOS/Android手机用户，如何下载软件?",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "请您在官网首页（https://desktrader.cptmarkets.tw/）扫描二微码进行软件下载。"
            },
            {
              son_title: "开户交易流程",
              imgURL: require(`@/assets/help_xia.png`),
              hidden:true,
              son_text: "",
              children: [
                {
                  son_title: "Step1：下载软件",
                  son_text:
                    "在官网首页（https://desktrader.cptmarkets.tw/）扫描二微码进行软件下载。"
                },
                {
                  son_title: "Step2：开立真实账户",
                  son_text: "通过手机号完成用户注册，开立真实账户。"
                },
                {
                  son_title: "Step3：完成实名认证",
                  son_text:
                    "在“我的”-“实名认证”页面，根据提示上传您的身份证正反面照片并正确填写身份信息。"
                },
                {
                  son_title: "Step4：入金",
                  son_text: "在“我的”-“入金”页面，进行人民币入金操作。"
                },
                {
                  son_title: "Step5：交易",
                  son_text:
                    "入金成功后即可在“行情”页面选择投资品种进行交易，并在“交易”页面查看交易详情。"
                },
                {
                  son_title: "Step6：绑定取款银行卡",
                  son_text:
                    "进行出金操作前，需要您先绑定银行卡，您可在“我的”-“收款地址”页面，根据提示上传银行卡正反面照片并正确填写银行卡信息。"
                },
                {
                  son_title: "Step7：出金",
                  son_text: "在“我的”-“出金”页面，进行人民币出金操作。"
                }
              ]
            }
          ]
        },
        {
          title: "交易问题",
          children: [
            {
              son_title: "平台可以交易哪些品种？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "我司提供外汇、商品以及指数的交易产品，在我司开立账户即可同时交易多元化的产品。"
            },
            {
              son_title: "下单指令是如何执行的？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "在收到订单指令时，平台会以最佳市场价执行交易。我司的交易品种报价一般来自全球精选的顶级银行向我们提供的市场报价。"
            },
            {
              son_title: "什么是保证金？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "保证金是指客户存入CPT账户的一笔隔离资金，用以在使用杠杆交易时维持头寸。"
            },
            {
              son_title: "什么是杠杆？",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "杠杆可以让交易者以较少的资金控制大金额头寸的交易方式。杠杆通常以比率表示，例如，如果你的账户杠杆比为100:1， 那么意味着你可以只用1000美元的实际账户资金进行10万美元头寸的交易。我司的不同交易品种杠杆有所不同。"
            },
            {
              son_title: "什么是开仓？什么是平仓?",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "开仓也称为建仓，是指买入黄金现货合约，例如：投资者买入了一笔黄金多头头寸合约，就称这个投资者持有了一笔黄金多头头寸；如果做空了一笔黄金，则称这个投资者持有了一笔黄金空头头寸。当投资者将手里持有的黄金空头头寸卖回给市场的时候，就称之为平仓。"
            },
            {
              son_title: "什么是止盈?",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "止盈（Stop-Profit/Stop Profit），也称停利、止赚，就是在你的目标价位挂单平仓。止盈的概念在见好就收，不要盈在最高。"
            },
            {
              son_title: "什么是止损?",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "止损也叫停损，是在你能够承受的风险损失的价位挂单平仓，以避免形成更大的亏损。其目的就在于投资失误时把损失限定在较小的范围内。"
            },
            {
              son_title: "什么是挂单交易？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "挂单交易是指由客户指定交易币种、金额以及交易目标价格后，一旦报价达到或优于客户指定的价格，即执行客户的指令，完成交易。"
            },
            {
              son_title: "盈亏是如何计算的？",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "总盈亏=点值*变动的点数±过夜利息 (如有)其中点值即为一个点的价值，为价格波动一个点的盈利金额。 而包含日元的货币对，例如美日，以小数点后两位为一个点，也就是0.01为一个点；不含日元的货币对，例如欧美，以小数点后四位为一个点。也就是0.0001为一个点。举例：在欧元美元1.18000的点位买入1手，在1.18500的点位平仓。这样是盈利了50个点，而欧元美元1手的点值为10美元，因此盈亏=10*50=500美元，此订单盈利了500美元。"
            },
            {
              son_title: "为什么我会被平仓？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "在任何情况下，您都有责任监控您的交易账户，并满足保证金要求，以维持您的开仓头寸。在任何时候，如果您的可用资金低于持仓保证金要求时，我们会执行强制平仓。",
            },
            {
              son_title: "如何避免开仓头寸被强制平仓？",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "",
              children: [
                {
                  son_title:
                    "为了避免被强制平仓并控制风险，下面列了几种您可以采取的预防性措施：",
                  son_text: "持续监控您的持仓头寸状态。"
                },
                {
                  son_title: "",
                  son_text:
                    "为每笔交易设置止损定单，以应对市场走势向下的风险。您可在建仓时设置一个止损价位，或者在任何时间对任何持有仓位添加止损定单。您可根据当前市场价格和其他因素，随时调整已设置的止损单。设置止损单未必可以减少您的亏损。"
                },
                {
                  son_title: "",
                  son_text:
                    "确保您的账户保证金高于最低要求。额外保证金可以用来保护你免于受到市场向下的冲击。当您面临保证金低于安全资金要求时，请选择尽快减少持仓或为账户注入额外的资金。"
                },
                {
                  son_title: "",
                  son_text:
                    "使用较低的杠杆比。您可以根据您的实时净值调整杠杆比。"
                }
              ]
            }
          ]
        },
        {
          title: "常见问题",
          children: [
            {
              son_title: "如何开立真实账户？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "通过手机号完成用户注册，即成功开立真实账户。"
            },
            {
              son_title: "开立真实账户之后就可以进行真实交易吗？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "开立真实账户后，还需要完成实名认证以及账户入金，才可以进行真实交易。"
            },
            {
              son_title: "开户交易流程",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "",
              children: [
                {
                  son_title: "Step1：下载软件",
                  son_text:
                    "在官网首页（https://desktrader.cptmarkets.tw/）扫描二微码进行软件下载。"
                },
                {
                  son_title: "Step2：开立真实账户",
                  son_text: "通过手机号完成用户注册，开立真实账户。"
                },
                {
                  son_title: "Step3：完成实名认证",
                  son_text:
                    "在“我的”-“实名认证”页面，根据提示上传您的身份证正反面照片并正确填写身份信息。"
                },
                {
                  son_title: "Step4：入金",
                  son_text: "在“我的”-“入金”页面，进行人民币入金操作。"
                },
                {
                  son_title: "Step5：交易",
                  son_text:
                    "入金成功后即可在“行情”页面选择投资品种进行交易，并在“交易”页面查看交易详情。"
                },
                {
                  son_title: "Step6：绑定取款银行卡",
                  son_text:
                    "进行出金操作前，需要您先绑定银行卡，您可在“我的”-“收款地址”页面，根据提示上传银行卡正反面照片并正确填写银行卡信息。"
                },
                {
                  son_title: "Step7：出金",
                  son_text: "在“我的”-“出金”页面，进行人民币出金操作。"
                }
              ]
            },
            {
              son_title: "实名认证未通过怎么办？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "实名认证未通过的原因通常为身份证照片与您本人的真实身份信息不符，或者上传的身份证照片不符合平台规范，您只需要根据提示重新提交资料进行实名认证即可。"
            },
            {
              son_title: "平台可以交易哪些品种？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "我司提供外汇、商品以及指数的交易产品，在我司开立账户即可同时交易多元化的产品。"
            },
            {
              son_title: "盈亏是如何计算的？",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "总盈亏=点值*变动的点数±过夜利息 (如有)其中点值即为一个点的价值，为价格波动一个点的盈利金额。 而包含日元的货币对，例如美日，以小数点后两位为一个点，也就是0.01为一个点；不含日元的货币对，例如欧美，以小数点后四位为一个点。也就是0.0001为一个点。举例：在欧元美元1.18000的点位买入1手，在1.18500的点位平仓。这样是盈利了50个点，而欧元美元1手的点值为10美元，因此盈亏=10*50=500美元，此订单盈利了500美元。"
            },
            {
              son_title: "为什么我会被平仓？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "在任何情况下，您都有责任监控您的交易账户，并满足保证金要求，以维持您的开仓头寸。在任何时候，如果您的可用资金低于持仓保证金要求时，我们会执行强制平仓。"
            },
            {
              son_title: "如何进行出入金？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "在交易页面或用户中心页面，点击出入金按钮并根据提示进行操作即可完成出入金。出金需要进行实名认证并绑定银行卡。"
            }
          ]
        },
        {
          title: "出入金问题",
          children: [
            {
              son_title: "如何进行出入金？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "在交易页面或用户中心页面，点击出入金按钮并根据提示进行操作即可完成出入金。出金需要进行实名认证并绑定银行卡。"
            },
            {
              son_title: "出入金币种？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "为了方便国内客户进行注资，我司提供人民币出入金的方式，客户仅需通过出入金页面进行操作，一般即时到账，非常方便快捷。"
            },
            {
              son_title: "出入金时段？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "出入金没有时段限制，您可以在工作日或节假日的任何时段进行出入金操作。"
            },
            {
              son_title:
                "如果我用于出金的银行卡已注销、遗失、被盗、或不能用于出金，应该怎么办？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "当您所用的银行卡账户不再有效时，您将需要及时将失效银行卡与本平台解约。"
            },
            {
              son_title: "我可以绑定多张银行卡吗?",
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "可以，您可以绑定多张银行卡，在您进行出金操作时可在列表中选择一张银行卡作为出金到账卡片。"
            },
            {
              son_title: "如何查询我的出入金记录？",
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "在您的出入金明细表里可以查询到您的历史出入金记录。"
            }
          ]
        },
        {
          title: "产品相关问题",
          children: [
            {
              son_title: "什么是商品？",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "商品(英文称作Commodities)所包含的种类繁多，但在金融投资市场上，主要交易的为大宗商品。大宗商品指同质化、可交易及被广泛用作工业基础原材料的商品，主要分为3大类，即能源商品、基础原材料和农副产品，其中最为人熟悉的如原油、有色金属、钢铁、农产品、铁矿石、煤炭等都属于大宗商品。这几年来， 全球对现存有限资源的关注日益高涨，其相对的投资价值也日渐增高，交易额也在逐年递增。"
            },
            {
              son_title: "谁适合买卖贵金属及原油?",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "",
              children: [
                {
                  son_title: "商品的投资者一般有着以下三种之一的特性﹕",
                  son_text:
                    "套期保值者：由于商品的走势往往与其他投资产品的走势相反或者无关所以投资者经常买卖商品以帮助管理风险。"
                },
                {
                  son_title: "",
                  son_text:
                    "投机者：对特定商品持有看法的投资者愿意为获利而承担相应的风险。"
                }
              ]
            },
            {
              son_title: "什么是外汇?",
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:"外汇 (Forex，又称Fx) 是世界上最大及最具流动性的金融市场，它亦是一个分散的贸易市场，在银行、机构、投资者和个人之间，外汇的交易时刻进行着，平均每日交易量超过5万亿美元。与大多数的金融市场不同，外汇市场没有实际位置或中央交易所，而交易时间亦广至5天24小时。",
              children: [
                {
                  son_title: "买卖外汇先学汇率",
                  son_text:
                    "汇率是一国货币兑换另一国货币的比率，是以一种货币表示另一种货币的价格。由于世界各国货币的名称不同，币值不一样，所以一国货币对其他国家的货币要规定一个兑换率，即汇率。"
                },
                {
                  son_title: "",
                  son_text:
                    "例如：于2019年9月30日，1 欧元可兑换 1.08美元 ，于2019年10月18日，1 欧元可兑换1.11美元。在这段时间， 欧元相对于美元的价值上升了约2.7%。"
                }
              ]
            },
            {
              son_title:
                "外汇交易方式?",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:"",
              children: [
                {
                  son_title: "外汇交易从不歇息",
                  son_text:
                    "由于外汇交易在世界各地的每一角落都能进行，因此，您可于每周5天，每天24小时随时进行操作，无论是白天或晚上都能交易"
                },
                {
                  son_title: "双向交易双重机会",
                  son_text:
                    "在外汇市场不存在熊市牛市的区别，无论涨跌都有获利机会。外汇市场不仅可以低买高卖，而且可以在您判断汇率会下跌的时候先卖出， 汇率下跌后再买入平仓，只要选对交易方向均可获取盈利。"
                },
                {
                  son_title: "低交易成本",
                  son_text:
                    "大多数外汇交易商不收取交易手续费，只通过点差（买入价格和卖出价格的差价）获利。"
                },
                {
                  son_title: "杠杆灵活",
                  son_text:
                    "投资者可以少量的资金控制较大的资产，提高客户的资金使用价值。不同产品杠杆也不同，目前外汇保证金交易的杠杆最大可达本金的500 倍，例如：投资 1000 美元就可以做 50 万美元的交易。需要注意的是，交易外汇中风险管理是非常重要，杠杆的高度使用会带来巨大收益同时也有机会导致巨额亏损。"
                },
                {
                  son_title: "透明公正不受操控",
                  son_text:
                    "交易者遍及全球包括各国政府、银行、交易商及个人投资者，全球每日交易量超过 5 万亿美元，这么大的交易量不易被国家甚至个体任意操纵。同时外汇市场的行情和汇率可能随时受到及时发生的事件影响而变动，所以在外汇市场中不存在黑箱操作。"
                },
              ]
            },
            {
              son_title: "什么是指数?",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text:
                "股票指数是一种以股票价格指数作为标的物的金融期货合约。买卖双方交易的是一定时期后的股票指数价格水平。在合约到期后，股指通过现金结算差价的方式来进行交割。指数是由新闻或金融服务公司的名称来命名，作为衡量股市的基准指标指数交易。世界上交易最频繁的指数主要是发达国家和地区的指数包括美国、英国、法国、澳大利亚、德国及日本。期货公司是投资者和交易所之间的纽带，除交易所自营会员外，所有投资者要投资股指期货都必须通过期货经纪公司进行交易。而CPT的股指交易可支持5天24小时以及10多种热门的产品。"
            },
            {
              son_title: "指数买卖方式",
              showBox:false,
              hidden:true,
              imgURL: require(`@/assets/help_xia.png`),
              son_text: "",
               children: [
                {
                  son_title: "低交易成本",
                  son_text:
                    "大多数股指交易商不收取交易手续费，只通过点差（买入价格和卖出价格的差价）获利。杠杆100倍"
                },
                {
                  son_title: "",
                  son_text:
                    "投资者可利用杠杆作用放大投资金额。不同产品杠杆也不同，目前股指保证金交易的杠杆最大可达本金的100倍，例如：投资1,000美元就可以做10万美元的交易。需要注意的是，交易股指中风险管理是非常重要，杠杆的高度使用会带来巨大收益同时也有机会导致巨额亏损"
                },
                {
                  son_title: "对冲功能",
                  son_text:
                    "可双向交易，所以在股指市场不存在熊市牛市的区别，无论涨跌只要选对方向均可获利。抗操纵性强"
                },
                {
                  son_title: "",
                  son_text:
                    "股指标的物是一篮子股票，如果重仓持有的话，需要的资金数量是非常巨大的。因而，大盘指数与单个股票比较，更难被少数人控制和操纵。"
                },
              ]
            }
          ]
        }
      ]
    };
  },
 
  activated(){
    // this.newData = this.listData.concat()
    this.newData = JSON.parse(JSON.stringify(this.listData))

    console.log(this.newData,'132');
  },
  methods: {
    handleShow(item2,index2,index) {
      this.isIndex = index2;
      this.showBox = !this.showBox;
      item2.showBox = !item2.showBox;
      item2.showBox ? item2.imgURL=this.imgURL1 : item2.imgURL=this.imgURL
    },
    onClickLeft() {
      this.$router.push('/help')
    }
  }
};
</script>

<style lang="scss" scoped>
.son {
  .son_index {
    padding-top: 46px;
    .son_index_box {
      .but {
        width: 100%;
        height: 30px;
        background: #fff;
        border-bottom: 4px solid #f4f5fa;
        .icon {
          margin: 0 auto;
          margin-top: 13px;
          width: 13px;
          img {
            width: 100%;
          }
        }
      }
      .isActive {
        -webkit-line-clamp: 20 !important;
      }
      .box {
        margin: 0 auto;
        height: 100%;
        width: 90%;
        overflow: hidden;
        .title {
          padding-top: 15px;
          padding-bottom: 17px;
          font-size: 16px;
          font-weight: 600;
        }
        .text {
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          .text_con {
            font-size: 13px;
            line-height: 24px;
            text-align: justify;
            .text_con_title {
              font-weight: 600;
            }
            p {
              padding: 0;
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>