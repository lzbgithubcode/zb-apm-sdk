/**
 * 作者: lzb
 * 日期: 2022-03-11 18:35
 * 功能:
 */

export interface IConfig {
    version?: string,
    allowLog: boolean, // 是否日志答应
    enableCollectError: boolean,  // 是否允许收集错误
    enableReportError: boolean,  // 是否运行上传错误
}




export interface IWebPerformance {

}

/**
 * 页面信息
 */
export interface IPageInfo{
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
 * 网络信息
 */
export interface INetWorkEffectiveType {
    type:'5g' | '4g' | '3g' | '2g' | 'slow-2g'
}
export interface INetWorkInfo {
    downlink?: number
    effectiveType?: INetWorkEffectiveType
    rtt?: number
}
