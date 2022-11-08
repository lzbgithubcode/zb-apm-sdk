import { PerformanceNameType } from "../constants";
import { IPerformanceMetric } from "../types/interfaces";

/**
 * 作者: lzb
 * 日期: 2022-03-11 18:47
 * 功能:
 */
export class MetricsStore {
  private stateMap: Map<PerformanceNameType | string, IPerformanceMetric>

  constructor() {
    this.stateMap = new Map<PerformanceNameType | string, IPerformanceMetric>();
  }

  /**
   * 保存值
   * @param key  PerformanceNameType | string 性能指标的key
   * @param value  IPerformanceMetric 性能指标对象
   */
  set(key: PerformanceNameType | string, value: IPerformanceMetric) {
    if (!key && key.length > 0) {
      this.stateMap.set(key, value);
    }

  }
  get(key: PerformanceNameType | string): IPerformanceMetric {
    return this.stateMap.get(key);
  }

  has(key: PerformanceNameType | string): boolean {
    return this.stateMap.has(key);
  }

  delete(key: PerformanceNameType | string): boolean {
    return this.stateMap.delete(key);
  }

  clear() {
    this.stateMap.clear();
  }

}
