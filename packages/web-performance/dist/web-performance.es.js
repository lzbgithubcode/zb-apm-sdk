/**
 * 作者: lzb
 * 日期: 2022-04-06 17:32
 * 功能:
 */
var Config = /** @class */ (function () {
    function Config(options) {
        this.allowLog = (options && options.allowLog) || false;
        this.enableCollectError = (options && options.enableCollectError) || true;
        this.enableReportError = (options && options.enableReportError) || true;
    }
    return Config;
}());

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

/**
 * 作者: lzb
 * 日期: 2022-03-15 20:33
 * 功能:
 */
var logWarning = function (message) {
    console.warn(message);
};
var logError = function (message) {
    console.error(message);
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
/**
 * 字节Byte -> MB
 * @param bytes
 */
var toMB = function (bytes) {
    if (typeof bytes !== 'number') {
        return 0;
    }
    return toFixedFour((bytes / Math.pow(1024, 2)));
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
var startMonitorNavigationTiming = function (config) {
    if (config === void 0) { config = new Config(); }
    // 监听的结果
    getNavigationTiming().then(function (res) {
        console.log('======NavigationTiming=========', res);
    });
};

/**
 * 作者: lzb
 * 日期: 2022-03-15 20:45
 * 功能:
 */
var domDidLoaded = function (cb) {
    if (document.readyState === "complete") {
        setTimeout(cb);
    }
    else {
        window.addEventListener('pageshow', cb);
    }
};

/**
 * 获取设备信息
 * @returns  IDeviceInfo | undefined
 */
var getDeviceInfo = function () {
    if (!isSupportNavigator()) {
        console.warn('浏览器不支持navigator');
        return;
    }
    if (!isSupportPerformance()) {
        logWarning("浏览器不支持performance");
        return;
    }
    var jsHeapSizeLimit = "memory" in performance ? toMB(performance["memory"]["jsHeapSizeLimit"]) : 0;
    var usedJSHeapSize = "memory" in performance ? toMB(performance["memory"]["usedJSHeapSize"]) : 0;
    var totalJSHeapSize = "memory" in performance ? toMB(performance["memory"]["totalJSHeapSize"]) : 0;
    return {
        deviceMemory: "deviceMemory" in navigator ? navigator['deviceMemory'] : 0,
        userAgent: "userAgent" in navigator ? navigator['userAgent'] : "",
        hardwareConcurrency: "hardwareConcurrency" in navigator ? navigator['hardwareConcurrency'] : 0,
        jsHeapSizeLimit: "".concat(jsHeapSizeLimit, "MB"),
        usedJSHeapSize: "".concat(usedJSHeapSize, "MB"),
        totalJSHeapSize: "".concat(totalJSHeapSize, "MB"),
    };
};
/**
 * 监听设备信息
 * @param config
 */
var startMonitorDeviceInfo = function (config) {
    if (config === void 0) { config = new Config(); }
    var deviceInfo = getDeviceInfo();
    console.log('设备信息------', deviceInfo, '配置信息--------', config);
};

/**
 * 作者: lzb
 * 日期: 2022-03-15 20:28
 * 功能: 页面基础信息
 */
var getPageIno = function () {
    if (!location) {
        console.warn('浏览器不支持location');
        return;
    }
    var host = location.host, hostname = location.hostname, href = location.href, protocol = location.protocol, origin = location.origin, port = location.port, pathname = location.pathname, search = location.search, hash = location.hash;
    var _a = window.screen, width = _a.width, height = _a.height;
    var userAgent = "";
    if (isSupportNavigator()) {
        userAgent = 'userAgent' in navigator ? navigator.userAgent : '';
    }
    return {
        host: host,
        hostname: hostname,
        href: href,
        protocol: protocol,
        origin: origin,
        port: port,
        pathname: pathname,
        search: search,
        hash: hash,
        userAgent: userAgent,
        width: "".concat(width),
        height: "".concat(height)
    };
};
var startMonitorPageInfo = function (config) {
    if (config === void 0) { config = new Config(); }
    var pageInfo = getPageIno();
    console.log('页面信息------', pageInfo, '配置信息--------', config);
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
 * 开始监听网络信息
 * @param config
 */
var startMonitorNetworkInfo = function (config) {
    if (config === void 0) { config = new Config(); }
    // 获取网络信息
    var netInfo = getNetworkInfo();
    console.log('网络信息------', netInfo, '配置信息--------', config);
};

/**
 * 作者: lzb
 * 日期: 2022-04-07 16:58
 * 功能:
 */
/**
 * 开始监听基础信息
 * @param config
 */
var startMonitorBaseInfo = function (config) {
    if (config === void 0) { config = new Config(); }
    // 监听设备信息
    startMonitorDeviceInfo(config);
    // 监听页面信息
    startMonitorPageInfo(config);
    // 监听网络信息
    startMonitorNetworkInfo(config);
};

/**
 * 作者: lzb
 * 日期: 2022-04-07 18:48
 * 功能:
 */
/**
 * 生成unique id
 */
var generalUniqueId = function () {
    return "apm-v1-".concat(Date.now(), "-").concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12);
};

/**
 *  初始化指标对象
 */
var initMetric = function (name, value) {
    return {
        name: name,
        value: typeof value === 'undefined' ? -1 : value,
        delta: 0,
        id: generalUniqueId(),
    };
};

/**
 * 作者: lzb
 * 日期: 2022-03-11 18:39
 * 功能:
 */
var PerformanceNameType;
(function (PerformanceNameType) {
    PerformanceNameType["NT"] = "navigation-timing";
    PerformanceNameType["FP"] = "first-paint";
    PerformanceNameType["FCP"] = "first-contentful-paint";
    PerformanceNameType["LCP"] = "largest-contentful-paint";
    PerformanceNameType["FID"] = "first-input";
    PerformanceNameType["FPS"] = "fps";
    PerformanceNameType["TTFB"] = "TTFB";
})(PerformanceNameType || (PerformanceNameType = {}));

/**
 * 页面隐藏事件监听
 */
var onHidden = function (cb, once) {
    if (once === void 0) { once = false; }
    var onHiddenOrPageHide = function (event) {
        if (event.type == "pagehide" || document.visibilityState === 'hidden') {
            cb(event);
            // 如果只是监听一次
            if (once) {
                removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                removeEventListener("pagehide", onHiddenOrPageHide, true);
            }
        }
    };
    // 当其选项卡的内容变得可见或被隐藏时，会在文档上触发
    addEventListener('visibilitychange', onHiddenOrPageHide, true);
    // 当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时, pagehide(页面隐藏)事件会被发送到一个
    addEventListener("pagehide", onHiddenOrPageHide, true);
};
var firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;
/**
 * 获取第一次隐藏时间
 */
var getFirstHiddenTime = function () {
    onHidden(function (event) {
        firstHiddenTime = event.timeStamp;
    }, true);
    return {
        get timestamp() {
            return firstHiddenTime;
        }
    };
};

/**
 *  获取首次渲染的FP - 白屏时间
 */
var fetchFP = function () {
    if (!isSupportPerformance()) {
        logWarning("浏览器不支持performance");
        return;
    }
    var fp = PerformanceNameType.FP;
    return new Promise(function (resolve, reject) {
        // 如果支持观察者
        if (isSupportPerformanceObserver()) {
            var entryHandler = function (entry) {
                if (entry.entryType === fp) {
                    if (po_1) {
                        po_1.disconnect();
                    }
                    if (entry.startTime < getFirstHiddenTime().timestamp) {
                        resolve(entry);
                    }
                }
            };
            var po_1 = observe("paint", entryHandler);
        }
        else {
            var entry = window.performance
                && performance.getEntriesByName
                && performance.getEntriesByName(fp)[0];
            resolve(entry);
        }
    });
};
/**
 * 获取FP指标
 */
var getFP = function () {
    var _a;
    (_a = fetchFP()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        // 创建指标对象
        initMetric(PerformanceNameType.FP);
        retainToFixed(entry.startTime, 2);
        // 获取到指标对象
    }).catch(function (error) {
        logError(error);
    });
};

/**
 * @description:  首次内容绘制
 * @param {*} void
 * @return {type} Promise
 */
var fetchFCP = function () {
    // 1.初始化性能参数
    var fcp = PerformanceNameType.FCP;
    return new Promise(function (resolve, reject) {
        if (!isSupportPerformanceObserver()) {
            if (!isSupportPerformance()) {
                reject(new Error('浏览器不支持Performance'));
            }
            else {
                // 1. 如果只是支持performance，不支持PerformanceObserver 获取性能值
                var entry = performance.getEntriesByName(fcp);
                if (entry && entry.length > 0) {
                    var fcp_entry = entry[0];
                    resolve(fcp_entry);
                }
                else {
                    reject(new Error('浏览器不支持FCP'));
                }
            }
        }
        else {
            // 浏览值支持FP
            var entryHandler = function (entry) {
                if (entry.name === fcp) {
                    // 断开收集
                    if (po_1) {
                        po_1.disconnect();
                    }
                    // 获取信息
                    if (entry.startTime < getFirstHiddenTime().timestamp) {
                        resolve(entry);
                    }
                }
            };
            var po_1 = observe(fcp, entryHandler);
        }
    });
};
/**
 * 获取LCP指标
 */
var getFCP = function () {
    var _a;
    (_a = fetchFCP()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        // 创建指标对象
        initMetric(PerformanceNameType.FCP);
        toFixedFour(entry.startTime);
        // 获取到指标对象
    }).catch(function (error) {
        logError(error);
    });
};

/**
 * LCP Largest Contentful Paint 最大内容绘制 (LCP)
 *
 */
var lcp = PerformanceNameType.LCP;
var fetchLCP = function () {
    // 1.初始化性能参数
    if (!isSupportPerformanceObserver()) {
        logWarning("浏览器不支持PerformanceObserver,暂不支持收集FID");
        return;
    }
    // 2. 返回promise
    return new Promise(function (resolve, reject) {
        var entryHandler = function (entry) {
            if (entry.name === lcp) {
                // 获取信息
                if (entry.startTime < getFirstHiddenTime().timestamp) {
                    // 断开收集
                    if (po) {
                        po.disconnect();
                    }
                    resolve(entry);
                }
            }
        };
        var po = observe(lcp, entryHandler);
        if (po) {
            var stopListening_1 = function () {
                if (po.takeRecords) {
                    po.takeRecords().map(entryHandler);
                }
                po.disconnect();
            };
            ['keydown', 'click'].forEach(function (type) {
                addEventListener(type, stopListening_1, { once: true, capture: true });
            });
            onHidden(stopListening_1, true);
        }
    });
};
/**
 * 获取FP指标
 */
var getLCP = function () {
    var _a;
    (_a = fetchLCP()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        // 创建指标对象
        initMetric(PerformanceNameType.LCP);
        toFixedFour(entry.startTime);
        // 获取到指标对象
    }).catch(function (error) {
        logError(error);
    });
};

/**
 * First Input Delay 首次输入延迟 (FID)
 * FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）
 * 直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
 */
var fid = PerformanceNameType.FID;
var fetchFID = function () {
    // 1.初始化性能参数
    if (!isSupportPerformanceObserver()) {
        logWarning("浏览器不支持PerformanceObserver,暂不支持收集FID");
        return;
    }
    // 2. 返回promise
    return new Promise(function (resolve, reject) {
        var entryHandler = function (entry) {
            if (entry.name === fid) {
                // 获取信息
                if (entry.startTime < getFirstHiddenTime().timestamp) {
                    // 断开收集
                    if (po) {
                        po.disconnect();
                    }
                    resolve(entry);
                }
            }
        };
        var po = observe(fid, entryHandler);
        if (po) {
            onHidden(function () {
                if (po.takeRecords) {
                    po.takeRecords().map(entryHandler);
                }
                po.disconnect();
            }, true);
        }
    });
};
/**
 * 获取LCP指标
 */
var getFID = function () {
    var _a;
    (_a = fetchFID()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        toFixedFour(entry.processingStart - entry.startTime);
        // 获取到指标对象
    }).catch(function (error) {
        logError(error);
    });
};

/**
 * 作者: lzb
 * 日期: 2022-04-07 18:12
 * 功能:
 */
/**
 *  监听性能指标
 * @param config
 */
var startMonitorPerformance = function (config) {
    if (config === void 0) { config = new Config(); }
    // 最大内容绘制
    getLCP();
    addEventListener("pageShow", function () {
        // 获取首次渲染的FP
        getFP();
        // 获取首次内容绘制
        getFCP();
    });
    domDidLoaded(function () {
        // 获取FID
        getFID();
    });
};

/**
 * 作者: lzb
 * 日期: 2022-03-10 11:06
 * 功能:
 */
var WebPerformance = /** @class */ (function () {
    function WebPerformance(config) {
        this.config = config;
        this.config = new Config(config);
        console.log('打印默认的配置信息----', this.config);
        this.startMonitor();
    }
    /**
     * 开始监听
     */
    WebPerformance.prototype.startMonitor = function () {
        var _this = this;
        console.log('======开始监听web-performance=========');
        startMonitorBaseInfo(this.config);
        // 开启性能指标监听
        startMonitorPerformance(this.config);
        // dom 加载之后
        domDidLoaded(function () {
            startMonitorNavigationTiming(_this.config);
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
