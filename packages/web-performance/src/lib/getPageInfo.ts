/**
 * 作者: lzb
 * 日期: 2022-03-15 20:28
 * 功能:
 */

import { IPageInfo } from "../types/index";
import {isSupportNavigator} from "../utils/isSupport";

export const getPageIno = (): IPageInfo =>{
     if(!location){
         console.warn('浏览器不支持location');
         return
     }
    const { host, hostname, href, protocol, origin, port, pathname, search, hash } = location;
    const { width, height } = window.screen;
    let userAgent = "";
    if(isSupportNavigator()){
        userAgent = 'userAgent' in navigator ? navigator.userAgent : '';
        return
    }
    return  {
        host,
        hostname,
        href,
        protocol,
        origin,
        port,
        pathname,
        search,
        hash,
        userAgent: userAgent,
        width: `${width}`,
        height: `${height}`
    }
};

