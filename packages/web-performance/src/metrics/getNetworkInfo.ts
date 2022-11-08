/**
 * 作者: lzb
 * 日期: 2022-03-15 20:49
 * 功能: 网络信息
 */
import { INetWorkInfo } from "../types/interfaces"
import { isSupportNavigator } from "../utils/isSupport";
import { Config, IConfig } from "../config/config";


export const getNetworkInfo = (): INetWorkInfo | undefined => {
    if (!isSupportNavigator()) {
        console.warn('浏览器不支持navigator');
        return
    }
    const connection = (navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'] || {}) as interfaces.INetWorkInfo;
    const { downlink, effectiveType, rtt } = connection;
    return {
        downlink,
        effectiveType,
        rtt
    }
};

/**
 * 开始监听网络信息
 * @param config
 */
export const startMonitorNetworkInfo = (config: IConfig = new Config()): void => {
    // 获取网络信息
    const netInfo: INetWorkInfo = getNetworkInfo();

    console.log('网络信息------', netInfo, '配置信息--------', config);
};
