/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      2: function (e, t, i) {
        var n, s;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (e) {
            var t,
              i = (this.document || this.ownerDocument).querySelectorAll(e),
              n = this;
            do {
              for (t = i.length; 0 <= --t && i.item(t) !== n; );
            } while (t < 0 && (n = n.parentElement));
            return n;
          }),
          (function () {
            function e(e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
              var i = document.createEvent("CustomEvent");
              return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
            }
            "function" != typeof window.CustomEvent &&
              ((e.prototype = window.Event.prototype),
              (window.CustomEvent = e));
          })(),
          (function () {
            for (
              var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0;
              i < t.length && !window.requestAnimationFrame;
              ++i
            )
              (window.requestAnimationFrame =
                window[t[i] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[t[i] + "CancelAnimationFrame"] ||
                  window[t[i] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (t, i) {
                var n = new Date().getTime(),
                  s = Math.max(0, 16 - (n - e)),
                  r = window.setTimeout(function () {
                    t(n + s);
                  }, s);
                return (e = n + s), r;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (e) {
                  clearTimeout(e);
                });
          })(),
          (s =
            void 0 !== i.g
              ? i.g
              : "undefined" != typeof window
              ? window
              : this),
          (n = function () {
            return (function (e) {
              "use strict";
              var t = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                i = function () {
                  var e = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (t) {
                      for (var i in t) {
                        if (!t.hasOwnProperty(i)) return;
                        e[i] = t[i];
                      }
                    }),
                    e
                  );
                },
                n = function (e) {
                  "#" === e.charAt(0) && (e = e.substr(1));
                  for (
                    var t,
                      i = String(e),
                      n = i.length,
                      s = -1,
                      r = "",
                      o = i.charCodeAt(0);
                    ++s < n;

                  ) {
                    if (0 === (t = i.charCodeAt(s)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    r +=
                      (1 <= t && t <= 31) ||
                      127 == t ||
                      (0 === s && 48 <= t && t <= 57) ||
                      (1 === s && 48 <= t && t <= 57 && 45 === o)
                        ? "\\" + t.toString(16) + " "
                        : 128 <= t ||
                          45 === t ||
                          95 === t ||
                          (48 <= t && t <= 57) ||
                          (65 <= t && t <= 90) ||
                          (97 <= t && t <= 122)
                        ? i.charAt(s)
                        : "\\" + i.charAt(s);
                  }
                  return "#" + r;
                },
                s = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                r = function (t) {
                  return t
                    ? ((i = t),
                      parseInt(e.getComputedStyle(i).height, 10) + t.offsetTop)
                    : 0;
                  var i;
                },
                o = function (t, i, n) {
                  0 === t && document.body.focus(),
                    n ||
                      (t.focus(),
                      document.activeElement !== t &&
                        (t.setAttribute("tabindex", "-1"),
                        t.focus(),
                        (t.style.outline = "none")),
                      e.scrollTo(0, i));
                },
                a = function (t, i, n, s) {
                  if (i.emitEvents && "function" == typeof e.CustomEvent) {
                    var r = new CustomEvent(t, {
                      bubbles: !0,
                      detail: { anchor: n, toggle: s },
                    });
                    document.dispatchEvent(r);
                  }
                };
              return function (l, d) {
                var c,
                  u,
                  p,
                  h,
                  f = {
                    cancelScroll: function (e) {
                      cancelAnimationFrame(h),
                        (h = null),
                        e || a("scrollCancel", c);
                    },
                    animateScroll: function (n, l, d) {
                      f.cancelScroll();
                      var u = i(c || t, d || {}),
                        g =
                          "[object Number]" ===
                          Object.prototype.toString.call(n),
                        m = g || !n.tagName ? null : n;
                      if (g || m) {
                        var v = e.pageYOffset;
                        u.header &&
                          !p &&
                          (p = document.querySelector(u.header));
                        var y,
                          b,
                          _,
                          w,
                          T,
                          x,
                          C,
                          S,
                          E = r(p),
                          O = g
                            ? n
                            : (function (t, i, n, r) {
                                var o = 0;
                                if (t.offsetParent)
                                  for (
                                    ;
                                    (o += t.offsetTop), (t = t.offsetParent);

                                  );
                                return (
                                  (o = Math.max(o - i - n, 0)),
                                  r && (o = Math.min(o, s() - e.innerHeight)),
                                  o
                                );
                              })(
                                m,
                                E,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(n, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          k = O - v,
                          A = s(),
                          M = 0,
                          I =
                            ((y = k),
                            (_ = (b = u).speedAsDuration
                              ? b.speed
                              : Math.abs((y / 1e3) * b.speed)),
                            b.durationMax && _ > b.durationMax
                              ? b.durationMax
                              : b.durationMin && _ < b.durationMin
                              ? b.durationMin
                              : parseInt(_, 10)),
                          L = function (t) {
                            var i, s, r;
                            w || (w = t),
                              (M += t - w),
                              (x =
                                v +
                                k *
                                  ((s = T =
                                    1 < (T = 0 === I ? 0 : M / I) ? 1 : T),
                                  "easeInQuad" === (i = u).easing &&
                                    (r = s * s),
                                  "easeOutQuad" === i.easing &&
                                    (r = s * (2 - s)),
                                  "easeInOutQuad" === i.easing &&
                                    (r =
                                      s < 0.5
                                        ? 2 * s * s
                                        : (4 - 2 * s) * s - 1),
                                  "easeInCubic" === i.easing && (r = s * s * s),
                                  "easeOutCubic" === i.easing &&
                                    (r = --s * s * s + 1),
                                  "easeInOutCubic" === i.easing &&
                                    (r =
                                      s < 0.5
                                        ? 4 * s * s * s
                                        : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                          1),
                                  "easeInQuart" === i.easing &&
                                    (r = s * s * s * s),
                                  "easeOutQuart" === i.easing &&
                                    (r = 1 - --s * s * s * s),
                                  "easeInOutQuart" === i.easing &&
                                    (r =
                                      s < 0.5
                                        ? 8 * s * s * s * s
                                        : 1 - 8 * --s * s * s * s),
                                  "easeInQuint" === i.easing &&
                                    (r = s * s * s * s * s),
                                  "easeOutQuint" === i.easing &&
                                    (r = 1 + --s * s * s * s * s),
                                  "easeInOutQuint" === i.easing &&
                                    (r =
                                      s < 0.5
                                        ? 16 * s * s * s * s * s
                                        : 1 + 16 * --s * s * s * s * s),
                                  i.customEasing && (r = i.customEasing(s)),
                                  r || s)),
                              e.scrollTo(0, Math.floor(x)),
                              (function (t, i) {
                                var s = e.pageYOffset;
                                if (
                                  t == i ||
                                  s == i ||
                                  (v < i && e.innerHeight + s) >= A
                                )
                                  return (
                                    f.cancelScroll(!0),
                                    o(n, i, g),
                                    a("scrollStop", u, n, l),
                                    !(h = w = null)
                                  );
                              })(x, O) ||
                                ((h = e.requestAnimationFrame(L)), (w = t));
                          };
                        0 === e.pageYOffset && e.scrollTo(0, 0),
                          (C = n),
                          (S = u),
                          g ||
                            (history.pushState &&
                              S.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(S),
                                  anchor: C.id,
                                },
                                document.title,
                                C === document.documentElement
                                  ? "#top"
                                  : "#" + C.id
                              )),
                          "matchMedia" in e &&
                          e.matchMedia("(prefers-reduced-motion)").matches
                            ? o(n, Math.floor(O), !1)
                            : (a("scrollStart", u, n, l),
                              f.cancelScroll(!0),
                              e.requestAnimationFrame(L));
                      }
                    },
                  },
                  g = function (t) {
                    if (
                      !t.defaultPrevented &&
                      !(
                        0 !== t.button ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey
                      ) &&
                      "closest" in t.target &&
                      (u = t.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !t.target.closest(c.ignore) &&
                      u.hostname === e.location.hostname &&
                      u.pathname === e.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var i, s;
                      try {
                        i = n(decodeURIComponent(u.hash));
                      } catch (t) {
                        i = n(u.hash);
                      }
                      if ("#" === i) {
                        if (!c.topOnEmptyHash) return;
                        s = document.documentElement;
                      } else s = document.querySelector(i);
                      (s = s || "#top" !== i ? s : document.documentElement) &&
                        (t.preventDefault(),
                        (function (t) {
                          if (
                            history.replaceState &&
                            t.updateURL &&
                            !history.state
                          ) {
                            var i = e.location.hash;
                            (i = i || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(t),
                                  anchor: i || e.pageYOffset,
                                },
                                document.title,
                                i || e.location.href
                              );
                          }
                        })(c),
                        f.animateScroll(s, u));
                    }
                  },
                  m = function (e) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(c)
                    ) {
                      var t = history.state.anchor;
                      ("string" == typeof t &&
                        t &&
                        !(t = document.querySelector(
                          n(history.state.anchor)
                        ))) ||
                        f.animateScroll(t, null, { updateURL: !1 });
                    }
                  };
                return (
                  (f.destroy = function () {
                    c &&
                      (document.removeEventListener("click", g, !1),
                      e.removeEventListener("popstate", m, !1),
                      f.cancelScroll(),
                      (h = p = u = c = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in e &&
                        "requestAnimationFrame" in e &&
                        "closest" in e.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    f.destroy(),
                      (c = i(t, d || {})),
                      (p = c.header ? document.querySelector(c.header) : null),
                      document.addEventListener("click", g, !1),
                      c.updateURL &&
                        c.popstate &&
                        e.addEventListener("popstate", m, !1);
                  })(),
                  f
                );
              };
            })(s);
          }.apply(t, [])),
          void 0 === n || (e.exports = n);
      },
      732: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i)
                      Object.prototype.hasOwnProperty.call(i, n) &&
                        (e[n] = i[n]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            i =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            n = t && "IntersectionObserver" in window,
            s = t && "classList" in document.createElement("p"),
            r = t && window.devicePixelRatio > 1,
            o = {
              elements_selector: ".lazy",
              container: i || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            a = function (t) {
              return e({}, o, t);
            },
            l = function (e, t) {
              var i,
                n = "LazyLoad::Initialized",
                s = new e(t);
              try {
                i = new CustomEvent(n, { detail: { instance: s } });
              } catch (e) {
                (i = document.createEvent("CustomEvent")).initCustomEvent(
                  n,
                  !1,
                  !1,
                  { instance: s }
                );
              }
              window.dispatchEvent(i);
            },
            d = "src",
            c = "srcset",
            u = "sizes",
            p = "poster",
            h = "llOriginalAttrs",
            f = "data",
            g = "loading",
            m = "loaded",
            v = "applied",
            y = "error",
            b = "native",
            _ = "data-",
            w = "ll-status",
            T = function (e, t) {
              return e.getAttribute(_ + t);
            },
            x = function (e) {
              return T(e, w);
            },
            C = function (e, t) {
              return (function (e, t, i) {
                var n = "data-ll-status";
                null !== i ? e.setAttribute(n, i) : e.removeAttribute(n);
              })(e, 0, t);
            },
            S = function (e) {
              return C(e, null);
            },
            E = function (e) {
              return null === x(e);
            },
            O = function (e) {
              return x(e) === b;
            },
            k = [g, m, v, y],
            A = function (e, t, i, n) {
              e &&
                (void 0 === n ? (void 0 === i ? e(t) : e(t, i)) : e(t, i, n));
            },
            M = function (e, t) {
              s
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            I = function (e, t) {
              s
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            L = function (e) {
              return e.llTempImage;
            },
            P = function (e, t) {
              if (t) {
                var i = t._observer;
                i && i.unobserve(e);
              }
            },
            D = function (e, t) {
              e && (e.loadingCount += t);
            },
            z = function (e, t) {
              e && (e.toLoadCount = t);
            },
            $ = function (e) {
              for (var t, i = [], n = 0; (t = e.children[n]); n += 1)
                "SOURCE" === t.tagName && i.push(t);
              return i;
            },
            B = function (e, t) {
              var i = e.parentNode;
              i && "PICTURE" === i.tagName && $(i).forEach(t);
            },
            F = function (e, t) {
              $(e).forEach(t);
            },
            N = [d],
            G = [d, p],
            R = [d, c, u],
            H = [f],
            q = function (e) {
              return !!e[h];
            },
            V = function (e) {
              return e[h];
            },
            j = function (e) {
              return delete e[h];
            },
            W = function (e, t) {
              if (!q(e)) {
                var i = {};
                t.forEach(function (t) {
                  i[t] = e.getAttribute(t);
                }),
                  (e[h] = i);
              }
            },
            Y = function (e, t) {
              if (q(e)) {
                var i = V(e);
                t.forEach(function (t) {
                  !(function (e, t, i) {
                    i ? e.setAttribute(t, i) : e.removeAttribute(t);
                  })(e, t, i[t]);
                });
              }
            },
            X = function (e, t, i) {
              M(e, t.class_loading),
                C(e, g),
                i && (D(i, 1), A(t.callback_loading, e, i));
            },
            U = function (e, t, i) {
              i && e.setAttribute(t, i);
            },
            Q = function (e, t) {
              U(e, u, T(e, t.data_sizes)),
                U(e, c, T(e, t.data_srcset)),
                U(e, d, T(e, t.data_src));
            },
            K = {
              IMG: function (e, t) {
                B(e, function (e) {
                  W(e, R), Q(e, t);
                }),
                  W(e, R),
                  Q(e, t);
              },
              IFRAME: function (e, t) {
                W(e, N), U(e, d, T(e, t.data_src));
              },
              VIDEO: function (e, t) {
                F(e, function (e) {
                  W(e, N), U(e, d, T(e, t.data_src));
                }),
                  W(e, G),
                  U(e, p, T(e, t.data_poster)),
                  U(e, d, T(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                W(e, H), U(e, f, T(e, t.data_src));
              },
            },
            Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            J = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                A(e.callback_finish, t);
            },
            ee = function (e, t, i) {
              e.addEventListener(t, i), (e.llEvLisnrs[t] = i);
            },
            te = function (e, t, i) {
              e.removeEventListener(t, i);
            },
            ie = function (e) {
              return !!e.llEvLisnrs;
            },
            ne = function (e) {
              if (ie(e)) {
                var t = e.llEvLisnrs;
                for (var i in t) {
                  var n = t[i];
                  te(e, i, n);
                }
                delete e.llEvLisnrs;
              }
            },
            se = function (e, t, i) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                D(i, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(i),
                I(e, t.class_loading),
                t.unobserve_completed && P(e, i);
            },
            re = function (e, t, i) {
              var n = L(e) || e;
              ie(n) ||
                (function (e, t, i) {
                  ie(e) || (e.llEvLisnrs = {});
                  var n = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  ee(e, n, t), ee(e, "error", i);
                })(
                  n,
                  function (s) {
                    !(function (e, t, i, n) {
                      var s = O(t);
                      se(t, i, n),
                        M(t, i.class_loaded),
                        C(t, m),
                        A(i.callback_loaded, t, n),
                        s || J(i, n);
                    })(0, e, t, i),
                      ne(n);
                  },
                  function (s) {
                    !(function (e, t, i, n) {
                      var s = O(t);
                      se(t, i, n),
                        M(t, i.class_error),
                        C(t, y),
                        A(i.callback_error, t, n),
                        s || J(i, n);
                    })(0, e, t, i),
                      ne(n);
                  }
                );
            },
            oe = function (e, t, i) {
              !(function (e) {
                e.llTempImage = document.createElement("IMG");
              })(e),
                re(e, t, i),
                (function (e) {
                  q(e) || (e[h] = { backgroundImage: e.style.backgroundImage });
                })(e),
                (function (e, t, i) {
                  var n = T(e, t.data_bg),
                    s = T(e, t.data_bg_hidpi),
                    o = r && s ? s : n;
                  o &&
                    ((e.style.backgroundImage = 'url("'.concat(o, '")')),
                    L(e).setAttribute(d, o),
                    X(e, t, i));
                })(e, t, i),
                (function (e, t, i) {
                  var n = T(e, t.data_bg_multi),
                    s = T(e, t.data_bg_multi_hidpi),
                    o = r && s ? s : n;
                  o &&
                    ((e.style.backgroundImage = o),
                    (function (e, t, i) {
                      M(e, t.class_applied),
                        C(e, v),
                        i &&
                          (t.unobserve_completed && P(e, t),
                          A(t.callback_applied, e, i));
                    })(e, t, i));
                })(e, t, i);
            },
            ae = function (e, t, i) {
              !(function (e) {
                return Z.indexOf(e.tagName) > -1;
              })(e)
                ? oe(e, t, i)
                : (function (e, t, i) {
                    re(e, t, i),
                      (function (e, t, i) {
                        var n = K[e.tagName];
                        n && (n(e, t), X(e, t, i));
                      })(e, t, i);
                  })(e, t, i);
            },
            le = function (e) {
              e.removeAttribute(d), e.removeAttribute(c), e.removeAttribute(u);
            },
            de = function (e) {
              B(e, function (e) {
                Y(e, R);
              }),
                Y(e, R);
            },
            ce = {
              IMG: de,
              IFRAME: function (e) {
                Y(e, N);
              },
              VIDEO: function (e) {
                F(e, function (e) {
                  Y(e, N);
                }),
                  Y(e, G),
                  e.load();
              },
              OBJECT: function (e) {
                Y(e, H);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = ce[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (q(e)) {
                        var t = V(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  E(e) ||
                    O(e) ||
                    (I(e, t.class_entered),
                    I(e, t.class_exited),
                    I(e, t.class_applied),
                    I(e, t.class_loading),
                    I(e, t.class_loaded),
                    I(e, t.class_error));
                })(e, t),
                S(e),
                j(e);
            },
            pe = ["IMG", "IFRAME", "VIDEO"],
            he = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            fe = function (e, t, i) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, i, n) {
                      var s = (function (e) {
                        return k.indexOf(x(e)) >= 0;
                      })(e);
                      C(e, "entered"),
                        M(e, i.class_entered),
                        I(e, i.class_exited),
                        (function (e, t, i) {
                          t.unobserve_entered && P(e, i);
                        })(e, i, n),
                        A(i.callback_enter, e, t, n),
                        s || ae(e, i, n);
                    })(e.target, e, t, i)
                  : (function (e, t, i, n) {
                      E(e) ||
                        (M(e, i.class_exited),
                        (function (e, t, i, n) {
                          i.cancel_on_exit &&
                            (function (e) {
                              return x(e) === g;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (ne(e),
                            (function (e) {
                              B(e, function (e) {
                                le(e);
                              }),
                                le(e);
                            })(e),
                            de(e),
                            I(e, i.class_loading),
                            D(n, -1),
                            S(e),
                            A(i.callback_cancel, e, t, n));
                        })(e, t, i, n),
                        A(i.callback_exit, e, t, n));
                    })(e.target, e, t, i);
              });
            },
            ge = function (e) {
              return Array.prototype.slice.call(e);
            },
            me = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ve = function (e) {
              return (function (e) {
                return x(e) === y;
              })(e);
            },
            ye = function (e, t) {
              return (function (e) {
                return ge(e).filter(E);
              })(e || me(t));
            },
            be = function (e, i) {
              var s = a(e);
              (this._settings = s),
                (this.loadingCount = 0),
                (function (e, t) {
                  n &&
                    !he(e) &&
                    (t._observer = new IntersectionObserver(
                      function (i) {
                        fe(i, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e)
                    ));
                })(s, this),
                (function (e, i) {
                  t &&
                    window.addEventListener("online", function () {
                      !(function (e, t) {
                        var i;
                        ((i = me(e)), ge(i).filter(ve)).forEach(function (t) {
                          I(t, e.class_error), S(t);
                        }),
                          t.update();
                      })(e, i);
                    });
                })(s, this),
                this.update(i);
            };
          return (
            (be.prototype = {
              update: function (e) {
                var t,
                  s,
                  r = this._settings,
                  o = ye(e, r);
                z(this, o.length),
                  !i && n
                    ? he(r)
                      ? (function (e, t, i) {
                          e.forEach(function (e) {
                            -1 !== pe.indexOf(e.tagName) &&
                              (function (e, t, i) {
                                e.setAttribute("loading", "lazy"),
                                  re(e, t, i),
                                  (function (e, t) {
                                    var i = K[e.tagName];
                                    i && i(e, t);
                                  })(e, t),
                                  C(e, b);
                              })(e, t, i);
                          }),
                            z(i, 0);
                        })(o, r, this)
                      : ((s = o),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, s))
                    : this.loadAll(o);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  me(this._settings).forEach(function (e) {
                    j(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  i = this._settings;
                ye(e, i).forEach(function (e) {
                  P(e, t), ae(e, i, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                me(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (be.load = function (e, t) {
              var i = a(t);
              ae(e, i);
            }),
            (be.resetStatus = function (e) {
              S(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var i, n = 0; (i = t[n]); n += 1) l(e, i);
                  else l(e, t);
              })(be, window.lazyLoadOptions),
            be
          );
        })();
      },
    },
    t = {};
  function i(n) {
    var s = t[n];
    if (void 0 !== s) return s.exports;
    var r = (t[n] = { exports: {} });
    return e[n].call(r.exports, r, r.exports, i), r.exports;
  }
  (i.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      function e(e) {
        this.type = e;
      }
      (e.prototype.init = function () {
        const e = this;
        (this.оbjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]"));
        for (let e = 0; e < this.nodes.length; e++) {
          const t = this.nodes[e],
            i = t.dataset.da.trim().split(","),
            n = {};
          (n.element = t),
            (n.parent = t.parentNode),
            (n.destination = document.querySelector(i[0].trim())),
            (n.breakpoint = i[1] ? i[1].trim() : "767"),
            (n.place = i[2] ? i[2].trim() : "last"),
            (n.index = this.indexInParent(n.parent, n.element)),
            this.оbjects.push(n);
        }
        this.arraySort(this.оbjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.оbjects,
            function (e) {
              return (
                "(" +
                this.type +
                "-width: " +
                e.breakpoint +
                "px)," +
                e.breakpoint
              );
            },
            this
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (e, t, i) {
              return Array.prototype.indexOf.call(i, e) === t;
            }
          ));
        for (let t = 0; t < this.mediaQueries.length; t++) {
          const i = this.mediaQueries[t],
            n = String.prototype.split.call(i, ","),
            s = window.matchMedia(n[0]),
            r = n[1],
            o = Array.prototype.filter.call(this.оbjects, function (e) {
              return e.breakpoint === r;
            });
          s.addListener(function () {
            e.mediaHandler(s, o);
          }),
            this.mediaHandler(s, o);
        }
      }),
        (e.prototype.mediaHandler = function (e, t) {
          if (e.matches)
            for (let e = 0; e < t.length; e++) {
              const i = t[e];
              (i.index = this.indexInParent(i.parent, i.element)),
                this.moveTo(i.place, i.element, i.destination);
            }
          else
            for (let e = t.length - 1; e >= 0; e--) {
              const i = t[e];
              i.element.classList.contains(this.daClassname) &&
                this.moveBack(i.parent, i.element, i.index);
            }
        }),
        (e.prototype.moveTo = function (e, t, i) {
          t.classList.add(this.daClassname),
            "last" === e || e >= i.children.length
              ? i.insertAdjacentElement("beforeend", t)
              : "first" !== e
              ? i.children[e].insertAdjacentElement("beforebegin", t)
              : i.insertAdjacentElement("afterbegin", t);
        }),
        (e.prototype.moveBack = function (e, t, i) {
          t.classList.remove(this.daClassname),
            void 0 !== e.children[i]
              ? e.children[i].insertAdjacentElement("beforebegin", t)
              : e.insertAdjacentElement("beforeend", t);
        }),
        (e.prototype.indexInParent = function (e, t) {
          const i = Array.prototype.slice.call(e.children);
          return Array.prototype.indexOf.call(i, t);
        }),
        (e.prototype.arraySort = function (e) {
          "min" === this.type
            ? Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                    ? -1
                    : "last" === e.place || "first" === t.place
                    ? 1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              })
            : Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                    ? 1
                    : "last" === e.place || "first" === t.place
                    ? -1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              });
        });
      new e("max").init();
      class t {
        constructor(e) {
          let t = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...t,
              ...e,
              classes: { ...t.classes, ...e?.classes },
              hashSettings: { ...t.hashSettings, ...e?.hashSettings },
              on: { ...t.on, ...e?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (e) {
              const t = e.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (t)
                return (
                  e.preventDefault(),
                  (this._dataValue = t.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? t.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = t),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void 0
                );
              return e.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (e.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (e) {
                if (
                  this.options.closeEsc &&
                  27 == e.which &&
                  "Escape" === e.code &&
                  this.isOpen
                )
                  return e.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == e.which &&
                  this.isOpen &&
                  this._focusCatch(e);
              }.bind(this)
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (e) {
                  const t = e.detail.form.dataset.popupMessage;
                  t && this.open(t);
                }.bind(this)
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(e) {
          if (
            (e &&
              "string" == typeof e &&
              "" !== e.trim() &&
              ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                t = document.createElement("iframe");
              t.setAttribute("allowfullscreen", "");
              const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
              t.setAttribute("allow", `${i}; encrypted-media`),
                t.setAttribute("src", e),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(t);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : r(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              );
          }
        }
        close(e) {
          e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            (this.previousOpen.selector = e),
            this.isOpen &&
              s &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                r(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let e = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${e}"]`
          ) &&
            e &&
            this.open(e);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
          const t = this.targetOpen.element.querySelectorAll(this._focusEl),
            i = Array.prototype.slice.call(t),
            n = i.indexOf(document.activeElement);
          e.shiftKey &&
            0 === n &&
            (i[i.length - 1].focus(), e.preventDefault()),
            e.shiftKey ||
              n !== i.length - 1 ||
              (i[0].focus(), e.preventDefault());
        }
        _focusTrap() {
          const e = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : e[0].focus();
        }
      }
      let n = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            n.Android() || n.BlackBerry() || n.iOS() || n.Opera() || n.Windows()
          );
        },
      };
      let s = !0,
        r = (e = 500) => {
          document.documentElement.classList.contains("lock") ? o(e) : a(e);
        },
        o = (e = 500) => {
          let t = document.querySelector("body");
          if (s) {
            let i = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let e = 0; e < i.length; e++) {
                i[e].style.paddingRight = "0px";
              }
              (t.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, e),
              (s = !1),
              setTimeout(function () {
                s = !0;
              }, e);
          }
        },
        a = (e = 500) => {
          let t = document.querySelector("body");
          if (s) {
            let i = document.querySelectorAll("[data-lp]");
            for (let e = 0; e < i.length; e++) {
              i[e].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (t.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (s = !1),
              setTimeout(function () {
                s = !0;
              }, e);
          }
        };
      document.addEventListener("click", function (e) {
        e.target.closest(".header__menu") ||
          (document.documentElement.classList.remove("menu-open"),
          document.documentElement.classList.remove("lock"));
      });
      var l = i(2);
      let d = (e, t = !1, i = 500, n = 0) => {
        const s = document.querySelector(e);
        if (s) {
          let e = "",
            r = 0;
          t &&
            ((e = "header.header"),
            (r = document.querySelector(e).offsetHeight));
          let a = {
            speedAsDuration: !0,
            speed: i,
            header: e,
            offset: n,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (o(), document.documentElement.classList.remove("menu-open")),
            void 0 !== l)
          )
            new l().animateScroll(s, "", a);
          else {
            let e = s.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: r ? e - r : e, behavior: "smooth" });
          }
        }
      };
      const c = { inputMaskModule: null, selectModule: null };
      let u = {
        getErrors(e) {
          let t = 0,
            i = e.querySelectorAll("*[data-required]");
          return (
            i.length &&
              i.forEach((e) => {
                (null === e.offsetParent && "SELECT" !== e.tagName) ||
                  e.disabled ||
                  (t += this.validateInput(e));
              }),
            t
          );
        },
        validateInput(e) {
          let t = 0;
          return (
            "email" === e.dataset.required
              ? ((e.value = e.value.replace(" ", "")),
                this.emailTest(e)
                  ? (this.addError(e), t++)
                  : this.removeError(e))
              : "checkbox" !== e.type || e.checked
              ? "name" === e.dataset.required
                ? this.nameTest(e)
                  ? (this.addError(e), t++)
                  : this.removeError(e)
                : "phone" === e.dataset.required
                ? this.phoneTest(e)
                  ? this.removeError(e)
                  : (this.addError(e), t++)
                : e.value
                ? this.removeError(e)
                : (this.addError(e), t++)
              : (this.addError(e), t++),
            t
          );
        },
        addError(e) {
          e.classList.add("_form-error"),
            e.parentElement.classList.add("_form-error");
          let t = e.parentElement.querySelector(".form__error");
          t && e.parentElement.removeChild(t),
            e.dataset.error &&
              e.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form__error">${e.dataset.error}</div>`
              );
        },
        removeError(e) {
          e.classList.remove("_form-error"),
            e.parentElement.classList.remove("_form-error"),
            e.parentElement.querySelector(".form__error") &&
              e.parentElement.removeChild(
                e.parentElement.querySelector(".form__error")
              );
        },
        formClean(e) {
          e.reset(),
            setTimeout(() => {
              let t = e.querySelectorAll("input,textarea");
              for (let e = 0; e < t.length; e++) {
                const i = t[e];
                i.parentElement.classList.remove("_form-focus"),
                  i.classList.remove("_form-focus"),
                  u.removeError(i);
              }
              let i = e.querySelectorAll(".checkbox__input");
              if (i.length > 0)
                for (let e = 0; e < i.length; e++) {
                  i[e].checked = !1;
                }
              if (c.selectModule) {
                let t = e.querySelectorAll(".select");
                if (t.length)
                  for (let e = 0; e < t.length; e++) {
                    const i = t[e].querySelector("select");
                    c.selectModule.selectBuild(i);
                  }
              }
            }, 0);
        },
        emailTest: (e) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
        nameTest: (e) => !/^[A-Za-zА-Яа-яЁёs]/.test(e.value),
        phoneTest: (e) => /[0-9+]{3,}[0-9]/.test(e.value),
      };
      function p(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function h(e = {}, t = {}) {
        Object.keys(t).forEach((i) => {
          void 0 === e[i]
            ? (e[i] = t[i])
            : p(t[i]) &&
              p(e[i]) &&
              Object.keys(t[i]).length > 0 &&
              h(e[i], t[i]);
        });
      }
      const f = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function g() {
        const e = "undefined" != typeof document ? document : {};
        return h(e, f), e;
      }
      const m = {
        document: f,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) =>
          "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
          "undefined" != typeof setTimeout && clearTimeout(e);
        },
      };
      function v() {
        const e = "undefined" != typeof window ? window : {};
        return h(e, m), e;
      }
      class y extends Array {
        constructor(e) {
          "number" == typeof e
            ? super(e)
            : (super(...(e || [])),
              (function (e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                  get: () => t,
                  set(e) {
                    t.__proto__ = e;
                  },
                });
              })(this));
        }
      }
      function b(e = []) {
        const t = [];
        return (
          e.forEach((e) => {
            Array.isArray(e) ? t.push(...b(e)) : t.push(e);
          }),
          t
        );
      }
      function _(e, t) {
        return Array.prototype.filter.call(e, t);
      }
      function w(e, t) {
        const i = v(),
          n = g();
        let s = [];
        if (!t && e instanceof y) return e;
        if (!e) return new y(s);
        if ("string" == typeof e) {
          const i = e.trim();
          if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
            let e = "div";
            0 === i.indexOf("<li") && (e = "ul"),
              0 === i.indexOf("<tr") && (e = "tbody"),
              (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
              0 === i.indexOf("<tbody") && (e = "table"),
              0 === i.indexOf("<option") && (e = "select");
            const t = n.createElement(e);
            t.innerHTML = i;
            for (let e = 0; e < t.childNodes.length; e += 1)
              s.push(t.childNodes[e]);
          } else
            s = (function (e, t) {
              if ("string" != typeof e) return [e];
              const i = [],
                n = t.querySelectorAll(e);
              for (let e = 0; e < n.length; e += 1) i.push(n[e]);
              return i;
            })(e.trim(), t || n);
        } else if (e.nodeType || e === i || e === n) s.push(e);
        else if (Array.isArray(e)) {
          if (e instanceof y) return e;
          s = e;
        }
        return new y(
          (function (e) {
            const t = [];
            for (let i = 0; i < e.length; i += 1)
              -1 === t.indexOf(e[i]) && t.push(e[i]);
            return t;
          })(s)
        );
      }
      w.fn = y.prototype;
      const T = "resize scroll".split(" ");
      function x(e) {
        return function (...t) {
          if (void 0 === t[0]) {
            for (let t = 0; t < this.length; t += 1)
              T.indexOf(e) < 0 &&
                (e in this[t] ? this[t][e]() : w(this[t]).trigger(e));
            return this;
          }
          return this.on(e, ...t);
        };
      }
      x("click"),
        x("blur"),
        x("focus"),
        x("focusin"),
        x("focusout"),
        x("keyup"),
        x("keydown"),
        x("keypress"),
        x("submit"),
        x("change"),
        x("mousedown"),
        x("mousemove"),
        x("mouseup"),
        x("mouseenter"),
        x("mouseleave"),
        x("mouseout"),
        x("mouseover"),
        x("touchstart"),
        x("touchend"),
        x("touchmove"),
        x("resize"),
        x("scroll");
      const C = {
        addClass: function (...e) {
          const t = b(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.add(...t);
            }),
            this
          );
        },
        removeClass: function (...e) {
          const t = b(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.remove(...t);
            }),
            this
          );
        },
        hasClass: function (...e) {
          const t = b(e.map((e) => e.split(" ")));
          return (
            _(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
              .length > 0
          );
        },
        toggleClass: function (...e) {
          const t = b(e.map((e) => e.split(" ")));
          this.forEach((e) => {
            t.forEach((t) => {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (let i = 0; i < this.length; i += 1)
            if (2 === arguments.length) this[i].setAttribute(e, t);
            else
              for (const t in e)
                (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
          return this;
        },
        removeAttr: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (let t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? `${e}ms` : e;
          return this;
        },
        on: function (...e) {
          let [t, i, n, s] = e;
          function r(e) {
            const t = e.target;
            if (!t) return;
            const s = e.target.dom7EventData || [];
            if ((s.indexOf(e) < 0 && s.unshift(e), w(t).is(i))) n.apply(t, s);
            else {
              const e = w(t).parents();
              for (let t = 0; t < e.length; t += 1)
                w(e[t]).is(i) && n.apply(e[t], s);
            }
          }
          function o(e) {
            const t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
          }
          "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
            s || (s = !1);
          const a = t.split(" ");
          let l;
          for (let e = 0; e < this.length; e += 1) {
            const t = this[e];
            if (i)
              for (l = 0; l < a.length; l += 1) {
                const e = a[l];
                t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                  t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                  t.dom7LiveListeners[e].push({
                    listener: n,
                    proxyListener: r,
                  }),
                  t.addEventListener(e, r, s);
              }
            else
              for (l = 0; l < a.length; l += 1) {
                const e = a[l];
                t.dom7Listeners || (t.dom7Listeners = {}),
                  t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                  t.dom7Listeners[e].push({ listener: n, proxyListener: o }),
                  t.addEventListener(e, o, s);
              }
          }
          return this;
        },
        off: function (...e) {
          let [t, i, n, s] = e;
          "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
            s || (s = !1);
          const r = t.split(" ");
          for (let e = 0; e < r.length; e += 1) {
            const t = r[e];
            for (let e = 0; e < this.length; e += 1) {
              const r = this[e];
              let o;
              if (
                (!i && r.dom7Listeners
                  ? (o = r.dom7Listeners[t])
                  : i && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
                o && o.length)
              )
                for (let e = o.length - 1; e >= 0; e -= 1) {
                  const i = o[e];
                  (n && i.listener === n) ||
                  (n &&
                    i.listener &&
                    i.listener.dom7proxy &&
                    i.listener.dom7proxy === n)
                    ? (r.removeEventListener(t, i.proxyListener, s),
                      o.splice(e, 1))
                    : n ||
                      (r.removeEventListener(t, i.proxyListener, s),
                      o.splice(e, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...e) {
          const t = v(),
            i = e[0].split(" "),
            n = e[1];
          for (let s = 0; s < i.length; s += 1) {
            const r = i[s];
            for (let i = 0; i < this.length; i += 1) {
              const s = this[i];
              if (t.CustomEvent) {
                const i = new t.CustomEvent(r, {
                  detail: n,
                  bubbles: !0,
                  cancelable: !0,
                });
                (s.dom7EventData = e.filter((e, t) => t > 0)),
                  s.dispatchEvent(i),
                  (s.dom7EventData = []),
                  delete s.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (e) {
          const t = this;
          return (
            e &&
              t.on("transitionend", function i(n) {
                n.target === this &&
                  (e.call(this, n), t.off("transitionend", i));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const e = v();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const e = v(),
              t = g(),
              i = this[0],
              n = i.getBoundingClientRect(),
              s = t.body,
              r = i.clientTop || s.clientTop || 0,
              o = i.clientLeft || s.clientLeft || 0,
              a = i === e ? e.scrollY : i.scrollTop,
              l = i === e ? e.scrollX : i.scrollLeft;
            return { top: n.top + a - r, left: n.left + l - o };
          }
          return null;
        },
        css: function (e, t) {
          const i = v();
          let n;
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (n = 0; n < this.length; n += 1)
                for (const t in e) this[n].style[t] = e[t];
              return this;
            }
            if (this[0])
              return i.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach((t, i) => {
                e.apply(t, [t, i]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          const t = v(),
            i = g(),
            n = this[0];
          let s, r;
          if (!n || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (n.matches) return n.matches(e);
            if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
            if (n.msMatchesSelector) return n.msMatchesSelector(e);
            for (s = w(e), r = 0; r < s.length; r += 1)
              if (s[r] === n) return !0;
            return !1;
          }
          if (e === i) return n === i;
          if (e === t) return n === t;
          if (e.nodeType || e instanceof y) {
            for (s = e.nodeType ? [e] : e, r = 0; r < s.length; r += 1)
              if (s[r] === n) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          const t = this.length;
          if (e > t - 1) return w([]);
          if (e < 0) {
            const i = t + e;
            return w(i < 0 ? [] : [this[i]]);
          }
          return w([this[e]]);
        },
        append: function (...e) {
          let t;
          const i = g();
          for (let n = 0; n < e.length; n += 1) {
            t = e[n];
            for (let e = 0; e < this.length; e += 1)
              if ("string" == typeof t) {
                const n = i.createElement("div");
                for (n.innerHTML = t; n.firstChild; )
                  this[e].appendChild(n.firstChild);
              } else if (t instanceof y)
                for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
              else this[e].appendChild(t);
          }
          return this;
        },
        prepend: function (e) {
          const t = g();
          let i, n;
          for (i = 0; i < this.length; i += 1)
            if ("string" == typeof e) {
              const s = t.createElement("div");
              for (s.innerHTML = e, n = s.childNodes.length - 1; n >= 0; n -= 1)
                this[i].insertBefore(s.childNodes[n], this[i].childNodes[0]);
            } else if (e instanceof y)
              for (n = 0; n < e.length; n += 1)
                this[i].insertBefore(e[n], this[i].childNodes[0]);
            else this[i].insertBefore(e, this[i].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                w(this[0].nextElementSibling).is(e)
                ? w([this[0].nextElementSibling])
                : w([])
              : this[0].nextElementSibling
              ? w([this[0].nextElementSibling])
              : w([])
            : w([]);
        },
        nextAll: function (e) {
          const t = [];
          let i = this[0];
          if (!i) return w([]);
          for (; i.nextElementSibling; ) {
            const n = i.nextElementSibling;
            e ? w(n).is(e) && t.push(n) : t.push(n), (i = n);
          }
          return w(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            const t = this[0];
            return e
              ? t.previousElementSibling && w(t.previousElementSibling).is(e)
                ? w([t.previousElementSibling])
                : w([])
              : t.previousElementSibling
              ? w([t.previousElementSibling])
              : w([]);
          }
          return w([]);
        },
        prevAll: function (e) {
          const t = [];
          let i = this[0];
          if (!i) return w([]);
          for (; i.previousElementSibling; ) {
            const n = i.previousElementSibling;
            e ? w(n).is(e) && t.push(n) : t.push(n), (i = n);
          }
          return w(t);
        },
        parent: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1)
            null !== this[i].parentNode &&
              (e
                ? w(this[i].parentNode).is(e) && t.push(this[i].parentNode)
                : t.push(this[i].parentNode));
          return w(t);
        },
        parents: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            let n = this[i].parentNode;
            for (; n; )
              e ? w(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
          }
          return w(t);
        },
        closest: function (e) {
          let t = this;
          return void 0 === e
            ? w([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            const n = this[i].querySelectorAll(e);
            for (let e = 0; e < n.length; e += 1) t.push(n[e]);
          }
          return w(t);
        },
        children: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            const n = this[i].children;
            for (let i = 0; i < n.length; i += 1)
              (e && !w(n[i]).is(e)) || t.push(n[i]);
          }
          return w(t);
        },
        filter: function (e) {
          return w(_(this, e));
        },
        remove: function () {
          for (let e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
      Object.keys(C).forEach((e) => {
        Object.defineProperty(w.fn, e, { value: C[e], writable: !0 });
      });
      const S = w;
      function E(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      }
      function O() {
        return Date.now();
      }
      function k(e, t) {
        void 0 === t && (t = "x");
        const i = v();
        let n, s, r;
        const o = (function (e) {
          const t = v();
          let i;
          return (
            t.getComputedStyle && (i = t.getComputedStyle(e, null)),
            !i && e.currentStyle && (i = e.currentStyle),
            i || (i = e.style),
            i
          );
        })(e);
        return (
          i.WebKitCSSMatrix
            ? ((s = o.transform || o.webkitTransform),
              s.split(",").length > 6 &&
                (s = s
                  .split(", ")
                  .map((e) => e.replace(",", "."))
                  .join(", ")),
              (r = new i.WebKitCSSMatrix("none" === s ? "" : s)))
            : ((r =
                o.MozTransform ||
                o.OTransform ||
                o.MsTransform ||
                o.msTransform ||
                o.transform ||
                o
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (n = r.toString().split(","))),
          "x" === t &&
            (s = i.WebKitCSSMatrix
              ? r.m41
              : 16 === n.length
              ? parseFloat(n[12])
              : parseFloat(n[4])),
          "y" === t &&
            (s = i.WebKitCSSMatrix
              ? r.m42
              : 16 === n.length
              ? parseFloat(n[13])
              : parseFloat(n[5])),
          s || 0
        );
      }
      function A(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
      }
      function M(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement
          ? e instanceof HTMLElement
          : e && (1 === e.nodeType || 11 === e.nodeType);
      }
      function I() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          t = ["__proto__", "constructor", "prototype"];
        for (let i = 1; i < arguments.length; i += 1) {
          const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
          if (null != n && !M(n)) {
            const i = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
            for (let t = 0, s = i.length; t < s; t += 1) {
              const s = i[t],
                r = Object.getOwnPropertyDescriptor(n, s);
              void 0 !== r &&
                r.enumerable &&
                (A(e[s]) && A(n[s])
                  ? n[s].__swiper__
                    ? (e[s] = n[s])
                    : I(e[s], n[s])
                  : !A(e[s]) && A(n[s])
                  ? ((e[s] = {}),
                    n[s].__swiper__ ? (e[s] = n[s]) : I(e[s], n[s]))
                  : (e[s] = n[s]));
            }
          }
        }
        return e;
      }
      function L(e, t, i) {
        e.style.setProperty(t, i);
      }
      function P(e) {
        let { swiper: t, targetPosition: i, side: n } = e;
        const s = v(),
          r = -t.translate;
        let o,
          a = null;
        const l = t.params.speed;
        (t.wrapperEl.style.scrollSnapType = "none"),
          s.cancelAnimationFrame(t.cssModeFrameID);
        const d = i > r ? "next" : "prev",
          c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
          u = () => {
            (o = new Date().getTime()), null === a && (a = o);
            const e = Math.max(Math.min((o - a) / l, 1), 0),
              d = 0.5 - Math.cos(e * Math.PI) / 2;
            let p = r + d * (i - r);
            if ((c(p, i) && (p = i), t.wrapperEl.scrollTo({ [n]: p }), c(p, i)))
              return (
                (t.wrapperEl.style.overflow = "hidden"),
                (t.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (t.wrapperEl.style.overflow = ""),
                    t.wrapperEl.scrollTo({ [n]: p });
                }),
                void s.cancelAnimationFrame(t.cssModeFrameID)
              );
            t.cssModeFrameID = s.requestAnimationFrame(u);
          };
        u();
      }
      let D, z, $;
      function B() {
        return (
          D ||
            (D = (function () {
              const e = v(),
                t = g();
              return {
                smoothScroll:
                  t.documentElement &&
                  "scrollBehavior" in t.documentElement.style,
                touch: !!(
                  "ontouchstart" in e ||
                  (e.DocumentTouch && t instanceof e.DocumentTouch)
                ),
                passiveListener: (function () {
                  let t = !1;
                  try {
                    const i = Object.defineProperty({}, "passive", {
                      get() {
                        t = !0;
                      },
                    });
                    e.addEventListener("testPassiveListener", null, i);
                  } catch (e) {}
                  return t;
                })(),
                gestures: "ongesturestart" in e,
              };
            })()),
          D
        );
      }
      function F(e) {
        return (
          void 0 === e && (e = {}),
          z ||
            (z = (function (e) {
              let { userAgent: t } = void 0 === e ? {} : e;
              const i = B(),
                n = v(),
                s = n.navigator.platform,
                r = t || n.navigator.userAgent,
                o = { ios: !1, android: !1 },
                a = n.screen.width,
                l = n.screen.height,
                d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
              let c = r.match(/(iPad).*OS\s([\d_]+)/);
              const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                p = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === s;
              let f = "MacIntel" === s;
              return (
                !c &&
                  f &&
                  i.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${a}x${l}`) >= 0 &&
                  ((c = r.match(/(Version)\/([\d.]+)/)),
                  c || (c = [0, 1, "13_0_0"]),
                  (f = !1)),
                d && !h && ((o.os = "android"), (o.android = !0)),
                (c || p || u) && ((o.os = "ios"), (o.ios = !0)),
                o
              );
            })(e)),
          z
        );
      }
      function N() {
        return (
          $ ||
            ($ = (function () {
              const e = v();
              return {
                isSafari: (function () {
                  const t = e.navigator.userAgent.toLowerCase();
                  return (
                    t.indexOf("safari") >= 0 &&
                    t.indexOf("chrome") < 0 &&
                    t.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  e.navigator.userAgent
                ),
              };
            })()),
          $
        );
      }
      const G = {
        on(e, t, i) {
          const n = this;
          if ("function" != typeof t) return n;
          const s = i ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              n.eventsListeners[e] || (n.eventsListeners[e] = []),
                n.eventsListeners[e][s](t);
            }),
            n
          );
        },
        once(e, t, i) {
          const n = this;
          if ("function" != typeof t) return n;
          function s() {
            n.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
            for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++)
              r[o] = arguments[o];
            t.apply(n, r);
          }
          return (s.__emitterProxy = t), n.on(e, s, i);
        },
        onAny(e, t) {
          const i = this;
          if ("function" != typeof e) return i;
          const n = t ? "unshift" : "push";
          return (
            i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i
          );
        },
        offAny(e) {
          const t = this;
          if (!t.eventsAnyListeners) return t;
          const i = t.eventsAnyListeners.indexOf(e);
          return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
        },
        off(e, t) {
          const i = this;
          return i.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (i.eventsListeners[e] = [])
                  : i.eventsListeners[e] &&
                    i.eventsListeners[e].forEach((n, s) => {
                      (n === t ||
                        (n.__emitterProxy && n.__emitterProxy === t)) &&
                        i.eventsListeners[e].splice(s, 1);
                    });
              }),
              i)
            : i;
        },
        emit() {
          const e = this;
          if (!e.eventsListeners) return e;
          let t, i, n;
          for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
            r[o] = arguments[o];
          "string" == typeof r[0] || Array.isArray(r[0])
            ? ((t = r[0]), (i = r.slice(1, r.length)), (n = e))
            : ((t = r[0].events), (i = r[0].data), (n = r[0].context || e)),
            i.unshift(n);
          return (
            (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
              e.eventsAnyListeners &&
                e.eventsAnyListeners.length &&
                e.eventsAnyListeners.forEach((e) => {
                  e.apply(n, [t, ...i]);
                }),
                e.eventsListeners &&
                  e.eventsListeners[t] &&
                  e.eventsListeners[t].forEach((e) => {
                    e.apply(n, i);
                  });
            }),
            e
          );
        },
      };
      const R = {
        updateSize: function () {
          const e = this;
          let t, i;
          const n = e.$el;
          (t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : n[0].clientWidth),
            (i =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : n[0].clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === i && e.isVertical()) ||
              ((t =
                t -
                parseInt(n.css("padding-left") || 0, 10) -
                parseInt(n.css("padding-right") || 0, 10)),
              (i =
                i -
                parseInt(n.css("padding-top") || 0, 10) -
                parseInt(n.css("padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(i) && (i = 0),
              Object.assign(e, {
                width: t,
                height: i,
                size: e.isHorizontal() ? t : i,
              }));
        },
        updateSlides: function () {
          const e = this;
          function t(t) {
            return e.isHorizontal()
              ? t
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[t];
          }
          function i(e, i) {
            return parseFloat(e.getPropertyValue(t(i)) || 0);
          }
          const n = e.params,
            { $wrapperEl: s, size: r, rtlTranslate: o, wrongRTL: a } = e,
            l = e.virtual && n.virtual.enabled,
            d = l ? e.virtual.slides.length : e.slides.length,
            c = s.children(`.${e.params.slideClass}`),
            u = l ? e.virtual.slides.length : c.length;
          let p = [];
          const h = [],
            f = [];
          let g = n.slidesOffsetBefore;
          "function" == typeof g && (g = n.slidesOffsetBefore.call(e));
          let m = n.slidesOffsetAfter;
          "function" == typeof m && (m = n.slidesOffsetAfter.call(e));
          const v = e.snapGrid.length,
            y = e.slidesGrid.length;
          let b = n.spaceBetween,
            _ = -g,
            w = 0,
            T = 0;
          if (void 0 === r) return;
          "string" == typeof b &&
            b.indexOf("%") >= 0 &&
            (b = (parseFloat(b.replace("%", "")) / 100) * r),
            (e.virtualSize = -b),
            o
              ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            n.centeredSlides &&
              n.cssMode &&
              (L(e.wrapperEl, "--swiper-centered-offset-before", ""),
              L(e.wrapperEl, "--swiper-centered-offset-after", ""));
          const x = n.grid && n.grid.rows > 1 && e.grid;
          let C;
          x && e.grid.initSlides(u);
          const S =
            "auto" === n.slidesPerView &&
            n.breakpoints &&
            Object.keys(n.breakpoints).filter(
              (e) => void 0 !== n.breakpoints[e].slidesPerView
            ).length > 0;
          for (let s = 0; s < u; s += 1) {
            C = 0;
            const o = c.eq(s);
            if (
              (x && e.grid.updateSlide(s, o, u, t), "none" !== o.css("display"))
            ) {
              if ("auto" === n.slidesPerView) {
                S && (c[s].style[t("width")] = "");
                const r = getComputedStyle(o[0]),
                  a = o[0].style.transform,
                  l = o[0].style.webkitTransform;
                if (
                  (a && (o[0].style.transform = "none"),
                  l && (o[0].style.webkitTransform = "none"),
                  n.roundLengths)
                )
                  C = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
                else {
                  const e = i(r, "width"),
                    t = i(r, "padding-left"),
                    n = i(r, "padding-right"),
                    s = i(r, "margin-left"),
                    a = i(r, "margin-right"),
                    l = r.getPropertyValue("box-sizing");
                  if (l && "border-box" === l) C = e + s + a;
                  else {
                    const { clientWidth: i, offsetWidth: r } = o[0];
                    C = e + t + n + s + a + (r - i);
                  }
                }
                a && (o[0].style.transform = a),
                  l && (o[0].style.webkitTransform = l),
                  n.roundLengths && (C = Math.floor(C));
              } else
                (C = (r - (n.slidesPerView - 1) * b) / n.slidesPerView),
                  n.roundLengths && (C = Math.floor(C)),
                  c[s] && (c[s].style[t("width")] = `${C}px`);
              c[s] && (c[s].swiperSlideSize = C),
                f.push(C),
                n.centeredSlides
                  ? ((_ = _ + C / 2 + w / 2 + b),
                    0 === w && 0 !== s && (_ = _ - r / 2 - b),
                    0 === s && (_ = _ - r / 2 - b),
                    Math.abs(_) < 0.001 && (_ = 0),
                    n.roundLengths && (_ = Math.floor(_)),
                    T % n.slidesPerGroup == 0 && p.push(_),
                    h.push(_))
                  : (n.roundLengths && (_ = Math.floor(_)),
                    (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                      e.params.slidesPerGroup ==
                      0 && p.push(_),
                    h.push(_),
                    (_ = _ + C + b)),
                (e.virtualSize += C + b),
                (w = C),
                (T += 1);
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, r) + m),
            o &&
              a &&
              ("slide" === n.effect || "coverflow" === n.effect) &&
              s.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
            n.setWrapperSize &&
              s.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
            x && e.grid.updateWrapperSize(C, p, t),
            !n.centeredSlides)
          ) {
            const t = [];
            for (let i = 0; i < p.length; i += 1) {
              let s = p[i];
              n.roundLengths && (s = Math.floor(s)),
                p[i] <= e.virtualSize - r && t.push(s);
            }
            (p = t),
              Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
                p.push(e.virtualSize - r);
          }
          if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
            const i = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
            c.filter((e, t) => !n.cssMode || t !== c.length - 1).css({
              [i]: `${b}px`,
            });
          }
          if (n.centeredSlides && n.centeredSlidesBounds) {
            let e = 0;
            f.forEach((t) => {
              e += t + (n.spaceBetween ? n.spaceBetween : 0);
            }),
              (e -= n.spaceBetween);
            const t = e - r;
            p = p.map((e) => (e < 0 ? -g : e > t ? t + m : e));
          }
          if (n.centerInsufficientSlides) {
            let e = 0;
            if (
              (f.forEach((t) => {
                e += t + (n.spaceBetween ? n.spaceBetween : 0);
              }),
              (e -= n.spaceBetween),
              e < r)
            ) {
              const t = (r - e) / 2;
              p.forEach((e, i) => {
                p[i] = e - t;
              }),
                h.forEach((e, i) => {
                  h[i] = e + t;
                });
            }
          }
          if (
            (Object.assign(e, {
              slides: c,
              snapGrid: p,
              slidesGrid: h,
              slidesSizesGrid: f,
            }),
            n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
          ) {
            L(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
              L(
                e.wrapperEl,
                "--swiper-centered-offset-after",
                e.size / 2 - f[f.length - 1] / 2 + "px"
              );
            const t = -e.snapGrid[0],
              i = -e.slidesGrid[0];
            (e.snapGrid = e.snapGrid.map((e) => e + t)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + i));
          }
          if (
            (u !== d && e.emit("slidesLengthChange"),
            p.length !== v &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            h.length !== y && e.emit("slidesGridLengthChange"),
            n.watchSlidesProgress && e.updateSlidesOffset(),
            !(l || n.cssMode || ("slide" !== n.effect && "fade" !== n.effect)))
          ) {
            const t = `${n.containerModifierClass}backface-hidden`,
              i = e.$el.hasClass(t);
            u <= n.maxBackfaceHiddenSlides
              ? i || e.$el.addClass(t)
              : i && e.$el.removeClass(t);
          }
        },
        updateAutoHeight: function (e) {
          const t = this,
            i = [],
            n = t.virtual && t.params.virtual.enabled;
          let s,
            r = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          const o = (e) =>
            n
              ? t.slides.filter(
                  (t) =>
                    parseInt(t.getAttribute("data-swiper-slide-index"), 10) ===
                    e
                )[0]
              : t.slides.eq(e)[0];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides)
              t.visibleSlides.each((e) => {
                i.push(e);
              });
            else
              for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
                const e = t.activeIndex + s;
                if (e > t.slides.length && !n) break;
                i.push(o(e));
              }
          else i.push(o(t.activeIndex));
          for (s = 0; s < i.length; s += 1)
            if (void 0 !== i[s]) {
              const e = i[s].offsetHeight;
              r = e > r ? e : r;
            }
          (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides;
          for (let i = 0; i < t.length; i += 1)
            t[i].swiperSlideOffset = e.isHorizontal()
              ? t[i].offsetLeft
              : t[i].offsetTop;
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = (this && this.translate) || 0);
          const t = this,
            i = t.params,
            { slides: n, rtlTranslate: s, snapGrid: r } = t;
          if (0 === n.length) return;
          void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
          let o = -e;
          s && (o = e),
            n.removeClass(i.slideVisibleClass),
            (t.visibleSlidesIndexes = []),
            (t.visibleSlides = []);
          for (let e = 0; e < n.length; e += 1) {
            const a = n[e];
            let l = a.swiperSlideOffset;
            i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
            const d =
                (o + (i.centeredSlides ? t.minTranslate() : 0) - l) /
                (a.swiperSlideSize + i.spaceBetween),
              c =
                (o - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
                (a.swiperSlideSize + i.spaceBetween),
              u = -(o - l),
              p = u + t.slidesSizesGrid[e];
            ((u >= 0 && u < t.size - 1) ||
              (p > 1 && p <= t.size) ||
              (u <= 0 && p >= t.size)) &&
              (t.visibleSlides.push(a),
              t.visibleSlidesIndexes.push(e),
              n.eq(e).addClass(i.slideVisibleClass)),
              (a.progress = s ? -d : d),
              (a.originalProgress = s ? -c : c);
          }
          t.visibleSlides = S(t.visibleSlides);
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const i = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * i) || 0;
          }
          const i = t.params,
            n = t.maxTranslate() - t.minTranslate();
          let { progress: s, isBeginning: r, isEnd: o } = t;
          const a = r,
            l = o;
          0 === n
            ? ((s = 0), (r = !0), (o = !0))
            : ((s = (e - t.minTranslate()) / n), (r = s <= 0), (o = s >= 1)),
            Object.assign(t, { progress: s, isBeginning: r, isEnd: o }),
            (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
              t.updateSlidesProgress(e),
            r && !a && t.emit("reachBeginning toEdge"),
            o && !l && t.emit("reachEnd toEdge"),
            ((a && !r) || (l && !o)) && t.emit("fromEdge"),
            t.emit("progress", s);
        },
        updateSlidesClasses: function () {
          const e = this,
            {
              slides: t,
              params: i,
              $wrapperEl: n,
              activeIndex: s,
              realIndex: r,
            } = e,
            o = e.virtual && i.virtual.enabled;
          let a;
          t.removeClass(
            `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
          ),
            (a = o
              ? e.$wrapperEl.find(
                  `.${i.slideClass}[data-swiper-slide-index="${s}"]`
                )
              : t.eq(s)),
            a.addClass(i.slideActiveClass),
            i.loop &&
              (a.hasClass(i.slideDuplicateClass)
                ? n
                    .children(
                      `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(i.slideDuplicateActiveClass)
                : n
                    .children(
                      `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(i.slideDuplicateActiveClass));
          let l = a
            .nextAll(`.${i.slideClass}`)
            .eq(0)
            .addClass(i.slideNextClass);
          i.loop &&
            0 === l.length &&
            ((l = t.eq(0)), l.addClass(i.slideNextClass));
          let d = a
            .prevAll(`.${i.slideClass}`)
            .eq(0)
            .addClass(i.slidePrevClass);
          i.loop &&
            0 === d.length &&
            ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
            i.loop &&
              (l.hasClass(i.slideDuplicateClass)
                ? n
                    .children(
                      `.${i.slideClass}:not(.${
                        i.slideDuplicateClass
                      })[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicateNextClass)
                : n
                    .children(
                      `.${i.slideClass}.${
                        i.slideDuplicateClass
                      }[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicateNextClass),
              d.hasClass(i.slideDuplicateClass)
                ? n
                    .children(
                      `.${i.slideClass}:not(.${
                        i.slideDuplicateClass
                      })[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicatePrevClass)
                : n
                    .children(
                      `.${i.slideClass}.${
                        i.slideDuplicateClass
                      }[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicatePrevClass)),
            e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          const t = this,
            i = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: n,
              snapGrid: s,
              params: r,
              activeIndex: o,
              realIndex: a,
              snapIndex: l,
            } = t;
          let d,
            c = e;
          if (void 0 === c) {
            for (let e = 0; e < n.length; e += 1)
              void 0 !== n[e + 1]
                ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2
                  ? (c = e)
                  : i >= n[e] && i < n[e + 1] && (c = e + 1)
                : i >= n[e] && (c = e);
            r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
          }
          if (s.indexOf(i) >= 0) d = s.indexOf(i);
          else {
            const e = Math.min(r.slidesPerGroupSkip, c);
            d = e + Math.floor((c - e) / r.slidesPerGroup);
          }
          if ((d >= s.length && (d = s.length - 1), c === o))
            return void (
              d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
            );
          const u = parseInt(
            t.slides.eq(c).attr("data-swiper-slide-index") || c,
            10
          );
          Object.assign(t, {
            snapIndex: d,
            realIndex: u,
            previousIndex: o,
            activeIndex: c,
          }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            a !== u && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              t.emit("slideChange");
        },
        updateClickedSlide: function (e) {
          const t = this,
            i = t.params,
            n = S(e).closest(`.${i.slideClass}`)[0];
          let s,
            r = !1;
          if (n)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === n) {
                (r = !0), (s = e);
                break;
              }
          if (!n || !r)
            return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
          (t.clickedSlide = n),
            t.virtual && t.params.virtual.enabled
              ? (t.clickedIndex = parseInt(
                  S(n).attr("data-swiper-slide-index"),
                  10
                ))
              : (t.clickedIndex = s),
            i.slideToClickedSlide &&
              void 0 !== t.clickedIndex &&
              t.clickedIndex !== t.activeIndex &&
              t.slideToClickedSlide();
        },
      };
      const H = {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          const {
            params: t,
            rtlTranslate: i,
            translate: n,
            $wrapperEl: s,
          } = this;
          if (t.virtualTranslate) return i ? -n : n;
          if (t.cssMode) return n;
          let r = k(s[0], e);
          return i && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
          const i = this,
            {
              rtlTranslate: n,
              params: s,
              $wrapperEl: r,
              wrapperEl: o,
              progress: a,
            } = i;
          let l,
            d = 0,
            c = 0;
          i.isHorizontal() ? (d = n ? -e : e) : (c = e),
            s.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
            s.cssMode
              ? (o[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  i.isHorizontal() ? -d : -c)
              : s.virtualTranslate ||
                r.transform(`translate3d(${d}px, ${c}px, 0px)`),
            (i.previousTranslate = i.translate),
            (i.translate = i.isHorizontal() ? d : c);
          const u = i.maxTranslate() - i.minTranslate();
          (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
            l !== a && i.updateProgress(e),
            i.emit("setTranslate", i.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, i, n, s) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0),
            void 0 === n && (n = !0);
          const r = this,
            { params: o, wrapperEl: a } = r;
          if (r.animating && o.preventInteractionOnTransition) return !1;
          const l = r.minTranslate(),
            d = r.maxTranslate();
          let c;
          if (
            ((c = n && e > l ? l : n && e < d ? d : e),
            r.updateProgress(c),
            o.cssMode)
          ) {
            const e = r.isHorizontal();
            if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
            else {
              if (!r.support.smoothScroll)
                return (
                  P({
                    swiper: r,
                    targetPosition: -c,
                    side: e ? "left" : "top",
                  }),
                  !0
                );
              a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === t
              ? (r.setTransition(0),
                r.setTranslate(c),
                i &&
                  (r.emit("beforeTransitionStart", t, s),
                  r.emit("transitionEnd")))
              : (r.setTransition(t),
                r.setTranslate(c),
                i &&
                  (r.emit("beforeTransitionStart", t, s),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        r.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        i && r.emit("transitionEnd"));
                    }),
                  r.$wrapperEl[0].addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    r.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      };
      function q(e) {
        let { swiper: t, runCallbacks: i, direction: n, step: s } = e;
        const { activeIndex: r, previousIndex: o } = t;
        let a = n;
        if (
          (a || (a = r > o ? "next" : r < o ? "prev" : "reset"),
          t.emit(`transition${s}`),
          i && r !== o)
        ) {
          if ("reset" === a) return void t.emit(`slideResetTransition${s}`);
          t.emit(`slideChangeTransition${s}`),
            "next" === a
              ? t.emit(`slideNextTransition${s}`)
              : t.emit(`slidePrevTransition${s}`);
        }
      }
      const V = {
        slideTo: function (e, t, i, n, s) {
          if (
            (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0),
            "number" != typeof e && "string" != typeof e)
          )
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
            );
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
              );
            e = t;
          }
          const r = this;
          let o = e;
          o < 0 && (o = 0);
          const {
            params: a,
            snapGrid: l,
            slidesGrid: d,
            previousIndex: c,
            activeIndex: u,
            rtlTranslate: p,
            wrapperEl: h,
            enabled: f,
          } = r;
          if (
            (r.animating && a.preventInteractionOnTransition) ||
            (!f && !n && !s)
          )
            return !1;
          const g = Math.min(r.params.slidesPerGroupSkip, o);
          let m = g + Math.floor((o - g) / r.params.slidesPerGroup);
          m >= l.length && (m = l.length - 1),
            (u || a.initialSlide || 0) === (c || 0) &&
              i &&
              r.emit("beforeSlideChangeStart");
          const v = -l[m];
          if ((r.updateProgress(v), a.normalizeSlideIndex))
            for (let e = 0; e < d.length; e += 1) {
              const t = -Math.floor(100 * v),
                i = Math.floor(100 * d[e]),
                n = Math.floor(100 * d[e + 1]);
              void 0 !== d[e + 1]
                ? t >= i && t < n - (n - i) / 2
                  ? (o = e)
                  : t >= i && t < n && (o = e + 1)
                : t >= i && (o = e);
            }
          if (r.initialized && o !== u) {
            if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
              return !1;
            if (
              !r.allowSlidePrev &&
              v > r.translate &&
              v > r.maxTranslate() &&
              (u || 0) !== o
            )
              return !1;
          }
          let y;
          if (
            ((y = o > u ? "next" : o < u ? "prev" : "reset"),
            (p && -v === r.translate) || (!p && v === r.translate))
          )
            return (
              r.updateActiveIndex(o),
              a.autoHeight && r.updateAutoHeight(),
              r.updateSlidesClasses(),
              "slide" !== a.effect && r.setTranslate(v),
              "reset" !== y && (r.transitionStart(i, y), r.transitionEnd(i, y)),
              !1
            );
          if (a.cssMode) {
            const e = r.isHorizontal(),
              i = p ? v : -v;
            if (0 === t) {
              const t = r.virtual && r.params.virtual.enabled;
              t &&
                ((r.wrapperEl.style.scrollSnapType = "none"),
                (r._immediateVirtual = !0)),
                (h[e ? "scrollLeft" : "scrollTop"] = i),
                t &&
                  requestAnimationFrame(() => {
                    (r.wrapperEl.style.scrollSnapType = ""),
                      (r._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!r.support.smoothScroll)
                return (
                  P({ swiper: r, targetPosition: i, side: e ? "left" : "top" }),
                  !0
                );
              h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
            }
            return !0;
          }
          return (
            r.setTransition(t),
            r.setTranslate(v),
            r.updateActiveIndex(o),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, n),
            r.transitionStart(i, y),
            0 === t
              ? r.transitionEnd(i, y)
              : r.animating ||
                ((r.animating = !0),
                r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      (r.onSlideToWrapperTransitionEnd = null),
                      delete r.onSlideToWrapperTransitionEnd,
                      r.transitionEnd(i, y));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (e, t, i, n) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
          const s = this;
          let r = e;
          return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, i, n);
        },
        slideNext: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const n = this,
            { animating: s, enabled: r, params: o } = n;
          if (!r) return n;
          let a = o.slidesPerGroup;
          "auto" === o.slidesPerView &&
            1 === o.slidesPerGroup &&
            o.slidesPerGroupAuto &&
            (a = Math.max(n.slidesPerViewDynamic("current", !0), 1));
          const l = n.activeIndex < o.slidesPerGroupSkip ? 1 : a;
          if (o.loop) {
            if (s && o.loopPreventsSlide) return !1;
            n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
          }
          return o.rewind && n.isEnd
            ? n.slideTo(0, e, t, i)
            : n.slideTo(n.activeIndex + l, e, t, i);
        },
        slidePrev: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const n = this,
            {
              params: s,
              animating: r,
              snapGrid: o,
              slidesGrid: a,
              rtlTranslate: l,
              enabled: d,
            } = n;
          if (!d) return n;
          if (s.loop) {
            if (r && s.loopPreventsSlide) return !1;
            n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
          }
          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const u = c(l ? n.translate : -n.translate),
            p = o.map((e) => c(e));
          let h = o[p.indexOf(u) - 1];
          if (void 0 === h && s.cssMode) {
            let e;
            o.forEach((t, i) => {
              u >= t && (e = i);
            }),
              void 0 !== e && (h = o[e > 0 ? e - 1 : e]);
          }
          let f = 0;
          if (
            (void 0 !== h &&
              ((f = a.indexOf(h)),
              f < 0 && (f = n.activeIndex - 1),
              "auto" === s.slidesPerView &&
                1 === s.slidesPerGroup &&
                s.slidesPerGroupAuto &&
                ((f = f - n.slidesPerViewDynamic("previous", !0) + 1),
                (f = Math.max(f, 0)))),
            s.rewind && n.isBeginning)
          ) {
            const s =
              n.params.virtual && n.params.virtual.enabled && n.virtual
                ? n.virtual.slides.length - 1
                : n.slides.length - 1;
            return n.slideTo(s, e, t, i);
          }
          return n.slideTo(f, e, t, i);
        },
        slideReset: function (e, t, i) {
          return (
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, i)
          );
        },
        slideToClosest: function (e, t, i, n) {
          void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === n && (n = 0.5);
          const s = this;
          let r = s.activeIndex;
          const o = Math.min(s.params.slidesPerGroupSkip, r),
            a = o + Math.floor((r - o) / s.params.slidesPerGroup),
            l = s.rtlTranslate ? s.translate : -s.translate;
          if (l >= s.snapGrid[a]) {
            const e = s.snapGrid[a];
            l - e > (s.snapGrid[a + 1] - e) * n &&
              (r += s.params.slidesPerGroup);
          } else {
            const e = s.snapGrid[a - 1];
            l - e <= (s.snapGrid[a] - e) * n && (r -= s.params.slidesPerGroup);
          }
          return (
            (r = Math.max(r, 0)),
            (r = Math.min(r, s.slidesGrid.length - 1)),
            s.slideTo(r, e, t, i)
          );
        },
        slideToClickedSlide: function () {
          const e = this,
            { params: t, $wrapperEl: i } = e,
            n =
              "auto" === t.slidesPerView
                ? e.slidesPerViewDynamic()
                : t.slidesPerView;
          let s,
            r = e.clickedIndex;
          if (t.loop) {
            if (e.animating) return;
            (s = parseInt(
              S(e.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              t.centeredSlides
                ? r < e.loopedSlides - n / 2 ||
                  r > e.slides.length - e.loopedSlides + n / 2
                  ? (e.loopFix(),
                    (r = i
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    E(() => {
                      e.slideTo(r);
                    }))
                  : e.slideTo(r)
                : r > e.slides.length - n
                ? (e.loopFix(),
                  (r = i
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  E(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r);
          } else e.slideTo(r);
        },
      };
      const j = {
        loopCreate: function () {
          const e = this,
            t = g(),
            { params: i, $wrapperEl: n } = e,
            s = n.children().length > 0 ? S(n.children()[0].parentNode) : n;
          s.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
          let r = s.children(`.${i.slideClass}`);
          if (i.loopFillGroupWithBlank) {
            const e = i.slidesPerGroup - (r.length % i.slidesPerGroup);
            if (e !== i.slidesPerGroup) {
              for (let n = 0; n < e; n += 1) {
                const e = S(t.createElement("div")).addClass(
                  `${i.slideClass} ${i.slideBlankClass}`
                );
                s.append(e);
              }
              r = s.children(`.${i.slideClass}`);
            }
          }
          "auto" !== i.slidesPerView ||
            i.loopedSlides ||
            (i.loopedSlides = r.length),
            (e.loopedSlides = Math.ceil(
              parseFloat(i.loopedSlides || i.slidesPerView, 10)
            )),
            (e.loopedSlides += i.loopAdditionalSlides),
            e.loopedSlides > r.length && (e.loopedSlides = r.length);
          const o = [],
            a = [];
          r.each((t, i) => {
            const n = S(t);
            i < e.loopedSlides && a.push(t),
              i < r.length && i >= r.length - e.loopedSlides && o.push(t),
              n.attr("data-swiper-slide-index", i);
          });
          for (let e = 0; e < a.length; e += 1)
            s.append(S(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
          for (let e = o.length - 1; e >= 0; e -= 1)
            s.prepend(S(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
        },
        loopFix: function () {
          const e = this;
          e.emit("beforeLoopFix");
          const {
            activeIndex: t,
            slides: i,
            loopedSlides: n,
            allowSlidePrev: s,
            allowSlideNext: r,
            snapGrid: o,
            rtlTranslate: a,
          } = e;
          let l;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          const d = -o[t] - e.getTranslate();
          if (t < n) {
            (l = i.length - 3 * n + t), (l += n);
            e.slideTo(l, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((a ? -e.translate : e.translate) - d);
          } else if (t >= i.length - n) {
            (l = -i.length + t + n), (l += n);
            e.slideTo(l, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((a ? -e.translate : e.translate) - d);
          }
          (e.allowSlidePrev = s), (e.allowSlideNext = r), e.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: e, params: t, slides: i } = this;
          e
            .children(
              `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
            )
            .remove(),
            i.removeAttr("data-swiper-slide-index");
        },
      };
      function W(e) {
        const t = this,
          i = g(),
          n = v(),
          s = t.touchEventsData,
          { params: r, touches: o, enabled: a } = t;
        if (!a) return;
        if (t.animating && r.preventInteractionOnTransition) return;
        !t.animating && r.cssMode && r.loop && t.loopFix();
        let l = e;
        l.originalEvent && (l = l.originalEvent);
        let d = S(l.target);
        if ("wrapper" === r.touchEventsTarget && !d.closest(t.wrapperEl).length)
          return;
        if (
          ((s.isTouchEvent = "touchstart" === l.type),
          !s.isTouchEvent && "which" in l && 3 === l.which)
        )
          return;
        if (!s.isTouchEvent && "button" in l && l.button > 0) return;
        if (s.isTouched && s.isMoved) return;
        !!r.noSwipingClass &&
          "" !== r.noSwipingClass &&
          l.target &&
          l.target.shadowRoot &&
          e.path &&
          e.path[0] &&
          (d = S(e.path[0]));
        const c = r.noSwipingSelector
            ? r.noSwipingSelector
            : `.${r.noSwipingClass}`,
          u = !(!l.target || !l.target.shadowRoot);
        if (
          r.noSwiping &&
          (u
            ? (function (e, t) {
                return (
                  void 0 === t && (t = this),
                  (function t(i) {
                    return i && i !== g() && i !== v()
                      ? (i.assignedSlot && (i = i.assignedSlot),
                        i.closest(e) || t(i.getRootNode().host))
                      : null;
                  })(t)
                );
              })(c, l.target)
            : d.closest(c)[0])
        )
          return void (t.allowClick = !0);
        if (r.swipeHandler && !d.closest(r.swipeHandler)[0]) return;
        (o.currentX =
          "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
          (o.currentY =
            "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
        const p = o.currentX,
          h = o.currentY,
          f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
          m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
        if (f && (p <= m || p >= n.innerWidth - m)) {
          if ("prevent" !== f) return;
          e.preventDefault();
        }
        if (
          (Object.assign(s, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (o.startX = p),
          (o.startY = h),
          (s.touchStartTime = O()),
          (t.allowClick = !0),
          t.updateSize(),
          (t.swipeDirection = void 0),
          r.threshold > 0 && (s.allowThresholdMove = !1),
          "touchstart" !== l.type)
        ) {
          let e = !0;
          d.is(s.focusableElements) &&
            ((e = !1), "SELECT" === d[0].nodeName && (s.isTouched = !1)),
            i.activeElement &&
              S(i.activeElement).is(s.focusableElements) &&
              i.activeElement !== d[0] &&
              i.activeElement.blur();
          const n = e && t.allowTouchMove && r.touchStartPreventDefault;
          (!r.touchStartForcePreventDefault && !n) ||
            d[0].isContentEditable ||
            l.preventDefault();
        }
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !r.cssMode &&
          t.freeMode.onTouchStart(),
          t.emit("touchStart", l);
      }
      function Y(e) {
        const t = g(),
          i = this,
          n = i.touchEventsData,
          { params: s, touches: r, rtlTranslate: o, enabled: a } = i;
        if (!a) return;
        let l = e;
        if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
          return void (
            n.startMoving &&
            n.isScrolling &&
            i.emit("touchMoveOpposite", l)
          );
        if (n.isTouchEvent && "touchmove" !== l.type) return;
        const d =
            "touchmove" === l.type &&
            l.targetTouches &&
            (l.targetTouches[0] || l.changedTouches[0]),
          c = "touchmove" === l.type ? d.pageX : l.pageX,
          u = "touchmove" === l.type ? d.pageY : l.pageY;
        if (l.preventedByNestedSwiper)
          return (r.startX = c), void (r.startY = u);
        if (!i.allowTouchMove)
          return (
            S(l.target).is(n.focusableElements) || (i.allowClick = !1),
            void (
              n.isTouched &&
              (Object.assign(r, {
                startX: c,
                startY: u,
                currentX: c,
                currentY: u,
              }),
              (n.touchStartTime = O()))
            )
          );
        if (n.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
          if (i.isVertical()) {
            if (
              (u < r.startY && i.translate <= i.maxTranslate()) ||
              (u > r.startY && i.translate >= i.minTranslate())
            )
              return (n.isTouched = !1), void (n.isMoved = !1);
          } else if (
            (c < r.startX && i.translate <= i.maxTranslate()) ||
            (c > r.startX && i.translate >= i.minTranslate())
          )
            return;
        if (
          n.isTouchEvent &&
          t.activeElement &&
          l.target === t.activeElement &&
          S(l.target).is(n.focusableElements)
        )
          return (n.isMoved = !0), void (i.allowClick = !1);
        if (
          (n.allowTouchCallbacks && i.emit("touchMove", l),
          l.targetTouches && l.targetTouches.length > 1)
        )
          return;
        (r.currentX = c), (r.currentY = u);
        const p = r.currentX - r.startX,
          h = r.currentY - r.startY;
        if (
          i.params.threshold &&
          Math.sqrt(p ** 2 + h ** 2) < i.params.threshold
        )
          return;
        if (void 0 === n.isScrolling) {
          let e;
          (i.isHorizontal() && r.currentY === r.startY) ||
          (i.isVertical() && r.currentX === r.startX)
            ? (n.isScrolling = !1)
            : p * p + h * h >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
              (n.isScrolling = i.isHorizontal()
                ? e > s.touchAngle
                : 90 - e > s.touchAngle));
        }
        if (
          (n.isScrolling && i.emit("touchMoveOpposite", l),
          void 0 === n.startMoving &&
            ((r.currentX === r.startX && r.currentY === r.startY) ||
              (n.startMoving = !0)),
          n.isScrolling)
        )
          return void (n.isTouched = !1);
        if (!n.startMoving) return;
        (i.allowClick = !1),
          !s.cssMode && l.cancelable && l.preventDefault(),
          s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
          n.isMoved ||
            (s.loop && !s.cssMode && i.loopFix(),
            (n.startTranslate = i.getTranslate()),
            i.setTransition(0),
            i.animating &&
              i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (n.allowMomentumBounce = !1),
            !s.grabCursor ||
              (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
              i.setGrabCursor(!0),
            i.emit("sliderFirstMove", l)),
          i.emit("sliderMove", l),
          (n.isMoved = !0);
        let f = i.isHorizontal() ? p : h;
        (r.diff = f),
          (f *= s.touchRatio),
          o && (f = -f),
          (i.swipeDirection = f > 0 ? "prev" : "next"),
          (n.currentTranslate = f + n.startTranslate);
        let m = !0,
          v = s.resistanceRatio;
        if (
          (s.touchReleaseOnEdges && (v = 0),
          f > 0 && n.currentTranslate > i.minTranslate()
            ? ((m = !1),
              s.resistance &&
                (n.currentTranslate =
                  i.minTranslate() -
                  1 +
                  (-i.minTranslate() + n.startTranslate + f) ** v))
            : f < 0 &&
              n.currentTranslate < i.maxTranslate() &&
              ((m = !1),
              s.resistance &&
                (n.currentTranslate =
                  i.maxTranslate() +
                  1 -
                  (i.maxTranslate() - n.startTranslate - f) ** v)),
          m && (l.preventedByNestedSwiper = !0),
          !i.allowSlideNext &&
            "next" === i.swipeDirection &&
            n.currentTranslate < n.startTranslate &&
            (n.currentTranslate = n.startTranslate),
          !i.allowSlidePrev &&
            "prev" === i.swipeDirection &&
            n.currentTranslate > n.startTranslate &&
            (n.currentTranslate = n.startTranslate),
          i.allowSlidePrev ||
            i.allowSlideNext ||
            (n.currentTranslate = n.startTranslate),
          s.threshold > 0)
        ) {
          if (!(Math.abs(f) > s.threshold || n.allowThresholdMove))
            return void (n.currentTranslate = n.startTranslate);
          if (!n.allowThresholdMove)
            return (
              (n.allowThresholdMove = !0),
              (r.startX = r.currentX),
              (r.startY = r.currentY),
              (n.currentTranslate = n.startTranslate),
              void (r.diff = i.isHorizontal()
                ? r.currentX - r.startX
                : r.currentY - r.startY)
            );
        }
        s.followFinger &&
          !s.cssMode &&
          (((s.freeMode && s.freeMode.enabled && i.freeMode) ||
            s.watchSlidesProgress) &&
            (i.updateActiveIndex(), i.updateSlidesClasses()),
          i.params.freeMode &&
            s.freeMode.enabled &&
            i.freeMode &&
            i.freeMode.onTouchMove(),
          i.updateProgress(n.currentTranslate),
          i.setTranslate(n.currentTranslate));
      }
      function X(e) {
        const t = this,
          i = t.touchEventsData,
          {
            params: n,
            touches: s,
            rtlTranslate: r,
            slidesGrid: o,
            enabled: a,
          } = t;
        if (!a) return;
        let l = e;
        if (
          (l.originalEvent && (l = l.originalEvent),
          i.allowTouchCallbacks && t.emit("touchEnd", l),
          (i.allowTouchCallbacks = !1),
          !i.isTouched)
        )
          return (
            i.isMoved && n.grabCursor && t.setGrabCursor(!1),
            (i.isMoved = !1),
            void (i.startMoving = !1)
          );
        n.grabCursor &&
          i.isMoved &&
          i.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const d = O(),
          c = d - i.touchStartTime;
        if (t.allowClick) {
          const e = l.path || (l.composedPath && l.composedPath());
          t.updateClickedSlide((e && e[0]) || l.target),
            t.emit("tap click", l),
            c < 300 &&
              d - i.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", l);
        }
        if (
          ((i.lastClickTime = O()),
          E(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !i.isTouched ||
            !i.isMoved ||
            !t.swipeDirection ||
            0 === s.diff ||
            i.currentTranslate === i.startTranslate)
        )
          return (
            (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1)
          );
        let u;
        if (
          ((i.isTouched = !1),
          (i.isMoved = !1),
          (i.startMoving = !1),
          (u = n.followFinger
            ? r
              ? t.translate
              : -t.translate
            : -i.currentTranslate),
          n.cssMode)
        )
          return;
        if (t.params.freeMode && n.freeMode.enabled)
          return void t.freeMode.onTouchEnd({ currentPos: u });
        let p = 0,
          h = t.slidesSizesGrid[0];
        for (
          let e = 0;
          e < o.length;
          e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
        ) {
          const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
          void 0 !== o[e + t]
            ? u >= o[e] && u < o[e + t] && ((p = e), (h = o[e + t] - o[e]))
            : u >= o[e] && ((p = e), (h = o[o.length - 1] - o[o.length - 2]));
        }
        let f = null,
          g = null;
        n.rewind &&
          (t.isBeginning
            ? (g =
                t.params.virtual && t.params.virtual.enabled && t.virtual
                  ? t.virtual.slides.length - 1
                  : t.slides.length - 1)
            : t.isEnd && (f = 0));
        const m = (u - o[p]) / h,
          v = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        if (c > n.longSwipesMs) {
          if (!n.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            (m >= n.longSwipesRatio
              ? t.slideTo(n.rewind && t.isEnd ? f : p + v)
              : t.slideTo(p)),
            "prev" === t.swipeDirection &&
              (m > 1 - n.longSwipesRatio
                ? t.slideTo(p + v)
                : null !== g && m < 0 && Math.abs(m) > n.longSwipesRatio
                ? t.slideTo(g)
                : t.slideTo(p));
        } else {
          if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
          t.navigation &&
          (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
            ? l.target === t.navigation.nextEl
              ? t.slideTo(p + v)
              : t.slideTo(p)
            : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : p + v),
              "prev" === t.swipeDirection && t.slideTo(null !== g ? g : p));
        }
      }
      function U() {
        const e = this,
          { params: t, el: i } = e;
        if (i && 0 === i.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: n, allowSlidePrev: s, snapGrid: r } = e;
        (e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
          e.isEnd &&
          !e.isBeginning &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0),
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.run(),
          (e.allowSlidePrev = s),
          (e.allowSlideNext = n),
          e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
      }
      function Q(e) {
        const t = this;
        t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation())));
      }
      function K() {
        const e = this,
          { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
        if (!n) return;
        let s;
        (e.previousTranslate = e.translate),
          e.isHorizontal()
            ? (e.translate = -t.scrollLeft)
            : (e.translate = -t.scrollTop),
          -0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        (s = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
          s !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1);
      }
      let Z = !1;
      function J() {}
      const ee = (e, t) => {
        const i = g(),
          {
            params: n,
            touchEvents: s,
            el: r,
            wrapperEl: o,
            device: a,
            support: l,
          } = e,
          d = !!n.nested,
          c = "on" === t ? "addEventListener" : "removeEventListener",
          u = t;
        if (l.touch) {
          const t = !(
            "touchstart" !== s.start ||
            !l.passiveListener ||
            !n.passiveListeners
          ) && { passive: !0, capture: !1 };
          r[c](s.start, e.onTouchStart, t),
            r[c](
              s.move,
              e.onTouchMove,
              l.passiveListener ? { passive: !1, capture: d } : d
            ),
            r[c](s.end, e.onTouchEnd, t),
            s.cancel && r[c](s.cancel, e.onTouchEnd, t);
        } else
          r[c](s.start, e.onTouchStart, !1),
            i[c](s.move, e.onTouchMove, d),
            i[c](s.end, e.onTouchEnd, !1);
        (n.preventClicks || n.preventClicksPropagation) &&
          r[c]("click", e.onClick, !0),
          n.cssMode && o[c]("scroll", e.onScroll),
          n.updateOnWindowResize
            ? e[u](
                a.ios || a.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                U,
                !0
              )
            : e[u]("observerUpdate", U, !0);
      };
      const te = {
          attachEvents: function () {
            const e = this,
              t = g(),
              { params: i, support: n } = e;
            (e.onTouchStart = W.bind(e)),
              (e.onTouchMove = Y.bind(e)),
              (e.onTouchEnd = X.bind(e)),
              i.cssMode && (e.onScroll = K.bind(e)),
              (e.onClick = Q.bind(e)),
              n.touch && !Z && (t.addEventListener("touchstart", J), (Z = !0)),
              ee(e, "on");
          },
          detachEvents: function () {
            ee(this, "off");
          },
        },
        ie = (e, t) => e.grid && t.grid && t.grid.rows > 1;
      const ne = {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: i,
              loopedSlides: n = 0,
              params: s,
              $el: r,
            } = e,
            o = s.breakpoints;
          if (!o || (o && 0 === Object.keys(o).length)) return;
          const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) return;
          const l = (a in o ? o[a] : void 0) || e.originalParams,
            d = ie(e, s),
            c = ie(e, l),
            u = s.enabled;
          d && !c
            ? (r.removeClass(
                `${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !d &&
              c &&
              (r.addClass(`${s.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === s.grid.fill)) &&
                r.addClass(`${s.containerModifierClass}grid-column`),
              e.emitContainerClasses());
          const p = l.direction && l.direction !== s.direction,
            h = s.loop && (l.slidesPerView !== s.slidesPerView || p);
          p && i && e.changeDirection(), I(e.params, l);
          const f = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            u && !f ? e.disable() : !u && f && e.enable(),
            (e.currentBreakpoint = a),
            e.emit("_beforeBreakpoint", l),
            h &&
              i &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - n + e.loopedSlides, 0, !1)),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t, i) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !i)))
            return;
          let n = !1;
          const s = v(),
            r = "window" === t ? s.innerHeight : i.clientHeight,
            o = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
              }
              return { value: e, point: e };
            });
          o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < o.length; e += 1) {
            const { point: r, value: a } = o[e];
            "window" === t
              ? s.matchMedia(`(min-width: ${a}px)`).matches && (n = r)
              : a <= i.clientWidth && (n = r);
          }
          return n || "max";
        },
      };
      const se = {
        addClasses: function () {
          const e = this,
            {
              classNames: t,
              params: i,
              rtl: n,
              $el: s,
              device: r,
              support: o,
            } = e,
            a = (function (e, t) {
              const i = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((n) => {
                        e[n] && i.push(t + n);
                      })
                    : "string" == typeof e && i.push(t + e);
                }),
                i
              );
            })(
              [
                "initialized",
                i.direction,
                { "pointer-events": !o.touch },
                { "free-mode": e.params.freeMode && i.freeMode.enabled },
                { autoheight: i.autoHeight },
                { rtl: n },
                { grid: i.grid && i.grid.rows > 1 },
                {
                  "grid-column":
                    i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": i.cssMode },
                { centered: i.cssMode && i.centeredSlides },
              ],
              i.containerModifierClass
            );
          t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: e, classNames: t } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses();
        },
      };
      const re = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function oe(e, t) {
        return function (i) {
          void 0 === i && (i = {});
          const n = Object.keys(i)[0],
            s = i[n];
          "object" == typeof s && null !== s
            ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
                !0 === e[n] &&
                (e[n] = { auto: !0 }),
              n in e && "enabled" in s
                ? (!0 === e[n] && (e[n] = { enabled: !0 }),
                  "object" != typeof e[n] ||
                    "enabled" in e[n] ||
                    (e[n].enabled = !0),
                  e[n] || (e[n] = { enabled: !1 }),
                  I(t, i))
                : I(t, i))
            : I(t, i);
        };
      }
      const ae = {
          eventsEmitter: G,
          update: R,
          translate: H,
          transition: {
            setTransition: function (e, t) {
              const i = this;
              i.params.cssMode || i.$wrapperEl.transition(e),
                i.emit("setTransition", e, t);
            },
            transitionStart: function (e, t) {
              void 0 === e && (e = !0);
              const i = this,
                { params: n } = i;
              n.cssMode ||
                (n.autoHeight && i.updateAutoHeight(),
                q({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
            },
            transitionEnd: function (e, t) {
              void 0 === e && (e = !0);
              const i = this,
                { params: n } = i;
              (i.animating = !1),
                n.cssMode ||
                  (i.setTransition(0),
                  q({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
            },
          },
          slide: V,
          loop: j,
          grabCursor: {
            setGrabCursor: function (e) {
              const t = this;
              if (
                t.support.touch ||
                !t.params.simulateTouch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode
              )
                return;
              const i =
                "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
              (i.style.cursor = "move"),
                (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                (i.style.cursor = e ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const e = this;
              e.support.touch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e[
                  "container" === e.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: te,
          breakpoints: ne,
          checkOverflow: {
            checkOverflow: function () {
              const e = this,
                { isLocked: t, params: i } = e,
                { slidesOffsetBefore: n } = i;
              if (n) {
                const t = e.slides.length - 1,
                  i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
                e.isLocked = e.size > i;
              } else e.isLocked = 1 === e.snapGrid.length;
              !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
            },
          },
          classes: se,
          images: {
            loadImage: function (e, t, i, n, s, r) {
              const o = v();
              let a;
              function l() {
                r && r();
              }
              S(e).parent("picture")[0] || (e.complete && s)
                ? l()
                : t
                ? ((a = new o.Image()),
                  (a.onload = l),
                  (a.onerror = l),
                  n && (a.sizes = n),
                  i && (a.srcset = i),
                  t && (a.src = t))
                : l();
            },
            preloadImages: function () {
              const e = this;
              function t() {
                null != e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
              e.imagesToLoad = e.$el.find("img");
              for (let i = 0; i < e.imagesToLoad.length; i += 1) {
                const n = e.imagesToLoad[i];
                e.loadImage(
                  n,
                  n.currentSrc || n.getAttribute("src"),
                  n.srcset || n.getAttribute("srcset"),
                  n.sizes || n.getAttribute("sizes"),
                  !0,
                  t
                );
              }
            },
          },
        },
        le = {};
      class de {
        constructor() {
          let e, t;
          for (var i = arguments.length, n = new Array(i), s = 0; s < i; s++)
            n[s] = arguments[s];
          if (
            (1 === n.length &&
            n[0].constructor &&
            "Object" === Object.prototype.toString.call(n[0]).slice(8, -1)
              ? (t = n[0])
              : ([e, t] = n),
            t || (t = {}),
            (t = I({}, t)),
            e && !t.el && (t.el = e),
            t.el && S(t.el).length > 1)
          ) {
            const e = [];
            return (
              S(t.el).each((i) => {
                const n = I({}, t, { el: i });
                e.push(new de(n));
              }),
              e
            );
          }
          const r = this;
          (r.__swiper__ = !0),
            (r.support = B()),
            (r.device = F({ userAgent: t.userAgent })),
            (r.browser = N()),
            (r.eventsListeners = {}),
            (r.eventsAnyListeners = []),
            (r.modules = [...r.__modules__]),
            t.modules &&
              Array.isArray(t.modules) &&
              r.modules.push(...t.modules);
          const o = {};
          r.modules.forEach((e) => {
            e({
              swiper: r,
              extendParams: oe(t, o),
              on: r.on.bind(r),
              once: r.once.bind(r),
              off: r.off.bind(r),
              emit: r.emit.bind(r),
            });
          });
          const a = I({}, re, o);
          return (
            (r.params = I({}, a, le, t)),
            (r.originalParams = I({}, r.params)),
            (r.passedParams = I({}, t)),
            r.params &&
              r.params.on &&
              Object.keys(r.params.on).forEach((e) => {
                r.on(e, r.params.on[e]);
              }),
            r.params && r.params.onAny && r.onAny(r.params.onAny),
            (r.$ = S),
            Object.assign(r, {
              enabled: r.params.enabled,
              el: e,
              classNames: [],
              slides: S(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === r.params.direction,
              isVertical: () => "vertical" === r.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: r.params.allowSlideNext,
              allowSlidePrev: r.params.allowSlidePrev,
              touchEvents: (function () {
                const e = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  t = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (r.touchEventsTouch = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                    cancel: e[3],
                  }),
                  (r.touchEventsDesktop = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                  }),
                  r.support.touch || !r.params.simulateTouch
                    ? r.touchEventsTouch
                    : r.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: r.params.focusableElements,
                lastClickTime: O(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: r.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            r.emit("_swiper"),
            r.params.init && r.init(),
            r
          );
        }
        enable() {
          const e = this;
          e.enabled ||
            ((e.enabled = !0),
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"));
        }
        disable() {
          const e = this;
          e.enabled &&
            ((e.enabled = !1),
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"));
        }
        setProgress(e, t) {
          const i = this;
          e = Math.min(Math.max(e, 0), 1);
          const n = i.minTranslate(),
            s = (i.maxTranslate() - n) * e + n;
          i.translateTo(s, void 0 === t ? 0 : t),
            i.updateActiveIndex(),
            i.updateSlidesClasses();
        }
        emitContainerClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = e.el.className
            .split(" ")
            .filter(
              (t) =>
                0 === t.indexOf("swiper") ||
                0 === t.indexOf(e.params.containerModifierClass)
            );
          e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
          const t = this;
          return e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
        }
        emitSlidesClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = [];
          e.slides.each((i) => {
            const n = e.getSlideClasses(i);
            t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
          }),
            e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e, t) {
          void 0 === e && (e = "current"), void 0 === t && (t = !1);
          const {
            params: i,
            slides: n,
            slidesGrid: s,
            slidesSizesGrid: r,
            size: o,
            activeIndex: a,
          } = this;
          let l = 1;
          if (i.centeredSlides) {
            let e,
              t = n[a].swiperSlideSize;
            for (let i = a + 1; i < n.length; i += 1)
              n[i] &&
                !e &&
                ((t += n[i].swiperSlideSize), (l += 1), t > o && (e = !0));
            for (let i = a - 1; i >= 0; i -= 1)
              n[i] &&
                !e &&
                ((t += n[i].swiperSlideSize), (l += 1), t > o && (e = !0));
          } else if ("current" === e)
            for (let e = a + 1; e < n.length; e += 1) {
              (t ? s[e] + r[e] - s[a] < o : s[e] - s[a] < o) && (l += 1);
            }
          else
            for (let e = a - 1; e >= 0; e -= 1) {
              s[a] - s[e] < o && (l += 1);
            }
          return l;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: i } = e;
          function n() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
              i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
          }
          let s;
          i.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled
              ? (n(), e.params.autoHeight && e.updateAutoHeight())
              : ((s =
                  ("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)),
                s || n()),
            i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
        }
        changeDirection(e, t) {
          void 0 === t && (t = !0);
          const i = this,
            n = i.params.direction;
          return (
            e || (e = "horizontal" === n ? "vertical" : "horizontal"),
            e === n ||
              ("horizontal" !== e && "vertical" !== e) ||
              (i.$el
                .removeClass(`${i.params.containerModifierClass}${n}`)
                .addClass(`${i.params.containerModifierClass}${e}`),
              i.emitContainerClasses(),
              (i.params.direction = e),
              i.slides.each((t) => {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              i.emit("changeDirection"),
              t && i.update()),
            i
          );
        }
        mount(e) {
          const t = this;
          if (t.mounted) return !0;
          const i = S(e || t.params.el);
          if (!(e = i[0])) return !1;
          e.swiper = t;
          const n = () =>
            `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let s = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
              const t = S(e.shadowRoot.querySelector(n()));
              return (t.children = (e) => i.children(e)), t;
            }
            return i.children(n());
          })();
          if (0 === s.length && t.params.createElements) {
            const e = g().createElement("div");
            (s = S(e)),
              (e.className = t.params.wrapperClass),
              i.append(e),
              i.children(`.${t.params.slideClass}`).each((e) => {
                s.append(e);
              });
          }
          return (
            Object.assign(t, {
              $el: i,
              el: e,
              $wrapperEl: s,
              wrapperEl: s[0],
              mounted: !0,
              rtl:
                "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
              wrongRTL: "-webkit-box" === s.css("display"),
            }),
            !0
          );
        }
        init(e) {
          const t = this;
          if (t.initialized) return t;
          return (
            !1 === t.mount(e) ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"),
              t.emit("afterInit")),
            t
          );
        }
        destroy(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          const i = this,
            { params: n, $el: s, $wrapperEl: r, slides: o } = i;
          return (
            void 0 === i.params ||
              i.destroyed ||
              (i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              n.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                s.removeAttr("style"),
                r.removeAttr("style"),
                o &&
                  o.length &&
                  o
                    .removeClass(
                      [
                        n.slideVisibleClass,
                        n.slideActiveClass,
                        n.slideNextClass,
                        n.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach((e) => {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                (function (e) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    try {
                      t[e] = null;
                    } catch (e) {}
                    try {
                      delete t[e];
                    } catch (e) {}
                  });
                })(i)),
              (i.destroyed = !0)),
            null
          );
        }
        static extendDefaults(e) {
          I(le, e);
        }
        static get extendedDefaults() {
          return le;
        }
        static get defaults() {
          return re;
        }
        static installModule(e) {
          de.prototype.__modules__ || (de.prototype.__modules__ = []);
          const t = de.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
          return Array.isArray(e)
            ? (e.forEach((e) => de.installModule(e)), de)
            : (de.installModule(e), de);
        }
      }
      Object.keys(ae).forEach((e) => {
        Object.keys(ae[e]).forEach((t) => {
          de.prototype[t] = ae[e][t];
        });
      }),
        de.use([
          function (e) {
            let { swiper: t, on: i, emit: n } = e;
            const s = v();
            let r = null,
              o = null;
            const a = () => {
                t &&
                  !t.destroyed &&
                  t.initialized &&
                  (n("beforeResize"), n("resize"));
              },
              l = () => {
                t && !t.destroyed && t.initialized && n("orientationchange");
              };
            i("init", () => {
              t.params.resizeObserver && void 0 !== s.ResizeObserver
                ? t &&
                  !t.destroyed &&
                  t.initialized &&
                  ((r = new ResizeObserver((e) => {
                    o = s.requestAnimationFrame(() => {
                      const { width: i, height: n } = t;
                      let s = i,
                        r = n;
                      e.forEach((e) => {
                        let {
                          contentBoxSize: i,
                          contentRect: n,
                          target: o,
                        } = e;
                        (o && o !== t.el) ||
                          ((s = n ? n.width : (i[0] || i).inlineSize),
                          (r = n ? n.height : (i[0] || i).blockSize));
                      }),
                        (s === i && r === n) || a();
                    });
                  })),
                  r.observe(t.el))
                : (s.addEventListener("resize", a),
                  s.addEventListener("orientationchange", l));
            }),
              i("destroy", () => {
                o && s.cancelAnimationFrame(o),
                  r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                  s.removeEventListener("resize", a),
                  s.removeEventListener("orientationchange", l);
              });
          },
          function (e) {
            let { swiper: t, extendParams: i, on: n, emit: s } = e;
            const r = [],
              o = v(),
              a = function (e, t) {
                void 0 === t && (t = {});
                const i = new (o.MutationObserver || o.WebkitMutationObserver)(
                  (e) => {
                    if (1 === e.length) return void s("observerUpdate", e[0]);
                    const t = function () {
                      s("observerUpdate", e[0]);
                    };
                    o.requestAnimationFrame
                      ? o.requestAnimationFrame(t)
                      : o.setTimeout(t, 0);
                  }
                );
                i.observe(e, {
                  attributes: void 0 === t.attributes || t.attributes,
                  childList: void 0 === t.childList || t.childList,
                  characterData: void 0 === t.characterData || t.characterData,
                }),
                  r.push(i);
              };
            i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              n("init", () => {
                if (t.params.observer) {
                  if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1) a(e[t]);
                  }
                  a(t.$el[0], { childList: t.params.observeSlideChildren }),
                    a(t.$wrapperEl[0], { attributes: !1 });
                }
              }),
              n("destroy", () => {
                r.forEach((e) => {
                  e.disconnect();
                }),
                  r.splice(0, r.length);
              });
          },
        ]);
      const ce = de;
      function ue(e) {
        let { swiper: t, extendParams: i, on: n, emit: s } = e;
        const r = g(),
          o = v();
        function a(e) {
          if (!t.enabled) return;
          const { rtlTranslate: i } = t;
          let n = e;
          n.originalEvent && (n = n.originalEvent);
          const a = n.keyCode || n.charCode,
            l = t.params.keyboard.pageUpDown,
            d = l && 33 === a,
            c = l && 34 === a,
            u = 37 === a,
            p = 39 === a,
            h = 38 === a,
            f = 40 === a;
          if (
            !t.allowSlideNext &&
            ((t.isHorizontal() && p) || (t.isVertical() && f) || c)
          )
            return !1;
          if (
            !t.allowSlidePrev &&
            ((t.isHorizontal() && u) || (t.isVertical() && h) || d)
          )
            return !1;
          if (
            !(
              n.shiftKey ||
              n.altKey ||
              n.ctrlKey ||
              n.metaKey ||
              (r.activeElement &&
                r.activeElement.nodeName &&
                ("input" === r.activeElement.nodeName.toLowerCase() ||
                  "textarea" === r.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              t.params.keyboard.onlyInViewport &&
              (d || c || u || p || h || f)
            ) {
              let e = !1;
              if (
                t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
                0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
              )
                return;
              const n = t.$el,
                s = n[0].clientWidth,
                r = n[0].clientHeight,
                a = o.innerWidth,
                l = o.innerHeight,
                d = t.$el.offset();
              i && (d.left -= t.$el[0].scrollLeft);
              const c = [
                [d.left, d.top],
                [d.left + s, d.top],
                [d.left, d.top + r],
                [d.left + s, d.top + r],
              ];
              for (let t = 0; t < c.length; t += 1) {
                const i = c[t];
                if (i[0] >= 0 && i[0] <= a && i[1] >= 0 && i[1] <= l) {
                  if (0 === i[0] && 0 === i[1]) continue;
                  e = !0;
                }
              }
              if (!e) return;
            }
            t.isHorizontal()
              ? ((d || c || u || p) &&
                  (n.preventDefault
                    ? n.preventDefault()
                    : (n.returnValue = !1)),
                (((c || p) && !i) || ((d || u) && i)) && t.slideNext(),
                (((d || u) && !i) || ((c || p) && i)) && t.slidePrev())
              : ((d || c || h || f) &&
                  (n.preventDefault
                    ? n.preventDefault()
                    : (n.returnValue = !1)),
                (c || f) && t.slideNext(),
                (d || h) && t.slidePrev()),
              s("keyPress", a);
          }
        }
        function l() {
          t.keyboard.enabled ||
            (S(r).on("keydown", a), (t.keyboard.enabled = !0));
        }
        function d() {
          t.keyboard.enabled &&
            (S(r).off("keydown", a), (t.keyboard.enabled = !1));
        }
        (t.keyboard = { enabled: !1 }),
          i({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
          n("init", () => {
            t.params.keyboard.enabled && l();
          }),
          n("destroy", () => {
            t.keyboard.enabled && d();
          }),
          Object.assign(t.keyboard, { enable: l, disable: d });
      }
      function pe(e, t, i, n) {
        const s = g();
        return (
          e.params.createElements &&
            Object.keys(n).forEach((r) => {
              if (!i[r] && !0 === i.auto) {
                let o = e.$el.children(`.${n[r]}`)[0];
                o ||
                  ((o = s.createElement("div")),
                  (o.className = n[r]),
                  e.$el.append(o)),
                  (i[r] = o),
                  (t[r] = o);
              }
            }),
          i
        );
      }
      function he(e) {
        let { swiper: t, extendParams: i, on: n, emit: s } = e;
        function r(e) {
          let i;
          return (
            e &&
              ((i = S(e)),
              t.params.uniqueNavElements &&
                "string" == typeof e &&
                i.length > 1 &&
                1 === t.$el.find(e).length &&
                (i = t.$el.find(e))),
            i
          );
        }
        function o(e, i) {
          const n = t.params.navigation;
          e &&
            e.length > 0 &&
            (e[i ? "addClass" : "removeClass"](n.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = i),
            t.params.watchOverflow &&
              t.enabled &&
              e[t.isLocked ? "addClass" : "removeClass"](n.lockClass));
        }
        function a() {
          if (t.params.loop) return;
          const { $nextEl: e, $prevEl: i } = t.navigation;
          o(i, t.isBeginning && !t.params.rewind),
            o(e, t.isEnd && !t.params.rewind);
        }
        function l(e) {
          e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) &&
              t.slidePrev();
        }
        function d(e) {
          e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
        }
        function c() {
          const e = t.params.navigation;
          if (
            ((t.params.navigation = pe(
              t,
              t.originalParams.navigation,
              t.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !e.nextEl && !e.prevEl)
          )
            return;
          const i = r(e.nextEl),
            n = r(e.prevEl);
          i && i.length > 0 && i.on("click", d),
            n && n.length > 0 && n.on("click", l),
            Object.assign(t.navigation, {
              $nextEl: i,
              nextEl: i && i[0],
              $prevEl: n,
              prevEl: n && n[0],
            }),
            t.enabled ||
              (i && i.addClass(e.lockClass), n && n.addClass(e.lockClass));
        }
        function u() {
          const { $nextEl: e, $prevEl: i } = t.navigation;
          e &&
            e.length &&
            (e.off("click", d),
            e.removeClass(t.params.navigation.disabledClass)),
            i &&
              i.length &&
              (i.off("click", l),
              i.removeClass(t.params.navigation.disabledClass));
        }
        i({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        }),
          (t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          n("init", () => {
            c(), a();
          }),
          n("toEdge fromEdge lock unlock", () => {
            a();
          }),
          n("destroy", () => {
            u();
          }),
          n("enable disable", () => {
            const { $nextEl: e, $prevEl: i } = t.navigation;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              ),
              i &&
                i[t.enabled ? "removeClass" : "addClass"](
                  t.params.navigation.lockClass
                );
          }),
          n("click", (e, i) => {
            const { $nextEl: n, $prevEl: r } = t.navigation,
              o = i.target;
            if (t.params.navigation.hideOnClick && !S(o).is(r) && !S(o).is(n)) {
              if (
                t.pagination &&
                t.params.pagination &&
                t.params.pagination.clickable &&
                (t.pagination.el === o || t.pagination.el.contains(o))
              )
                return;
              let e;
              n
                ? (e = n.hasClass(t.params.navigation.hiddenClass))
                : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
                s(!0 === e ? "navigationShow" : "navigationHide"),
                n && n.toggleClass(t.params.navigation.hiddenClass),
                r && r.toggleClass(t.params.navigation.hiddenClass);
            }
          }),
          Object.assign(t.navigation, { update: a, init: c, destroy: u });
      }
      function fe(e) {
        return (
          void 0 === e && (e = ""),
          `.${e
            .trim()
            .replace(/([\.:!\/])/g, "\\$1")
            .replace(/ /g, ".")}`
        );
      }
      function ge(e) {
        let { swiper: t, extendParams: i, on: n, emit: s } = e;
        const r = "swiper-pagination";
        let o;
        i({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e) => e,
            formatFractionTotal: (e) => e,
            bulletClass: `${r}-bullet`,
            bulletActiveClass: `${r}-bullet-active`,
            modifierClass: `${r}-`,
            currentClass: `${r}-current`,
            totalClass: `${r}-total`,
            hiddenClass: `${r}-hidden`,
            progressbarFillClass: `${r}-progressbar-fill`,
            progressbarOppositeClass: `${r}-progressbar-opposite`,
            clickableClass: `${r}-clickable`,
            lockClass: `${r}-lock`,
            horizontalClass: `${r}-horizontal`,
            verticalClass: `${r}-vertical`,
          },
        }),
          (t.pagination = { el: null, $el: null, bullets: [] });
        let a = 0;
        function l() {
          return (
            !t.params.pagination.el ||
            !t.pagination.el ||
            !t.pagination.$el ||
            0 === t.pagination.$el.length
          );
        }
        function d(e, i) {
          const { bulletActiveClass: n } = t.params.pagination;
          e[i]().addClass(`${n}-${i}`)[i]().addClass(`${n}-${i}-${i}`);
        }
        function c() {
          const e = t.rtl,
            i = t.params.pagination;
          if (l()) return;
          const n =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            r = t.pagination.$el;
          let c;
          const u = t.params.loop
            ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          if (
            (t.params.loop
              ? ((c = Math.ceil(
                  (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                )),
                c > n - 1 - 2 * t.loopedSlides && (c -= n - 2 * t.loopedSlides),
                c > u - 1 && (c -= u),
                c < 0 && "bullets" !== t.params.paginationType && (c = u + c))
              : (c = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
            "bullets" === i.type &&
              t.pagination.bullets &&
              t.pagination.bullets.length > 0)
          ) {
            const n = t.pagination.bullets;
            let s, l, u;
            if (
              (i.dynamicBullets &&
                ((o = n
                  .eq(0)
                  [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                r.css(
                  t.isHorizontal() ? "width" : "height",
                  o * (i.dynamicMainBullets + 4) + "px"
                ),
                i.dynamicMainBullets > 1 &&
                  void 0 !== t.previousIndex &&
                  ((a += c - (t.previousIndex - t.loopedSlides || 0)),
                  a > i.dynamicMainBullets - 1
                    ? (a = i.dynamicMainBullets - 1)
                    : a < 0 && (a = 0)),
                (s = Math.max(c - a, 0)),
                (l = s + (Math.min(n.length, i.dynamicMainBullets) - 1)),
                (u = (l + s) / 2)),
              n.removeClass(
                ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                  .map((e) => `${i.bulletActiveClass}${e}`)
                  .join(" ")
              ),
              r.length > 1)
            )
              n.each((e) => {
                const t = S(e),
                  n = t.index();
                n === c && t.addClass(i.bulletActiveClass),
                  i.dynamicBullets &&
                    (n >= s &&
                      n <= l &&
                      t.addClass(`${i.bulletActiveClass}-main`),
                    n === s && d(t, "prev"),
                    n === l && d(t, "next"));
              });
            else {
              const e = n.eq(c),
                r = e.index();
              if ((e.addClass(i.bulletActiveClass), i.dynamicBullets)) {
                const e = n.eq(s),
                  o = n.eq(l);
                for (let e = s; e <= l; e += 1)
                  n.eq(e).addClass(`${i.bulletActiveClass}-main`);
                if (t.params.loop)
                  if (r >= n.length) {
                    for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                      n.eq(n.length - e).addClass(
                        `${i.bulletActiveClass}-main`
                      );
                    n.eq(n.length - i.dynamicMainBullets - 1).addClass(
                      `${i.bulletActiveClass}-prev`
                    );
                  } else d(e, "prev"), d(o, "next");
                else d(e, "prev"), d(o, "next");
              }
            }
            if (i.dynamicBullets) {
              const s = Math.min(n.length, i.dynamicMainBullets + 4),
                r = (o * s - o) / 2 - u * o,
                a = e ? "right" : "left";
              n.css(t.isHorizontal() ? a : "top", `${r}px`);
            }
          }
          if (
            ("fraction" === i.type &&
              (r.find(fe(i.currentClass)).text(i.formatFractionCurrent(c + 1)),
              r.find(fe(i.totalClass)).text(i.formatFractionTotal(u))),
            "progressbar" === i.type)
          ) {
            let e;
            e = i.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
              ? "horizontal"
              : "vertical";
            const n = (c + 1) / u;
            let s = 1,
              o = 1;
            "horizontal" === e ? (s = n) : (o = n),
              r
                .find(fe(i.progressbarFillClass))
                .transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${o})`)
                .transition(t.params.speed);
          }
          "custom" === i.type && i.renderCustom
            ? (r.html(i.renderCustom(t, c + 1, u)), s("paginationRender", r[0]))
            : s("paginationUpdate", r[0]),
            t.params.watchOverflow &&
              t.enabled &&
              r[t.isLocked ? "addClass" : "removeClass"](i.lockClass);
        }
        function u() {
          const e = t.params.pagination;
          if (l()) return;
          const i =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            n = t.pagination.$el;
          let r = "";
          if ("bullets" === e.type) {
            let s = t.params.loop
              ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
              : t.snapGrid.length;
            t.params.freeMode &&
              t.params.freeMode.enabled &&
              !t.params.loop &&
              s > i &&
              (s = i);
            for (let i = 0; i < s; i += 1)
              e.renderBullet
                ? (r += e.renderBullet.call(t, i, e.bulletClass))
                : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
            n.html(r), (t.pagination.bullets = n.find(fe(e.bulletClass)));
          }
          "fraction" === e.type &&
            ((r = e.renderFraction
              ? e.renderFraction.call(t, e.currentClass, e.totalClass)
              : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
            n.html(r)),
            "progressbar" === e.type &&
              ((r = e.renderProgressbar
                ? e.renderProgressbar.call(t, e.progressbarFillClass)
                : `<span class="${e.progressbarFillClass}"></span>`),
              n.html(r)),
            "custom" !== e.type && s("paginationRender", t.pagination.$el[0]);
        }
        function p() {
          t.params.pagination = pe(
            t,
            t.originalParams.pagination,
            t.params.pagination,
            { el: "swiper-pagination" }
          );
          const e = t.params.pagination;
          if (!e.el) return;
          let i = S(e.el);
          0 !== i.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              i.length > 1 &&
              ((i = t.$el.find(e.el)),
              i.length > 1 &&
                (i = i.filter((e) => S(e).parents(".swiper")[0] === t.el))),
            "bullets" === e.type && e.clickable && i.addClass(e.clickableClass),
            i.addClass(e.modifierClass + e.type),
            i.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            "bullets" === e.type &&
              e.dynamicBullets &&
              (i.addClass(`${e.modifierClass}${e.type}-dynamic`),
              (a = 0),
              e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type &&
              e.progressbarOpposite &&
              i.addClass(e.progressbarOppositeClass),
            e.clickable &&
              i.on("click", fe(e.bulletClass), function (e) {
                e.preventDefault();
                let i = S(this).index() * t.params.slidesPerGroup;
                t.params.loop && (i += t.loopedSlides), t.slideTo(i);
              }),
            Object.assign(t.pagination, { $el: i, el: i[0] }),
            t.enabled || i.addClass(e.lockClass));
        }
        function h() {
          const e = t.params.pagination;
          if (l()) return;
          const i = t.pagination.$el;
          i.removeClass(e.hiddenClass),
            i.removeClass(e.modifierClass + e.type),
            i.removeClass(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass
            ),
            t.pagination.bullets &&
              t.pagination.bullets.removeClass &&
              t.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && i.off("click", fe(e.bulletClass));
        }
        n("init", () => {
          p(), u(), c();
        }),
          n("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && c();
          }),
          n("snapIndexChange", () => {
            t.params.loop || c();
          }),
          n("slidesLengthChange", () => {
            t.params.loop && (u(), c());
          }),
          n("snapGridLengthChange", () => {
            t.params.loop || (u(), c());
          }),
          n("destroy", () => {
            h();
          }),
          n("enable disable", () => {
            const { $el: e } = t.pagination;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.pagination.lockClass
              );
          }),
          n("lock unlock", () => {
            c();
          }),
          n("click", (e, i) => {
            const n = i.target,
              { $el: r } = t.pagination;
            if (
              t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              r.length > 0 &&
              !S(n).hasClass(t.params.pagination.bulletClass)
            ) {
              if (
                t.navigation &&
                ((t.navigation.nextEl && n === t.navigation.nextEl) ||
                  (t.navigation.prevEl && n === t.navigation.prevEl))
              )
                return;
              const e = r.hasClass(t.params.pagination.hiddenClass);
              s(!0 === e ? "paginationShow" : "paginationHide"),
                r.toggleClass(t.params.pagination.hiddenClass);
            }
          }),
          Object.assign(t.pagination, {
            render: u,
            update: c,
            init: p,
            destroy: h,
          });
      }
      function me(e) {
        let t,
          { swiper: i, extendParams: n, on: s, emit: r } = e;
        function o() {
          const e = i.slides.eq(i.activeIndex);
          let n = i.params.autoplay.delay;
          e.attr("data-swiper-autoplay") &&
            (n = e.attr("data-swiper-autoplay") || i.params.autoplay.delay),
            clearTimeout(t),
            (t = E(() => {
              let e;
              i.params.autoplay.reverseDirection
                ? i.params.loop
                  ? (i.loopFix(),
                    (e = i.slidePrev(i.params.speed, !0, !0)),
                    r("autoplay"))
                  : i.isBeginning
                  ? i.params.autoplay.stopOnLastSlide
                    ? l()
                    : ((e = i.slideTo(
                        i.slides.length - 1,
                        i.params.speed,
                        !0,
                        !0
                      )),
                      r("autoplay"))
                  : ((e = i.slidePrev(i.params.speed, !0, !0)), r("autoplay"))
                : i.params.loop
                ? (i.loopFix(),
                  (e = i.slideNext(i.params.speed, !0, !0)),
                  r("autoplay"))
                : i.isEnd
                ? i.params.autoplay.stopOnLastSlide
                  ? l()
                  : ((e = i.slideTo(0, i.params.speed, !0, !0)), r("autoplay"))
                : ((e = i.slideNext(i.params.speed, !0, !0)), r("autoplay")),
                ((i.params.cssMode && i.autoplay.running) || !1 === e) && o();
            }, n));
        }
        function a() {
          return (
            void 0 === t &&
            !i.autoplay.running &&
            ((i.autoplay.running = !0), r("autoplayStart"), o(), !0)
          );
        }
        function l() {
          return (
            !!i.autoplay.running &&
            void 0 !== t &&
            (t && (clearTimeout(t), (t = void 0)),
            (i.autoplay.running = !1),
            r("autoplayStop"),
            !0)
          );
        }
        function d(e) {
          i.autoplay.running &&
            (i.autoplay.paused ||
              (t && clearTimeout(t),
              (i.autoplay.paused = !0),
              0 !== e && i.params.autoplay.waitForTransition
                ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                    i.$wrapperEl[0].addEventListener(e, u);
                  })
                : ((i.autoplay.paused = !1), o())));
        }
        function c() {
          const e = g();
          "hidden" === e.visibilityState && i.autoplay.running && d(),
            "visible" === e.visibilityState &&
              i.autoplay.paused &&
              (o(), (i.autoplay.paused = !1));
        }
        function u(e) {
          i &&
            !i.destroyed &&
            i.$wrapperEl &&
            e.target === i.$wrapperEl[0] &&
            (["transitionend", "webkitTransitionEnd"].forEach((e) => {
              i.$wrapperEl[0].removeEventListener(e, u);
            }),
            (i.autoplay.paused = !1),
            i.autoplay.running ? o() : l());
        }
        function p() {
          i.params.autoplay.disableOnInteraction
            ? l()
            : (r("autoplayPause"), d()),
            ["transitionend", "webkitTransitionEnd"].forEach((e) => {
              i.$wrapperEl[0].removeEventListener(e, u);
            });
        }
        function h() {
          i.params.autoplay.disableOnInteraction ||
            ((i.autoplay.paused = !1), r("autoplayResume"), o());
        }
        (i.autoplay = { running: !1, paused: !1 }),
          n({
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1,
            },
          }),
          s("init", () => {
            if (i.params.autoplay.enabled) {
              a();
              g().addEventListener("visibilitychange", c),
                i.params.autoplay.pauseOnMouseEnter &&
                  (i.$el.on("mouseenter", p), i.$el.on("mouseleave", h));
            }
          }),
          s("beforeTransitionStart", (e, t, n) => {
            i.autoplay.running &&
              (n || !i.params.autoplay.disableOnInteraction
                ? i.autoplay.pause(t)
                : l());
          }),
          s("sliderFirstMove", () => {
            i.autoplay.running &&
              (i.params.autoplay.disableOnInteraction ? l() : d());
          }),
          s("touchEnd", () => {
            i.params.cssMode &&
              i.autoplay.paused &&
              !i.params.autoplay.disableOnInteraction &&
              o();
          }),
          s("destroy", () => {
            i.$el.off("mouseenter", p),
              i.$el.off("mouseleave", h),
              i.autoplay.running && l();
            g().removeEventListener("visibilitychange", c);
          }),
          Object.assign(i.autoplay, { pause: d, run: o, start: a, stop: l });
      }
      function ve(e, t, i) {
        const n = "swiper-slide-shadow" + (i ? `-${i}` : ""),
          s = e.transformEl ? t.find(e.transformEl) : t;
        let r = s.children(`.${n}`);
        return (
          r.length ||
            ((r = S(
              `<div class="swiper-slide-shadow${i ? `-${i}` : ""}"></div>`
            )),
            s.append(r)),
          r
        );
      }
      function ye(e, t) {
        return e.transformEl
          ? t
              .find(e.transformEl)
              .css({
                "backface-visibility": "hidden",
                "-webkit-backface-visibility": "hidden",
              })
          : t;
      }
      function be(e) {
        let { swiper: t, extendParams: i, on: n } = e;
        i({
          creativeEffect: {
            transformEl: null,
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1,
            },
            next: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1,
            },
          },
        });
        const s = (e) => ("string" == typeof e ? e : `${e}px`);
        !(function (e) {
          const {
            effect: t,
            swiper: i,
            on: n,
            setTranslate: s,
            setTransition: r,
            overwriteParams: o,
            perspective: a,
          } = e;
          let l;
          n("beforeInit", () => {
            if (i.params.effect !== t) return;
            i.classNames.push(`${i.params.containerModifierClass}${t}`),
              a &&
                a() &&
                i.classNames.push(`${i.params.containerModifierClass}3d`);
            const e = o ? o() : {};
            Object.assign(i.params, e), Object.assign(i.originalParams, e);
          }),
            n("setTranslate", () => {
              i.params.effect === t && s();
            }),
            n("setTransition", (e, n) => {
              i.params.effect === t && r(n);
            }),
            n("virtualUpdate", () => {
              i.slides.length || (l = !0),
                requestAnimationFrame(() => {
                  l && i.slides.length && (s(), (l = !1));
                });
            });
        })({
          effect: "creative",
          swiper: t,
          on: n,
          setTranslate: () => {
            const { slides: e, $wrapperEl: i, slidesSizesGrid: n } = t,
              r = t.params.creativeEffect,
              { progressMultiplier: o } = r,
              a = t.params.centeredSlides;
            if (a) {
              const e = n[0] / 2 - t.params.slidesOffsetBefore || 0;
              i.transform(`translateX(calc(50% - ${e}px))`);
            }
            for (let i = 0; i < e.length; i += 1) {
              const n = e.eq(i),
                l = n[0].progress,
                d = Math.min(
                  Math.max(n[0].progress, -r.limitProgress),
                  r.limitProgress
                );
              let c = d;
              a ||
                (c = Math.min(
                  Math.max(n[0].originalProgress, -r.limitProgress),
                  r.limitProgress
                ));
              const u = n[0].swiperSlideOffset,
                p = [t.params.cssMode ? -u - t.translate : -u, 0, 0],
                h = [0, 0, 0];
              let f = !1;
              t.isHorizontal() || ((p[1] = p[0]), (p[0] = 0));
              let g = {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                scale: 1,
                opacity: 1,
              };
              d < 0
                ? ((g = r.next), (f = !0))
                : d > 0 && ((g = r.prev), (f = !0)),
                p.forEach((e, t) => {
                  p[t] = `calc(${e}px + (${s(g.translate[t])} * ${Math.abs(
                    d * o
                  )}))`;
                }),
                h.forEach((e, t) => {
                  h[t] = g.rotate[t] * Math.abs(d * o);
                }),
                (n[0].style.zIndex = -Math.abs(Math.round(l)) + e.length);
              const m = p.join(", "),
                v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                y =
                  c < 0
                    ? `scale(${1 + (1 - g.scale) * c * o})`
                    : `scale(${1 - (1 - g.scale) * c * o})`,
                b =
                  c < 0
                    ? 1 + (1 - g.opacity) * c * o
                    : 1 - (1 - g.opacity) * c * o,
                _ = `translate3d(${m}) ${v} ${y}`;
              if ((f && g.shadow) || !f) {
                let e = n.children(".swiper-slide-shadow");
                if ((0 === e.length && g.shadow && (e = ve(r, n)), e.length)) {
                  const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                  e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
                }
              }
              const w = ye(r, n);
              w.transform(_).css({ opacity: b }),
                g.origin && w.css("transform-origin", g.origin);
            }
          },
          setTransition: (e) => {
            const { transformEl: i } = t.params.creativeEffect;
            (i ? t.slides.find(i) : t.slides)
              .transition(e)
              .find(".swiper-slide-shadow")
              .transition(e),
              (function (e) {
                let {
                  swiper: t,
                  duration: i,
                  transformEl: n,
                  allSlides: s,
                } = e;
                const { slides: r, activeIndex: o, $wrapperEl: a } = t;
                if (t.params.virtualTranslate && 0 !== i) {
                  let e,
                    i = !1;
                  (e = s ? (n ? r.find(n) : r) : n ? r.eq(o).find(n) : r.eq(o)),
                    e.transitionEnd(() => {
                      if (i) return;
                      if (!t || t.destroyed) return;
                      (i = !0), (t.animating = !1);
                      const e = ["webkitTransitionEnd", "transitionend"];
                      for (let t = 0; t < e.length; t += 1) a.trigger(e[t]);
                    });
                }
              })({ swiper: t, duration: e, transformEl: i, allSlides: !0 });
          },
          perspective: () => t.params.creativeEffect.perspective,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
      }
      function _e() {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)'
        );
        e &&
          e.forEach((e) => {
            e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper");
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      }
      window.addEventListener("load", function (e) {
        _e(),
          document.querySelector(".hero-slider") &&
            new ce(".hero-slider", {
              modules: [he, ge, be, me, ue],
              grabCursor: !0,
              effect: "creative",
              creativeEffect: {
                prev: { shadow: !0, translate: ["-20%", 0, -1] },
                next: { translate: ["100%", 0, 0] },
              },
              keyboard: { enabled: !0, onlyInViewport: !0 },
              autoplay: {
                delay: 4e3,
                disableOnInteraction: !1,
                pauseOnMouseEnter: !0,
              },
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 1500,
              loop: !0,
              pagination: {
                el: ".hero__pagination",
                clickable: !0,
                renderBullet: function (e, t) {
                  return '<span class="' + t + '">' + (e + 1) + "</span>";
                },
              },
              navigation: {
                nextEl: ".hero__button-next",
                prevEl: ".hero__button-prev",
              },
              breakpoints: {
                320: { slidesPerView: 1, speed: 500 },
                768: { slidesPerView: 1 },
                992: { slidesPerView: 1 },
                1268: { slidesPerView: 1 },
              },
              on: {},
            }),
          document.querySelector(".in-work-slider") &&
            new ce(".in-work-slider", {
              modules: [he, ge, me],
              grabCursor: !0,
              autoplay: {
                delay: 2e3,
                disableOnInteraction: !1,
                pauseOnMouseEnter: !0,
              },
              observer: !0,
              observeParents: !0,
              slidesPerView: 3,
              spaceBetween: 40,
              speed: 800,
              centeredSlides: !0,
              loop: !0,
              pagination: { el: ".in-work-slider__pagination", clickable: !0 },
              navigation: {
                nextEl: ".in-work-slider__arrow-next",
                prevEl: ".in-work-slider__arrow-prev",
              },
              breakpoints: {
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1268: {},
              },
              on: {},
            }),
          document.querySelector(".partners-slider") &&
            new ce(".partners-slider", {
              modules: [he, me],
              grabCursor: !0,
              observer: !0,
              observeParents: !0,
              slidesPerView: 4,
              spaceBetween: 20,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl: ".partners-slider__arrow-next",
                prevEl: ".partners-slider__arrow-prev",
              },
              breakpoints: {
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                992: {},
                1268: {},
              },
              on: {},
            });
      });
      new (i(732))({
        elements_selector: "[data-src]",
        class_loaded: "_lazy-loaded",
        use_native: !0,
      });
      let we = !1;
      setTimeout(() => {
        if (we) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0);
      var Te = function () {
        return (
          (Te =
            Object.assign ||
            function (e) {
              for (var t, i = 1, n = arguments.length; i < n; i++)
                for (var s in (t = arguments[i]))
                  Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
              return e;
            }),
          Te.apply(this, arguments)
        );
      };
      var xe = "lgAfterAppendSlide",
        Ce = "lgInit",
        Se = "lgHasVideo",
        Ee = "lgContainerResize",
        Oe = "lgUpdateSlides",
        ke = "lgAfterAppendSubHtml",
        Ae = "lgBeforeOpen",
        Me = "lgAfterOpen",
        Ie = "lgSlideItemLoad",
        Le = "lgBeforeSlide",
        Pe = "lgAfterSlide",
        De = "lgPosterClick",
        ze = "lgDragStart",
        $e = "lgDragMove",
        Be = "lgDragEnd",
        Fe = "lgBeforeNextSlide",
        Ne = "lgBeforePrevSlide",
        Ge = "lgBeforeClose",
        Re = "lgAfterClose",
        He = {
          mode: "lg-slide",
          easing: "ease",
          speed: 400,
          licenseKey: "0000-0000-000-0000",
          height: "100%",
          width: "100%",
          addClass: "",
          startClass: "lg-start-zoom",
          backdropDuration: 300,
          container: "",
          startAnimationDuration: 400,
          zoomFromOrigin: !0,
          hideBarsDelay: 0,
          showBarsAfter: 1e4,
          slideDelay: 0,
          supportLegacyBrowser: !0,
          allowMediaOverlap: !1,
          videoMaxSize: "1280-720",
          loadYouTubePoster: !0,
          defaultCaptionHeight: 0,
          ariaLabelledby: "",
          ariaDescribedby: "",
          closable: !0,
          swipeToClose: !0,
          closeOnTap: !0,
          showCloseIcon: !0,
          showMaximizeIcon: !1,
          loop: !0,
          escKey: !0,
          keyPress: !0,
          controls: !0,
          slideEndAnimation: !0,
          hideControlOnEnd: !1,
          mousewheel: !1,
          getCaptionFromTitleOrAlt: !0,
          appendSubHtmlTo: ".lg-sub-html",
          subHtmlSelectorRelative: !1,
          preload: 2,
          numberOfSlideItemsInDom: 10,
          selector: "",
          selectWithin: "",
          nextHtml: "",
          prevHtml: "",
          index: 0,
          iframeWidth: "100%",
          iframeHeight: "100%",
          iframeMaxWidth: "100%",
          iframeMaxHeight: "100%",
          download: !0,
          counter: !0,
          appendCounterTo: ".lg-toolbar",
          swipeThreshold: 50,
          enableSwipe: !0,
          enableDrag: !0,
          dynamic: !1,
          dynamicEl: [],
          extraProps: [],
          exThumbImage: "",
          isMobile: void 0,
          mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
          plugins: [],
          strings: {
            closeGallery: "Close gallery",
            toggleMaximize: "Toggle maximize",
            previousSlide: "Previous slide",
            nextSlide: "Next slide",
            download: "Download",
            playVideo: "Play video",
          },
        };
      var qe = (function () {
        function e(e) {
          return (
            (this.cssVenderPrefixes = [
              "TransitionDuration",
              "TransitionTimingFunction",
              "Transform",
              "Transition",
            ]),
            (this.selector = this._getSelector(e)),
            (this.firstElement = this._getFirstEl()),
            this
          );
        }
        return (
          (e.generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (e) {
                var t = (16 * Math.random()) | 0;
                return ("x" == e ? t : (3 & t) | 8).toString(16);
              }
            );
          }),
          (e.prototype._getSelector = function (e, t) {
            return (
              void 0 === t && (t = document),
              "string" != typeof e
                ? e
                : ((t = t || document),
                  "#" === e.substring(0, 1)
                    ? t.querySelector(e)
                    : t.querySelectorAll(e))
            );
          }),
          (e.prototype._each = function (e) {
            return this.selector
              ? (void 0 !== this.selector.length
                  ? [].forEach.call(this.selector, e)
                  : e(this.selector, 0),
                this)
              : this;
          }),
          (e.prototype._setCssVendorPrefix = function (e, t, i) {
            var n = t.replace(/-([a-z])/gi, function (e, t) {
              return t.toUpperCase();
            });
            -1 !== this.cssVenderPrefixes.indexOf(n)
              ? ((e.style[n.charAt(0).toLowerCase() + n.slice(1)] = i),
                (e.style["webkit" + n] = i),
                (e.style["moz" + n] = i),
                (e.style["ms" + n] = i),
                (e.style["o" + n] = i))
              : (e.style[n] = i);
          }),
          (e.prototype._getFirstEl = function () {
            return this.selector && void 0 !== this.selector.length
              ? this.selector[0]
              : this.selector;
          }),
          (e.prototype.isEventMatched = function (e, t) {
            var i = t.split(".");
            return e
              .split(".")
              .filter(function (e) {
                return e;
              })
              .every(function (e) {
                return -1 !== i.indexOf(e);
              });
          }),
          (e.prototype.attr = function (e, t) {
            return void 0 === t
              ? this.firstElement
                ? this.firstElement.getAttribute(e)
                : ""
              : (this._each(function (i) {
                  i.setAttribute(e, t);
                }),
                this);
          }),
          (e.prototype.find = function (e) {
            return Ve(this._getSelector(e, this.selector));
          }),
          (e.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length
              ? Ve(this.selector[0])
              : Ve(this.selector);
          }),
          (e.prototype.eq = function (e) {
            return Ve(this.selector[e]);
          }),
          (e.prototype.parent = function () {
            return Ve(this.selector.parentElement);
          }),
          (e.prototype.get = function () {
            return this._getFirstEl();
          }),
          (e.prototype.removeAttr = function (e) {
            var t = e.split(" ");
            return (
              this._each(function (e) {
                t.forEach(function (t) {
                  return e.removeAttribute(t);
                });
              }),
              this
            );
          }),
          (e.prototype.wrap = function (e) {
            if (!this.firstElement) return this;
            var t = document.createElement("div");
            return (
              (t.className = e),
              this.firstElement.parentNode.insertBefore(t, this.firstElement),
              this.firstElement.parentNode.removeChild(this.firstElement),
              t.appendChild(this.firstElement),
              this
            );
          }),
          (e.prototype.addClass = function (e) {
            return (
              void 0 === e && (e = ""),
              this._each(function (t) {
                e.split(" ").forEach(function (e) {
                  e && t.classList.add(e);
                });
              }),
              this
            );
          }),
          (e.prototype.removeClass = function (e) {
            return (
              this._each(function (t) {
                e.split(" ").forEach(function (e) {
                  e && t.classList.remove(e);
                });
              }),
              this
            );
          }),
          (e.prototype.hasClass = function (e) {
            return (
              !!this.firstElement && this.firstElement.classList.contains(e)
            );
          }),
          (e.prototype.hasAttribute = function (e) {
            return !!this.firstElement && this.firstElement.hasAttribute(e);
          }),
          (e.prototype.toggleClass = function (e) {
            return this.firstElement
              ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e),
                this)
              : this;
          }),
          (e.prototype.css = function (e, t) {
            var i = this;
            return (
              this._each(function (n) {
                i._setCssVendorPrefix(n, e, t);
              }),
              this
            );
          }),
          (e.prototype.on = function (t, i) {
            var n = this;
            return this.selector
              ? (t.split(" ").forEach(function (t) {
                  Array.isArray(e.eventListeners[t]) ||
                    (e.eventListeners[t] = []),
                    e.eventListeners[t].push(i),
                    n.selector.addEventListener(t.split(".")[0], i);
                }),
                this)
              : this;
          }),
          (e.prototype.once = function (e, t) {
            var i = this;
            return (
              this.on(e, function () {
                i.off(e), t(e);
              }),
              this
            );
          }),
          (e.prototype.off = function (t) {
            var i = this;
            return this.selector
              ? (Object.keys(e.eventListeners).forEach(function (n) {
                  i.isEventMatched(t, n) &&
                    (e.eventListeners[n].forEach(function (e) {
                      i.selector.removeEventListener(n.split(".")[0], e);
                    }),
                    (e.eventListeners[n] = []));
                }),
                this)
              : this;
          }),
          (e.prototype.trigger = function (e, t) {
            if (!this.firstElement) return this;
            var i = new CustomEvent(e.split(".")[0], { detail: t || null });
            return this.firstElement.dispatchEvent(i), this;
          }),
          (e.prototype.load = function (e) {
            var t = this;
            return (
              fetch(e)
                .then(function (e) {
                  return e.text();
                })
                .then(function (e) {
                  t.selector.innerHTML = e;
                }),
              this
            );
          }),
          (e.prototype.html = function (e) {
            return void 0 === e
              ? this.firstElement
                ? this.firstElement.innerHTML
                : ""
              : (this._each(function (t) {
                  t.innerHTML = e;
                }),
                this);
          }),
          (e.prototype.append = function (e) {
            return (
              this._each(function (t) {
                "string" == typeof e
                  ? t.insertAdjacentHTML("beforeend", e)
                  : t.appendChild(e);
              }),
              this
            );
          }),
          (e.prototype.prepend = function (e) {
            return (
              this._each(function (t) {
                t.insertAdjacentHTML("afterbegin", e);
              }),
              this
            );
          }),
          (e.prototype.remove = function () {
            return (
              this._each(function (e) {
                e.parentNode.removeChild(e);
              }),
              this
            );
          }),
          (e.prototype.empty = function () {
            return (
              this._each(function (e) {
                e.innerHTML = "";
              }),
              this
            );
          }),
          (e.prototype.scrollTop = function (e) {
            return void 0 !== e
              ? ((document.body.scrollTop = e),
                (document.documentElement.scrollTop = e),
                this)
              : window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0;
          }),
          (e.prototype.scrollLeft = function (e) {
            return void 0 !== e
              ? ((document.body.scrollLeft = e),
                (document.documentElement.scrollLeft = e),
                this)
              : window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft ||
                  0;
          }),
          (e.prototype.offset = function () {
            if (!this.firstElement) return { left: 0, top: 0 };
            var e = this.firstElement.getBoundingClientRect(),
              t = Ve("body").style().marginLeft;
            return {
              left: e.left - parseFloat(t) + this.scrollLeft(),
              top: e.top + this.scrollTop(),
            };
          }),
          (e.prototype.style = function () {
            return this.firstElement
              ? this.firstElement.currentStyle ||
                  window.getComputedStyle(this.firstElement)
              : {};
          }),
          (e.prototype.width = function () {
            var e = this.style();
            return (
              this.firstElement.clientWidth -
              parseFloat(e.paddingLeft) -
              parseFloat(e.paddingRight)
            );
          }),
          (e.prototype.height = function () {
            var e = this.style();
            return (
              this.firstElement.clientHeight -
              parseFloat(e.paddingTop) -
              parseFloat(e.paddingBottom)
            );
          }),
          (e.eventListeners = {}),
          e
        );
      })();
      function Ve(e) {
        return (
          (function () {
            if ("function" == typeof window.CustomEvent) return !1;
            window.CustomEvent = function (e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: null };
              var i = document.createEvent("CustomEvent");
              return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
            };
          })(),
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          new qe(e)
        );
      }
      var je = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl",
      ];
      function We(e) {
        return "href" === e
          ? "src"
          : (e = (e =
              (e = e.replace("data-", "")).charAt(0).toLowerCase() +
              e.slice(1)).replace(/-([a-z])/g, function (e) {
              return e[1].toUpperCase();
            }));
      }
      var Ye = function (e, t, i, n) {
          void 0 === i && (i = 0);
          var s = Ve(e).attr("data-lg-size") || n;
          if (s) {
            var r = s.split(",");
            if (r[1])
              for (var o = window.innerWidth, a = 0; a < r.length; a++) {
                var l = r[a];
                if (parseInt(l.split("-")[2], 10) > o) {
                  s = l;
                  break;
                }
                a === r.length - 1 && (s = l);
              }
            var d = s.split("-"),
              c = parseInt(d[0], 10),
              u = parseInt(d[1], 10),
              p = t.width(),
              h = t.height() - i,
              f = Math.min(p, c),
              g = Math.min(h, u),
              m = Math.min(f / c, g / u);
            return { width: c * m, height: u * m };
          }
        },
        Xe = function (e, t, i, n, s) {
          if (s) {
            var r = Ve(e).find("img").first();
            if (r.get()) {
              var o = t.get().getBoundingClientRect(),
                a = o.width,
                l = t.height() - (i + n),
                d = r.width(),
                c = r.height(),
                u = r.style(),
                p =
                  (a - d) / 2 -
                  r.offset().left +
                  (parseFloat(u.paddingLeft) || 0) +
                  (parseFloat(u.borderLeft) || 0) +
                  Ve(window).scrollLeft() +
                  o.left,
                h =
                  (l - c) / 2 -
                  r.offset().top +
                  (parseFloat(u.paddingTop) || 0) +
                  (parseFloat(u.borderTop) || 0) +
                  Ve(window).scrollTop() +
                  i;
              return (
                "translate3d(" +
                (p *= -1) +
                "px, " +
                (h *= -1) +
                "px, 0) scale3d(" +
                d / s.width +
                ", " +
                c / s.height +
                ", 1)"
              );
            }
          }
        },
        Ue = function (e, t, i, n, s, r) {
          return (
            '<div class="lg-video-cont lg-has-iframe" style="width:' +
            e +
            "; max-width:" +
            i +
            "; height: " +
            t +
            "; max-height:" +
            n +
            '">\n                    <iframe class="lg-object" frameborder="0" ' +
            (r ? 'title="' + r + '"' : "") +
            ' src="' +
            s +
            '"  allowfullscreen="true"></iframe>\n                </div>'
          );
        },
        Qe = function (e, t, i, n, s, r) {
          var o =
              "<img " +
              i +
              " " +
              (n ? 'srcset="' + n + '"' : "") +
              "  " +
              (s ? 'sizes="' + s + '"' : "") +
              ' class="lg-object lg-image" data-index="' +
              e +
              '" src="' +
              t +
              '" />',
            a = "";
          r &&
            (a = ("string" == typeof r ? JSON.parse(r) : r).map(function (e) {
              var t = "";
              return (
                Object.keys(e).forEach(function (i) {
                  t += " " + i + '="' + e[i] + '"';
                }),
                "<source " + t + "></source>"
              );
            }));
          return "" + a + o;
        },
        Ke = function (e) {
          for (var t = [], i = [], n = "", s = 0; s < e.length; s++) {
            var r = e[s].split(" ");
            "" === r[0] && r.splice(0, 1), i.push(r[0]), t.push(r[1]);
          }
          for (var o = window.innerWidth, a = 0; a < t.length; a++)
            if (parseInt(t[a], 10) > o) {
              n = i[a];
              break;
            }
          return n;
        },
        Ze = function (e) {
          return !!e && !!e.complete && 0 !== e.naturalWidth;
        },
        Je = function (e, t, i, n, s) {
          return (
            '<div class="lg-video-cont ' +
            (s && s.youtube
              ? "lg-has-youtube"
              : s && s.vimeo
              ? "lg-has-vimeo"
              : "lg-has-html5") +
            '" style="' +
            i +
            '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
            n +
            '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
            n +
            '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
            (t || "") +
            '\n            <img class="lg-object lg-video-poster" src="' +
            e +
            '" />\n        </div>'
          );
        },
        et = function (e, t, i, n) {
          var s = [],
            r = (function () {
              for (var e = 0, t = 0, i = arguments.length; t < i; t++)
                e += arguments[t].length;
              var n = Array(e),
                s = 0;
              for (t = 0; t < i; t++)
                for (var r = arguments[t], o = 0, a = r.length; o < a; o++, s++)
                  n[s] = r[o];
              return n;
            })(je, t);
          return (
            [].forEach.call(e, function (e) {
              for (var t = {}, o = 0; o < e.attributes.length; o++) {
                var a = e.attributes[o];
                if (a.specified) {
                  var l = We(a.name),
                    d = "";
                  r.indexOf(l) > -1 && (d = l), d && (t[d] = a.value);
                }
              }
              var c = Ve(e),
                u = c.find("img").first().attr("alt"),
                p = c.attr("title"),
                h = n ? c.attr(n) : c.find("img").first().attr("src");
              (t.thumb = h),
                i && !t.subHtml && (t.subHtml = p || u || ""),
                (t.alt = u || p || ""),
                s.push(t);
            }),
            s
          );
        },
        tt = function () {
          return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        it = function (e, t, i) {
          if (!e)
            return t
              ? { html5: !0 }
              : void console.error(
                  "lightGallery :- data-src is not provided on slide item " +
                    (i + 1) +
                    ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                );
          var n = e.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
            ),
            s = e.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
            ),
            r = e.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return n
            ? { youtube: n }
            : s
            ? { vimeo: s }
            : r
            ? { wistia: r }
            : void 0;
        },
        nt = 0,
        st = (function () {
          function e(e, t) {
            if (
              ((this.lgOpened = !1),
              (this.index = 0),
              (this.plugins = []),
              (this.lGalleryOn = !1),
              (this.lgBusy = !1),
              (this.currentItemsInDom = []),
              (this.prevScrollTop = 0),
              (this.isDummyImageRemoved = !1),
              (this.dragOrSwipeEnabled = !1),
              (this.mediaContainerPosition = { top: 0, bottom: 0 }),
              !e)
            )
              return this;
            if (
              (nt++,
              (this.lgId = nt),
              (this.el = e),
              (this.LGel = Ve(e)),
              this.generateSettings(t),
              this.buildModules(),
              this.settings.dynamic &&
                void 0 !== this.settings.dynamicEl &&
                !Array.isArray(this.settings.dynamicEl))
            )
              throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return (
              (this.galleryItems = this.getItems()),
              this.normalizeSettings(),
              this.init(),
              this.validateLicense(),
              this
            );
          }
          return (
            (e.prototype.generateSettings = function (e) {
              if (
                ((this.settings = Te(Te({}, He), e)),
                this.settings.isMobile &&
                "function" == typeof this.settings.isMobile
                  ? this.settings.isMobile()
                  : tt())
              ) {
                var t = Te(
                  Te({}, this.settings.mobileSettings),
                  this.settings.mobileSettings
                );
                this.settings = Te(Te({}, this.settings), t);
              }
            }),
            (e.prototype.normalizeSettings = function () {
              this.settings.slideEndAnimation &&
                (this.settings.hideControlOnEnd = !1),
                this.settings.closable || (this.settings.swipeToClose = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                this.settings.dynamic && (this.zoomFromOrigin = !1),
                this.settings.container ||
                  (this.settings.container = document.body),
                (this.settings.preload = Math.min(
                  this.settings.preload,
                  this.galleryItems.length
                ));
            }),
            (e.prototype.init = function () {
              var e = this;
              this.addSlideVideoInfo(this.galleryItems),
                this.buildStructure(),
                this.LGel.trigger(Ce, { instance: this }),
                this.settings.keyPress && this.keyPress(),
                setTimeout(function () {
                  e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
                }, 50),
                this.arrow(),
                this.settings.mousewheel && this.mousewheel(),
                this.settings.dynamic || this.openGalleryOnItemClick();
            }),
            (e.prototype.openGalleryOnItemClick = function () {
              for (
                var e = this,
                  t = function (t) {
                    var n = i.items[t],
                      s = Ve(n),
                      r = qe.generateUUID();
                    s.attr("data-lg-id", r).on(
                      "click.lgcustom-item-" + r,
                      function (i) {
                        i.preventDefault();
                        var s = e.settings.index || t;
                        e.openGallery(s, n);
                      }
                    );
                  },
                  i = this,
                  n = 0;
                n < this.items.length;
                n++
              )
                t(n);
            }),
            (e.prototype.buildModules = function () {
              var e = this;
              this.settings.plugins.forEach(function (t) {
                e.plugins.push(new t(e, Ve));
              });
            }),
            (e.prototype.validateLicense = function () {
              this.settings.licenseKey
                ? "0000-0000-000-0000" === this.settings.licenseKey &&
                  console.warn(
                    "lightGallery: " +
                      this.settings.licenseKey +
                      " license key is not valid for production use"
                  )
                : console.error("Please provide a valid license key");
            }),
            (e.prototype.getSlideItem = function (e) {
              return Ve(this.getSlideItemId(e));
            }),
            (e.prototype.getSlideItemId = function (e) {
              return "#lg-item-" + this.lgId + "-" + e;
            }),
            (e.prototype.getIdName = function (e) {
              return e + "-" + this.lgId;
            }),
            (e.prototype.getElementById = function (e) {
              return Ve("#" + this.getIdName(e));
            }),
            (e.prototype.manageSingleSlideClassName = function () {
              this.galleryItems.length < 2
                ? this.outer.addClass("lg-single-item")
                : this.outer.removeClass("lg-single-item");
            }),
            (e.prototype.buildStructure = function () {
              var e = this;
              if (!(this.$container && this.$container.get())) {
                var t = "",
                  i = "";
                this.settings.controls &&
                  (t =
                    '<button type="button" id="' +
                    this.getIdName("lg-prev") +
                    '" aria-label="' +
                    this.settings.strings.previousSlide +
                    '" class="lg-prev lg-icon"> ' +
                    this.settings.prevHtml +
                    ' </button>\n                <button type="button" id="' +
                    this.getIdName("lg-next") +
                    '" aria-label="' +
                    this.settings.strings.nextSlide +
                    '" class="lg-next lg-icon"> ' +
                    this.settings.nextHtml +
                    " </button>"),
                  ".lg-item" !== this.settings.appendSubHtmlTo &&
                    (i =
                      '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                var n = "";
                this.settings.allowMediaOverlap && (n += "lg-media-overlap ");
                var s = this.settings.ariaLabelledby
                    ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                    : "",
                  r = this.settings.ariaDescribedby
                    ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                    : "",
                  o =
                    "lg-container " +
                    this.settings.addClass +
                    " " +
                    (document.body !== this.settings.container
                      ? "lg-inline"
                      : ""),
                  a =
                    this.settings.closable && this.settings.showCloseIcon
                      ? '<button type="button" aria-label="' +
                        this.settings.strings.closeGallery +
                        '" id="' +
                        this.getIdName("lg-close") +
                        '" class="lg-close lg-icon"></button>'
                      : "",
                  l = this.settings.showMaximizeIcon
                    ? '<button type="button" aria-label="' +
                      this.settings.strings.toggleMaximize +
                      '" id="' +
                      this.getIdName("lg-maximize") +
                      '" class="lg-maximize lg-icon"></button>'
                    : "",
                  d =
                    '\n        <div class="' +
                    o +
                    '" id="' +
                    this.getIdName("lg-container") +
                    '" tabindex="-1" aria-modal="true" ' +
                    s +
                    " " +
                    r +
                    ' role="dialog"\n        >\n            <div id="' +
                    this.getIdName("lg-backdrop") +
                    '" class="lg-backdrop"></div>\n\n            <div id="' +
                    this.getIdName("lg-outer") +
                    '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                    n +
                    ' ">\n\n              <div id="' +
                    this.getIdName("lg-content") +
                    '" class="lg-content">\n                <div id="' +
                    this.getIdName("lg-inner") +
                    '" class="lg-inner">\n                </div>\n                ' +
                    t +
                    '\n              </div>\n                <div id="' +
                    this.getIdName("lg-toolbar") +
                    '" class="lg-toolbar lg-group">\n                    ' +
                    l +
                    "\n                    " +
                    a +
                    "\n                    </div>\n                    " +
                    (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                    '\n                <div id="' +
                    this.getIdName("lg-components") +
                    '" class="lg-components">\n                    ' +
                    (".lg-sub-html" === this.settings.appendSubHtmlTo
                      ? i
                      : "") +
                    "\n                </div>\n            </div>\n        </div>\n        ";
                Ve(this.settings.container).append(d),
                  document.body !== this.settings.container &&
                    Ve(this.settings.container).css("position", "relative"),
                  (this.outer = this.getElementById("lg-outer")),
                  (this.$lgComponents = this.getElementById("lg-components")),
                  (this.$backdrop = this.getElementById("lg-backdrop")),
                  (this.$container = this.getElementById("lg-container")),
                  (this.$inner = this.getElementById("lg-inner")),
                  (this.$content = this.getElementById("lg-content")),
                  (this.$toolbar = this.getElementById("lg-toolbar")),
                  this.$backdrop.css(
                    "transition-duration",
                    this.settings.backdropDuration + "ms"
                  );
                var c = this.settings.mode + " ";
                this.manageSingleSlideClassName(),
                  this.settings.enableDrag && (c += "lg-grab "),
                  this.outer.addClass(c),
                  this.$inner.css(
                    "transition-timing-function",
                    this.settings.easing
                  ),
                  this.$inner.css(
                    "transition-duration",
                    this.settings.speed + "ms"
                  ),
                  this.settings.download &&
                    this.$toolbar.append(
                      '<a id="' +
                        this.getIdName("lg-download") +
                        '" target="_blank" rel="noopener" aria-label="' +
                        this.settings.strings.download +
                        '" download class="lg-download lg-icon"></a>'
                    ),
                  this.counter(),
                  Ve(window).on(
                    "resize.lg.global" +
                      this.lgId +
                      " orientationchange.lg.global" +
                      this.lgId,
                    function () {
                      e.refreshOnResize();
                    }
                  ),
                  this.hideBars(),
                  this.manageCloseGallery(),
                  this.toggleMaximize(),
                  this.initModules();
              }
            }),
            (e.prototype.refreshOnResize = function () {
              if (this.lgOpened) {
                var e = this.galleryItems[this.index].__slideVideoInfo;
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var t = this.mediaContainerPosition,
                  i = t.top,
                  n = t.bottom;
                if (
                  ((this.currentImageSize = Ye(
                    this.items[this.index],
                    this.outer,
                    i + n,
                    e && this.settings.videoMaxSize
                  )),
                  e && this.resizeVideoSlide(this.index, this.currentImageSize),
                  this.zoomFromOrigin && !this.isDummyImageRemoved)
                ) {
                  var s = this.getDummyImgStyles(this.currentImageSize);
                  this.outer
                    .find(".lg-current .lg-dummy-img")
                    .first()
                    .attr("style", s);
                }
                this.LGel.trigger(Ee);
              }
            }),
            (e.prototype.resizeVideoSlide = function (e, t) {
              var i = this.getVideoContStyle(t);
              this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
            }),
            (e.prototype.updateSlides = function (e, t) {
              if (
                (this.index > e.length - 1 && (this.index = e.length - 1),
                1 === e.length && (this.index = 0),
                e.length)
              ) {
                var i = this.galleryItems[t].src;
                (this.galleryItems = e),
                  this.updateControls(),
                  this.$inner.empty(),
                  (this.currentItemsInDom = []);
                var n = 0;
                this.galleryItems.some(function (e, t) {
                  return e.src === i && ((n = t), !0);
                }),
                  (this.currentItemsInDom = this.organizeSlideItems(n, -1)),
                  this.loadContent(n, !0),
                  this.getSlideItem(n).addClass("lg-current"),
                  (this.index = n),
                  this.updateCurrentCounter(n),
                  this.LGel.trigger(Oe);
              } else this.closeGallery();
            }),
            (e.prototype.getItems = function () {
              if (((this.items = []), this.settings.dynamic))
                return this.settings.dynamicEl || [];
              if ("this" === this.settings.selector) this.items.push(this.el);
              else if (this.settings.selector)
                if ("string" == typeof this.settings.selector)
                  if (this.settings.selectWithin) {
                    var e = Ve(this.settings.selectWithin);
                    this.items = e.find(this.settings.selector).get();
                  } else
                    this.items = this.el.querySelectorAll(
                      this.settings.selector
                    );
                else this.items = this.settings.selector;
              else this.items = this.el.children;
              return et(
                this.items,
                this.settings.extraProps,
                this.settings.getCaptionFromTitleOrAlt,
                this.settings.exThumbImage
              );
            }),
            (e.prototype.openGallery = function (e, t) {
              var i = this;
              if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
                (this.lgOpened = !0),
                  this.outer.get().focus(),
                  this.outer.removeClass("lg-hide-items"),
                  this.$container.addClass("lg-show");
                var n = this.getItemsToBeInsertedToDom(e, e);
                this.currentItemsInDom = n;
                var s = "";
                n.forEach(function (e) {
                  s = s + '<div id="' + e + '" class="lg-item"></div>';
                }),
                  this.$inner.append(s),
                  this.addHtml(e);
                var r = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var o = this.mediaContainerPosition,
                  a = o.top,
                  l = o.bottom;
                this.settings.allowMediaOverlap ||
                  this.setMediaContainerPosition(a, l);
                var d = this.galleryItems[e].__slideVideoInfo;
                this.zoomFromOrigin &&
                  t &&
                  ((this.currentImageSize = Ye(
                    t,
                    this.outer,
                    a + l,
                    d && this.settings.videoMaxSize
                  )),
                  (r = Xe(t, this.outer, a, l, this.currentImageSize))),
                  (this.zoomFromOrigin && r) ||
                    (this.outer.addClass(this.settings.startClass),
                    this.getSlideItem(e).removeClass("lg-complete"));
                var c = this.settings.zoomFromOrigin
                  ? 100
                  : this.settings.backdropDuration;
                setTimeout(function () {
                  i.outer.addClass("lg-components-open");
                }, c),
                  (this.index = e),
                  this.LGel.trigger(Ae),
                  this.getSlideItem(e).addClass("lg-current"),
                  (this.lGalleryOn = !1),
                  (this.prevScrollTop = Ve(window).scrollTop()),
                  setTimeout(function () {
                    if (i.zoomFromOrigin && r) {
                      var t = i.getSlideItem(e);
                      t.css("transform", r),
                        setTimeout(function () {
                          t
                            .addClass("lg-start-progress lg-start-end-progress")
                            .css(
                              "transition-duration",
                              i.settings.startAnimationDuration + "ms"
                            ),
                            i.outer.addClass("lg-zoom-from-image");
                        }),
                        setTimeout(function () {
                          t.css("transform", "translate3d(0, 0, 0)");
                        }, 100);
                    }
                    setTimeout(function () {
                      i.$backdrop.addClass("in"),
                        i.$container.addClass("lg-show-in");
                    }, 10),
                      (i.zoomFromOrigin && r) ||
                        setTimeout(function () {
                          i.outer.addClass("lg-visible");
                        }, i.settings.backdropDuration),
                      i.slide(e, !1, !1, !1),
                      i.LGel.trigger(Me);
                  }),
                  document.body === this.settings.container &&
                    Ve("html").addClass("lg-on");
              }
            }),
            (e.prototype.getMediaContainerPosition = function () {
              if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
              var e = this.$toolbar.get().clientHeight || 0,
                t = this.outer.find(".lg-components .lg-sub-html").get(),
                i =
                  this.settings.defaultCaptionHeight ||
                  (t && t.clientHeight) ||
                  0,
                n = this.outer.find(".lg-thumb-outer").get();
              return { top: e, bottom: (n ? n.clientHeight : 0) + i };
            }),
            (e.prototype.setMediaContainerPosition = function (e, t) {
              void 0 === e && (e = 0),
                void 0 === t && (t = 0),
                this.$content.css("top", e + "px").css("bottom", t + "px");
            }),
            (e.prototype.hideBars = function () {
              var e = this;
              setTimeout(function () {
                e.outer.removeClass("lg-hide-items"),
                  e.settings.hideBarsDelay > 0 &&
                    (e.outer.on(
                      "mousemove.lg click.lg touchstart.lg",
                      function () {
                        e.outer.removeClass("lg-hide-items"),
                          clearTimeout(e.hideBarTimeout),
                          (e.hideBarTimeout = setTimeout(function () {
                            e.outer.addClass("lg-hide-items");
                          }, e.settings.hideBarsDelay));
                      }
                    ),
                    e.outer.trigger("mousemove.lg"));
              }, this.settings.showBarsAfter);
            }),
            (e.prototype.initPictureFill = function (e) {
              if (this.settings.supportLegacyBrowser)
                try {
                  picturefill({ elements: [e.get()] });
                } catch (e) {
                  console.warn(
                    "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                  );
                }
            }),
            (e.prototype.counter = function () {
              if (this.settings.counter) {
                var e =
                  '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                  this.getIdName("lg-counter-current") +
                  '" class="lg-counter-current">' +
                  (this.index + 1) +
                  ' </span> /\n                <span id="' +
                  this.getIdName("lg-counter-all") +
                  '" class="lg-counter-all">' +
                  this.galleryItems.length +
                  " </span></div>";
                this.outer.find(this.settings.appendCounterTo).append(e);
              }
            }),
            (e.prototype.addHtml = function (e) {
              var t, i;
              if (
                (this.galleryItems[e].subHtmlUrl
                  ? (i = this.galleryItems[e].subHtmlUrl)
                  : (t = this.galleryItems[e].subHtml),
                !i)
              )
                if (t) {
                  var n = t.substring(0, 1);
                  ("." !== n && "#" !== n) ||
                    (t =
                      this.settings.subHtmlSelectorRelative &&
                      !this.settings.dynamic
                        ? Ve(this.items).eq(e).find(t).first().html()
                        : Ve(t).first().html());
                } else t = "";
              if (".lg-item" !== this.settings.appendSubHtmlTo)
                i
                  ? this.outer.find(".lg-sub-html").load(i)
                  : this.outer.find(".lg-sub-html").html(t);
              else {
                var s = Ve(this.getSlideItemId(e));
                i
                  ? s.load(i)
                  : s.append('<div class="lg-sub-html">' + t + "</div>");
              }
              null != t &&
                ("" === t
                  ? this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .addClass("lg-empty-html")
                  : this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .removeClass("lg-empty-html")),
                this.LGel.trigger(ke, { index: e });
            }),
            (e.prototype.preload = function (e) {
              for (
                var t = 1;
                t <= this.settings.preload &&
                !(t >= this.galleryItems.length - e);
                t++
              )
                this.loadContent(e + t, !1);
              for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
                this.loadContent(e - i, !1);
            }),
            (e.prototype.getDummyImgStyles = function (e) {
              return e
                ? "width:" +
                    e.width +
                    "px;\n                margin-left: -" +
                    e.width / 2 +
                    "px;\n                margin-top: -" +
                    e.height / 2 +
                    "px;\n                height:" +
                    e.height +
                    "px"
                : "";
            }),
            (e.prototype.getVideoContStyle = function (e) {
              return e
                ? "width:" +
                    e.width +
                    "px;\n                height:" +
                    e.height +
                    "px"
                : "";
            }),
            (e.prototype.getDummyImageContent = function (e, t, i) {
              var n;
              if ((this.settings.dynamic || (n = Ve(this.items).eq(t)), n)) {
                var s = void 0;
                if (
                  !(s = this.settings.exThumbImage
                    ? n.attr(this.settings.exThumbImage)
                    : n.find("img").first().attr("src"))
                )
                  return "";
                var r =
                  "<img " +
                  i +
                  ' style="' +
                  this.getDummyImgStyles(this.currentImageSize) +
                  '" class="lg-dummy-img" src="' +
                  s +
                  '" />';
                return (
                  e.addClass("lg-first-slide"),
                  this.outer.addClass("lg-first-slide-loading"),
                  r
                );
              }
              return "";
            }),
            (e.prototype.setImgMarkup = function (e, t, i) {
              var n = this.galleryItems[i],
                s = n.alt,
                r = n.srcset,
                o = n.sizes,
                a = n.sources,
                l = s ? 'alt="' + s + '"' : "",
                d =
                  '<picture class="lg-img-wrap"> ' +
                  (this.isFirstSlideWithZoomAnimation()
                    ? this.getDummyImageContent(t, i, l)
                    : Qe(i, e, l, r, o, a)) +
                  "</picture>";
              t.prepend(d);
            }),
            (e.prototype.onSlideObjectLoad = function (e, t, i, n) {
              var s = e.find(".lg-object").first();
              Ze(s.get()) || t
                ? i()
                : (s.on("load.lg error.lg", function () {
                    i && i();
                  }),
                  s.on("error.lg", function () {
                    n && n();
                  }));
            }),
            (e.prototype.onLgObjectLoad = function (e, t, i, n, s, r) {
              var o = this;
              this.onSlideObjectLoad(
                e,
                r,
                function () {
                  o.triggerSlideItemLoad(e, t, i, n, s);
                },
                function () {
                  e.addClass("lg-complete lg-complete_"),
                    e.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                }
              );
            }),
            (e.prototype.triggerSlideItemLoad = function (e, t, i, n, s) {
              var r = this,
                o = this.galleryItems[t],
                a = s && "video" === this.getSlideType(o) && !o.poster ? n : 0;
              setTimeout(function () {
                e.addClass("lg-complete lg-complete_"),
                  r.LGel.trigger(Ie, {
                    index: t,
                    delay: i || 0,
                    isFirstSlide: s,
                  });
              }, a);
            }),
            (e.prototype.isFirstSlideWithZoomAnimation = function () {
              return !(
                this.lGalleryOn ||
                !this.zoomFromOrigin ||
                !this.currentImageSize
              );
            }),
            (e.prototype.addSlideVideoInfo = function (e) {
              var t = this;
              e.forEach(function (e, i) {
                (e.__slideVideoInfo = it(e.src, !!e.video, i)),
                  e.__slideVideoInfo &&
                    t.settings.loadYouTubePoster &&
                    !e.poster &&
                    e.__slideVideoInfo.youtube &&
                    (e.poster =
                      "//img.youtube.com/vi/" +
                      e.__slideVideoInfo.youtube[1] +
                      "/maxresdefault.jpg");
              });
            }),
            (e.prototype.loadContent = function (e, t) {
              var i = this,
                n = this.galleryItems[e],
                s = Ve(this.getSlideItemId(e)),
                r = n.poster,
                o = n.srcset,
                a = n.sizes,
                l = n.sources,
                d = n.src,
                c = n.video,
                u = c && "string" == typeof c ? JSON.parse(c) : c;
              if (n.responsive) {
                var p = n.responsive.split(",");
                d = Ke(p) || d;
              }
              var h = n.__slideVideoInfo,
                f = "",
                g = !!n.iframe,
                m = !this.lGalleryOn,
                v = 0;
              if (
                (m &&
                  (v =
                    this.zoomFromOrigin && this.currentImageSize
                      ? this.settings.startAnimationDuration + 10
                      : this.settings.backdropDuration + 10),
                !s.hasClass("lg-loaded"))
              ) {
                if (h) {
                  var y = this.mediaContainerPosition,
                    b = y.top,
                    _ = y.bottom,
                    w = Ye(
                      this.items[e],
                      this.outer,
                      b + _,
                      h && this.settings.videoMaxSize
                    );
                  f = this.getVideoContStyle(w);
                }
                if (g) {
                  var T = Ue(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    d,
                    n.iframeTitle
                  );
                  s.prepend(T);
                } else if (r) {
                  var x = "";
                  m &&
                    this.zoomFromOrigin &&
                    this.currentImageSize &&
                    (x = this.getDummyImageContent(s, e, ""));
                  T = Je(r, x || "", f, this.settings.strings.playVideo, h);
                  s.prepend(T);
                } else if (h) {
                  T = '<div class="lg-video-cont " style="' + f + '"></div>';
                  s.prepend(T);
                } else if ((this.setImgMarkup(d, s, e), o || l)) {
                  var C = s.find(".lg-object");
                  this.initPictureFill(C);
                }
                (r || h) &&
                  this.LGel.trigger(Se, {
                    index: e,
                    src: d,
                    html5Video: u,
                    hasPoster: !!r,
                  }),
                  this.LGel.trigger(xe, { index: e }),
                  this.lGalleryOn &&
                    ".lg-item" === this.settings.appendSubHtmlTo &&
                    this.addHtml(e);
              }
              var S = 0;
              v && !Ve(document.body).hasClass("lg-from-hash") && (S = v),
                this.isFirstSlideWithZoomAnimation() &&
                  (setTimeout(function () {
                    s.removeClass(
                      "lg-start-end-progress lg-start-progress"
                    ).removeAttr("style");
                  }, this.settings.startAnimationDuration + 100),
                  s.hasClass("lg-loaded") ||
                    setTimeout(function () {
                      if (
                        "image" === i.getSlideType(n) &&
                        (s
                          .find(".lg-img-wrap")
                          .append(Qe(e, d, "", o, a, n.sources)),
                        o || l)
                      ) {
                        var t = s.find(".lg-object");
                        i.initPictureFill(t);
                      }
                      ("image" === i.getSlideType(n) ||
                        ("video" === i.getSlideType(n) && r)) &&
                        (i.onLgObjectLoad(s, e, v, S, !0, !1),
                        i.onSlideObjectLoad(
                          s,
                          !(!h || !h.html5 || r),
                          function () {
                            i.loadContentOnFirstSlideLoad(e, s, S);
                          },
                          function () {
                            i.loadContentOnFirstSlideLoad(e, s, S);
                          }
                        ));
                    }, this.settings.startAnimationDuration + 100)),
                s.addClass("lg-loaded"),
                (this.isFirstSlideWithZoomAnimation() &&
                  ("video" !== this.getSlideType(n) || r)) ||
                  this.onLgObjectLoad(s, e, v, S, m, !(!h || !h.html5 || r)),
                (this.zoomFromOrigin && this.currentImageSize) ||
                  !s.hasClass("lg-complete_") ||
                  this.lGalleryOn ||
                  setTimeout(function () {
                    s.addClass("lg-complete");
                  }, this.settings.backdropDuration),
                (this.lGalleryOn = !0),
                !0 === t &&
                  (s.hasClass("lg-complete_")
                    ? this.preload(e)
                    : s
                        .find(".lg-object")
                        .first()
                        .on("load.lg error.lg", function () {
                          i.preload(e);
                        }));
            }),
            (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
              var n = this;
              setTimeout(function () {
                t.find(".lg-dummy-img").remove(),
                  t.removeClass("lg-first-slide"),
                  n.outer.removeClass("lg-first-slide-loading"),
                  (n.isDummyImageRemoved = !0),
                  n.preload(e);
              }, i + 300);
            }),
            (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
              var n = this;
              void 0 === i && (i = 0);
              var s = [],
                r = Math.max(i, 3);
              r = Math.min(r, this.galleryItems.length);
              var o = "lg-item-" + this.lgId + "-" + t;
              if (this.galleryItems.length <= 3)
                return (
                  this.galleryItems.forEach(function (e, t) {
                    s.push("lg-item-" + n.lgId + "-" + t);
                  }),
                  s
                );
              if (e < (this.galleryItems.length - 1) / 2) {
                for (var a = e; a > e - r / 2 && a >= 0; a--)
                  s.push("lg-item-" + this.lgId + "-" + a);
                var l = s.length;
                for (a = 0; a < r - l; a++)
                  s.push("lg-item-" + this.lgId + "-" + (e + a + 1));
              } else {
                for (
                  a = e;
                  a <= this.galleryItems.length - 1 && a < e + r / 2;
                  a++
                )
                  s.push("lg-item-" + this.lgId + "-" + a);
                for (l = s.length, a = 0; a < r - l; a++)
                  s.push("lg-item-" + this.lgId + "-" + (e - a - 1));
              }
              return (
                this.settings.loop &&
                  (e === this.galleryItems.length - 1
                    ? s.push("lg-item-" + this.lgId + "-0")
                    : 0 === e &&
                      s.push(
                        "lg-item-" +
                          this.lgId +
                          "-" +
                          (this.galleryItems.length - 1)
                      )),
                -1 === s.indexOf(o) && s.push("lg-item-" + this.lgId + "-" + t),
                s
              );
            }),
            (e.prototype.organizeSlideItems = function (e, t) {
              var i = this,
                n = this.getItemsToBeInsertedToDom(
                  e,
                  t,
                  this.settings.numberOfSlideItemsInDom
                );
              return (
                n.forEach(function (e) {
                  -1 === i.currentItemsInDom.indexOf(e) &&
                    i.$inner.append(
                      '<div id="' + e + '" class="lg-item"></div>'
                    );
                }),
                this.currentItemsInDom.forEach(function (e) {
                  -1 === n.indexOf(e) && Ve("#" + e).remove();
                }),
                n
              );
            }),
            (e.prototype.getPreviousSlideIndex = function () {
              var e = 0;
              try {
                var t = this.outer.find(".lg-current").first().attr("id");
                e = parseInt(t.split("-")[3]) || 0;
              } catch (t) {
                e = 0;
              }
              return e;
            }),
            (e.prototype.setDownloadValue = function (e) {
              if (this.settings.download) {
                var t = this.galleryItems[e];
                if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                  this.outer.addClass("lg-hide-download");
                else {
                  var i = this.getElementById("lg-download");
                  this.outer.removeClass("lg-hide-download"),
                    i.attr("href", t.downloadUrl || t.src),
                    t.download && i.attr("download", t.download);
                }
              }
            }),
            (e.prototype.makeSlideAnimation = function (e, t, i) {
              var n = this;
              this.lGalleryOn && i.addClass("lg-slide-progress"),
                setTimeout(
                  function () {
                    n.outer.addClass("lg-no-trans"),
                      n.outer
                        .find(".lg-item")
                        .removeClass("lg-prev-slide lg-next-slide"),
                      "prev" === e
                        ? (t.addClass("lg-prev-slide"),
                          i.addClass("lg-next-slide"))
                        : (t.addClass("lg-next-slide"),
                          i.addClass("lg-prev-slide")),
                      setTimeout(function () {
                        n.outer.find(".lg-item").removeClass("lg-current"),
                          t.addClass("lg-current"),
                          n.outer.removeClass("lg-no-trans");
                      }, 50);
                  },
                  this.lGalleryOn ? this.settings.slideDelay : 0
                );
            }),
            (e.prototype.slide = function (e, t, i, n) {
              var s = this,
                r = this.getPreviousSlideIndex();
              if (
                ((this.currentItemsInDom = this.organizeSlideItems(e, r)),
                !this.lGalleryOn || r !== e)
              ) {
                var o = this.galleryItems.length;
                if (!this.lgBusy) {
                  this.settings.counter && this.updateCurrentCounter(e);
                  var a = this.getSlideItem(e),
                    l = this.getSlideItem(r),
                    d = this.galleryItems[e],
                    c = d.__slideVideoInfo;
                  if (
                    (this.outer.attr(
                      "data-lg-slide-type",
                      this.getSlideType(d)
                    ),
                    this.setDownloadValue(e),
                    c)
                  ) {
                    var u = this.mediaContainerPosition,
                      p = u.top,
                      h = u.bottom,
                      f = Ye(
                        this.items[e],
                        this.outer,
                        p + h,
                        c && this.settings.videoMaxSize
                      );
                    this.resizeVideoSlide(e, f);
                  }
                  if (
                    (this.LGel.trigger(Le, {
                      prevIndex: r,
                      index: e,
                      fromTouch: !!t,
                      fromThumb: !!i,
                    }),
                    (this.lgBusy = !0),
                    clearTimeout(this.hideBarTimeout),
                    this.arrowDisable(e),
                    n || (e < r ? (n = "prev") : e > r && (n = "next")),
                    t)
                  ) {
                    this.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-current lg-next-slide");
                    var g = void 0,
                      m = void 0;
                    o > 2
                      ? ((g = e - 1),
                        (m = e + 1),
                        ((0 === e && r === o - 1) ||
                          (e === o - 1 && 0 === r)) &&
                          ((m = 0), (g = o - 1)))
                      : ((g = 0), (m = 1)),
                      "prev" === n
                        ? this.getSlideItem(m).addClass("lg-next-slide")
                        : this.getSlideItem(g).addClass("lg-prev-slide"),
                      a.addClass("lg-current");
                  } else this.makeSlideAnimation(n, a, l);
                  this.lGalleryOn
                    ? setTimeout(function () {
                        s.loadContent(e, !0),
                          ".lg-item" !== s.settings.appendSubHtmlTo &&
                            s.addHtml(e);
                      }, this.settings.speed +
                        50 +
                        (t ? 0 : this.settings.slideDelay))
                    : this.loadContent(e, !0),
                    setTimeout(function () {
                      (s.lgBusy = !1),
                        l.removeClass("lg-slide-progress"),
                        s.LGel.trigger(Pe, {
                          prevIndex: r,
                          index: e,
                          fromTouch: t,
                          fromThumb: i,
                        });
                    }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                      (t ? 0 : this.settings.slideDelay));
                }
                this.index = e;
              }
            }),
            (e.prototype.updateCurrentCounter = function (e) {
              this.getElementById("lg-counter-current").html(e + 1 + "");
            }),
            (e.prototype.updateCounterTotal = function () {
              this.getElementById("lg-counter-all").html(
                this.galleryItems.length + ""
              );
            }),
            (e.prototype.getSlideType = function (e) {
              return e.__slideVideoInfo
                ? "video"
                : e.iframe
                ? "iframe"
                : "image";
            }),
            (e.prototype.touchMove = function (e, t, i) {
              var n = t.pageX - e.pageX,
                s = t.pageY - e.pageY,
                r = !1;
              if (
                (this.swipeDirection
                  ? (r = !0)
                  : Math.abs(n) > 15
                  ? ((this.swipeDirection = "horizontal"), (r = !0))
                  : Math.abs(s) > 15 &&
                    ((this.swipeDirection = "vertical"), (r = !0)),
                r)
              ) {
                var o = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                  null == i || i.preventDefault(),
                    this.outer.addClass("lg-dragging"),
                    this.setTranslate(o, n, 0);
                  var a = o.get().offsetWidth,
                    l = (15 * a) / 100 - Math.abs((10 * n) / 100);
                  this.setTranslate(
                    this.outer.find(".lg-prev-slide").first(),
                    -a + n - l,
                    0
                  ),
                    this.setTranslate(
                      this.outer.find(".lg-next-slide").first(),
                      a + n + l,
                      0
                    );
                } else if (
                  "vertical" === this.swipeDirection &&
                  this.settings.swipeToClose
                ) {
                  null == i || i.preventDefault(),
                    this.$container.addClass("lg-dragging-vertical");
                  var d = 1 - Math.abs(s) / window.innerHeight;
                  this.$backdrop.css("opacity", d);
                  var c = 1 - Math.abs(s) / (2 * window.innerWidth);
                  this.setTranslate(o, 0, s, c, c),
                    Math.abs(s) > 100 &&
                      this.outer
                        .addClass("lg-hide-items")
                        .removeClass("lg-components-open");
                }
              }
            }),
            (e.prototype.touchEnd = function (e, t, i) {
              var n,
                s = this;
              "lg-slide" !== this.settings.mode &&
                this.outer.addClass("lg-slide"),
                setTimeout(function () {
                  s.$container.removeClass("lg-dragging-vertical"),
                    s.outer
                      .removeClass("lg-dragging lg-hide-items")
                      .addClass("lg-components-open");
                  var r = !0;
                  if ("horizontal" === s.swipeDirection) {
                    n = e.pageX - t.pageX;
                    var o = Math.abs(e.pageX - t.pageX);
                    n < 0 && o > s.settings.swipeThreshold
                      ? (s.goToNextSlide(!0), (r = !1))
                      : n > 0 &&
                        o > s.settings.swipeThreshold &&
                        (s.goToPrevSlide(!0), (r = !1));
                  } else if ("vertical" === s.swipeDirection) {
                    if (
                      ((n = Math.abs(e.pageY - t.pageY)),
                      s.settings.closable && s.settings.swipeToClose && n > 100)
                    )
                      return void s.closeGallery();
                    s.$backdrop.css("opacity", 1);
                  }
                  if (
                    (s.outer.find(".lg-item").removeAttr("style"),
                    r && Math.abs(e.pageX - t.pageX) < 5)
                  ) {
                    var a = Ve(i.target);
                    s.isPosterElement(a) && s.LGel.trigger(De);
                  }
                  s.swipeDirection = void 0;
                }),
                setTimeout(function () {
                  s.outer.hasClass("lg-dragging") ||
                    "lg-slide" === s.settings.mode ||
                    s.outer.removeClass("lg-slide");
                }, this.settings.speed + 100);
            }),
            (e.prototype.enableSwipe = function () {
              var e = this,
                t = {},
                i = {},
                n = !1,
                s = !1;
              this.settings.enableSwipe &&
                (this.$inner.on("touchstart.lg", function (i) {
                  e.dragOrSwipeEnabled = !0;
                  var n = e.getSlideItem(e.index);
                  (!Ve(i.target).hasClass("lg-item") &&
                    !n.get().contains(i.target)) ||
                    e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    1 !== i.targetTouches.length ||
                    ((s = !0),
                    (e.touchAction = "swipe"),
                    e.manageSwipeClass(),
                    (t = {
                      pageX: i.targetTouches[0].pageX,
                      pageY: i.targetTouches[0].pageY,
                    }));
                }),
                this.$inner.on("touchmove.lg", function (r) {
                  s &&
                    "swipe" === e.touchAction &&
                    1 === r.targetTouches.length &&
                    ((i = {
                      pageX: r.targetTouches[0].pageX,
                      pageY: r.targetTouches[0].pageY,
                    }),
                    e.touchMove(t, i, r),
                    (n = !0));
                }),
                this.$inner.on("touchend.lg", function (r) {
                  if ("swipe" === e.touchAction) {
                    if (n) (n = !1), e.touchEnd(i, t, r);
                    else if (s) {
                      var o = Ve(r.target);
                      e.isPosterElement(o) && e.LGel.trigger(De);
                    }
                    (e.touchAction = void 0), (s = !1);
                  }
                }));
            }),
            (e.prototype.enableDrag = function () {
              var e = this,
                t = {},
                i = {},
                n = !1,
                s = !1;
              this.settings.enableDrag &&
                (this.outer.on("mousedown.lg", function (i) {
                  e.dragOrSwipeEnabled = !0;
                  var s = e.getSlideItem(e.index);
                  (Ve(i.target).hasClass("lg-item") ||
                    s.get().contains(i.target)) &&
                    (e.outer.hasClass("lg-zoomed") ||
                      e.lgBusy ||
                      (i.preventDefault(),
                      e.lgBusy ||
                        (e.manageSwipeClass(),
                        (t = { pageX: i.pageX, pageY: i.pageY }),
                        (n = !0),
                        (e.outer.get().scrollLeft += 1),
                        (e.outer.get().scrollLeft -= 1),
                        e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                        e.LGel.trigger(ze))));
                }),
                Ve(window).on("mousemove.lg.global" + this.lgId, function (r) {
                  n &&
                    e.lgOpened &&
                    ((s = !0),
                    (i = { pageX: r.pageX, pageY: r.pageY }),
                    e.touchMove(t, i),
                    e.LGel.trigger($e));
                }),
                Ve(window).on("mouseup.lg.global" + this.lgId, function (r) {
                  if (e.lgOpened) {
                    var o = Ve(r.target);
                    s
                      ? ((s = !1), e.touchEnd(i, t, r), e.LGel.trigger(Be))
                      : e.isPosterElement(o) && e.LGel.trigger(De),
                      n &&
                        ((n = !1),
                        e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                  }
                }));
            }),
            (e.prototype.triggerPosterClick = function () {
              var e = this;
              this.$inner.on("click.lg", function (t) {
                !e.dragOrSwipeEnabled &&
                  e.isPosterElement(Ve(t.target)) &&
                  e.LGel.trigger(De);
              });
            }),
            (e.prototype.manageSwipeClass = function () {
              var e = this.index + 1,
                t = this.index - 1;
              this.settings.loop &&
                this.galleryItems.length > 2 &&
                (0 === this.index
                  ? (t = this.galleryItems.length - 1)
                  : this.index === this.galleryItems.length - 1 && (e = 0)),
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-next-slide lg-prev-slide"),
                t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
                this.getSlideItem(e).addClass("lg-next-slide");
            }),
            (e.prototype.goToNextSlide = function (e) {
              var t = this,
                i = this.settings.loop;
              e && this.galleryItems.length < 3 && (i = !1),
                this.lgBusy ||
                  (this.index + 1 < this.galleryItems.length
                    ? (this.index++,
                      this.LGel.trigger(Fe, { index: this.index }),
                      this.slide(this.index, !!e, !1, "next"))
                    : i
                    ? ((this.index = 0),
                      this.LGel.trigger(Fe, { index: this.index }),
                      this.slide(this.index, !!e, !1, "next"))
                    : this.settings.slideEndAnimation &&
                      !e &&
                      (this.outer.addClass("lg-right-end"),
                      setTimeout(function () {
                        t.outer.removeClass("lg-right-end");
                      }, 400)));
            }),
            (e.prototype.goToPrevSlide = function (e) {
              var t = this,
                i = this.settings.loop;
              e && this.galleryItems.length < 3 && (i = !1),
                this.lgBusy ||
                  (this.index > 0
                    ? (this.index--,
                      this.LGel.trigger(Ne, {
                        index: this.index,
                        fromTouch: e,
                      }),
                      this.slide(this.index, !!e, !1, "prev"))
                    : i
                    ? ((this.index = this.galleryItems.length - 1),
                      this.LGel.trigger(Ne, {
                        index: this.index,
                        fromTouch: e,
                      }),
                      this.slide(this.index, !!e, !1, "prev"))
                    : this.settings.slideEndAnimation &&
                      !e &&
                      (this.outer.addClass("lg-left-end"),
                      setTimeout(function () {
                        t.outer.removeClass("lg-left-end");
                      }, 400)));
            }),
            (e.prototype.keyPress = function () {
              var e = this;
              Ve(window).on("keydown.lg.global" + this.lgId, function (t) {
                e.lgOpened &&
                  !0 === e.settings.escKey &&
                  27 === t.keyCode &&
                  (t.preventDefault(),
                  e.settings.allowMediaOverlap &&
                  e.outer.hasClass("lg-can-toggle") &&
                  e.outer.hasClass("lg-components-open")
                    ? e.outer.removeClass("lg-components-open")
                    : e.closeGallery()),
                  e.lgOpened &&
                    e.galleryItems.length > 1 &&
                    (37 === t.keyCode &&
                      (t.preventDefault(), e.goToPrevSlide()),
                    39 === t.keyCode &&
                      (t.preventDefault(), e.goToNextSlide()));
              });
            }),
            (e.prototype.arrow = function () {
              var e = this;
              this.getElementById("lg-prev").on("click.lg", function () {
                e.goToPrevSlide();
              }),
                this.getElementById("lg-next").on("click.lg", function () {
                  e.goToNextSlide();
                });
            }),
            (e.prototype.arrowDisable = function (e) {
              if (!this.settings.loop && this.settings.hideControlOnEnd) {
                var t = this.getElementById("lg-prev"),
                  i = this.getElementById("lg-next");
                e + 1 === this.galleryItems.length
                  ? i.attr("disabled", "disabled").addClass("disabled")
                  : i.removeAttr("disabled").removeClass("disabled"),
                  0 === e
                    ? t.attr("disabled", "disabled").addClass("disabled")
                    : t.removeAttr("disabled").removeClass("disabled");
              }
            }),
            (e.prototype.setTranslate = function (e, t, i, n, s) {
              void 0 === n && (n = 1),
                void 0 === s && (s = 1),
                e.css(
                  "transform",
                  "translate3d(" +
                    t +
                    "px, " +
                    i +
                    "px, 0px) scale3d(" +
                    n +
                    ", " +
                    s +
                    ", 1)"
                );
            }),
            (e.prototype.mousewheel = function () {
              var e = this,
                t = 0;
              this.outer.on("wheel.lg", function (i) {
                if (i.deltaY && !(e.galleryItems.length < 2)) {
                  i.preventDefault();
                  var n = new Date().getTime();
                  n - t < 1e3 ||
                    ((t = n),
                    i.deltaY > 0
                      ? e.goToNextSlide()
                      : i.deltaY < 0 && e.goToPrevSlide());
                }
              });
            }),
            (e.prototype.isSlideElement = function (e) {
              return (
                e.hasClass("lg-outer") ||
                e.hasClass("lg-item") ||
                e.hasClass("lg-img-wrap")
              );
            }),
            (e.prototype.isPosterElement = function (e) {
              var t = this.getSlideItem(this.index)
                .find(".lg-video-play-button")
                .get();
              return (
                e.hasClass("lg-video-poster") ||
                e.hasClass("lg-video-play-button") ||
                (t && t.contains(e.get()))
              );
            }),
            (e.prototype.toggleMaximize = function () {
              var e = this;
              this.getElementById("lg-maximize").on("click.lg", function () {
                e.$container.toggleClass("lg-inline"), e.refreshOnResize();
              });
            }),
            (e.prototype.invalidateItems = function () {
              for (var e = 0; e < this.items.length; e++) {
                var t = Ve(this.items[e]);
                t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
              }
            }),
            (e.prototype.manageCloseGallery = function () {
              var e = this;
              if (this.settings.closable) {
                var t = !1;
                this.getElementById("lg-close").on("click.lg", function () {
                  e.closeGallery();
                }),
                  this.settings.closeOnTap &&
                    (this.outer.on("mousedown.lg", function (i) {
                      var n = Ve(i.target);
                      t = !!e.isSlideElement(n);
                    }),
                    this.outer.on("mousemove.lg", function () {
                      t = !1;
                    }),
                    this.outer.on("mouseup.lg", function (i) {
                      var n = Ve(i.target);
                      e.isSlideElement(n) &&
                        t &&
                        (e.outer.hasClass("lg-dragging") || e.closeGallery());
                    }));
              }
            }),
            (e.prototype.closeGallery = function (e) {
              var t = this;
              if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
              this.LGel.trigger(Ge), Ve(window).scrollTop(this.prevScrollTop);
              var i,
                n = this.items[this.index];
              if (this.zoomFromOrigin && n) {
                var s = this.mediaContainerPosition,
                  r = s.top,
                  o = s.bottom,
                  a = this.galleryItems[this.index],
                  l = a.__slideVideoInfo,
                  d = a.poster,
                  c = Ye(
                    n,
                    this.outer,
                    r + o,
                    l && d && this.settings.videoMaxSize
                  );
                i = Xe(n, this.outer, r, o, c);
              }
              this.zoomFromOrigin && i
                ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                  this.getSlideItem(this.index)
                    .addClass("lg-start-end-progress")
                    .css(
                      "transition-duration",
                      this.settings.startAnimationDuration + "ms"
                    )
                    .css("transform", i))
                : (this.outer.addClass("lg-hide-items"),
                  this.outer.removeClass("lg-zoom-from-image")),
                this.destroyModules(),
                (this.lGalleryOn = !1),
                (this.isDummyImageRemoved = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                clearTimeout(this.hideBarTimeout),
                (this.hideBarTimeout = !1),
                Ve("html").removeClass("lg-on"),
                this.outer.removeClass("lg-visible lg-components-open"),
                this.$backdrop.removeClass("in").css("opacity", 0);
              var u =
                this.zoomFromOrigin && i
                  ? Math.max(
                      this.settings.startAnimationDuration,
                      this.settings.backdropDuration
                    )
                  : this.settings.backdropDuration;
              return (
                this.$container.removeClass("lg-show-in"),
                setTimeout(function () {
                  t.zoomFromOrigin &&
                    i &&
                    t.outer.removeClass("lg-zoom-from-image"),
                    t.$container.removeClass("lg-show"),
                    t.$backdrop
                      .removeAttr("style")
                      .css(
                        "transition-duration",
                        t.settings.backdropDuration + "ms"
                      ),
                    t.outer.removeClass("lg-closing " + t.settings.startClass),
                    t
                      .getSlideItem(t.index)
                      .removeClass("lg-start-end-progress"),
                    t.$inner.empty(),
                    t.lgOpened && t.LGel.trigger(Re, { instance: t }),
                    t.outer.get() && t.outer.get().blur(),
                    (t.lgOpened = !1);
                }, u + 100),
                u + 100
              );
            }),
            (e.prototype.initModules = function () {
              this.plugins.forEach(function (e) {
                try {
                  e.init();
                } catch (e) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly initiated"
                  );
                }
              });
            }),
            (e.prototype.destroyModules = function (e) {
              this.plugins.forEach(function (t) {
                try {
                  e ? t.destroy() : t.closeGallery && t.closeGallery();
                } catch (e) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly destroyed"
                  );
                }
              });
            }),
            (e.prototype.refresh = function (e) {
              this.settings.dynamic || this.invalidateItems(),
                (this.galleryItems = e || this.getItems()),
                this.updateControls(),
                this.openGalleryOnItemClick(),
                this.LGel.trigger(Oe);
            }),
            (e.prototype.updateControls = function () {
              this.addSlideVideoInfo(this.galleryItems),
                this.updateCounterTotal(),
                this.manageSingleSlideClassName();
            }),
            (e.prototype.destroy = function () {
              var e = this,
                t = this.closeGallery(!0);
              return (
                setTimeout(function () {
                  e.destroyModules(!0),
                    e.settings.dynamic || e.invalidateItems(),
                    Ve(window).off(".lg.global" + e.lgId),
                    e.LGel.off(".lg"),
                    e.$container.remove();
                }, t),
                t
              );
            }),
            e
          );
        })();
      const rt = function (e, t) {
          return new st(e, t);
        },
        ot = document.querySelectorAll("[data-gallery]");
      function at(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function lt(e, t) {
        (e.prototype = Object.create(t.prototype)),
          (e.prototype.constructor = e),
          (e.__proto__ = t);
      }
      ot.length &&
        ot.forEach((e) => {
          rt(e, {
            licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
            speed: 500,
          });
        });
      var dt,
        ct,
        ut,
        pt,
        ht,
        ft,
        gt,
        mt,
        vt,
        yt,
        bt,
        _t,
        wt,
        Tt = {
          autoSleep: 120,
          force3D: "auto",
          nullTargetWarn: 1,
          units: { lineHeight: "" },
        },
        xt = { duration: 0.5, overwrite: !1, delay: 0 },
        Ct = 1e8,
        St = 1e-8,
        Et = 2 * Math.PI,
        Ot = Et / 4,
        kt = 0,
        At = Math.sqrt,
        Mt = Math.cos,
        It = Math.sin,
        Lt = function (e) {
          return "string" == typeof e;
        },
        Pt = function (e) {
          return "function" == typeof e;
        },
        Dt = function (e) {
          return "number" == typeof e;
        },
        zt = function (e) {
          return void 0 === e;
        },
        $t = function (e) {
          return "object" == typeof e;
        },
        Bt = function (e) {
          return !1 !== e;
        },
        Ft = function () {
          return "undefined" != typeof window;
        },
        Nt = function (e) {
          return Pt(e) || Lt(e);
        },
        Gt =
          ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
          function () {},
        Rt = Array.isArray,
        Ht = /(?:-?\.?\d|\.)+/gi,
        qt = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        Vt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        jt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        Wt = /[+-]=-?[.\d]+/,
        Yt = /[^,'"\[\]\s]+/gi,
        Xt = /[\d.+\-=]+(?:e[-+]\d*)*/i,
        Ut = {},
        Qt = {},
        Kt = function (e) {
          return (Qt = Ti(e, Ut)) && us;
        },
        Zt = function (e, t) {
          return console.warn(
            "Invalid property",
            e,
            "set to",
            t,
            "Missing plugin? gsap.registerPlugin()"
          );
        },
        Jt = function (e, t) {
          return !t && console.warn(e);
        },
        ei = function (e, t) {
          return (e && (Ut[e] = t) && Qt && (Qt[e] = t)) || Ut;
        },
        ti = function () {
          return 0;
        },
        ii = {},
        ni = [],
        si = {},
        ri = {},
        oi = {},
        ai = 30,
        li = [],
        di = "",
        ci = function (e) {
          var t,
            i,
            n = e[0];
          if (($t(n) || Pt(n) || (e = [e]), !(t = (n._gsap || {}).harness))) {
            for (i = li.length; i-- && !li[i].targetTest(n); );
            t = li[i];
          }
          for (i = e.length; i--; )
            (e[i] && (e[i]._gsap || (e[i]._gsap = new zn(e[i], t)))) ||
              e.splice(i, 1);
          return e;
        },
        ui = function (e) {
          return e._gsap || ci(Ji(e))[0]._gsap;
        },
        pi = function (e, t, i) {
          return (i = e[t]) && Pt(i)
            ? e[t]()
            : (zt(i) && e.getAttribute && e.getAttribute(t)) || i;
        },
        hi = function (e, t) {
          return (e = e.split(",")).forEach(t) || e;
        },
        fi = function (e) {
          return Math.round(1e5 * e) / 1e5 || 0;
        },
        gi = function (e) {
          return Math.round(1e7 * e) / 1e7 || 0;
        },
        mi = function (e, t) {
          for (var i = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < i; );
          return n < i;
        },
        vi = function () {
          var e,
            t,
            i = ni.length,
            n = ni.slice(0);
          for (si = {}, ni.length = 0, e = 0; e < i; e++)
            (t = n[e]) &&
              t._lazy &&
              (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
        },
        yi = function (e, t, i, n) {
          ni.length && vi(), e.render(t, i, n), ni.length && vi();
        },
        bi = function (e) {
          var t = parseFloat(e);
          return (t || 0 === t) && (e + "").match(Yt).length < 2
            ? t
            : Lt(e)
            ? e.trim()
            : e;
        },
        _i = function (e) {
          return e;
        },
        wi = function (e, t) {
          for (var i in t) i in e || (e[i] = t[i]);
          return e;
        },
        Ti = function (e, t) {
          for (var i in t) e[i] = t[i];
          return e;
        },
        xi = function e(t, i) {
          for (var n in i)
            "__proto__" !== n &&
              "constructor" !== n &&
              "prototype" !== n &&
              (t[n] = $t(i[n]) ? e(t[n] || (t[n] = {}), i[n]) : i[n]);
          return t;
        },
        Ci = function (e, t) {
          var i,
            n = {};
          for (i in e) i in t || (n[i] = e[i]);
          return n;
        },
        Si = function (e) {
          var t,
            i = e.parent || ct,
            n = e.keyframes
              ? ((t = Rt(e.keyframes)),
                function (e, i) {
                  for (var n in i)
                    n in e ||
                      ("duration" === n && t) ||
                      "ease" === n ||
                      (e[n] = i[n]);
                })
              : wi;
          if (Bt(e.inherit))
            for (; i; ) n(e, i.vars.defaults), (i = i.parent || i._dp);
          return e;
        },
        Ei = function (e, t, i, n) {
          void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
          var s = t._prev,
            r = t._next;
          s ? (s._next = r) : e[i] === t && (e[i] = r),
            r ? (r._prev = s) : e[n] === t && (e[n] = s),
            (t._next = t._prev = t.parent = null);
        },
        Oi = function (e, t) {
          e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e),
            (e._act = 0);
        },
        ki = function (e, t) {
          if (e && (!t || t._end > e._dur || t._start < 0))
            for (var i = e; i; ) (i._dirty = 1), (i = i.parent);
          return e;
        },
        Ai = function (e) {
          for (var t = e.parent; t && t.parent; )
            (t._dirty = 1), t.totalDuration(), (t = t.parent);
          return e;
        },
        Mi = function e(t) {
          return !t || (t._ts && e(t.parent));
        },
        Ii = function (e) {
          return e._repeat
            ? Li(e._tTime, (e = e.duration() + e._rDelay)) * e
            : 0;
        },
        Li = function (e, t) {
          var i = Math.floor((e /= t));
          return e && i === e ? i - 1 : i;
        },
        Pi = function (e, t) {
          return (
            (e - t._start) * t._ts +
            (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
          );
        },
        Di = function (e) {
          return (e._end = gi(
            e._start + (e._tDur / Math.abs(e._ts || e._rts || St) || 0)
          ));
        },
        zi = function (e, t) {
          var i = e._dp;
          return (
            i &&
              i.smoothChildTiming &&
              e._ts &&
              ((e._start = gi(
                i._time -
                  (e._ts > 0
                    ? t / e._ts
                    : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
              )),
              Di(e),
              i._dirty || ki(i, e)),
            e
          );
        },
        $i = function (e, t) {
          var i;
          if (
            ((t._time || (t._initted && !t._dur)) &&
              ((i = Pi(e.rawTime(), t)),
              (!t._dur || Xi(0, t.totalDuration(), i) - t._tTime > St) &&
                t.render(i, !0)),
            ki(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
          ) {
            if (e._dur < e.duration())
              for (i = e; i._dp; )
                i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
            e._zTime = -1e-8;
          }
        },
        Bi = function (e, t, i, n) {
          return (
            t.parent && Oi(t),
            (t._start = gi(
              (Dt(i) ? i : i || e !== ct ? ji(e, i, t) : e._time) + t._delay
            )),
            (t._end = gi(
              t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
            )),
            (function (e, t, i, n, s) {
              void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
              var r,
                o = e[n];
              if (s) for (r = t[s]; o && o[s] > r; ) o = o._prev;
              o
                ? ((t._next = o._next), (o._next = t))
                : ((t._next = e[i]), (e[i] = t)),
                t._next ? (t._next._prev = t) : (e[n] = t),
                (t._prev = o),
                (t.parent = t._dp = e);
            })(e, t, "_first", "_last", e._sort ? "_start" : 0),
            Ri(t) || (e._recent = t),
            n || $i(e, t),
            e
          );
        },
        Fi = function (e, t) {
          return (
            (Ut.ScrollTrigger || Zt("scrollTrigger", t)) &&
            Ut.ScrollTrigger.create(t, e)
          );
        },
        Ni = function (e, t, i, n) {
          return (
            Hn(e, t),
            e._initted
              ? !i &&
                e._pt &&
                ((e._dur && !1 !== e.vars.lazy) || (!e._dur && e.vars.lazy)) &&
                gt !== Tn.frame
                ? (ni.push(e), (e._lazy = [t, n]), 1)
                : void 0
              : 1
          );
        },
        Gi = function e(t) {
          var i = t.parent;
          return (
            i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || e(i))
          );
        },
        Ri = function (e) {
          var t = e.data;
          return "isFromStart" === t || "isStart" === t;
        },
        Hi = function (e, t, i, n) {
          var s = e._repeat,
            r = gi(t) || 0,
            o = e._tTime / e._tDur;
          return (
            o && !n && (e._time *= r / e._dur),
            (e._dur = r),
            (e._tDur = s
              ? s < 0
                ? 1e10
                : gi(r * (s + 1) + e._rDelay * s)
              : r),
            o > 0 && !n ? zi(e, (e._tTime = e._tDur * o)) : e.parent && Di(e),
            i || ki(e.parent, e),
            e
          );
        },
        qi = function (e) {
          return e instanceof Bn ? ki(e) : Hi(e, e._dur);
        },
        Vi = { _start: 0, endTime: ti, totalDuration: ti },
        ji = function e(t, i, n) {
          var s,
            r,
            o,
            a = t.labels,
            l = t._recent || Vi,
            d = t.duration() >= Ct ? l.endTime(!1) : t._dur;
          return Lt(i) && (isNaN(i) || i in a)
            ? ((r = i.charAt(0)),
              (o = "%" === i.substr(-1)),
              (s = i.indexOf("=")),
              "<" === r || ">" === r
                ? (s >= 0 && (i = i.replace(/=/, "")),
                  ("<" === r ? l._start : l.endTime(l._repeat >= 0)) +
                    (parseFloat(i.substr(1)) || 0) *
                      (o ? (s < 0 ? l : n).totalDuration() / 100 : 1))
                : s < 0
                ? (i in a || (a[i] = d), a[i])
                : ((r = parseFloat(i.charAt(s - 1) + i.substr(s + 1))),
                  o &&
                    n &&
                    (r = (r / 100) * (Rt(n) ? n[0] : n).totalDuration()),
                  s > 1 ? e(t, i.substr(0, s - 1), n) + r : d + r))
            : null == i
            ? d
            : +i;
        },
        Wi = function (e, t, i) {
          var n,
            s,
            r = Dt(t[1]),
            o = (r ? 2 : 1) + (e < 2 ? 0 : 1),
            a = t[o];
          if ((r && (a.duration = t[1]), (a.parent = i), e)) {
            for (n = a, s = i; s && !("immediateRender" in n); )
              (n = s.vars.defaults || {}), (s = Bt(s.vars.inherit) && s.parent);
            (a.immediateRender = Bt(n.immediateRender)),
              e < 2 ? (a.runBackwards = 1) : (a.startAt = t[o - 1]);
          }
          return new Yn(t[0], a, t[o + 1]);
        },
        Yi = function (e, t) {
          return e || 0 === e ? t(e) : t;
        },
        Xi = function (e, t, i) {
          return i < e ? e : i > t ? t : i;
        },
        Ui = function (e, t) {
          return Lt(e) && (t = Xt.exec(e))
            ? e.substr(t.index + t[0].length)
            : "";
        },
        Qi = [].slice,
        Ki = function (e, t) {
          return (
            e &&
            $t(e) &&
            "length" in e &&
            ((!t && !e.length) || (e.length - 1 in e && $t(e[0]))) &&
            !e.nodeType &&
            e !== ut
          );
        },
        Zi = function (e, t, i) {
          return (
            void 0 === i && (i = []),
            e.forEach(function (e) {
              var n;
              return (Lt(e) && !t) || Ki(e, 1)
                ? (n = i).push.apply(n, Ji(e))
                : i.push(e);
            }) || i
          );
        },
        Ji = function (e, t, i) {
          return !Lt(e) || i || (!pt && xn())
            ? Rt(e)
              ? Zi(e, i)
              : Ki(e)
              ? Qi.call(e, 0)
              : e
              ? [e]
              : []
            : Qi.call((t || ht).querySelectorAll(e), 0);
        },
        en = function (e) {
          return e.sort(function () {
            return 0.5 - Math.random();
          });
        },
        tn = function (e) {
          if (Pt(e)) return e;
          var t = $t(e) ? e : { each: e },
            i = Mn(t.ease),
            n = t.from || 0,
            s = parseFloat(t.base) || 0,
            r = {},
            o = n > 0 && n < 1,
            a = isNaN(n) || o,
            l = t.axis,
            d = n,
            c = n;
          return (
            Lt(n)
              ? (d = c = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
              : !o && a && ((d = n[0]), (c = n[1])),
            function (e, o, u) {
              var p,
                h,
                f,
                g,
                m,
                v,
                y,
                b,
                _,
                w = (u || t).length,
                T = r[w];
              if (!T) {
                if (!(_ = "auto" === t.grid ? 0 : (t.grid || [1, Ct])[1])) {
                  for (
                    y = -Ct;
                    y < (y = u[_++].getBoundingClientRect().left) && _ < w;

                  );
                  _--;
                }
                for (
                  T = r[w] = [],
                    p = a ? Math.min(_, w) * d - 0.5 : n % _,
                    h = _ === Ct ? 0 : a ? (w * c) / _ - 0.5 : (n / _) | 0,
                    y = 0,
                    b = Ct,
                    v = 0;
                  v < w;
                  v++
                )
                  (f = (v % _) - p),
                    (g = h - ((v / _) | 0)),
                    (T[v] = m =
                      l ? Math.abs("y" === l ? g : f) : At(f * f + g * g)),
                    m > y && (y = m),
                    m < b && (b = m);
                "random" === n && en(T),
                  (T.max = y - b),
                  (T.min = b),
                  (T.v = w =
                    (parseFloat(t.amount) ||
                      parseFloat(t.each) *
                        (_ > w
                          ? w - 1
                          : l
                          ? "y" === l
                            ? w / _
                            : _
                          : Math.max(_, w / _)) ||
                      0) * ("edges" === n ? -1 : 1)),
                  (T.b = w < 0 ? s - w : s),
                  (T.u = Ui(t.amount || t.each) || 0),
                  (i = i && w < 0 ? kn(i) : i);
              }
              return (
                (w = (T[e] - T.min) / T.max || 0),
                gi(T.b + (i ? i(w) : w) * T.v) + T.u
              );
            }
          );
        },
        nn = function (e) {
          var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
          return function (i) {
            var n = Math.round(parseFloat(i) / e) * e * t;
            return (n - (n % 1)) / t + (Dt(i) ? 0 : Ui(i));
          };
        },
        sn = function (e, t) {
          var i,
            n,
            s = Rt(e);
          return (
            !s &&
              $t(e) &&
              ((i = s = e.radius || Ct),
              e.values
                ? ((e = Ji(e.values)), (n = !Dt(e[0])) && (i *= i))
                : (e = nn(e.increment))),
            Yi(
              t,
              s
                ? Pt(e)
                  ? function (t) {
                      return (n = e(t)), Math.abs(n - t) <= i ? n : t;
                    }
                  : function (t) {
                      for (
                        var s,
                          r,
                          o = parseFloat(n ? t.x : t),
                          a = parseFloat(n ? t.y : 0),
                          l = Ct,
                          d = 0,
                          c = e.length;
                        c--;

                      )
                        (s = n
                          ? (s = e[c].x - o) * s + (r = e[c].y - a) * r
                          : Math.abs(e[c] - o)) < l && ((l = s), (d = c));
                      return (
                        (d = !i || l <= i ? e[d] : t),
                        n || d === t || Dt(t) ? d : d + Ui(t)
                      );
                    }
                : nn(e)
            )
          );
        },
        rn = function (e, t, i, n) {
          return Yi(Rt(e) ? !t : !0 === i ? !!(i = 0) : !n, function () {
            return Rt(e)
              ? e[~~(Math.random() * e.length)]
              : (i = i || 1e-5) &&
                  (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
                  Math.floor(
                    Math.round(
                      (e - i / 2 + Math.random() * (t - e + 0.99 * i)) / i
                    ) *
                      i *
                      n
                  ) / n;
          });
        },
        on = function (e, t, i) {
          return Yi(i, function (i) {
            return e[~~t(i)];
          });
        },
        an = function (e) {
          for (var t, i, n, s, r = 0, o = ""; ~(t = e.indexOf("random(", r)); )
            (n = e.indexOf(")", t)),
              (s = "[" === e.charAt(t + 7)),
              (i = e.substr(t + 7, n - t - 7).match(s ? Yt : Ht)),
              (o +=
                e.substr(r, t - r) +
                rn(s ? i : +i[0], s ? 0 : +i[1], +i[2] || 1e-5)),
              (r = n + 1);
          return o + e.substr(r, e.length - r);
        },
        ln = function (e, t, i, n, s) {
          var r = t - e,
            o = n - i;
          return Yi(s, function (t) {
            return i + (((t - e) / r) * o || 0);
          });
        },
        dn = function (e, t, i) {
          var n,
            s,
            r,
            o = e.labels,
            a = Ct;
          for (n in o)
            (s = o[n] - t) < 0 == !!i &&
              s &&
              a > (s = Math.abs(s)) &&
              ((r = n), (a = s));
          return r;
        },
        cn = function (e, t, i) {
          var n,
            s,
            r = e.vars,
            o = r[t];
          if (o)
            return (
              (n = r[t + "Params"]),
              (s = r.callbackScope || e),
              i && ni.length && vi(),
              n ? o.apply(s, n) : o.call(s)
            );
        },
        un = function (e) {
          return (
            Oi(e),
            e.scrollTrigger && e.scrollTrigger.kill(!1),
            e.progress() < 1 && cn(e, "onInterrupt"),
            e
          );
        },
        pn = function (e) {
          var t = (e = (!e.name && e.default) || e).name,
            i = Pt(e),
            n =
              t && !i && e.init
                ? function () {
                    this._props = [];
                  }
                : e,
            s = {
              init: ti,
              render: is,
              add: Gn,
              kill: ss,
              modifier: ns,
              rawVars: 0,
            },
            r = {
              targetTest: 0,
              get: 0,
              getSetter: Zn,
              aliases: {},
              register: 0,
            };
          if ((xn(), e !== n)) {
            if (ri[t]) return;
            wi(n, wi(Ci(e, s), r)),
              Ti(n.prototype, Ti(s, Ci(e, r))),
              (ri[(n.prop = t)] = n),
              e.targetTest && (li.push(n), (ii[t] = 1)),
              (t =
                ("css" === t
                  ? "CSS"
                  : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin");
          }
          ei(t, n), e.register && e.register(us, n, as);
        },
        hn = 255,
        fn = {
          aqua: [0, hn, hn],
          lime: [0, hn, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, hn],
          navy: [0, 0, 128],
          white: [hn, hn, hn],
          olive: [128, 128, 0],
          yellow: [hn, hn, 0],
          orange: [hn, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [hn, 0, 0],
          pink: [hn, 192, 203],
          cyan: [0, hn, hn],
          transparent: [hn, hn, hn, 0],
        },
        gn = function (e, t, i) {
          return (
            ((6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1
              ? t + (i - t) * e * 6
              : e < 0.5
              ? i
              : 3 * e < 2
              ? t + (i - t) * (2 / 3 - e) * 6
              : t) *
              hn +
              0.5) |
            0
          );
        },
        mn = function (e, t, i) {
          var n,
            s,
            r,
            o,
            a,
            l,
            d,
            c,
            u,
            p,
            h = e ? (Dt(e) ? [e >> 16, (e >> 8) & hn, e & hn] : 0) : fn.black;
          if (!h) {
            if (
              ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), fn[e])
            )
              h = fn[e];
            else if ("#" === e.charAt(0)) {
              if (
                (e.length < 6 &&
                  ((n = e.charAt(1)),
                  (s = e.charAt(2)),
                  (r = e.charAt(3)),
                  (e =
                    "#" +
                    n +
                    n +
                    s +
                    s +
                    r +
                    r +
                    (5 === e.length ? e.charAt(4) + e.charAt(4) : ""))),
                9 === e.length)
              )
                return [
                  (h = parseInt(e.substr(1, 6), 16)) >> 16,
                  (h >> 8) & hn,
                  h & hn,
                  parseInt(e.substr(7), 16) / 255,
                ];
              h = [
                (e = parseInt(e.substr(1), 16)) >> 16,
                (e >> 8) & hn,
                e & hn,
              ];
            } else if ("hsl" === e.substr(0, 3))
              if (((h = p = e.match(Ht)), t)) {
                if (~e.indexOf("="))
                  return (h = e.match(qt)), i && h.length < 4 && (h[3] = 1), h;
              } else
                (o = (+h[0] % 360) / 360),
                  (a = +h[1] / 100),
                  (n =
                    2 * (l = +h[2] / 100) -
                    (s = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
                  h.length > 3 && (h[3] *= 1),
                  (h[0] = gn(o + 1 / 3, n, s)),
                  (h[1] = gn(o, n, s)),
                  (h[2] = gn(o - 1 / 3, n, s));
            else h = e.match(Ht) || fn.transparent;
            h = h.map(Number);
          }
          return (
            t &&
              !p &&
              ((n = h[0] / hn),
              (s = h[1] / hn),
              (r = h[2] / hn),
              (l = ((d = Math.max(n, s, r)) + (c = Math.min(n, s, r))) / 2),
              d === c
                ? (o = a = 0)
                : ((u = d - c),
                  (a = l > 0.5 ? u / (2 - d - c) : u / (d + c)),
                  (o =
                    d === n
                      ? (s - r) / u + (s < r ? 6 : 0)
                      : d === s
                      ? (r - n) / u + 2
                      : (n - s) / u + 4),
                  (o *= 60)),
              (h[0] = ~~(o + 0.5)),
              (h[1] = ~~(100 * a + 0.5)),
              (h[2] = ~~(100 * l + 0.5))),
            i && h.length < 4 && (h[3] = 1),
            h
          );
        },
        vn = function (e) {
          var t = [],
            i = [],
            n = -1;
          return (
            e.split(bn).forEach(function (e) {
              var s = e.match(Vt) || [];
              t.push.apply(t, s), i.push((n += s.length + 1));
            }),
            (t.c = i),
            t
          );
        },
        yn = function (e, t, i) {
          var n,
            s,
            r,
            o,
            a = "",
            l = (e + a).match(bn),
            d = t ? "hsla(" : "rgba(",
            c = 0;
          if (!l) return e;
          if (
            ((l = l.map(function (e) {
              return (
                (e = mn(e, t, 1)) &&
                d +
                  (t
                    ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3]
                    : e.join(",")) +
                  ")"
              );
            })),
            i && ((r = vn(e)), (n = i.c).join(a) !== r.c.join(a)))
          )
            for (o = (s = e.replace(bn, "1").split(Vt)).length - 1; c < o; c++)
              a +=
                s[c] +
                (~n.indexOf(c)
                  ? l.shift() || d + "0,0,0,0)"
                  : (r.length ? r : l.length ? l : i).shift());
          if (!s)
            for (o = (s = e.split(bn)).length - 1; c < o; c++) a += s[c] + l[c];
          return a + s[o];
        },
        bn = (function () {
          var e,
            t =
              "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
          for (e in fn) t += "|" + e + "\\b";
          return new RegExp(t + ")", "gi");
        })(),
        _n = /hsl[a]?\(/,
        wn = function (e) {
          var t,
            i = e.join(" ");
          if (((bn.lastIndex = 0), bn.test(i)))
            return (
              (t = _n.test(i)),
              (e[1] = yn(e[1], t)),
              (e[0] = yn(e[0], t, vn(e[1]))),
              !0
            );
        },
        Tn = (function () {
          var e,
            t,
            i,
            n,
            s,
            r,
            o = Date.now,
            a = 500,
            l = 33,
            d = o(),
            c = d,
            u = 1e3 / 240,
            p = u,
            h = [],
            f = function i(f) {
              var g,
                m,
                v,
                y,
                b = o() - c,
                _ = !0 === f;
              if (
                (b > a && (d += b - l),
                ((g = (v = (c += b) - d) - p) > 0 || _) &&
                  ((y = ++n.frame),
                  (s = v - 1e3 * n.time),
                  (n.time = v /= 1e3),
                  (p += g + (g >= u ? 4 : u - g)),
                  (m = 1)),
                _ || (e = t(i)),
                m)
              )
                for (r = 0; r < h.length; r++) h[r](v, s, y, f);
            };
          return (n = {
            time: 0,
            frame: 0,
            tick: function () {
              f(!0);
            },
            deltaRatio: function (e) {
              return s / (1e3 / (e || 60));
            },
            wake: function () {
              ft &&
                (!pt &&
                  Ft() &&
                  ((ut = pt = window),
                  (ht = ut.document || {}),
                  (Ut.gsap = us),
                  (ut.gsapVersions || (ut.gsapVersions = [])).push(us.version),
                  Kt(Qt || ut.GreenSockGlobals || (!ut.gsap && ut) || {}),
                  (i = ut.requestAnimationFrame)),
                e && n.sleep(),
                (t =
                  i ||
                  function (e) {
                    return setTimeout(e, (p - 1e3 * n.time + 1) | 0);
                  }),
                (vt = 1),
                f(2));
            },
            sleep: function () {
              (i ? ut.cancelAnimationFrame : clearTimeout)(e),
                (vt = 0),
                (t = ti);
            },
            lagSmoothing: function (e, t) {
              (a = e || 1e8), (l = Math.min(t, a, 0));
            },
            fps: function (e) {
              (u = 1e3 / (e || 240)), (p = 1e3 * n.time + u);
            },
            add: function (e) {
              h.indexOf(e) < 0 && h.push(e), xn();
            },
            remove: function (e, t) {
              ~(t = h.indexOf(e)) && h.splice(t, 1) && r >= t && r--;
            },
            _listeners: h,
          });
        })(),
        xn = function () {
          return !vt && Tn.wake();
        },
        Cn = {},
        Sn = /^[\d.\-M][\d.\-,\s]/,
        En = /["']/g,
        On = function (e) {
          for (
            var t,
              i,
              n,
              s = {},
              r = e.substr(1, e.length - 3).split(":"),
              o = r[0],
              a = 1,
              l = r.length;
            a < l;
            a++
          )
            (i = r[a]),
              (t = a !== l - 1 ? i.lastIndexOf(",") : i.length),
              (n = i.substr(0, t)),
              (s[o] = isNaN(n) ? n.replace(En, "").trim() : +n),
              (o = i.substr(t + 1).trim());
          return s;
        },
        kn = function (e) {
          return function (t) {
            return 1 - e(1 - t);
          };
        },
        An = function e(t, i) {
          for (var n, s = t._first; s; )
            s instanceof Bn
              ? e(s, i)
              : !s.vars.yoyoEase ||
                (s._yoyo && s._repeat) ||
                s._yoyo === i ||
                (s.timeline
                  ? e(s.timeline, i)
                  : ((n = s._ease),
                    (s._ease = s._yEase),
                    (s._yEase = n),
                    (s._yoyo = i))),
              (s = s._next);
        },
        Mn = function (e, t) {
          return (
            (e &&
              (Pt(e)
                ? e
                : Cn[e] ||
                  (function (e) {
                    var t = (e + "").split("("),
                      i = Cn[t[0]];
                    return i && t.length > 1 && i.config
                      ? i.config.apply(
                          null,
                          ~e.indexOf("{")
                            ? [On(t[1])]
                            : (function (e) {
                                var t = e.indexOf("(") + 1,
                                  i = e.indexOf(")"),
                                  n = e.indexOf("(", t);
                                return e.substring(
                                  t,
                                  ~n && n < i ? e.indexOf(")", i + 1) : i
                                );
                              })(e)
                                .split(",")
                                .map(bi)
                        )
                      : Cn._CE && Sn.test(e)
                      ? Cn._CE("", e)
                      : i;
                  })(e))) ||
            t
          );
        },
        In = function (e, t, i, n) {
          void 0 === i &&
            (i = function (e) {
              return 1 - t(1 - e);
            }),
            void 0 === n &&
              (n = function (e) {
                return e < 0.5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
              });
          var s,
            r = { easeIn: t, easeOut: i, easeInOut: n };
          return (
            hi(e, function (e) {
              for (var t in ((Cn[e] = Ut[e] = r),
              (Cn[(s = e.toLowerCase())] = i),
              r))
                Cn[
                  s +
                    ("easeIn" === t
                      ? ".in"
                      : "easeOut" === t
                      ? ".out"
                      : ".inOut")
                ] = Cn[e + "." + t] = r[t];
            }),
            r
          );
        },
        Ln = function (e) {
          return function (t) {
            return t < 0.5
              ? (1 - e(1 - 2 * t)) / 2
              : 0.5 + e(2 * (t - 0.5)) / 2;
          };
        },
        Pn = function e(t, i, n) {
          var s = i >= 1 ? i : 1,
            r = (n || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1),
            o = (r / Et) * (Math.asin(1 / s) || 0),
            a = function (e) {
              return 1 === e
                ? 1
                : s * Math.pow(2, -10 * e) * It((e - o) * r) + 1;
            },
            l =
              "out" === t
                ? a
                : "in" === t
                ? function (e) {
                    return 1 - a(1 - e);
                  }
                : Ln(a);
          return (
            (r = Et / r),
            (l.config = function (i, n) {
              return e(t, i, n);
            }),
            l
          );
        },
        Dn = function e(t, i) {
          void 0 === i && (i = 1.70158);
          var n = function (e) {
              return e ? --e * e * ((i + 1) * e + i) + 1 : 0;
            },
            s =
              "out" === t
                ? n
                : "in" === t
                ? function (e) {
                    return 1 - n(1 - e);
                  }
                : Ln(n);
          return (
            (s.config = function (i) {
              return e(t, i);
            }),
            s
          );
        };
      hi("Linear,Quad,Cubic,Quart,Quint,Strong", function (e, t) {
        var i = t < 5 ? t + 1 : t;
        In(
          e + ",Power" + (i - 1),
          t
            ? function (e) {
                return Math.pow(e, i);
              }
            : function (e) {
                return e;
              },
          function (e) {
            return 1 - Math.pow(1 - e, i);
          },
          function (e) {
            return e < 0.5
              ? Math.pow(2 * e, i) / 2
              : 1 - Math.pow(2 * (1 - e), i) / 2;
          }
        );
      }),
        (Cn.Linear.easeNone = Cn.none = Cn.Linear.easeIn),
        In("Elastic", Pn("in"), Pn("out"), Pn()),
        (yt = 7.5625),
        (_t = 1 / (bt = 2.75)),
        In(
          "Bounce",
          function (e) {
            return 1 - wt(1 - e);
          },
          (wt = function (e) {
            return e < _t
              ? yt * e * e
              : e < 0.7272727272727273
              ? yt * Math.pow(e - 1.5 / bt, 2) + 0.75
              : e < 0.9090909090909092
              ? yt * (e -= 2.25 / bt) * e + 0.9375
              : yt * Math.pow(e - 2.625 / bt, 2) + 0.984375;
          })
        ),
        In("Expo", function (e) {
          return e ? Math.pow(2, 10 * (e - 1)) : 0;
        }),
        In("Circ", function (e) {
          return -(At(1 - e * e) - 1);
        }),
        In("Sine", function (e) {
          return 1 === e ? 1 : 1 - Mt(e * Ot);
        }),
        In("Back", Dn("in"), Dn("out"), Dn()),
        (Cn.SteppedEase =
          Cn.steps =
          Ut.SteppedEase =
            {
              config: function (e, t) {
                void 0 === e && (e = 1);
                var i = 1 / e,
                  n = e + (t ? 0 : 1),
                  s = t ? 1 : 0;
                return function (e) {
                  return (((n * Xi(0, 0.99999999, e)) | 0) + s) * i;
                };
              },
            }),
        (xt.ease = Cn["quad.out"]),
        hi(
          "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
          function (e) {
            return (di += e + "," + e + "Params,");
          }
        );
      var zn = function (e, t) {
          (this.id = kt++),
            (e._gsap = this),
            (this.target = e),
            (this.harness = t),
            (this.get = t ? t.get : pi),
            (this.set = t ? t.getSetter : Zn);
        },
        $n = (function () {
          function e(e) {
            (this.vars = e),
              (this._delay = +e.delay || 0),
              (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
                ((this._rDelay = e.repeatDelay || 0),
                (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
              (this._ts = 1),
              Hi(this, +e.duration, 1, 1),
              (this.data = e.data),
              vt || Tn.wake();
          }
          var t = e.prototype;
          return (
            (t.delay = function (e) {
              return e || 0 === e
                ? (this.parent &&
                    this.parent.smoothChildTiming &&
                    this.startTime(this._start + e - this._delay),
                  (this._delay = e),
                  this)
                : this._delay;
            }),
            (t.duration = function (e) {
              return arguments.length
                ? this.totalDuration(
                    this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e
                  )
                : this.totalDuration() && this._dur;
            }),
            (t.totalDuration = function (e) {
              return arguments.length
                ? ((this._dirty = 0),
                  Hi(
                    this,
                    this._repeat < 0
                      ? e
                      : (e - this._repeat * this._rDelay) / (this._repeat + 1)
                  ))
                : this._tDur;
            }),
            (t.totalTime = function (e, t) {
              if ((xn(), !arguments.length)) return this._tTime;
              var i = this._dp;
              if (i && i.smoothChildTiming && this._ts) {
                for (
                  zi(this, e), !i._dp || i.parent || $i(i, this);
                  i && i.parent;

                )
                  i.parent._time !==
                    i._start +
                      (i._ts >= 0
                        ? i._tTime / i._ts
                        : (i.totalDuration() - i._tTime) / -i._ts) &&
                    i.totalTime(i._tTime, !0),
                    (i = i.parent);
                !this.parent &&
                  this._dp.autoRemoveChildren &&
                  ((this._ts > 0 && e < this._tDur) ||
                    (this._ts < 0 && e > 0) ||
                    (!this._tDur && !e)) &&
                  Bi(this._dp, this, this._start - this._delay);
              }
              return (
                (this._tTime !== e ||
                  (!this._dur && !t) ||
                  (this._initted && Math.abs(this._zTime) === St) ||
                  (!e && !this._initted && (this.add || this._ptLookup))) &&
                  (this._ts || (this._pTime = e), yi(this, e, t)),
                this
              );
            }),
            (t.time = function (e, t) {
              return arguments.length
                ? this.totalTime(
                    Math.min(this.totalDuration(), e + Ii(this)) %
                      (this._dur + this._rDelay) || (e ? this._dur : 0),
                    t
                  )
                : this._time;
            }),
            (t.totalProgress = function (e, t) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * e, t)
                : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.ratio;
            }),
            (t.progress = function (e, t) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (!this._yoyo || 1 & this.iteration() ? e : 1 - e) +
                      Ii(this),
                    t
                  )
                : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.ratio;
            }),
            (t.iteration = function (e, t) {
              var i = this.duration() + this._rDelay;
              return arguments.length
                ? this.totalTime(this._time + (e - 1) * i, t)
                : this._repeat
                ? Li(this._tTime, i) + 1
                : 1;
            }),
            (t.timeScale = function (e) {
              if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
              if (this._rts === e) return this;
              var t =
                this.parent && this._ts
                  ? Pi(this.parent._time, this)
                  : this._tTime;
              return (
                (this._rts = +e || 0),
                (this._ts = this._ps || -1e-8 === e ? 0 : this._rts),
                Ai(this.totalTime(Xi(-this._delay, this._tDur, t), !0)),
                Di(this),
                this
              );
            }),
            (t.paused = function (e) {
              return arguments.length
                ? (this._ps !== e &&
                    ((this._ps = e),
                    e
                      ? ((this._pTime =
                          this._tTime ||
                          Math.max(-this._delay, this.rawTime())),
                        (this._ts = this._act = 0))
                      : (xn(),
                        (this._ts = this._rts),
                        this.totalTime(
                          this.parent && !this.parent.smoothChildTiming
                            ? this.rawTime()
                            : this._tTime || this._pTime,
                          1 === this.progress() &&
                            Math.abs(this._zTime) !== St &&
                            (this._tTime -= St)
                        ))),
                  this)
                : this._ps;
            }),
            (t.startTime = function (e) {
              if (arguments.length) {
                this._start = e;
                var t = this.parent || this._dp;
                return (
                  t &&
                    (t._sort || !this.parent) &&
                    Bi(t, this, e - this._delay),
                  this
                );
              }
              return this._start;
            }),
            (t.endTime = function (e) {
              return (
                this._start +
                (Bt(e) ? this.totalDuration() : this.duration()) /
                  Math.abs(this._ts || 1)
              );
            }),
            (t.rawTime = function (e) {
              var t = this.parent || this._dp;
              return t
                ? e &&
                  (!this._ts ||
                    (this._repeat && this._time && this.totalProgress() < 1))
                  ? this._tTime % (this._dur + this._rDelay)
                  : this._ts
                  ? Pi(t.rawTime(e), this)
                  : this._tTime
                : this._tTime;
            }),
            (t.globalTime = function (e) {
              for (var t = this, i = arguments.length ? e : t.rawTime(); t; )
                (i = t._start + i / (t._ts || 1)), (t = t._dp);
              return i;
            }),
            (t.repeat = function (e) {
              return arguments.length
                ? ((this._repeat = e === 1 / 0 ? -2 : e), qi(this))
                : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
            }),
            (t.repeatDelay = function (e) {
              if (arguments.length) {
                var t = this._time;
                return (this._rDelay = e), qi(this), t ? this.time(t) : this;
              }
              return this._rDelay;
            }),
            (t.yoyo = function (e) {
              return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
            }),
            (t.seek = function (e, t) {
              return this.totalTime(ji(this, e), Bt(t));
            }),
            (t.restart = function (e, t) {
              return this.play().totalTime(e ? -this._delay : 0, Bt(t));
            }),
            (t.play = function (e, t) {
              return null != e && this.seek(e, t), this.reversed(!1).paused(!1);
            }),
            (t.reverse = function (e, t) {
              return (
                null != e && this.seek(e || this.totalDuration(), t),
                this.reversed(!0).paused(!1)
              );
            }),
            (t.pause = function (e, t) {
              return null != e && this.seek(e, t), this.paused(!0);
            }),
            (t.resume = function () {
              return this.paused(!1);
            }),
            (t.reversed = function (e) {
              return arguments.length
                ? (!!e !== this.reversed() &&
                    this.timeScale(-this._rts || (e ? -1e-8 : 0)),
                  this)
                : this._rts < 0;
            }),
            (t.invalidate = function () {
              return (
                (this._initted = this._act = 0), (this._zTime = -1e-8), this
              );
            }),
            (t.isActive = function () {
              var e,
                t = this.parent || this._dp,
                i = this._start;
              return !(
                t &&
                !(
                  this._ts &&
                  this._initted &&
                  t.isActive() &&
                  (e = t.rawTime(!0)) >= i &&
                  e < this.endTime(!0) - St
                )
              );
            }),
            (t.eventCallback = function (e, t, i) {
              var n = this.vars;
              return arguments.length > 1
                ? (t
                    ? ((n[e] = t),
                      i && (n[e + "Params"] = i),
                      "onUpdate" === e && (this._onUpdate = t))
                    : delete n[e],
                  this)
                : n[e];
            }),
            (t.then = function (e) {
              var t = this;
              return new Promise(function (i) {
                var n = Pt(e) ? e : _i,
                  s = function () {
                    var e = t.then;
                    (t.then = null),
                      Pt(n) &&
                        (n = n(t)) &&
                        (n.then || n === t) &&
                        (t.then = e),
                      i(n),
                      (t.then = e);
                  };
                (t._initted && 1 === t.totalProgress() && t._ts >= 0) ||
                (!t._tTime && t._ts < 0)
                  ? s()
                  : (t._prom = s);
              });
            }),
            (t.kill = function () {
              un(this);
            }),
            e
          );
        })();
      wi($n.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1,
      });
      var Bn = (function (e) {
        function t(t, i) {
          var n;
          return (
            void 0 === t && (t = {}),
            ((n = e.call(this, t) || this).labels = {}),
            (n.smoothChildTiming = !!t.smoothChildTiming),
            (n.autoRemoveChildren = !!t.autoRemoveChildren),
            (n._sort = Bt(t.sortChildren)),
            ct && Bi(t.parent || ct, at(n), i),
            t.reversed && n.reverse(),
            t.paused && n.paused(!0),
            t.scrollTrigger && Fi(at(n), t.scrollTrigger),
            n
          );
        }
        lt(t, e);
        var i = t.prototype;
        return (
          (i.to = function (e, t, i) {
            return Wi(0, arguments, this), this;
          }),
          (i.from = function (e, t, i) {
            return Wi(1, arguments, this), this;
          }),
          (i.fromTo = function (e, t, i, n) {
            return Wi(2, arguments, this), this;
          }),
          (i.set = function (e, t, i) {
            return (
              (t.duration = 0),
              (t.parent = this),
              Si(t).repeatDelay || (t.repeat = 0),
              (t.immediateRender = !!t.immediateRender),
              new Yn(e, t, ji(this, i), 1),
              this
            );
          }),
          (i.call = function (e, t, i) {
            return Bi(this, Yn.delayedCall(0, e, t), i);
          }),
          (i.staggerTo = function (e, t, i, n, s, r, o) {
            return (
              (i.duration = t),
              (i.stagger = i.stagger || n),
              (i.onComplete = r),
              (i.onCompleteParams = o),
              (i.parent = this),
              new Yn(e, i, ji(this, s)),
              this
            );
          }),
          (i.staggerFrom = function (e, t, i, n, s, r, o) {
            return (
              (i.runBackwards = 1),
              (Si(i).immediateRender = Bt(i.immediateRender)),
              this.staggerTo(e, t, i, n, s, r, o)
            );
          }),
          (i.staggerFromTo = function (e, t, i, n, s, r, o, a) {
            return (
              (n.startAt = i),
              (Si(n).immediateRender = Bt(n.immediateRender)),
              this.staggerTo(e, t, n, s, r, o, a)
            );
          }),
          (i.render = function (e, t, i) {
            var n,
              s,
              r,
              o,
              a,
              l,
              d,
              c,
              u,
              p,
              h,
              f,
              g = this._time,
              m = this._dirty ? this.totalDuration() : this._tDur,
              v = this._dur,
              y = e <= 0 ? 0 : gi(e),
              b = this._zTime < 0 != e < 0 && (this._initted || !v);
            if (
              (this !== ct && y > m && e >= 0 && (y = m),
              y !== this._tTime || i || b)
            ) {
              if (
                (g !== this._time &&
                  v &&
                  ((y += this._time - g), (e += this._time - g)),
                (n = y),
                (u = this._start),
                (l = !(c = this._ts)),
                b && (v || (g = this._zTime), (e || !t) && (this._zTime = e)),
                this._repeat)
              ) {
                if (
                  ((h = this._yoyo),
                  (a = v + this._rDelay),
                  this._repeat < -1 && e < 0)
                )
                  return this.totalTime(100 * a + e, t, i);
                if (
                  ((n = gi(y % a)),
                  y === m
                    ? ((o = this._repeat), (n = v))
                    : ((o = ~~(y / a)) && o === y / a && ((n = v), o--),
                      n > v && (n = v)),
                  (p = Li(this._tTime, a)),
                  !g && this._tTime && p !== o && (p = o),
                  h && 1 & o && ((n = v - n), (f = 1)),
                  o !== p && !this._lock)
                ) {
                  var _ = h && 1 & p,
                    w = _ === (h && 1 & o);
                  if (
                    (o < p && (_ = !_),
                    (g = _ ? 0 : v),
                    (this._lock = 1),
                    (this.render(g || (f ? 0 : gi(o * a)), t, !v)._lock = 0),
                    (this._tTime = y),
                    !t && this.parent && cn(this, "onRepeat"),
                    this.vars.repeatRefresh &&
                      !f &&
                      (this.invalidate()._lock = 1),
                    (g && g !== this._time) ||
                      l !== !this._ts ||
                      (this.vars.onRepeat && !this.parent && !this._act))
                  )
                    return this;
                  if (
                    ((v = this._dur),
                    (m = this._tDur),
                    w &&
                      ((this._lock = 2),
                      (g = _ ? v : -1e-4),
                      this.render(g, !0),
                      this.vars.repeatRefresh && !f && this.invalidate()),
                    (this._lock = 0),
                    !this._ts && !l)
                  )
                    return this;
                  An(this, f);
                }
              }
              if (
                (this._hasPause &&
                  !this._forcing &&
                  this._lock < 2 &&
                  ((d = (function (e, t, i) {
                    var n;
                    if (i > t)
                      for (n = e._first; n && n._start <= i; ) {
                        if ("isPause" === n.data && n._start > t) return n;
                        n = n._next;
                      }
                    else
                      for (n = e._last; n && n._start >= i; ) {
                        if ("isPause" === n.data && n._start < t) return n;
                        n = n._prev;
                      }
                  })(this, gi(g), gi(n))),
                  d && (y -= n - (n = d._start))),
                (this._tTime = y),
                (this._time = n),
                (this._act = !c),
                this._initted ||
                  ((this._onUpdate = this.vars.onUpdate),
                  (this._initted = 1),
                  (this._zTime = e),
                  (g = 0)),
                !g && n && !t && (cn(this, "onStart"), this._tTime !== y))
              )
                return this;
              if (n >= g && e >= 0)
                for (s = this._first; s; ) {
                  if (
                    ((r = s._next),
                    (s._act || n >= s._start) && s._ts && d !== s)
                  ) {
                    if (s.parent !== this) return this.render(e, t, i);
                    if (
                      (s.render(
                        s._ts > 0
                          ? (n - s._start) * s._ts
                          : (s._dirty ? s.totalDuration() : s._tDur) +
                              (n - s._start) * s._ts,
                        t,
                        i
                      ),
                      n !== this._time || (!this._ts && !l))
                    ) {
                      (d = 0), r && (y += this._zTime = -1e-8);
                      break;
                    }
                  }
                  s = r;
                }
              else {
                s = this._last;
                for (var T = e < 0 ? e : n; s; ) {
                  if (
                    ((r = s._prev), (s._act || T <= s._end) && s._ts && d !== s)
                  ) {
                    if (s.parent !== this) return this.render(e, t, i);
                    if (
                      (s.render(
                        s._ts > 0
                          ? (T - s._start) * s._ts
                          : (s._dirty ? s.totalDuration() : s._tDur) +
                              (T - s._start) * s._ts,
                        t,
                        i
                      ),
                      n !== this._time || (!this._ts && !l))
                    ) {
                      (d = 0), r && (y += this._zTime = T ? -1e-8 : St);
                      break;
                    }
                  }
                  s = r;
                }
              }
              if (
                d &&
                !t &&
                (this.pause(),
                (d.render(n >= g ? 0 : -1e-8)._zTime = n >= g ? 1 : -1),
                this._ts)
              )
                return (this._start = u), Di(this), this.render(e, t, i);
              this._onUpdate && !t && cn(this, "onUpdate", !0),
                ((y === m && m >= this.totalDuration()) || (!y && g)) &&
                  ((u !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
                    this._lock ||
                    ((e || !v) &&
                      ((y === m && this._ts > 0) || (!y && this._ts < 0)) &&
                      Oi(this, 1),
                    t ||
                      (e < 0 && !g) ||
                      (!y && !g && m) ||
                      (cn(
                        this,
                        y === m && e >= 0 ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(y < m && this.timeScale() > 0) &&
                        this._prom())));
            }
            return this;
          }),
          (i.add = function (e, t) {
            var i = this;
            if ((Dt(t) || (t = ji(this, t, e)), !(e instanceof $n))) {
              if (Rt(e))
                return (
                  e.forEach(function (e) {
                    return i.add(e, t);
                  }),
                  this
                );
              if (Lt(e)) return this.addLabel(e, t);
              if (!Pt(e)) return this;
              e = Yn.delayedCall(0, e);
            }
            return this !== e ? Bi(this, e, t) : this;
          }),
          (i.getChildren = function (e, t, i, n) {
            void 0 === e && (e = !0),
              void 0 === t && (t = !0),
              void 0 === i && (i = !0),
              void 0 === n && (n = -Ct);
            for (var s = [], r = this._first; r; )
              r._start >= n &&
                (r instanceof Yn
                  ? t && s.push(r)
                  : (i && s.push(r),
                    e && s.push.apply(s, r.getChildren(!0, t, i)))),
                (r = r._next);
            return s;
          }),
          (i.getById = function (e) {
            for (var t = this.getChildren(1, 1, 1), i = t.length; i--; )
              if (t[i].vars.id === e) return t[i];
          }),
          (i.remove = function (e) {
            return Lt(e)
              ? this.removeLabel(e)
              : Pt(e)
              ? this.killTweensOf(e)
              : (Ei(this, e),
                e === this._recent && (this._recent = this._last),
                ki(this));
          }),
          (i.totalTime = function (t, i) {
            return arguments.length
              ? ((this._forcing = 1),
                !this._dp &&
                  this._ts &&
                  (this._start = gi(
                    Tn.time -
                      (this._ts > 0
                        ? t / this._ts
                        : (this.totalDuration() - t) / -this._ts)
                  )),
                e.prototype.totalTime.call(this, t, i),
                (this._forcing = 0),
                this)
              : this._tTime;
          }),
          (i.addLabel = function (e, t) {
            return (this.labels[e] = ji(this, t)), this;
          }),
          (i.removeLabel = function (e) {
            return delete this.labels[e], this;
          }),
          (i.addPause = function (e, t, i) {
            var n = Yn.delayedCall(0, t || ti, i);
            return (
              (n.data = "isPause"),
              (this._hasPause = 1),
              Bi(this, n, ji(this, e))
            );
          }),
          (i.removePause = function (e) {
            var t = this._first;
            for (e = ji(this, e); t; )
              t._start === e && "isPause" === t.data && Oi(t), (t = t._next);
          }),
          (i.killTweensOf = function (e, t, i) {
            for (var n = this.getTweensOf(e, i), s = n.length; s--; )
              Fn !== n[s] && n[s].kill(e, t);
            return this;
          }),
          (i.getTweensOf = function (e, t) {
            for (var i, n = [], s = Ji(e), r = this._first, o = Dt(t); r; )
              r instanceof Yn
                ? mi(r._targets, s) &&
                  (o
                    ? (!Fn || (r._initted && r._ts)) &&
                      r.globalTime(0) <= t &&
                      r.globalTime(r.totalDuration()) > t
                    : !t || r.isActive()) &&
                  n.push(r)
                : (i = r.getTweensOf(s, t)).length && n.push.apply(n, i),
                (r = r._next);
            return n;
          }),
          (i.tweenTo = function (e, t) {
            t = t || {};
            var i,
              n = this,
              s = ji(n, e),
              r = t,
              o = r.startAt,
              a = r.onStart,
              l = r.onStartParams,
              d = r.immediateRender,
              c = Yn.to(
                n,
                wi(
                  {
                    ease: t.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: s,
                    overwrite: "auto",
                    duration:
                      t.duration ||
                      Math.abs(
                        (s - (o && "time" in o ? o.time : n._time)) /
                          n.timeScale()
                      ) ||
                      St,
                    onStart: function () {
                      if ((n.pause(), !i)) {
                        var e =
                          t.duration ||
                          Math.abs(
                            (s - (o && "time" in o ? o.time : n._time)) /
                              n.timeScale()
                          );
                        c._dur !== e && Hi(c, e, 0, 1).render(c._time, !0, !0),
                          (i = 1);
                      }
                      a && a.apply(c, l || []);
                    },
                  },
                  t
                )
              );
            return d ? c.render(0) : c;
          }),
          (i.tweenFromTo = function (e, t, i) {
            return this.tweenTo(t, wi({ startAt: { time: ji(this, e) } }, i));
          }),
          (i.recent = function () {
            return this._recent;
          }),
          (i.nextLabel = function (e) {
            return void 0 === e && (e = this._time), dn(this, ji(this, e));
          }),
          (i.previousLabel = function (e) {
            return void 0 === e && (e = this._time), dn(this, ji(this, e), 1);
          }),
          (i.currentLabel = function (e) {
            return arguments.length
              ? this.seek(e, !0)
              : this.previousLabel(this._time + St);
          }),
          (i.shiftChildren = function (e, t, i) {
            void 0 === i && (i = 0);
            for (var n, s = this._first, r = this.labels; s; )
              s._start >= i && ((s._start += e), (s._end += e)), (s = s._next);
            if (t) for (n in r) r[n] >= i && (r[n] += e);
            return ki(this);
          }),
          (i.invalidate = function () {
            var t = this._first;
            for (this._lock = 0; t; ) t.invalidate(), (t = t._next);
            return e.prototype.invalidate.call(this);
          }),
          (i.clear = function (e) {
            void 0 === e && (e = !0);
            for (var t, i = this._first; i; )
              (t = i._next), this.remove(i), (i = t);
            return (
              this._dp && (this._time = this._tTime = this._pTime = 0),
              e && (this.labels = {}),
              ki(this)
            );
          }),
          (i.totalDuration = function (e) {
            var t,
              i,
              n,
              s = 0,
              r = this,
              o = r._last,
              a = Ct;
            if (arguments.length)
              return r.timeScale(
                (r._repeat < 0 ? r.duration() : r.totalDuration()) /
                  (r.reversed() ? -e : e)
              );
            if (r._dirty) {
              for (n = r.parent; o; )
                (t = o._prev),
                  o._dirty && o.totalDuration(),
                  (i = o._start) > a && r._sort && o._ts && !r._lock
                    ? ((r._lock = 1), (Bi(r, o, i - o._delay, 1)._lock = 0))
                    : (a = i),
                  i < 0 &&
                    o._ts &&
                    ((s -= i),
                    ((!n && !r._dp) || (n && n.smoothChildTiming)) &&
                      ((r._start += i / r._ts),
                      (r._time -= i),
                      (r._tTime -= i)),
                    r.shiftChildren(-i, !1, -Infinity),
                    (a = 0)),
                  o._end > s && o._ts && (s = o._end),
                  (o = t);
              Hi(r, r === ct && r._time > s ? r._time : s, 1, 1),
                (r._dirty = 0);
            }
            return r._tDur;
          }),
          (t.updateRoot = function (e) {
            if (
              (ct._ts && (yi(ct, Pi(e, ct)), (gt = Tn.frame)), Tn.frame >= ai)
            ) {
              ai += Tt.autoSleep || 120;
              var t = ct._first;
              if ((!t || !t._ts) && Tt.autoSleep && Tn._listeners.length < 2) {
                for (; t && !t._ts; ) t = t._next;
                t || Tn.sleep();
              }
            }
          }),
          t
        );
      })($n);
      wi(Bn.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
      var Fn,
        Nn = function (e, t, i, n, s, r, o) {
          var a,
            l,
            d,
            c,
            u,
            p,
            h,
            f,
            g = new as(this._pt, e, t, 0, 1, ts, null, s),
            m = 0,
            v = 0;
          for (
            g.b = i,
              g.e = n,
              i += "",
              (h = ~(n += "").indexOf("random(")) && (n = an(n)),
              r && (r((f = [i, n]), e, t), (i = f[0]), (n = f[1])),
              l = i.match(jt) || [];
            (a = jt.exec(n));

          )
            (c = a[0]),
              (u = n.substring(m, a.index)),
              d ? (d = (d + 1) % 5) : "rgba(" === u.substr(-5) && (d = 1),
              c !== l[v++] &&
                ((p = parseFloat(l[v - 1]) || 0),
                (g._pt = {
                  _next: g._pt,
                  p: u || 1 === v ? u : ",",
                  s: p,
                  c:
                    "=" === c.charAt(1)
                      ? parseFloat(c.substr(2)) * ("-" === c.charAt(0) ? -1 : 1)
                      : parseFloat(c) - p,
                  m: d && d < 4 ? Math.round : 0,
                }),
                (m = jt.lastIndex));
          return (
            (g.c = m < n.length ? n.substring(m, n.length) : ""),
            (g.fp = o),
            (Wt.test(n) || h) && (g.e = 0),
            (this._pt = g),
            g
          );
        },
        Gn = function (e, t, i, n, s, r, o, a, l) {
          Pt(n) && (n = n(s || 0, e, r));
          var d,
            c = e[t],
            u =
              "get" !== i
                ? i
                : Pt(c)
                ? l
                  ? e[
                      t.indexOf("set") || !Pt(e["get" + t.substr(3)])
                        ? t
                        : "get" + t.substr(3)
                    ](l)
                  : e[t]()
                : c,
            p = Pt(c) ? (l ? Qn : Un) : Xn;
          if (
            (Lt(n) &&
              (~n.indexOf("random(") && (n = an(n)),
              "=" === n.charAt(1) &&
                ((d =
                  parseFloat(u) +
                  parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) +
                  (Ui(u) || 0)) ||
                  0 === d) &&
                (n = d)),
            u !== n)
          )
            return isNaN(u * n) || "" === n
              ? (!c && !(t in e) && Zt(t, n),
                Nn.call(this, e, t, u, n, p, a || Tt.stringFilter, l))
              : ((d = new as(
                  this._pt,
                  e,
                  t,
                  +u || 0,
                  n - (u || 0),
                  "boolean" == typeof c ? es : Jn,
                  0,
                  p
                )),
                l && (d.fp = l),
                o && d.modifier(o, this, e),
                (this._pt = d));
        },
        Rn = function (e, t, i, n, s, r) {
          var o, a, l, d;
          if (
            ri[e] &&
            !1 !==
              (o = new ri[e]()).init(
                s,
                o.rawVars
                  ? t[e]
                  : (function (e, t, i, n, s) {
                      if (
                        (Pt(e) && (e = Vn(e, s, t, i, n)),
                        !$t(e) || (e.style && e.nodeType) || Rt(e) || Gt(e))
                      )
                        return Lt(e) ? Vn(e, s, t, i, n) : e;
                      var r,
                        o = {};
                      for (r in e) o[r] = Vn(e[r], s, t, i, n);
                      return o;
                    })(t[e], n, s, r, i),
                i,
                n,
                r
              ) &&
            ((i._pt = a =
              new as(i._pt, s, e, 0, 1, o.render, o, 0, o.priority)),
            i !== mt)
          )
            for (
              l = i._ptLookup[i._targets.indexOf(s)], d = o._props.length;
              d--;

            )
              l[o._props[d]] = a;
          return o;
        },
        Hn = function e(t, i) {
          var n,
            s,
            r,
            o,
            a,
            l,
            d,
            c,
            u,
            p,
            h,
            f,
            g,
            m = t.vars,
            v = m.ease,
            y = m.startAt,
            b = m.immediateRender,
            _ = m.lazy,
            w = m.onUpdate,
            T = m.onUpdateParams,
            x = m.callbackScope,
            C = m.runBackwards,
            S = m.yoyoEase,
            E = m.keyframes,
            O = m.autoRevert,
            k = t._dur,
            A = t._startAt,
            M = t._targets,
            I = t.parent,
            L = I && "nested" === I.data ? I.parent._targets : M,
            P = "auto" === t._overwrite && !dt,
            D = t.timeline;
          if (
            (D && (!E || !v) && (v = "none"),
            (t._ease = Mn(v, xt.ease)),
            (t._yEase = S ? kn(Mn(!0 === S ? v : S, xt.ease)) : 0),
            S &&
              t._yoyo &&
              !t._repeat &&
              ((S = t._yEase), (t._yEase = t._ease), (t._ease = S)),
            (t._from = !D && !!m.runBackwards),
            !D || (E && !m.stagger))
          ) {
            if (
              ((f = (c = M[0] ? ui(M[0]).harness : 0) && m[c.prop]),
              (n = Ci(m, ii)),
              A && Oi(A.render(-1, !0)),
              y)
            )
              if (
                (Oi(
                  (t._startAt = Yn.set(
                    M,
                    wi(
                      {
                        data: "isStart",
                        overwrite: !1,
                        parent: I,
                        immediateRender: !0,
                        lazy: Bt(_),
                        startAt: null,
                        delay: 0,
                        onUpdate: w,
                        onUpdateParams: T,
                        callbackScope: x,
                        stagger: 0,
                      },
                      y
                    )
                  ))
                ),
                i < 0 && !b && !O && t._startAt.render(-1, !0),
                b)
              ) {
                if ((i > 0 && !O && (t._startAt = 0), k && i <= 0))
                  return void (i && (t._zTime = i));
              } else !1 === O && (t._startAt = 0);
            else if (C && k)
              if (A) !O && (t._startAt = 0);
              else if (
                (i && (b = !1),
                (r = wi(
                  {
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: b && Bt(_),
                    immediateRender: b,
                    stagger: 0,
                    parent: I,
                  },
                  n
                )),
                f && (r[c.prop] = f),
                Oi((t._startAt = Yn.set(M, r))),
                i < 0 && t._startAt.render(-1, !0),
                (t._zTime = i),
                b)
              ) {
                if (!i) return;
              } else e(t._startAt, St);
            for (
              t._pt = 0, _ = (k && Bt(_)) || (_ && !k), s = 0;
              s < M.length;
              s++
            ) {
              if (
                ((d = (a = M[s])._gsap || ci(M)[s]._gsap),
                (t._ptLookup[s] = p = {}),
                si[d.id] && ni.length && vi(),
                (h = L === M ? s : L.indexOf(a)),
                c &&
                  !1 !== (u = new c()).init(a, f || n, t, h, L) &&
                  ((t._pt = o =
                    new as(t._pt, a, u.name, 0, 1, u.render, u, 0, u.priority)),
                  u._props.forEach(function (e) {
                    p[e] = o;
                  }),
                  u.priority && (l = 1)),
                !c || f)
              )
                for (r in n)
                  ri[r] && (u = Rn(r, n, t, h, a, L))
                    ? u.priority && (l = 1)
                    : (p[r] = o =
                        Gn.call(t, a, r, "get", n[r], h, L, 0, m.stringFilter));
              t._op && t._op[s] && t.kill(a, t._op[s]),
                P &&
                  t._pt &&
                  ((Fn = t),
                  ct.killTweensOf(a, p, t.globalTime(i)),
                  (g = !t.parent),
                  (Fn = 0)),
                t._pt && _ && (si[d.id] = 1);
            }
            l && os(t), t._onInit && t._onInit(t);
          }
          (t._onUpdate = w),
            (t._initted = (!t._op || t._pt) && !g),
            E && i <= 0 && D.render(Ct, !0, !0);
        },
        qn = function (e, t, i, n) {
          var s,
            r,
            o = t.ease || n || "power1.inOut";
          if (Rt(t))
            (r = i[e] || (i[e] = [])),
              t.forEach(function (e, i) {
                return r.push({ t: (i / (t.length - 1)) * 100, v: e, e: o });
              });
          else
            for (s in t)
              (r = i[s] || (i[s] = [])),
                "ease" === s || r.push({ t: parseFloat(e), v: t[s], e: o });
        },
        Vn = function (e, t, i, n, s) {
          return Pt(e)
            ? e.call(t, i, n, s)
            : Lt(e) && ~e.indexOf("random(")
            ? an(e)
            : e;
        },
        jn = di + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        Wn = {};
      hi(jn + ",id,stagger,delay,duration,paused,scrollTrigger", function (e) {
        return (Wn[e] = 1);
      });
      var Yn = (function (e) {
        function t(t, i, n, s) {
          var r;
          "number" == typeof i && ((n.duration = i), (i = n), (n = null));
          var o,
            a,
            l,
            d,
            c,
            u,
            p,
            h,
            f = (r = e.call(this, s ? i : Si(i)) || this).vars,
            g = f.duration,
            m = f.delay,
            v = f.immediateRender,
            y = f.stagger,
            b = f.overwrite,
            _ = f.keyframes,
            w = f.defaults,
            T = f.scrollTrigger,
            x = f.yoyoEase,
            C = i.parent || ct,
            S = (Rt(t) || Gt(t) ? Dt(t[0]) : "length" in i) ? [t] : Ji(t);
          if (
            ((r._targets = S.length
              ? ci(S)
              : Jt(
                  "GSAP target " + t + " not found. https://greensock.com",
                  !Tt.nullTargetWarn
                ) || []),
            (r._ptLookup = []),
            (r._overwrite = b),
            _ || y || Nt(g) || Nt(m))
          ) {
            if (
              ((i = r.vars),
              (o = r.timeline =
                new Bn({ data: "nested", defaults: w || {} })).kill(),
              (o.parent = o._dp = at(r)),
              (o._start = 0),
              y || Nt(g) || Nt(m))
            ) {
              if (((d = S.length), (p = y && tn(y)), $t(y)))
                for (c in y) ~jn.indexOf(c) && (h || (h = {}), (h[c] = y[c]));
              for (a = 0; a < d; a++)
                ((l = Ci(i, Wn)).stagger = 0),
                  x && (l.yoyoEase = x),
                  h && Ti(l, h),
                  (u = S[a]),
                  (l.duration = +Vn(g, at(r), a, u, S)),
                  (l.delay = (+Vn(m, at(r), a, u, S) || 0) - r._delay),
                  !y &&
                    1 === d &&
                    l.delay &&
                    ((r._delay = m = l.delay), (r._start += m), (l.delay = 0)),
                  o.to(u, l, p ? p(a, u, S) : 0),
                  (o._ease = Cn.none);
              o.duration() ? (g = m = 0) : (r.timeline = 0);
            } else if (_) {
              Si(wi(o.vars.defaults, { ease: "none" })),
                (o._ease = Mn(_.ease || i.ease || "none"));
              var E,
                O,
                k,
                A = 0;
              if (Rt(_))
                _.forEach(function (e) {
                  return o.to(S, e, ">");
                });
              else {
                for (c in ((l = {}), _))
                  "ease" === c ||
                    "easeEach" === c ||
                    qn(c, _[c], l, _.easeEach);
                for (c in l)
                  for (
                    E = l[c].sort(function (e, t) {
                      return e.t - t.t;
                    }),
                      A = 0,
                      a = 0;
                    a < E.length;
                    a++
                  )
                    ((k = {
                      ease: (O = E[a]).e,
                      duration: ((O.t - (a ? E[a - 1].t : 0)) / 100) * g,
                    })[c] = O.v),
                      o.to(S, k, A),
                      (A += k.duration);
                o.duration() < g && o.to({}, { duration: g - o.duration() });
              }
            }
            g || r.duration((g = o.duration()));
          } else r.timeline = 0;
          return (
            !0 !== b || dt || ((Fn = at(r)), ct.killTweensOf(S), (Fn = 0)),
            Bi(C, at(r), n),
            i.reversed && r.reverse(),
            i.paused && r.paused(!0),
            (v ||
              (!g &&
                !_ &&
                r._start === gi(C._time) &&
                Bt(v) &&
                Mi(at(r)) &&
                "nested" !== C.data)) &&
              ((r._tTime = -1e-8), r.render(Math.max(0, -m))),
            T && Fi(at(r), T),
            r
          );
        }
        lt(t, e);
        var i = t.prototype;
        return (
          (i.render = function (e, t, i) {
            var n,
              s,
              r,
              o,
              a,
              l,
              d,
              c,
              u,
              p = this._time,
              h = this._tDur,
              f = this._dur,
              g = e > h - St && e >= 0 ? h : e < St ? 0 : e;
            if (f) {
              if (
                g !== this._tTime ||
                !e ||
                i ||
                (!this._initted && this._tTime) ||
                (this._startAt && this._zTime < 0 != e < 0)
              ) {
                if (((n = g), (c = this.timeline), this._repeat)) {
                  if (((o = f + this._rDelay), this._repeat < -1 && e < 0))
                    return this.totalTime(100 * o + e, t, i);
                  if (
                    ((n = gi(g % o)),
                    g === h
                      ? ((r = this._repeat), (n = f))
                      : ((r = ~~(g / o)) && r === g / o && ((n = f), r--),
                        n > f && (n = f)),
                    (l = this._yoyo && 1 & r) &&
                      ((u = this._yEase), (n = f - n)),
                    (a = Li(this._tTime, o)),
                    n === p && !i && this._initted)
                  )
                    return this;
                  r !== a &&
                    (c && this._yEase && An(c, l),
                    !this.vars.repeatRefresh ||
                      l ||
                      this._lock ||
                      ((this._lock = i = 1),
                      (this.render(gi(o * r), !0).invalidate()._lock = 0)));
                }
                if (!this._initted) {
                  if (Ni(this, e < 0 ? e : n, i, t))
                    return (this._tTime = 0), this;
                  if (f !== this._dur) return this.render(e, t, i);
                }
                if (
                  ((this._tTime = g),
                  (this._time = n),
                  !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                  (this.ratio = d = (u || this._ease)(n / f)),
                  this._from && (this.ratio = d = 1 - d),
                  n && !p && !t && (cn(this, "onStart"), this._tTime !== g))
                )
                  return this;
                for (s = this._pt; s; ) s.r(d, s.d), (s = s._next);
                (c &&
                  c.render(
                    e < 0
                      ? e
                      : !n && l
                      ? -1e-8
                      : c._dur * c._ease(n / this._dur),
                    t,
                    i
                  )) ||
                  (this._startAt && (this._zTime = e)),
                  this._onUpdate &&
                    !t &&
                    (e < 0 && this._startAt && this._startAt.render(e, !0, i),
                    cn(this, "onUpdate")),
                  this._repeat &&
                    r !== a &&
                    this.vars.onRepeat &&
                    !t &&
                    this.parent &&
                    cn(this, "onRepeat"),
                  (g !== this._tDur && g) ||
                    this._tTime !== g ||
                    (e < 0 &&
                      this._startAt &&
                      !this._onUpdate &&
                      this._startAt.render(e, !0, !0),
                    (e || !f) &&
                      ((g === this._tDur && this._ts > 0) ||
                        (!g && this._ts < 0)) &&
                      Oi(this, 1),
                    t ||
                      (e < 0 && !p) ||
                      (!g && !p) ||
                      (cn(
                        this,
                        g === h ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(g < h && this.timeScale() > 0) &&
                        this._prom()));
              }
            } else
              !(function (e, t, i, n) {
                var s,
                  r,
                  o,
                  a = e.ratio,
                  l =
                    t < 0 ||
                    (!t &&
                      ((!e._start && Gi(e) && (e._initted || !Ri(e))) ||
                        ((e._ts < 0 || e._dp._ts < 0) && !Ri(e))))
                      ? 0
                      : 1,
                  d = e._rDelay,
                  c = 0;
                if (
                  (d &&
                    e._repeat &&
                    ((c = Xi(0, e._tDur, t)),
                    (r = Li(c, d)),
                    e._yoyo && 1 & r && (l = 1 - l),
                    r !== Li(e._tTime, d) &&
                      ((a = 1 - l),
                      e.vars.repeatRefresh && e._initted && e.invalidate())),
                  l !== a || n || e._zTime === St || (!t && e._zTime))
                ) {
                  if (!e._initted && Ni(e, t, n, i)) return;
                  for (
                    o = e._zTime,
                      e._zTime = t || (i ? St : 0),
                      i || (i = t && !o),
                      e.ratio = l,
                      e._from && (l = 1 - l),
                      e._time = 0,
                      e._tTime = c,
                      s = e._pt;
                    s;

                  )
                    s.r(l, s.d), (s = s._next);
                  e._startAt && t < 0 && e._startAt.render(t, !0, !0),
                    e._onUpdate && !i && cn(e, "onUpdate"),
                    c && e._repeat && !i && e.parent && cn(e, "onRepeat"),
                    (t >= e._tDur || t < 0) &&
                      e.ratio === l &&
                      (l && Oi(e, 1),
                      i ||
                        (cn(e, l ? "onComplete" : "onReverseComplete", !0),
                        e._prom && e._prom()));
                } else e._zTime || (e._zTime = t);
              })(this, e, t, i);
            return this;
          }),
          (i.targets = function () {
            return this._targets;
          }),
          (i.invalidate = function () {
            return (
              (this._pt =
                this._op =
                this._startAt =
                this._onUpdate =
                this._lazy =
                this.ratio =
                  0),
              (this._ptLookup = []),
              this.timeline && this.timeline.invalidate(),
              e.prototype.invalidate.call(this)
            );
          }),
          (i.kill = function (e, t) {
            if ((void 0 === t && (t = "all"), !(e || (t && "all" !== t))))
              return (this._lazy = this._pt = 0), this.parent ? un(this) : this;
            if (this.timeline) {
              var i = this.timeline.totalDuration();
              return (
                this.timeline.killTweensOf(e, t, Fn && !0 !== Fn.vars.overwrite)
                  ._first || un(this),
                this.parent &&
                  i !== this.timeline.totalDuration() &&
                  Hi(this, (this._dur * this.timeline._tDur) / i, 0, 1),
                this
              );
            }
            var n,
              s,
              r,
              o,
              a,
              l,
              d,
              c = this._targets,
              u = e ? Ji(e) : c,
              p = this._ptLookup,
              h = this._pt;
            if (
              (!t || "all" === t) &&
              (function (e, t) {
                for (
                  var i = e.length, n = i === t.length;
                  n && i-- && e[i] === t[i];

                );
                return i < 0;
              })(c, u)
            )
              return "all" === t && (this._pt = 0), un(this);
            for (
              n = this._op = this._op || [],
                "all" !== t &&
                  (Lt(t) &&
                    ((a = {}),
                    hi(t, function (e) {
                      return (a[e] = 1);
                    }),
                    (t = a)),
                  (t = (function (e, t) {
                    var i,
                      n,
                      s,
                      r,
                      o = e[0] ? ui(e[0]).harness : 0,
                      a = o && o.aliases;
                    if (!a) return t;
                    for (n in ((i = Ti({}, t)), a))
                      if ((n in i))
                        for (s = (r = a[n].split(",")).length; s--; )
                          i[r[s]] = i[n];
                    return i;
                  })(c, t))),
                d = c.length;
              d--;

            )
              if (~u.indexOf(c[d]))
                for (a in ((s = p[d]),
                "all" === t
                  ? ((n[d] = t), (o = s), (r = {}))
                  : ((r = n[d] = n[d] || {}), (o = t)),
                o))
                  (l = s && s[a]) &&
                    (("kill" in l.d && !0 !== l.d.kill(a)) ||
                      Ei(this, l, "_pt"),
                    delete s[a]),
                    "all" !== r && (r[a] = 1);
            return this._initted && !this._pt && h && un(this), this;
          }),
          (t.to = function (e, i) {
            return new t(e, i, arguments[2]);
          }),
          (t.from = function (e, t) {
            return Wi(1, arguments);
          }),
          (t.delayedCall = function (e, i, n, s) {
            return new t(i, 0, {
              immediateRender: !1,
              lazy: !1,
              overwrite: !1,
              delay: e,
              onComplete: i,
              onReverseComplete: i,
              onCompleteParams: n,
              onReverseCompleteParams: n,
              callbackScope: s,
            });
          }),
          (t.fromTo = function (e, t, i) {
            return Wi(2, arguments);
          }),
          (t.set = function (e, i) {
            return (
              (i.duration = 0), i.repeatDelay || (i.repeat = 0), new t(e, i)
            );
          }),
          (t.killTweensOf = function (e, t, i) {
            return ct.killTweensOf(e, t, i);
          }),
          t
        );
      })($n);
      wi(Yn.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0,
      }),
        hi("staggerTo,staggerFrom,staggerFromTo", function (e) {
          Yn[e] = function () {
            var t = new Bn(),
              i = Qi.call(arguments, 0);
            return (
              i.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, i)
            );
          };
        });
      var Xn = function (e, t, i) {
          return (e[t] = i);
        },
        Un = function (e, t, i) {
          return e[t](i);
        },
        Qn = function (e, t, i, n) {
          return e[t](n.fp, i);
        },
        Kn = function (e, t, i) {
          return e.setAttribute(t, i);
        },
        Zn = function (e, t) {
          return Pt(e[t]) ? Un : zt(e[t]) && e.setAttribute ? Kn : Xn;
        },
        Jn = function (e, t) {
          return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
        },
        es = function (e, t) {
          return t.set(t.t, t.p, !!(t.s + t.c * e), t);
        },
        ts = function (e, t) {
          var i = t._pt,
            n = "";
          if (!e && t.b) n = t.b;
          else if (1 === e && t.e) n = t.e;
          else {
            for (; i; )
              (n =
                i.p +
                (i.m
                  ? i.m(i.s + i.c * e)
                  : Math.round(1e4 * (i.s + i.c * e)) / 1e4) +
                n),
                (i = i._next);
            n += t.c;
          }
          t.set(t.t, t.p, n, t);
        },
        is = function (e, t) {
          for (var i = t._pt; i; ) i.r(e, i.d), (i = i._next);
        },
        ns = function (e, t, i, n) {
          for (var s, r = this._pt; r; )
            (s = r._next), r.p === n && r.modifier(e, t, i), (r = s);
        },
        ss = function (e) {
          for (var t, i, n = this._pt; n; )
            (i = n._next),
              (n.p === e && !n.op) || n.op === e
                ? Ei(this, n, "_pt")
                : n.dep || (t = 1),
              (n = i);
          return !t;
        },
        rs = function (e, t, i, n) {
          n.mSet(e, t, n.m.call(n.tween, i, n.mt), n);
        },
        os = function (e) {
          for (var t, i, n, s, r = e._pt; r; ) {
            for (t = r._next, i = n; i && i.pr > r.pr; ) i = i._next;
            (r._prev = i ? i._prev : s) ? (r._prev._next = r) : (n = r),
              (r._next = i) ? (i._prev = r) : (s = r),
              (r = t);
          }
          e._pt = n;
        },
        as = (function () {
          function e(e, t, i, n, s, r, o, a, l) {
            (this.t = t),
              (this.s = n),
              (this.c = s),
              (this.p = i),
              (this.r = r || Jn),
              (this.d = o || this),
              (this.set = a || Xn),
              (this.pr = l || 0),
              (this._next = e),
              e && (e._prev = this);
          }
          return (
            (e.prototype.modifier = function (e, t, i) {
              (this.mSet = this.mSet || this.set),
                (this.set = rs),
                (this.m = e),
                (this.mt = i),
                (this.tween = t);
            }),
            e
          );
        })();
      hi(
        di +
          "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
        function (e) {
          return (ii[e] = 1);
        }
      ),
        (Ut.TweenMax = Ut.TweenLite = Yn),
        (Ut.TimelineLite = Ut.TimelineMax = Bn),
        (ct = new Bn({
          sortChildren: !1,
          defaults: xt,
          autoRemoveChildren: !0,
          id: "root",
          smoothChildTiming: !0,
        })),
        (Tt.stringFilter = wn);
      var ls = {
        registerPlugin: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          t.forEach(function (e) {
            return pn(e);
          });
        },
        timeline: function (e) {
          return new Bn(e);
        },
        getTweensOf: function (e, t) {
          return ct.getTweensOf(e, t);
        },
        getProperty: function (e, t, i, n) {
          Lt(e) && (e = Ji(e)[0]);
          var s = ui(e || {}).get,
            r = i ? _i : bi;
          return (
            "native" === i && (i = ""),
            e
              ? t
                ? r(((ri[t] && ri[t].get) || s)(e, t, i, n))
                : function (t, i, n) {
                    return r(((ri[t] && ri[t].get) || s)(e, t, i, n));
                  }
              : e
          );
        },
        quickSetter: function (e, t, i) {
          if ((e = Ji(e)).length > 1) {
            var n = e.map(function (e) {
                return us.quickSetter(e, t, i);
              }),
              s = n.length;
            return function (e) {
              for (var t = s; t--; ) n[t](e);
            };
          }
          e = e[0] || {};
          var r = ri[t],
            o = ui(e),
            a = (o.harness && (o.harness.aliases || {})[t]) || t,
            l = r
              ? function (t) {
                  var n = new r();
                  (mt._pt = 0),
                    n.init(e, i ? t + i : t, mt, 0, [e]),
                    n.render(1, n),
                    mt._pt && is(1, mt);
                }
              : o.set(e, a);
          return r
            ? l
            : function (t) {
                return l(e, a, i ? t + i : t, o, 1);
              };
        },
        isTweening: function (e) {
          return ct.getTweensOf(e, !0).length > 0;
        },
        defaults: function (e) {
          return e && e.ease && (e.ease = Mn(e.ease, xt.ease)), xi(xt, e || {});
        },
        config: function (e) {
          return xi(Tt, e || {});
        },
        registerEffect: function (e) {
          var t = e.name,
            i = e.effect,
            n = e.plugins,
            s = e.defaults,
            r = e.extendTimeline;
          (n || "").split(",").forEach(function (e) {
            return (
              e &&
              !ri[e] &&
              !Ut[e] &&
              Jt(t + " effect requires " + e + " plugin.")
            );
          }),
            (oi[t] = function (e, t, n) {
              return i(Ji(e), wi(t || {}, s), n);
            }),
            r &&
              (Bn.prototype[t] = function (e, i, n) {
                return this.add(oi[t](e, $t(i) ? i : (n = i) && {}, this), n);
              });
        },
        registerEase: function (e, t) {
          Cn[e] = Mn(t);
        },
        parseEase: function (e, t) {
          return arguments.length ? Mn(e, t) : Cn;
        },
        getById: function (e) {
          return ct.getById(e);
        },
        exportRoot: function (e, t) {
          void 0 === e && (e = {});
          var i,
            n,
            s = new Bn(e);
          for (
            s.smoothChildTiming = Bt(e.smoothChildTiming),
              ct.remove(s),
              s._dp = 0,
              s._time = s._tTime = ct._time,
              i = ct._first;
            i;

          )
            (n = i._next),
              (!t &&
                !i._dur &&
                i instanceof Yn &&
                i.vars.onComplete === i._targets[0]) ||
                Bi(s, i, i._start - i._delay),
              (i = n);
          return Bi(ct, s, 0), s;
        },
        utils: {
          wrap: function e(t, i, n) {
            var s = i - t;
            return Rt(t)
              ? on(t, e(0, t.length), i)
              : Yi(n, function (e) {
                  return ((s + ((e - t) % s)) % s) + t;
                });
          },
          wrapYoyo: function e(t, i, n) {
            var s = i - t,
              r = 2 * s;
            return Rt(t)
              ? on(t, e(0, t.length - 1), i)
              : Yi(n, function (e) {
                  return (
                    t + ((e = (r + ((e - t) % r)) % r || 0) > s ? r - e : e)
                  );
                });
          },
          distribute: tn,
          random: rn,
          snap: sn,
          normalize: function (e, t, i) {
            return ln(e, t, 0, 1, i);
          },
          getUnit: Ui,
          clamp: function (e, t, i) {
            return Yi(i, function (i) {
              return Xi(e, t, i);
            });
          },
          splitColor: mn,
          toArray: Ji,
          selector: function (e) {
            return (
              (e = Ji(e)[0] || Jt("Invalid scope") || {}),
              function (t) {
                var i = e.current || e.nativeElement || e;
                return Ji(
                  t,
                  i.querySelectorAll
                    ? i
                    : i === e
                    ? Jt("Invalid scope") || ht.createElement("div")
                    : e
                );
              }
            );
          },
          mapRange: ln,
          pipe: function () {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
              t[i] = arguments[i];
            return function (e) {
              return t.reduce(function (e, t) {
                return t(e);
              }, e);
            };
          },
          unitize: function (e, t) {
            return function (i) {
              return e(parseFloat(i)) + (t || Ui(i));
            };
          },
          interpolate: function e(t, i, n, s) {
            var r = isNaN(t + i)
              ? 0
              : function (e) {
                  return (1 - e) * t + e * i;
                };
            if (!r) {
              var o,
                a,
                l,
                d,
                c,
                u = Lt(t),
                p = {};
              if ((!0 === n && (s = 1) && (n = null), u))
                (t = { p: t }), (i = { p: i });
              else if (Rt(t) && !Rt(i)) {
                for (l = [], d = t.length, c = d - 2, a = 1; a < d; a++)
                  l.push(e(t[a - 1], t[a]));
                d--,
                  (r = function (e) {
                    e *= d;
                    var t = Math.min(c, ~~e);
                    return l[t](e - t);
                  }),
                  (n = i);
              } else s || (t = Ti(Rt(t) ? [] : {}, t));
              if (!l) {
                for (o in i) Gn.call(p, t, o, "get", i[o]);
                r = function (e) {
                  return is(e, p) || (u ? t.p : t);
                };
              }
            }
            return Yi(n, r);
          },
          shuffle: en,
        },
        install: Kt,
        effects: oi,
        ticker: Tn,
        updateRoot: Bn.updateRoot,
        plugins: ri,
        globalTimeline: ct,
        core: {
          PropTween: as,
          globals: ei,
          Tween: Yn,
          Timeline: Bn,
          Animation: $n,
          getCache: ui,
          _removeLinkedListItem: Ei,
          suppressOverwrites: function (e) {
            return (dt = e);
          },
        },
      };
      hi("to,from,fromTo,delayedCall,set,killTweensOf", function (e) {
        return (ls[e] = Yn[e]);
      }),
        Tn.add(Bn.updateRoot),
        (mt = ls.to({}, { duration: 0 }));
      var ds = function (e, t) {
          for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
            i = i._next;
          return i;
        },
        cs = function (e, t) {
          return {
            name: e,
            rawVars: 1,
            init: function (e, i, n) {
              n._onInit = function (e) {
                var n, s;
                if (
                  (Lt(i) &&
                    ((n = {}),
                    hi(i, function (e) {
                      return (n[e] = 1);
                    }),
                    (i = n)),
                  t)
                ) {
                  for (s in ((n = {}), i)) n[s] = t(i[s]);
                  i = n;
                }
                !(function (e, t) {
                  var i,
                    n,
                    s,
                    r = e._targets;
                  for (i in t)
                    for (n = r.length; n--; )
                      (s = e._ptLookup[n][i]) &&
                        (s = s.d) &&
                        (s._pt && (s = ds(s, i)),
                        s && s.modifier && s.modifier(t[i], e, r[n], i));
                })(e, i);
              };
            },
          };
        },
        us =
          ls.registerPlugin(
            {
              name: "attr",
              init: function (e, t, i, n, s) {
                var r, o;
                for (r in t)
                  (o = this.add(
                    e,
                    "setAttribute",
                    (e.getAttribute(r) || 0) + "",
                    t[r],
                    n,
                    s,
                    0,
                    0,
                    r
                  )) && (o.op = r),
                    this._props.push(r);
              },
            },
            {
              name: "endArray",
              init: function (e, t) {
                for (var i = t.length; i--; ) this.add(e, i, e[i] || 0, t[i]);
              },
            },
            cs("roundProps", nn),
            cs("modifiers"),
            cs("snap", sn)
          ) || ls;
      (Yn.version = Bn.version = us.version = "3.9.1"), (ft = 1), Ft() && xn();
      Cn.Power0,
        Cn.Power1,
        Cn.Power2,
        Cn.Power3,
        Cn.Power4,
        Cn.Linear,
        Cn.Quad,
        Cn.Cubic,
        Cn.Quart,
        Cn.Quint,
        Cn.Strong,
        Cn.Elastic,
        Cn.Back,
        Cn.SteppedEase,
        Cn.Bounce,
        Cn.Sine,
        Cn.Expo,
        Cn.Circ;
      var ps,
        hs,
        fs,
        gs,
        ms,
        vs,
        ys,
        bs = {},
        _s = 180 / Math.PI,
        ws = Math.PI / 180,
        Ts = Math.atan2,
        xs = /([A-Z])/g,
        Cs = /(?:left|right|width|margin|padding|x)/i,
        Ss = /[\s,\(]\S/,
        Es = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        Os = function (e, t) {
          return t.set(
            t.t,
            t.p,
            Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
            t
          );
        },
        ks = function (e, t) {
          return t.set(
            t.t,
            t.p,
            1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
            t
          );
        },
        As = function (e, t) {
          return t.set(
            t.t,
            t.p,
            e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b,
            t
          );
        },
        Ms = function (e, t) {
          var i = t.s + t.c * e;
          t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
        },
        Is = function (e, t) {
          return t.set(t.t, t.p, e ? t.e : t.b, t);
        },
        Ls = function (e, t) {
          return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
        },
        Ps = function (e, t, i) {
          return (e.style[t] = i);
        },
        Ds = function (e, t, i) {
          return e.style.setProperty(t, i);
        },
        zs = function (e, t, i) {
          return (e._gsap[t] = i);
        },
        $s = function (e, t, i) {
          return (e._gsap.scaleX = e._gsap.scaleY = i);
        },
        Bs = function (e, t, i, n, s) {
          var r = e._gsap;
          (r.scaleX = r.scaleY = i), r.renderTransform(s, r);
        },
        Fs = function (e, t, i, n, s) {
          var r = e._gsap;
          (r[t] = i), r.renderTransform(s, r);
        },
        Ns = "transform",
        Gs = Ns + "Origin",
        Rs = function (e, t) {
          var i = hs.createElementNS
            ? hs.createElementNS(
                (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                e
              )
            : hs.createElement(e);
          return i.style ? i : hs.createElement(e);
        },
        Hs = function e(t, i, n) {
          var s = getComputedStyle(t);
          return (
            s[i] ||
            s.getPropertyValue(i.replace(xs, "-$1").toLowerCase()) ||
            s.getPropertyValue(i) ||
            (!n && e(t, Vs(i) || i, 1)) ||
            ""
          );
        },
        qs = "O,Moz,ms,Ms,Webkit".split(","),
        Vs = function (e, t, i) {
          var n = (t || ms).style,
            s = 5;
          if (e in n && !i) return e;
          for (
            e = e.charAt(0).toUpperCase() + e.substr(1);
            s-- && !(qs[s] + e in n);

          );
          return s < 0 ? null : (3 === s ? "ms" : s >= 0 ? qs[s] : "") + e;
        },
        js = function () {
          "undefined" != typeof window &&
            window.document &&
            ((ps = window),
            (hs = ps.document),
            (fs = hs.documentElement),
            (ms = Rs("div") || { style: {} }),
            Rs("div"),
            (Ns = Vs(Ns)),
            (Gs = Ns + "Origin"),
            (ms.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (ys = !!Vs("perspective")),
            (gs = 1));
        },
        Ws = function e(t) {
          var i,
            n = Rs(
              "svg",
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            s = this.parentNode,
            r = this.nextSibling,
            o = this.style.cssText;
          if (
            (fs.appendChild(n),
            n.appendChild(this),
            (this.style.display = "block"),
            t)
          )
            try {
              (i = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = e);
            } catch (e) {}
          else this._gsapBBox && (i = this._gsapBBox());
          return (
            s && (r ? s.insertBefore(this, r) : s.appendChild(this)),
            fs.removeChild(n),
            (this.style.cssText = o),
            i
          );
        },
        Ys = function (e, t) {
          for (var i = t.length; i--; )
            if (e.hasAttribute(t[i])) return e.getAttribute(t[i]);
        },
        Xs = function (e) {
          var t;
          try {
            t = e.getBBox();
          } catch (i) {
            t = Ws.call(e, !0);
          }
          return (
            (t && (t.width || t.height)) ||
              e.getBBox === Ws ||
              (t = Ws.call(e, !0)),
            !t || t.width || t.x || t.y
              ? t
              : {
                  x: +Ys(e, ["x", "cx", "x1"]) || 0,
                  y: +Ys(e, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        Us = function (e) {
          return !(!e.getCTM || (e.parentNode && !e.ownerSVGElement) || !Xs(e));
        },
        Qs = function (e, t) {
          if (t) {
            var i = e.style;
            t in bs && t !== Gs && (t = Ns),
              i.removeProperty
                ? (("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6)) ||
                    (t = "-" + t),
                  i.removeProperty(t.replace(xs, "-$1").toLowerCase()))
                : i.removeAttribute(t);
          }
        },
        Ks = function (e, t, i, n, s, r) {
          var o = new as(e._pt, t, i, 0, 1, r ? Ls : Is);
          return (e._pt = o), (o.b = n), (o.e = s), e._props.push(i), o;
        },
        Zs = { deg: 1, rad: 1, turn: 1 },
        Js = function e(t, i, n, s) {
          var r,
            o,
            a,
            l,
            d = parseFloat(n) || 0,
            c = (n + "").trim().substr((d + "").length) || "px",
            u = ms.style,
            p = Cs.test(i),
            h = "svg" === t.tagName.toLowerCase(),
            f = (h ? "client" : "offset") + (p ? "Width" : "Height"),
            g = 100,
            m = "px" === s,
            v = "%" === s;
          return s === c || !d || Zs[s] || Zs[c]
            ? d
            : ("px" !== c && !m && (d = e(t, i, n, "px")),
              (l = t.getCTM && Us(t)),
              (!v && "%" !== c) || (!bs[i] && !~i.indexOf("adius"))
                ? ((u[p ? "width" : "height"] = g + (m ? c : s)),
                  (o =
                    ~i.indexOf("adius") || ("em" === s && t.appendChild && !h)
                      ? t
                      : t.parentNode),
                  l && (o = (t.ownerSVGElement || {}).parentNode),
                  (o && o !== hs && o.appendChild) || (o = hs.body),
                  (a = o._gsap) && v && a.width && p && a.time === Tn.time
                    ? fi((d / a.width) * g)
                    : ((v || "%" === c) && (u.position = Hs(t, "position")),
                      o === t && (u.position = "static"),
                      o.appendChild(ms),
                      (r = ms[f]),
                      o.removeChild(ms),
                      (u.position = "absolute"),
                      p &&
                        v &&
                        (((a = ui(o)).time = Tn.time), (a.width = o[f])),
                      fi(m ? (r * d) / g : r && d ? (g / r) * d : 0)))
                : ((r = l ? t.getBBox()[p ? "width" : "height"] : t[f]),
                  fi(v ? (d / r) * g : (d / 100) * r)));
        },
        er = function (e, t, i, n) {
          var s;
          return (
            gs || js(),
            t in Es &&
              "transform" !== t &&
              ~(t = Es[t]).indexOf(",") &&
              (t = t.split(",")[0]),
            bs[t] && "transform" !== t
              ? ((s = pr(e, n)),
                (s =
                  "transformOrigin" !== t
                    ? s[t]
                    : s.svg
                    ? s.origin
                    : hr(Hs(e, Gs)) + " " + s.zOrigin + "px"))
              : (!(s = e.style[t]) ||
                  "auto" === s ||
                  n ||
                  ~(s + "").indexOf("calc(")) &&
                (s =
                  (rr[t] && rr[t](e, t, i)) ||
                  Hs(e, t) ||
                  pi(e, t) ||
                  ("opacity" === t ? 1 : 0)),
            i && !~(s + "").trim().indexOf(" ") ? Js(e, t, s, i) + i : s
          );
        },
        tr = function (e, t, i, n) {
          if (!i || "none" === i) {
            var s = Vs(t, e, 1),
              r = s && Hs(e, s, 1);
            r && r !== i
              ? ((t = s), (i = r))
              : "borderColor" === t && (i = Hs(e, "borderTopColor"));
          }
          var o,
            a,
            l,
            d,
            c,
            u,
            p,
            h,
            f,
            g,
            m,
            v,
            y = new as(this._pt, e.style, t, 0, 1, ts),
            b = 0,
            _ = 0;
          if (
            ((y.b = i),
            (y.e = n),
            (i += ""),
            "auto" === (n += "") &&
              ((e.style[t] = n), (n = Hs(e, t) || n), (e.style[t] = i)),
            wn((o = [i, n])),
            (n = o[1]),
            (l = (i = o[0]).match(Vt) || []),
            (n.match(Vt) || []).length)
          ) {
            for (; (a = Vt.exec(n)); )
              (p = a[0]),
                (f = n.substring(b, a.index)),
                c
                  ? (c = (c + 1) % 5)
                  : ("rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5)) ||
                    (c = 1),
                p !== (u = l[_++] || "") &&
                  ((d = parseFloat(u) || 0),
                  (m = u.substr((d + "").length)),
                  (v = "=" === p.charAt(1) ? +(p.charAt(0) + "1") : 0) &&
                    (p = p.substr(2)),
                  (h = parseFloat(p)),
                  (g = p.substr((h + "").length)),
                  (b = Vt.lastIndex - g.length),
                  g ||
                    ((g = g || Tt.units[t] || m),
                    b === n.length && ((n += g), (y.e += g))),
                  m !== g && (d = Js(e, t, u, g) || 0),
                  (y._pt = {
                    _next: y._pt,
                    p: f || 1 === _ ? f : ",",
                    s: d,
                    c: v ? v * h : h - d,
                    m: (c && c < 4) || "zIndex" === t ? Math.round : 0,
                  }));
            y.c = b < n.length ? n.substring(b, n.length) : "";
          } else y.r = "display" === t && "none" === n ? Ls : Is;
          return Wt.test(n) && (y.e = 0), (this._pt = y), y;
        },
        ir = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        nr = function (e) {
          var t = e.split(" "),
            i = t[0],
            n = t[1] || "50%";
          return (
            ("top" !== i && "bottom" !== i && "left" !== n && "right" !== n) ||
              ((e = i), (i = n), (n = e)),
            (t[0] = ir[i] || i),
            (t[1] = ir[n] || n),
            t.join(" ")
          );
        },
        sr = function (e, t) {
          if (t.tween && t.tween._time === t.tween._dur) {
            var i,
              n,
              s,
              r = t.t,
              o = r.style,
              a = t.u,
              l = r._gsap;
            if ("all" === a || !0 === a) (o.cssText = ""), (n = 1);
            else
              for (s = (a = a.split(",")).length; --s > -1; )
                (i = a[s]),
                  bs[i] && ((n = 1), (i = "transformOrigin" === i ? Gs : Ns)),
                  Qs(r, i);
            n &&
              (Qs(r, Ns),
              l &&
                (l.svg && r.removeAttribute("transform"),
                pr(r, 1),
                (l.uncache = 1)));
          }
        },
        rr = {
          clearProps: function (e, t, i, n, s) {
            if ("isFromStart" !== s.data) {
              var r = (e._pt = new as(e._pt, t, i, 0, 0, sr));
              return (
                (r.u = n), (r.pr = -10), (r.tween = s), e._props.push(i), 1
              );
            }
          },
        },
        or = [1, 0, 0, 1, 0, 0],
        ar = {},
        lr = function (e) {
          return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
        },
        dr = function (e) {
          var t = Hs(e, Ns);
          return lr(t) ? or : t.substr(7).match(qt).map(fi);
        },
        cr = function (e, t) {
          var i,
            n,
            s,
            r,
            o = e._gsap || ui(e),
            a = e.style,
            l = dr(e);
          return o.svg && e.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (l = [
                (s = e.transform.baseVal.consolidate().matrix).a,
                s.b,
                s.c,
                s.d,
                s.e,
                s.f,
              ]).join(",")
              ? or
              : l
            : (l !== or ||
                e.offsetParent ||
                e === fs ||
                o.svg ||
                ((s = a.display),
                (a.display = "block"),
                ((i = e.parentNode) && e.offsetParent) ||
                  ((r = 1), (n = e.nextSibling), fs.appendChild(e)),
                (l = dr(e)),
                s ? (a.display = s) : Qs(e, "display"),
                r &&
                  (n
                    ? i.insertBefore(e, n)
                    : i
                    ? i.appendChild(e)
                    : fs.removeChild(e))),
              t && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
        },
        ur = function (e, t, i, n, s, r) {
          var o,
            a,
            l,
            d = e._gsap,
            c = s || cr(e, !0),
            u = d.xOrigin || 0,
            p = d.yOrigin || 0,
            h = d.xOffset || 0,
            f = d.yOffset || 0,
            g = c[0],
            m = c[1],
            v = c[2],
            y = c[3],
            b = c[4],
            _ = c[5],
            w = t.split(" "),
            T = parseFloat(w[0]) || 0,
            x = parseFloat(w[1]) || 0;
          i
            ? c !== or &&
              (a = g * y - m * v) &&
              ((l = T * (-m / a) + x * (g / a) - (g * _ - m * b) / a),
              (T = T * (y / a) + x * (-v / a) + (v * _ - y * b) / a),
              (x = l))
            : ((T =
                (o = Xs(e)).x + (~w[0].indexOf("%") ? (T / 100) * o.width : T)),
              (x =
                o.y +
                (~(w[1] || w[0]).indexOf("%") ? (x / 100) * o.height : x))),
            n || (!1 !== n && d.smooth)
              ? ((b = T - u),
                (_ = x - p),
                (d.xOffset = h + (b * g + _ * v) - b),
                (d.yOffset = f + (b * m + _ * y) - _))
              : (d.xOffset = d.yOffset = 0),
            (d.xOrigin = T),
            (d.yOrigin = x),
            (d.smooth = !!n),
            (d.origin = t),
            (d.originIsAbsolute = !!i),
            (e.style[Gs] = "0px 0px"),
            r &&
              (Ks(r, d, "xOrigin", u, T),
              Ks(r, d, "yOrigin", p, x),
              Ks(r, d, "xOffset", h, d.xOffset),
              Ks(r, d, "yOffset", f, d.yOffset)),
            e.setAttribute("data-svg-origin", T + " " + x);
        },
        pr = function (e, t) {
          var i = e._gsap || new zn(e);
          if ("x" in i && !t && !i.uncache) return i;
          var n,
            s,
            r,
            o,
            a,
            l,
            d,
            c,
            u,
            p,
            h,
            f,
            g,
            m,
            v,
            y,
            b,
            _,
            w,
            T,
            x,
            C,
            S,
            E,
            O,
            k,
            A,
            M,
            I,
            L,
            P,
            D,
            z = e.style,
            $ = i.scaleX < 0,
            B = "px",
            F = "deg",
            N = Hs(e, Gs) || "0";
          return (
            (n = s = r = l = d = c = u = p = h = 0),
            (o = a = 1),
            (i.svg = !(!e.getCTM || !Us(e))),
            (m = cr(e, i.svg)),
            i.svg &&
              ((E =
                (!i.uncache || "0px 0px" === N) &&
                !t &&
                e.getAttribute("data-svg-origin")),
              ur(e, E || N, !!E || i.originIsAbsolute, !1 !== i.smooth, m)),
            (f = i.xOrigin || 0),
            (g = i.yOrigin || 0),
            m !== or &&
              ((_ = m[0]),
              (w = m[1]),
              (T = m[2]),
              (x = m[3]),
              (n = C = m[4]),
              (s = S = m[5]),
              6 === m.length
                ? ((o = Math.sqrt(_ * _ + w * w)),
                  (a = Math.sqrt(x * x + T * T)),
                  (l = _ || w ? Ts(w, _) * _s : 0),
                  (u = T || x ? Ts(T, x) * _s + l : 0) &&
                    (a *= Math.abs(Math.cos(u * ws))),
                  i.svg &&
                    ((n -= f - (f * _ + g * T)), (s -= g - (f * w + g * x))))
                : ((D = m[6]),
                  (L = m[7]),
                  (A = m[8]),
                  (M = m[9]),
                  (I = m[10]),
                  (P = m[11]),
                  (n = m[12]),
                  (s = m[13]),
                  (r = m[14]),
                  (d = (v = Ts(D, I)) * _s),
                  v &&
                    ((E = C * (y = Math.cos(-v)) + A * (b = Math.sin(-v))),
                    (O = S * y + M * b),
                    (k = D * y + I * b),
                    (A = C * -b + A * y),
                    (M = S * -b + M * y),
                    (I = D * -b + I * y),
                    (P = L * -b + P * y),
                    (C = E),
                    (S = O),
                    (D = k)),
                  (c = (v = Ts(-T, I)) * _s),
                  v &&
                    ((y = Math.cos(-v)),
                    (P = x * (b = Math.sin(-v)) + P * y),
                    (_ = E = _ * y - A * b),
                    (w = O = w * y - M * b),
                    (T = k = T * y - I * b)),
                  (l = (v = Ts(w, _)) * _s),
                  v &&
                    ((E = _ * (y = Math.cos(v)) + w * (b = Math.sin(v))),
                    (O = C * y + S * b),
                    (w = w * y - _ * b),
                    (S = S * y - C * b),
                    (_ = E),
                    (C = O)),
                  d &&
                    Math.abs(d) + Math.abs(l) > 359.9 &&
                    ((d = l = 0), (c = 180 - c)),
                  (o = fi(Math.sqrt(_ * _ + w * w + T * T))),
                  (a = fi(Math.sqrt(S * S + D * D))),
                  (v = Ts(C, S)),
                  (u = Math.abs(v) > 2e-4 ? v * _s : 0),
                  (h = P ? 1 / (P < 0 ? -P : P) : 0)),
              i.svg &&
                ((E = e.getAttribute("transform")),
                (i.forceCSS =
                  e.setAttribute("transform", "") || !lr(Hs(e, Ns))),
                E && e.setAttribute("transform", E))),
            Math.abs(u) > 90 &&
              Math.abs(u) < 270 &&
              ($
                ? ((o *= -1),
                  (u += l <= 0 ? 180 : -180),
                  (l += l <= 0 ? 180 : -180))
                : ((a *= -1), (u += u <= 0 ? 180 : -180))),
            (i.x =
              n -
              ((i.xPercent =
                n &&
                (i.xPercent ||
                  (Math.round(e.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
                ? (e.offsetWidth * i.xPercent) / 100
                : 0) +
              B),
            (i.y =
              s -
              ((i.yPercent =
                s &&
                (i.yPercent ||
                  (Math.round(e.offsetHeight / 2) === Math.round(-s)
                    ? -50
                    : 0)))
                ? (e.offsetHeight * i.yPercent) / 100
                : 0) +
              B),
            (i.z = r + B),
            (i.scaleX = fi(o)),
            (i.scaleY = fi(a)),
            (i.rotation = fi(l) + F),
            (i.rotationX = fi(d) + F),
            (i.rotationY = fi(c) + F),
            (i.skewX = u + F),
            (i.skewY = p + F),
            (i.transformPerspective = h + B),
            (i.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (z[Gs] = hr(N)),
            (i.xOffset = i.yOffset = 0),
            (i.force3D = Tt.force3D),
            (i.renderTransform = i.svg ? _r : ys ? br : gr),
            (i.uncache = 0),
            i
          );
        },
        hr = function (e) {
          return (e = e.split(" "))[0] + " " + e[1];
        },
        fr = function (e, t, i) {
          var n = Ui(t);
          return fi(parseFloat(t) + parseFloat(Js(e, "x", i + "px", n))) + n;
        },
        gr = function (e, t) {
          (t.z = "0px"),
            (t.rotationY = t.rotationX = "0deg"),
            (t.force3D = 0),
            br(e, t);
        },
        mr = "0deg",
        vr = "0px",
        yr = ") ",
        br = function (e, t) {
          var i = t || this,
            n = i.xPercent,
            s = i.yPercent,
            r = i.x,
            o = i.y,
            a = i.z,
            l = i.rotation,
            d = i.rotationY,
            c = i.rotationX,
            u = i.skewX,
            p = i.skewY,
            h = i.scaleX,
            f = i.scaleY,
            g = i.transformPerspective,
            m = i.force3D,
            v = i.target,
            y = i.zOrigin,
            b = "",
            _ = ("auto" === m && e && 1 !== e) || !0 === m;
          if (y && (c !== mr || d !== mr)) {
            var w,
              T = parseFloat(d) * ws,
              x = Math.sin(T),
              C = Math.cos(T);
            (T = parseFloat(c) * ws),
              (w = Math.cos(T)),
              (r = fr(v, r, x * w * -y)),
              (o = fr(v, o, -Math.sin(T) * -y)),
              (a = fr(v, a, C * w * -y + y));
          }
          g !== vr && (b += "perspective(" + g + yr),
            (n || s) && (b += "translate(" + n + "%, " + s + "%) "),
            (_ || r !== vr || o !== vr || a !== vr) &&
              (b +=
                a !== vr || _
                  ? "translate3d(" + r + ", " + o + ", " + a + ") "
                  : "translate(" + r + ", " + o + yr),
            l !== mr && (b += "rotate(" + l + yr),
            d !== mr && (b += "rotateY(" + d + yr),
            c !== mr && (b += "rotateX(" + c + yr),
            (u === mr && p === mr) || (b += "skew(" + u + ", " + p + yr),
            (1 === h && 1 === f) || (b += "scale(" + h + ", " + f + yr),
            (v.style[Ns] = b || "translate(0, 0)");
        },
        _r = function (e, t) {
          var i,
            n,
            s,
            r,
            o,
            a = t || this,
            l = a.xPercent,
            d = a.yPercent,
            c = a.x,
            u = a.y,
            p = a.rotation,
            h = a.skewX,
            f = a.skewY,
            g = a.scaleX,
            m = a.scaleY,
            v = a.target,
            y = a.xOrigin,
            b = a.yOrigin,
            _ = a.xOffset,
            w = a.yOffset,
            T = a.forceCSS,
            x = parseFloat(c),
            C = parseFloat(u);
          (p = parseFloat(p)),
            (h = parseFloat(h)),
            (f = parseFloat(f)) && ((h += f = parseFloat(f)), (p += f)),
            p || h
              ? ((p *= ws),
                (h *= ws),
                (i = Math.cos(p) * g),
                (n = Math.sin(p) * g),
                (s = Math.sin(p - h) * -m),
                (r = Math.cos(p - h) * m),
                h &&
                  ((f *= ws),
                  (o = Math.tan(h - f)),
                  (s *= o = Math.sqrt(1 + o * o)),
                  (r *= o),
                  f &&
                    ((o = Math.tan(f)),
                    (i *= o = Math.sqrt(1 + o * o)),
                    (n *= o))),
                (i = fi(i)),
                (n = fi(n)),
                (s = fi(s)),
                (r = fi(r)))
              : ((i = g), (r = m), (n = s = 0)),
            ((x && !~(c + "").indexOf("px")) ||
              (C && !~(u + "").indexOf("px"))) &&
              ((x = Js(v, "x", c, "px")), (C = Js(v, "y", u, "px"))),
            (y || b || _ || w) &&
              ((x = fi(x + y - (y * i + b * s) + _)),
              (C = fi(C + b - (y * n + b * r) + w))),
            (l || d) &&
              ((o = v.getBBox()),
              (x = fi(x + (l / 100) * o.width)),
              (C = fi(C + (d / 100) * o.height))),
            (o =
              "matrix(" +
              i +
              "," +
              n +
              "," +
              s +
              "," +
              r +
              "," +
              x +
              "," +
              C +
              ")"),
            v.setAttribute("transform", o),
            T && (v.style[Ns] = o);
        },
        wr = function (e, t, i, n, s, r) {
          var o,
            a,
            l = 360,
            d = Lt(s),
            c = parseFloat(s) * (d && ~s.indexOf("rad") ? _s : 1),
            u = r ? c * r : c - n,
            p = n + u + "deg";
          return (
            d &&
              ("short" === (o = s.split("_")[1]) &&
                (u %= l) !== u % 180 &&
                (u += u < 0 ? l : -360),
              "cw" === o && u < 0
                ? (u = ((u + 36e9) % l) - ~~(u / l) * l)
                : "ccw" === o &&
                  u > 0 &&
                  (u = ((u - 36e9) % l) - ~~(u / l) * l)),
            (e._pt = a = new as(e._pt, t, i, n, u, ks)),
            (a.e = p),
            (a.u = "deg"),
            e._props.push(i),
            a
          );
        },
        Tr = function (e, t) {
          for (var i in t) e[i] = t[i];
          return e;
        },
        xr = function (e, t, i) {
          var n,
            s,
            r,
            o,
            a,
            l,
            d,
            c = Tr({}, i._gsap),
            u = i.style;
          for (s in (c.svg
            ? ((r = i.getAttribute("transform")),
              i.setAttribute("transform", ""),
              (u[Ns] = t),
              (n = pr(i, 1)),
              Qs(i, Ns),
              i.setAttribute("transform", r))
            : ((r = getComputedStyle(i)[Ns]),
              (u[Ns] = t),
              (n = pr(i, 1)),
              (u[Ns] = r)),
          bs))
            (r = c[s]) !== (o = n[s]) &&
              "perspective,force3D,transformOrigin,svgOrigin".indexOf(s) < 0 &&
              ((a = Ui(r) !== (d = Ui(o)) ? Js(i, s, r, d) : parseFloat(r)),
              (l = parseFloat(o)),
              (e._pt = new as(e._pt, n, s, a, l - a, Os)),
              (e._pt.u = d || 0),
              e._props.push(s));
          Tr(n, c);
        };
      hi("padding,margin,Width,Radius", function (e, t) {
        var i = "Top",
          n = "Right",
          s = "Bottom",
          r = "Left",
          o = (t < 3 ? [i, n, s, r] : [i + r, i + n, s + n, s + r]).map(
            function (i) {
              return t < 2 ? e + i : "border" + i + e;
            }
          );
        rr[t > 1 ? "border" + e : e] = function (e, t, i, n, s) {
          var r, a;
          if (arguments.length < 4)
            return (
              (r = o.map(function (t) {
                return er(e, t, i);
              })),
              5 === (a = r.join(" ")).split(r[0]).length ? r[0] : a
            );
          (r = (n + "").split(" ")),
            (a = {}),
            o.forEach(function (e, t) {
              return (a[e] = r[t] = r[t] || r[((t - 1) / 2) | 0]);
            }),
            e.init(t, a, s);
        };
      });
      var Cr,
        Sr,
        Er,
        Or = {
          name: "css",
          register: js,
          targetTest: function (e) {
            return e.style && e.nodeType;
          },
          init: function (e, t, i, n, s) {
            var r,
              o,
              a,
              l,
              d,
              c,
              u,
              p,
              h,
              f,
              g,
              m,
              v,
              y,
              b,
              _ = this._props,
              w = e.style,
              T = i.vars.startAt;
            for (u in (gs || js(), t))
              if (
                "autoRound" !== u &&
                ((o = t[u]), !ri[u] || !Rn(u, t, i, n, e, s))
              )
                if (
                  ((d = typeof o),
                  (c = rr[u]),
                  "function" === d && (d = typeof (o = o.call(i, n, e, s))),
                  "string" === d && ~o.indexOf("random(") && (o = an(o)),
                  c)
                )
                  c(this, e, u, o, i) && (b = 1);
                else if ("--" === u.substr(0, 2))
                  (r = (getComputedStyle(e).getPropertyValue(u) + "").trim()),
                    (o += ""),
                    (bn.lastIndex = 0),
                    bn.test(r) || ((p = Ui(r)), (h = Ui(o))),
                    h ? p !== h && (r = Js(e, u, r, h) + h) : p && (o += p),
                    this.add(w, "setProperty", r, o, n, s, 0, 0, u),
                    _.push(u);
                else if ("undefined" !== d) {
                  if (
                    (T && u in T
                      ? ((r =
                          "function" == typeof T[u]
                            ? T[u].call(i, n, e, s)
                            : T[u]),
                        Lt(r) && ~r.indexOf("random(") && (r = an(r)),
                        Ui(r + "") || (r += Tt.units[u] || Ui(er(e, u)) || ""),
                        "=" === (r + "").charAt(1) && (r = er(e, u)))
                      : (r = er(e, u)),
                    (l = parseFloat(r)),
                    (f =
                      "string" === d && "=" === o.charAt(1)
                        ? +(o.charAt(0) + "1")
                        : 0) && (o = o.substr(2)),
                    (a = parseFloat(o)),
                    u in Es &&
                      ("autoAlpha" === u &&
                        (1 === l &&
                          "hidden" === er(e, "visibility") &&
                          a &&
                          (l = 0),
                        Ks(
                          this,
                          w,
                          "visibility",
                          l ? "inherit" : "hidden",
                          a ? "inherit" : "hidden",
                          !a
                        )),
                      "scale" !== u &&
                        "transform" !== u &&
                        ~(u = Es[u]).indexOf(",") &&
                        (u = u.split(",")[0])),
                    (g = u in bs))
                  )
                    if (
                      (m ||
                        (((v = e._gsap).renderTransform && !t.parseTransform) ||
                          pr(e, t.parseTransform),
                        (y = !1 !== t.smoothOrigin && v.smooth),
                        ((m = this._pt =
                          new as(
                            this._pt,
                            w,
                            Ns,
                            0,
                            1,
                            v.renderTransform,
                            v,
                            0,
                            -1
                          )).dep = 1)),
                      "scale" === u)
                    )
                      (this._pt = new as(
                        this._pt,
                        v,
                        "scaleY",
                        v.scaleY,
                        (f ? f * a : a - v.scaleY) || 0
                      )),
                        _.push("scaleY", u),
                        (u += "X");
                    else {
                      if ("transformOrigin" === u) {
                        (o = nr(o)),
                          v.svg
                            ? ur(e, o, 0, y, 0, this)
                            : ((h = parseFloat(o.split(" ")[2]) || 0) !==
                                v.zOrigin &&
                                Ks(this, v, "zOrigin", v.zOrigin, h),
                              Ks(this, w, u, hr(r), hr(o)));
                        continue;
                      }
                      if ("svgOrigin" === u) {
                        ur(e, o, 1, y, 0, this);
                        continue;
                      }
                      if (u in ar) {
                        wr(this, v, u, l, o, f);
                        continue;
                      }
                      if ("smoothOrigin" === u) {
                        Ks(this, v, "smooth", v.smooth, o);
                        continue;
                      }
                      if ("force3D" === u) {
                        v[u] = o;
                        continue;
                      }
                      if ("transform" === u) {
                        xr(this, o, e);
                        continue;
                      }
                    }
                  else u in w || (u = Vs(u) || u);
                  if (
                    g ||
                    ((a || 0 === a) && (l || 0 === l) && !Ss.test(o) && u in w)
                  )
                    a || (a = 0),
                      (p = (r + "").substr((l + "").length)) !==
                        (h = Ui(o) || (u in Tt.units ? Tt.units[u] : p)) &&
                        (l = Js(e, u, r, h)),
                      (this._pt = new as(
                        this._pt,
                        g ? v : w,
                        u,
                        l,
                        f ? f * a : a - l,
                        g ||
                        ("px" !== h && "zIndex" !== u) ||
                        !1 === t.autoRound
                          ? Os
                          : Ms
                      )),
                      (this._pt.u = h || 0),
                      p !== h &&
                        "%" !== h &&
                        ((this._pt.b = r), (this._pt.r = As));
                  else if (u in w) tr.call(this, e, u, r, o);
                  else {
                    if (!(u in e)) {
                      Zt(u, o);
                      continue;
                    }
                    this.add(e, u, r || e[u], o, n, s);
                  }
                  _.push(u);
                }
            b && os(this);
          },
          get: er,
          aliases: Es,
          getSetter: function (e, t, i) {
            var n = Es[t];
            return (
              n && n.indexOf(",") < 0 && (t = n),
              t in bs && t !== Gs && (e._gsap.x || er(e, "x"))
                ? i && vs === i
                  ? "scale" === t
                    ? $s
                    : zs
                  : (vs = i || {}) && ("scale" === t ? Bs : Fs)
                : e.style && !zt(e.style[t])
                ? Ps
                : ~t.indexOf("-")
                ? Ds
                : Zn(e, t)
            );
          },
          core: { _removeProperty: Qs, _getMatrix: cr },
        };
      (us.utils.checkPrefix = Vs),
        (Er = hi(
          (Cr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
            "," +
            (Sr = "rotation,rotationX,rotationY,skewX,skewY") +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          function (e) {
            bs[e] = 1;
          }
        )),
        hi(Sr, function (e) {
          (Tt.units[e] = "deg"), (ar[e] = 1);
        }),
        (Es[Er[13]] = Cr + "," + Sr),
        hi(
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
          function (e) {
            var t = e.split(":");
            Es[t[1]] = Er[t[0]];
          }
        ),
        hi(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (e) {
            Tt.units[e] = "px";
          }
        ),
        us.registerPlugin(Or);
      var kr,
        Ar,
        Mr,
        Ir,
        Lr,
        Pr,
        Dr,
        zr,
        $r,
        Br,
        Fr,
        Nr,
        Gr,
        Rr,
        Hr,
        qr,
        Vr,
        jr,
        Wr,
        Yr,
        Xr,
        Ur,
        Qr,
        Kr,
        Zr,
        Jr,
        eo = us.registerPlugin(Or) || us,
        to = (eo.core.Tween, 1),
        io = [],
        no = [],
        so = Date.now,
        ro = so(),
        oo = 0,
        ao = 1,
        lo = function (e) {
          return e;
        },
        co = function (e) {
          return (
            $r(e)[0] ||
            (_o(e) && !1 !== kr.config().nullTargetWarn
              ? console.warn("Element not found:", e)
              : null)
          );
        },
        uo = function (e) {
          return Math.round(1e5 * e) / 1e5 || 0;
        },
        po = function () {
          return "undefined" != typeof window;
        },
        ho = function () {
          return kr || (po() && (kr = window.gsap) && kr.registerPlugin && kr);
        },
        fo = function (e) {
          return !!~Dr.indexOf(e);
        },
        go = function (e, t) {
          return ~io.indexOf(e) && io[io.indexOf(e) + 1][t];
        },
        mo = function (e, t) {
          var i = t.s,
            n = t.sc,
            s = no.indexOf(e),
            r = n === Yo.sc ? 1 : 2;
          return (
            !~s && (s = no.push(e) - 1),
            no[s + r] ||
              (no[s + r] =
                go(e, i) ||
                (fo(e)
                  ? n
                  : function (t) {
                      return arguments.length ? (e[i] = t) : e[i];
                    }))
          );
        },
        vo = function (e) {
          return (
            go(e, "getBoundingClientRect") ||
            (fo(e)
              ? function () {
                  return (
                    (Da.width = Mr.innerWidth), (Da.height = Mr.innerHeight), Da
                  );
                }
              : function () {
                  return Qo(e);
                })
          );
        },
        yo = function (e, t) {
          var i = t.s,
            n = t.d2,
            s = t.d,
            r = t.a;
          return (i = "scroll" + n) && (r = go(e, i))
            ? r() - vo(e)()[s]
            : fo(e)
            ? (Pr[i] || Lr[i]) -
              (Mr["inner" + n] || Lr["client" + n] || Pr["client" + n])
            : e[i] - e["offset" + n];
        },
        bo = function (e, t) {
          for (var i = 0; i < Wr.length; i += 3)
            (!t || ~t.indexOf(Wr[i + 1])) && e(Wr[i], Wr[i + 1], Wr[i + 2]);
        },
        _o = function (e) {
          return "string" == typeof e;
        },
        wo = function (e) {
          return "function" == typeof e;
        },
        To = function (e) {
          return "number" == typeof e;
        },
        xo = function (e) {
          return "object" == typeof e;
        },
        Co = function (e) {
          return wo(e) && e();
        },
        So = function (e, t) {
          return function () {
            var i = Co(e),
              n = Co(t);
            return function () {
              Co(i), Co(n);
            };
          };
        },
        Eo = function (e, t, i) {
          return e && e.progress(t ? 0 : 1) && i && e.pause();
        },
        Oo = function (e, t) {
          if (e.enabled) {
            var i = t(e);
            i && i.totalTime && (e.callbackAnimation = i);
          }
        },
        ko = Math.abs,
        Ao = "scrollLeft",
        Mo = "scrollTop",
        Io = "left",
        Lo = "top",
        Po = "right",
        Do = "bottom",
        zo = "width",
        $o = "height",
        Bo = "Right",
        Fo = "Left",
        No = "Top",
        Go = "Bottom",
        Ro = "padding",
        Ho = "margin",
        qo = "Width",
        Vo = "Height",
        jo = "px",
        Wo = {
          s: Ao,
          p: Io,
          p2: Fo,
          os: Po,
          os2: Bo,
          d: zo,
          d2: qo,
          a: "x",
          sc: function (e) {
            return arguments.length
              ? Mr.scrollTo(e, Yo.sc())
              : Mr.pageXOffset ||
                  Ir.scrollLeft ||
                  Lr.scrollLeft ||
                  Pr.scrollLeft ||
                  0;
          },
        },
        Yo = {
          s: Mo,
          p: Lo,
          p2: No,
          os: Do,
          os2: Go,
          d: $o,
          d2: Vo,
          a: "y",
          op: Wo,
          sc: function (e) {
            return arguments.length
              ? Mr.scrollTo(Wo.sc(), e)
              : Mr.pageYOffset ||
                  Ir.scrollTop ||
                  Lr.scrollTop ||
                  Pr.scrollTop ||
                  0;
          },
        },
        Xo = function (e) {
          return Mr.getComputedStyle(e);
        },
        Uo = function (e, t) {
          for (var i in t) i in e || (e[i] = t[i]);
          return e;
        },
        Qo = function (e, t) {
          var i =
              t &&
              "matrix(1, 0, 0, 1, 0, 0)" !== Xo(e)[Hr] &&
              kr
                .to(e, {
                  x: 0,
                  y: 0,
                  xPercent: 0,
                  yPercent: 0,
                  rotation: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scale: 1,
                  skewX: 0,
                  skewY: 0,
                })
                .progress(1),
            n = e.getBoundingClientRect();
          return i && i.progress(0).kill(), n;
        },
        Ko = function (e, t) {
          var i = t.d2;
          return e["offset" + i] || e["client" + i] || 0;
        },
        Zo = function (e) {
          var t,
            i = [],
            n = e.labels,
            s = e.duration();
          for (t in n) i.push(n[t] / s);
          return i;
        },
        Jo = function (e) {
          var t = kr.utils.snap(e),
            i =
              Array.isArray(e) &&
              e.slice(0).sort(function (e, t) {
                return e - t;
              });
          return i
            ? function (e, n, s) {
                var r;
                if ((void 0 === s && (s = 0.001), !n)) return t(e);
                if (n > 0) {
                  for (e -= s, r = 0; r < i.length; r++)
                    if (i[r] >= e) return i[r];
                  return i[r - 1];
                }
                for (r = i.length, e += s; r--; ) if (i[r] <= e) return i[r];
                return i[0];
              }
            : function (i, n, s) {
                void 0 === s && (s = 0.001);
                var r = t(i);
                return !n || Math.abs(r - i) < s || r - i < 0 == n < 0
                  ? r
                  : t(n < 0 ? i - e : i + e);
              };
        },
        ea = function (e, t, i, n) {
          return i.split(",").forEach(function (i) {
            return e(t, i, n);
          });
        },
        ta = function (e, t, i) {
          return e.addEventListener(t, i, { passive: !0 });
        },
        ia = function (e, t, i) {
          return e.removeEventListener(t, i);
        },
        na = {
          startColor: "green",
          endColor: "red",
          indent: 0,
          fontSize: "16px",
          fontWeight: "normal",
        },
        sa = { toggleActions: "play", anticipatePin: 0 },
        ra = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
        oa = function (e, t) {
          if (_o(e)) {
            var i = e.indexOf("="),
              n = ~i ? +(e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0;
            ~i &&
              (e.indexOf("%") > i && (n *= t / 100), (e = e.substr(0, i - 1))),
              (e =
                n +
                (e in ra
                  ? ra[e] * t
                  : ~e.indexOf("%")
                  ? (parseFloat(e) * t) / 100
                  : parseFloat(e) || 0));
          }
          return e;
        },
        aa = function (e, t, i, n, s, r, o, a) {
          var l = s.startColor,
            d = s.endColor,
            c = s.fontSize,
            u = s.indent,
            p = s.fontWeight,
            h = Ir.createElement("div"),
            f = fo(i) || "fixed" === go(i, "pinType"),
            g = -1 !== e.indexOf("scroller"),
            m = f ? Pr : i,
            v = -1 !== e.indexOf("start"),
            y = v ? l : d,
            b =
              "border-color:" +
              y +
              ";font-size:" +
              c +
              ";color:" +
              y +
              ";font-weight:" +
              p +
              ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
          return (
            (b += "position:" + ((g || a) && f ? "fixed;" : "absolute;")),
            (g || a || !f) &&
              (b += (n === Yo ? Po : Do) + ":" + (r + parseFloat(u)) + "px;"),
            o &&
              (b +=
                "box-sizing:border-box;text-align:left;width:" +
                o.offsetWidth +
                "px;"),
            (h._isStart = v),
            h.setAttribute(
              "class",
              "gsap-marker-" + e + (t ? " marker-" + t : "")
            ),
            (h.style.cssText = b),
            (h.innerText = t || 0 === t ? e + "-" + t : e),
            m.children[0] ? m.insertBefore(h, m.children[0]) : m.appendChild(h),
            (h._offset = h["offset" + n.op.d2]),
            la(h, 0, n, v),
            h
          );
        },
        la = function (e, t, i, n) {
          var s = { display: "block" },
            r = i[n ? "os2" : "p2"],
            o = i[n ? "p2" : "os2"];
          (e._isFlipped = n),
            (s[i.a + "Percent"] = n ? -100 : 0),
            (s[i.a] = n ? "1px" : 0),
            (s["border" + r + qo] = 1),
            (s["border" + o + qo] = 0),
            (s[i.p] = t + "px"),
            kr.set(e, s);
        },
        da = [],
        ca = {},
        ua = function () {
          return so() - oo > 34 && Oa();
        },
        pa = function () {
          Oa(), oo || ba("scrollStart"), (oo = so());
        },
        ha = function () {
          return !Gr && !Ur && !Ir.fullscreenElement && zr.restart(!0);
        },
        fa = {},
        ga = [],
        ma = [],
        va = function (e) {
          var t,
            i = kr.ticker.frame,
            n = [],
            s = 0;
          if (Zr !== i || to) {
            for (Ta(); s < ma.length; s += 4)
              (t = Mr.matchMedia(ma[s]).matches) !== ma[s + 3] &&
                ((ma[s + 3] = t),
                t ? n.push(s) : Ta(1, ma[s]) || (wo(ma[s + 2]) && ma[s + 2]()));
            for (wa(), s = 0; s < n.length; s++)
              (t = n[s]), (Kr = ma[t]), (ma[t + 2] = ma[t + 1](e));
            (Kr = 0), Ar && Ca(0, 1), (Zr = i), ba("matchMedia");
          }
        },
        ya = function e() {
          return ia(Na, "scrollEnd", e) || Ca(!0);
        },
        ba = function (e) {
          return (
            (fa[e] &&
              fa[e].map(function (e) {
                return e();
              })) ||
            ga
          );
        },
        _a = [],
        wa = function (e) {
          for (var t = 0; t < _a.length; t += 5)
            (e && _a[t + 4] !== e) ||
              ((_a[t].style.cssText = _a[t + 1]),
              _a[t].getBBox && _a[t].setAttribute("transform", _a[t + 2] || ""),
              (_a[t + 3].uncache = 1));
        },
        Ta = function (e, t) {
          var i;
          for (qr = 0; qr < da.length; qr++)
            (i = da[qr]), (t && i.media !== t) || (e ? i.kill(1) : i.revert());
          t && wa(t), t || ba("revert");
        },
        xa = function () {
          return no.forEach(function (e) {
            return "function" == typeof e && (e.rec = 0);
          });
        },
        Ca = function (e, t) {
          if (!oo || e) {
            Jr = !0;
            var i = ba("refreshInit");
            Yr && Na.sort(),
              t || Ta(),
              da.forEach(function (e) {
                return e.refresh();
              }),
              da.forEach(function (e) {
                return (
                  "max" === e.vars.end &&
                  e.setPositions(e.start, yo(e.scroller, e._dir))
                );
              }),
              i.forEach(function (e) {
                return e && e.render && e.render(-1);
              }),
              xa(),
              zr.pause(),
              (Jr = !1),
              ba("refresh");
          } else ta(Na, "scrollEnd", ya);
        },
        Sa = 0,
        Ea = 1,
        Oa = function () {
          if (!Jr) {
            var e = da.length,
              t = so(),
              i = t - ro >= 50,
              n = e && da[0].scroll();
            if (
              ((Ea = Sa > n ? -1 : 1),
              (Sa = n),
              i &&
                (oo && !Rr && t - oo > 200 && ((oo = 0), ba("scrollEnd")),
                (Fr = ro),
                (ro = t)),
              Ea < 0)
            ) {
              for (qr = e; qr-- > 0; ) da[qr] && da[qr].update(0, i);
              Ea = 1;
            } else for (qr = 0; qr < e; qr++) da[qr] && da[qr].update(0, i);
          }
        },
        ka = [
          Io,
          Lo,
          Do,
          Po,
          "marginBottom",
          "marginRight",
          "marginTop",
          "marginLeft",
          "display",
          "flexShrink",
          "float",
          "zIndex",
          "gridColumnStart",
          "gridColumnEnd",
          "gridRowStart",
          "gridRowEnd",
          "gridArea",
          "justifySelf",
          "alignSelf",
          "placeSelf",
          "order",
        ],
        Aa = ka.concat([
          zo,
          $o,
          "boxSizing",
          "maxWidth",
          "maxHeight",
          "position",
          Ho,
          Ro,
          "paddingTop",
          "paddingRight",
          "paddingBottom",
          "paddingLeft",
        ]),
        Ma = function (e, t, i, n) {
          if (e.parentNode !== t) {
            for (var s, r = ka.length, o = t.style, a = e.style; r--; )
              o[(s = ka[r])] = i[s];
            (o.position = "absolute" === i.position ? "absolute" : "relative"),
              "inline" === i.display && (o.display = "inline-block"),
              (a.bottom = a.right = o.flexBasis = "auto"),
              (o.overflow = "visible"),
              (o.boxSizing = "border-box"),
              (o.width = Ko(e, Wo) + jo),
              (o.height = Ko(e, Yo) + jo),
              (o.padding = a.margin = a.top = a.left = "0"),
              La(n),
              (a.width = a.maxWidth = i.width),
              (a.height = a.maxHeight = i.height),
              (a.padding = i.padding),
              e.parentNode.insertBefore(t, e),
              t.appendChild(e);
          }
        },
        Ia = /([A-Z])/g,
        La = function (e) {
          if (e) {
            var t,
              i,
              n = e.t.style,
              s = e.length,
              r = 0;
            for (
              (e.t._gsap || kr.core.getCache(e.t)).uncache = 1;
              r < s;
              r += 2
            )
              (i = e[r + 1]),
                (t = e[r]),
                i
                  ? (n[t] = i)
                  : n[t] &&
                    n.removeProperty(t.replace(Ia, "-$1").toLowerCase());
          }
        },
        Pa = function (e) {
          for (var t = Aa.length, i = e.style, n = [], s = 0; s < t; s++)
            n.push(Aa[s], i[Aa[s]]);
          return (n.t = e), n;
        },
        Da = { left: 0, top: 0 },
        za = function (e, t, i, n, s, r, o, a, l, d, c, u, p) {
          wo(e) && (e = e(a)),
            _o(e) &&
              "max" === e.substr(0, 3) &&
              (e = u + ("=" === e.charAt(4) ? oa("0" + e.substr(3), i) : 0));
          var h,
            f,
            g,
            m = p ? p.time() : 0;
          if ((p && p.seek(0), To(e))) o && la(o, i, n, !0);
          else {
            wo(t) && (t = t(a));
            var v,
              y,
              b,
              _,
              w = e.split(" ");
            (g = co(t) || Pr),
              ((v = Qo(g) || {}) && (v.left || v.top)) ||
                "none" !== Xo(g).display ||
                ((_ = g.style.display),
                (g.style.display = "block"),
                (v = Qo(g)),
                _ ? (g.style.display = _) : g.style.removeProperty("display")),
              (y = oa(w[0], v[n.d])),
              (b = oa(w[1] || "0", i)),
              (e = v[n.p] - l[n.p] - d + y + s - b),
              o && la(o, b, n, i - b < 20 || (o._isStart && b > 20)),
              (i -= i - b);
          }
          if (r) {
            var T = e + i,
              x = r._isStart;
            (h = "scroll" + n.d2),
              la(
                r,
                T,
                n,
                (x && T > 20) ||
                  (!x &&
                    (c ? Math.max(Pr[h], Lr[h]) : r.parentNode[h]) <= T + 1)
              ),
              c &&
                ((l = Qo(o)),
                c && (r.style[n.op.p] = l[n.op.p] - n.op.m - r._offset + jo));
          }
          return (
            p &&
              g &&
              ((h = Qo(g)),
              p.seek(u),
              (f = Qo(g)),
              (p._caScrollDist = h[n.p] - f[n.p]),
              (e = (e / p._caScrollDist) * u)),
            p && p.seek(m),
            p ? e : Math.round(e)
          );
        },
        $a = /(?:webkit|moz|length|cssText|inset)/i,
        Ba = function (e, t, i, n) {
          if (e.parentNode !== t) {
            var s,
              r,
              o = e.style;
            if (t === Pr) {
              for (s in ((e._stOrig = o.cssText), (r = Xo(e))))
                +s ||
                  $a.test(s) ||
                  !r[s] ||
                  "string" != typeof o[s] ||
                  "0" === s ||
                  (o[s] = r[s]);
              (o.top = i), (o.left = n);
            } else o.cssText = e._stOrig;
            (kr.core.getCache(e).uncache = 1), t.appendChild(e);
          }
        },
        Fa = function (e, t) {
          var i,
            n,
            s = mo(e, t),
            r = "_scroll" + t.p2,
            o = function t(o, a, l, d, c) {
              var u = t.tween,
                p = a.onComplete,
                h = {};
              return (
                u && u.kill(),
                (i = Math.round(l)),
                (a[r] = o),
                (a.modifiers = h),
                (h[r] = function (e) {
                  return (
                    (e = uo(s())) !== i &&
                    e !== n &&
                    Math.abs(e - i) > 2 &&
                    Math.abs(e - n) > 2
                      ? (u.kill(), (t.tween = 0))
                      : (e = l + d * u.ratio + c * u.ratio * u.ratio),
                    (n = i),
                    (i = uo(e))
                  );
                }),
                (a.onComplete = function () {
                  (t.tween = 0), p && p.call(u);
                }),
                (u = t.tween = kr.to(e, a))
              );
            };
          return (
            (e[r] = s),
            ta(e, "wheel", function () {
              return o.tween && o.tween.kill() && (o.tween = 0);
            }),
            o
          );
        };
      Wo.op = Yo;
      var Na = (function () {
        function e(t, i) {
          Ar ||
            e.register(kr) ||
            console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
            this.init(t, i);
        }
        return (
          (e.prototype.init = function (t, i) {
            if (
              ((this.progress = this.start = 0), this.vars && this.kill(1), ao)
            ) {
              var n,
                s,
                r,
                o,
                a,
                l,
                d,
                c,
                u,
                p,
                h,
                f,
                g,
                m,
                v,
                y,
                b,
                _,
                w,
                T,
                x,
                C,
                S,
                E,
                O,
                k,
                A,
                M,
                I,
                L,
                P,
                D,
                z,
                $,
                B,
                F,
                N,
                G,
                R,
                H,
                q = (t = Uo(
                  _o(t) || To(t) || t.nodeType ? { trigger: t } : t,
                  sa
                )),
                V = q.onUpdate,
                j = q.toggleClass,
                W = q.id,
                Y = q.onToggle,
                X = q.onRefresh,
                U = q.scrub,
                Q = q.trigger,
                K = q.pin,
                Z = q.pinSpacing,
                J = q.invalidateOnRefresh,
                ee = q.anticipatePin,
                te = q.onScrubComplete,
                ie = q.onSnapComplete,
                ne = q.once,
                se = q.snap,
                re = q.pinReparent,
                oe = q.pinSpacer,
                ae = q.containerAnimation,
                le = q.fastScrollEnd,
                de = q.preventOverlaps,
                ce =
                  t.horizontal || (t.containerAnimation && !1 !== t.horizontal)
                    ? Wo
                    : Yo,
                ue = !U && 0 !== U,
                pe = co(t.scroller || Mr),
                he = kr.core.getCache(pe),
                fe = fo(pe),
                ge =
                  "fixed" ===
                  ("pinType" in t
                    ? t.pinType
                    : go(pe, "pinType") || (fe && "fixed")),
                me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
                ve = ue && t.toggleActions.split(" "),
                ye = "markers" in t ? t.markers : sa.markers,
                be = fe ? 0 : parseFloat(Xo(pe)["border" + ce.p2 + qo]) || 0,
                _e = this,
                we =
                  t.onRefreshInit &&
                  function () {
                    return t.onRefreshInit(_e);
                  },
                Te = (function (e, t, i) {
                  var n = i.d,
                    s = i.d2,
                    r = i.a;
                  return (r = go(e, "getBoundingClientRect"))
                    ? function () {
                        return r()[n];
                      }
                    : function () {
                        return (t ? Mr["inner" + s] : e["client" + s]) || 0;
                      };
                })(pe, fe, ce),
                xe = (function (e, t) {
                  return !t || ~io.indexOf(e)
                    ? vo(e)
                    : function () {
                        return Da;
                      };
                })(pe, fe),
                Ce = 0,
                Se = mo(pe, ce);
              if (
                ((_e.media = Kr),
                (_e._dir = ce),
                (ee *= 45),
                (_e.scroller = pe),
                (_e.scroll = ae ? ae.time.bind(ae) : Se),
                (o = Se()),
                (_e.vars = t),
                (i = i || t.animation),
                "refreshPriority" in t && (Yr = 1),
                (he.tweenScroll = he.tweenScroll || {
                  top: Fa(pe, Yo),
                  left: Fa(pe, Wo),
                }),
                (_e.tweenTo = n = he.tweenScroll[ce.p]),
                i &&
                  ((i.vars.lazy = !1),
                  i._initted ||
                    (!1 !== i.vars.immediateRender &&
                      !1 !== t.immediateRender &&
                      i.render(0, !0, !0)),
                  (_e.animation = i.pause()),
                  (i.scrollTrigger = _e),
                  (P = To(U) && U) &&
                    (L = kr.to(i, {
                      ease: "power3",
                      duration: P,
                      onComplete: function () {
                        return te && te(_e);
                      },
                    })),
                  (M = 0),
                  W || (W = i.vars.id)),
                da.push(_e),
                se &&
                  ((xo(se) && !se.push) || (se = { snapTo: se }),
                  "scrollBehavior" in Pr.style &&
                    kr.set(fe ? [Pr, Lr] : pe, { scrollBehavior: "auto" }),
                  (r = wo(se.snapTo)
                    ? se.snapTo
                    : "labels" === se.snapTo
                    ? (function (e) {
                        return function (t) {
                          return kr.utils.snap(Zo(e), t);
                        };
                      })(i)
                    : "labelsDirectional" === se.snapTo
                    ? ((G = i),
                      function (e, t) {
                        return Jo(Zo(G))(e, t.direction);
                      })
                    : !1 !== se.directional
                    ? function (e, t) {
                        return Jo(se.snapTo)(e, t.direction);
                      }
                    : kr.utils.snap(se.snapTo)),
                  (D = se.duration || { min: 0.1, max: 2 }),
                  (D = xo(D) ? Br(D.min, D.max) : Br(D, D)),
                  (z = kr
                    .delayedCall(se.delay || P / 2 || 0.1, function () {
                      if (
                        Math.abs(_e.getVelocity()) < 10 &&
                        !Rr &&
                        Ce !== Se()
                      ) {
                        var e = i && !ue ? i.totalProgress() : _e.progress,
                          t = ((e - I) / (so() - Fr)) * 1e3 || 0,
                          s = kr.utils.clamp(
                            -_e.progress,
                            1 - _e.progress,
                            (ko(t / 2) * t) / 0.185
                          ),
                          o = _e.progress + (!1 === se.inertia ? 0 : s),
                          a = Br(0, 1, r(o, _e)),
                          c = Se(),
                          u = Math.round(l + a * g),
                          p = se,
                          h = p.onStart,
                          f = p.onInterrupt,
                          m = p.onComplete,
                          v = n.tween;
                        if (c <= d && c >= l && u !== c) {
                          if (v && !v._initted && v.data <= ko(u - c)) return;
                          !1 === se.inertia && (s = a - _e.progress),
                            n(
                              u,
                              {
                                duration: D(
                                  ko(
                                    (0.185 * Math.max(ko(o - e), ko(a - e))) /
                                      t /
                                      0.05 || 0
                                  )
                                ),
                                ease: se.ease || "power3",
                                data: ko(u - c),
                                onInterrupt: function () {
                                  return z.restart(!0) && f && f(_e);
                                },
                                onComplete: function () {
                                  _e.update(),
                                    (Ce = Se()),
                                    (M = I =
                                      i && !ue
                                        ? i.totalProgress()
                                        : _e.progress),
                                    ie && ie(_e),
                                    m && m(_e);
                                },
                              },
                              c,
                              s * g,
                              u - c - s * g
                            ),
                            h && h(_e, n.tween);
                        }
                      } else _e.isActive && z.restart(!0);
                    })
                    .pause())),
                W && (ca[W] = _e),
                (Q = _e.trigger = co(Q || K)),
                (K = !0 === K ? Q : co(K)),
                _o(j) && (j = { targets: Q, className: j }),
                K &&
                  (!1 === Z ||
                    Z === Ho ||
                    (Z = !(!Z && "flex" === Xo(K.parentNode).display) && Ro),
                  (_e.pin = K),
                  !1 !== t.force3D && kr.set(K, { force3D: !0 }),
                  (s = kr.core.getCache(K)).spacer
                    ? (m = s.pinState)
                    : (oe &&
                        ((oe = co(oe)) &&
                          !oe.nodeType &&
                          (oe = oe.current || oe.nativeElement),
                        (s.spacerIsNative = !!oe),
                        oe && (s.spacerState = Pa(oe))),
                      (s.spacer = b = oe || Ir.createElement("div")),
                      b.classList.add("pin-spacer"),
                      W && b.classList.add("pin-spacer-" + W),
                      (s.pinState = m = Pa(K))),
                  (_e.spacer = b = s.spacer),
                  (A = Xo(K)),
                  (S = A[Z + ce.os2]),
                  (w = kr.getProperty(K)),
                  (T = kr.quickSetter(K, ce.a, jo)),
                  Ma(K, b, A),
                  (y = Pa(K))),
                ye &&
                  ((f = xo(ye) ? Uo(ye, na) : na),
                  (p = aa("scroller-start", W, pe, ce, f, 0)),
                  (h = aa("scroller-end", W, pe, ce, f, 0, p)),
                  (_ = p["offset" + ce.op.d2]),
                  (c = aa("start", W, pe, ce, f, _, 0, ae)),
                  (u = aa("end", W, pe, ce, f, _, 0, ae)),
                  ae && (N = kr.quickSetter([c, u], ce.a, jo)),
                  ge ||
                    (io.length && !0 === go(pe, "fixedMarkers")) ||
                    ((H = Xo((R = fe ? Pr : pe)).position),
                    (R.style.position =
                      "absolute" === H || "fixed" === H ? H : "relative"),
                    kr.set([p, h], { force3D: !0 }),
                    (O = kr.quickSetter(p, ce.a, jo)),
                    (k = kr.quickSetter(h, ce.a, jo)))),
                ae)
              ) {
                var Ee = ae.vars.onUpdate,
                  Oe = ae.vars.onUpdateParams;
                ae.eventCallback("onUpdate", function () {
                  _e.update(0, 0, 1), Ee && Ee.apply(Oe || []);
                });
              }
              (_e.previous = function () {
                return da[da.indexOf(_e) - 1];
              }),
                (_e.next = function () {
                  return da[da.indexOf(_e) + 1];
                }),
                (_e.revert = function (e) {
                  var t = !1 !== e || !_e.enabled,
                    n = Gr;
                  t !== _e.isReverted &&
                    (t &&
                      (_e.scroll.rec || (_e.scroll.rec = Se()),
                      (B = Math.max(Se(), _e.scroll.rec || 0)),
                      ($ = _e.progress),
                      (F = i && i.progress())),
                    c &&
                      [c, u, p, h].forEach(function (e) {
                        return (e.style.display = t ? "none" : "block");
                      }),
                    t && (Gr = 1),
                    _e.update(t),
                    (Gr = n),
                    K &&
                      (t
                        ? (function (e, t, i) {
                            La(i);
                            var n = e._gsap;
                            if (n.spacerIsNative) La(n.spacerState);
                            else if (e.parentNode === t) {
                              var s = t.parentNode;
                              s && (s.insertBefore(e, t), s.removeChild(t));
                            }
                          })(K, b, m)
                        : (!re || !_e.isActive) && Ma(K, b, Xo(K), E)),
                    (_e.isReverted = t));
                }),
                (_e.refresh = function (n, s) {
                  if ((!Gr && _e.enabled) || s)
                    if (K && n && oo) ta(e, "scrollEnd", ya);
                    else {
                      (Gr = 1),
                        L && L.pause(),
                        J && i && i.time(-0.01, !0).invalidate(),
                        _e.isReverted || _e.revert();
                      for (
                        var r,
                          f,
                          _,
                          T,
                          S,
                          O,
                          k,
                          A,
                          M,
                          I,
                          P = Te(),
                          D = xe(),
                          z = ae ? ae.duration() : yo(pe, ce),
                          N = 0,
                          G = 0,
                          R = t.end,
                          H = t.endTrigger || Q,
                          q =
                            t.start ||
                            (0 !== t.start && Q ? (K ? "0 0" : "0 100%") : 0),
                          V = t.pinnedContainer && co(t.pinnedContainer),
                          j = (Q && Math.max(0, da.indexOf(_e))) || 0,
                          W = j;
                        W--;

                      )
                        (O = da[W]).end || O.refresh(0, 1) || (Gr = 1),
                          !(k = O.pin) ||
                            (k !== Q && k !== K) ||
                            O.isReverted ||
                            (I || (I = []), I.unshift(O), O.revert());
                      for (
                        wo(q) && (q = q(_e)),
                          l =
                            za(q, Q, P, ce, Se(), c, p, _e, D, be, ge, z, ae) ||
                            (K ? -0.001 : 0),
                          wo(R) && (R = R(_e)),
                          _o(R) &&
                            !R.indexOf("+=") &&
                            (~R.indexOf(" ")
                              ? (R = (_o(q) ? q.split(" ")[0] : "") + R)
                              : ((N = oa(R.substr(2), P)),
                                (R = _o(q) ? q : l + N),
                                (H = Q))),
                          d =
                            Math.max(
                              l,
                              za(
                                R || (H ? "100% 0" : z),
                                H,
                                P,
                                ce,
                                Se() + N,
                                u,
                                h,
                                _e,
                                D,
                                be,
                                ge,
                                z,
                                ae
                              )
                            ) || -0.001,
                          g = d - l || ((l -= 0.01) && 0.001),
                          N = 0,
                          W = j;
                        W--;

                      )
                        (k = (O = da[W]).pin) &&
                          O.start - O._pinPush < l &&
                          !ae &&
                          ((r = O.end - O.start),
                          (k !== Q && k !== V) ||
                            To(q) ||
                            (N += r * (1 - O.progress)),
                          k === K && (G += r));
                      if (
                        ((l += N),
                        (d += N),
                        (_e._pinPush = G),
                        c &&
                          N &&
                          (((r = {})[ce.a] = "+=" + N),
                          V && (r[ce.p] = "-=" + Se()),
                          kr.set([c, u], r)),
                        K)
                      )
                        (r = Xo(K)),
                          (T = ce === Yo),
                          (_ = Se()),
                          (x = parseFloat(w(ce.a)) + G),
                          !z &&
                            d > 1 &&
                            ((fe ? Pr : pe).style["overflow-" + ce.a] =
                              "scroll"),
                          Ma(K, b, r),
                          (y = Pa(K)),
                          (f = Qo(K, !0)),
                          (A = ge && mo(pe, T ? Wo : Yo)()),
                          Z &&
                            (((E = [Z + ce.os2, g + G + jo]).t = b),
                            (W = Z === Ro ? Ko(K, ce) + g + G : 0) &&
                              E.push(ce.d, W + jo),
                            La(E),
                            ge && Se(B)),
                          ge &&
                            (((S = {
                              top: f.top + (T ? _ - l : A) + jo,
                              left: f.left + (T ? A : _ - l) + jo,
                              boxSizing: "border-box",
                              position: "fixed",
                            }).width = S.maxWidth =
                              Math.ceil(f.width) + jo),
                            (S.height = S.maxHeight = Math.ceil(f.height) + jo),
                            (S.margin =
                              S.marginTop =
                              S.marginRight =
                              S.marginBottom =
                              S.marginLeft =
                                "0"),
                            (S.padding = r.padding),
                            (S.paddingTop = r.paddingTop),
                            (S.paddingRight = r.paddingRight),
                            (S.paddingBottom = r.paddingBottom),
                            (S.paddingLeft = r.paddingLeft),
                            (v = (function (e, t, i) {
                              for (
                                var n, s = [], r = e.length, o = i ? 8 : 0;
                                o < r;
                                o += 2
                              )
                                (n = e[o]), s.push(n, n in t ? t[n] : e[o + 1]);
                              return (s.t = e.t), s;
                            })(m, S, re))),
                          i
                            ? ((M = i._initted),
                              Xr(1),
                              i.render(i.duration(), !0, !0),
                              (C = w(ce.a) - x + g + G),
                              g !== C && v.splice(v.length - 2, 2),
                              i.render(0, !0, !0),
                              M || i.invalidate(),
                              Xr(0))
                            : (C = g);
                      else if (Q && Se() && !ae)
                        for (f = Q.parentNode; f && f !== Pr; )
                          f._pinOffset &&
                            ((l -= f._pinOffset), (d -= f._pinOffset)),
                            (f = f.parentNode);
                      I &&
                        I.forEach(function (e) {
                          return e.revert(!1);
                        }),
                        (_e.start = l),
                        (_e.end = d),
                        (o = a = Se()),
                        ae || (o < B && Se(B), (_e.scroll.rec = 0)),
                        _e.revert(!1),
                        (Gr = 0),
                        i &&
                          ue &&
                          i._initted &&
                          i.progress() !== F &&
                          i.progress(F, !0).render(i.time(), !0, !0),
                        ($ !== _e.progress || ae) &&
                          (i && !ue && i.totalProgress($, !0),
                          (_e.progress = $),
                          _e.update(0, 0, 1)),
                        K && Z && (b._pinOffset = Math.round(_e.progress * C)),
                        X && X(_e);
                    }
                }),
                (_e.getVelocity = function () {
                  return ((Se() - a) / (so() - Fr)) * 1e3 || 0;
                }),
                (_e.endAnimation = function () {
                  Eo(_e.callbackAnimation),
                    i &&
                      (L
                        ? L.progress(1)
                        : i.paused()
                        ? ue || Eo(i, _e.direction < 0, 1)
                        : Eo(i, i.reversed()));
                }),
                (_e.labelToScroll = function (e) {
                  return (
                    (i &&
                      i.labels &&
                      (l || _e.refresh() || l) +
                        (i.labels[e] / i.duration()) * g) ||
                    0
                  );
                }),
                (_e.getTrailing = function (e) {
                  var t = da.indexOf(_e),
                    i =
                      _e.direction > 0
                        ? da.slice(0, t).reverse()
                        : da.slice(t + 1);
                  return _o(e)
                    ? i.filter(function (t) {
                        return t.vars.preventOverlaps === e;
                      })
                    : i;
                }),
                (_e.update = function (e, t, s) {
                  if (!ae || s || e) {
                    var r,
                      c,
                      u,
                      h,
                      f,
                      m,
                      _,
                      w = _e.scroll(),
                      E = e ? 0 : (w - l) / g,
                      A = E < 0 ? 0 : E > 1 ? 1 : E || 0,
                      P = _e.progress;
                    if (
                      (t &&
                        ((a = o),
                        (o = ae ? Se() : w),
                        se &&
                          ((I = M), (M = i && !ue ? i.totalProgress() : A))),
                      ee &&
                        !A &&
                        K &&
                        !Gr &&
                        !to &&
                        oo &&
                        l < w + ((w - a) / (so() - Fr)) * ee &&
                        (A = 1e-4),
                      A !== P && _e.enabled)
                    ) {
                      if (
                        ((h =
                          (f =
                            (r = _e.isActive = !!A && A < 1) !==
                            (!!P && P < 1)) || !!A != !!P),
                        (_e.direction = A > P ? 1 : -1),
                        (_e.progress = A),
                        h &&
                          !Gr &&
                          ((c = A && !P ? 0 : 1 === A ? 1 : 1 === P ? 2 : 3),
                          ue &&
                            ((u =
                              (!f && "none" !== ve[c + 1] && ve[c + 1]) ||
                              ve[c]),
                            (_ =
                              i &&
                              ("complete" === u || "reset" === u || u in i)))),
                        de &&
                          f &&
                          (_ || U || !i) &&
                          (wo(de)
                            ? de(_e)
                            : _e.getTrailing(de).forEach(function (e) {
                                return e.endAnimation();
                              })),
                        ue ||
                          (!L || Gr || to
                            ? i && i.totalProgress(A, !!Gr)
                            : ((L.vars.totalProgress = A),
                              L.invalidate().restart())),
                        K)
                      )
                        if ((e && Z && (b.style[Z + ce.os2] = S), ge)) {
                          if (h) {
                            if (
                              ((m =
                                !e &&
                                A > P &&
                                d + 1 > w &&
                                w + 1 >= yo(pe, ce)),
                              re)
                            )
                              if (e || (!r && !m)) Ba(K, b);
                              else {
                                var D = Qo(K, !0),
                                  $ = w - l;
                                Ba(
                                  K,
                                  Pr,
                                  D.top + (ce === Yo ? $ : 0) + jo,
                                  D.left + (ce === Yo ? 0 : $) + jo
                                );
                              }
                            La(r || m ? v : y),
                              (C !== g && A < 1 && r) ||
                                T(x + (1 !== A || m ? 0 : C));
                          }
                        } else T(x + C * A);
                      se && !n.tween && !Gr && !to && z.restart(!0),
                        j &&
                          (f || (ne && A && (A < 1 || !Qr))) &&
                          $r(j.targets).forEach(function (e) {
                            return e.classList[r || ne ? "add" : "remove"](
                              j.className
                            );
                          }),
                        V && !ue && !e && V(_e),
                        h && !Gr
                          ? (ue &&
                              (_ &&
                                ("complete" === u
                                  ? i.pause().totalProgress(1)
                                  : "reset" === u
                                  ? i.restart(!0).pause()
                                  : "restart" === u
                                  ? i.restart(!0)
                                  : i[u]()),
                              V && V(_e)),
                            (!f && Qr) ||
                              (Y && f && Oo(_e, Y),
                              me[c] && Oo(_e, me[c]),
                              ne && (1 === A ? _e.kill(!1, 1) : (me[c] = 0)),
                              f ||
                                (me[(c = 1 === A ? 1 : 3)] && Oo(_e, me[c]))),
                            le &&
                              !r &&
                              Math.abs(_e.getVelocity()) >
                                (To(le) ? le : 2500) &&
                              (Eo(_e.callbackAnimation),
                              L ? L.progress(1) : Eo(i, !A, 1)))
                          : ue && V && !Gr && V(_e);
                    }
                    if (k) {
                      var B = ae
                        ? (w / ae.duration()) * (ae._caScrollDist || 0)
                        : w;
                      O(B + (p._isFlipped ? 1 : 0)), k(B);
                    }
                    N && N((-w / ae.duration()) * (ae._caScrollDist || 0));
                  }
                }),
                (_e.enable = function (t, i) {
                  _e.enabled ||
                    ((_e.enabled = !0),
                    ta(pe, "resize", ha),
                    ta(pe, "scroll", pa),
                    we && ta(e, "refreshInit", we),
                    !1 !== t && ((_e.progress = $ = 0), (o = a = Ce = Se())),
                    !1 !== i && _e.refresh());
                }),
                (_e.getTween = function (e) {
                  return e && n ? n.tween : L;
                }),
                (_e.setPositions = function (e, t) {
                  K && ((x += e - l), (C += t - e - g)),
                    (_e.start = l = e),
                    (_e.end = d = t),
                    (g = t - e),
                    _e.update();
                }),
                (_e.disable = function (t, i) {
                  if (
                    _e.enabled &&
                    (!1 !== t && _e.revert(),
                    (_e.enabled = _e.isActive = !1),
                    i || (L && L.pause()),
                    (B = 0),
                    s && (s.uncache = 1),
                    we && ia(e, "refreshInit", we),
                    z &&
                      (z.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                    !fe)
                  ) {
                    for (var r = da.length; r--; )
                      if (da[r].scroller === pe && da[r] !== _e) return;
                    ia(pe, "resize", ha), ia(pe, "scroll", pa);
                  }
                }),
                (_e.kill = function (e, t) {
                  _e.disable(e, t), L && L.kill(), W && delete ca[W];
                  var n = da.indexOf(_e);
                  n >= 0 && da.splice(n, 1),
                    n === qr && Ea > 0 && qr--,
                    (n = 0),
                    da.forEach(function (e) {
                      return e.scroller === _e.scroller && (n = 1);
                    }),
                    n || (_e.scroll.rec = 0),
                    i &&
                      ((i.scrollTrigger = null),
                      e && i.render(-1),
                      t || i.kill()),
                    c &&
                      [c, u, p, h].forEach(function (e) {
                        return e.parentNode && e.parentNode.removeChild(e);
                      }),
                    K &&
                      (s && (s.uncache = 1),
                      (n = 0),
                      da.forEach(function (e) {
                        return e.pin === K && n++;
                      }),
                      n || (s.spacer = 0));
                }),
                _e.enable(!1, !1),
                i && i.add && !g
                  ? kr.delayedCall(0.01, function () {
                      return l || d || _e.refresh();
                    }) &&
                    (g = 0.01) &&
                    (l = d = 0)
                  : _e.refresh();
            } else this.update = this.refresh = this.kill = lo;
          }),
          (e.register = function (t) {
            if (
              !Ar &&
              ((kr = t || ho()),
              po() &&
                window.document &&
                ((Mr = window),
                (Ir = document),
                (Lr = Ir.documentElement),
                (Pr = Ir.body)),
              kr &&
                (($r = kr.utils.toArray),
                (Br = kr.utils.clamp),
                (Xr = kr.core.suppressOverwrites || lo),
                kr.core.globals("ScrollTrigger", e),
                Pr))
            ) {
              ta(Mr, "wheel", pa),
                (Dr = [Mr, Ir, Lr, Pr]),
                ta(Ir, "scroll", pa);
              var i,
                n = Pr.style,
                s = n.borderTopStyle;
              (n.borderTopStyle = "solid"),
                (i = Qo(Pr)),
                (Yo.m = Math.round(i.top + Yo.sc()) || 0),
                (Wo.m = Math.round(i.left + Wo.sc()) || 0),
                s
                  ? (n.borderTopStyle = s)
                  : n.removeProperty("border-top-style"),
                (Nr = setInterval(ua, 200)),
                kr.delayedCall(0.5, function () {
                  return (to = 0);
                }),
                ta(Ir, "touchcancel", lo),
                ta(Pr, "touchstart", lo),
                ea(ta, Ir, "pointerdown,touchstart,mousedown", function () {
                  return (Rr = 1);
                }),
                ea(ta, Ir, "pointerup,touchend,mouseup", function () {
                  return (Rr = 0);
                }),
                (Hr = kr.utils.checkPrefix("transform")),
                Aa.push(Hr),
                (Ar = so()),
                (zr = kr.delayedCall(0.2, Ca).pause()),
                (Wr = [
                  Ir,
                  "visibilitychange",
                  function () {
                    var e = Mr.innerWidth,
                      t = Mr.innerHeight;
                    Ir.hidden
                      ? ((Vr = e), (jr = t))
                      : (Vr === e && jr === t) || ha();
                  },
                  Ir,
                  "DOMContentLoaded",
                  Ca,
                  Mr,
                  "load",
                  function () {
                    return oo || Ca();
                  },
                  Mr,
                  "resize",
                  ha,
                ]),
                bo(ta);
            }
            return Ar;
          }),
          (e.defaults = function (e) {
            if (e) for (var t in e) sa[t] = e[t];
            return sa;
          }),
          (e.kill = function () {
            (ao = 0),
              da.slice(0).forEach(function (e) {
                return e.kill(1);
              });
          }),
          (e.config = function (e) {
            "limitCallbacks" in e && (Qr = !!e.limitCallbacks);
            var t = e.syncInterval;
            (t && clearInterval(Nr)) || ((Nr = t) && setInterval(ua, t)),
              "autoRefreshEvents" in e &&
                (bo(ia) || bo(ta, e.autoRefreshEvents || "none"),
                (Ur = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
          }),
          (e.scrollerProxy = function (e, t) {
            var i = co(e),
              n = no.indexOf(i),
              s = fo(i);
            ~n && no.splice(n, s ? 6 : 2),
              t && (s ? io.unshift(Mr, t, Pr, t, Lr, t) : io.unshift(i, t));
          }),
          (e.matchMedia = function (e) {
            var t, i, n, s, r;
            for (i in e)
              (n = ma.indexOf(i)),
                (s = e[i]),
                (Kr = i),
                "all" === i
                  ? s()
                  : (t = Mr.matchMedia(i)) &&
                    (t.matches && (r = s()),
                    ~n
                      ? ((ma[n + 1] = So(ma[n + 1], s)),
                        (ma[n + 2] = So(ma[n + 2], r)))
                      : ((n = ma.length),
                        ma.push(i, s, r),
                        t.addListener
                          ? t.addListener(va)
                          : t.addEventListener("change", va)),
                    (ma[n + 3] = t.matches)),
                (Kr = 0);
            return ma;
          }),
          (e.clearMatchMedia = function (e) {
            e || (ma.length = 0), (e = ma.indexOf(e)) >= 0 && ma.splice(e, 4);
          }),
          (e.isInViewport = function (e, t, i) {
            var n = (_o(e) ? co(e) : e).getBoundingClientRect(),
              s = n[i ? zo : $o] * t || 0;
            return i
              ? n.right - s > 0 && n.left + s < Mr.innerWidth
              : n.bottom - s > 0 && n.top + s < Mr.innerHeight;
          }),
          (e.positionInViewport = function (e, t, i) {
            _o(e) && (e = co(e));
            var n = e.getBoundingClientRect(),
              s = n[i ? zo : $o],
              r =
                null == t
                  ? s / 2
                  : t in ra
                  ? ra[t] * s
                  : ~t.indexOf("%")
                  ? (parseFloat(t) * s) / 100
                  : parseFloat(t) || 0;
            return i
              ? (n.left + r) / Mr.innerWidth
              : (n.top + r) / Mr.innerHeight;
          }),
          e
        );
      })();
      (Na.version = "3.9.1"),
        (Na.saveStyles = function (e) {
          return e
            ? $r(e).forEach(function (e) {
                if (e && e.style) {
                  var t = _a.indexOf(e);
                  t >= 0 && _a.splice(t, 5),
                    _a.push(
                      e,
                      e.style.cssText,
                      e.getBBox && e.getAttribute("transform"),
                      kr.core.getCache(e),
                      Kr
                    );
                }
              })
            : _a;
        }),
        (Na.revert = function (e, t) {
          return Ta(!e, t);
        }),
        (Na.create = function (e, t) {
          return new Na(e, t);
        }),
        (Na.refresh = function (e) {
          return e ? ha() : (Ar || Na.register()) && Ca(!0);
        }),
        (Na.update = Oa),
        (Na.clearScrollMemory = xa),
        (Na.maxScroll = function (e, t) {
          return yo(e, t ? Wo : Yo);
        }),
        (Na.getScrollFunc = function (e, t) {
          return mo(co(e), t ? Wo : Yo);
        }),
        (Na.getById = function (e) {
          return ca[e];
        }),
        (Na.getAll = function () {
          return da.slice(0);
        }),
        (Na.isScrolling = function () {
          return !!oo;
        }),
        (Na.snapDirectional = Jo),
        (Na.addEventListener = function (e, t) {
          var i = fa[e] || (fa[e] = []);
          ~i.indexOf(t) || i.push(t);
        }),
        (Na.removeEventListener = function (e, t) {
          var i = fa[e],
            n = i && i.indexOf(t);
          n >= 0 && i.splice(n, 1);
        }),
        (Na.batch = function (e, t) {
          var i,
            n = [],
            s = {},
            r = t.interval || 0.016,
            o = t.batchMax || 1e9,
            a = function (e, t) {
              var i = [],
                n = [],
                s = kr
                  .delayedCall(r, function () {
                    t(i, n), (i = []), (n = []);
                  })
                  .pause();
              return function (e) {
                i.length || s.restart(!0),
                  i.push(e.trigger),
                  n.push(e),
                  o <= i.length && s.progress(1);
              };
            };
          for (i in t)
            s[i] =
              "on" === i.substr(0, 2) && wo(t[i]) && "onRefreshInit" !== i
                ? a(0, t[i])
                : t[i];
          return (
            wo(o) &&
              ((o = o()),
              ta(Na, "refresh", function () {
                return (o = t.batchMax());
              })),
            $r(e).forEach(function (e) {
              var t = {};
              for (i in s) t[i] = s[i];
              (t.trigger = e), n.push(Na.create(t));
            }),
            n
          );
        }),
        (Na.sort = function (e) {
          return da.sort(
            e ||
              function (e, t) {
                return (
                  -1e6 * (e.vars.refreshPriority || 0) +
                  e.start -
                  (t.start + -1e6 * (t.vars.refreshPriority || 0))
                );
              }
          );
        }),
        ho() && kr.registerPlugin(Na),
        eo.registerPlugin(Na),
        window.addEventListener("load", function () {
          this.setTimeout(function () {
            eo.timeline({})
              .from(".hero", { duration: 0.5, opacity: 0 })
              .from(".hero__text", { duration: 0.5, opacity: 0 })
              .from(".hero__button", { duration: 0.5, opacity: 0 })
              .from(".header", { duration: 0.5, ease: "power4.out", y: -100 })
              .from(
                ".hero__controll",
                { duration: 0.5, ease: "power4.out", opacity: 0, y: 100 },
                "-=0.5"
              )
              .from(
                ".directions__title",
                { duration: 0.5, ease: "power4.out", opacity: 0, y: 30 },
                "-=0.3"
              )
              .from(
                ".directions__items",
                { duration: 0.5, ease: "power4.out", opacity: 0, y: 30 },
                "-=0.3"
              );
            eo.utils.toArray(".title").forEach((e) => {
              e.querySelectorAll(".title__line-span") &&
                eo.fromTo(
                  e.querySelectorAll(".title__line-span"),
                  { y: 110 },
                  {
                    scrollTrigger: {
                      trigger: e,
                      start: "top 90%",
                      toggleActions: "play none none reverse",
                    },
                    duration: 1,
                    ease: "power4.out",
                    transformOrigin: "bottom",
                    y: 0,
                  }
                );
            });
            eo.utils.toArray(".directions__item").forEach((e) => {
              eo.fromTo(
                e,
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: e,
                    start: "top 95%",
                    toggleActions: "play none none reverse",
                  },
                  y: 0,
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                }
              );
            }),
              eo.fromTo(
                ".services",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".services",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              ),
              eo.fromTo(
                ".services__item",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".services__items",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 2.5,
                  y: 0,
                  stagger: 0.2,
                }
              ),
              eo.to(".about__cover", {
                scrollTrigger: {
                  trigger: ".about__title",
                  start: "top 90%",
                  toggleActions: "play pause resume reverse",
                },
                translateX: "100%",
                ease: "power4.out",
                duration: 1,
              }),
              eo.fromTo(
                ".about__container",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".about__container",
                    start: "top 95%",
                    toggleActions: "play pause resume reverse",
                  },
                  y: 0,
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                }
              );
            eo.utils.toArray(".about__item").forEach((e) => {
              eo.fromTo(
                e,
                { opacity: 0, y: 30 },
                {
                  scrollTrigger: {
                    trigger: e,
                    start: "-30% 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 0.5,
                  y: 0,
                }
              );
            });
            eo.utils.toArray(".dignity__item").forEach((e) => {
              eo.fromTo(
                e,
                { opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: e,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 0.5,
                }
              );
            });
            let e = document.querySelectorAll(".item-dignity"),
              t = document.querySelectorAll(".item-dignity__image");
            for (let i = 0; i < e.length; i++) {
              const n = eo.to(t[i], {
                visibility: "visible",
                opacity: 1,
                duration: 0.3,
                scale: 1,
                ease: "ease-in-out",
              });
              e[i].addEventListener("mouseenter", () => n.play()),
                e[i].addEventListener("mouseleave", () => n.reverse()),
                n.reverse();
            }
            function i(e) {
              eo.to(t, { left: e.pageX - 420, top: e.pageY, duration: 0.4 });
            }
            e.forEach((e) => {
              e.addEventListener("mousemove", i);
            });
            eo.utils.toArray(".questions").forEach((e) => {
              eo.fromTo(
                e,
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: e,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  y: 0,
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                }
              );
            });
            eo.utils.toArray(".questions__body").forEach((e) => {
              eo.fromTo(
                e,
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: e,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                  delay: 0.2,
                }
              );
            });
            eo.utils.toArray(".stages__item").forEach((e) => {
              eo.fromTo(
                e,
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: e,
                    start: "top 90%",
                    toggleActions: "play pause resume reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              );
            }),
              eo.fromTo(
                ".in-work-slider",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".in-work-slider",
                    start: "top 90%",
                    toggleActions: "play pause resume reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              ),
              eo.fromTo(
                ".partners-slider",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".partners-slider",
                    start: "top 90%",
                    toggleActions: "play pause resume reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              ),
              eo.fromTo(
                ".gifts",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".gifts",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              ),
              eo.fromTo(
                ".item-gifts__subtitle",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".item-gifts__subtitle",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              ),
              eo.fromTo(
                ".item-gifts__button",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".item-gifts__button",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              ),
              eo.fromTo(
                ".item-gifts_left",
                { x: -100, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".item-gifts",
                    start: "top 90%",
                    toggleActions: "play pause resume reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  x: 0,
                }
              ),
              eo.fromTo(
                ".item-gifts_right",
                { x: 100, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".item-gifts",
                    start: "top 90%",
                    toggleActions: "play pause resume reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  x: 0,
                }
              ),
              eo.fromTo(
                ".footer",
                { y: 30, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: ".footer",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                  opacity: 1,
                  ease: "power4.out",
                  duration: 1,
                  y: 0,
                }
              );
          }, 500);
        }),
        window.addEventListener("DOMContentLoaded", function () {
          [].forEach.call(document.querySelectorAll("#tel"), function (e) {
            var t;
            function i(e) {
              e.keyCode && (t = e.keyCode),
                this.selectionStart < 3 && e.preventDefault();
              var i = "+7 (___) ___ ____",
                n = 0,
                s = i.replace(/\D/g, ""),
                r = this.value.replace(/\D/g, ""),
                o = i.replace(/[_\d]/g, function (e) {
                  return n < r.length ? r.charAt(n++) || s.charAt(n) : e;
                });
              -1 != (n = o.indexOf("_")) &&
                (n < 5 && (n = 3), (o = o.slice(0, n)));
              var a = i
                .substr(0, this.value.length)
                .replace(/_+/g, function (e) {
                  return "\\d{1," + e.length + "}";
                })
                .replace(/[+()]/g, "\\$&");
              (!(a = new RegExp("^" + a + "$")).test(this.value) ||
                this.value.length < 5 ||
                (t > 47 && t < 58)) &&
                (this.value = o),
                "blur" == e.type && this.value.length < 5 && (this.value = "");
            }
            e.addEventListener("input", i, !1),
              e.addEventListener("focus", i, !1),
              e.addEventListener("blur", i, !1),
              e.addEventListener("keydown", i, !1);
          });
        }),
        document.querySelector(".questions__file") &&
          document
            .querySelector(".questions__file")
            .addEventListener("change", function (e) {
              if ("" != e.target.value) {
                let e = document.querySelector(".questions__file").files;
                for (var t = 0; t < e.length; t++)
                  document.querySelector(".questions__file-label").innerHTML =
                    e[t].name;
              }
            }),
        (window.FLS = !0),
        (function (e) {
          let t = new Image();
          (t.onload = t.onerror =
            function () {
              e(2 == t.height);
            }),
            (t.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (e) {
          let t = !0 === e ? "webp" : "no-webp";
          document.documentElement.classList.add(t);
        }),
        n.any()
          ? document.documentElement.classList.add("touch")
          : document.documentElement.classList.add("no-touch"),
        window.addEventListener("load", function () {
          setTimeout(function () {
            document.documentElement.classList.add("loaded");
          }, 500);
        }),
        (function () {
          let e = document.querySelector(".icon-menu");
          e &&
            e.addEventListener("click", function (e) {
              s &&
                (r(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            n.any()
          ) {
            function e() {
              let e = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${e}px`);
            }
            window.addEventListener("resize", e), e();
          }
        })(),
        new t({}),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            u.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && u.validateInput(t));
        }),
        (function (e) {
          const t = document.forms;
          if (t.length)
            for (const e of t)
              e.addEventListener("submit", function (e) {
                i(e.target, e);
              }),
                e.addEventListener("reset", function (e) {
                  const t = e.target;
                  u.formClean(t);
                });
          async function i(t, i) {
            if (0 === (e ? u.getErrors(t) : 0)) {
              if (t.hasAttribute("data-ajax")) {
                i.preventDefault();
                const e = t.getAttribute("action")
                    ? t.getAttribute("action").trim()
                    : "#",
                  s = t.getAttribute("method")
                    ? t.getAttribute("method").trim()
                    : "GET",
                  r = new FormData(t);
                t.classList.add("_sending");
                const o = await fetch(e, { method: s, body: r });
                if (o.ok) {
                  await o.json();
                  t.classList.remove("_sending"), n(t);
                } else alert("Ошибка"), t.classList.remove("_sending");
              } else t.hasAttribute("data-dev") && (i.preventDefault(), n(t));
            } else {
              i.preventDefault();
              const e = t.querySelector("._form-error");
              e && t.hasAttribute("data-goto-error") && d(e, !0, 1e3);
            }
          }
          function n(e) {
            document.dispatchEvent(
              new CustomEvent("formSent", { detail: { form: e } })
            ),
              u.formClean(e);
          }
        })(!0),
        (function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const i = t.closest("[data-goto]"),
                  n = i.dataset.goto ? i.dataset.goto : "",
                  s = !!i.hasAttribute("data-goto-header"),
                  r = i.dataset.gotoSpeed ? i.dataset.gotoSpeed : "500";
                d(n, s, r), e.preventDefault();
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                i = t.target;
              if ("navigator" === i.dataset.watch) {
                const e = i.id,
                  n =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${e}"]`));
                t.isIntersecting
                  ? n && n.classList.add("_navigator-active")
                  : n && n.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e);
        })(),
        (function () {
          we = !0;
          const e = document.querySelector("header.header"),
            t = e.hasAttribute("data-scroll-show"),
            i = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
            n = e.dataset.scroll ? e.dataset.scroll : 1;
          let s,
            r = 0;
          document.addEventListener("windowScroll", function (o) {
            const a = window.scrollY;
            clearTimeout(s),
              a >= n
                ? (!e.classList.contains("_header-scroll") &&
                    e.classList.add("_header-scroll"),
                  t &&
                    (a > r
                      ? e.classList.contains("_header-show") &&
                        e.classList.remove("_header-show")
                      : !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show"),
                    (s = setTimeout(() => {
                      !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show");
                    }, i))))
                : (e.classList.contains("_header-scroll") &&
                    e.classList.remove("_header-scroll"),
                  t &&
                    e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")),
              (r = a <= 0 ? 0 : a);
          });
        })();
    })();
})();
