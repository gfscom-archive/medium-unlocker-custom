var content = function() {
  "use strict";

  function t() {}

  function n(t) {
    return t()
  }

  function e() {
    return Object.create(null)
  }

  function o(t) {
    t.forEach(n)
  }

  function r(t) {
    return "function" == typeof t
  }

  function c(t, n) {
    return t != t ? n == n : t !== n || t && "object" == typeof t || "function" == typeof t
  }

  function i(t, n) {
    t.appendChild(n)
  }

  function u(t) {
    t.parentNode.removeChild(t)
  }

  function a(t) {
    return document.createElement(t)
  }

  function l(t, n, e, o) {
    t.style.setProperty(n, e, o ? "important" : "")
  }
  let s;

  function d(t) {
    s = t
  }

  function f(t) {
    (function() {
      if (!s) throw new Error("Function called outside component initialization");
      return s
    })().$$.on_mount.push(t)
  }
  const m = [],
    p = [],
    h = [],
    $ = [],
    g = Promise.resolve();
  let y = !1;

  function _(t) {
    h.push(t)
  }
  const b = new Set;
  let x = 0;

  function w() {
    const t = s;
    do {
      for (; x < m.length;) {
        const t = m[x];
        x++, d(t), v(t.$$)
      }
      for (d(null), m.length = 0, x = 0; p.length;) p.pop()();
      for (let t = 0; t < h.length; t += 1) {
        const n = h[t];
        b.has(n) || (b.add(n), n())
      }
      h.length = 0
    } while (m.length);
    for (; $.length;) $.pop()();
    y = !1, b.clear(), d(t)
  }

  function v(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const n = t.dirty;
      t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(_)
    }
  }
  const k = new Set;

  function E(t, n) {
    -1 === t.$$.dirty[0] && (m.push(t), y || (y = !0, g.then(w)), t.$$.dirty.fill(0)), t.$$.dirty[n / 31 | 0] |= 1 << n % 31
  }

  function C(c, i, a, l, f, m, p, h = [-1]) {
    const $ = s;
    d(c);
    const g = c.$$ = {
      fragment: null,
      ctx: null,
      props: m,
      update: t,
      not_equal: f,
      bound: e(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(i.context || ($ ? $.$$.context : [])),
      callbacks: e(),
      dirty: h,
      skip_bound: !1,
      root: i.target || $.$$.root
    };
    p && p(g.root);
    let y = !1;
    if (g.ctx = a ? a(c, i.props || {}, ((t, n, ...e) => {
        const o = e.length ? e[0] : n;
        return g.ctx && f(g.ctx[t], g.ctx[t] = o) && (!g.skip_bound && g.bound[t] && g.bound[t](o), y && E(c, t)), n
      })) : [], g.update(), y = !0, o(g.before_update), g.fragment = !!l && l(g.ctx), i.target) {
      if (i.hydrate) {
        const t = function(t) {
          return Array.from(t.childNodes)
        }(i.target);
        g.fragment && g.fragment.l(t), t.forEach(u)
      } else g.fragment && g.fragment.c();
      i.intro && ((b = c.$$.fragment) && b.i && (k.delete(b), b.i(x))),
        function(t, e, c, i) {
          const {
            fragment: u,
            on_mount: a,
            on_destroy: l,
            after_update: s
          } = t.$$;
          u && u.m(e, c), i || _((() => {
            const e = a.map(n).filter(r);
            l ? l.push(...e) : o(e), t.$$.on_mount = []
          })), s.forEach(_)
        }(c, i.target, i.anchor, i.customElement), w()
    }
    var b, x;
    d($)
  }
  var I = t => !!document.getElementById(t);

  function S(n) {
    let e, o, r;
    return {
      c() {
        var t;
        e = a("div"), o = a("h1"), t = n[0], r = document.createTextNode(t), l(o, "visibility", "hidden"), l(e, "position", "fixed"), l(e, "top", "0"), l(e, "right", "0"), l(e, "z-index", "9999"), l(e, "width", "64px"), l(e, "height", "64px")
      },
      m(t, n) {
        ! function(t, n, e) {
          t.insertBefore(n, e || null)
        }(t, e, n), i(e, o), i(o, r)
      },
      p(t, [n]) {
        1 & n && function(t, n) {
          n = "" + n, t.wholeText !== n && (t.data = n)
        }(r, t[0])
      },
      i: t,
      o: t,
      d(t) {
        t && u(e)
      }
    }
  }

  function j(t, n, e) {
    let {
      name: o
    } = n;
    return f((() => {
      const t = document.querySelector("div[id*='highlight-meter-']");
      t && t.parentElement && (t.parentElement.style.display = "none");
      const n = setInterval((() => {
        (I("paywall-fewerClicksHeading") || I("regwall-heading")) && window.location.reload()
      }), 5e3);
      return () => clearInterval(n)
    })), t.$$set = t => {
      "name" in t && e(0, o = t.name)
    }, [o]
  }
  const q = "medium-unlocker";
  if (!document.getElementById(q)) {
    const t = document.createElement("div");
    t.setAttribute("id", q), document.body.appendChild(t)
  }
  return new class extends class {
    $destroy() {
      ! function(t, n) {
        const e = t.$$;
        null !== e.fragment && (o(e.on_destroy), e.fragment && e.fragment.d(n), e.on_destroy = e.fragment = null, e.ctx = [])
      }(this, 1), this.$destroy = t
    }
    $on(t, n) {
      const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return e.push(n), () => {
        const t = e.indexOf(n); - 1 !== t && e.splice(t, 1)
      }
    }
    $set(t) {
      var n;
      this.$$set && (n = t, 0 !== Object.keys(n).length) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1)
    }
  } {
    constructor(t) {
      super(), C(this, t, j, S, c, {
        name: 0
      })
    }
  }({
    target: document.querySelector("#medium-unlocker"),
    props: {
      name: "Medium Unlocker"
    }
  })
}();
