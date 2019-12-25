export function dateFormat(date, fmt = 'YYYY-MM-DD') {
    let newDate = date;
    let fmts = fmt;
    if (!newDate) {
        newDate = new Date;
    }
    if (typeof newDate === 'number') {
        newDate = new Date(newDate);
    } else {
        newDate = new Date(newDate);
    }
    const o = {
        'M+': newDate.getMonth() + 1,
        'D+': newDate.getDate(),
        'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
        'H+': newDate.getHours(),
        'm+': newDate.getMinutes(),
        's+': newDate.getSeconds(),
        'q+': Math.floor((newDate.getMonth() + 3) / 3),
        S: newDate.getMilliseconds(),
    };
    const week = {
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
                fmts = fmts.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
            }
        });
    return fmts;
}

export function tokenHandler (key = 'didi_session', session) {
    if (session === null) {
        localStorage.removeItem(key)
    } else if (session) {
        localStorage.setItem(key, session)
    } else {
        return localStorage.getItem(key)
    }
}

// 获取昨天00：00的utc时间
export function yesterdayUtc () {
    const YD = +new Date() - 86400000
    const ND = new Date(YD)
    return parseInt(+new Date(`${ND.getFullYear()}-${ND.getMonth() + 1}-${ND.getDate()}`) / 1000, 10)
}

//获取url中的参数
export function GetQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = ""; 
    if (r != null) 
    context = r[2]; 
    reg = null; 
    r = null; 
    return context == null || context == "" || context == "undefined" ? "" : context; 
}