/**
 * 作者: lzb
 * 日期: 2022-04-07 16:58
 * 功能:
 */
import { Config, IConfig } from "../config/config";
import { startMonitorDeviceInfo } from "../metrics/getDeviceInfo";
import { startMonitorPageInfo } from "../metrics/getPageInfo";
import { startMonitorNetworkInfo } from "../metrics/getNetworkInfo";

/**
 * 开始监听基础信息
 * @param config
 */
export const startMonitorBaseInfo = (config: IConfig = new Config()): void => {
      // 监听设备信息
      startMonitorDeviceInfo(config);
      // 监听页面信息
      startMonitorPageInfo(config);
      // 监听网络信息
      startMonitorNetworkInfo(config);
};
