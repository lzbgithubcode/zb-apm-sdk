/**
 * 作者: lzb
 * 日期: 2022-03-10 11:06
 * 功能:
 */
import {IConfig} from "./types/index";

class WebPerformance {
    constructor(config: IConfig) {
        const {
            enableCollectError= true,
            enableReportError = true
        } = config;


    }

    /**
     * 开始监听
     */
    startMonitor(){

    }

    /**
     * 停止监听
     */
    stopMonitor(){

    }
}
