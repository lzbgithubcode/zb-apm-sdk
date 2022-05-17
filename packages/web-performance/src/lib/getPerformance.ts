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
import { toFixedFour } from "../utils/calculate";
import { getFirstHiddenTime } from "../utils/visibilityWatcher";
import { resolve } from "path";


/**
 *  监听性能指标
 * @param config
 */
export const startMonitorPerformance = (config: IConfig = new Config()): void => {


};

/**
 * 首次绘制 - 白屏时间
 */
export const getFP = (): Promise<IPerformanceMetric> => {

    // 1.初始化性能参数
    const fp = PerformanceNameType.FP;
    const fp_metric: IPerformanceMetric = initMetric(fp);

    return new Promise<IPerformanceMetric>((resolve, reject) => {
        if (!isSupportPerformanceObserver()) {
            if (!isSupportPerformance()) {
                reject(new Error('浏览器不支持Performance'));
            } else {

                // 1. 如果只是支持performance，不支持PerformanceObserver 获取性能值
                const entry: PerformanceEntryList = performance.getEntriesByName(fp);
                if (entry && entry.length > 0) {
                    const fp_entry: PerformanceEntry = entry[0];
                    fp_metric.value = toFixedFour(fp_entry.startTime);
                    resolve(fp_metric);
                } else {
                    reject(new Error('浏览器不支持FP'))
                }
            }
        } else {

            // 浏览值支持FP
            const entryHandler = (entry: PerformanceEntry) => {
                if (entry.name === fp) {
                    // 断开收集
                    if (po) {
                        po.disconnect();
                    }
                    // 获取信息
                    if (entry.startTime < getFirstHiddenTime().timeStamp) {
                        fp_metric.value = toFixedFour(entry.startTime);
                        resolve(fp_metric);
                    }

                }
            };
            const po = observe(fp, entryHandler);
        }


    });


}
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
                    if (entry.startTime < getFirstHiddenTime().timeStamp) {
                        fcp_metric.value = toFixedFour(entry.startTime);
                        resolve(fcp_metric);
                    }

                }
            };
            const po = observe(fcp, entryHandler);
        }
    });
}
