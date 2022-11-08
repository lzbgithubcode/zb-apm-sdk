/**
 * 作者: lzb
 * 日期: 2022-03-10 11:06
 * 功能:
 */
import { Config, IConfig } from "./config/config";

import { startMonitorNavigationTiming } from "./metrics/getNavigationTiming";
import { domDidLoaded } from "./utils/domLife";
import { startMonitorBaseInfo } from "./lib/getBaseInfo";
import { startMonitorPerformance } from "./lib/getPerformance";

class WebPerformance {

    constructor(private readonly config: IConfig) {
        this.config = new Config(config);
        console.log('打印默认的配置信息----', this.config);
        this.startMonitor();
    }

    /**
     * 开始监听
     */
    startMonitor() {
        console.log('======开始监听web-performance=========');
        startMonitorBaseInfo(this.config);

        // 开启性能指标监听
        startMonitorPerformance(this.config);

        // dom 加载之后
        domDidLoaded(() => {
            startMonitorNavigationTiming(this.config);
        });
    }

    /**
     * 停止监听
     */
    stopMonitor() {

    }
}

export { WebPerformance }
