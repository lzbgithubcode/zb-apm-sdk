/**
 * 作者: lzb
 * 日期: 2022-03-10 11:06
 * 功能:
 */
import {IConfig} from "./interfaces/IConfig";
import {getNetworkInfo} from "./lib/getNetworkInfo";
import {getNavigationTiming} from "./lib/getNavigationTiming";
import {domDidLoaded} from "./utils/domLife";

class WebPerformance {
    constructor(config: IConfig) {
        const {
            enableCollectError= true,
            enableReportError = true
        } = config;

        this.startMonitor();
    }

    /**
     * 开始监听
     */
    startMonitor(){

        getNetworkInfo();
        // dom 加载之后
        domDidLoaded(()=>{
            getNavigationTiming().then((res) => {
                console.log('======结果=========',res);
            });

        });


    }

    /**
     * 停止监听
     */
    stopMonitor(){

    }
}

export {WebPerformance}
