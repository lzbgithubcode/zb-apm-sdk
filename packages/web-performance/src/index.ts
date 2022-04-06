/**
 * 作者: lzb
 * 日期: 2022-03-10 11:06
 * 功能:
 */
import {Config, IConfig} from "./config/config";
import {getNetworkInfo} from "./lib/getNetworkInfo";
import {getNavigationTiming} from "./lib/getNavigationTiming";
import {domDidLoaded} from "./utils/domLife";

class WebPerformance {

    constructor( private readonly  config: IConfig) {
        this.config = new Config(config);
        console.log('打印默认的配置信息----',this.config);
        this.startMonitor();
    }

    /**
     * 开始监听
     */
    startMonitor(){
        console.log('======开始监听web-performance=========');
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
