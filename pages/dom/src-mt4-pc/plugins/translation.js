import axios from 'axios';

function getRoot(com) {
  return `https://translate.google.c${com ? 'om' : 'n'}`;
}

function getError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

function qs(obj) {
  if (!obj) return '';
  const r = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    const v = [].concat(obj[key]);
    r.push(...v.map(valStr => `${key}=${encodeURIComponent(valStr)}`));
  }
  return r.join('&');
}


// 获取文字是什么语言

export const detect = async function (options) {
  const { text, com = false } = typeof options === 'string' ? { text: options } : options;

  // https://translate.google.cn/translate_a/single?client=gtx&sl=auto&dj=1&ie=UTF-8&oe=UTF-8&q=test
  const { data } = await axios({
    baseURL: '',
    url: '/translate_a/single',
    params: {
      client: 'gtx',
      sl: 'auto',
      dj: '1',
      ie: 'UTF-8',
      oe: 'UTF-8',
      // q: text
    },
  });
  const { src } = data;

  if (src) return src;
  throw getError('UNSUPPORTED_LANG');
};
// 获取翻译
/**
 *
 * @param {Object|String} options
 * @param {String} options.text - 要翻译的文本
 * @param {Boolean} options.com - 是否用.com后缀, 这里用不了只能用cn,该参数无用
 * @param {String} options.from - 要翻译的文本是什么语言
 * @param {String} options.to - 要翻译成什么语言
 */
export const translate = async function (options) {
  let {
    // eslint-disable-next-line prefer-const
    text, com = false, from = '', to = '',
  } = typeof options === 'string' ? { text: options } : options;

  if (!from) {
    from = await detect(options);
  }
  if (!to) {
    to = from.startsWith('zh') ? 'en' : 'zh-CN';
  }

  const query = {
    client: 'gtx',
    sl: from,
    tl: to,
    dj: '1',
    ie: 'UTF-8',
    oe: 'UTF-8',
    /*
     t: sentences
     rm: sentences[1]
     bd: dict
     at: alternative_translations
     ss: synsets
     rw: related_words
     ex: examples
     ld: ld_result
    */
    dt: ['at', 'bd', 'ex', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
    // q: text
  };

  return transformRaw(
    await axios({
      // url: getRoot(com) + '/translate_a/single',
      method: 'post',
      baseURL: '',
      url: '/translate_a/single',
      headers: {
        // TODO: 保证目标语种不受操作系统或浏览器的设置影响，直接设置成 zh-CN 仍然有问题，需要看一下 0.6.x 的代码
        'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7',
      },
      params: query,
      paramsSerializer(params) {
        return qs(params);
      },
      data: qs({ q: text }),
    }),
    {
      from,
      to,
      com,
      text,
    },
  );
};

function transformRaw({ data: rawRes }, queryObj) {
  const { text, to } = queryObj;
  const realFrom = rawRes.src || queryObj.from;

  const obj = {
    text,
    from: realFrom,
    to,
    raw: rawRes,
    link: `${getRoot(queryObj.com)}/#${realFrom}/${to}/${encodeURIComponent(
      text,
    )}`,
  };
  try {
    // 尝试获取详细释义
    obj.dict = rawRes.dict.map(v => `${v.pos}：${(v.terms.slice(0, 3) || []).join(',')}`);
  } catch (e) { }

  try {
    // 尝试取得翻译结果
    const { sentences } = rawRes;
    // 去掉最后一项
    sentences.pop();
    obj.result = sentences.map(({ trans }) => trans.trim());
  } catch (e) { }
  if (!obj.dict && !obj.result) {
    throw getError('API_SERVER_ERROR');
  }
  return obj;
}

export default {
  detect,
  translate,
};
