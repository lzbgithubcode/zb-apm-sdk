/**
 * 作者: lzb
 * 日期: 2022-04-07 16:58
 * 功能:
 */
import {interfaces} from "../interfaces/interfaces";
import {isSupportNavigator, isSupportPerformance} from "../utils/isSupport";
import {logWarning} from "../utils/loggerHelper";
import {toMB} from "../utils/calculate";
import {Config, IConfig} from "../config/config";

export const getDeviceInfo = ():interfaces.IDeviceInfo => {

    if(!isSupportNavigator()){
        console.warn('浏览器不支持navigator');
        return
    }

    if(!isSupportPerformance()){
        logWarning("浏览器不支持performance");
        return;
    }

    const jsHeapSizeLimit = "memory" in performance ? toMB(performance["memory"]["jsHeapSizeLimit"]) : 0;
    const usedJSHeapSize = "memory" in performance ? toMB(performance["memory"]["usedJSHeapSize"]) : 0;
    const totalJSHeapSize = "memory" in performance ? toMB(performance["memory"]["totalJSHeapSize"]) : 0;

    return {
        deviceMemory: "deviceMemory" in navigator ? navigator['deviceMemory']: 0,
        userAgent: "userAgent" in navigator ? navigator['userAgent']: "",
        hardwareConcurrency: "hardwareConcurrency" in navigator ? navigator['hardwareConcurrency']: 0,
        jsHeapSizeLimit: `${jsHeapSizeLimit}MB`,
        usedJSHeapSize: `${usedJSHeapSize}MB`,
        totalJSHeapSize: `${totalJSHeapSize}MB`,
    }

};
/**
 * 监听设备信息
 * @param config
 */
export const startMonitorDeviceInfo = (config: IConfig = new Config()): void => {

    const deviceInfo: interfaces.IDeviceInfo = getDeviceInfo();
    console.log('设备信息------',deviceInfo, '配置信息--------',config);


};
