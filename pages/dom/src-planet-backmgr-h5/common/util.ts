import MD5 from 'md5';
/**
 * 格式化日期
 */
export const dateFormat: any = (date: Date | string | null | void, fmt: string = 'YYYY-MM-DD') => {
  let newDate: any = date;
  let fmts = fmt;
  // fmts='YYYY-MM-DD HH:mm:ss'
  if (!newDate) {
    newDate = new Date();
  }
  if (typeof +newDate === 'number') {
    newDate = new Date(newDate);
  }
  const o: any = {
    'M+': newDate.getMonth() + 1,
    'D+': newDate.getDate(),
    'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
    'H+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S': newDate.getMilliseconds(),
  };
  const week: any = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d',
  };
  if (/(Y+)/.test(fmts)) {
    fmts = fmts.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmts)) {
    fmts = fmts.replace(RegExp.$1, () => {
      if (RegExp.$1.length > 1) {
        if (RegExp.$1.length > 2) {
          return `\u661f\u671f${week[newDate.getDay()]}`;
        }
        return `\u5468${week[newDate.getDay()]}`;
      }
      return week[`${newDate.getDay()}`];
    });
  }
  Object.keys(o)
    .forEach((k) => {
      if (new RegExp(`(${k})`).test(fmts)) {
        fmts = fmts.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`)
          .substr((`${o[k]}`).length)));
      }
    });
  return fmts;
};
/**
 * 重新计算img标签最大可设置宽高
 */
const autoImgSize = (imgwidth: number, imgheight: number, rewidth: number, reheight: number)
  : { width: number, height: number } => {
  let hRatio;
  let wRatio;
  let Ratio = 1;
  const maxWidth = rewidth;
  const maxHeight = reheight;
  const w = imgwidth;
  const h = imgheight;
  wRatio = maxWidth / w;
  hRatio = maxHeight / h;
  Ratio = (wRatio <= hRatio ? wRatio : hRatio);
  return {
    width: Math.floor(w * Ratio),
    height: Math.floor(h * Ratio),
  };
};
/**
 * 获取对象类型
 */
const type = (tag: any): string => Object.prototype.toString.call(tag).replace(/.*\s|[^\w]/g, '').toLowerCase();
/**
 * 获取和设置token
 */
const token = (session: string | null | void, key: string = 'platnet_backmgr_token'): string | null => {
  if (session) {
    sessionStorage.setItem(key, session);
  } else if (session === null) {
    sessionStorage.removeItem(key);
  } else {
    session = sessionStorage.getItem(key) || '';
  }
  return session || null;
};
/**
 * 计算随机字符， 大写开头
 *
 * @var  {[string]}
 */
const ramdonString = () => (Math.random().toString(34).replace(/[\d]/g, '') + Math.random().toString(34)).replace(/\./g, '').toUpperCase();
/**
 * 计算 MD5
 */
const md5 = (...arg: any) => MD5(...arg);

/**
 * 图片文件转 BASE64
 */
const readImgFileAsbase64 = (file: File): Promise<any> => {
  return new Promise((resole: (arg?: string | ArrayBuffer | null) => void, reject: () => void) => {
    let reader: FileReader = new FileReader();
    if (!File) {
      reject();
    } else {
      reader.onload = () => {
        resole(reader.result);
      };
      reader.onerror = () => {
        reject();
      };
      reader.readAsDataURL(file);
    }
  });
};
/**
 * 检查是否为 BASE64 图片
 */
const isBase64Img = (str: any) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(str)
/**
 * 过滤为浮点类型
 * @param val 
 */
const floatNumber = (val: string | number): string => {
  if (/^\./.test(val + '')) {
    val = '0.' + val.toString();
  }
  val = val.toString().replace(/[^\d|\.]/g, '');
  const sp = val.toString().split(/\./);
  let cal = '';
  sp.forEach((el: string, idx: number) => {
    cal += el
    if (idx === 0 && /\./.test(val + '')) {
      cal += '.';
    }
  });
  return cal;
}
const bindEvent = (target: any, type: string, handle: (e?: MouseEvent) => void) => {
  if (!target) {
    return;
  }
  if (target.addEventListener) {
    target.addEventListener(type, handle, true);
  } else if (target.attachEvent) {
    target.attachEvent('on' + type, handle);
  } else {
    target[type] = handle;
  }
}
const removeEvent = (target: any, type: string, handle: (e?: MouseEvent) => void) => {
  if (!target) {
    return;
  }
  if (target.addEventListener) {
    target.removeEventListener(type, handle);
  } else if (target.detachEvent) {
    target.detachEvent('on' + type, handle);
  } else {
    target[type] = null;
  }
}
const userInfo = (target?: any): any => {
  const key = 'crm_userinfo_key';
  if (target) {
    try {
      target = JSON.stringify(target);
    } catch(e) {}
    sessionStorage.setItem(key, target);
  } else if (target === null) {
    sessionStorage.removeItem(key);
  } else {
    target = sessionStorage.getItem(key);
    if (target && target !== '{}') {
      try {
        target = JSON.parse(target);
      } catch(e) {}
    }
  }
  return target;
}
export default {
  dateFormat,
  autoImgSize,
  type,
  token,
  ramdonString,
  md5,
  readImgFileAsbase64,
  isBase64Img,
  floatNumber,
  bindEvent,
  removeEvent,
  userInfo
}