/**
 *  Created by   阿紫
 *  On  2019/03/16
 *  Content
 */

import md5 from 'md5'
import Router from '@/router';

// 参数报错处理
export const convertValue = value => (value || 0)
// Vue.filter('convertValue', convertValue);


// 验证手机号
export const isPhoneNumber = (str) => {
  const reg = /^1[34578]\d{9}$/
  return reg.test(str)
}

// 大陆身份证校验
export function validIdCard(idCard) {
  const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
  return reg.test(idCard)
}

// 香港身份证校验
export function validHkCard(hkCard) {
  const reg = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0−9aA]\)|[0-9aA])$/
  return reg.test(hkCard)
}

// 中文校验
export function validChinese(str) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}


// 日期
export const dateFormat = function(date, fmt = 'YYYY-MM-DD') {
  let newDate = date

  let fmts = fmt

  // console.log(fmt)
  // fmts='YYYY-MM-DD HH:mm:ss'
  if (!newDate) {
    newDate = new Date()
  }
  if (typeof +newDate === 'number') {
    newDate = new Date(newDate)
  }
  const o = {
    'M+': newDate.getMonth() + 1,
    'D+': newDate.getDate(),
    'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
    'H+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    S: newDate.getMilliseconds()
  }
  const week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d'
  }
  if (/(Y+)/.test(fmts)) {
    fmts = fmts.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmts)) {
    fmts = fmts.replace(RegExp.$1, () => {
      if (RegExp.$1.length > 1) {
        if (RegExp.$1.length > 2) {
          return `\u661f\u671f${week[newDate.getDay()]}`
        }
        return `\u5468${week[newDate.getDay()]}`
      }
      return week[`${newDate.getDay()}`]
    })
  }
  Object.keys(o)
    .forEach((k) => {
      if (new RegExp(`(${k})`).test(fmts)) {
        fmts = fmts.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
      }
    })
  return fmts
}

// 获取一个对象中的某个属性
// 解决因对象层级过深,有时候获取的值为undefined时候继续去往下一层获取时的报错
export function getProperty(obj, arg) {
  if (obj === undefined || obj === null) return ''
  let result = obj
  for (let i = 0, l = arg.length; i < l; i++) {
    const value = result[arg[i]]
    if (!value) {
      result = ''
      break
    } else {
      result = value
    }
  }
  return result
}

export const platform = (function() {
  const u = navigator.userAgent
  const app = navigator.appVersion
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
  }
}())

export function scrollTo(scrollPart, offset = 0, duration = 300, pbody = window) {
  const { top } = scrollPart.getBoundingClientRect()
  if (typeof duration === 'object') {
    pbody = duration
    duration = 300
  }

  const startTime = +new Date()
  const start = pbody.scrollTop
  const end = scrollPart.offsetTop + offset
  const change = end - start
  if (change === 0) return

  function run() {
    const time = +new Date() - startTime

    pbody.scrollTo(0, start + change * (time / duration))
    run.timer = requestAnimationFrame(run)
    if (time >= duration) {
      pbody.scrollTo(0, end)
      cancelAnimationFrame(run.timer)
    }
  }

  requestAnimationFrame(run)
}

/**
 * 绑定事件， 用于处理绑定document一类无法从dom节点绑定的
 */
export const bindEvent = (target = document, type = 'click', handle = (e => void 0), flag = false) => {
  if (!target) throw new Error('目标节点不存在')
  if (target.addEventListener) target.addEventListener(type, handle, flag)
  else if (target.attachEvent) target.attachEvent(`on${type}`, handle, flag)
  else target[`on${type}`] = handle
  return target
}
/**
 * 解绑事件
 */
export const unBindEvent = (target = document, type = 'click', handle = (e => void 0)) => {
  if (!target) throw new Error('目标节点不存在')
  if (target.addEventListener) target.removeEventListener(type, handle)
  else if (target.attachEvent) target.detachEvent(`on${type}`, handle)
  return target
}

export const fullscreen = (full, dom = document.body) => {
  let element = document.documentElement
  let exitFullscreen = document.exitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen ||
    document.webkitExitFullscreen
  let requestFullscreen = element.requestFullscreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen
  if (full) {
    if (exitFullscreen) {
      exitFullscreen.call(document)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      let wscript = new ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  } else {
    if (requestFullscreen) {
      requestFullscreen.call(dom)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      let wscript = new ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  }
}
export const token = (session = '') => {
  const key = 'cptToken'
  if (session) {
    sessionStorage.setItem(key, session)
  } else if (session === null) {
    sessionStorage.removeItem(key)
  } else {
    session = sessionStorage.getItem(key)
  }
  return session
}
/**
 * 用户信息
 *
 * @var  {[type]}
 */
export const information = (info = '') => {
  const key = 'cptInformation'
  if (info) {
    sessionStorage.setItem(key, info)
  } else if (info === null) {
    sessionStorage.removeItem(key)
  } else {
    info = sessionStorage.getItem(key)
  }
  return info
}
/**
 * 获取对象类型
 *
 * @var  {[string]}
 */
export const type = (tag = '') => Object.prototype.toString.call(tag).replace(/.*\s|[^\w]/g, '').toLowerCase()

/**
 * 交易模块MD5加密
 * md5Key: 接口/Panel/getWlKey 获取的key值
 * account：资金账号
 * price：开平仓价格或者ORDERID，如果没有开仓平仓价格传ORDERID
 * orderId:ORDERID
 */
export const md5pwd = (md5Key, account, price, orderId) => {
  let num = null
  if (price) {
    price =price * 3
    const arr = (price + '').split('.')
    if (arr[1]) {
      num = (+price).toFixed(5)
    } else {
      num = `${price}.00000`
    }
  } else {
    num = (+orderId)* 3
  }
  const pwd = `${account}|${md5Key.slice(7,44)}|${num}`
  return md5(pwd).toLocaleLowerCase()
}

/**
 * 保存实时报价
 */
export function saveDefaultPrice() {
  const args = arguments
  const key = 'default_symbol_price'
  // 第一个是对象，直接保存起来
  if (type(args[0]) === 'object') {
    localStorage.setItem(key, JSON.stringify(args[0]))
  } else {
    let saved = localStorage.getItem(key) || '{}'
    try {
      saved = JSON.parse(saved)
    } catch (e) {
      saved = {}
    }
    // 传值第一个是symbol  第二个是数值  保存
    if (args.length === 2) {
      saved[args[0]] = args[1]
      sessionStorage.setItem(key, JSON.stringify(saved))
    } else if (args.length === 1) {
      return saved[args[0]] || null
    } else {
      return Object.keys(saved).length ? saved : null
    }
  }
}

export function defaultDurationActive(symbol = null, idx = void 0) {
  const key = 'default_kline_duration'
  let symbols = localStorage.getItem(key) || '{}'
  try {
    symbols = JSON.parse(symbols)
  } catch (e) {
    symbols = {}
  }
  if (typeof idx !== 'undefined') {
    symbols[symbol] = idx
    localStorage.setItem(key, JSON.stringify(symbols))
  } else {
    idx = parseInt(symbols[symbol] || 5)
  }
  return idx
}

export function lastViewSymbol(symbol, key = 'last_view_symbol') {
  if (symbol) {
    localStorage.setItem(key, symbol)
  } else {
    symbol = localStorage.getItem(key)
  }
  return symbol
}

/**
 * 差价点位
 */
export function digitsDesc ( item ) {
  if (item.ASK === null || item.BID === null) {
    return '--';
  }
  let res = ( +item.ASK - +item.BID ) * Math.pow( 10, +item.digits - 1 );
  const sp = res.toString().split( /\./ );
  if ( sp[0].length === 4 ) {
    return res.toFixed( 1 );
  } else if ( sp[0].length >= 5 ) {
    return res.toFixed( 0 );
  } else {
    return res.toFixed( 2 );
  }
}

// 保存账户类型 100 真实 111 模拟账户
export function cptAccountType (type = null) {
  const key = 'cpt_account_type';
  if ( type ) {
    localStorage.setItem( key, type );
  } else {
    type = localStorage.getItem( key ) || '100';
  }
  type = /^(100|111)$/.test( type ) ? type : '100';
  return type;
}
/**
 * 更新网页标题
 *@param item [当前k线图对象]
 * @return  {[type]}  [return description]
 */
export function modifyDocumentTitle ( item = null ) {
  if ( !item || !item.symbol ) {
    const { title } = Router.currentRoute.meta;
    document.title = title || '首页';
  } else {
    const { LASTPRICE, close_price, symbol } = item;
    if ( !/^\d+/.test(LASTPRICE) ) {
      document.title = symbol;
    } else {
      const rate = ( ( +LASTPRICE - +close_price ) * 100 / +close_price );
      const toFixed = rate.toFixed( 2 ) + '%';
      document.title = `${symbol} ${LASTPRICE} ${rate > 0 ? '▲' : '▼'} ${rate > 0 ? '+' + `${toFixed}` : toFixed}`;
    }
  }
}
