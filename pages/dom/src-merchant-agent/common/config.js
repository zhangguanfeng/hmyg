/*
 * @Author: Diskfan
 * @Date: 2019-05-15 15:36:02 
 * @Last Modified by: Diskfan
 * @Last Modified time: 2019-06-21 09:46:56
 */
const state = [
    {value: 1,text:' 创建',text2:'CREATED'},
    {value: 2,text:'等待服务商付款',text2:'USER_SET_GOAL'},
    {value: 4,text:'请放行',text2:'USER_PAID'},
    {value: 5,text:'部分放行',text2:'AGENT_APPROVED'},
    {value: 7,text:'用户投诉',text2:'USER_APPEAL'},
    {value: 3,text:'匹配',text2:'MATCHED'},
    {value: -1000,text:'已结束',text2:'FINISHED'},
    {value: -1,text:'已拒绝',text2:'AGENT_REJECTED'},
    {value: -2,text:'用户拒绝',text2:'USER_REJECTED'},
    {value: -3,text:'用户取消',text2:'USER_CANCELED'},
    {value: -4,text:'冻结',text2:'FROZEN'}
]
const stateCode = {}
state.map(el => stateCode[el.text2] = el.text)
const config = {
    remoteAddr: 'https://otcbus.flashex.tech', // 服务器地址
    fundAddr: 'http://47.52.110.161:7036',
    // fundAddr:'http://192.168.120.108:7036',
    // fundAddr:'http://192.168.120.42:7036',
    currencies: { // 币
        1: 'USDT'
    },
    percent: 0.1,
    // 资金管理 币种
    fundCurrencies: {
        // USDT: 'USDT',
        // BTC: 'BTC',
        // ETH: 'ETH',
        // EOS: 'EOS',
        // TRX: 'TRX',
        // PLAY: 'PLAY'
    },
    fundTypes: {
        in: '充币',
        cool: '冷钱包',
        out: 'CFO提币',
        to_cfo: 'CFO充值',
        fee: '充值归拢费',
        manual: '手动打币'
    },
    pageSizes: [20, 30, 50, 100],
    recordStatus: {
        1: '充值',
        2: '提现',
        3: '购买扣费',
        4: '卖出扣费',
        5: '系统返还',
        6: '买入',
        7: '卖出',
        8: '冻结',
        9: '返佣金',
        10: '提现扣费',
        11: 'CREDIT'
    }, 
    rechargeState: state,
    stateCode: stateCode,
    cardState: {
        0: '隐藏',
        1: '显示'
    },
    payType: {
        1: '银行卡',
        2: '微信',
        3: '支付宝'
    },
    verified: {
        0: '审核中',
        [-1]: '审核未通过',
        1: '审核通过'
    },
    recdStatus: {
        0: '失败',
        1: '成功',
        2: '等待',
        3: '审核中',
        4: '审核不通过'
    }
}
export default config
