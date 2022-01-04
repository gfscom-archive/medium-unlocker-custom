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
    domainList: ["https://*.medium.com/*", "https://android.jlelse.eu/*", "https://betterhumans.coach.me/*", "https://betterprogramming.pub/*", "https://blog.angularindepth.com/*", "https://blog.bitsrc.io/*", "https://blog.devartis.com/*", "https://blog.getambassador.io/*", "https://blog.hipolabs.com/*", "https://blog.maddevs.io/*", "https://blog.prototypr.io/*", "https://blog.usejournal.com/*", "https://calia.me/*", "https://codeburst.io/*", "https://engineering.opsgenie.com/*", "https://enlear.academy/*", "https://entrepreneurshandbook.co/*", "https://hackernoon.com/*", "https://instagram-engineering.com/*", "https://itnext.io/*", "https://levelup.gitconnected.com/*", "https://medium.com/*", "https://medium.freecodecamp.org/*", "https://medium.mybridge.co/*", "https://proandroiddev.com/*", "https://productcoalition.com/*", "https://psiloveyou.xyz/*", "https://robinhood.engineering/*", "https://theascent.pub/*", "https://thebolditalic.com/*", "https://thecreative.cafe/*", "https://towardsdatascience.com/*", "https://ux.shopify.com/*", "https://uxdesign.cc/*", "https://uxplanet.org/*", "https://writingcooperative.com/*", "https://www.cantorsparadise.com/*"]
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
    getHeaders: (e, t, o) => e.filter((({
      name: e
    }) => o(e.toLowerCase(), t))),
    hasElm: e => !!document.getElementById(e)
  };
  const {
    domainList: r
  } = e, {
    generateUID: s,
    generateSID: n,
    getBeforeSendExtraInfoSpec: a,
    getHeaders: i
  } = o;
  let d = [];
  chrome.webRequest.onBeforeSendHeaders.addListener((function({
    url: e,
    requestId: t,
    requestHeaders: o
  }) {
    if (!1 === e.endsWith("/_/graphql")) return {
      requestHeaders: o
    };
    const r = o.filter((({
      name: e
    }) => "graphql-operation" === e.toLowerCase()));
    if (!r.length || r.length && "PostViewerEdgeContentQuery" !== r[0].value) return {
      requestHeaders: o
    };
    d.push(t);
    let a = i(o, "cookie", ((e, t) => e !== t));
    const p = i(o, "cookie", ((e, t) => e === t));
    if (1 === p.length) {
      const e = s(),
        t = n();
      let o = decodeURIComponent(p[0].value);
      return o = o.replace(/uid=(\w+);/, `uid=${e};`), o = o.replace(/sid=(.{0,72});/, `sid=${encodeURIComponent(t)};`), o = o.replace(/optimizelyEndUserId=(\w+);/, `optimizelyEndUserId=${e};`), a.push({
        name: "cookie",
        value: o
      }), {
        requestHeaders: a
      }
    }
    return {
      requestHeaders: o
    }
  }), {
    urls: r
  }, a()), chrome.webRequest.onHeadersReceived.addListener((function({
    requestId: e,
    responseHeaders: t
  }) {
    return !1 === d.includes(e) ? {
      responseHeaders: t
    } : {
      responseHeaders: i(t, "set-cookie", ((e, t) => e !== t))
    }
  }), {
    urls: r
  }, ["blocking", "responseHeaders"]);
  return {}
}();
