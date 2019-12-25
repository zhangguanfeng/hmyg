import Vue from 'vue';
/**
 * 保存用户token
 * @param[session] session
 * @parram[key] 保存时候用的Key
 */
const win = window as any;
const token = (session: string | null | void, key: string = 'mt4_h5_token'): string | null => {
    if (session) {
        localStorage.setItem(key, session);
    } else if (session === null) {
        localStorage.removeItem(key);
    } else {
        session = localStorage.getItem( key ) || '';
    }
    return session || null;
};
/**
 * 当前webView名字
 */
const webViewName = (name: string | null | void, key: string = 'web_view_name'): string | null => {
    if (name) {
        localStorage.setItem(key, name);
    } else if (name === null) {
        localStorage.removeItem(key);
    } else {
        name = localStorage.getItem( key ) || '';
    }
    return name || null;
};
/**
 * 获取类型
 * @param[tag] 目标对象
 */
const type = (tag: any): string => {
    return Object.prototype.toString.call(tag).replace(/.*\s|[^\w]/g, '').toLowerCase();
};
/**
 * 日志输出
 */
const log: any = (...arg: any) => {
    const print: any = win.console;
    const DEV = win.DEV;
    if (DEV) {
        print.log(...arg);
    }
};
const keys = Object.keys(win.console);
keys.map((key: string) => {
    const DEV = win.DEV;
    if (typeof key === 'undefined') {
        return;
    }
    log[key] = DEV ? win.console[key] : () => void 0;
});

/**
 * 日期处理
 */
export const dateFormat: any = ( date: Date | string | null | void, fmt: string = 'YYYY-MM-DD' ) => {
    let newDate: any = date;
    let fmts = fmt;
    // fmts='YYYY-MM-DD HH:mm:ss'
    if ( !newDate ) {
        newDate = new Date();
    }
    if ( typeof +newDate === 'number' ) {
        newDate = new Date( newDate );
    }
    const o: any = {
        'M+': newDate.getMonth() + 1,
        'D+': newDate.getDate(),
        'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
        'H+': newDate.getHours(),
        'm+': newDate.getMinutes(),
        's+': newDate.getSeconds(),
        'q+': Math.floor( ( newDate.getMonth() + 3 ) / 3 ),
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
    if ( /(Y+)/.test( fmts ) ) {
        fmts = fmts.replace( RegExp.$1, ( `${newDate.getFullYear()}` ).substr( 4 - RegExp.$1.length ) );
    }
    if ( /(E+)/.test( fmts ) ) {
        fmts = fmts.replace( RegExp.$1, () => {
            if ( RegExp.$1.length > 1 ) {
                if ( RegExp.$1.length > 2 ) {
                    return `\u661f\u671f${week[newDate.getDay()]}`;
                }
                return `\u5468${week[newDate.getDay()]}`;
            }
            return week[`${newDate.getDay()}`];
        } );
    }
    Object.keys( o )
        .forEach( ( k ) => {
            if ( new RegExp( `(${k})` ).test( fmts ) ) {
                fmts = fmts.replace( RegExp.$1, ( RegExp.$1.length === 1 ) ? ( o[k] ) : ( ( `00${o[k]}` )
                    .substr( ( `${o[k]}` ).length ) ) );
            }
        } );
    return fmts;
};
Vue.filter('dateFormat', dateFormat);

const locale = ( language?: string | void | null, key: string = 'mt4_locale' ): string => {
    if ( language ) {
        localStorage.setItem( key, language );
    } else if ( language === null ) {
        localStorage.removeItem( key );
    } else {
        language = localStorage.getItem( key );
    }
    return language || 'cn';
};

const autoImgSize = ( imgwidth: number, imgheight: number, rewidth: number, reheight: number )
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
    Ratio = ( wRatio <= hRatio ? wRatio : hRatio );
    return {
        width: Math.floor( w * Ratio ),
        height: Math.floor( h * Ratio ),
    };
};
export default {
    token,
    type,
    log,
    locale,
    autoImgSize,
    webViewName,
};
