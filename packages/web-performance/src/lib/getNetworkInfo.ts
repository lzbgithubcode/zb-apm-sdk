/**
 * 作者: lzb
 * 日期: 2022-03-15 20:49
 * 功能:
 */
import {interfaces} from "../interfaces/interfaces"
import {isSupportNavigator} from "../utils/isSupport";


export const getNetworkInfo = (): interfaces.INetWorkInfo | undefined => {
    if(!isSupportNavigator()){
        console.warn('浏览器不支持navigator');
        return
    }
    const connection =  (navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'] || {}) as interfaces.INetWorkInfo;
    const  {downlink, effectiveType, rtt} = connection;
    return  {
        downlink,
        effectiveType,
        rtt
    }
};

export const startMonitorNetworkInfo = () => void {

};
