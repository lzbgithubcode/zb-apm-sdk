/**
 * 作者: lzb
 * 日期: 2022-03-11 18:35
 * 功能:
 */
import {PerformanceNameType} from "../constants/index";


namespace interfaces {

    /**
     * 网络信息
     */
    export type NetWorkEffectiveType = '5g' | '4g' | '3g' | '2g' | 'slow-2g';
    export interface INetWorkInfo {
        downlink?: number   // Mb/s为单位的有效带宽
        effectiveType?: NetWorkEffectiveType  // 网络效果
        rtt?: number   // 连接的延迟
    }

    /**
     * 页面信息
     */
    export interface  IPageInfo{
        host?: string
        hostname?: string
        href?: string
        protocol?: string
        origin?: string
        port?: string
        pathname?: string
        search?: string
        hash?: string
        userAgent?: string
        width?: string
        height?: string
    }

    /**
     * 设备信息
     */
    export interface IDeviceInfo {
        deviceMemory?:number, // 内存大小
        userAgent?: string, // 浏览器基本信息
        hardwareConcurrency?: number, //线程数量
        jsHeapSizeLimit?: string,  // 内存大小限制
        usedJSHeapSize?: string,  // JS 对象占用的内存,已使用的内存
        totalJSHeapSize?: string,  // 可使用的内存大小

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

    /**
     * 性能指标
     */
    export interface IPerformanceMetric {
        name: PerformanceNameType, // 名称
        delta: number;  // 当前值与上一次值的相差值，如果是第一次则相差值delta = value
        value: number;  // 当前值
        id: string, // 唯一id
    }

    /**
     * 获取性能指标
     */
    export interface IPerformance {
        FP ?: IPerformanceMetric,

    }
}
export {interfaces};
