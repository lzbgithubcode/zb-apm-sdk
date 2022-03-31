/**
 * 作者: lzb
 * 日期: 2022-03-24 17:09
 * 功能:
 */
export interface IConfig {
    version?: string,
    allowLog: boolean, // 是否日志答应
    enableCollectError: boolean,  // 是否允许收集错误
    enableReportError: boolean,  // 是否运行上传错误
}
