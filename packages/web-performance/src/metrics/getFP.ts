import { IPerformanceMetric } from "../types/interfaces";
import { isSupportPerformance, isSupportPerformanceObserver } from "../utils/isSupport";
import { logWarning, logError } from "../utils/loggerHelper";
import { initMetric } from "../lib/metric";
import { PerformanceNameType } from "../constants/index";
import { getFirstHiddenTime, onCachePageShow, onHidden } from "../utils/pageEventListener";
import { retainToFixed } from "../utils/calculate";
import observe from "../lib/observe";

/**
 *  获取首次渲染的FP - 白屏时间
 */
const fetchFP = (): Promise<PerformanceEntry> | undefined => {
  if (!isSupportPerformance()) {
    logWarning("浏览器不支持performance");
    return;
  }

  const fp = PerformanceNameType.FP;
  return new Promise<PerformanceEntry>((resolve, reject) => {

    // 如果支持观察者
    if (isSupportPerformanceObserver()) {
      const entryHandler = (entry: PerformanceEntry) => {
        if (entry.entryType === fp) {
          if (po) {
            po.disconnect()
          }

          if (entry.startTime < getFirstHiddenTime().timestamp) {
            resolve(entry);
          }
        }

      };
      const po = observe("paint", entryHandler);
    } else {
      const entry = window.performance
        && performance.getEntriesByName
        && performance.getEntriesByName(fp)[0];

      resolve(entry);
    }
  });
};


/**
 * 获取FP指标
 */
export const getFP = (): void => {

  fetchFP()?.then((entry: PerformanceEntry) => {
    // 创建指标对象
    const fpMetric: IPerformanceMetric = initMetric(PerformanceNameType.FP);
    fpMetric.value = retainToFixed(entry.startTime, 2);

    // 获取到指标对象

  }).catch(error => {
    logError(error);
  })
}

