// 时间格式化
export { dateFormat, convertValue } from '@/common/util';

// 千分位分割
export const numSplit = num => ((num.toString().indexOf('.') !== -1)
  ? num.toLocaleString()
  : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));

// 转换金额
export const amountFormat = function (amount) {
  if (!amount) return '0元';
  amount += '';
  if (amount.length >= 9) {
    return `${parseInt(amount) / 100000000}亿元`;
  }
  return `${numSplit(amount)}元`;
};

// 转成成百分比数字
export const converterPercent = (num) => {
  if (!num) return '+0.00%';
  num = parseFloat(num);
  const prefix = num >= 0 ? '+' : '';
  return `${prefix + (num * 100).toFixed(2)}%`;
};

// 保留小数位
export function decimal(num, digit, removeUseless = false) {
  digit = typeof digit === 'undefined' ? 2 : digit;

  num = (+num).toFixed(digit);

  if (num) {
    return num;
  }
  return String(+num);
}

//  去掉标签
const tempDiv = document.createElement('div');

export function htmlContent(val) {
  tempDiv.innerHTML = val;
  return tempDiv.innerText;
}
