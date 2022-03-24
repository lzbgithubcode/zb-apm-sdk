/**
 * 作者: lzb
 * 日期: 2022-03-11 18:55
 * 功能:
 */
var isSupportPerformance = function () {
    return !!window.performance;
};
var isSupportNavigator = function () {
    return !!window.navigator;
};
var isSupportPerformanceObserver = function () {
    return !!window.PerformanceObserver;
};

var getNetworkInfo = function () {
    if (!isSupportNavigator()) {
        console.warn('浏览器不支持navigator');
        return;
    }
    var connection = (navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'] || {});
    var downlink = connection.downlink, effectiveType = connection.effectiveType, rtt = connection.rtt;
    return {
        downlink: downlink,
        effectiveType: effectiveType,
        rtt: rtt
    };
};

/**
 * 作者: lzb
 * 日期: 2022-03-15 20:33
 * 功能:
 */
var logWarning = function (message) {
    console.warn(message);
};

function observe (type, callback) {
    var _a;
    try {
        if ((_a = PerformanceObserver.supportedEntryTypes) === null || _a === void 0 ? void 0 : _a.includes(type)) {
            var entriesFunc = function (list) { return list.getEntries().map(callback); };
            var po = new PerformanceObserver(entriesFunc);
            po.observe({ type: type, buffered: true });
            return po;
        }
    }
    catch (e) {
        throw e;
    }
}

/**
 * 作者: lzb
 * 日期: 2022-03-21 20:42
 * 功能:
 */
/**
 * 保留几位小数
 */
var retainToFixed = function (num, digits) {
    if (typeof num === "string") {
        num = parseFloat(num);
    }
    try {
        return parseFloat(num.toFixed(digits));
    }
    catch (e) {
        return num;
    }
};
/**
 *  保留4位小数
 * @param num
 */
var toFixedFour = function (num) {
    return retainToFixed(num, 4);
};

var NAVIGATION = "navigation";
var getNavigationTiming = function () {
    if (!isSupportPerformance()) {
        logWarning("浏览器不支持performance");
        return;
    }
    // 处理navigation
    var resolveNavigationTiming = function (entry, resolve) {
        var connectEnd = entry.connectEnd, // 浏览器与服务器之间的连接建立时
        connectStart = entry.connectStart, // HTTP请求开始向服务器发送
        secureConnectionStart = entry.secureConnectionStart, // 浏览器与服务器开始安全链接的握手, 如果当前网页不要求安全连接，则返回0。
        domainLookupEnd = entry.domainLookupEnd, // 域名开始解析
        domainLookupStart = entry.domainLookupStart, // 域名开始解析
        fetchStart = entry.fetchStart, // 浏览器准备好使用HTTP请求来获取(fetch)文档的UNIX时间戳。这个时间点会在检查任何应用缓存之前。
        redirectStart = entry.redirectStart, // 表征了第一个HTTP重定向开始时的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
        redirectEnd = entry.redirectEnd, // ，表征了最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
        requestStart = entry.requestStart, // 浏览器向服务器发出HTTP请求时
        responseEnd = entry.responseEnd, // 浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
        responseStart = entry.responseStart, // 浏览器从服务器收到（或从本地缓存读取）第一个字节时
        domInteractive = entry.domInteractive; //  当前览器完成对所有 HTML 的解析, DOM构建完成、开始加载内嵌资源时（即Document.readyState属性变为“interactive”, 开始加载内嵌的js.css
        entry.domContentLoadedEventStart; //  返回当解析器发送DOMContentLoaded (en-US) 事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳。
        var domContentLoadedEventEnd = entry.domContentLoadedEventEnd; //  返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳。 可以构建渲染树
        entry.domComplete; // 返回当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange (en-US) 被触发时的Unix毫秒时间戳。
        var loadEventStart = entry.loadEventStart; // 返回该文档下，load (en-US)事件被发送时的Unix毫秒时间戳。如果这个事件还未被发送，它的值将会是0
        entry.loadEventEnd; // 返回当load (en-US)事件结束，即加载事件完成时的Unix毫秒时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0
        entry.unloadEventStart; // 表征了unload (en-US)事件抛出时的UNIX时间戳
        entry.unloadEventEnd;
        // 返回结果
        var result = {
            dns: toFixedFour(domainLookupEnd - domainLookupStart),
            redirect: toFixedFour(redirectEnd - redirectStart),
            tcpConnected: toFixedFour(connectEnd - connectStart),
            sslConnected: toFixedFour(connectEnd - secureConnectionStart),
            domReady: toFixedFour(domContentLoadedEventEnd - fetchStart),
            domParse: toFixedFour(domInteractive - responseEnd),
            domContentLoaded: toFixedFour(domContentLoadedEventEnd - domInteractive),
            resourceLoaded: toFixedFour(loadEventStart - domContentLoadedEventEnd),
            pageLoaded: toFixedFour(loadEventStart - fetchStart),
            ttfb: toFixedFour(responseStart - requestStart),
            trans: toFixedFour(responseEnd - responseStart),
            tti: toFixedFour(domInteractive - fetchStart),
            fpt: toFixedFour(responseEnd - fetchStart),
        };
        resolve(result);
    };
    return new Promise(function (resolve) {
        var _a;
        // 是否支持性能检测
        if (isSupportPerformanceObserver() && ((_a = PerformanceObserver.supportedEntryTypes) === null || _a === void 0 ? void 0 : _a.includes(NAVIGATION))) {
            var entryHandler = function (entry) {
                if (entry.entryType === NAVIGATION) {
                    if (po_1) {
                        po_1.disconnect();
                    }
                    resolveNavigationTiming(entry, resolve);
                }
            };
            var po_1 = observe(NAVIGATION, entryHandler);
        }
        else {
            var navigation = performance.getEntriesByType(NAVIGATION).length > 0 ? performance.getEntriesByType(NAVIGATION)[0] : performance.timing;
            resolveNavigationTiming(navigation, resolve);
        }
    });
};

var WebPerformance = /** @class */ (function () {
    function WebPerformance(config) {
        config.enableCollectError; config.enableReportError;
        this.startMonitor();
    }
    /**
     * 开始监听
     */
    WebPerformance.prototype.startMonitor = function () {
        getNetworkInfo();
        getNavigationTiming().then(function (res) {
            console.log('======结果=========', res);
        });
    };
    /**
     * 停止监听
     */
    WebPerformance.prototype.stopMonitor = function () {
    };
    return WebPerformance;
}());

export { WebPerformance };
