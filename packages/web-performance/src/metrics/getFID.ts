import { IPerformanceMetric } from "../types/interfaces";
import { isSupportPerformance, isSupportPerformanceObserver } from "../utils/isSupport";
import { logWarning, logError } from "../utils/loggerHelper";
import { initMetric } from "../lib/metric";
import { PerformanceNameType } from "../constants/index";
import { getFirstHiddenTime, onHidden } from "../utils/pageEventListener";
import { toFixedFour } from "../utils/calculate";
import observe from "../lib/observe";




/**
 * First Input Delay 首次输入延迟 (FID)
 * FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）
 * 直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
 */
const fid = PerformanceNameType.FID;
const fetchFID = (): Promise<PerformanceEventTiming> => {
  // 1.初始化性能参数
  if (!isSupportPerformanceObserver()) {
    logWarning("浏览器不支持PerformanceObserver,暂不支持收集FID")
    return;
  }

  // 2. 返回promise
  return new Promise<PerformanceEventTiming>((resolve, reject) => {

    const entryHandler = (entry: PerformanceEventTiming) => {
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

/**
 * 获取LCP指标
 */
export const getFID = (): void => {

  fetchFID()?.then((entry: PerformanceEventTiming) => {
    // 创建指标对象

    const fid_metric: IPerformanceMetric = initMetric(fid);
    fid_metric.value = toFixedFour(entry.processingStart - entry.startTime);

    // 获取到指标对象

  }).catch(error => {
    logError(error);
  })
}

