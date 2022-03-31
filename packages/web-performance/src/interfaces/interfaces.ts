/**
 * 作者: lzb
 * 日期: 2022-03-11 18:35
 * 功能:
 */


namespace interfaces {

    /**
     * 网络信息
     */
    export type NetWorkEffectiveType = '5g' | '4g' | '3g' | '2g' | 'slow-2g';
    export interface INetWorkInfo {
        downlink?: number
        effectiveType?: NetWorkEffectiveType
        rtt?: number
    }

    /**
     * 页面信息
     */
    export interface  IPageInfo{
        host: string
        hostname: string
        href: string
        protocol: string
        origin: string
        port: string
        pathname: string
        search: string
        hash: string
        userAgent?: string
        width: string
        height: string
    }


    /**
     * navigationTiming 信息
     */
    export interface IPerformanceNavigationTiming {
        /**
         * dns查询时间 domainLookupEnd - domainLookupStart
         */
        dns?: number,  // domainLookupEnd - domainLookupStart
        /**
         * tcp建立链接时间 connectEnd - connectStart
         */
        tcpConnected?:number,  // connectEnd - connectStart
        /**
         * ssl连接时间 connectEnd - secureConnectionStart
         */
        sslConnected?: number, // connectEnd - secureConnectionStart

        /**
         * 重定向时间 redirectEnd - redirectStart
         */
        redirect?: number,

        /**
         * dom准备时间  HTML加载完成时间， 即DOM Ready时间。 domContentLoadedEventEnd - fetchStart
         */
        domReady?: number,
        /**
         * dom解析时间 domInteractive - responseEnd
         */
        domParse?:number,

        /**
         * dom内容加载（同步js的加载） - 同步的脚步 domContentLoadedEventEnd - domInteractive
         */
        domContentLoaded?: number,

        /**
         * 资源加载时间 loadEventStart - domContentLoadedEventEn
         */
        resourceLoaded?:number, //  loadEventStart - domContentLoadedEventEnd
        /**
         * 页面加载时间  loadEventStart - fetchStart 首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时
         */
        pageLoaded?: number, // loadEventStart - fetchStart 首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时
        /**
         * 请求响应耗时 responseStart - requestStart
         */
        ttfb?: number,
        /**
         * 内容传输时间  responseEnd - responseStart
         */
        trans?: number,
        /**
         * (Time to Interact)首次可交互时间 domInteractive - fetchStart
         */
        tti?: number, // 览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。
        /**
         *  (first paint time)首次渲染时间（白屏时间） responseEnd - fetchStart
         */
        fpt?: number,  // 从请求开始到浏览器开始解析第一批HTML文档字节的时间差。

    }
    export interface IPerformanceEntryHandler {
        (entry: PerformanceEntry): void
    }



}
export {interfaces};
