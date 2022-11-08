/**
 * 作者: lzb
 * 日期: 2022-03-21 18:17
 * 功能: NavigationTiming性能指标
 */
import { IPerformanceNavigationTiming } from "../types/interfaces";
import { isSupportPerformance, isSupportPerformanceObserver } from "../utils/isSupport";
import { logWarning } from "../utils/loggerHelper";
import observe from "../lib/observe";
import { toFixedFour } from "../utils/calculate";
import { Config, IConfig } from "../config/config";

const NAVIGATION = "navigation";

export const getNavigationTiming = (): Promise<IPerformanceNavigationTiming> | undefined => {
    if (!isSupportPerformance()) {
        logWarning("浏览器不支持performance");
        return;
    }

    // 处理navigation
    const resolveNavigationTiming = (entry: PerformanceNavigationTiming, resolve): void => {
        const {
            connectEnd,    // 浏览器与服务器之间的连接建立时
            connectStart,  // HTTP请求开始向服务器发送
            secureConnectionStart,  // 浏览器与服务器开始安全链接的握手, 如果当前网页不要求安全连接，则返回0。
            domainLookupEnd,   // 域名开始解析
            domainLookupStart,   // 域名开始解析
            fetchStart,   // 浏览器准备好使用HTTP请求来获取(fetch)文档的UNIX时间戳。这个时间点会在检查任何应用缓存之前。
            redirectStart, // 表征了第一个HTTP重定向开始时的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
            redirectEnd,   // ，表征了最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的UNIX时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
            requestStart,  // 浏览器向服务器发出HTTP请求时
            responseEnd,    // 浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
            responseStart,  // 浏览器从服务器收到（或从本地缓存读取）第一个字节时
            domInteractive, //  当前览器完成对所有 HTML 的解析, DOM构建完成、开始加载内嵌资源时（即Document.readyState属性变为“interactive”, 开始加载内嵌的js.css
            domContentLoadedEventStart, //  返回当解析器发送DOMContentLoaded (en-US) 事件，即所有需要被执行的脚本已经被解析时的Unix毫秒时间戳。
            domContentLoadedEventEnd, //  返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的Unix毫秒时间戳。 可以构建渲染树
            domComplete, // 返回当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange (en-US) 被触发时的Unix毫秒时间戳。
            loadEventStart,  // 返回该文档下，load (en-US)事件被发送时的Unix毫秒时间戳。如果这个事件还未被发送，它的值将会是0
            loadEventEnd,  // 返回当load (en-US)事件结束，即加载事件完成时的Unix毫秒时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0
            unloadEventStart, // 表征了unload (en-US)事件抛出时的UNIX时间戳
            unloadEventEnd, //  表征了unload (en-US)事件处理完成时的UNIX时间戳
        } = entry;
        // 返回结果
        const result: IPerformanceNavigationTiming = {
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

    return new Promise(resolve => {

        // 是否支持性能检测
        if (isSupportPerformanceObserver() && PerformanceObserver.supportedEntryTypes?.includes(NAVIGATION)) {
            const entryHandler = (entry: PerformanceNavigationTiming) => {
                if (entry.entryType === NAVIGATION) {
                    if (po) {
                        po.disconnect()
                    }
                    resolveNavigationTiming(entry, resolve);
                }
            };
            const po = observe(NAVIGATION, entryHandler);

        } else {

            const navigation = performance.getEntriesByType(NAVIGATION).length > 0 ? performance.getEntriesByType(NAVIGATION)[0] : performance.timing;
            resolveNavigationTiming(navigation as PerformanceNavigationTiming, resolve);

        }
    });
}

export const startMonitorNavigationTiming = (config: IConfig = new Config()): void => {
    // 监听的结果
    getNavigationTiming().then((res) => {
        console.log('======NavigationTiming=========', res);
    });
};
