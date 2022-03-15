/**
 * 作者: lzb
 * 日期: 2022-03-15 20:49
 * 功能:
 */
import {INetWorkInfo} from "../types/index"
import {isSupportNavigator} from "../utils/isSupport";


export const getNetworkInfo = (): INetWorkInfo | undefined => {
    if(!isSupportNavigator()){
        console.warn('浏览器不支持navigator');
        return
    }

    const connection =  (navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'] || {}) as INetWorkInfo;
    const  {downlink, effectiveType, rtt} = connection;
    return  {
        downlink,
        effectiveType,
        rtt
    }
};
