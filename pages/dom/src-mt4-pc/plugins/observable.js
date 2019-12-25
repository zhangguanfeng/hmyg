// cache
const KEY = '__uuid__';
const dataCache = {};
const newId = createIdDispatcher();

// 生成一个Id分发器
function createIdDispatcher() {
  let uuid = 0;
  return function () {
    return uuid++;
  };
}

// 给对象添加一个不可枚举、不可以修改、不可以删除的属性
function notEnumerableExpand(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value,
  });
}

const cache = {
  get(obj, key) {
    const data = this.getData(obj);
    return data ? data[key] : null;
  },

  set(obj, key, value) {
    let id;
    let data;

    // 如果obj没有id，则初始化一个
    if (!this._hasId(obj)) {
      this._setId(obj);
    }

    // eslint-disable-next-line prefer-const
    id = this._getId(obj);
    data = dataCache[id];

    // 如果cache没有该对象的数据，则初始化一个{}
    if (data == null) {
      data = dataCache[id] = {};
    }

    data[key] = value;
  },

  getData(obj) {
    const id = this._getId(obj);

    if (dataCache[id] == null) {
      return null;
    }

    return dataCache[id];
  },

  getAndIfNullSetDefault(obj, name, _default) {
    if (this.get(obj, name) == null) {
      this.set(obj, name, _default);
      return _default;
    }
    return this.get(obj, name);
  },

  _getId(obj) {
    return obj[KEY];
  },

  _setId(obj) {
    notEnumerableExpand(obj, KEY, newId());
  },

  _hasId(obj) {
    return this._getId(obj) != null;
  },
};


// Observable
const CACHE_KEY = 'events';
const NAMESPCE_FLAG = '^';

function Observable(types, handlers) {
  this.on(types, handlers);
}

Observable.prototype = {
  constructor: Observable,
  on(type, handler, options) {
    Observable.on(this, type, handler, options);

    return this;
  },

  off(type, handler) {
    Observable.off(this, type, handler);

    return this;
  },

  trigger(type, e) {
    return Observable.trigger(this, type, e);
  },

  listenerCount(key) {
    return Observable.listenerCount(this, key);
  },
};


/*
 * param obj {Object} 观察的对象
 * param type {Mixed}
 */

function innerOn(obj, type, handler, first, one) {
  if (type == null) {
    return;
  }

  // type 为 { onClick:function(e){},onTouch:function(e){} }
  // handler 为 null
  if (isObject(type)) {
    one = first; // 因为handler参数不用输，所有参数退一格
    first = handler;
    // eslint-disable-next-line no-restricted-syntax
    for (const t in type) {
      innerOn(obj, t, type[t], first, one);
    }
    return;
  }

  // type 为 'onClick onTouch'
  if (type.indexOf(' ') !== -1) {
    each(type.split(' '), (t) => {
      innerOn(obj, t, handler, first, one);
    });
    return;
  }

  // type 为 ['onClick','onSubmit'] , handler 为 function(){}
  // type 为 ['onClick','onSubmit'] , handler 为 {'onClick':function(){} ,'onSubmit':function(){} }
  if (isArray(type)) {
    each(type, (t) => {
      if (isObject(handler)) {
        innerOn(obj, t, handler[t], first, one);
      } else {
        innerOn(obj, t, handler, first, one);
      }
    });
    return;
  }

  // handler 为 [ function(){} , function(){} ]
  if (isArray(handler)) {
    // eslint-disable-next-line no-var,vars-on-top,block-scoped-var
    for (var i = 0, len = handler.length; i < len; i++) {
      // eslint-disable-next-line block-scoped-var
      innerOn(obj, type, handler[i], first);
    }
    return;
  }

  if (!type || !handler) {
    return;
  }

  const events = cache.getAndIfNullSetDefault(obj, CACHE_KEY, {});

  const namespace = [];
  const parts = type.split(NAMESPCE_FLAG);

  if (parts.length > 1) {
    // eslint-disable-next-line prefer-destructuring
    type = parts[0];
    // eslint-disable-next-line no-var,vars-on-top,block-scoped-var,no-redeclare
    for (var i = 1; i < parts.length; i++) {
      // eslint-disable-next-line block-scoped-var
      namespace.push(parts[i]);
    }
  }

  const handlers = events[type] = events[type] || [];

  // 如果one
  if (one) {
    const original = handler;
    handler = function () {
      Observable.off(obj, type, handler);
      // eslint-disable-next-line prefer-rest-params
      original.apply(obj, arguments);
    };
    handler._original = original;
  }

  const handleObj = {
    handler,
    namespace,
  };

  if (first) {
    handlers.unshift(handleObj);
  } else {
    handlers.push(handleObj);
  }
}

function innerOff(obj, type, handler) {
  const events = cache.get(obj, CACHE_KEY);

  if (events == null) {
    return;
  }

  // off({}) ,全部事件清除
  if (type === undefined) {
    cache.set(obj, CACHE_KEY, null);
    return;
  }

  // off({},'.m')  清除命名空间为m的事件
  if (type.indexOf(NAMESPCE_FLAG) === 0) {
    each(events, (_handler, key) => {
      Observable.off(obj, key + type, _handler);
    });
    return;
  }

  // off({},'onClick');所有onClick事件清除
  if (type.indexOf(NAMESPCE_FLAG) === -1 && handler === undefined) {
    events[type] = [];
    return;
  }


  // 以上是做函数多态的处理
  const parts = type.split(NAMESPCE_FLAG);
  // eslint-disable-next-line no-redeclare,no-var,vars-on-top
  var type = parts[0];
  const namespace = parts.splice(1);

  const handlers = events[type] = events[type] || [];

  if (handlers.length === 0) {
    return;
  }

  for (let i = 0, len = handlers.length; i < len; i++) {
    if (inNamespace(namespace, handlers[i].namespace)) {
      // 当没有handler,type为'onClick.m'的情况,把onClick命名空间为m的所有事件移除'
      if (!handler) {
        handlers.splice(i, 1);
        i--;
        len--;
      } else if (handlers[i].handler === handler) {
        handlers.splice(i, 1);
        break;
      }
    }
  }
}


Observable.on = function (obj, type, handler, options) {
  options = {
    first: false,
    one: false,
    ...options,
  };

  innerOn(obj, type, handler, options.first, options.one);

  return this;
};

Observable.off = function (obj, type, handler) {
  innerOff(obj, type, handler);

  return this;
};


// 返回值为是否阻止默认事件
Observable.trigger = function (obj, type, e) {
  const events = cache.get(obj, CACHE_KEY);

  // trigger({},'.m')  激活所有命名空间为m的事件
  if (type.indexOf(NAMESPCE_FLAG) === 0) {
    each(events, (a, _type) => {
      Observable.trigger(obj, _type + type, e);
    });
    return e.isDefaultPrevented();
  }

  e = e || {};
  e.sender = e.sender || obj; // 事件的发送者
  e.isContinued = returnTrue; // 为false时，停止执行队列中的回调函数
  e.stopContinuation = stopContinuation; // 设置isContinued返回为false
  e.isDefaultPrevented = returnFalse; // 为true时，不执行事件的默认事件（默认事件是自定义的）
  e.preventDefault = preventDefault; // 设置isDefaultPrevented返回为true

  if (events == null) {
    return false;
  }

  const parts = type.split(NAMESPCE_FLAG);
  // eslint-disable-next-line no-var,vars-on-top,no-redeclare
  var type = parts[0];
  const namespace = parts.splice(1);

  let handlers = events[type] = events[type] || [];

  if (handlers.length === 0) {
    return false;
  }

  handlers = handlers.slice(0);

  for (let i = 0, len = handlers.length; i < len; i++) {
    if (inNamespace(namespace, handlers[i].namespace)) {
      const { handler } = handlers[i];
      if (e.isContinued()) {
        handler.call(obj, e);
      }
    }
  }

  return e.isDefaultPrevented();
};

Observable.listenerCount = function (obj, key) {
  let length = 0;
  const events = cache.get(obj, CACHE_KEY);
  each(events, (handlers, _key) => {
    if (key) {
      if (key === _key) length += handlers.length;
    } else {
      length += handlers.length;
    }
  });

  return length;
};

function isObject(obj) {
  return !!obj && obj.constructor === Object;
}

function isArray(obj) {
  return !!obj && obj.constructor === Array;
}

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

function each(obj, callback) {
  if (!obj) return;
  if (obj instanceof Array) {
    obj.forEach((val, index) => callback(val, index));
  } else {
    Object.keys(obj).forEach(key => callback(obj[key], key));
  }
}

function inNamespace(namespace1, namespace2) {
  if (namespace1.length === 0) {
    return true;
  }

  for (let i = 0, len = namespace1.length; i < len; i++) {
    if (namespace2.indexOf(namespace1[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function stopContinuation() {
  this.isContinued = returnFalse;
}

function preventDefault() {
  this.isDefaultPrevented = returnTrue;
}

module.exports = Observable;
