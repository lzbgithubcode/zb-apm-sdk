/**
 * 作者: lzb
 * 日期: 2022-03-24 17:07
 * 功能:
 */
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
