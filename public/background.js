var background = function() {
  "use strict";
  var e = {
    operationName: {
      cookieStatus: "PostMeter",
      postContent: "PostViewerEdgeContentQuery"
    },
    operationSelector: {
      cookieStatus: "data.meterPost.unlocksRemaining"
    },
    memberShipId: "paywall-fewerClicksHeading",
    registerWall: "regwall-heading",
    domainList: ["https://*.medium.com/*", "https://500ish.com/*", "https://android.jlelse.eu/*", "https://betterhumans.coach.me/*", "https://betterprogramming.pub/*", "https://blog.angularindepth.com/*", "https://blog.bitsrc.io/*", "https://blog.devartis.com/*", "https://blog.getambassador.io/*", "https://blog.hipolabs.com/*", "https://blog.maddevs.io/*", "https://blog.prototypr.io/*", "https://blog.roost.io/*", "https://blog.usejournal.com/*", "https://calia.me/*", "https://codeburst.io/*", "https://engineering.opsgenie.com/*", "https://enlear.academy/*", "https://entrepreneurshandbook.co/*", "https://faun.pub/*", "https://hackernoon.com/*", "https://instagram-engineering.com/*", "https://itnext.io/*", "https://javascript.plainenglish.io/*", "https://levelup.gitconnected.com/*", "https://medium.com/*", "https://medium.freecodecamp.org/*", "https://medium.mybridge.co/*", "https://proandroiddev.com/*", "https://productcoalition.com/*", "https://psiloveyou.xyz/*", "https://robinhood.engineering/*", "https://theascent.pub/*", "https://thebolditalic.com/*", "https://thecreative.cafe/*", "https://towardsdatascience.com/*", "https://towardsdev.com/*", "https://ux.shopify.com/*", "https://uxdesign.cc/*", "https://uxplanet.org/*", "https://writingcooperative.com/*", "https://www.cantorsparadise.com/*"]
  };

  function t(e, t) {
    let o = "",
      r = t.length;
    for (let s = 0; s < e; s++) o += t.charAt(Math.floor(Math.random() * r));
    return o
  }
  var o = {
      generateUID: () => `lo_${t(12,"0123456789abcdef")}`,
      generateSID: () => `1:${t(64,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._/")}`,
      getBeforeSendExtraInfoSpec: () => {
        const e = ["blocking", "requestHeaders"];
        return chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS") && e.push("extraHeaders"), e
      },
      getHeaderReceivedExtraInfoSpec: () => {
        const e = ["blocking", "responseHeaders"];
        return chrome.webRequest.OnHeadersReceivedOptions.hasOwnProperty("EXTRA_HEADERS") && e.push("extraHeaders"), e
      },
      getHeaders: (e, t, o) => e.filter((({
        name: e
      }) => o(e.toLowerCase(), t))),
      hasElm: e => !!document.getElementById(e),
      getRealObjectKey: (e, t) => Object.keys(e).find((e => e.toLowerCase() === t))
    },
    r = {
      initChrome: () => {}
    };
  const {
    domainList: s
  } = e, {
    generateUID: n,
    generateSID: a,
    getBeforeSendExtraInfoSpec: i,
    getHeaderReceivedExtraInfoSpec: d,
    getHeaders: c
  } = o, {
    initChrome: p
  } = r, l = "/_/graphql", h = ["PostViewerEdgeContentQuery", "PostHandler"];
  let u = [],
    g = "";
  chrome.webRequest.onBeforeSendHeaders.addListener((function({
    url: e,
    requestId: t,
    requestHeaders: o
  }) {
    if (!1 === e.endsWith(l)) return {
      requestHeaders: o
    };
    const r = o.filter((({
      name: e
    }) => "graphql-operation" === e.toLowerCase()));
    if (!r.length || r.length && !h.includes(r[0].value)) return {
      requestHeaders: o
    };
    u.push(t);
    let s = c(o, "cookie", ((e, t) => e !== t));
    const i = c(o, "cookie", ((e, t) => e === t));
    if (1 === i.length) {
      const e = n(),
        t = a();
      let o = decodeURIComponent(i[0].value);
      const r = /uid=(\w+);/.exec(o);
      return r && r.length > 1 && (g = r[1]), o = o.replace(/uid=(\w+);/, `uid=${e};`), o = o.replace(/sid=(.{0,72});/, `sid=${encodeURIComponent(t)};`), o = o.replace(/optimizelyEndUserId=(\w+);/, `optimizelyEndUserId=${e};`), s.push({
        name: "cookie",
        value: o
      }), {
        requestHeaders: s
      }
    }
    return {
      requestHeaders: o
    }
  }), {
    urls: s
  }, i()), chrome.webRequest.onHeadersReceived.addListener((function({
    requestId: e,
    responseHeaders: t
  }) {
    return !1 === u.includes(e) ? {
      responseHeaders: t
    } : {
      responseHeaders: c(t, "set-cookie", ((e, t) => e !== t))
    }
  }), {
    urls: s
  }, d()), "undefined" != typeof browser ? chrome.webRequest.onBeforeRequest.addListener((function({
    requestId: e,
    url: t
  }) {
    if (!1 === t.endsWith(l)) return {};
    let o = browser.webRequest.filterResponseData(e),
      r = new TextDecoder("utf-8"),
      s = new TextEncoder,
      n = [];
    o.ondata = e => {
      n.push(e.data)
    }, o.onstop = t => {
      let a = "";
      if (1 == n.length) a = r.decode(n[0]);
      else
        for (let e = 0; e < n.length; e++) {
          let t = e != n.length - 1;
          a += r.decode(n[e], {
            stream: t
          })
        }
      if (g && u.includes(e)) {
        const e = /postId:(\w+)\-viewerId:(lo_\w+)/gm.exec(a);
        if (e && 3 === e.length) {
          let t = new RegExp(`${e[2]}`, "g");
          a = a.replace(t, g)
        }
      }
      o.write(s.encode(a)), o.close()
    }
  }), {
    urls: s
  }, ["blocking"]) : p();
  return {}
}();
