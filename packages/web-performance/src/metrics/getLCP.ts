import { IPerformanceMetric } from "../types/interfaces";
import { isSupportPerformance, isSupportPerformanceObserver } from "../utils/isSupport";
import { logWarning, logError } from "../utils/loggerHelper";
import { initMetric } from "../lib/metric";
import { PerformanceNameType } from "../constants/index";
import { getFirstHiddenTime, onHidden } from "../utils/pageEventListener";
import { toFixedFour } from "../utils/calculate";
import observe from "../lib/observe";


/**
 * LCP Largest Contentful Paint 最大内容绘制 (LCP)
 * 
 */

const lcp = PerformanceNameType.LCP;
const fetchLCP = (): Promise<PerformanceEntry> => {
  // 1.初始化性能参数
  if (!isSupportPerformanceObserver()) {
    logWarning("浏览器不支持PerformanceObserver,暂不支持收集FID")
    return;
  }
  // 2. 返回promise
  return new Promise<PerformanceEntry>((resolve, reject) => {

    const entryHandler = (entry: PerformanceEntry) => {
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

    const po = observe(lcp, entryHandler);
    if (po) {
      const stopListening = () => {
        if (po.takeRecords) {
          po.takeRecords().map(entryHandler)
        }
        po.disconnect();
      }



      ['keydown', 'click'].forEach((type) => {
        addEventListener(type, stopListening, { once: true, capture: true });
      });
      onHidden(stopListening, true);
    }
  });

}

/**
 * 获取FP指标
 */
export const getLCP = (): void => {

  fetchLCP()?.then((entry: PerformanceEntry) => {
    // 创建指标对象

    const lcp_metric: IPerformanceMetric = initMetric(PerformanceNameType.LCP);
    lcp_metric.value = toFixedFour(entry.startTime);

    // 获取到指标对象

  }).catch(error => {
    logError(error);
  })
}
