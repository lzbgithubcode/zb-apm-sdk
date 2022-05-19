/**
 * 作者: lzb
 * 日期: 2022-04-07 18:12
 * 功能:
 */
import { Config, IConfig } from "../config/config";
import observe from "./observe";
import { PerformanceNameType } from "../constants";
import { interfaces } from "../interfaces/interfaces";
import IPerformanceMetric = interfaces.IPerformanceMetric;
import { isSupportPerformance, isSupportPerformanceObserver } from "../utils/isSupport";
import { logWarning } from "../utils/loggerHelper";
import { initMetric } from "../utils/initMetric";
import { getFirstHiddenTime, onCachePageShow, onHidden } from "../utils/pageEventListener";
import { retainToFixed, toFixedFour } from "../utils/calculate";


/**
 *  监听性能指标
 * @param config
 */
export const startMonitorPerformance = (config: IConfig = new Config()): void => {


};

/**
 *  获取首次渲染的FP - 白屏时间
 */
export const getFP = (): Promise<interfaces.IPerformanceMetric> | undefined => {
    if (!isSupportPerformance()) {
        logWarning("浏览器不支持performance");
        return;
    }
    const fpMetric: interfaces.IPerformanceMetric = initMetric(PerformanceNameType.FP);
    return new Promise<interfaces.IPerformanceMetric>((resolve, reject) => {

        // 如果支持观察者
        if (isSupportPerformanceObserver()) {
            const entryHandler = (entry: PerformanceEntry) => {
                if (entry.entryType === fpMetric.name) {
                    if (po) {
                        po.disconnect()
                    }

                    if (entry.startTime < getFirstHiddenTime().timestamp) {
                        fpMetric.value = retainToFixed(entry.startTime, 2);
                        resolve(fpMetric);
                    }
                }

            };
            const po = observe("paint", entryHandler);
        } else {
            const entry = window.performance
                && performance.getEntriesByName
                && performance.getEntriesByName(fpMetric.name)[0];

            fpMetric.value = retainToFixed(entry.startTime, 2);
            resolve(fpMetric);
        }
    });
};



/**
 * 首次内容绘制
 */
export const getFCP = (): Promise<IPerformanceMetric> => {
    // 1.初始化性能参数
    const fcp = PerformanceNameType.FCP;
    const fcp_metric: IPerformanceMetric = initMetric(fcp);
    return new Promise<IPerformanceMetric>((resolve, reject) => {
        if (!isSupportPerformanceObserver()) {
            if (!isSupportPerformance()) {
                reject(new Error('浏览器不支持Performance'));
            } else {

                // 1. 如果只是支持performance，不支持PerformanceObserver 获取性能值
                const entry: PerformanceEntryList = performance.getEntriesByName(fcp);
                if (entry && entry.length > 0) {
                    const fcp_entry: PerformanceEntry = entry[0];
                    fcp_metric.value = toFixedFour(fcp_entry.startTime);
                    resolve(fcp_metric);
                } else {
                    reject(new Error('浏览器不支持FCP'))
                }
            }
        } else {

            // 浏览值支持FP
            const entryHandler = (entry: PerformanceEntry) => {
                if (entry.name === fcp) {
                    // 断开收集
                    if (po) {
                        po.disconnect();
                    }
                    // 获取信息
                    if (entry.startTime < getFirstHiddenTime().timestamp) {
                        fcp_metric.value = toFixedFour(entry.startTime);
                        resolve(fcp_metric);
                    }

                }
            };
            const po = observe(fcp, entryHandler);
        }
    });
}
/**
 * First Input Delay 首次输入延迟 (FID)
 * FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）
 * 直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
 */
export const getFID = (): Promise<IPerformanceMetric> => {
    // 1.初始化性能参数
    const fid = PerformanceNameType.FID;
    const fid_metric: IPerformanceMetric = initMetric(fid);

    if (!isSupportPerformanceObserver()) {
        logWarning("浏览器不支持PerformanceObserver,暂不支持收集FID")
        return;
    }

    // 2. 返回promise
    return new Promise<IPerformanceMetric>((resolve, reject) => {

        const entryHandler = (entry: PerformanceEventTiming) => {
            if (entry.name === fid) {
                // 获取信息
                if (entry.startTime < getFirstHiddenTime().timestamp) {
                    // 断开收集
                    if (po) {
                        po.disconnect();
                    }
                    fid_metric.value = toFixedFour(entry.processingStart - entry.startTime);
                    resolve(fid_metric);
                }
            }
        };

        const po = observe(fid, entryHandler);
        if (po) {
            onHidden(() => {
                if (po.takeRecords) {
                    po.takeRecords().map(entryHandler)
                }
                po.disconnect();
            }, true);
        }
    });
}




