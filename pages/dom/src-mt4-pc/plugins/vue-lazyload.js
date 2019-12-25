/*!
 * Vue-Lazyload.js v1.2.6
 * (c) 2018 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!(function (t, e) {
  // eslint-disable-next-line no-undef
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : t.VueLazyload = e();
}(this, () => {
  function t(t) {
    return t.constructor && typeof t.constructor.isBuffer === 'function' && t.constructor.isBuffer(t);
  }
  function e(t) {
    t = t || {};
    const e = arguments.length;
    let i = 0;
    if (e === 1) {
      return t;
    }
    for (; ++i < e;) {
      // eslint-disable-next-line prefer-rest-params
      const o = arguments[i];
      // eslint-disable-next-line no-sequences
      g(t) && (t = o),
      r(o) && n(t, o);
    }
    return t;
  }
  function n(t, n) {
    m(t, n);
    // eslint-disable-next-line no-restricted-syntax
    for (const o in n) {
      if (o !== '__proto__' && i(n, o)) {
        const a = n[o];
        r(a) ? (L(t[o]) === 'undefined' && L(a) === 'function' && (t[o] = a),
        t[o] = e(t[o] || {}, a)) : t[o] = a;
      }
    }
    return t;
  }
  function r(t) {
    return L(t) === 'object' || L(t) === 'function';
  }
  function i(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }
  function o(t, e) {
    if (t.length) {
      const n = t.indexOf(e);
      // eslint-disable-next-line no-void
      return n > -1 ? t.splice(n, 1) : void 0;
    }
  }
  function a(t, e) {
    // eslint-disable-next-line no-var,vars-on-top
    for (var n = !1, r = 0, i = t.length; r < i; r++) {
      if (e(t[r])) {
        n = !0;
        break;
      }
    }
    // eslint-disable-next-line block-scoped-var
    return n;
  }
  function s(t, e) {
    if (t.tagName === 'IMG' && t.getAttribute('data-srcset')) {
      let n = t.getAttribute('data-srcset');
      const r = [];
      const i = t.parentNode;
      const o = i.offsetWidth * e;
      // eslint-disable-next-line no-void
      let a = void 0;
      // eslint-disable-next-line no-void
      let s = void 0;
      // eslint-disable-next-line no-void
      let u = void 0;
      n = n.trim()
        // eslint-disable-next-line no-sequences
        .split(','),
      // eslint-disable-next-line array-callback-return
      n.map((t) => {
        // eslint-disable-next-line no-sequences
        t = t.trim(),
        a = t.lastIndexOf(' '),
        a === -1 ? (s = t,
        u = 999998) : (s = t.substr(0, a),
        u = parseInt(t.substr(a + 1, t.length - a - 2), 10)),
        r.push([u, s]);
      }),
      r.sort((t, e) => {
        if (t[0] < e[0]) {
          return -1;
        }
        if (t[0] > e[0]) {
          return 1;
        }
        if (t[0] === e[0]) {
          if (e[1].indexOf('.webp', e[1].length - 5) !== -1) {
            return 1;
          }
          if (t[1].indexOf('.webp', t[1].length - 5) !== -1) {
            return -1;
          }
        }
        return 0;
      });
      // eslint-disable-next-line no-var,no-void,vars-on-top
      for (var l = '', d = void 0, c = r.length, h = 0; h < c; h++) {
        // eslint-disable-next-line no-sequences
        if (d = r[h],
        d[0] >= o) {
          // eslint-disable-next-line prefer-destructuring
          l = d[1];
          break;
        }
      }
      // eslint-disable-next-line block-scoped-var
      return l;
    }
  }
  function u(t, e) {
    // eslint-disable-next-line no-var,no-void,vars-on-top
    for (var n = void 0, r = 0, i = t.length; r < i; r++) {
      if (e(t[r])) {
        n = t[r];
        break;
      }
    }
    // eslint-disable-next-line block-scoped-var
    return n;
  }
  function l() {
    if (!E) {
      return !1;
    }
    let t = !0;
    const e = document;
    try {
      const n = e.createElement('object');
      // eslint-disable-next-line no-sequences
      n.type = 'image/webp',
      n.style.visibility = 'hidden',
      n.innerHTML = '!',
      e.body.appendChild(n),
      t = !n.offsetWidth,
      e.body.removeChild(n);
    } catch (e) {
      t = !1;
    }
    return t;
  }
  function d(t, e) {
    let n = null;
    let r = 0;
    return function () {
      if (!n) {
        const i = Date.now() - r;
        const o = this;
        // eslint-disable-next-line func-names,prefer-rest-params
        const a = arguments;
        const s = function () {
          // eslint-disable-next-line no-sequences
          r = Date.now(),
          n = !1,
          t.apply(o, a);
        };
        i >= e ? s() : n = setTimeout(s, e);
      }
    };
  }
  function c(t) {
    // eslint-disable-next-line no-void
    return t !== null && (void 0 === t ? 'undefined' : p(t)) === 'object';
  }
  function h(t) {
    if (!(t instanceof Object)) {
      return [];
    }
    if (Object.keys) {
      return Object.keys(t);
    }
    const e = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const n in t) {
      // eslint-disable-next-line no-prototype-builtins
      t.hasOwnProperty(n) && e.push(n);
    }
    return e;
  }
  function f(t) {
    // eslint-disable-next-line no-var,vars-on-top
    for (var e = t.length, n = [], r = 0; r < e; r++) {
      n.push(t[r]);
    }
    // eslint-disable-next-line block-scoped-var
    return n;
  }
  function v() {
  }
  // eslint-disable-next-line no-var,vars-on-top
  var p = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) {
    return typeof t;
  }
    : function (t) {
      return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
    };
  const b = function (t, e) {
    if (!(t instanceof e)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };
  const y = (function () {
    function t(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        // eslint-disable-next-line no-sequences
        r.enumerable = r.enumerable || !1,
        r.configurable = !0,
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
      }
    }
    return function (e, n, r) {
      // eslint-disable-next-line no-sequences
      return n && t(e.prototype, n),
      r && t(e, r),
      e;
    };
  }());
  // eslint-disable-next-line no-var,vars-on-top
  var g = function (t) {
    // eslint-disable-next-line no-mixed-operators,no-void
    return t == null || typeof t !== 'function' && (void 0 === t ? 'undefined' : p(t)) !== 'object';
  };
  // eslint-disable-next-line no-var,vars-on-top
  var m = function (t, e) {
    // eslint-disable-next-line no-void
    if (t === null || void 0 === t) {
      throw new TypeError('expected first argument to be an object.');
    }
    // eslint-disable-next-line no-void
    if (void 0 === e || typeof Symbol === 'undefined') {
      return t;
    }
    if (typeof Object.getOwnPropertySymbols !== 'function') {
      return t;
    }
    // eslint-disable-next-line no-var,vars-on-top
    for (var n = Object.prototype.propertyIsEnumerable, r = Object(t), i = arguments.length, o = 0; ++o < i;) {
      // eslint-disable-next-line prefer-rest-params
      for (let a = Object(arguments[o]), s = Object.getOwnPropertySymbols(a), u = 0; u < s.length; u++) {
        const l = s[u];
        n.call(a, l) && (r[l] = a[l]);
      }
    }
    // eslint-disable-next-line block-scoped-var
    return r;
  };
  const w = Object.prototype.toString;
  // eslint-disable-next-line no-var,vars-on-top
  /**
   * @return {string}
   */
  // eslint-disable-next-line no-var,vars-on-top
  var L = function (e) {
    // eslint-disable-next-line no-void
    let n = void 0 === e ? 'undefined' : p(e);
    // eslint-disable-next-line max-len,no-void
    return n === 'undefined' ? 'undefined' : e === null ? 'null' : !0 === e || !1 === e || e instanceof Boolean ? 'boolean' : n === 'string' || e instanceof String ? 'string' : n === 'number' || e instanceof Number ? 'number' : n === 'function' || e instanceof Function ? void 0 !== e.constructor.name && e.constructor.name.slice(0, 9) === 'Generator' ? 'generatorfunction' : 'function' : void 0 !== Array.isArray && Array.isArray(e) ? 'array' : e instanceof RegExp ? 'regexp' : e instanceof Date ? 'date' : (n = w.call(e),
    // eslint-disable-next-line max-len
    n === '[object RegExp]' ? 'regexp' : n === '[object Date]' ? 'date' : n === '[object Arguments]' ? 'arguments' : n === '[object Error]' ? 'error' : n === '[object Promise]' ? 'promise' : t(e) ? 'buffer' : n === '[object Set]' ? 'set' : n === '[object WeakSet]' ? 'weakset' : n === '[object Map]' ? 'map' : n === '[object WeakMap]' ? 'weakmap' : n === '[object Symbol]' ? 'symbol' : n === '[object Map Iterator]' ? 'mapiterator' : n === '[object Set Iterator]' ? 'setiterator' : n === '[object String Iterator]' ? 'stringiterator' : n === '[object Array Iterator]' ? 'arrayiterator' : n === '[object Int8Array]' ? 'int8array' : n === '[object Uint8Array]' ? 'uint8array' : n === '[object Uint8ClampedArray]' ? 'uint8clampedarray' : n === '[object Int16Array]' ? 'int16array' : n === '[object Uint16Array]' ? 'uint16array' : n === '[object Int32Array]' ? 'int32array' : n === '[object Uint32Array]' ? 'uint32array' : n === '[object Float32Array]' ? 'float32array' : n === '[object Float64Array]' ? 'float64array' : 'object');
  };
  const _ = e;
  // eslint-disable-next-line no-var,vars-on-top
  var E = typeof window !== 'undefined';
  const A = E && 'IntersectionObserver' in window;
  const k = {
    event: 'event',
    observer: 'observer',
  };
  const z = (function () {
    function t(t, e) {
      e = e || {
        bubbles: !1,
        cancelable: !1,
        // eslint-disable-next-line no-void
        detail: void 0,
      };
      const n = document.createEvent('CustomEvent');
      // eslint-disable-next-line no-sequences
      return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail),
      n;
    }
    if (E) {
      return typeof window.CustomEvent === 'function' ? window.CustomEvent : (t.prototype = window.Event.prototype,
      t);
    }
  }());
  const j = function () {
    // eslint-disable-next-line no-void,prefer-rest-params
    const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    return E ? window.devicePixelRatio || t : t;
  };
  const T = (function () {
    if (E) {
      let t = !1;
      try {
        const e = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line getter-return
          get() {
            t = !0;
          },
        });
        window.addEventListener('test', null, e);
      } catch (t) {
      }
      return t;
    }
  }());
  const S = {
    on(t, e, n) {
      // eslint-disable-next-line no-void,prefer-rest-params
      const r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      T ? t.addEventListener(e, n, {
        capture: r,
        passive: !0,
      }) : t.addEventListener(e, n, r);
    },
    off(t, e, n) {
      // eslint-disable-next-line no-void,prefer-rest-params
      const r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      t.removeEventListener(e, n, r);
    },
  };
  const I = function (t, e, n) {
    const r = new Image();
    // eslint-disable-next-line no-sequences
    r.src = t.src,
    r.onload = function () {
      e({
        naturalHeight: r.naturalHeight,
        naturalWidth: r.naturalWidth,
        src: r.src,
      });
    },
    r.onerror = function (t) {
      n(t);
    };
  };
  const O = function (t, e) {
    return typeof getComputedStyle !== 'undefined' ? getComputedStyle(t, null)
      .getPropertyValue(e) : t.style[e];
  };
  const $ = function (t) {
    return O(t, 'overflow') + O(t, 'overflow-y') + O(t, 'overflow-x');
  };
  const x = function (t) {
    if (E) {
      if (!(t instanceof HTMLElement)) {
        return window;
      }
      for (let e = t; e && e !== document.body && e !== document.documentElement && e.parentNode;) {
        if (/(scroll|auto)/.test($(e))) {
          return e;
        }
        e = e.parentNode;
      }
      return window;
    }
  };
  const H = {};
  const Q = (function () {
    function t(e) {
      const n = e.el;
      const r = e.src;
      const i = e.error;
      const o = e.loading;
      const a = e.bindType;
      const s = e.$parent;
      const u = e.options;
      const l = e.elRenderer;
      // eslint-disable-next-line no-sequences
      b(this, t),
      this.el = n,
      this.src = r,
      this.error = i,
      this.loading = o,
      this.bindType = a,
      this.attempt = 0,
      this.naturalHeight = 0,
      this.naturalWidth = 0,
      this.options = u,
      this.rect = null,
      this.$parent = s,
      this.elRenderer = l,
      this.performanceData = {
        init: Date.now(),
        loadStart: 0,
        loadEnd: 0,
      },
      this.filter(),
      this.initState(),
      this.render('loading', !1);
    }
    return y(t, [{
      key: 'initState',
      value() {
        // eslint-disable-next-line no-sequences
        'dataset' in this.el ? this.el.dataset.src = this.src : this.el.setAttribute('data-src', this.src),
        this.state = {
          error: !1,
          loaded: !1,
          rendered: !1,
        };
      },
    }, {
      key: 'record',
      value(t) {
        this.performanceData[t] = Date.now();
      },
    }, {
      key: 'update',
      value(t) {
        const e = t.src;
        const n = t.loading;
        const r = t.error;
        const i = this.src;
        // eslint-disable-next-line no-sequences
        this.src = e,
        this.loading = n,
        this.error = r,
        this.filter(),
        i !== this.src && (this.attempt = 0,
        this.initState());
      },
    }, {
      key: 'getRect',
      value() {
        this.rect = this.el.getBoundingClientRect();
      },
    }, {
      key: 'checkInView',
      value() {
        // eslint-disable-next-line no-sequences
        return this.getRect(),
        this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
      },
    }, {
      key: 'filter',
      value() {
        const t = this;
        h(this.options.filter)
        // eslint-disable-next-line array-callback-return
          .map((e) => {
            t.options.filter[e](t, t.options);
          });
      },
    }, {
      key: 'renderLoading',
      value(t) {
        const e = this;
        I({
          src: this.loading,
        }, (n) => {
          // eslint-disable-next-line no-sequences
          e.render('loading', !1),
          t();
        }, () => {
          // eslint-disable-next-line no-sequences
          t(),
          e.options.silent || console.warn(`VueLazyload log: load failed with loading image(${e.loading})`);
        });
      },
    }, {
      key: 'load',
      value() {
        const t = this;
        // eslint-disable-next-line no-void,prefer-rest-params
        const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v;
        return this.attempt > this.options.attempt - 1 && this.state.error ? (this.options.silent || console.log(`VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`),
        // eslint-disable-next-line no-void
        void e()) : this.state.loaded || H[this.src] ? (this.state.loaded = !0,
        e(),
        // eslint-disable-next-line no-void
        this.render('loaded', !0)) : void this.renderLoading(() => {
          // eslint-disable-next-line no-sequences
          t.attempt++,
          t.record('loadStart'),
          I({
            src: t.src,
          }, (n) => {
            // eslint-disable-next-line no-sequences
            t.naturalHeight = n.naturalHeight,
            t.naturalWidth = n.naturalWidth,
            t.state.loaded = !0,
            t.state.error = !1,
            t.record('loadEnd'),
            t.render('loaded', !1),
            H[t.src] = 1,
            e();
          }, (e) => {
            // eslint-disable-next-line no-sequences
            !t.options.silent && console.error(e),
            t.state.error = !0,
            t.state.loaded = !1,
            t.render('error', !1);
          });
        });
      },
    }, {
      key: 'render',
      value(t, e) {
        this.elRenderer(this, t, e);
      },
    }, {
      key: 'performance',
      value() {
        let t = 'loading';
        let e = 0;
        return this.state.loaded && (t = 'loaded',
        // eslint-disable-next-line no-sequences
        e = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3),
        this.state.error && (t = 'error'),
        {
          src: this.src,
          state: t,
          time: e,
        };
      },
    }, {
      key: 'destroy',
      value() {
        // eslint-disable-next-line no-sequences
        this.el = null,
        this.src = null,
        this.error = null,
        this.loading = null,
        this.bindType = null,
        this.attempt = 0;
      },
      // eslint-disable-next-line no-sequences
    }]),
    t;
  }());
  const C = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const R = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];
  const W = {
    rootMargin: '0px',
    threshold: 0,
  };
  const B = function (t) {
    return (function () {
      function e(t) {
        const n = t.preLoad;
        const r = t.error;
        const i = t.throttleWait;
        const o = t.preLoadTop;
        const a = t.dispatchEvent;
        const s = t.loading;
        const u = t.attempt;
        const c = t.silent;
        // eslint-disable-next-line no-void
        const h = void 0 === c || c;
        const f = t.scale;
        const v = t.listenEvents;
        const p = (t.hasbind,
        t.filter);
        const y = t.adapter;
        const g = t.observer;
        const m = t.observerOptions;
        // eslint-disable-next-line no-sequences
        b(this, e),
        this.version = '1.2.6',
        this.mode = k.event,
        this.ListenerQueue = [],
        this.TargetIndex = 0,
        this.TargetQueue = [],
        this.options = {
          silent: h,
          dispatchEvent: !!a,
          throttleWait: i || 200,
          preLoad: n || 1.3,
          preLoadTop: o || 0,
          error: r || C,
          loading: s || C,
          attempt: u || 3,
          scale: f || j(f),
          ListenEvents: v || R,
          hasbind: !1,
          supportWebp: l(),
          filter: p || {},
          adapter: y || {},
          observer: !!g,
          observerOptions: m || W,
        },
        this._initEvent(),
        this.lazyLoadHandler = d(this._lazyLoadHandler.bind(this), this.options.throttleWait),
        this.setMode(this.options.observer ? k.observer : k.event);
      }
      return y(e, [{
        key: 'config',
        value() {
          // eslint-disable-next-line no-void,prefer-rest-params
          const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          _(this.options, t);
        },
      }, {
        key: 'performance',
        value() {
          const t = [];
          // eslint-disable-next-line array-callback-return
          return this.ListenerQueue.map((e) => {
            t.push(e.performance());
            // eslint-disable-next-line no-sequences
          }),
          t;
        },
      }, {
        key: 'addLazyBox',
        value(t) {
          // eslint-disable-next-line no-sequences
          this.ListenerQueue.push(t),
          E && (this._addListenerTarget(window),
          this._observer && this._observer.observe(t.el),
          t.$el && t.$el.parentNode && this._addListenerTarget(t.$el.parentNode));
        },
      }, {
        key: 'add',
        value(e, n, r) {
          const i = this;
          if (a(this.ListenerQueue, t => t.el === e)) {
            // eslint-disable-next-line no-sequences
            return this.update(e, n),
            t.nextTick(this.lazyLoadHandler);
          }
          const o = this._valueFormatter(n.value);
          let u = o.src;
          const l = o.loading;
          const d = o.error;
          function getAbsoluteUrl(url) {
            if (!url) return '';
            const a = document.createElement('a');
            a.href = url;
            return a.href;
          }
          if (getAbsoluteUrl(u) === getAbsoluteUrl(e.src)) return;
          t.nextTick(() => {
            // eslint-disable-next-line no-sequences
            u = s(e, i.options.scale) || u,
            i._observer && i._observer.observe(e);
            const o = Object.keys(n.modifiers)[0];
            // eslint-disable-next-line no-void
            let a = void 0;
            o && (a = r.context.$refs[o],
            // eslint-disable-next-line no-sequences
            a = a ? a.$el || a : document.getElementById(o)),
            a || (a = x(e));
            const c = new Q({
              bindType: n.arg,
              $parent: a,
              el: e,
              loading: l,
              error: d,
              src: u,
              elRenderer: i._elRenderer.bind(i),
              options: i.options,
            });
            // eslint-disable-next-line no-sequences
            i.ListenerQueue.push(c),
            E && (i._addListenerTarget(window),
            i._addListenerTarget(a)),
            i.lazyLoadHandler(),
            t.nextTick(() => i.lazyLoadHandler());
          });
        },
      }, {
        key: 'update',
        value(e, n) {
          const r = this;
          const i = this._valueFormatter(n.value);
          let o = i.src;
          const a = i.loading;
          const l = i.error;
          o = s(e, this.options.scale) || o;
          const d = u(this.ListenerQueue, t => t.el === e);
          d && d.update({
            src: o,
            loading: a,
            error: l,
            // eslint-disable-next-line no-sequences
          }),
          this._observer && (this._observer.unobserve(e),
          this._observer.observe(e)),
          this.lazyLoadHandler(),
          t.nextTick(() => r.lazyLoadHandler());
        },
      }, {
        key: 'remove',
        value(t) {
          if (t) {
            this._observer && this._observer.unobserve(t);
            const e = u(this.ListenerQueue, e => e.el === t);
            e && (this._removeListenerTarget(e.$parent),
            this._removeListenerTarget(window),
            o(this.ListenerQueue, e) && e.destroy());
          }
        },
      }, {
        key: 'removeComponent',
        value(t) {
          t && (o(this.ListenerQueue, t),
          this._observer && this._observer.unobserve(t.el),
          t.$parent && t.$el.parentNode && this._removeListenerTarget(t.$el.parentNode),
          this._removeListenerTarget(window));
        },
      }, {
        key: 'setMode',
        value(t) {
          const e = this;
          // eslint-disable-next-line no-sequences
          A || t !== k.observer || (t = k.event),
          this.mode = t,
          t === k.event ? (this._observer && (this.ListenerQueue.forEach((t) => {
            e._observer.unobserve(t.el);
          }),
          this._observer = null),
          this.TargetQueue.forEach((t) => {
            e._initListen(t.el, !0);
          })) : (this.TargetQueue.forEach((t) => {
            e._initListen(t.el, !1);
          }),
          this._initIntersectionObserver());
        },
      }, {
        key: '_addListenerTarget',
        value(t) {
          if (t) {
            let e = u(this.TargetQueue, e => e.el === t);
            return e ? e.childrenCount++ : (e = {
              el: t,
              id: ++this.TargetIndex,
              childrenCount: 1,
              listened: !0,
            },
            this.mode === k.event && this._initListen(e.el, !0),
            // eslint-disable-next-line no-sequences
            this.TargetQueue.push(e)),
            this.TargetIndex;
          }
        },
      }, {
        key: '_removeListenerTarget',
        value(t) {
          const e = this;
          this.TargetQueue.forEach((n, r) => {
            n.el === t && (--n.childrenCount || (e._initListen(n.el, !1),
            e.TargetQueue.splice(r, 1),
            n = null));
          });
        },
      }, {
        key: '_initListen',
        value(t, e) {
          const n = this;
          this.options.ListenEvents.forEach(r => S[e ? 'on' : 'off'](t, r, n.lazyLoadHandler));
        },
      }, {
        key: '_initEvent',
        value() {
          const t = this;
          this.Event = {
            listeners: {
              loading: [],
              loaded: [],
              error: [],
            },
            // eslint-disable-next-line no-sequences
          },
          this.$on = function (e, n) {
            // eslint-disable-next-line no-sequences
            t.Event.listeners[e] || (t.Event.listeners[e] = []),
            t.Event.listeners[e].push(n);
          },
          this.$once = function (e, n) {
            function r() {
              // eslint-disable-next-line no-sequences
              i.$off(e, r),
              // eslint-disable-next-line prefer-rest-params
              n.apply(i, arguments);
            }
            // eslint-disable-next-line no-var,vars-on-top
            var i = t;
            t.$on(e, r);
          },
          this.$off = function (e, n) {
            if (!n) {
              if (!t.Event.listeners[e]) {
                return;
              }
              // eslint-disable-next-line no-void
              return void (t.Event.listeners[e].length = 0);
            }
            o(t.Event.listeners[e], n);
          },
          this.$emit = function (e, n, r) {
            t.Event.listeners[e] && t.Event.listeners[e].forEach(t => t(n, r));
          };
        },
      }, {
        key: '_lazyLoadHandler',
        value() {
          const t = this;
          const e = [];
          this.ListenerQueue.forEach((t, n) => {
            if (!t.state.error && t.state.loaded) {
              return e.push(t);
            }
            t.checkInView() && t.load();
            // eslint-disable-next-line no-sequences
          }),
          e.forEach(e => o(t.ListenerQueue, e));
        },
      }, {
        key: '_initIntersectionObserver',
        value() {
          const t = this;
          A && (this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions),
          this.ListenerQueue.length && this.ListenerQueue.forEach((e) => {
            t._observer.observe(e.el);
          }));
        },
      }, {
        key: '_observerHandler',
        value(t, e) {
          const n = this;
          t.forEach((t) => {
            t.isIntersecting && n.ListenerQueue.forEach((e) => {
              if (e.el === t.target) {
                if (e.state.loaded) {
                  return n._observer.unobserve(e.el);
                }
                e.load();
              }
            });
          });
        },
      }, {
        key: '_elRenderer',
        value(t, e, n) {
          if (t.el) {
            const r = t.el;
            const i = t.bindType;
            // eslint-disable-next-line no-void
            let o = void 0;
            switch (e) {
              case 'loading':
                o = t.loading;
                break;
              case 'error':
                o = t.error;
                break;
              default:
                o = t.src;
            }
            // eslint-disable-next-line no-sequences
            if (i ? r.style[i] = `url("${o}")` : r.getAttribute('src') !== o && r.setAttribute('src', o),
            r.setAttribute('lazy', e),
            this.$emit(e, t, n),
            this.options.adapter[e] && this.options.adapter[e](t, this.options),
            this.options.dispatchEvent) {
              // eslint-disable-next-line new-cap
              const a = new z(e, {
                detail: t,
              });
              r.dispatchEvent(a);
            }
          }
        },
      }, {
        key: '_valueFormatter',
        value(t) {
          let e = t;
          let n = this.options.loading;
          let r = this.options.error;
          return c(t) && (t.src || this.options.silent || console.error(`Vue Lazyload warning: miss src with ${t}`),
          e = t.src,
          n = t.loading || this.options.loading,
          // eslint-disable-next-line no-sequences
          r = t.error || this.options.error),
          {
            src: e,
            loading: n,
            error: r,
          };
        },
        // eslint-disable-next-line no-sequences
      }]),
      e;
    }());
  };
  const D = function (t) {
    return {
      props: {
        tag: {
          type: String,
          default: 'div',
        },
      },
      render(t) {
        return !1 === this.show ? t(this.tag) : t(this.tag, null, this.$slots.default);
      },
      data() {
        return {
          el: null,
          state: {
            loaded: !1,
          },
          rect: {},
          show: !1,
        };
      },
      mounted() {
        // eslint-disable-next-line no-sequences
        this.el = this.$el,
        t.addLazyBox(this),
        t.lazyLoadHandler();
      },
      beforeDestroy() {
        t.removeComponent(this);
      },
      methods: {
        getRect() {
          this.rect = this.$el.getBoundingClientRect();
        },
        checkInView() {
          // eslint-disable-next-line no-sequences
          return this.getRect(),
          E && this.rect.top < window.innerHeight * t.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * t.options.preLoad && this.rect.right > 0;
        },
        load() {
          // eslint-disable-next-line no-sequences
          this.show = !0,
          this.state.loaded = !0,
          this.$emit('show', this);
        },
      },
    };
  };
  const V = (function () {
    function t(e) {
      const n = e.lazy;
      // eslint-disable-next-line no-sequences
      b(this, t),
      this.lazy = n,
      n.lazyContainerMananger = this,
      this._queue = [];
    }
    return y(t, [{
      key: 'bind',
      value(t, e, n) {
        const r = new N({
          el: t,
          binding: e,
          vnode: n,
          lazy: this.lazy,
        });
        this._queue.push(r);
      },
    }, {
      key: 'update',
      value(t, e, n) {
        const r = u(this._queue, e => e.el === t);
        r && r.update({
          el: t,
          binding: e,
          vnode: n,
        });
      },
    }, {
      key: 'unbind',
      value(t, e, n) {
        const r = u(this._queue, e => e.el === t);
        r && (r.clear(),
        o(this._queue, r));
      },
      // eslint-disable-next-line no-sequences
    }]),
    t;
  }());
  const M = {
    selector: 'img',
  };
  // eslint-disable-next-line no-var,vars-on-top
  var N = (function () {
    function t(e) {
      const n = e.el;
      const r = e.binding;
      const i = e.vnode;
      const o = e.lazy;
      // eslint-disable-next-line no-sequences
      b(this, t),
      this.el = null,
      this.vnode = i,
      this.binding = r,
      this.options = {},
      this.lazy = o,
      this._queue = [],
      this.update({
        el: n,
        binding: r,
      });
    }
    return y(t, [{
      key: 'update',
      value(t) {
        const e = this;
        const n = t.el;
        const r = t.binding;
        // eslint-disable-next-line no-sequences
        this.el = n,
        this.options = _({}, M, r.value),
        this.getImgs()
          .forEach((t) => {
            e.lazy.add(t, _({}, e.binding, {
              value: {
                src: 'dataset' in t ? t.dataset.src : t.getAttribute('data-src'),
                error: 'dataset' in t ? t.dataset.error : t.getAttribute('data-error'),
                loading: 'dataset' in t ? t.dataset.loading : t.getAttribute('data-loading'),
              },
            }), e.vnode);
          });
      },
    }, {
      key: 'getImgs',
      value() {
        return f(this.el.querySelectorAll(this.options.selector));
      },
    }, {
      key: 'clear',
      value() {
        const t = this;
        this.getImgs()
          // eslint-disable-next-line no-sequences
          .forEach(e => t.lazy.remove(e)),
        this.vnode = null,
        this.binding = null,
        this.lazy = null;
      },
      // eslint-disable-next-line no-sequences
    }]),
    t;
  }());
  const P = function (t) {
    return {
      props: {
        src: [String, Object],
        tag: {
          type: String,
          default: 'img',
        },
      },
      render(t) {
        return t(this.tag, {
          attrs: {
            src: this.renderSrc,
          },
        }, this.$slots.default);
      },
      data() {
        return {
          el: null,
          options: {
            src: '',
            error: '',
            loading: '',
            attempt: t.options.attempt,
          },
          state: {
            loaded: !1,
            error: !1,
            attempt: 0,
          },
          rect: {},
          renderSrc: '',
        };
      },
      watch: {
        src() {
          // eslint-disable-next-line no-sequences
          this.init(),
          t.addLazyBox(this),
          t.lazyLoadHandler();
        },
      },
      created() {
        // eslint-disable-next-line no-sequences
        this.init(),
        this.renderSrc = this.options.loading;
      },
      mounted() {
        // eslint-disable-next-line no-sequences
        this.el = this.$el,
        t.addLazyBox(this),
        t.lazyLoadHandler();
      },
      beforeDestroy() {
        t.removeComponent(this);
      },
      methods: {
        init() {
          const e = t._valueFormatter(this.src);
          const n = e.src;
          const r = e.loading;
          const i = e.error;
          // eslint-disable-next-line no-sequences
          this.state.loaded = !1,
          this.options.src = n,
          this.options.error = i,
          this.options.loading = r,
          this.renderSrc = this.options.loading;
        },
        getRect() {
          this.rect = this.$el.getBoundingClientRect();
        },
        checkInView() {
          // eslint-disable-next-line no-sequences
          return this.getRect(),
          E && this.rect.top < window.innerHeight * t.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * t.options.preLoad && this.rect.right > 0;
        },
        load() {
          const e = this;
          // eslint-disable-next-line no-void,prefer-rest-params
          const n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v;
          if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
            // eslint-disable-next-line no-sequences
            return t.options.silent || console.log(`VueLazyload log: ${this.options.src} tried too more than ${this.options.attempt} times`),
            // eslint-disable-next-line no-void
            void n();
          }
          const r = this.options.src;
          I({
            src: r,
          }, (t) => {
            const n = t.src;
            // eslint-disable-next-line no-sequences
            e.renderSrc = n,
            e.state.loaded = !0;
          }, (t) => {
            // eslint-disable-next-line no-sequences
            e.state.attempt++,
            e.renderSrc = e.options.error,
            e.state.error = !0;
          });
        },
      },
    };
  };
  return {
    install(t) {
      // eslint-disable-next-line no-void,prefer-rest-params
      const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      const n = B(t);
      // eslint-disable-next-line new-cap
      const r = new n(e);
      const i = new V({
        lazy: r,
      });
      const o = t.version.split('.')[0] === '2';
      // eslint-disable-next-line no-sequences
      t.prototype.$Lazyload = r,
      e.lazyComponent && t.component('lazy-component', D(r)),
      e.lazyImage && t.component('lazy-image', P(r)),
      o ? (t.directive('lazy', {
        bind: r.add.bind(r),
        update: r.update.bind(r),
        componentUpdated: r.lazyLoadHandler.bind(r),
        unbind: r.remove.bind(r),
      }),
      t.directive('lazy-container', {
        bind: i.bind.bind(i),
        update: i.update.bind(i),
        unbind: i.unbind.bind(i),
      })) : (t.directive('lazy', {
        bind: r.lazyLoadHandler.bind(r),
        update(t, e) {
          // eslint-disable-next-line no-sequences
          _(this.vm.$refs, this.vm.$els),
          r.add(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: t,
            oldValue: e,
          }, {
            context: this.vm,
          });
        },
        unbind() {
          r.remove(this.el);
        },
      }),
      t.directive('lazy-container', {
        update(t, e) {
          i.update(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: t,
            oldValue: e,
          }, {
            context: this.vm,
          });
        },
        unbind() {
          i.unbind(this.el);
        },
      }));
    },
  };
}));
// WEBPACK FOOTER //
// src/js/vue-lazyload.js
