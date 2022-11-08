import { type } from "os";

/**
     * 网络信息
     */
export type TNetWorkEffectiveType = '5g' | '4g' | '3g' | '2g' | 'slow-2g';

/**
 * 系统性能处理函数
 */
export type TPerformanceEntryHandler = {
  (entry: PerformanceEntry): void
}

