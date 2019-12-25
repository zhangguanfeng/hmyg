/**
 *  Created by   阿紫
 *  On  2018-12-12
 *  Content
 */

import Vue from 'vue';

import dateFormat from './dateFormat';

// 排除undefined null 等字段
Vue.filter('empytValue', function (value) {
  if (!value && value !=0) {
    return ''
  }else{
    return value
  }
})
// 计时器
// Vue.filter('countDown', function (value) {
//   let curTimers = +new Date();
//   let thirtyTimers = 40 * 60 * 1000;
//   let remainingTimers = +thirtyTimers - (+curTimers - +value);
//   if(remainingTimers > 0){
//     setInterval(()=>{
//       thirtyTimers -= 1000;
//       value = `还有${dateFormat(new Date(remainingTimers), 'mm分ss秒')}交易取消`
//       console.log(value)
//     },1000)
//   }else{
//     value = `${value}交易取消`;
//     return value
//   }

// })
// 判断 iso 安卓
const u = navigator.userAgent;
export const terminal = {
  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
};
// 转化时间搓 第二个参数若不为空则返回yyyy-mm-dd hh mm ss格式
export function timer(timestamp,str) {
      if(timestamp && timestamp != 'null'){
            var date = new Date(timestamp);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
          if(!str){
            return Y+M+D;
          }else{
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y+M+D+h+m+s;
          }
      }else{
          return '';
      }
}

export function inputFloat(val) {
	val = val.replace(/[^\d|\.]/g, '');
	const sp = val.split(/\./);
	let cal = '';
	sp.forEach((el, idx) => {
		cal += el
		if (idx === 0 && /\./.test(val)) {
			cal += '.';
		}
	});
	return cal;
};