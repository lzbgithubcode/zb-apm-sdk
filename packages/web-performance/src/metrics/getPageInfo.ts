/**
 * 作者: lzb
 * 日期: 2022-03-15 20:28
 * 功能: 页面基础信息
 */

import { IPageInfo } from "../types/interfaces";
import { isSupportNavigator } from "../utils/isSupport";
import { Config, IConfig } from "../config/config";

export const getPageIno = (): IPageInfo | undefined => {
    if (!location) {
        console.warn('浏览器不支持location');
        return
    }
    const { host, hostname, href, protocol, origin, port, pathname, search, hash } = location;
    const { width, height } = window.screen;
    let userAgent = "";
    if (isSupportNavigator()) {
        userAgent = 'userAgent' in navigator ? navigator.userAgent : '';
    }
    return {
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

export const startMonitorPageInfo = (config: IConfig = new Config()) => {

    const pageInfo: IPageInfo = getPageIno();

    console.log('页面信息------', pageInfo, '配置信息--------', config);
};




