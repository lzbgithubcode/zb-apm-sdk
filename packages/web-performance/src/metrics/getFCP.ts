import { IPerformanceMetric } from "../types/interfaces";
import { isSupportPerformance, isSupportPerformanceObserver } from "../utils/isSupport";
import { logWarning, logError } from "../utils/loggerHelper";
import { initMetric } from "../lib/metric";
import { PerformanceNameType } from "../constants/index";
import { getFirstHiddenTime } from "../utils/pageEventListener";
import { toFixedFour } from "../utils/calculate";
import observe from "../lib/observe";




/**
 * 首次内容绘制
 */
const fetchFCP = (): Promise<PerformanceEntry> => {
  // 1.初始化性能参数
  const fcp = PerformanceNameType.FCP;

  return new Promise<PerformanceEntry>((resolve, reject) => {
    if (!isSupportPerformanceObserver()) {
      if (!isSupportPerformance()) {
        reject(new Error('浏览器不支持Performance'));
      } else {

        // 1. 如果只是支持performance，不支持PerformanceObserver 获取性能值
        const entry: PerformanceEntryList = performance.getEntriesByName(fcp);
        if (entry && entry.length > 0) {
          const fcp_entry: PerformanceEntry = entry[0];

          resolve(fcp_entry);
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
            resolve(entry);
          }

        }
      };
      const po = observe(fcp, entryHandler);
    }
  });
}


/**
 * 获取LCP指标
 */
export const getFCP = (): void => {

  fetchFCP()?.then((entry: PerformanceEntry) => {
    // 创建指标对象

    const fcp_metric: IPerformanceMetric = initMetric(PerformanceNameType.FCP);
    fcp_metric.value = toFixedFour(entry.startTime);

    // 获取到指标对象

  }).catch(error => {
    logError(error);
  })
}
