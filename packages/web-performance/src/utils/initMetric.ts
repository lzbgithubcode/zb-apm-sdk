/**
 * 作者: lzb
 * 日期: 2022-04-07 19:15
 * 功能:
 */
import {interfaces} from "../interfaces/interfaces";
import {generalUniqueId} from "./uniqueId";


export const initMetric = (name: interfaces.IPerformanceMetric['name'], value?: number) => {
    return {
        name,
        value: typeof value === 'undefined' ? -1 : value,
        delta: 0,
        id: generalUniqueId(),
    }
};
