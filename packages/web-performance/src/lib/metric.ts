/**
 * 作者: lzb
 * 日期: 2022-04-07 19:15
 * 功能:
 */
import { IPerformanceMetric } from "../types/interfaces";
import { generalUniqueId } from "../utils/uniqueId";


/**
 *  初始化指标对象
 */
export const initMetric = (name: IPerformanceMetric['name'], value?: number): IPerformanceMetric => {
    return {
        name,
        value: typeof value === 'undefined' ? -1 : value,
        delta: 0,
        id: generalUniqueId(),
    }
};

export const calculateMetric = (metric: IPerformanceMetric, value?: number,): IPerformanceMetric => {
    return metric;
}
