/**
 * 作者: lzb
 * 日期: 2022-03-11 18:55
 * 功能:
 */

export const isSupportPerformance = (): boolean =>{
    return !!window.performance;
};

export const isSupportNavigator = (): boolean => {
    return !!window.navigator
};

export const isSupportPerformanceObserver = (): boolean => {
    return !!window.PerformanceObserver
}
